# Partial set rules are fluent; the gap was *when* a conflict is detected

The user writes `violations contains MSG if BODY` from memory, unassisted ("pretty trivial"). L1–2 are spent: partial set rules, undefined vs empty, complete vs partial need no re-teaching. The one correction was how OPA reports a conflict between rules.

**Evidence**: L2 drill step 7 gave no snippet; they wrote `violations contains "age is required" if not input.age` (`exercises/002/policy.rego:3`). Restating four ask-teacher questions, three were correct: a set is "an array with no repetitions and no guarantees about the order"; `contains` vs `:=` is partial-set vs complete-rule syntax that can't share an identifier; a good message "guides the user to the solution".

**The correction**: they believed mixing `contains` and `:=` on one identifier is a *syntax* error. It parses (`opa parse` exits 0) and fails at compile: `rego_type_error: conflicting rules data.mix.p found`. That differs in phase from L2's `eval_conflict_error`, which two `:=` rules raise only at *runtime*, only for an input satisfying both bodies. Verified OPA 1.19.0.

**Implications**

1. **The phase distinction is the reusable insight, not the error text.** A compile-time conflict can't ship; a runtime one passes `opa check`, ships, and detonates on the first input tripping both rules. That motivates policy tests (`conftest verify`) and `opa check` in CI, and is a "coworkers will get this wrong" point (LR-0002).
2. **"Array without repeats or order" works, with one blind spot: indexing.** `s[0]` on a set is a membership test, not the first element. It was believed to yield undefined rather than an error; s6 found both happen (undefined on `{1,2,3}`, compile-time `rego_type_error` on a typed set; see NOTES). Sharpened in L5.
