# Working Notes

Terse by design (LLM-read every session). All facts below were verified locally
unless marked otherwise; `(sN)` = session N.

## User preferences

- **Both modes, every lesson**: browser reading + quiz, then a terminal drill. Never
  quiz-only or drill-only.
- **Simple examples over realistic ones** when teaching a concept. Work-shaped configs
  only for lessons where the *format* is the point.
- **Engine before wrapper** (explicit ask): fundamentals in plain `opa`; conftest staged later.
- Goal is **teaching coworkers** → prefer framings a third party can repeat; explicitly flag
  "this is the bit your coworkers will get wrong".
- **Audits example code** rather than skimming (caught an unused `replicas` rule in lesson 1
  on first read). No filler or throwaway lines; if a line exists for a non-obvious pedagogical
  reason, say so in prose. Redundancy reads as a mistake — these policies get handed to coworkers
  as models of good Rego.
- **Probes the flag surface past the drill** (s3): drill asked for 2 extra rules, they wrote 5;
  kept the package non-`main` deliberately to exercise `--all-namespaces`; tested `--fail-on-warn`
  unprompted. → State a flag's exact behaviour or leave it out; name-dropping creates homework.
  Drills can safely ask for less than they will do.
- **Accuracy pressure** (s6): challenged "older" applied to `xs[_]` and asked if it was deprecated
  (it is not). → **Never let a comparative adjective stand in for a citation.** Say *by whom* and
  *why* a form is preferred, and whether the other is still valid. Check Regal on *both* sides of
  a style claim, not just the criticised side.
- **Reads for ordering, not just correctness** (s7): reviewed lesson 5 and rejected three
  placements — a key-idea box quoting `some … in` before the notation appeared, a verdict callout
  wedged between a code block and the explanation of that block's last item, and OPA release
  chronology as support for a style claim. → **Nothing may judge or quote a thing before the thing
  is on the page**, and background that does not change what the learner writes gets cut, however
  true. Verdicts come after the walkthrough, not inside the code comments.
- Conventions: practice files in `exercises/NNN/` **inside the workspace**, plain zero-padded, no
  suffix, never overwrite an existing dir. Brings own example code (lesson 2's `package signup`
  snippet was theirs verbatim) — use what they hand over, verify it runs first. Hand-formats
  multi-line `sprintf` with trailing commas (`opa fmt` style) — match it.

## Config formats in scope at work

Kubernetes YAML · Dockerfile · generic YAML/JSON · `.gitlab-ci.yml` · `pom.xml` (XML).
Rotate rather than defaulting to Kubernetes. `pom.xml` is unusual for conftest material and
worth covering properly (`conftest test --parser xml pom.xml`).

## Environment (s1)

`opa` 1.19.0, `conftest` dev build (OPA 1.19.0), `regal` 0.42.0 — all linuxbrew, on PATH.
Rego v1 is default: `import rego.v1` is a no-op; v0 bodiless rules (`p { ... }`) are a parse error.

## Shared assets

`../assets/` is shared with sibling workspaces and moves independently — `ls ../assets/` at the
start of each session. `code-copy-button.js` (arrived from outside) is wired into all 5 lesson
and 3 reference pages, but not `index.html`. `rego-and-or-grid.css` added by lesson 4.

## Shipped lessons

1. Fundamentals in plain `opa`; conftest mentioned only as a signpost.
2. Partial/multi-value rules — `contains`, sets. Also absorbed "undefined vs false vs empty".
3. `0003-the-conftest-contract.html` — the four conventions, `conftest parse`, a Deployment policy,
   report count as rules × documents, `deny` vs `warn` exit codes, both silent passes. Reference 3
   shipped alongside.
4. `0004-and-down-or-sideways.html` — "AND goes down, OR goes sideways", the `input.kind` guard
   (closes lesson 3's debt), body order-independence, `msg := sprintf(...)` as an expression inside
   the AND, the dead rule from stacked equalities, three spellings of OR (`in` a set / two
   definitions / helper rule). Glossary gained **Logic: AND and OR**.
5. `0005-the-variable-is-the-loop.html` — variable-as-question ("for which c?", not "for each c"),
   one definition producing many messages, corrected summary arithmetic (LR-0009), three spellings
   plus the undeclared-variable form Regal flags, iterating a missing path, `rego_unsafe_var_error`
   as the one iteration mistake the compiler catches, set-has-no-positions (closes LR-0005 debt),
   `every` in a helper with the "prefer `some`, it names the offender" judgement. Glossary gained
   **Iteration**; no new shared asset.
   **Re-ordered in s7** on the user's review. Sections now: 1 wall · 2 variable · 3 rule · 4 for-loop
   misleads · 5 sets have no positions · 6 other spellings · 7 iterating over nothing · 8 `every`.
   Every forward reference is gone: sets now precede the spellings section it grounds (the brackets
   ambiguity argument), and "iterating over nothing" sits next to `every`'s undefined-on-missing
   mirror. §2 demos `some c in …; c.name` (was the wildcard) so the key-idea box quotes code already
   shown, and its two-column output shows `c` bound to a whole container — pre-empting the recall
   prompt's whole-array bug. §3 opens by adding `endswith` to that same query (3 rows → 2) so the
   rule body arrives as "the query you already wrote". Cut: the OPA v0.34.0 chronology and `src-5`.
   The wildcard verdict and the deeply-nested callout now follow all three forms' walkthroughs.

Sequence was changed by the user after lesson 2 (LR-0004): go straight to conftest, deferring the
fundamentals items that became lessons 4–5.

## Backlog (candidate next lessons)

- **5b. Helper functions** — from the Styra OR article the user supplied (s4):
  `allowed_firstname(name) if name == "joe"`, plus equality pattern-matching on arguments
  (`alcohol_allowed("Sweden", age) if age > 18`). Functions are untaught so far. The article's
  **multiple-outputs** warning (two definitions evaluating to different values → runtime error) is
  LR-0005's `eval_conflict_error` in a second costume → teach it inside item 6, not alone.
- **6. `conftest verify`** — policies need tests. User asked (s3) to skip `opa test` and go straight
  to the wrapper; sound, since `conftest verify` *is* OPA's test runner and the skill (`test_` rules
  + `with input as`) is identical. Keep `opa test` as a one-line footnote: OPA's policy-testing docs
  are written in it and it alone has `--coverage --threshold`. Hook: LR-0005's runtime
  `eval_conflict_error` passes `opa check` and fires only on one input — exactly what a unit test is
  for. Open the lesson by listing all five silent passes and asking which a test would catch.
- **7. Conftest part two** — `--combine`, `exception` rules, `--data` for exception lists, rule
  suffixes as the thing exceptions key off.
- **8. Non-Kubernetes parsers** — Dockerfile, XML (`pom.xml`), `.gitlab-ci.yml`.
- **9. CI wiring in GitLab** — TAP guard + canary fixture from reference 3, `--fail-on-warn`
  renumbering and `--all-namespaces` limits (LR-0006), `regal lint`, `opa eval -i` multi-doc gotcha.
- **Comprehensions — the obvious next gap.** Lesson 5 deliberately kept them out and signposts them
  in the ask-teacher box. Natural home for `count()`-based rules ("no more than N of X") and the
  "none of" shape. Own short lesson, or a section of item 6.

## Open threads

- Lesson 4 handles `else` and `default` in one note under §6 (both complete-rule constructs, so
  neither applies to `deny`). If pushed on `else`: it fixes evaluation order, and the one real use
  is guarding an expensive call such as `http.send` behind a cache check.
- Set-vs-array is **done** — lesson 5 §7 and the glossary's Set entry.
- Lesson 5's drill step 10 asks the user to compare a `some` policy against an `every` policy and
  defend a choice — the first *design* judgement rather than a syntax one. Worth a learning record
  either way.

## The five silent passes (the course's spine)

1. Missing key in a rule body (L3).
2. Non-`main` package → `0 tests, 0 passed`, exit 0 (L3).
3. Undefined value interpolated into `msg := sprintf(...)` (L4) — generalises: **any** `:=` with an
   undefined RHS kills the body (s5), e.g. a bare `x := input.missing.deep`.
4. Iterating a missing/misspelled path = zero bindings = clean pass, exit 0 (L5).
5. Binding the whole array by mistake (`c := …containers` then `c.name`) — correct key, wrong *kind*
   of value. Reports `1 test, 1 passed`, exit 0 (L5 recall prompt).

## Conftest facts (s1–s3; baked into lesson 3 / reference 3)

- Defaults: policy dir `policy/`, namespace `main`, `deny` exits 1, `warn` exits 0.
- Rule names: `deny`, `violation` (exact synonym), `warn`; `_suffix` allowed (`deny_replicas`).
- **`N tests` counts rule evaluations = definitions × parsed documents**, not files (3 rules over a
  2-document YAML → `6 tests`). Counts **definitions**, not names: two `deny` definitions over one
  document → `2 tests`. Helper and non-`deny`/`warn`/`violation` rules are not counted.
  Superseded in general by the s6 arithmetic below — "definitions × documents" is a special case.
- **The `0 tests` trap** is the only silent misconfiguration: a non-`main` package → `0 tests`,
  exit 0, and **no built-in flag rejects it** (`--strict` is Rego compiler strictness, not this).
  Verified that a missing `-p` dir, an empty `-p` dir, and a Rego syntax error each exit 1 with
  their own `Error:`. So CI needs exactly one added check: "did any rule actually run?"
- **`-o tap` is the cleanest signal**: prints a `1..N` plan line when rules ran, nothing at all when
  none did → `[ -s report.tap ] || exit 1` is the whole guard, no `jq`. Verified over six cases
  (violating, clean, wrong package, empty dir, missing dir, syntax error). `-o json` emits
  `"successes": 0` even when nothing ran, so a naive presence-test on JSON fails.
- **Canary fixture** is the stronger second guard: a committed manifest that must be denied, checked
  by grepping `^not ok` — *not* the exit code, since a crash also exits non-zero. Catches rules that
  load but no longer match, which the TAP guard cannot.
- `--combine` rewrites `input` into an array of `{"path", "contents"}` objects — single-document
  rules stop matching. Not a drop-in flag.
- `exception contains rules if …` yields rule **suffixes**: `["replicas"]` excepts `deny_replicas`.
  Prints as `EXCP`, counted in the summary's last column, exit 0. Suffixes are load-bearing.
- **`--all-namespaces`** queries every package, so a non-`main` package runs normally — but it cures
  a wrong *package* only: rules named something other than `deny`/`violation`/`warn` still give
  `0 tests`, exit 0. The TAP guard stays.
- **`--fail-on-warn` renumbers exit codes, it does not add a case.** All four combinations verified:
  without it, warn-only → 0, failures → 1; with it, warn-only → **1**, failures → **2**. Any CI step
  keying on `== 1` silently changes meaning when someone adds the flag.
- Messages may be strings or objects with a `msg` key (extra keys like `severity` are carried but
  not printed by default output).
- `-o` values in this build: `stdout json tap table junit github azuredevops sarif`.
- Parsers in this build: cue, dockerfile, dotenv, edn, hcl1, hcl2, hocon, ignore, ini, json,
  jsonnet, nginx, properties, spdx, textproto, toml, vcl, xml, yaml.
- `conftest parse FILE` prints the JSON a policy will see — the command that makes any new format
  tractable.
- **`conftest verify` runs Rego unit tests** — same engine and results as `opa test` (verified side
  by side, s3). Differences: exits **1** on a failing test where `opa test` exits **2**; takes
  conftest's `-o`/`-n`/`--data`; has `--report {full|notes|fails}`, `--trace`, `--var-values` instead
  of `--explain`; has **no** coverage or benchmark flags.
- **`conftest verify`'s help text is wrong about filenames**: it claims a `_test` postfix is needed,
  but a `test_`-prefixed rule in an ordinary `extra.rego` ran. `_test.rego` is a convention, not a
  filter — a stray `test_` rule anywhere under `-p` will run in CI.
- **`conftest verify` repeats the `0 tests` silent pass**: a policy dir with no test rules prints
  `0 tests, 0 passed`, exit 0. Same guard, second location — good interleaving with LR-0006.

## Rego facts (verified; session tagged)

**Iteration & sets (s6, baked into lesson 5)**

- **Summary arithmetic, fitted over five configurations** (LR-0009). Per document: `failures` =
  messages; `passed` = max(0, definitions − failures); `tests` = their sum.
- **Set members come back sorted, not in document order** — a rule matching containers 2 and 3
  prints the third before the second. Cheap evidence for "no order".
- **`not xs[_].field` is a compile error**: `rego_unsafe_var_error: var _ is unsafe`. Bind with
  `some` first, negate second. The one iteration mistake the toolchain catches loudly.
- **An undeclared *named* variable in a reference** (`xs[i]` with no `some i`) iterates fine in v1;
  Regal flags it as `use-some-for-output-vars` (idiomatic). Regal is otherwise clean on lesson 5's
  policies — only `directory-package-mismatch`, the usual scratchpad artifact.
- **`xs[_]` is NOT deprecated and Regal does not flag it**, even with `--enable-all` (verified side
  by side against `some … in`: identical findings). Accurate picture:
  - History: `in` / `some … in` arrived in **OPA v0.34.0** (Nov 2021) behind
    `import future.keywords.in`, unconditional in v1.0. The wildcard predates it — but chronology is
    not the argument and must not be presented as one.
  - The real argument is the style guide's: `some … in` "removes ambiguity around iteration vs.
    membership checks" — brackets are overloaded (`containers[_]` iterates, `roles["admin"]` tests
    membership). Ties to lesson 5 §7 (a set has no positions).
  - The style guide **explicitly prefers the wildcard for deeply nested paths**:
    `data.regions[_].networks[_].servers[_].hostname` over four `some` lines. Quoted on the page.
  - It lists `input.topics[_].body` as an accepted *fix* for an undeclared variable — the sharpest
    evidence that `[_]` is idiomatic and a bare `i` is not.
  - It does list `host := data.network.hosts[_]` under **Avoid** for the shallow case, so "prefer
    form 1 by default" survives.
- **Set indexing**: `{1,2,3}[2]` → `2` (membership test yielding the member); `{1,2,3}[0]` →
  undefined. On a *typed* set OPA may reject at compile instead: `{"a","b","c"}[0]` is a
  `rego_type_error` (`have: 0, want (type): string`). LR-0005 said "undefined rather than an error";
  both happen, depending on whether OPA infers a homogeneous element type.
- **`some i, v in {"a","b"}` binds `i == v`** — crispest demo that a set has no separate key.
- **`every`**: vacuously `true` over `[]`; **undefined** over a missing key, so `not every_x` holds
  and the rule fires. Verified consequence: with `containers` misspelled, the `every` policy denies
  and the `some` policy passes. `every x in [] { false }` does not compile
  (`rego_compile_error: declared var x unused`) — a vacuous-truth demo needs a body that uses the
  variable (`every x in [] { x > 100 }`).
- **Nested iteration** (`some c in containers; some p in c.ports`) yields every valid pair through
  the outer binding. Verified but *not* taught — held back as an ask-teacher hook.
- **`opa eval -i` reads YAML directly** — a manifest can be passed straight in, no `conftest parse`
  step. **But on a multi-document YAML it silently takes only the first document and exits 0.** Both
  in reference 2's `-i` row; the gotcha is an interleaving hook for the CI lesson.

**Membership & bodies (s5)**

- **`not x in s` parses as `not (x in s)`** — verified with a `Service` against
  `not input.kind in {"Deployment", "StatefulSet"}`. No parenthesising needed in v1.
- **`in` works over an array as well as a set** (`input.kind in ["Deployment", "StatefulSet"]`).
  The set literal is idiomatic, not required.

**Rule structure (s4, baked into lesson 4)**

- Stacking two equalities on one field (`input.kind == "Deployment"` then `== "StatefulSet"`) passes
  `opa check`, is counted in the report, and can never fire. **Regal 0.42.0 misses it even with
  `--enable-all`** — so lesson 4's "nothing in the toolchain will tell you" is verified against the
  dedicated linter and stated that way.
- Body expression order does not change results (verified by reversing a three-expression body).
- `opa fmt` rewrites `;`-separated bodies onto separate lines and **preserves** a hand-wrapped
  multi-line `sprintf` with a trailing comma — the user's style survives `opa fmt -w`.
- A complete rule with no `default` evaluates to `true` or **undefined**, never `false`.
- Duplicate messages across two definitions collapse to one set member, and the summary then reports
  a "passed" that did not happen (passed is derived). Not in the lesson; mention only if it arises.

## Format quirks (`conftest parse`, s1)

- **Dockerfile** → an *array* of instruction objects with keys `Cmd`, `Value`, `Flags`, `Stage`,
  `SubCmd`. `Cmd` is lowercased (`"from"`, `"user"`). Rules must iterate, not address fields — a
  genuinely different shape from Kubernetes YAML, good interleaving contrast now iteration is taught.
- **XML / `pom.xml`** → nested objects; attribute-free elements collapse to strings. **Gotcha:** a
  single `<dependency>` is an *object*, two or more an *array*, so rules written against a
  multi-dependency pom silently break on a single-dependency one. Good exercise once `some … in` and
  type checks are covered.

## Regal (noticed s4, not yet taught)

Already on PATH. Deserves a short treatment, most naturally inside the CI lesson (backlog 9), since
`regal lint` belongs in the same pipeline stage as `conftest verify`. Two mission-level reasons: it
encodes the [Styra Rego style guide](https://github.com/open-policy-agent/rego-style-guide), a
ready-made answer to "is this idiomatic?"; and its LSP/editor integration is the cheapest way to get
coworkers writing decent Rego without reading anything. Do not oversell — it misses the dead rule.
