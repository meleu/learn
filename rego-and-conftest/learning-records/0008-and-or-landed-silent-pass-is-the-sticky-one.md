# AND/OR landed; the sticky insight was the third silent pass, not the operators

The user reports the two-operator model as understood, and names two specific takeaways:
`in` over a set literal as the one-block spelling of OR, and — with surprise — that an undefined
value handed to `sprintf` makes the whole body fail. The operators are spent; the *silent pass*
is the thing that stuck, and it should be the hook for future lessons rather than re-explained.

**Evidence** (`exercises/004/policy/replicas.rego`, run locally: 6 tests, 3 failures, exit 1):

- Drill step 7 done: both `deny` definitions collapsed into one rule guarded by
  `input.kind in {"StatefulSet", "Deployment"}`. The superseded pair was **commented out, not
  deleted** — they keep the previous spelling on the page to compare against.
- Drill step 9 done in part: an owner-label rule written unassisted, reusing the `in` guard and
  `not input.metadata.labels.owner`, with an object-naming `sprintf`. They also edited
  `deployment.yaml` to add `owner: meleu` so the new rule fires for exactly one of the two
  fixtures — a deliberate positive/negative pair, not a blanket failure.
- **Skipped: step 8** (the `replicated_workload` helper defined twice) and the **CronJob** half of
  step 9. So of the three OR spellings, `in` and two-definitions are demonstrated; the **helper
  rule is untaught in practice**, and the "defend the choice" judgement was never exercised.

**Implications**

1. **Helper rules are the open debt, and functions sit right behind them** (backlog 5b). The
   helper-rule spelling is the one that generalises to a named predicate reused across rules, and
   it is the bridge to functions. Teach it where it earns its keep — a condition wanted by two
   different `deny` rules — rather than re-running step 8 in isolation.
2. **`in` has landed as a membership test, which is the correct floor for the iteration lesson.**
   They have seen `in` only against a literal set. `some x in collection` is the same keyword doing
   a different job, and the iteration lesson must mark that explicitly or the two will merge.
3. **The undefined-silences-the-body mechanism is a live hook, not a settled fact.** Surprise means
   it is fluent but not yet stored. It is the same mechanism as lesson 3's missing key, seen from a
   new angle, and it generalises past `sprintf` to any `:=` with an undefined right-hand side
   (verified locally: `x := input.missing.deep` alone kills a body). Re-encounter it under
   `conftest verify` (backlog 6), where a unit test is the only thing that catches it.
