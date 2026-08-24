# Partial set rules are fluent; the gap was *when* a conflict is detected

The user can author `violations contains MSG if BODY` from memory, unassisted, and described doing
so as "pretty trivial". Lessons 1–2 are spent: partial set rules, undefined-vs-empty, and the
complete-vs-partial distinction need no re-teaching. The one correction needed was not about
writing rules but about how OPA reports a conflict between two of them.

**Evidence**: lesson 2's drill step 7 gave no snippet and asked for a fourth rule; the user wrote
`violations contains "age is required" if not input.age` from memory (`exercises/002/policy.rego:3`).
Asked to restate the four open `ask-teacher` questions in their own words, they gave correct
answers for three: sets as "an array with no repetitions and no guarantees about the order";
`contains` vs `:=` as partial-set vs complete-rule syntax that cannot share an identifier; a good
message as "something that guides the user to the solution".

**The correction**: they believed mixing `contains` and `:=` on one identifier is a *syntax* error.
It is not — the file parses (`opa parse` exits 0) and fails at compile with
`rego_type_error: conflicting rules data.mix.p found`. That is a different error, at a different
phase, from lesson 2's `eval_conflict_error`, which two `:=` rules produce only at *runtime*, and
only for an input that satisfies both bodies. Verified locally, OPA 1.19.0.

**Implications**

1. **The phase distinction is the reusable insight, not the error text.** The compile-time conflict
   can never ship; the runtime one passes `opa check`, ships, and detonates on the first input that
   trips both rules. This is the concrete motivation for `opa test` (backlog item 6) and for
   running `opa check` in CI: some Rego bugs are only reachable by input, so policies need tests
   for the same reason application code does. It is also exactly the kind of "your coworkers will
   get this wrong" point LR-0002 asks lessons to flag.
2. **The set-vs-array model is a working approximation with one known blind spot.** "Array without
   repeats or order" is enough for authoring rules, and was accepted as enough. It breaks on
   indexing: `s[0]` on a set is a *membership test*, not the first element, and it yields undefined
   rather than an error. Sharpen it when iteration is taught (backlog item 5) — that is the lesson
   where the difference first has consequences, and not before.
