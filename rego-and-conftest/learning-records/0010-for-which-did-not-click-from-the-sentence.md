# "For which c?" did not land from the whiteboard sentence alone

After L5 (and L6's practice), the user asked for an elaboration of L5 §2's callout: `some c in containers` means "for which c?", not "for each c". They can write iterating rules; the *reframe* is what hasn't clicked. A sentence offered as the thing to put on a whiteboard failed its first reader, which matters for a mission whose end state is running that whiteboard.

**Evidence**: the user's own words, s10: "The 'for each' vs. 'for which?' trick is not clicking in my brain yet." Answered in chat (no new lesson) with four verified demos (`opa` 1.20.2):

- SQL mapping: `some c in` ≈ `FROM`, body conditions ≈ `WHERE`, `msg` ≈ `SELECT`.
- Moving the hole: `some i, c in input.containers; c.name == "proxy"; i` → `2`. Same syntax, a lookup.
- Two holes: `some a in [1,2,3]; some b in [2,3,4]; a == b` → `(2,2)`, `(3,3)`. OPA docs: "In Rego (and other languages based on Datalog), joins are implicit".
- Missing list: Python `for c in None` → `TypeError`; Rego → `undefined`, exit 0. The question reading explains *why* silent pass #4 is silent.
- English trap: "for each c, the image floats" is a statement about *all* containers, which is `every` (undefined on the L5 fixture), not `some` (two rows).

**Implications**

1. **Abstract reframes need a demo that the old model gets wrong.** The L5 callout asserted the model and pointed at §4's table; it never showed a case where "for each" *predicts wrongly*. Future mental-model sentences ship with one such case.
2. **Unconfirmed.** Next session, open with retrieval: read a rule body aloud as a question. If they still translate to a loop, try the missing-list contrast first; it ties the model to a failure they already fear.
3. **Found while verifying**: `some c` must precede uses of `c` (`rego_compile_error: var c referenced above`), an exception to L4's "body order doesn't matter". Told the user in the chat; not yet on any page.
