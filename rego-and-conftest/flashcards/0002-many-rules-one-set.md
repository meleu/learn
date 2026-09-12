# Flashcards — Lesson 2: Many Rules, One Set

Anki **Basic**. 7 cards. Source: [`lessons/0002-many-rules-one-set.html`](../lessons/0002-many-rules-one-set.html)

**1. Front:** What question does a complete rule answer?
**Back:** "What is the value?" — so a second answer is a contradiction.

**2. Front:** What question does a partial set rule answer?
**Back:** "What belongs?" — so a second answer is just another member.

**3. Front:** Two complete rules with the same name both fire. What happens?
**Back:** `eval_conflict_error` — a key holds one value, and OPA refuses to pick.

**4. Front:** Read `violations contains M if B` aloud.
**Back:** When B holds, M belongs to `violations`.

**5. Front:** Every rule body fails. What is a partial set rule's value?
**Back:** An empty set — the key is present, holding nothing.

**6. Front:** Why can a pipeline just `count()` a deny set?
**Back:** A partial set rule is always defined, so a pass is `[]`, never undefined.

**7. Front:** What does a missing key do to a check?
**Back:** It makes the check disappear, not fail — so write the `not` rule too.
