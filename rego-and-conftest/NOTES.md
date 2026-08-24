# Working Notes

## Stated preferences

- **Both modes, every lesson**: browser reading + quiz, then a terminal drill to confirm.
  Do not ship a lesson that is quiz-only or drill-only.
- **Simple examples over realistic ones** when teaching a concept. Domain detail
  competes with the idea being taught. Save the work-shaped configs for lessons where the
  *format* is the point.
- **Engine before wrapper.** the user explicitly asked that conftest be kept out of the early
  lessons: fundamentals in plain `opa` first. Conftest is staged for later (see backlog), and
  lesson 1 mentions it only as a signpost.
- Wants to **teach coworkers**. When explaining a concept, prefer framings that are
  repeatable by a third party. It is worth explicitly flagging "this is the bit your
  coworkers will get wrong."

## Config formats in scope at work

Kubernetes YAML · Dockerfiles · generic YAML/JSON · `.gitlab-ci.yml` · `pom.xml` (XML).
Rotate examples across these rather than defaulting to Kubernetes every time — `pom.xml`
in particular is unusual for conftest material and worth covering properly
(`conftest test --parser xml pom.xml`).

## Local environment (verified session 1)

- `opa` 1.19.0, `conftest` (dev build, OPA 1.19.0), both on PATH via linuxbrew.
- Rego v1 is the default in these versions — `import rego.v1` is a no-op, and v0-style
  bodiless rules (`p { ... }`) are a hard parse error.

## Teaching backlog (candidate next lessons)

**Sequence changed by the user after lesson 2** — see LR-0004. They asked to go straight to
conftest, so items 3–5 below were deferred past the wrapper.

1. ~~Partial/multi-value rules — `contains`, sets~~ → **shipped as lesson 2**.
2. ~~Undefined vs false vs empty~~ — absorbed by lessons 1 and 2.
3. ~~Conftest conventions~~ → **shipped as lesson 3** (`0003-the-conftest-contract.html`).
   Covered: the four conventions, `conftest parse`, a Deployment policy, the report count as
   rules × documents, `deny` vs `warn` exit codes, and both silent passes (missing key, and
   non-`main` package → `0 tests`). Reference 3 shipped alongside it.
4. ~~Rule bodies as AND, multiple rules as OR~~ → **shipped as lesson 4**
   (`0004-and-down-or-sideways.html`). Covered: the two-operator model ("AND goes down, OR goes
   sideways"), the `input.kind` guard closing lesson 3's debt, body order-independence,
   `msg := sprintf(...)` as an expression *inside* the AND (so an undefined interpolated value
   silences the whole rule — a third silent pass), the dead rule from stacked equalities, and the
   three spellings of OR (`in` a set / two definitions / helper rule). Glossary gained a
   **Logic: AND and OR** section; new shared asset `rego-and-or-grid.css`.
5. Iteration: `some ... in`, `[_]`, and why "for loop" is the wrong intuition. **Next up.**
   Containers are the natural example now that Kubernetes is on the page
   (`input.spec.template.spec.containers`) — and lesson 4 pointedly avoided `containers[0]` so
   that indexing does not get taught as the way to reach a list. Also the place to sharpen
   set-vs-array (LR-0005) and to revisit `in`, which lesson 4 introduced as an OR spelling only.
5b. **Helper functions**, from the Styra OR article the user supplied session 4:
   `allowed_firstname(name) if name == "joe"`, plus Rego's equality pattern-matching on arguments
   (`alcohol_allowed("Sweden", age) if age > 18`). Not urgent — functions have not been taught at
   all — but the article's **multiple-outputs** warning is a strong hook for item 6: two function
   definitions that both evaluate with *different* return values produce a runtime error, which is
   exactly LR-0005's `eval_conflict_error` in a second costume. Teach it there rather than alone.
6. Testing policies with **`conftest verify`** — policies need tests too. The user asked (session 3)
   to skip `opa test` and go straight to the wrapper; verified sound, since `conftest verify` *is*
   OPA's test runner and the skill (`test_` rules + `with input as`) is identical. Keep `opa test`
   as a one-line footnote: it is what OPA's policy-testing docs are written in, and it alone has
   `--coverage --threshold`. Hook for the lesson: the runtime `eval_conflict_error` from LR-0005 —
   a bug that passes `opa check` and only fires on a particular input is exactly what a unit test
   is for.
7. Conftest, part two: `--combine`, `exception` rules, `--data` for exception lists, and rule
   suffixes as the thing exceptions key off.
8. Non-Kubernetes parsers: Dockerfile, XML (`pom.xml`), `.gitlab-ci.yml`.
9. CI wiring in GitLab — the `0 tests` guard from reference 3 belongs in that lesson.

## Open threads to check on next session

- **Lesson 4 has no learning record yet** — it shipped at the end of session 4 with no evidence of
  what landed. Next session: check `exercises/004/`, and specifically ask about drill steps 7 and 8
  (collapse to `in`, then to a helper) and step 9's "defend the choice", since the three-spellings
  call is the only judgement question in the lesson.
- Lesson 4 now handles `else` and `default` in a single note under section 6 (both are
  complete-rule constructs, so neither applies to `deny`). If pushed on `else`, the extra fact is
  that it fixes evaluation order, and the one real use is guarding an expensive call such as
  `http.send` behind a cache check.
- **The user supplies source material mid-session.** Session 4: they pasted the full Styra OR
  article after I failed to fetch it from web.archive.org, unprompted. Second instance of them
  bringing material to the lesson (see the `package signup` snippet, LR-0004). When a fetch fails,
  say which document I wanted and why — they may well have it.
- Nothing outstanding from lessons 1–3. Evidence gathered session 3; LR-0005 (lesson 2 content)
  and LR-0006 (lesson 3 content) close this thread.
- Carry forward into later lessons, not now: sharpen set-vs-array at the iteration lesson
  (LR-0005), and fold `--fail-on-warn`'s exit-code renumbering and `--all-namespaces`'s limits
  into the CI lesson (LR-0006). Reference 3 already carries both facts.

## Verified format quirks (for future lessons)

Confirmed locally with `conftest parse`, session 1:

- **Dockerfile** → an *array* of instruction objects with keys `Cmd`, `Value`, `Flags`,
  `Stage`, `SubCmd`. `Cmd` is lowercased (`"from"`, `"user"`). So rules must iterate, not
  address fields — a genuinely different shape from Kubernetes YAML, and a good interleaving
  contrast once iteration is taught.
- **XML / `pom.xml`** → nested objects, attribute-free elements collapse to strings. **Gotcha:**
  a single `<dependency>` becomes an *object*, whereas two or more become an *array*. Rules
  written against a multi-dependency pom will silently break on a single-dependency one. This is
  an excellent real-world exercise once `some ... in` and type checks are covered.

## How the user engages with lesson material (session 1)

Audits the example code rather than skimming it — caught an unused `replicas` rule in lesson 1's
first policy on first read, and asked whether it was deliberate. **Consequence: no filler or
throwaway code in examples.** Every line in a lesson policy must earn its place, and if a line is
there for a pedagogical reason that is not obvious from the code, say so in the prose. Redundancy
in an example will be read as a mistake, and reasonably so — the user is going to hand these
policies to coworkers as models of what good Rego looks like.

**Session 3 addition: they probe the flag surface past the drill.** Lesson 3's drill asked for two
extra rules; they wrote five, and deliberately left the drill policy in `package
kubernetes.deployment` in order to exercise `--all-namespaces` rather than to avoid the `0 tests`
trap. They also went and tested `--fail-on-warn` unprompted. Consequence: state a flag's exact
behaviour or leave it out — a lesson that name-drops a flag without saying what it does creates
homework. Drills can safely ask for less than they will actually do.

## Conftest facts (all verified locally, sessions 1–2)

Everything below was run on this machine and is already baked into lesson 3 / reference 3.

- Defaults: policy dir `policy/`, namespace `main`, `deny` exits 1, `warn` exits 0.
- Rule names: `deny`, `violation` (exact synonym), `warn`; `_suffix` allowed (`deny_replicas`).
- **`N tests` counts rule evaluations = rules × parsed documents**, not files. Three rules over a
  two-document YAML reports `6 tests`.
- **The `0 tests` trap**: a package other than `main` produces `0 tests, 0 passed` and **exit 0**.
  There is **no built-in flag** to reject it — `--strict` is Rego compiler strictness, not this.
- **It is the only silent misconfiguration.** Verified: a missing `-p` dir, an empty `-p` dir, and
  a Rego syntax error each exit 1 with an `Error:` of their own. So CI needs exactly one added
  check: "did any rule actually run?"
- **`-o tap` is the cleanest signal**: prints a `1..N` plan line when rules ran, and *nothing at
  all* when none did. So `[ -s report.tap ] || exit 1` is the whole guard — no `jq`. Reference 3
  has it, verified over six cases (violating, clean, wrong package, empty dir, missing dir, syntax
  error). The earlier `jq`-summing guard worked but was needless; `-o json` emits
  `"successes": 0` even when nothing ran, which is why the naive presence-test fails.
- **Canary fixture** is the stronger second guard: a committed manifest that must be denied, with
  the check grepping for `^not ok ` rather than a non-zero exit. Grepping matters — a first draft
  keyed on the exit code alone reported "ok" for an empty policy dir, because a crash also exits
  non-zero. Catches rules that load but no longer match, which the TAP guard cannot.
- `--combine` rewrites `input` into an array of `{"path", "contents"}` objects — existing
  single-document rules stop matching. Not a drop-in flag.
- `exception contains rules if …` yields lists of rule **suffixes**: `["replicas"]` excepts
  `deny_replicas`. Prints as `EXCP`, counted in the summary's last column, exit 0. So suffixes are
  load-bearing, not cosmetic.
- Messages may be strings or objects with a `msg` key (extra keys like `severity` are carried but
  not printed by the default output).
- `-o` values in this build: `stdout json tap table junit github azuredevops sarif`.
- Parsers in this build: cue, dockerfile, dotenv, edn, hcl1, hcl2, hocon, ignore, ini, json,
  jsonnet, nginx, properties, spdx, textproto, toml, vcl, xml, yaml.
- `conftest parse FILE` prints the JSON a policy will see. The command that makes any new format
  tractable.
- **`conftest verify` runs Rego unit tests** — same engine and same results as `opa test` (verified
  side by side, session 3: identical tests found). Differences that matter: it exits **1** on a
  failing test where `opa test` exits **2**; it takes conftest's `-o`/`-n`/`--data` flags; it has
  `--report {full|notes|fails}`, `--trace` and `--var-values` in place of `--explain`; it has **no**
  coverage or benchmark flags.
- **`conftest verify`'s help text is wrong about filenames.** It says files need a `_test` postfix;
  in fact a `test_`-prefixed rule in an ordinary `extra.rego` was executed. `_test.rego` is a
  convention, not a filter — a stray `test_` rule anywhere under `-p` will run in CI.
- **`conftest verify` repeats the `0 tests` silent pass**: a policy dir with no test rules prints
  `0 tests, 0 passed` and exits 0. Same guard, second location — good interleaving with LR-0006.
- **`--all-namespaces`** queries every package found, so a non-`main` package runs normally. It
  cures a wrong *package* name only: a policy dir whose rules are named something other than
  `deny`/`violation`/`warn` still prints `0 tests, 0 passed` and exits 0 under it. Verified
  session 3 — so the TAP guard stays.
- **`--fail-on-warn` renumbers the exit codes, it does not just add a case.** Verified all four
  combinations session 3: without it, warn-only → 0 and failures → 1; with it, warn-only → **1**
  and failures → **2**. Any CI step keying on `== 1` silently changes meaning when someone adds
  the flag. Reference 3's exit-code table and a callout now carry this.

## Rego facts verified session 4 (baked into lesson 4)

- `conftest test`'s `N tests` counts **rule definitions**, not rule names: two definitions of
  `deny` over one document reports `2 tests`. Helper rules and non-`deny`/`warn`/`violation` rules
  are not counted at all.
- An undefined value interpolated into `msg := sprintf(...)` makes the whole body fail — a
  one-replica Deployment with no `metadata.name` passes a policy that should deny it. Third
  distinct silent-pass mechanism after lesson 3's two.
- Stacking two equalities on one field (`input.kind == "Deployment"` then `== "StatefulSet"`)
  passes `opa check`, is counted in the report, and can never fire.
- Body expression order does not change results (verified by reversing a three-expression body).
- `opa fmt` rewrites `;`-separated bodies onto separate lines, and **preserves** a hand-wrapped
  multi-line `sprintf` with a trailing comma — so the user's formatting style survives `opa fmt -w`.
- A complete rule with no `default` evaluates to `true` or **undefined**, never `false`
  (`opa eval` on a helper against a non-matching document prints `undefined`).
- Duplicate messages across two definitions collapse to one set member, and conftest's summary
  arithmetic then reports a "passed" that did not happen (it derives passed = tests − failures).
  Not in the lesson; mention only if it comes up.
- **Regal 0.42.0 is installed** (linuxbrew) and does **not** catch the dead rule, even with
  `regal lint --enable-all`. Only flagged `directory-package-mismatch`, an artifact of the
  scratchpad layout. So lesson 4's "nothing in the toolchain will tell you" claim is verified
  against the dedicated linter too, and is stated that way on the page.

## Regal (noticed session 4, not yet taught)

The user has Regal on PATH already. It is not in any lesson yet and probably deserves a short one
eventually — most naturally as part of the CI lesson (backlog item 9), since `regal lint` belongs
in the same pipeline stage as `conftest verify`. Two things make it worth teaching for the
*mission* rather than just the tooling: it encodes the
[Styra Rego style guide](https://github.com/open-policy-agent/rego-style-guide), which is a ready-made
answer to "is this idiomatic?" without needing to ask a community; and it has an LSP/editor
integration, which is the cheapest way to get coworkers writing decent Rego without them having
read anything. Do not oversell it — verified session 4 that it misses the dead rule.

## the user's own conventions

- Practice files live in `exercises/NNN/` **inside the workspace**, not in a home directory
  scratch dir. **Plain zero-padded numbers, no descriptive suffix** — lesson 2's drill said
  `exercises/002-partial-set-rules/` and the user silently used `exercises/002/` instead. Lesson
  3's drill says `exercises/003/`. Do not overwrite an existing directory; new drills get new
  numbers.
- Brings their own example code to a lesson request (lesson 2's `package signup` snippet was
  theirs, verbatim). Use what they hand over rather than substituting something "better" —
  and verify it runs before it goes on the page.
- Formats Rego by hand into multi-line `sprintf` calls with trailing commas, i.e. `opa fmt`
  style. Match that style in lesson code so nothing looks "off" after they reformat.

## Shared asset library

`../assets/` is shared with sibling workspaces. `code-copy-button.js` appeared there from
outside this workspace and is now wired into all four of this workspace's pages. Re-check
`ls ../assets/` at the start of each session — the library moves independently.
