# Starting point: working setup, absent mental model

The learner arrives with GnuPG 2.4.9, `pass`, a functioning ed25519 key (primary `[SC]`
plus a cv25519 `[E]` subkey, no expiry) and a populated-but-disposable password store.
They have therefore *already* completed the mechanical setup that most tutorials treat
as the destination.

The blocker is not capability but confidence: they abandoned `pass` previously because
GPG underneath was opaque, not because any command failed. This inverts the usual
teaching order — skip installation and key-generation walkthroughs, start by
*explaining the artefacts they already have*, and favour demonstration over assertion
throughout (an experienced Unix user will believe a command's output over a paragraph
of prose).

## Implications
- Never teach shell mechanics; teach GPG semantics.
- Every non-obvious claim should come with a command the reader can run to verify it.
- The practice key is a free specimen: it can be dissected, broken, and destroyed
  without stakes, before the real key is created deliberately in a later lesson.
