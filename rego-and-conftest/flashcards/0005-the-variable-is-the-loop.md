# Flashcards — Lesson 5: The Variable Is the Loop

Anki **Basic**. 7 cards. Source: [`lessons/0005-the-variable-is-the-loop.html`](../lessons/0005-the-variable-is-the-loop.html)

**1. Front:** What does `some c in containers` actually ask?
**Back:** "For which `c`?" — not "for each `c`". The engine returns every answer.

**2. Front:** How does one rule definition produce many messages?
**Back:** A body with a free variable is evaluated once per binding, and each survivor adds a member.

**3. Front:** Which loop constructs does Rego iteration have?
**Back:** None — no order, no `break`, no `continue`, no accumulator.

**4. Front:** On a set `s`, what does `s[2]` mean?
**Back:** A membership test yielding `2` — sets have no positions to index.

**5. Front:** A rule iterates a misspelled path. What does conftest report?
**Back:** A clean pass, forever — zero bindings means zero messages.

**6. Front:** Why does `not xs[_].field` fail to compile?
**Back:** Safety: `_` is unbound. Bind with `some` first, negate second.

**7. Front:** When should a `deny` rule use `some` rather than `every`?
**Back:** Almost always — only `some` binds the offender, so only it can name what to fix.
