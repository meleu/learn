/* syntax-highlight-rego.js — Tiny dependency-free syntax highlighter for the languages that show up in policy-as-code lessons: rego, json, yaml, dockerfile and shell. Highlights <pre><code class="lang-XXX"> blocks. */

(function () {
  "use strict";

  var CSS = `
.tok-comment { color: var(--ink-faint); font-style: italic; }
.tok-string  { color: var(--good); }
.tok-number  { color: var(--warn); }
.tok-keyword { color: var(--accent); font-weight: 600; }
.tok-builtin { color: var(--ink); font-weight: 600; }
.tok-special { color: var(--accent); font-weight: 600; font-style: italic; }
.tok-key     { color: var(--ink); font-weight: 600; }
.tok-prompt  { color: var(--ink-faint); user-select: none; }
@media print {
  .tok-comment { color: #666; }
  .tok-string  { color: #1f6b3a; }
  .tok-keyword, .tok-special { color: #8f2b1f; }
}
`;

  var REGO_KEYWORDS = ["package", "import", "default", "not", "if", "contains", "some", "every", "in", "as", "with", "else", "null", "true", "false"];
  var REGO_BUILTINS = ["sprintf", "count", "sum", "max", "min", "concat", "split", "startswith", "endswith", "contains", "lower", "upper", "trim", "trim_space", "regex", "object", "json", "array", "sort", "to_number", "is_string", "is_number", "is_array", "is_object", "is_boolean", "is_null", "walk", "print", "type_name", "format_int", "indexof", "substring", "replace", "glob", "units", "numbers", "strings", "time", "semver", "yaml", "sets"];

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* Splits text into protected regions (strings, comments) and plain code, so
     keyword matching never fires inside a string literal. */
  function tokenize(src, patterns, plain) {
    var out = "";
    var i = 0;
    while (i < src.length) {
      var best = null, bestIdx = -1, bestCls = null;
      for (var p = 0; p < patterns.length; p++) {
        patterns[p].re.lastIndex = i;
        var m = patterns[p].re.exec(src);
        if (m && (bestIdx === -1 || m.index < bestIdx)) {
          best = m; bestIdx = m.index; bestCls = patterns[p].cls;
        }
      }
      if (!best) { out += plain(src.slice(i)); break; }
      out += plain(src.slice(i, bestIdx));
      out += '<span class="' + bestCls + '">' + esc(best[0]) + "</span>";
      i = bestIdx + best[0].length;
    }
    return out;
  }

  function wordRe(words) {
    return new RegExp("\\b(" + words.join("|") + ")\\b", "g");
  }

  var LANGS = {
    rego: function (src) {
      var protect = [
        { re: /#[^\n]*/g, cls: "tok-comment" },
        { re: /`[^`]*`/g, cls: "tok-string" },
        { re: /"(?:[^"\\\n]|\\.)*"/g, cls: "tok-string" }
      ];
      var kw = wordRe(REGO_KEYWORDS);
      var bi = wordRe(REGO_BUILTINS);
      return tokenize(src, protect, function (chunk) {
        return esc(chunk)
          .replace(/\b(input|data)\b/g, '<span class="tok-special">$1</span>')
          .replace(kw, '<span class="tok-keyword">$1</span>')
          .replace(bi, '<span class="tok-builtin">$1</span>')
          .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');
      });
    },

    json: function (src) {
      var protect = [
        { re: /"(?:[^"\\\n]|\\.)*"(?=\s*:)/g, cls: "tok-key" },
        { re: /"(?:[^"\\\n]|\\.)*"/g, cls: "tok-string" }
      ];
      return tokenize(src, protect, function (chunk) {
        return esc(chunk)
          .replace(/\b(true|false|null)\b/g, '<span class="tok-keyword">$1</span>')
          .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');
      });
    },

    yaml: function (src) {
      var protect = [
        { re: /#[^\n]*/g, cls: "tok-comment" },
        { re: /"(?:[^"\\\n]|\\.)*"/g, cls: "tok-string" },
        { re: /'(?:[^'\n])*'/g, cls: "tok-string" },
        { re: /^[ \t-]*[A-Za-z_][\w.\/-]*(?=\s*:)/gm, cls: "tok-key" }
      ];
      return tokenize(src, protect, function (chunk) {
        return esc(chunk)
          .replace(/\b(true|false|null|yes|no)\b/g, '<span class="tok-keyword">$1</span>')
          .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');
      });
    },

    dockerfile: function (src) {
      var protect = [
        { re: /#[^\n]*/g, cls: "tok-comment" },
        { re: /"(?:[^"\\\n]|\\.)*"/g, cls: "tok-string" }
      ];
      return tokenize(src, protect, function (chunk) {
        return esc(chunk).replace(
          /^\s*(FROM|RUN|CMD|LABEL|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|HEALTHCHECK|SHELL|AS)\b/gm,
          function (m, kw) { return m.replace(kw, '<span class="tok-keyword">' + kw + "</span>"); }
        );
      });
    },

    shell: function (src) {
      var protect = [
        { re: /#[^\n]*/g, cls: "tok-comment" },
        { re: /'(?:[^'\n])*'/g, cls: "tok-string" },
        { re: /"(?:[^"\\\n]|\\.)*"/g, cls: "tok-string" }
      ];
      return tokenize(src, protect, function (chunk) {
        return esc(chunk)
          .replace(/^(\s*)\$ /gm, '$1<span class="tok-prompt">$ </span>')
          .replace(/\b(opa|conftest|kubectl|docker|helm|git|jq|curl)\b/g, '<span class="tok-keyword">$1</span>')
          .replace(/(^|\s)(--?[a-zA-Z][\w-]*)/g, '$1<span class="tok-builtin">$2</span>');
      });
    }
  };

  function init() {
    if (!document.getElementById("syntax-highlight-styles")) {
      var s = document.createElement("style");
      s.id = "syntax-highlight-styles";
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    Array.prototype.forEach.call(document.querySelectorAll("pre > code[class*='lang-']"), function (code) {
      var match = /lang-([a-z]+)/.exec(code.className);
      if (!match) return;
      var fn = LANGS[match[1]];
      if (!fn) return;
      code.innerHTML = fn(code.textContent);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
