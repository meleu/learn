# Arrives with a correct document model already formed

The user independently reached the framing "Rego is a language to build JSON documents; a `.rego`
file has rules that build a JSON document from input data" during an earlier, abandoned attempt
at learning Rego. This is the correct foundational model — the same one the OPA authors designed
around — so lesson 1 confirmed and named it rather than re-teaching it from scratch.

**Evidence**: stated verbatim in the session-1 request, unprompted, as pre-existing notes.

**Implications**: the entry point for this workspace is higher than a normal beginner's. Skip
"what is policy as code" motivational material. The productive gap is not the model but its
*mechanics* — undefined vs false vs empty, rule kinds, iteration — and the vocabulary that lets
the user defend the model when coworkers push back. Teach downward from the model into details,
not upward from syntax.
