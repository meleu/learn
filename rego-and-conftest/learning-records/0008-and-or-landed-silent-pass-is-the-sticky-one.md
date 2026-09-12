# AND/OR landed; the sticky insight was the third silent pass, not the operators

The user reports the two-operator model understood and names two takeaways: `in` over a set literal as the one-block spelling of OR, and, with surprise, that an undefined value handed to `sprintf` fails the whole body. The operators are spent; the *silent pass* stuck and should hook future lessons rather than be re-explained.

**Evidence** (`exercises/004/policy/replicas.rego`, run locally: 6 tests, 3 failures, exit 1):

- Drill step 7 done: both `deny` definitions collapsed into one rule guarded by `input.kind in {"StatefulSet", "Deployment"}`. The superseded pair was **commented out, not deleted**: they keep the previous spelling to compare.
- Step 9 partly done: an owner-label rule written unassisted, reusing the `in` guard and `not input.metadata.labels.owner`, with an object-naming `sprintf`. They added `owner: meleu` to `deployment.yaml` so the rule fires for exactly one of two fixtures: a deliberate positive/negative pair.
- **Skipped**: step 8 (`replicated_workload` helper defined twice) and step 9's CronJob half. Of three OR spellings, `in` and two-definitions are demonstrated; the **helper rule is untaught in practice**, and "defend the choice" was never exercised.

**Implications**

1. **Helper rules are the open debt, with functions right behind** (backlog: helper functions). The helper-rule spelling generalises to a named predicate reused across rules and bridges to functions. Teach it where it earns its keep, a condition wanted by two `deny` rules, not by re-running step 8.
2. **`in` landed as a membership test**, the right floor for iteration. `some x in collection` is the same keyword doing a different job; iteration teaching must mark that or the two merge.
3. **Undefined-silences-the-body is fluent, not yet stored** (surprise). Same mechanism as L3's missing key from a new angle; generalises past `sprintf` to any `:=` with an undefined right-hand side (verified: `x := input.missing.deep` alone kills a body). Re-encounter it under `conftest verify`, where a unit test is the only thing that catches it.
