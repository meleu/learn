# Rego & Conftest Resources

Curated 2026-08-23; links re-checked 2026-09-12. Primary project docs or maintainer material only.

## Knowledge

### Primary — start here

- [OPA Docs: Philosophy](https://www.openpolicyagent.org/docs/philosophy)
  The "why": policy decoupling, base vs virtual documents. Use for: "why does Rego exist?" and the framing to repeat to coworkers.
- [OPA Docs: Policy Language](https://www.openpolicyagent.org/docs/policy-language)
  Definitive Rego reference: rules, complete vs partial, variables, unification, iteration, safety, keywords (incl. `and`/`or`, OPA ≥1.20). Use for: what a piece of syntax means. Section anchors get renamed; check them when linking.
- [OPA Docs: Policy Reference](https://www.openpolicyagent.org/docs/policy-reference)
  Built-in catalogue (one sub-page per category, e.g. `/builtins/strings`) and formal grammar. Use for: "is there a built-in for X?"
- [OPA Docs: Policy Testing](https://www.openpolicyagent.org/docs/policy-testing)
  `test_` rules, `with input as`, mocking `data`, coverage. Written for `opa test`, but `conftest verify` is the same runner, so examples transfer verbatim (verified s3). Use for: the `conftest verify` lesson.
- [Conftest documentation](https://www.conftest.dev/)
  Install, `deny`/`warn` contract, exceptions, `--combine`, CI examples. Use for: how conftest wraps OPA.
- [Conftest source](https://github.com/open-policy-agent/conftest)
  Parser list and defaults live in code and `conftest test --help`. Use for: behaviour the docs leave ambiguous.

### Deep dives on one question

- [Anders Eknert, "How to express OR in Rego"](https://web.archive.org/web/20260313074937/https://www.styra.com/blog/how-to-express-or-in-rego/)
  (Styra, 2023, updated 2025; archive link because styra.com no longer resolves.) Linked from OPA's *Logical OR* section; author of Regal. **Eight** OR spellings (default assignment, helper rules, helper functions incl. argument pattern-matching, `else`, `in`, object branching, `object.get`, comprehensions) and a ranking. Use for: the first question every newcomer asks; helper functions. **Caveats**: one snippet uses v0 bodiless syntax (`allow { … }`); predates OPA 1.20's `or` keyword, so its "no OR operator" framing ([issue #2345](https://github.com/open-policy-agent/opa/issues/2345)) is dated.

### Tooling

- [Regal](https://github.com/open-policy-agent/regal) ([docs](https://www.openpolicyagent.org/projects/regal)): the Rego linter, now in the open-policy-agent org. Catches idiomatic/correctness problems `opa check` misses; editor/LSP integration. Does **not** catch a dead rule (mutually exclusive equalities), even with `--enable-all` (verified s4), so it complements tests. Bundles its own OPA, which can lag the `opa` CLI.
- [Rego Style Guide](https://github.com/open-policy-agent/rego-style-guide/blob/main/style-guide.md): the conventions Regal enforces, now in the open-policy-agent org. Content is `style-guide.md`; the repo README is a stub, so link there. Use for: "is this idiomatic?" without a community round-trip.

### Version-critical

- [OPA Docs: v0 → v1 upgrade guide](https://www.openpolicyagent.org/docs/v0-upgrade)
  **Read before trusting a blog post or Stack Overflow answer.** v1 made `if`/`contains` mandatory, so much pre-2024 material won't parse. Use for: "why does this blog snippet fail?"

### Practice environment

- [Rego Playground](https://play.openpolicyagent.org/)
  Browser REPL with shareable links. Use for: quick experiments; reproducible examples when asking a community.

## Wisdom (Communities)

- [OPA Community GitHub Discussions](https://github.com/orgs/open-policy-agent/discussions)
  Official support forum for OPA, Rego, **and conftest**; maintainers answer. Use for: policy-design questions ("idiomatic way to model X?"). Include a Playground link.
- [OPA Slack](https://slack.openpolicyagent.org/), `#help`
  Day-to-day chat with maintainers and practitioners. Use for: quick unblocking; sensing what's considered idiomatic.
- [OPA Community repository](https://github.com/open-policy-agent/community)
  Community calendar and meetings. Use for: watching practitioners reason aloud, the fastest route to taste.

## Gaps

- **`pom.xml` / XML policies**: `xml` parser exists but has no documented examples. Derive shape with `conftest parse --parser xml pom.xml`; a write-up would be a real community contribution.
- **`.gitlab-ci.yml` policies**: published examples are mostly Kubernetes/Terraform. Derive from `conftest parse`.
- **Teaching/rollout strategy**: introducing policy-as-code without resentment. Search once the technical foundation is in place.
