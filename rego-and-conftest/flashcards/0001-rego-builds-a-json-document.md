# Flashcards — Lesson 1: Rego Builds a JSON Document

Anki **Basic**. 7 cards. Source: [`lessons/0001-rego-builds-a-json-document.html`](../lessons/0001-rego-builds-a-json-document.html)

**1. Front:** What does a `.rego` file do?
**Back:** It is a set of rules that build a JSON document out of `input` data.

**2. Front:** Who blocks the request when a Rego policy says "not allowed"?
**Back:** The caller. Rego decides; it never enforces.

**3. Front:** What are the two roots of OPA's tree?
**Back:** `input` — the data for this one question; `data` — loaded context plus what your rules generate.

**4. Front:** A rule body is not satisfied. What is in the document?
**Back:** Nothing — the key is absent. That absence is called undefined.

**5. Front:** Undefined is not which two things?
**Back:** Not `false` and not `null` — those are real values sitting in the document.

**6. Front:** What does `default allow := false` do?
**Back:** Supplies a value when every other definition is undefined, so the key is always present.

**7. Front:** How do you address a value your rules built?
**Back:** By its path: `data.<package>.<rule>`, queried with `opa eval`.
