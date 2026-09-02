# Mission scoped: practical-minimum GPG, and pass gets introduced to a team from zero

Established in the opening session. The answers narrow the syllabus considerably.

- **Key hygiene depth: practical minimum.** One key, understood fully; backup and
  revocation covered; explicitly *no* offline-primary / per-machine-subkey ceremony.
  Multi-machine sync will therefore be taught as "move the whole key safely", not
  "issue a subkey per host". Flagged as revisitable once `pass` is a daily habit.
- **The existing key and store are disposable.** Lessons may destroy them freely.
- **Team position: the learner would be the one introducing `pass`.** Nobody on the team
  uses GPG today. The team-sharing lesson must therefore cover *onboarding people from
  zero* — collecting their public keys, verifying them, and the offboarding /
  re-encryption story — not merely the `.gpg-id` mechanics.

## Implications
- The subkey concept still gets taught (lesson 01 does), because it explains what already
  exists on disk — but as understanding, not as a workflow to adopt yet.
- The team lesson is the most complex and should stay late in the sequence; it depends on
  git sync, key export/import, and multi-recipient re-encryption all being fluent first.
