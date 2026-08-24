# Rego & Conftest Resources

Curated, verified 2026-08-23. Everything here is either primary documentation from the
project itself or a talk by a maintainer.

## Knowledge

### Primary — start here

- [OPA Docs: Philosophy](https://www.openpolicyagent.org/docs/philosophy)
  The "why" document. Policy decoupling, and the base-vs-virtual document model that the
  whole language rests on. Use for: answering "why does Rego exist?" and for the framing
  you will repeat to coworkers.
- [OPA Docs: Policy Language](https://www.openpolicyagent.org/docs/policy-language)
  The definitive Rego reference. Rules, complete vs partial rules, variables, unification,
  iteration, safety. Use for: any question about what a piece of syntax actually means.
- [OPA Docs: Policy Reference](https://www.openpolicyagent.org/docs/policy-reference)
  Built-in function catalogue and the formal grammar. Use for: "is there a built-in for X?"
- [OPA Docs: Policy Testing](https://www.openpolicyagent.org/docs/policy-testing)
  The `test_` rule convention, `with input as`, mocking `data`, coverage. Written entirely in
  `opa test` terms — but `conftest verify` is that same runner, so every example transfers
  verbatim (verified locally, session 3). Use for: backlog item 6.
- [Conftest documentation](https://www.conftest.dev/)
  Install, the `deny`/`warn` rule contract, exceptions, `--combine`, CI examples.
  Use for: anything about how conftest wraps OPA.
- [Conftest source on GitHub](https://github.com/open-policy-agent/conftest)
  The parser list and defaults live in the code and in `conftest test --help`. Use for:
  confirming behaviour when the docs are ambiguous.

### Deep dives on one question

- [Anders Eknert, "How to express OR in Rego"](https://web.archive.org/web/20260313074937/https://www.styra.com/blog/how-to-express-or-in-rego/)
  (Styra, 2023, updated 2025). **Archive link on purpose — styra.com no longer resolves**, the
  company having been absorbed by Apple; OPA's docs already linked this via web.archive.org before
  that happened. Linked from OPA's own *Logical OR* section, and by the author of Regal. Walks
  through **eight** ways to express OR — default assignment, helper rules, helper
  functions (including equality pattern-matching on arguments), `else`, `in`, object/map branching,
  `object.get`, comprehensions — and closes with a ranking of which to prefer. Use for: the first
  question every newcomer asks, and for backlog item 5. **Caveat:** one snippet still uses v0
  bodiless syntax (`allow { … }`); everything else is v1-clean. Also flags the
  [open OPA issue](https://github.com/open-policy-agent/opa/issues/2345) proposing an OR operator.

### Tooling

- [Regal](https://github.com/open-policy-agent/regal) — the Rego linter. Originally Styra's; it
  now lives in the **open-policy-agent** org, with docs at
  [openpolicyagent.org/projects/regal](https://www.openpolicyagent.org/projects/regal).
  **Installed on this machine (0.42.0, via linuxbrew).** Catches idiomatic and correctness problems
  `opa check` does not, and has an editor/LSP integration. Verified session 4: it does **not**
  catch a dead rule (mutually exclusive equalities in one body), even with `--enable-all` — so it
  complements policy tests, it does not replace them.
- [Rego Style Guide](https://github.com/open-policy-agent/rego-style-guide) — also moved from
  Styra to the open-policy-agent org. The written conventions Regal enforces; readable on its own,
  and a ready-made answer to "is this idiomatic?" that does not need a community round-trip.

### Version-critical

- [OPA Docs: v0 → v1 upgrade guide](https://www.openpolicyagent.org/docs/v0-upgrade)
  **Read before trusting any blog post or Stack Overflow answer.** Rego v1 made `if` and
  `contains` mandatory, so a large amount of pre-2024 material on the internet will not
  parse on the local install. Use for: diagnosing "why does this snippet from a blog fail?"

### Practice environment

- [The Rego Playground](https://play.openpolicyagent.org/)
  Browser REPL with shareable links. Use for: quick experiments, and — importantly — for
  sharing a reproducible example when asking for help in a community.

## Wisdom (Communities)

- [OPA Community GitHub Discussions](https://github.com/orgs/open-policy-agent/discussions)
  The official support forum, covering OPA, Rego, **and conftest**. Maintainers answer here.
  Use for: real policy-design questions ("is this the idiomatic way to model X?"). Convention
  is to include a Rego Playground link with your question.
- [OPA Slack](https://slack.openpolicyagent.org/) — the `#help` channel
  Day-to-day conversation with maintainers and practitioners. Use for: quick unblocking,
  and for sensing what experienced people actually consider idiomatic.
- [OPA Community repository](https://github.com/open-policy-agent/community)
  Points to the community calendar and regular community meetings. Use for: watching
  practitioners reason out loud, which is the fastest route to taste.

## Gaps

- **No trusted resource yet for `pom.xml` / XML policies.** Conftest's `xml` parser is real
  (confirmed in `conftest test --help`) but essentially undocumented by example. Expect to
  derive the document shape empirically with `conftest parse --parser xml pom.xml`, and
  consider writing it up — this would be a genuine contribution back to the community.
- **No trusted resource yet for `.gitlab-ci.yml` policies.** Most published conftest examples
  are Kubernetes or Terraform. Same approach: derive from `conftest parse`.
- **Nothing yet on teaching/rollout strategy** — how teams introduce policy-as-code without
  the policies being resented. Worth searching for once the technical foundation is in place.
