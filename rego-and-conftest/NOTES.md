# Working Notes

## Stated preferences

- **Both modes, every lesson**: browser reading + quiz, then a terminal drill to confirm.
  Do not ship a lesson that is quiz-only or drill-only.
- **Simple examples over realistic ones** when teaching a concept. the user asked for lesson 1's
  Kubernetes example to be replaced with a minimal `input.age >= 18` age check — domain detail
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

1. Partial/multi-value rules — `contains`, sets, and why a set of messages is the shape every
   real policy converges on. (Lesson 1 already promised sets "in the next lesson".)
2. Rule bodies as AND, multiple rules as OR (the two-operator model).
3. Iteration: `some ... in`, `[_]`, and why "for loop" is the wrong intuition.
4. Undefined vs false vs empty — the top source of confusion (seeded in lesson 1).
5. Testing policies with `opa test` — policies need tests too, and this is still pure OPA.
6. **Only then** conftest: what the wrapper adds, `deny`/`warn`, namespaces, `--combine`,
   exceptions. Introduce it as "here is the convention layered on what you already know".
7. Non-Kubernetes parsers: Dockerfile, XML (`pom.xml`), `.gitlab-ci.yml`.
8. CI wiring in GitLab.

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

## Conftest facts already verified (staged for when we get there)

Confirmed locally, session 1, so the future conftest lesson does not need to re-derive them:

- Default policy dir `policy/`; default namespace `main`; failures exit 1.
- Rule names read: `deny`, `violation` (synonym), `warn` (non-failing).
- **The silent-pass trap**: a policy whose package is not the namespace conftest reads produces
  no denials, so conftest reports success on a violating file. `--all-namespaces` avoids it.
  This is a strong teaching moment — hold it for the conftest lesson, where it lands properly.
- Parsers in this build: cue, dockerfile, edn, hcl1, hcl2, hocon, ignore, ini, json, jsonnet,
  nginx, properties, spdx, textproto, toml, vcl, xml, yaml, dotenv.
- `conftest parse FILE` prints the JSON a policy will see. This is the command that makes any
  new format tractable.

## the user's own conventions

- Practice files live in `exercises/NNN/` **inside the workspace**, not in a home directory
  scratch dir. Drills should follow that layout. `exercises/001/` holds their work from the
  first (now superseded) Kubernetes drill — do not overwrite it; new drills get new directories.
- Formats Rego by hand into multi-line `sprintf` calls with trailing commas, i.e. `opa fmt`
  style. Match that style in lesson code so nothing looks "off" after they reformat.

## Shared asset library

`../assets/` is shared with sibling workspaces. `code-copy-button.js` appeared there from
outside this workspace and is now wired into all three of this workspace's pages. Re-check
`ls ../assets/` at the start of each session — the library moves independently.
