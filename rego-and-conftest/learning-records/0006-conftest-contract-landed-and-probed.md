# The conftest contract landed, and the user probes the flag surface past the lesson

Lesson 3's four conventions, the `N tests` arithmetic, and the `deny`/`warn` exit-code split are
all confirmed understood — and the user went past what the lesson taught, deliberately leaving
their drill policy in a non-`main` package in order to exercise `--all-namespaces`, and testing
`--fail-on-warn` unprompted.

**Evidence**: `exercises/003/policy/deployment.rego` holds five rules where the drill asked for
two — four `deny` plus one `warn`, all correct on first read. The package is `kubernetes.deployment`,
kept that way *on purpose*: asked whether they had hit the `0 tests` trap, the user said they had
left it non-`main` to test `--all-namespaces`. They predicted the test count before running and it
matched, and they confirmed `warn` exits 0, then explored how `--fail-on-warn` changes that.

**Implications**

1. **The `0 tests` trap is understood as namespace resolution, not as a bug.** Someone who reaches
   for `--all-namespaces` has understood *why* the count was zero. But the flag defuses only the
   common cause. Verified locally: a policy directory whose rules are named anything other than
   `deny`/`warn`/`violation` still reports `0 tests, 0 passed` and **exit 0** under
   `--all-namespaces`. The TAP guard in reference 3 is therefore still required, and the CI lesson
   (backlog item 9) should present `--all-namespaces` and the guard as complements, not
   alternatives.
2. **`--fail-on-warn` renumbers the exit codes, and that belongs in the CI lesson.** Verified,
   this build: without it, warnings exit 0 and failures exit 1. With it, warnings exit 1 and
   failures exit **2**. So a pipeline that treats `exit 1` as "policy failures" silently changes
   meaning the day someone adds the flag — `1` then means warnings. Reference 3's exit-code table
   was written without this flag and now understates the situation.
3. **State exact flag behaviour, never signpost it.** Two lessons running, the user has explored
   the surface beyond the drill and returned with results. A lesson that mentions a flag without
   saying precisely what it does creates work rather than saving it; conversely, drills can safely
   ask for less than the user will actually do.
