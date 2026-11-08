/* ============================================================
   Бриф — логика.
   Чтобы поменять вопросы, правьте массивы QUESTIONS и STAGES ниже —
   остальной код трогать не нужно.
   ============================================================ */

/* ---------- Настройки сайта: имя, контакты, документы ---------- */
const SITE = {
  brand: "Бриф",                    // название в шапке
  telegram: "your_username",        // ник в Telegram без @  (ЗАМЕНИТЬ)
  replyDays: 2,                     // за сколько рабочих дней отвечаю
  photo: "photos/final.jpg",             // путь к фотографии для финального экрана
  photoAlt: "Автор брифа",
  // Документы: подставьте реальные ссылки со своего сайта (ЗАМЕНИТЬ)
  legal: [
    { id: "privacy", title: "Политика конфиденциальности",            href: "#" },
    { id: "consent", title: "Согласие на обработку персональных данных", href: "#" },
    { id: "offer",   title: "Публичная оферта",                        href: "#" },
    { id: "req",     title: "Реквизиты ИП",                            href: "#" }
  ],
  requisites: "ИП Фамилия Имя Отчество · ИНН 000000000000 · ОГРНИП 000000000000000"
};

/* ---------- Этапы (левая колонка на десктопе) ---------- */
const STAGES = [
  { num: 1, title: "Бизнес-задача",
    desc: "Зачем сайт нужен прямо сейчас и какого результата вы от него ждёте. От этого зависит всё остальное." },
  { num: 2, title: "Продукт и фокус",
    desc: "Что именно вы продаёте и что хотите продавать больше. Чтобы сайт делал акцент на нужном." },
  { num: 3, title: "Клиент: первая гипотеза",
    desc: "Не нужны исследования и цифры. Напишите, каким вы видите покупателя, — потом сверим с реальностью." },
  { num: 4, title: "Путь продажи",
    desc: "Как человек идёт от первого обращения до оплаты. Самое ценное здесь — места, где сделки обрываются." },
  { num: 5, title: "Ценность и доказательства",
    desc: "Чем вы сильнее других и чем это можно подтвердить. А ещё — чего обещать нельзя, чтобы на сайте не было выдумок." },
  { num: 6, title: "Материалы и доступы",
    desc: "Что уже есть на руках: отзывы, переписки, презентации, фото. Не нужно ничего готовить заранее — достаточно ссылок и файлов." },
  { num: 7, title: "Контакты",
    desc: "Последний шаг: как с вами связаться. И пара слов о том, что я не спросила." }
];

/* ---------- Вопросы ----------
   id        — уникальный идентификатор поля в разметке
   key       — ключ ответа (в черновике и в данных для Telegram)
   stage     — номер этапа из STAGES
   type      — textarea (по умолчанию) | text | links | files | consent
   label     — текст вопроса
   hint      — пояснение человеческим языком (необязательно)
   required  — обязательное поле
   important — плашка «важно»
   summary   — попадает в первое сообщение-сводку в Telegram
   placeholder — серая подсказка внутри поля
*/
const QUESTIONS = [
  /* 01 · Бизнес-задача */
  { id: "goal-why", key: "goal_why", stage: 1, required: true, important: true, summary: true,
    label: "Зачем бизнесу сайт именно сейчас?",
    hint: "Что изменилось: упали заявки, запускаете новый продукт, устарел прежний сайт? Своими словами.",
    placeholder: "Например: заявки идут только из рекомендаций, хотим, чтобы нас находили сами" },
  { id: "goal-action", key: "goal_action", stage: 1, required: true, summary: true,
    label: "Какое действие сайт должен приводить чаще: запись, звонок, расчёт, покупка?",
    hint: "Назовите одно главное действие. Если их несколько — расставьте по важности." },
  { id: "goal-focus", key: "goal_focus", stage: 1,
    label: "Какое направление, география или сегмент в приоритете?",
    hint: "Например: «новостройки, а не вторичка» или «только Москва и область». Если пока нет приоритета — так и напишите." },

  /* 02 · Продукт и фокус */
  { id: "prod-what", key: "prod_what", stage: 2, required: true, summary: true,
    label: "Что именно продаёт бизнес?" },
  { id: "prod-list", key: "prod_list", stage: 2,
    label: "Какие продукты или форматы можно купить?",
    hint: "Перечислите всё, что есть в продаже: услуги, пакеты, тарифы." },
  { id: "prod-popular", key: "prod_popular", stage: 2,
    label: "Что покупают чаще всего?" },
  { id: "prod-more", key: "prod_more", stage: 2, important: true,
    label: "Что бизнес хочет продавать больше?",
    hint: "Часто это не то, что покупают чаще всего. От этого ответа зависит, что окажется на первом экране сайта." },
  { id: "prod-scope", key: "prod_scope", stage: 2,
    label: "Что входит в продукт? Какие есть ограничения?",
    hint: "Что человек получает, а чего нет. Сроки, география, минимальный заказ — всё, что обычно уточняют по телефону." },

  /* 03 · Клиент · первая гипотеза */
  { id: "cl-who", key: "cl_who", stage: 3, required: true,
    label: "Кто обычно покупает?",
    hint: "Пишите как есть, без маркетинговых терминов: возраст, чем занимается, что за компания." },
  { id: "cl-when", key: "cl_when", stage: 3,
    label: "В какой ситуации он начинает искать решение?",
    hint: "Что случилось в жизни или бизнесе человека, из-за чего он вообще пришёл к вам." },
  { id: "cl-care", key: "cl_care", stage: 3,
    label: "Что для него, предположительно, важно при выборе?",
    hint: "Это гипотеза — можно ошибаться. Цена, скорость, гарантии, репутация, удобство?" },

  /* 04 · Путь продажи */
  { id: "sale-first", key: "sale_first", stage: 4,
    label: "Кто первым общается с человеком?",
    hint: "Менеджер, администратор, мессенджер, форма на сайте или вы сами." },
  { id: "sale-path", key: "sale_path", stage: 4,
    label: "Как выглядит путь от первого обращения до покупки?",
    hint: "По шагам: заявка → звонок → встреча → договор → оплата. Как у вас на самом деле." },
  { id: "sale-after", key: "sale_after", stage: 4,
    label: "Что происходит сразу после заявки?",
    hint: "Через сколько и кто перезванивает, что говорит, что отправляет." },
  { id: "sale-break", key: "sale_break", stage: 4, required: true, important: true, summary: true,
    label: "Где сделки чаще всего рвутся?",
    hint: "Самый ценный ответ во всём брифе. На каком шаге клиент пропадает или говорит «подумаю»? Какие возражения слышите чаще всего?" },

  /* 05 · Ценность и доказательства */
  { id: "val-love", key: "val_love", stage: 5,
    label: "За что клиенты особенно ценят компанию?",
    hint: "Вспомните, что говорят в отзывах и по телефону — не что хотелось бы услышать, а что говорят на самом деле." },
  { id: "val-diff", key: "val_diff", stage: 5,
    label: "Что компания делает иначе и чем это доказать?" },
  { id: "val-rec", key: "val_rec", stage: 5,
    label: "За что компанию рекомендуют?" },
  { id: "val-proof", key: "val_proof", stage: 5, required: true, important: true,
    label: "Чем доказываем: что реально есть на руках?",
    hint: "Только то, что можно показать: кейсы, цифры, договоры, сертификаты, награды, фото работ, видео, отзывы с именами." },
  { id: "val-none", key: "val_none", stage: 5, required: true, important: true,
    label: "Чего нет — обещать нельзя",
    hint: "Что нельзя писать на сайте, потому что подтвердить нечем или это не так. Так на сайте не появятся выдумки. Если нечего — напишите «всё подтверждается»." },

  /* 06 · Материалы и доступы */
  { id: "mat-access", key: "mat_access", stage: 6,
    label: "Есть ли доступ к CRM, звонкам, перепискам, причинам отказа?",
    hint: "Ничего не присылайте сейчас — просто скажите, что из этого есть и кто может открыть доступ." },
  { id: "mat-have", key: "mat_have", stage: 6,
    label: "Какие отзывы, FAQ, звонки или переписки уже есть?" },
  { id: "mat-site", key: "mat_site", stage: 6,
    label: "Есть ли сайт, презентации, прайс, документы, фото, рендеры?" },
  { id: "mat-links", key: "mat_links", stage: 6, type: "links",
    label: "Ссылки",
    hint: "Каждая ссылка с новой строки: сайт, соцсети, облако с файлами, презентация.",
    placeholder: "https://…\nhttps://…" },
  { id: "mat-files", key: "mat_files", stage: 6, type: "files",
    label: "Файлы",
    hint: "До 10 файлов, каждый до 18 МБ. Перетащите их сюда или нажмите на область." },

  /* 07 · Контакты */
  { id: "ct-name", key: "ct_name", stage: 7, type: "text", required: true, summary: true,
    label: "Как вас зовут?", placeholder: "Имя и фамилия" },
  { id: "ct-company", key: "ct_company", stage: 7, type: "text", summary: true,
    label: "Компания или проект", placeholder: "Название" },
  { id: "ct-contact", key: "ct_contact", stage: 7, type: "text", required: true, important: true, summary: true,
    label: "Телеграм, телефон или почта",
    hint: "Туда, где вам удобнее всего отвечать.", placeholder: "@ник, +7… или почта" },
  { id: "ct-extra", key: "ct_extra", stage: 7,
    label: "Что-то ещё, о чём я не спросила?",
    hint: "Любые мысли, опасения, пожелания — всё, что кажется важным." },
  { id: "ct-consent", key: "ct_consent", stage: 7, type: "consent", required: true,
    label: "Согласие на обработку персональных данных" }
];

/* ---------- Ограничения файлов ---------- */
const MAX_FILES = 10;
const MAX_FILE_MB = 18;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

/* ============================================================
   Всё остальное
   ============================================================ */
(function () {
  "use strict";

  const DRAFT_KEY = "brief:draft:v1";
  const LAST_KEY = "brief:last:v1";
  const TOTAL = STAGES.length;
  const FINAL = TOTAL + 1;                 // индекс финального экрана
  const ENDPOINT = ((window.BRIEF_CONFIG || {}).endpoint || "").trim();

  const state = {
    answers: {},        // key -> строка
    files: [],          // объекты File (в черновик не сохраняются)
    step: 0,            // 0 — интро, 1…TOTAL — этапы, FINAL — финал
    lastSnapshot: null  // копия ответов для кнопки «Скачать копию»
  };

  const $ = (s, r) => (r || document).querySelector(s);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = nb(text);
    return n;
  };

  /* ---------- Типографика: без висячих предлогов ---------- */
  const SHORT = "в|к|с|о|у|и|а|но|на|по|за|до|из|от|для|при|не|ни|что|как|без|над|под|про|или|же|ли|бы|во|ко|со|об|то|мы|вы|он|её|их|это|я";
  const NB_RE = new RegExp("(^|[\\s«(„\"])(" + SHORT + ")[ \\t]+", "gi");
  function nb(s) {
    s = String(s);
    s = s.replace(NB_RE, "$1$2 ").replace(NB_RE, "$1$2 ");  // два прохода — для подряд идущих
    return s.replace(/[ \t]+([—–])/g, " $1");
  }
  function nbWalk(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentNode && n.parentNode.nodeName;
        return /^(SCRIPT|STYLE|TEXTAREA)$/.test(p) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const list = [];
    while (w.nextNode()) list.push(w.currentNode);
    list.forEach(n => { n.nodeValue = nb(n.nodeValue); });
  }

  /* ---------- Утилиты ---------- */
  const pad = n => String(n).padStart(2, "0");
  function fmtSize(b) {
    if (b < 1024) return b + " Б";
    if (b < 1024 * 1024) return Math.round(b / 1024) + " КБ";
    return (b / 1024 / 1024).toFixed(1).replace(".", ",") + " МБ";
  }
  function daysText(n) {
    const last = n % 10, two = n % 100;
    const word = (last === 1 && two !== 11) ? "рабочего дня" : "рабочих дней";
    return n + " " + word;
  }
  const qOf = stage => QUESTIONS.filter(q => q.stage === stage);
  const val = key => (state.answers[key] || "").trim();

  /* ---------- Черновик (localStorage) ---------- */
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function safeDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  let saveTimer = null;
  function saveDraft(now) {
    if (state.sent) return;            // бриф уже отправлен — черновик больше не нужен
    const run = () => {
      safeSet(DRAFT_KEY, JSON.stringify({
        v: 1,
        savedAt: Date.now(),
        step: state.step === FINAL ? TOTAL : state.step,
        answers: state.answers,
        files: state.files.map(f => ({ name: f.name, size: f.size }))
      }));
    };
    clearTimeout(saveTimer);
    if (now) run(); else saveTimer = setTimeout(run, 250);
  }

  function hasAnyAnswer(a) {
    return Object.keys(a || {}).some(k => k !== "ct_consent" && String(a[k] || "").trim());
  }

  /* ---------- Построение экранов ---------- */
  const mount = $("#stagesMount");

  function buildField(q) {
    const wrap = el("div", "field");
    wrap.dataset.id = q.id;
    wrap.dataset.key = q.key;

    if (q.type === "consent") {
      const box = el("label", "consent-box");
      const cb = document.createElement("input");
      cb.type = "checkbox"; cb.id = q.id;
      cb.addEventListener("change", () => { wrap.classList.remove("invalid"); });
      const txt = el("span", "consent-text");
      const L = id => SITE.legal.find(l => l.id === id) || { href: "#" };
      txt.append(
        document.createTextNode(nb("Я даю согласие на обработку персональных данных на условиях ")),
        link(L("consent"), "согласия"),
        document.createTextNode(nb(" и принимаю ")),
        link(L("privacy"), "политику конфиденциальности"),
        document.createTextNode(".")
      );
      box.append(cb, txt);
      const err = el("p", "err", "Без согласия отправить бриф нельзя");
      wrap.append(box, err);
      return wrap;
    }

    const label = el("label", "field-label");
    label.htmlFor = q.id;
    label.append(el("span", "q", q.label));
    if (q.important) label.append(el("span", "badge", "важно"));
    if (q.required) label.append(el("span", "req", "обязательно"));
    wrap.append(label);
    if (q.hint) wrap.append(el("p", "hint", q.hint));

    if (q.type === "files") {
      wrap.append(buildDrop(q));
      wrap.append(el("div", "files"));
      wrap.append(el("p", "file-note"));
      return wrap;
    }

    let input;
    if (q.type === "text") {
      input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
    } else {
      input = document.createElement("textarea");
      input.rows = 1;
    }
    input.className = "control";
    input.id = q.id;
    input.name = q.key;
    if (q.placeholder) input.placeholder = nb(q.placeholder);
    input.addEventListener("input", () => {
      state.answers[q.key] = input.value;
      wrap.classList.remove("invalid");
      if (input.tagName === "TEXTAREA") grow(input);
      saveDraft();
      refreshDots();
    });
    wrap.append(input);
    wrap.append(el("p", "err", "Это поле нужно заполнить"));
    return wrap;
  }

  function link(item, text) {
    const a = document.createElement("a");
    a.href = item.href; a.target = "_blank"; a.rel = "noopener";
    a.textContent = text;
    return a;
  }

  // Поле растёт вместе с текстом — без внутренней прокрутки
  function grow(t) {
    t.style.height = "auto";
    t.style.height = (t.scrollHeight + 4) + "px";
  }
  function growAll(root) {
    (root || document).querySelectorAll("textarea.control").forEach(grow);
  }

  function buildStage(st) {
    const sec = el("section", "screen");
    sec.id = "screen-" + st.num;
    sec.dataset.step = st.num;
    sec.hidden = true;

    const grid = el("div", "stage-grid");
    const side = el("aside", "stage-side");
    const num = el("div", "s-num");
    const b = el("b", null, pad(st.num));
    num.append(b, document.createTextNode("/ " + pad(TOTAL)));
    const title = el("h2", "s-title", st.title);
    title.tabIndex = -1;
    side.append(num, title, el("p", "s-desc", st.desc));

    const fields = el("div", "stage-fields");
    qOf(st.num).forEach(q => fields.append(buildField(q)));

    // Блок статуса отправки — только на последнем этапе
    if (st.num === TOTAL) {
      const status = el("div", "notice notice-error");
      status.id = "submitStatus";
      status.hidden = true;
      fields.append(status);
    }
    grid.append(side, fields);
    sec.append(grid);
    return sec;
  }

  function buildDrop(q) {
    const drop = el("div", "drop");
    drop.tabIndex = 0;
    drop.setAttribute("role", "button");
    drop.setAttribute("aria-label", "Загрузить файлы");
    drop.append(el("strong", null, "Перетащите файлы сюда"), el("span", null, "или нажмите, чтобы выбрать"));
    const input = document.createElement("input");
    input.type = "file"; input.multiple = true; input.id = q.id;
    drop.append(input);

    drop.addEventListener("click", e => { if (e.target !== input) input.click(); });
    drop.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); }
    });
    input.addEventListener("change", () => { addFiles(input.files); input.value = ""; });
    ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault(); drop.classList.add("over");
    }));
    ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault(); drop.classList.remove("over");
    }));
    drop.addEventListener("drop", e => { if (e.dataTransfer) addFiles(e.dataTransfer.files); });
    return drop;
  }

  /* ---------- Файлы ---------- */
  let restoredFileNames = [];   // файлы из черновика: прикрепить заново

  function addFiles(list) {
    const problems = [];
    Array.from(list || []).forEach(f => {
      if (state.files.length >= MAX_FILES) {
        problems.push("Можно прикрепить не больше " + MAX_FILES + " файлов.");
        return;
      }
      if (f.size > MAX_FILE_BYTES) {
        problems.push("«" + f.name + "» весит " + fmtSize(f.size) + " — лимит " + MAX_FILE_MB + " МБ.");
        return;
      }
      if (state.files.some(x => x.name === f.name && x.size === f.size)) return;
      state.files.push(f);
    });
    restoredFileNames = [];
    renderFiles(Array.from(new Set(problems)));
    saveDraft();
  }

  function renderFiles(problems) {
    const box = $(".files");
    const note = $(".file-note");
    if (!box) return;
    box.textContent = "";
    state.files.forEach((f, i) => {
      const row = el("div", "file");
      const del = document.createElement("button");
      del.type = "button"; del.textContent = "×";
      del.setAttribute("aria-label", "Удалить файл " + f.name);
      del.addEventListener("click", () => {
        state.files.splice(i, 1);
        renderFiles(); saveDraft(); refreshDots();
      });
      const fn = el("span", "fn"); fn.textContent = f.name; fn.title = f.name;
      row.append(fn, el("span", "fs", fmtSize(f.size)), del);
      box.append(row);
    });
    note.className = "file-note";
    if (problems && problems.length) {
      note.textContent = nb(problems.join(" "));
    } else if (restoredFileNames.length) {
      note.className = "file-note soft";
      note.textContent = nb("Файлы из черновика не сохраняются в браузере. Прикрепите заново: " + restoredFileNames.join(", ") + ".");
    } else {
      note.textContent = "";
    }
    refreshDots();
  }

  /* ---------- Навигация ---------- */
  const screens = {};
  const bottombar = $("#bottombar");
  const backBtn = $("#backBtn");
  const nextBtn = $("#nextBtn");
  const dotsBox = $("#dots");

  function buildDots() {
    dotsBox.textContent = "";
    STAGES.forEach(st => {
      const d = document.createElement("button");
      d.type = "button"; d.className = "dot"; d.dataset.step = st.num;
      d.setAttribute("aria-label", "Этап " + st.num + ": " + st.title);
      d.addEventListener("click", () => go(st.num));
      dotsBox.append(d);
    });
  }

  function stageFilled(n) {
    const hasText = qOf(n).some(q => q.type !== "consent" && q.type !== "files" && val(q.key));
    return hasText || (n === 6 && state.files.length > 0);
  }

  function refreshDots() {
    dotsBox.querySelectorAll(".dot").forEach(d => {
      const n = +d.dataset.step;
      d.classList.toggle("current", n === state.step);
      d.classList.toggle("done", n !== state.step && stageFilled(n));
      if (n === state.step) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
    });
  }

  function go(step, opts) {
    opts = opts || {};
    step = Math.max(0, Math.min(FINAL, step));
    state.step = step;

    Object.keys(screens).forEach(k => { screens[k].hidden = (+k !== step); });
    const cur = screens[step];
    cur.classList.remove("is-entering");
    void cur.offsetWidth;                       // перезапуск анимации
    cur.classList.add("is-entering");

    growAll(cur);

    // Шапка: счётчик и прогресс
    const counter = $("#counter");
    if (step >= 1 && step <= TOTAL) {
      counter.innerHTML = "<b>" + pad(step) + "</b> / " + pad(TOTAL);
    } else {
      counter.textContent = step === FINAL ? "Готово" : "";
    }
    $("#progressFill").style.width =
      (step === 0 ? 0 : step === FINAL ? 100 : (step / TOTAL) * 100) + "%";

    // Нижняя навигация только на этапах
    bottombar.hidden = !(step >= 1 && step <= TOTAL);
    backBtn.style.visibility = "visible";
    nextBtn.textContent = nb(step === TOTAL ? (ENDPOINT ? "Отправить бриф" : "Завершить и скачать") : "Далее");
    refreshDots();
    updateIntroButton();

    if (!opts.silent) {
      window.scrollTo({ top: 0, behavior: "auto" });
      const h = cur.querySelector("h2");
      if (h) h.focus({ preventScroll: true });
      saveDraft(true);
    }
  }

  backBtn.addEventListener("click", () => go(state.step - 1));
  nextBtn.addEventListener("click", () => {
    if (state.step < TOTAL) {
      if (!validateStage(state.step)) return;
      go(state.step + 1);
    } else {
      submit();
    }
  });
  $("#brand").addEventListener("click", e => { e.preventDefault(); if (state.step !== FINAL) go(0); });

  /* ---------- Проверка обязательных полей ---------- */
  function fieldFilled(q) {
    if (q.type === "consent") return !!($("#" + q.id) || {}).checked;
    if (q.type === "files") return true;
    return !!val(q.key);
  }

  // Подсвечивает пустые обязательные поля этапа, прокручивает к первому
  function validateStage(n) {
    let first = null;
    qOf(n).forEach(q => {
      if (!q.required) return;
      const wrap = $('.field[data-id="' + q.id + '"]');
      const ok = fieldFilled(q);
      wrap.classList.toggle("invalid", !ok);
      if (!ok && !first) first = wrap;
    });
    if (first) scrollToField(first);
    return !first;
  }

  function scrollToField(wrap) {
    const target = wrap.querySelector(".control, input") || wrap;
    wrap.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => target.focus({ preventScroll: true }), 350);
  }

  /* ---------- Сборка ответов ---------- */
  function snapshot() {
    return {
      v: 1,
      ts: new Date().toISOString(),
      meta: { name: val("ct_name"), company: val("ct_company"), contact: val("ct_contact") },
      stages: STAGES.map(st => {
        const items = [];
        qOf(st.num).forEach(q => {
          if (q.type === "consent") return;
          if (q.type === "files") {
            if (state.files.length) {
              items.push({ key: q.key, label: q.label,
                value: state.files.map(f => f.name + " (" + fmtSize(f.size) + ")").join("\n") });
            }
            return;
          }
          const v = val(q.key);
          if (v) items.push({ key: q.key, label: q.label, value: v, summary: !!q.summary });
        });
        return { num: st.num, title: st.title, items };
      }).filter(s => s.items.length),
      files: state.files.map(f => ({ name: f.name, size: f.size }))
    };
  }

  // Текстовая копия ответов — для скачивания
  function buildText(snap) {
    const L = [];
    const d = new Date(snap.ts);
    L.push("БРИФ");
    L.push("Дата: " + d.toLocaleString("ru-RU"));
    if (snap.meta.name) L.push("Имя: " + snap.meta.name);
    if (snap.meta.company) L.push("Компания: " + snap.meta.company);
    if (snap.meta.contact) L.push("Контакт: " + snap.meta.contact);
    snap.stages.forEach(s => {
      L.push("", "══ " + pad(s.num) + " · " + s.title.toUpperCase() + " ══", "");
      s.items.forEach(it => { L.push(it.label, it.value, ""); });
    });
    return L.join("\n").trim() + "\n";
  }

  function download(snap) {
    const text = "﻿" + buildText(snap);                  // BOM — чтобы Windows не ломал кириллицу
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    const who = (snap.meta.name || "").toLowerCase().replace(/[^a-zа-яё0-9]+/gi, "-").replace(/^-|-$/g, "");
    a.download = "brief" + (who ? "-" + who : "") + "-" + snap.ts.slice(0, 10) + ".txt";
    a.href = URL.createObjectURL(blob);
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  /* ---------- Отправка ---------- */
  let sending = false;

  function showStatus(html, withRetry) {
    const box = $("#submitStatus");
    box.textContent = "";
    const p = document.createElement("div");
    p.innerHTML = html;
    box.append(p);
    const row = el("div", "row");
    if (withRetry) {
      const retry = el("button", "btn btn-dark", "Отправить ещё раз");
      retry.type = "button";
      retry.addEventListener("click", submit);
      row.append(retry);
    }
    const dl = el("button", "btn btn-soft", "Скачать ответы");
    dl.type = "button";
    dl.addEventListener("click", () => download(state.lastSnapshot || snapshot()));
    row.append(dl);
    box.append(row);
    nbWalk(box);
    box.hidden = false;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- Сообщения для Telegram (HTML-разметка) ---------- */
  const TG_CHUNK = 3500;   // запас от лимита Telegram 4096 символов
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const clip = (t, n) => (t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t);

  // Режет текст по абзацам, потом по строкам, предложениям и словам — не посреди фразы
  function splitText(text, max) {
    if (text.length <= max) return [text];
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
    const out = [];
    let cur = "";
    pieces.forEach(([p, sep]) => {
      if ((cur + p).length > max) { if (cur.trim()) out.push(cur.trim()); cur = ""; }
      cur += p + sep;
    });
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  // Сводка + по сообщению на этап; пустые ответы уже отфильтрованы в snapshot()
  function buildTelegram(snap) {
    const m = snap.meta;
    const head = ["📋 <b>Новый бриф</b>", ""];
    if (m.name) head.push("<b>Имя:</b> " + esc(m.name));
    if (m.company) head.push("<b>Компания:</b> " + esc(m.company));
    if (m.contact) head.push("<b>Контакт:</b> " + esc(m.contact));
    const main = [];
    snap.stages.forEach(s => s.items.forEach(it => {
      if (it.summary && !/^ct_/.test(it.key)) {
        main.push("<b>" + esc(it.label) + "</b>\n" + esc(clip(it.value, 280)));
      }
    }));
    let summary = head.join("\n");
    if (main.length) summary += "\n\n" + main.join("\n\n");
    summary = splitText(summary, TG_CHUNK)[0];

    const blocks = [];
    snap.stages.forEach(s => {
      const title = pad(s.num) + " · " + s.title;
      const items = [];
      s.items.forEach(it => {
        splitText(esc(it.value), TG_CHUNK - 400).forEach((c, i) =>
          items.push((i === 0 ? "<b>" + esc(it.label) + "</b>\n" : "<b>…продолжение</b>\n") + c));
      });
      let part = 1, cur = "";
      const header = () => "<b>" + esc(title) + (part > 1 ? " (" + part + ")" : "") + "</b>";
      items.forEach(b => {
        const next = cur ? cur + "\n\n" + b : header() + "\n\n" + b;
        if (cur && next.length > TG_CHUNK) { blocks.push(cur); part++; cur = header() + "\n\n" + b; }
        else cur = next;
      });
      if (cur) blocks.push(cur);
    });
    return { summary, blocks };
  }

  async function postWithTimeout(url, init, ms) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), ms);
    try { return await fetch(url, Object.assign({ signal: ctl.signal }, init)); }
    finally { clearTimeout(t); }
  }

  async function submit() {
    if (sending) return;

    // 1. Проверяем все этапы; при ошибке — переходим к первому проблемному
    for (let n = 1; n <= TOTAL; n++) {
      if (!validateStage(n)) {
        if (n !== state.step) {
          go(n, { silent: true });
          window.scrollTo({ top: 0 });
          validateStage(n);
        }
        return;
      }
    }

    const snap = snapshot();
    state.lastSnapshot = snap;
    safeSet(LAST_KEY, JSON.stringify(snap));     // страховка: копия ответов остаётся в браузере
    saveDraft(true);

    // 2. Адрес приёмника не задан — предлагаем скачать файл
    if (!ENDPOINT) {
      download(snap);
      showFinal("offline");
      return;
    }

    // 3. Отправляем
    sending = true;
    const prev = nextBtn.textContent;
    nextBtn.disabled = true;
    nextBtn.textContent = "Отправляю…";
    $("#submitStatus").hidden = true;

    try {
      // Воркер принимает форму: summary (сводка) + blocks (по одному сообщению на этап)
      const tg = buildTelegram(snap);
      const fd0 = new FormData();
      fd0.append("summary", tg.summary);
      tg.blocks.forEach(b => fd0.append("blocks", b));
      const res = await postWithTimeout(ENDPOINT, { method: "POST", body: fd0 }, 30000);
      let data = null;
      try { data = await res.json(); } catch (e) {}
      if (!res.ok || !data || !data.ok) throw new Error("bad response");

      // Файлы уходят отдельными запросами (так не упираемся в лимит размера);
      // их сбой не отменяет уже доставленный бриф
      const failed = [];
      for (let i = 0; i < state.files.length; i++) {
        nextBtn.textContent = "Файлы " + (i + 1) + " / " + state.files.length + "…";
        try {
          const fd = new FormData();
          fd.append("summary", "📎 Файл к брифу" + (snap.meta.name ? " от " + esc(snap.meta.name) : ""));
          fd.append("files", state.files[i], state.files[i].name);
          const r = await postWithTimeout(ENDPOINT, { method: "POST", body: fd }, 120000);
          const j = await r.json().catch(() => null);
          if (!r.ok || !j || !j.ok) throw new Error("file");
        } catch (e) { failed.push(state.files[i].name); }
      }

      state.sent = true;
      clearTimeout(saveTimer);
      safeDel(DRAFT_KEY);
      showFinal("sent", failed);
    } catch (e) {
      // Ответы не теряются: черновик на месте, файл скачивается автоматически
      download(snap);
      showStatus(
        "<b>Не удалось отправить бриф автоматически.</b> Ваши ответы никуда не пропали: " +
        "они сохранены в браузере, а копия уже скачана файлом. Можно повторить отправку " +
        "или прислать файл мне в Telegram.", true);
    } finally {
      sending = false;
      nextBtn.disabled = false;
      nextBtn.textContent = prev;
    }
  }

  /* ---------- Финальный экран ---------- */
  function tgUrl() { return "https://t.me/" + SITE.telegram.replace(/^@/, ""); }

  function showFinal(mode, failedFiles) {
    const lead = $("#finalLead");
    const warn = $("#finalWarn");
    warn.hidden = true;

    if (mode === "sent") {
      lead.textContent = nb("Я получила ваш бриф и скоро с вами свяжусь.");
    } else {
      lead.textContent = nb("Бриф заполнен. Файл с ответами скачан — пришлите его мне в Telegram, и я сразу посмотрю.");
      warn.textContent = nb("Автоматическая отправка пока не подключена, поэтому ответы сохранены только файлом. Если он не скачался — нажмите «Скачать копию ответов».");
      warn.hidden = false;
    }
    if (failedFiles && failedFiles.length) {
      warn.textContent = nb("Бриф дошёл, но эти файлы отправить не удалось: " + failedFiles.join(", ") + ". Пришлите их мне в Telegram.");
      warn.hidden = false;
    }

    const steps = $("#finalSteps");
    steps.textContent = "";
    [
      "Я внимательно прочитаю ответы — особенно про места, где рвутся сделки, и про то, что подтвердить нечем.",
      "Отвечу вам в течение " + daysText(SITE.replyDays) + ": уточню детали или задам вопросы, которые остались.",
      "Договоримся о коротком разговоре и обсудим, с чего начать."
    ].forEach(t => steps.append(el("li", null, t)));

    $("#tgBtn").href = tgUrl();
    go(FINAL);
    $("#finalTitle").focus({ preventScroll: true });
  }

  $("#dlBtn").addEventListener("click", () => {
    let snap = state.lastSnapshot;
    if (!snap) { try { snap = JSON.parse(safeGet(LAST_KEY) || "null"); } catch (e) {} }
    download(snap || snapshot());
  });

  /* ---------- Интро и подвал ---------- */
  function buildIntroList() {
    const ol = $("#introList");
    STAGES.forEach(st => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.append(el("span", "n", pad(st.num)), el("span", null, st.title));
      b.addEventListener("click", () => go(st.num));
      li.append(b);
      ol.append(li);
    });
  }

  function updateIntroButton() {
    $("#startBtn").textContent = hasAnyAnswer(state.answers) ? "Продолжить" : "Начать";
  }
  $("#startBtn").addEventListener("click", () => {
    const resume = hasAnyAnswer(state.answers) && state.resumeStep > 0 ? state.resumeStep : 1;
    go(resume);
  });

  function buildFooter() {
    const ul = $("#footerLinks");
    SITE.legal.forEach(item => {
      const li = document.createElement("li");
      li.append(link(item, nb(item.title)));
      ul.append(li);
    });
    $("#footerReq").textContent = nb(SITE.requisites);
    $("#footerTg").href = tgUrl();
  }

  /* ---------- Уведомление ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = nb(msg);
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 4500);
  }

  /* ---------- Восстановление черновика ---------- */
  function restoreDraft() {
    let d = null;
    try { d = JSON.parse(safeGet(DRAFT_KEY) || "null"); } catch (e) {}
    if (!d || d.v !== 1 || !hasAnyAnswer(d.answers)) return false;

    Object.keys(d.answers).forEach(key => {
      if (key === "ct_consent") return;                 // согласие даётся заново при отправке
      const q = QUESTIONS.find(x => x.key === key);
      if (!q) return;
      state.answers[key] = d.answers[key];
      const input = $("#" + q.id);
      if (input && "value" in input) input.value = d.answers[key];
    });
    restoredFileNames = (d.files || []).map(f => f.name);
    state.resumeStep = Math.min(Math.max(+d.step || 1, 1), TOTAL);
    return true;
  }

  /* ---------- Старт ---------- */
  function init() {
    document.title = SITE.brand + " на сайт";
    $("#brand").textContent = SITE.brand;

    screens[0] = $("#screen-0");
    STAGES.forEach(st => {
      const sec = buildStage(st);
      mount.append(sec);
      screens[st.num] = sec;
    });
    screens[FINAL] = $("#screen-final");

    // Фото на финальном экране; если файла нет — остаётся мягкий градиент
    const img = $("#finalPhoto");
    img.alt = SITE.photoAlt;
    img.addEventListener("error", () => {
      $("#finalPhotoBox").classList.add("no-img");
    });
    img.src = SITE.photo;

    buildIntroList();
    buildDots();
    buildFooter();

    const restored = restoreDraft();
    if (restoredFileNames.length) renderFiles();
    nbWalk(document.body);
    go(0, { silent: true });

    if (restored) {
      toast("Черновик восстановлен");
    }

    // Поля пересчитывают высоту при изменении ширины окна
    let rt = null;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => growAll(screens[state.step]), 120);
    });
    // Сохраняем черновик, когда вкладку закрывают или скрывают
    window.addEventListener("pagehide", () => saveDraft(true));
    document.addEventListener("visibilitychange", () => { if (document.hidden) saveDraft(true); });
  }

  init();
})();
