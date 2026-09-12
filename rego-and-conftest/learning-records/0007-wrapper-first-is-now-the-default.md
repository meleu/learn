# The wrapper-first choice repeated: `conftest verify` instead of `opa test`

Reviewing the backlog, the user removed `opa test` and asked to learn policy testing directly as `conftest verify`. Second wrapper-over-engine choice (after LR-0004): read it as the default posture, not a one-off.

**Evidence**: unprompted, framed as a check: "answer me if you think my assumption is OK" before the file was edited. Verified before agreeing: `conftest verify` *is* OPA's test runner, and the skill (`test_` rules plus `with input as`) is identical. Differences are runner ergonomics (exit 1 vs 2 on failure; conftest's `-o`/`-n`/`--data`; `--report` instead of `--explain`) plus one real gap: no coverage or benchmarking.

**Implications**

1. **LR-0003's "engine before wrapper" is spent.** It guarded against undebuggable copy-paste; L1–3 discharged it. Teach the tool used at work; use plain `opa` only where it exposes what the wrapper hides (as `opa eval` does for undefined vs empty).
2. **Keep the engine's name in the room.** OPA's docs are the primary testing source and use `opa test` terms; without one line saying they're the same runner, the user can't use the best documentation. One line, not a detour.
3. **They now check assumptions with me before acting** (sessions 1–2 brought decisions). Answer with verification, not agreement. Here the check surfaced three unasked facts: the misleading `_test` filename claim in conftest's help, the exit-code difference, and `verify` repeating the `0 tests` silent pass.
