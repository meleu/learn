# Flashcards — Lesson 3: The Conftest Contract

Anki **Basic**. 7 cards. Source: [`lessons/0003-the-conftest-contract.html`](../lessons/0003-the-conftest-contract.html)

**1. Front:** What does conftest add to Rego?
**Back:** No language at all — a file parser, a naming convention, and an exit code.

**2. Front:** Name conftest's four conventions.
**Back:** Policies in `policy/`, package `main`, rules named `deny`/`violation`/`warn`, one document at a time.

**3. Front:** What does `conftest parse FILE` print?
**Back:** The JSON your rules will address — run it before writing a single rule.

**4. Front:** How do `deny` and `warn` differ?
**Back:** Only in the exit code: `deny` exits 1, `warn` exits 0. Same Rego, same set.

**5. Front:** Conftest reports `0 tests, 0 passed` and exits 0. What happened?
**Back:** It found no rules at `data.main.deny` — usually a package that isn't `main`.

**6. Front:** Why must CI fail on `0 tests`?
**Back:** That number means the gate was never closed, and no built-in flag rejects it.

**7. Front:** May a conftest rule be called `deny_replicas`?
**Back:** Yes — an underscore suffix on `deny`/`violation`/`warn` is allowed.
