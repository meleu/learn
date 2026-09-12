# The curriculum jumped to conftest as soon as partial set rules landed

After L2 the user reordered the sequence: "with lessons 1 and 2 we have the minimum Rego knowledge to start playing with basic rules written for conftest." L3 became the conftest contract instead of the queued two-operator model (bodies as AND, multiple rules as OR); bodies, iteration and testing were deferred past the wrapper.

**Evidence**: unprompted, with their own draft: three single-expression `deny`/`warn` rules on a Kubernetes Deployment, exactly L1–2's subset. The draft was written to need nothing untaught.

**Implications**

1. **Contradicts LR-0003 only in appearance.** Its risk (undebuggable copy-paste) was spent: the user reads `data.main.deny` as a partial set rule and can reproduce conftest with `conftest parse` piped into `opa eval`. L3 §1 proves conftest adds no language before naming any convention. The threshold came earlier than planned.
2. **The user calibrates their own ZPD, well.** They arrive with examples sized to what they know (also L2's `package signup` snippet). Treat a supplied example as a statement of level; check the fit instead of substituting something more ambitious.
3. **L3 left one deliberate debt**: the draft has no `input.kind == "Deployment"` guard, which needs a two-expression body. L3 flagged it and pointed ahead; L4 paid it, motivated by a gap in the user's own policy rather than syntax completeness.
