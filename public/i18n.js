/**
 * Hector's Car Wash — Language Switcher (EN ↔ ES)
 * Same system as the Brothers Taquizas build.
 *
 * How it works:
 *  1. On page load, checks localStorage for the user's saved language.
 *     If none saved, auto-detects Spanish browser and defaults to ES.
 *  2. Walks the DOM once, finds every text node whose content matches
 *     a key in window.__I18N_DICT__, and stores the ORIGINAL English
 *     for later restoration.
 *  3. If active language is Spanish, replaces the text with the translation.
 *  4. The toggle button swaps between EN and ES, persists the choice,
 *     and updates <html lang="..."> for SEO/accessibility.
 *
 *  Elements inside [data-no-i18n] are never translated (used for
 *  verbatim customer review quotes, names, and addresses).
 */
(function () {
  const DICT = window.__I18N_DICT__ || {};
  const STORAGE_KEY = 'hcw-lang';

  function decodeEntities(s) {
    const el = document.createElement('textarea');
    el.innerHTML = s;
    return el.value;
  }

  const LOOKUP = {};
  Object.keys(DICT).forEach(function (rawEn) {
    const en = decodeEntities(rawEn).trim();
    const es = decodeEntities(DICT[rawEn]).trim();
    if (en && es && en !== es) LOOKUP[en] = es;
  });

  function markTranslatables() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          const p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          const tag = p.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
          if (p.closest('[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
          const txt = node.nodeValue && node.nodeValue.trim();
          return txt && LOOKUP[txt] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );
    const marks = [];
    let n;
    while ((n = walker.nextNode())) marks.push(n);
    marks.forEach(function (textNode) {
      if (!textNode.__hcw_original) textNode.__hcw_original = textNode.nodeValue;
    });
    return marks;
  }

  // Placeholders (form inputs)
  const PLACEHOLDER_ELEMENTS = [];
  function markPlaceholders() {
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      const en = el.getAttribute('placeholder').trim();
      if (LOOKUP[en]) {
        el.__hcw_placeholder_en = en;
        PLACEHOLDER_ELEMENTS.push(el);
      }
    });
  }

  // Select options
  const OPTION_ELEMENTS = [];
  function markOptions() {
    document.querySelectorAll('option').forEach(function (el) {
      const en = el.textContent.trim();
      if (LOOKUP[en]) {
        el.__hcw_option_en = en;
        OPTION_ELEMENTS.push(el);
      }
    });
  }

  // <title> and meta description
  let TITLE_EN = null;
  let META_DESC_EL = null;
  let META_DESC_EN = null;
  function markMeta() {
    if (document.title && LOOKUP[document.title.trim()]) {
      TITLE_EN = document.title.trim();
    }
    const md = document.querySelector('meta[name="description"]');
    if (md) {
      const c = (md.getAttribute('content') || '').trim();
      if (LOOKUP[c]) { META_DESC_EL = md; META_DESC_EN = c; }
    }
  }

  const TEXT_NODES = markTranslatables();
  markPlaceholders();
  markOptions();
  markMeta();

  function applyLang(lang) {
    document.documentElement.lang = (lang === 'es') ? 'es' : 'en';

    TEXT_NODES.forEach(function (node) {
      const original = node.__hcw_original || node.nodeValue;
      const originalTrimmed = original.trim();
      if (lang === 'es' && LOOKUP[originalTrimmed]) {
        node.nodeValue = original.replace(originalTrimmed, LOOKUP[originalTrimmed]);
      } else {
        node.nodeValue = original;
      }
    });

    PLACEHOLDER_ELEMENTS.forEach(function (el) {
      const en = el.__hcw_placeholder_en;
      el.setAttribute('placeholder', (lang === 'es' && LOOKUP[en]) ? LOOKUP[en] : en);
    });

    OPTION_ELEMENTS.forEach(function (el) {
      const en = el.__hcw_option_en;
      el.textContent = (lang === 'es' && LOOKUP[en]) ? LOOKUP[en] : en;
    });

    if (TITLE_EN) {
      document.title = (lang === 'es') ? LOOKUP[TITLE_EN] : TITLE_EN;
    }
    if (META_DESC_EL) {
      META_DESC_EL.setAttribute('content', (lang === 'es') ? LOOKUP[META_DESC_EN] : META_DESC_EN);
    }

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.setAttribute('data-active', lang);
      const enBtn = btn.querySelector('[data-lang="en"]');
      const esBtn = btn.querySelector('[data-lang="es"]');
      if (enBtn) enBtn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
      if (esBtn) esBtn.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
    });
  }

  function bindToggle() {
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const target = e.target.closest('[data-lang]');
        if (!target) return;
        const lang = target.getAttribute('data-lang');
        localStorage.setItem(STORAGE_KEY, lang);
        applyLang(lang);
      });
    });
  }

  function initialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.startsWith('es') ? 'es' : 'en';
  }

  bindToggle();
  applyLang(initialLang());
})();
