# The `N tests` rule taught in lesson 4 was an approximation, and lesson 5 replaces it

L4 says conftest's summary counts **rule definitions × documents**. That holds only while each definition yields at most one message, true of every policy in L1–4. It collapses once a rule iterates: one definition over one document with two messages prints `2 tests, 0 passed`. Recorded because the user stored the wrong generalisation from a closely audited page and probes summary output, not just exit codes (LR-0006).

**Evidence**: derived s6 by fitting five policy/document configurations (conftest dev build, OPA 1.19.0). Per document:

- `failures` = messages in the set (the only measured quantity).
- `passed` = `definitions − failures`, floored at zero.
- `tests` = `passed + failures`.

Checks: 1 definition / 2 messages → `2 tests, 0 passed`. 3 definitions / 2 messages → `3 tests, 1 passed`. 3 definitions / 0 messages → `3 tests, 3 passed`. 2 definitions × 3 documents, one message on each of two → `6 tests, 4 passed, 2 failures` (L4's own output, still reproduced).

**Implications**

1. **Don't quietly patch pages the user has read**: they audit code and will notice a moved number. L4's takeaway got a forward pointer; L5 §3 states the correction in a callout.
2. **Only the failure count means anything in a policy that iterates**, and real policies iterate. For CI: a pipeline or dashboard keying on "tests" or "passed" reads a subtraction. Reference 3's `-o tap` guard is unaffected (it keys on the plan line), a second argument for it.
3. **A rule fitted from a few observed cases is a hypothesis.** A page stating arithmetic or a count should name the configurations it was fitted against, as L5's source note does.
