# The wrapper-first choice repeated: `conftest verify` instead of `opa test`

Asked to review the teaching backlog, the user removed `opa test` from it and asked to learn
policy testing directly as `conftest verify`. This is the second time (after LR-0004) they have
chosen the wrapper over the engine, and it should now be read as the default posture rather than
a one-off reordering.

**Evidence**: unprompted, and framed as a check rather than an instruction — "answer me if you
think my assumption is OK" before letting the file be edited. Verified sound before agreeing:
`conftest verify` *is* OPA's test runner, and the skill being learned (`test_` rules plus
`with input as`) is byte-identical between the two. Differences are runner ergonomics — exit 1 vs
2 on failure, conftest's `-o`/`-n`/`--data` flags, `--report` in place of `--explain` — plus one
genuine gap: no coverage or benchmarking under conftest.

**Implications**

1. **LR-0003's "engine before wrapper" has now expired, and should be treated as spent.** It was a
   guard against copy-pasting undebuggable policies; lessons 1–3 discharged it. From here, teach
   the tool the user will actually run at work, and reach for plain `opa` only where it exposes
   something the wrapper hides — as `opa eval` still does for undefined-vs-empty.
2. **Keep the engine name in the room, though.** OPA's own docs are the primary source for
   testing and are written in `opa test` terms, so a lesson that never says the two are the same
   runner leaves the user unable to use the best documentation available. One line, not a detour.
3. **They now check assumptions against me before acting on them.** That is a change from
   sessions 1–2, where redirections arrived as decisions. Answer these with verification, not
   agreement — the value delivered here was the three facts the check surfaced (the misleading
   `_test` filename claim in conftest's help, the exit-code difference, and `verify` repeating the
   `0 tests` silent pass), none of which they had asked about.
