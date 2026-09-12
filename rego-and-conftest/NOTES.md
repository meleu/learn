# Working Notes

LLM-read every session; keep terse. Facts verified locally unless marked; `(sN)` = session N. Tool versions live in **Environment** only; don't copy `--help` lists or file inventories that a command can produce.

## User preferences

- **Both modes per lesson**: browser reading + quiz, then terminal drill. Exception: L6 (practice-only, user's ask).
- **Simple examples** for concepts; work-shaped configs only when the format is the point.
- **Goal is teaching coworkers** → framings a third party can repeat; flag "the bit your coworkers will get wrong".
- **Wrapper-first by default** (LR-0007, supersedes "engine before wrapper"): teach the tool used at work; plain `opa` only where it exposes what conftest hides.
- **Audits example code** (caught an unused rule in L1). No filler lines; explain any line with a non-obvious pedagogical reason in prose. Redundancy reads as a mistake: these policies go to coworkers as models of good Rego.
- **Probes flags past the drill** (s3). State a flag's exact behaviour or omit it; name-dropping creates homework. Drills may ask for less than they'll do.
- **Accuracy pressure** (s6): challenged "older" for `xs[_]` (not deprecated). Never let a comparative adjective stand in for a citation: say who prefers a form, why, and whether the other stays valid. Run Regal on both sides of a style claim.
- **Reads for ordering** (s7): nothing may quote or judge a thing before it is on the page; verdicts follow walkthroughs, never inside code comments; cut true background that doesn't change what the learner writes (e.g. release chronology).
- **Checks assumptions with me before acting** (since s5): answer with verification, not agreement.
- **Anki** (s8): user reviews, we author. Every lesson ships `flashcards/NNNN-<lesson-slug>.md` alongside it. Basic type, one short sentence per side, 5–7 cards, most fundamental only. A takeaway that won't fit one sentence is doing two jobs. Never card a fact a later lesson corrects. User imports; offer TSV, never commit one.
- **Conventions**: exercises in `exercises/NNN/` inside the workspace (zero-padded, no suffix, never overwrite). User brings own example code: use it, verify it runs first. Hand-wraps multi-line `sprintf` with trailing commas (`opa fmt` keeps it): match.

## Config formats in scope at work

Kubernetes YAML · Dockerfile · generic YAML/JSON · `.gitlab-ci.yml` · `pom.xml` (`conftest test --parser xml`). Rotate; don't default to Kubernetes. `pom.xml` is rare in conftest material, worth covering properly.

## Environment

Re-check each session: `opa version; conftest --version; regal version; ls ../assets/`.

Last seen 2026-09-12 (all linuxbrew): `opa` 1.20.2; `conftest` dev build bundling OPA 1.19.0; `regal` 0.42.0 bundling OPA 1.18.2. **Skew**: `opa` accepts syntax that conftest and regal reject (e.g. `import future.keywords.or`). Lesson output was captured on OPA 1.19.0. Upstream conftest v0.70.0 released 2026-09-12.

Rego v1 is default: `import rego.v1` is a no-op; v0 bodiless rules (`p { ... }`) are a parse error.

Topic-specific shared assets: `rego-and-or-grid.css` (L4), `hint-details.css` (L6 collapsed hints). `../assets/` changes independently of this workspace.

## Flashcards

File layout: H1; `Anki **Basic**. N cards. Source: [link to lesson]`; then `**N. Front:**` / `**Back:**` pairs.

Interleaving is deliberate and looks like duplication in a shuffled deck: the undefined mechanism is carded per lesson (L1 #4/#5, L2 #7, L3 #5, L5 #5, L6 #3). A new silent pass gets its own card, never folded into an existing one.

L3 #2 (four conventions) is the only list card. If it fights the user, split into four cloze cards; don't shorten the answer.

## Lessons shipped

Filenames in `lessons/`; read the page for detail. User changed the sequence after L2 (LR-0004).

1. Document model in plain `opa`; conftest only signposted.
2. Partial set rules, `contains`, sets; undefined vs false vs empty.
3. Conftest contract: four conventions, `conftest parse`, a Deployment policy, `deny`/`warn` exit codes, both silent passes. Ships reference 3.
4. AND down / OR sideways: `input.kind` guard (L3's debt), body order-independence, `msg := sprintf(...)` inside the AND, dead rule from stacked equalities, three OR spellings (`in` a set / two definitions / helper rule). Glossary: **Logic: AND and OR**. Its `tests` arithmetic is superseded by L5 (LR-0009).
5. Variable as question ("for which c?", not "for each c"): one definition → many messages, corrected summary arithmetic, three spellings + undeclared-variable form Regal flags, iterating a missing path, `rego_unsafe_var_error`, sets have no positions, `every` in a helper ("prefer `some`, it names the offender"). Glossary: **Iteration**. Reordered s7 per user review.
6. Practice-only (user's ask, s9): translate requirements K8S-01..07 using only L1–5 knowledge; no quiz, drill + one debrief recall. `exercises/006/` pre-built (six manifests + `check.sh`); user writes `policy/` only; messages start `[K8S-NN]`. `check.sh` compares (ID, FAIL/WARN, file) → count; `·` = "no messages: not written, or passing silently". Its answer table is readable, and the page says so.
   - **Reference solution lives only in the session scratchpad, never the workspace.**
   - Designed traps, each verified by breaking the solution: K8S-02 undefined namespace in `sprintf` (api.yaml); K8S-03 `< 2` without the missing case (api.yaml), and missing case without kind guard (flags both Services + Pod); K8S-04/05/06 Deployment-only path misses `debug-pod.yaml` (K8S-06's only violation → `·`); K8S-06 existence vs value (`worker.yaml` has `privileged: false`). `worker.yaml` breaks nothing on purpose.
   - Hints are `<details class="hint">` pointing at lesson §s. Pod-path hint nudges a `contains` helper collecting containers from both paths: **untaught synthesis**, verified; watch whether they find it or duplicate rules.
   - Ask-teacher hooks: untagged `nginx` evades `endswith` (needs `contains()` builtin or similar). Primary source conftest `examples/kubernetes/policy` is v1 but uses `import data.kubernetes` and `msg =`.
   - Regal on the reference solution: `messy-rule` ×2 (`deny`/`warn` definitions split by the `containers` helper). Not in the lesson; likely in their single-file solution → review hook: group definitions of one name.
   - **When they report back**: code-review their `policy/`, write a learning record, consider a "requirement → Rego shape" reference built from their solutions, not mine.

## Backlog (candidate next lessons)

- **Helper functions**: from the OR article (s4): `allowed_firstname(name) if name == "joe"`, argument pattern-matching (`alcohol_allowed("Sweden", age) if age > 18`). Untaught. Its multiple-outputs runtime error is LR-0005's `eval_conflict_error` again → teach inside **`conftest verify`**, not alone.
- **`conftest verify`**: user skipped `opa test` (LR-0007). One-line footnote: OPA's testing docs use `opa test`, which alone has `--coverage --threshold`. Hook: runtime `eval_conflict_error` passes `opa check`, fires on one input. Open by listing the silent passes; ask which a test catches.
- **Conftest part two**: `--combine`, `exception` rules, `--data` exception lists, rule suffixes as what exceptions key off.
- **Non-Kubernetes parsers**: Dockerfile, XML (`pom.xml`), `.gitlab-ci.yml`.
- **GitLab CI wiring**: TAP guard + canary (reference 3), `--fail-on-warn` renumbering, `--all-namespaces` limits (LR-0006), `regal lint`, `opa eval -i` multi-doc gotcha, summary counts are a subtraction (LR-0009).
- **Comprehensions**: the obvious next gap; L5 signposts them in ask-teacher. Home for `count()` rules ("no more than N of X") and "none of". Own short lesson or part of `conftest verify`.

## Open threads

- **`and`/`or` keywords now exist (found 2026-09-12)**: OPA 1.20.0 added `import future.keywords.and` / `.or` (or `future.keywords`) for in-body conjunction/disjunction ([docs](https://www.openpolicyagent.org/docs/policy-language#and-and-or-keywords)). Verified on `opa` 1.20.2; conftest (OPA 1.19.0) rejects the import with `rego_parse_error`. Docs: `or` does not replace incremental rules when the disjunction contributes a value. Now outdated: L4 standfirst and ask-teacher box ("no `and`/`or` keyword"), flashcards L4 #1/#2, RESOURCES' OR article entry. Don't quietly patch read pages (LR-0009): agree with the user on a dated callout + card rewording, ideally once conftest bundles OPA ≥1.20.
- **`$"..."` string interpolation is an exception to silent pass #3 (found 2026-09-12)**: an undefined value inside a template renders as `<undefined>` and the rule *fires* (verified in conftest, OPA 1.19.0). Only `sprintf` and other undefined `:=` right-hand sides silence the body. Untaught; natural addendum to L4 §msg or the `conftest verify` lesson.
- L4 handles `else` and `default` in one note under §6 (complete-rule constructs; neither applies to `deny`). If pushed on `else`: it fixes evaluation order; the one real use is guarding an expensive call (`http.send`) behind a cache check.
- L5 drill step 10 (compare `some` vs `every` policies, defend a choice) is the first *design* judgement. Worth a learning record either way.

## The five silent passes (the course's spine)

1. Missing key in a rule body (L3).
2. Non-`main` package → `0 tests, 0 passed`, exit 0 (L3).
3. Undefined value in `msg := sprintf(...)` (L4). Generalises: any `:=` with an undefined RHS kills the body (s5), e.g. `x := input.missing.deep`. Not `$"..."` templates (see Open threads).
4. Iterating a missing/misspelled path → zero bindings → clean pass, exit 0 (L5).
5. Binding the whole array (`c := …containers` then `c.name`): correct key, wrong *kind* of value → `1 test, 1 passed`, exit 0 (L5 recall prompt).

## Conftest facts (s1–s3; in L3 / reference 3)

- Defaults: policy dir `policy/`, namespace `main`, `deny` exits 1, `warn` exits 0.
- Rule names: `deny`, `violation` (exact synonym), `warn`; `_suffix` allowed (`deny_replicas`).
- Summary counts: see **Rego facts → Iteration**. L3/L4's "definitions × documents" holds only while each definition yields ≤1 message. Counts definitions, not names; helpers and other rule names aren't counted.
- **`0 tests` trap**: non-`main` package → `0 tests`, exit 0, and **no built-in flag rejects it** (`--strict` is compiler strictness). Missing `-p` dir, empty `-p` dir, syntax error each exit 1 with `Error:`. CI needs one added check: did any rule run?
- **TAP guard**: `-o tap` prints a `1..N` plan only when rules ran → `[ -s report.tap ] || exit 1`, no `jq`. Verified over six cases (violating, clean, wrong package, empty dir, missing dir, syntax error). `-o json` emits `"successes": 0` even when nothing ran.
- **Canary fixture**: committed manifest that must be denied, checked by grepping `^not ok`, not exit code (a crash is non-zero too). Catches rules that load but stop matching; TAP guard can't.
- `--combine` rewrites `input` into an array of `{"path", "contents"}`; single-document rules stop matching. Not drop-in.
- `exception contains rules if …` yields rule **suffixes**: `["replicas"]` excepts `deny_replicas`. Prints `EXCP`, counted in the summary's last column, exit 0.
- **`--all-namespaces`** fixes a wrong *package* only: rules not named `deny`/`violation`/`warn` still give `0 tests`, exit 0. TAP guard stays.
- **`--fail-on-warn` renumbers exit codes**: without, warn-only 0 / failures 1; with, warn-only **1** / failures **2**. CI keying on `== 1` silently changes meaning.
- Messages: strings or objects with a `msg` key (extra keys like `severity` carried, not printed by default).
- `-o` formats and parsers: read `conftest test --help` (changes per release).
- `conftest parse FILE` prints the JSON a policy sees: makes any new format tractable.
- **`conftest verify`** = OPA's test runner (same results as `opa test`, verified side by side s3). Differences: failing test exits **1** (`opa test`: 2); takes `-o`/`-n`/`--data`; `--report {full|notes|fails}`, `--trace`, `--var-values` instead of `--explain`; **no** coverage/benchmark flags.
- **`verify --help` is wrong about filenames**: claims a `_test` postfix is needed, but a `test_` rule in plain `extra.rego` ran. Stray `test_` rules anywhere under `-p` run in CI.
- **`verify` repeats the `0 tests` silent pass**: no test rules → `0 tests, 0 passed`, exit 0.

## Rego facts

**Iteration & sets (s6, in L5)**

- **Summary arithmetic**, fitted over five configurations (LR-0009), per document: `failures` = messages; `passed` = max(0, definitions − failures); `tests` = sum.
- Set members print **sorted**, not in document order: cheap evidence for "no order".
- `not xs[_].field` → `rego_unsafe_var_error: var _ is unsafe`. Bind with `some`, negate second. The one iteration mistake the toolchain catches loudly.
- Undeclared *named* variable (`xs[i]`, no `some i`) iterates fine in v1; Regal flags `use-some-for-output-vars`. Otherwise Regal is clean on L5's policies (only `directory-package-mismatch`, a scratchpad artifact).
- **`xs[_]` is not deprecated**; Regal doesn't flag it even with `--enable-all` (identical findings vs `some … in`). From the [style guide](https://github.com/open-policy-agent/rego-style-guide/blob/main/style-guide.md):
  - The argument for `some … in` is ambiguity: it "removes ambiguity around iteration vs. membership checks" (`containers[_]` iterates, `roles["admin"]` tests membership). Ties to L5's "a set has no positions". Chronology (`in` arrived OPA v0.34.0 behind a future import) is not the argument; never present it as one.
  - Explicitly prefers the wildcard for deep paths: `data.regions[_].networks[_].servers[_].hostname` over four `some` lines (quoted on L5).
  - Lists `input.topics[_].body` as an accepted *fix* for an undeclared variable: `[_]` idiomatic, bare `i` not.
  - Lists shallow `host := data.network.hosts[_]` under **Avoid**, so "prefer `some … in` by default" survives.
- **Set indexing**: `{1,2,3}[2]` → `2`; `{1,2,3}[0]` → undefined; typed set `{"a","b","c"}[0]` → `rego_type_error` at compile. Which you get depends on whether OPA infers a homogeneous element type.
- `some i, v in {"a","b"}` binds `i == v`: crispest demo that a set has no separate key.
- **`every`**: vacuously `true` over `[]`; **undefined** over a missing key, so `not every_x` holds and the rule fires (misspelled `containers`: `every` policy denies, `some` policy passes). `every x in [] { false }` → `rego_compile_error: declared var x unused`; demo vacuous truth with `{ x > 100 }`.
- Nested iteration (`some c in containers; some p in c.ports`) yields every valid pair. Verified, *not* taught: ask-teacher hook.
- `opa eval -i` reads YAML directly (no `conftest parse` step), **but on multi-document YAML silently takes the first document, exit 0**. Both in reference 2's `-i` row; CI-lesson hook.

**Membership & bodies (s5)**

- `not x in s` parses as `not (x in s)`; no parentheses needed.
- `in` works over arrays too; the set literal is idiomatic, not required.

**Rule structure (s4, in L4)**

- Two equalities on one field (`input.kind == "Deployment"` then `== "StatefulSet"`) pass `opa check`, are counted, never fire. Regal misses it even with `--enable-all` (re-verified 2026-09-12 on 0.42.0; re-check after Regal upgrades, since L4 states it).
- Body expression order doesn't change results (verified by reversing a three-expression body).
- `opa fmt` splits `;`-separated bodies onto lines and **preserves** a hand-wrapped `sprintf` with trailing comma.
- A complete rule with no `default` is `true` or **undefined**, never `false`.
- Duplicate messages across definitions collapse to one set member; the summary then reports a "passed" that didn't happen. Not in a lesson; mention only if it arises.

## Format quirks (`conftest parse`, s1)

- **Dockerfile** → *array* of instruction objects with keys `Cmd`, `Value`, `Flags`, `Stage`, `SubCmd`; `Cmd` lowercased (`"from"`). Rules must iterate: good contrast with Kubernetes YAML.
- **XML / `pom.xml`** → nested objects; attribute-free elements collapse to strings. **Gotcha**: one `<dependency>` is an *object*, two or more an *array*, so rules written on a multi-dependency pom silently break on a single-dependency one. Exercise for `some … in` + type checks.

## Regal (not yet taught)

Belongs in the GitLab CI lesson: `regal lint` sits in the same stage as `conftest verify`. Mission reasons: it encodes the Rego style guide (ready answer to "is this idiomatic?"), and its LSP is the cheapest way to get coworkers writing decent Rego. Don't oversell: it misses the dead rule.
