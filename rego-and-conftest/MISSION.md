# Mission: Rego & Conftest

## Why

The user needs to enforce configuration standards across projects at work — catching
bad config before it ships instead of relying on review discipline. Conftest is the
delivery vehicle; Rego is the language it speaks. Because the user will also be the
person teaching coworkers, the goal is not "can write a deny rule" but "understands
Rego well enough to explain it to someone else and answer their follow-up questions."

## Success looks like

- Can explain, unprompted, what Rego is *for* and why it exists — not just how to use it.
- Can read an unfamiliar `.rego` file and predict what document it produces before running it.
- Can write and debug conftest policies for Kubernetes YAML, Dockerfiles, `.gitlab-ci.yml`,
  generic YAML/JSON, and `pom.xml` (XML).
- Can wire conftest into CI so violations block a merge.
- Can run a whiteboard session for coworkers covering the mental model, without notes.

## Constraints

- All material uses **Rego v1** syntax (`if`, `contains` required).
- Teaching others is a first-class requirement, so explanations must survive being repeated
  by someone else. Prefer sharp mental models over recipes.

## Out of scope (for now)

- OPA as a long-running authorization server (`opa run --server`, the REST API, decision logs).
- OPA Gatekeeper / Kubernetes admission control.
- Bundles, WASM compilation, and the OPA management APIs.
- Writing custom conftest parsers or Go plugins.
