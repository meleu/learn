/* recall-prompt.js — Free-recall retrieval practice: the learner writes an answer from memory before the model answer is revealed. Harder than multiple choice, and the effort is the point. Injects its own styles; no dependencies. */

(function () {
  "use strict";

  var CSS = `
.recall {
  font-family: var(--sans);
  border-left: 3px solid var(--ink-faint);
  padding: 0.2rem 0 0.2rem 1.2rem;
  margin: 0 0 1.6rem;
}
.recall-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin: 0 0 0.5rem;
}
.recall-q {
  font-family: var(--serif);
  font-size: 1.05rem;
  line-height: 1.45;
  margin: 0 0 0.85rem;
}
.recall-input {
  display: block;
  width: 100%;
  min-height: 5.5rem;
  font-family: var(--mono);
  font-size: 0.8rem;
  line-height: 1.55;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 3px;
  padding: 0.7rem 0.8rem;
  resize: vertical;
}
.recall-input:focus { outline: 2px solid var(--ink-faint); outline-offset: -1px; }
.recall-reveal {
  font-family: var(--sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--paper);
  background: var(--ink);
  border: 0;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin-top: 0.7rem;
  cursor: pointer;
}
.recall-reveal:hover { background: var(--accent); }
.recall-answer {
  display: none;
  font-size: 0.84rem;
  line-height: 1.6;
  color: var(--ink-soft);
  background: var(--paper-sunk);
  border-radius: 3px;
  padding: 0.9rem 1rem;
  margin-top: 0.85rem;
}
.recall-answer > :first-child { margin-top: 0; }
.recall-answer > :last-child { margin-bottom: 0; }
.recall-answer pre { font-size: 0.76rem; margin-bottom: 0; }
.recall.is-revealed .recall-answer { display: block; }
.recall.is-revealed .recall-reveal { display: none; }
@media print {
  .recall-input { min-height: 4rem; }
  .recall-reveal { display: none; }
  .recall-answer { display: block; }
}
`;

  function injectStyles() {
    if (document.getElementById("recall-prompt-styles")) return;
    var s = document.createElement("style");
    s.id = "recall-prompt-styles";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function build(recall) {
    if (!recall.querySelector(".recall-label")) {
      var label = document.createElement("p");
      label.className = "recall-label";
      label.textContent = recall.dataset.recall || "Write it from memory";
      recall.insertBefore(label, recall.firstChild);
    }

    var answer = recall.querySelector(".recall-answer");
    if (!answer) return;

    var input = document.createElement("textarea");
    input.className = "recall-input";
    input.setAttribute("spellcheck", "false");
    input.placeholder = "Answer from memory first — wrong beats blank.";
    answer.parentNode.insertBefore(input, answer);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "recall-reveal";
    btn.textContent = "Reveal the answer";
    btn.addEventListener("click", function () {
      recall.classList.add("is-revealed");
    });
    answer.parentNode.insertBefore(btn, answer);
  }

  function init() {
    injectStyles();
    Array.prototype.forEach.call(document.querySelectorAll("[data-recall]"), build);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
