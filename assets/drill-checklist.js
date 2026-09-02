/* drill-checklist.js — A tickable list of real-world steps (terminal commands, physical actions) whose progress persists in localStorage, so a half-finished drill survives closing the tab. Injects its own styles; no dependencies. */

(function () {
  "use strict";

  var CSS = `
.drill {
  font-family: var(--sans);
  list-style: none;
  counter-reset: drill;
  margin: 0 0 1.6rem;
  padding: 0;
  border: 1px solid var(--rule);
  border-radius: 4px;
  overflow: hidden;
}
.drill > li {
  counter-increment: drill;
  margin: 0;
  padding: 0.95rem 1.1rem 0.95rem 3.1rem;
  position: relative;
  border-bottom: 1px solid var(--rule);
  font-size: 0.86rem;
  line-height: 1.5;
  background: var(--paper);
  transition: background 0.15s ease, opacity 0.15s ease;
}
.drill > li:last-child { border-bottom: 0; }
.drill > li::before {
  content: counter(drill);
  position: absolute;
  left: 1.05rem;
  top: 0.95rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--ink-faint);
  width: 1.2rem;
  text-align: center;
  line-height: 1.5rem;
}
.drill > li.is-done { background: var(--good-soft); }
.drill > li.is-done .drill-body { opacity: 0.55; }
.drill-tick {
  position: absolute;
  left: 1.05rem;
  top: 0.85rem;
  width: 1.2rem;
  height: 1.2rem;
  padding: 0;
  border: 1px solid var(--ink-faint);
  border-radius: 3px;
  background: var(--paper);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease;
  color: var(--good);
  font-size: 0.8rem;
  line-height: 1;
}
.drill > li:hover .drill-tick,
.drill > li.is-done .drill-tick { opacity: 1; }
.drill > li:hover::before { opacity: 0; }
.drill > li.is-done::before { opacity: 0; }
.drill > li.is-done .drill-tick { border-color: var(--good); background: var(--good-soft); }
.drill-body > :first-child { margin-top: 0; }
.drill-body > :last-child { margin-bottom: 0; }
.drill-body pre { margin: 0.6rem 0 0; font-size: 0.76rem; }
.drill-body p { margin: 0 0 0.5rem; font-family: var(--sans); }
.drill-progress {
  font-family: var(--sans);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin: 0 0 0.5rem;
}
.drill-progress.is-complete { color: var(--good); }
@media print {
  .drill-tick { opacity: 1; }
  .drill > li.is-done { background: none; }
  .drill > li.is-done .drill-body { opacity: 1; }
}
`;

  function injectStyles() {
    if (document.getElementById("drill-checklist-styles")) return;
    var s = document.createElement("style");
    s.id = "drill-checklist-styles";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch (e) {
      return {};
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* private browsing, blocked storage: drill still works, just forgets */ }
  }

  function build(drill) {
    // The stylesheet keys off .drill; the JS keys off [data-drill].
    // Add the class ourselves so the attribute alone is enough to get a working widget.
    drill.classList.add("drill");
    var key = "drill:" + (drill.dataset.drill || "unnamed");
    var state = read(key);
    var steps = Array.prototype.slice.call(drill.children).filter(function (n) {
      return n.tagName === "LI";
    });

    var progress = document.createElement("p");
    progress.className = "drill-progress";
    drill.parentNode.insertBefore(progress, drill);

    function refresh() {
      var done = steps.filter(function (_, i) { return state[i]; }).length;
      progress.textContent = done + " of " + steps.length + " steps done";
      progress.classList.toggle("is-complete", done === steps.length && steps.length > 0);
    }

    steps.forEach(function (li, i) {
      var body = document.createElement("div");
      body.className = "drill-body";
      while (li.firstChild) body.appendChild(li.firstChild);

      var tick = document.createElement("button");
      tick.type = "button";
      tick.className = "drill-tick";
      tick.setAttribute("aria-label", "Mark step " + (i + 1) + " complete");

      function paint() {
        var done = !!state[i];
        li.classList.toggle("is-done", done);
        tick.textContent = done ? "✓" : "";
        tick.setAttribute("aria-pressed", done ? "true" : "false");
      }

      tick.addEventListener("click", function () {
        state[i] = !state[i];
        write(key, state);
        paint();
        refresh();
      });

      li.appendChild(tick);
      li.appendChild(body);
      paint();
    });

    refresh();
  }

  function init() {
    injectStyles();
    Array.prototype.forEach.call(document.querySelectorAll("[data-drill]"), build);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
