# GPG and `pass` Resources

## Knowledge

- [`pass` — The Standard Unix Password Manager](https://www.passwordstore.org/)
  Jason Donenfeld's project page. Short, and the design philosophy section is the
  best one-paragraph justification of why the store is "just files".
  Use for: the elevator pitch, install instructions, list of compatible clients.

- [`pass(1)` man page / project README](https://git.zx2c4.com/password-store/about/)
  The authoritative command reference — every subcommand, every flag, every
  `PASSWORD_STORE_*` environment variable, and the `.gpg-id` semantics.
  Use for: exact syntax, clipboard timing, per-subfolder keys, extension hooks.
  Locally: `man pass`.

- [`password-store.sh` — the source](https://git.zx2c4.com/password-store/tree/src/password-store.sh)
  720 lines of readable Bash, and the same file as `/usr/bin/pass` on disk. Promoted to a
  first-class source: for any question of the form "what does `pass` actually do when I…", this
  answers it faster and more reliably than the man page, and it settles disputes the docs leave open.
  Landmarks: `GPG_OPTS` (line 9), `set_gpg_recipients()` (the `.gpg-id` walk-up),
  `reencrypt_path()`, `clip()` (the clipboard-restore trick), `cmd_show()`.
  Use for: verifying claims before teaching them.

- [GnuPG — ArchWiki](https://wiki.archlinux.org/title/GnuPG)
  The most practical GPG page on the internet, and it targets Arch directly.
  Use for: `gpg-agent` config, pinentry selection, key generation flags, subkeys,
  expiry, revocation, and the caching behaviour that makes `pass` feel seamless.

- [OpenPGP Best Practices — Riseup](https://riseup.net/en/security/message-security/openpgp/gpg-best-practices)
  Opinionated hygiene guide: algorithm choices, expiry dates, revocation certificates,
  why the primary key certifies and subkeys do the work.
  Use for: deciding *how* to create the real key, and what to back up.
  Caveat: written for an email-centric threat model; skip the keyserver sections.

- [The GNU Privacy Handbook](https://www.gnupg.org/gph/en/manual.html)
  Upstream's own conceptual manual. Dry, but it is the primary source for what
  the OpenPGP concepts actually mean.
  Use for: settling any "but what does GPG *really* do here" question.

- [Bitwarden: Export Vault Data](https://bitwarden.com/help/export-your-data/)
  Official docs for `bw export` and the export formats.
  Use for: the migration lesson — getting data *out* of Bitwarden correctly.

## Wisdom (Communities)

- [r/GnuPG](https://reddit.com/r/GnuPG)
  Low volume, high signal, few beginners' myths repeated. Use for: "is my key setup sane?"

- [password-store mailing list](https://lists.zx2c4.com/mailman/listinfo/password-store)
  The upstream list, read by the maintainer. Use for: workflow questions, extension
  discovery, multi-user store patterns.

- [r/commandline](https://reddit.com/r/commandline) and [Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/tagged/gnupg)
  Use for: scripting patterns and "how do people actually wire this into their dotfiles".

## Gaps

- No trusted, current write-up found yet for **Bitwarden → pass** migration. The
  candidates found (`pass2bw` forks) go the wrong direction. Likely we write our
  own `bw export --format json | jq` pipeline and it becomes a reference document.
- No strong source yet on **multi-recipient team stores in practice** — the man page
  documents `.gpg-id` mechanics but not the operational patterns (onboarding,
  offboarding, key rotation, what to do about already-leaked secrets). Needs search.
