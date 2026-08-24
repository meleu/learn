# The curriculum jumped to conftest as soon as partial set rules landed

After lesson 2, the user redirected the sequence themselves: "with lessons 1 and 2 we have the
minimum Rego knowledge to start playing with basic rules written for conftest." Lesson 3 was
therefore the conftest contract, not the two-operator model (rule bodies as AND / multiple rules
as OR) that the backlog had queued next. Items 3–5 of the backlog — bodies, iteration, `opa test`
— were all deferred past the wrapper.

**Evidence**: unprompted reordering, supplied with their own draft policy — three single-expression
`deny`/`warn` rules against a Kubernetes Deployment, which is precisely the subset of Rego lessons
1 and 2 cover. The draft is the evidence: it was written to need nothing they had not been taught.

**Implications**

1. **This contradicts LR-0003's "engine before wrapper" only in appearance.** The reason conftest
   was deferred was that learning the wrapper first produces someone who copy-pastes policies they
   cannot debug. That risk is now spent: the user can read `data.main.deny` as a partial set rule
   and reproduce conftest's whole job with `conftest parse` piped into `opa eval`. Lesson 3 leans
   on exactly that — section 1 proves conftest adds no language before any convention is named.
   The principle stands; the threshold was reached earlier than the backlog assumed.
2. **The user calibrates their own zone of proximal development, and does it well.** They arrive
   with a worked example sized to what they already know (see also NOTES: they brought lesson 2's
   `package signup` snippet). Treat a user-supplied example as a statement about where they think
   they are, and check the fit rather than substituting something more ambitious.
3. **Lesson 3 left one debt on purpose.** Their draft has no `input.kind == "Deployment"` guard,
   because a guard needs a two-expression body — the deferred backlog item 3. Rather than silently
   adding the guard, lesson 3 flags its absence in a callout and names the next lesson as the
   fix. Backlog item 3 is now motivated by a concrete gap in the user's own policy rather than by
   syntax completeness, which is a better hook than the one it had.
