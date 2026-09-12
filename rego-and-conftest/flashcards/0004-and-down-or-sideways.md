# Flashcards — Lesson 4: AND Down, OR Sideways

Anki **Basic**. 7 cards. Source: [`lessons/0004-and-down-or-sideways.html`](../lessons/0004-and-down-or-sideways.html)

**1. Front:** How does Rego spell AND?
**Back:** Stack the expressions inside one rule body. There is no `and` keyword.

**2. Front:** How does Rego spell OR?
**Back:** Repeat the rule name in another definition. There is no `or` keyword.

**3. Front:** What is a guard such as `input.kind == "Deployment"`?
**Back:** A filter deciding which documents the rule speaks about — not an assertion about the file.

**4. Front:** Does the order of expressions in a body change the result?
**Back:** No — a body is a conjunction. Order is for the reader; lead with the guard.

**5. Front:** Where does `msg := sprintf(...)` sit in the logic?
**Back:** It is one more expression in the AND, so an undefined value in it silences the whole rule.

**6. Front:** What is a dead rule?
**Back:** A body demanding one field be two values at once — it compiles, is counted, and can never fire.

**7. Front:** What does a helper rule evaluate to when all its bodies fail?
**Back:** Undefined — never `false` — so a body referencing it simply does not hold.
