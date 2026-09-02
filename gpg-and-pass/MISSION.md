# Mission: GPG and `pass`

## Why
Make `pass` the single place secrets live — reachable from the shell, scriptable, and
synced across several machines and eventually a team. The obstacle is not the tool:
`pass` was tried before and abandoned, not because a command failed but because GPG
underneath it felt like an unlit room. The goal is to stop treating the encryption
layer as magic, so that trusting `pass` with real credentials stops feeling reckless.

## Success looks like
- Reading `gpg --list-keys` output and explaining exactly which key `pass` uses and why.
- Creating, backing up, and revoking a GPG key without following a recipe blindly.
- `pass generate` / `pass show -c` in daily use, and `pass` reads inside shell scripts.
- Secrets migrated in from an external password manager, with no plaintext left on disk.
- The same store working on several Unix machines, synced over git.
- A shared team store where colleagues encrypt to each other, and access can be revoked.

## Constraints
- **Practical minimum on GPG hygiene**: one key, understood fully. No offline-primary /
  per-machine-subkey ceremony for now — revisit once `pass` is a daily habit.
- Arch Linux, Wayland (`wl-copy`, no `xclip`), GnuPG 2.4.9, bash.
- The current practice key and store contents are disposable. Lessons may freely destroy
  and rebuild them; a real key gets created deliberately later in the arc.
- The learner would be the one *introducing* `pass` to a team that does not use GPG
  today, so team lessons must cover onboarding people from zero.
- This workspace is public. See the publishing constraint in [NOTES.md](./NOTES.md):
  no real key material, addresses, or store contents appear anywhere in it.

## Out of scope
- Web-of-trust, keyservers, key signing parties, `--edit-key trust` ceremonies.
- Hardware tokens (YubiKey), smartcards.
- Email encryption. GPG here exists only to serve `pass`.
- Alternative stores (gopass, Vault, SOPS) until vanilla `pass` is fluent.
