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
- [Conftest documentation](https://www.conftest.dev/)
  Install, the `deny`/`warn` rule contract, exceptions, `--combine`, CI examples.
  Use for: anything about how conftest wraps OPA.
- [Conftest source on GitHub](https://github.com/open-policy-agent/conftest)
  The parser list and defaults live in the code and in `conftest test --help`. Use for:
  confirming behaviour when the docs are ambiguous.

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
