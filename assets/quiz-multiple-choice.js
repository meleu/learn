/* quiz-multiple-choice.js — Retrieval-practice widget: multiple-choice questions with immediate, automatic feedback. Options are shuffled on load so position carries no information. Injects its own styles; no dependencies. */

(function () {
  "use strict";

  var CSS = `
.quiz {
  font-family: var(--sans);
  border: 1px solid var(--rule);
  border-radius: 4px;
  background: var(--paper-sunk);
  padding: 1.25rem 1.4rem;
  margin: 0 0 1.4rem;
}
.quiz-index {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 0.55rem;
}
.quiz-q {
  font-family: var(--serif);
  font-size: 1.05rem;
  line-height: 1.45;
  margin: 0 0 1rem;
  color: var(--ink);
}
.quiz-q code { font-size: 0.82em; }
.quiz-options { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.45rem; }
.quiz-options li { margin: 0; }
.quiz-opt {
  display: block;
  width: 100%;
  text-align: left;
  font-family: var(--sans);
  font-size: 0.86rem;
  line-height: 1.45;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 3px;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
}
.quiz-opt code { font-size: 0.85em; background: var(--code-bg); }
.quiz-opt:hover:not(:disabled) { border-color: var(--ink-faint); background: var(--code-bg); }
.quiz-opt:disabled { cursor: default; }
.quiz-opt .mark { float: right; font-weight: 700; margin-left: 0.6rem; }
.quiz-opt.is-correct { border-color: var(--good); background: var(--good-soft); color: var(--ink); }
.quiz-opt.is-correct .mark { color: var(--good); }
.quiz-opt.is-wrong { border-color: var(--accent); background: var(--accent-soft); }
.quiz-opt.is-wrong .mark { color: var(--accent); }
.quiz-opt.is-muted { opacity: 0.5; }
.quiz-explain {
  display: none;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--ink-soft);
  margin-top: 0.95rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--rule);
}
.quiz-explain code { font-size: 0.85em; }
.quiz.is-answered .quiz-explain { display: block; }
.quiz-verdict { font-weight: 700; color: var(--ink); }
@media print {
  .quiz-opt { border-color: #bbb; }
  .quiz-explain { display: block; }
}
`;

  function injectStyles() {
    if (document.getElementById("quiz-mc-styles")) return;
    var s = document.createElement("style");
    s.id = "quiz-mc-styles";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function build(quiz, index) {
    // The stylesheet keys off .quiz; the JS keys off [data-quiz].
    // Add the class ourselves so the attribute alone is enough to get a working widget.
    quiz.classList.add("quiz");
    var list = quiz.querySelector(".quiz-options");
    if (!list) return;

    var items = shuffle(Array.prototype.slice.call(list.querySelectorAll("li")));
    list.innerHTML = "";

    var label = quiz.querySelector(".quiz-index");
    if (!label) {
      label = document.createElement("div");
      label.className = "quiz-index";
      label.textContent = "Recall " + index;
      quiz.insertBefore(label, quiz.firstChild);
    }

    items.forEach(function (li) {
      var correct = li.hasAttribute("data-correct");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-opt";
      btn.innerHTML = li.innerHTML;
      btn.addEventListener("click", function () {
        if (quiz.classList.contains("is-answered")) return;
        quiz.classList.add("is-answered");

        Array.prototype.forEach.call(list.querySelectorAll(".quiz-opt"), function (b) {
          b.disabled = true;
          if (b.dataset.correct === "true") {
            b.classList.add("is-correct");
            b.insertAdjacentHTML("beforeend", '<span class="mark">correct</span>');
          } else if (b === btn) {
            b.classList.add("is-wrong");
            b.insertAdjacentHTML("beforeend", '<span class="mark">chosen</span>');
          } else {
            b.classList.add("is-muted");
          }
        });

        var explain = quiz.querySelector(".quiz-explain");
        if (explain) {
          var verdict = document.createElement("span");
          verdict.className = "quiz-verdict";
          verdict.textContent = correct ? "Right. " : "Not quite. ";
          explain.insertBefore(verdict, explain.firstChild);
        }
      });
      if (correct) btn.dataset.correct = "true";

      var wrapper = document.createElement("li");
      wrapper.appendChild(btn);
      list.appendChild(wrapper);
    });
  }

  function init() {
    injectStyles();
    Array.prototype.forEach.call(document.querySelectorAll("[data-quiz]"), function (q, i) {
      build(q, i + 1);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
