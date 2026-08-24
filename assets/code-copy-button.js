/* code-copy-button.js — Adds a subtle copy-to-clipboard button to the top right of every <pre> block. Captures the source text before inserting itself, so the button's own label can never end up in the clipboard. Strips leading "$ " shell prompts on copy. Injects its own styles; no dependencies. */

(function () {
  "use strict";

  var CSS = `
pre.has-copy { position: relative; padding-right: 4.2rem; }

.code-copy {
  position: absolute;
  top: 0.45rem;
  right: 0.45rem;
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--ink-faint);
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 3px;
  padding: 0.28rem 0.5rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

/* Subtle: fades in on hover, but always present for keyboard and touch users. */
pre.has-copy:hover .code-copy,
.code-copy:focus-visible { opacity: 1; }
@media (hover: none) { .code-copy { opacity: 0.55; } }

.code-copy:hover { color: var(--ink); border-color: var(--ink-faint); }
.code-copy:focus-visible { outline: 2px solid var(--ink-faint); outline-offset: 1px; }
.code-copy.is-done { opacity: 1; color: var(--good); border-color: var(--good); }
.code-copy.is-failed { opacity: 1; color: var(--accent); border-color: var(--accent); }

@media print {
  .code-copy { display: none; }
  pre.has-copy { padding-right: 1.1rem; }
}
`;

  function injectStyles() {
    if (document.getElementById("code-copy-styles")) return;
    var s = document.createElement("style");
    s.id = "code-copy-styles";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Shell examples are written with a "$ " prompt for readability. Nobody wants
     that in their paste buffer. */
  function stripPrompts(text) {
    return text.replace(/^([ \t]*)\$ /gm, "$1");
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        if (!fallbackCopy(text)) throw new Error("copy failed");
      });
    }
    return fallbackCopy(text) ? Promise.resolve() : Promise.reject(new Error("copy failed"));
  }

  function attach(pre) {
    if (pre.querySelector(".code-copy")) return;

    /* Captured BEFORE the button exists, so the label is never part of the source. */
    var source = stripPrompts(pre.textContent.replace(/\s+$/, ""));
    if (!source) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy no-print";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");

    var timer = null;
    function flash(label, cls) {
      btn.textContent = label;
      btn.classList.remove("is-done", "is-failed");
      if (cls) btn.classList.add(cls);
      clearTimeout(timer);
      timer = setTimeout(function () {
        btn.textContent = "Copy";
        btn.classList.remove("is-done", "is-failed");
      }, 1400);
    }

    btn.addEventListener("click", function () {
      copyText(source).then(
        function () { flash("Copied", "is-done"); },
        function () { flash("Ctrl+C", "is-failed"); }
      );
    });

    pre.classList.add("has-copy");
    pre.appendChild(btn);
  }

  function init() {
    injectStyles();
    Array.prototype.forEach.call(document.querySelectorAll("pre"), attach);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
