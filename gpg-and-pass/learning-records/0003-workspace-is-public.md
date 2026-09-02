# The whole workspace is published publicly, so it carries no personal data

This workspace — lessons, reference documents, mission, notes and learning records
alike — is published to a public repository. This is a hard standing constraint on
everything written here, not a one-off cleanup: no real key IDs, fingerprints, uids,
email addresses, store entry names, usernames in paths, or inferences about the
learner's location, employer or team.

Lesson 01 originally used a real key listing and real store contents as its specimen.
That was pedagogically ideal — it proved claims against artefacts the learner owned —
but incompatible with publishing. It was rewritten around a fabricated example identity,
recorded in `NOTES.md` so examples stay consistent across future lessons.

## Implications
- The "demystification by demonstration" approach from LR-0001 survives, but shifts:
  lessons show *representative* output and put the personal verification in the drill,
  where the reader runs the command against their own machine and compares. This is
  arguably better teaching — it forces active matching rather than passive recognition.
- Machine-specific findings (e.g. keyboxd vs `pubring.kbx`) must be reframed as a check
  the reader performs, not as an assertion about their setup.
- Fabricated key material must satisfy the invariant lesson 01 teaches: a long key ID is
  the last 16 hex digits of its fingerprint.
- Any future lesson wanting to use real terminal output must anonymise it first.
