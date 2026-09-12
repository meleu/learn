# The conftest contract landed, and the user probes the flag surface past the lesson

L3's four conventions, `N tests` arithmetic, and `deny`/`warn` exit codes are understood. The user went further: kept the drill policy in a non-`main` package on purpose to exercise `--all-namespaces`, and tested `--fail-on-warn` unprompted.

**Evidence**: `exercises/003/policy/deployment.rego` has five rules (four `deny`, one `warn`) where the drill asked for two, all correct on first read. Package `kubernetes.deployment`: asked whether they'd hit the `0 tests` trap, they said they'd left it non-`main` to test `--all-namespaces`. They predicted the test count correctly, confirmed `warn` exits 0, then explored `--fail-on-warn`.

**Implications**

1. **`0 tests` is understood as namespace resolution, not a bug.** But `--all-namespaces` defuses only that cause: rules named other than `deny`/`warn`/`violation` still report `0 tests, 0 passed`, **exit 0** (verified). The CI lesson presents `--all-namespaces` and reference 3's TAP guard as complements, not alternatives.
2. **`--fail-on-warn` renumbers exit codes.** Without it: warnings 0, failures 1. With it: warnings 1, failures **2**. A pipeline treating `exit 1` as "policy failures" silently changes meaning when someone adds the flag. Belongs in the CI lesson (reference 3's exit-code table has since been updated).
3. **State exact flag behaviour, never signpost it.** Two lessons running, the user explored past the drill and came back with results. A flag mentioned without its exact behaviour creates work; drills can safely ask for less than the user will do.
