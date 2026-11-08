/* ============================================================
   Cloudflare Worker: принимает бриф с сайта и пересылает в Telegram.
   На сайт (GitHub Pages) этот файл НЕ загружается — он живёт в Cloudflare.

   Переменные окружения (Settings → Variables):
     BOT_TOKEN       — токен бота от @BotFather (тип Secret)
     CHAT_ID         — id чата, куда приходят брифы
     ALLOWED_ORIGIN  — (необязательно) адрес вашего сайта, например
                       https://username.github.io — тогда принимаем только с него.
                       Несколько адресов — через запятую.
   ============================================================ */

const TG_LIMIT = 4000;   // лимит Telegram 4096, оставляем запас

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
    const originOk = allowed.length === 0 || allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": allowed.length ? (originOk ? origin : "null") : "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    const json = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
    if (!originOk) return json({ ok: false, error: "origin" }, 403);
    if (!env.BOT_TOKEN || !env.CHAT_ID) return json({ ok: false, error: "not configured" }, 500);

    try {
      const type = request.headers.get("Content-Type") || "";

      // Файл: multipart → sendDocument
      if (type.includes("multipart/form-data")) {
        const form = await request.formData();
        const file = form.get("file");
        if (!file || typeof file === "string") return json({ ok: false, error: "no file" }, 400);
        const out = new FormData();
        out.append("chat_id", env.CHAT_ID);
        out.append("document", file, file.name);
        const from = String(form.get("from") || "").slice(0, 100);
        if (from) out.append("caption", "Файл от: " + from);
        const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendDocument`, { method: "POST", body: out });
        const d = await r.json();
        return json({ ok: !!d.ok }, d.ok ? 200 : 502);
      }

      // Ответы: JSON → серия сообщений
      const payload = JSON.parse(await request.text());
      const messages = buildMessages(payload);
      if (messages.length > 60) return json({ ok: false, error: "too long" }, 413);
      for (const text of messages) await sendMessage(env, text);
      return json({ ok: true, sent: messages.length });
    } catch (e) {
      return json({ ok: false, error: String(e && e.message || e) }, 502);
    }
  }
};

/* ---------- Отправка одного сообщения (с повтором при лимите частоты) ---------- */
async function sendMessage(env, text) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });
    const d = await r.json();
    if (d.ok) return;
    if (r.status === 429 && d.parameters && d.parameters.retry_after) {
      await new Promise(res => setTimeout(res, (d.parameters.retry_after + 1) * 1000));
      continue;
    }
    throw new Error("telegram: " + (d.description || r.status));
  }
  throw new Error("telegram: too many retries");
}

/* ---------- Форматирование ---------- */
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pad = n => String(n).padStart(2, "0");
const clip = (s, n) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s);

// Режет текст на куски ≤ max символов: сначала по абзацам, потом по строкам,
// потом по предложениям, в крайнем случае по словам — но не посреди слова.
function splitText(text, max) {
  if (text.length <= max) return [text];
  const out = [];
  let cur = "";
  const push = () => { if (cur.trim()) out.push(cur.trim()); cur = ""; };
  const pieces = [];
  text.split(/\n{2,}/).forEach(par => {
    if (par.length <= max) { pieces.push([par, "\n\n"]); return; }
    par.split("\n").forEach(line => {
      if (line.length <= max) { pieces.push([line, "\n"]); return; }
      (line.match(/[^.!?…]+[.!?…]*\s*/g) || [line]).forEach(sent => {
        if (sent.length <= max) { pieces.push([sent, ""]); return; }
        let buf = "";
        sent.split(/(\s+)/).forEach(w => {
          if ((buf + w).length > max) { pieces.push([buf, ""]); buf = w.trimStart(); } else buf += w;
        });
        if (buf) pieces.push([buf, ""]);
      });
    });
  });
  pieces.forEach(([p, sep]) => {
    if ((cur + p).length > max) push();
    cur += p + sep;
  });
  push();
  return out;
}

function buildMessages(p) {
  const meta = p.meta || {};
  const stages = Array.isArray(p.stages) ? p.stages : [];
  const msgs = [];

  /* 1. Сводка: имя, контакт и главное по делу */
  const head = ["📋 <b>Новый бриф</b>", ""];
  if (meta.name) head.push("<b>Имя:</b> " + esc(meta.name));
  if (meta.company) head.push("<b>Компания:</b> " + esc(meta.company));
  if (meta.contact) head.push("<b>Контакт:</b> " + esc(meta.contact));
  const main = [];
  stages.forEach(s => (s.items || []).forEach(it => {
    if (it.summary && !["ct_name", "ct_company", "ct_contact"].includes(it.key)) {
      main.push("<b>" + esc(it.label) + "</b>\n" + esc(clip(String(it.value), 280)));
    }
  }));
  let summary = head.join("\n");
  if (main.length) summary += "\n\n" + main.join("\n\n");
  msgs.push(...splitText(summary, TG_LIMIT));

  /* 2. Каждый этап — отдельным сообщением (пустые ответы уже отфильтрованы) */
  stages.forEach(s => {
    const title = pad(s.num) + " · " + s.title;
    const blocks = [];
    (s.items || []).forEach(it => {
      const q = "<b>" + esc(it.label) + "</b>\n";
      const chunks = splitText(esc(String(it.value)), TG_LIMIT - 400);
      chunks.forEach((c, i) => blocks.push(
        (i === 0 ? q : "<b>…продолжение</b>\n") + c
      ));
    });

    let part = 1;
    let cur = "";
    const header = () => "<b>" + esc(title) + (part > 1 ? " (" + part + ")" : "") + "</b>";
    blocks.forEach(b => {
      const next = cur ? cur + "\n\n" + b : header() + "\n\n" + b;
      if (cur && next.length > TG_LIMIT) {
        msgs.push(cur);
        part++;
        cur = header() + "\n\n" + b;
      } else {
        cur = next;
      }
    });
    if (cur) msgs.push(cur);
  });

  return msgs;
}
