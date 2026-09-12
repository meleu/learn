# Mission: Rego & Conftest

## Why

Enforce configuration standards across projects at work, catching bad config before it ships instead of relying on review discipline. Conftest is the delivery vehicle; Rego is its language. The user will also teach coworkers, so the goal is understanding Rego well enough to explain it and field follow-up questions, not just writing a deny rule.

## Success looks like

- Explains, unprompted, what Rego is *for* and why it exists.
- Reads an unfamiliar `.rego` file and predicts the document it produces before running it.
- Writes and debugs conftest policies for Kubernetes YAML, Dockerfiles, `.gitlab-ci.yml`, generic YAML/JSON, and `pom.xml` (XML).
- Wires conftest into CI so violations block a merge.
- Runs a whiteboard session on the mental model for coworkers, without notes.

## Constraints

- **Rego v1** syntax only (`if`, `contains` required).
- Teaching others is first-class: explanations must survive being repeated by someone else. Sharp mental models over recipes.

## Out of scope (for now)

- OPA as an authorization server (`opa run --server`, REST API, decision logs).
- OPA Gatekeeper / Kubernetes admission control.
- Bundles, WASM, OPA management APIs.
- Custom conftest parsers or Go plugins.
