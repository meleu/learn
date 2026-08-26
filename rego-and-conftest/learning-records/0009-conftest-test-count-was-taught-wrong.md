# The `N tests` rule taught in lesson 4 was an approximation, and lesson 5 replaces it

Lesson 4 states that conftest's summary counts **rule definitions × documents**. That is only true
while every definition yields at most one message, which was the case for every policy in lessons
1–4. It collapses the moment a rule iterates: one definition over one document reporting two
messages prints `2 tests, 0 passed`. Recorded because the user has already stored the wrong
generalisation from a page they audited closely, and because they probe summary output rather than
just exit codes (NOTES: "they probe the flag surface past the drill").

**Evidence**: derived session 6 by fitting five policy/document configurations locally
(conftest dev build, OPA 1.19.0). The verified rule, per document:

- `failures` = number of messages in the set — the only measured quantity.
- `passed` = `definitions − failures`, floored at zero.
- `tests` = `passed + failures`.

Checks: 1 definition / 2 messages → `2 tests, 0 passed`. 3 definitions / 2 messages →
`3 tests, 1 passed`. 3 definitions / 0 messages → `3 tests, 3 passed`. 2 definitions × 3 documents
with one message each on two of them → `6 tests, 4 passed, 2 failures` (lesson 4's own output, which
the new rule still reproduces).

**Implications**

1. **Lesson 4's takeaway line now carries a forward pointer** rather than being silently wrong, and
   lesson 5 section 3 states the correction explicitly in a callout. Do not quietly patch pages the
   user has already read — they audit code and will notice a number that moved.
2. **Only the failure count is meaningful in a policy that iterates**, and every real policy
   iterates. This matters for backlog item 9 (CI): a pipeline or dashboard keying on "tests" or
   "passed" is reading a subtraction. The `-o tap` guard from reference 3 is unaffected — it keys
   on the plan line, not the summary — which is a second argument for it.
3. **Watch for the same class of error elsewhere in the course.** A rule stated from a small number
   of observed cases is a hypothesis. Where a page states arithmetic or a count, it should say what
   configurations it was fitted against, as lesson 5's source note now does.
