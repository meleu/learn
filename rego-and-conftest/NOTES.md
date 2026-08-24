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
4. Rule bodies as AND, multiple rules as OR (the two-operator model). **Next up**, and now with a
   concrete hook: lesson 3's policy deliberately lacks an `input.kind == "Deployment"` guard, and
   its callout says outright that guarding needs a two-expression body and that this is the next
   lesson. Start there. `msg :=` inside a body is the other half.
5. Iteration: `some ... in`, `[_]`, and why "for loop" is the wrong intuition. Containers are the
   natural example now that Kubernetes is on the page (`input.spec.template.spec.containers`).
6. Testing policies with `opa test` — policies need tests too.
7. Conftest, part two: `--combine`, `exception` rules, `--data` for exception lists, and rule
   suffixes as the thing exceptions key off.
8. Non-Kubernetes parsers: Dockerfile, XML (`pom.xml`), `.gitlab-ci.yml`.
9. CI wiring in GitLab — the `0 tests` guard from reference 3 belongs in that lesson.

## Open threads to check on next session

- **Still unanswered from lesson 2**: drill step 7 asked for a fourth rule with no snippet given
  (report a missing `age`; expected `violations contains "age is required" if not input.age`).
  Ask how it went — it was their first unassisted authoring here, and lesson 3's drill step 10
  now asks for two more unassisted rules, so this is a trend worth tracking.
- Lesson 2's `ask-teacher` box dangles four questions: set vs array, mixing `contains` and `:=`
  on one key, why a multi-line body needs no `and`, and how to word a good message. The third is
  now backlog item 4.
- Lesson 3 drill step 10 expects, roughly:
  `deny contains "Deployment must have an app label" if not input.metadata.labels.app` and
  `deny contains "Deployment must declare a namespace" if not input.metadata.namespace`.
  Both verified locally. The second one is the point — it is the fix for trap A.
- No learning record yet for the *content* of lessons 2 or 3 — coverage is not learning. LR-0004
  records the sequencing decision, not evidence of understanding. Write one once the user gives
  evidence (drill results, a question that shows the model landed, or a correction).

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
