# Flashcards — Lesson 6: Translate the Requirements

Anki **Basic**. 7 cards. Source: [`lessons/0006-translate-the-requirements.html`](../lessons/0006-translate-the-requirements.html)

**1. Front:** What four moves turn a written requirement into a conftest rule?
**Back:** Parse the file, ask it as an `opa eval` query, write the rule, run the checker.

**2. Front:** English "must be present and must not be X" becomes what in Rego?
**Back:** An OR — two definitions, one per way to violate it.

**3. Front:** Why does `input.spec.replicas < 2` miss a Deployment that omits replicas?
**Back:** A comparison on a missing key is undefined, so the body silently fails.

**4. Front:** Where does a Pod keep its containers, compared with a Deployment?
**Back:** `spec.containers` on a Pod; `spec.template.spec.containers` on a Deployment.

**5. Front:** Why keep a manifest that breaks nothing among your fixtures?
**Back:** It is the only fixture that catches a rule firing where it should not.

**6. Front:** Why start every policy message with a requirement ID?
**Back:** A failing pipeline then points a coworker at the written requirement behind it.

**7. Front:** Does `endswith(c.image, ":latest")` catch the untagged image `nginx`?
**Back:** No — Kubernetes treats it as `:latest`, but the string has no tag to match.
