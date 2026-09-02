# Working notes

## PUBLISHING CONSTRAINT — read first

**This entire workspace is published to a public repository.** Nothing written here,
in `MISSION.md`, in `learning-records/`, in `lessons/` or in `reference/` may contain
personal data. Never record:

- the learner's name, email, or any real uid string
- real key IDs or fingerprints from their keyring
- the names of real entries in their password store
- absolute paths containing their username
- machine-specific probe output presented as fact about the reader
  ("your `~/.gnupg` has no `pubring.kbx`")
- inferences about location, nationality, employer, or team

Instead: use the fabricated example identity below, `example.com` addresses, and phrase
machine-specific observations as a check the reader performs
(`ls ~/.gnupg` → "if there is no `pubring.kbx`, then…").

**Example identity — reuse across all lessons for continuity:**

| Thing | Value |
|---|---|
| uid | `Ada Byron <ada@example.com>` |
| primary key ID | `4C7B1E9A05D3F268` |
| primary fingerprint | `A3F92D1B7C4E60885B0D2A944C7B1E9A05D3F268` |
| subkey ID | `D82A6F14B90C7E35` |
| subkey fingerprint | `61B45E8027FA3D19C6E08B72D82A6F14B90C7E35` |
| key creation date | `2026-01-15` |
| example store entries | `email/fastmail`, `work/aws/prod` |

Invariant to preserve when inventing more: a long key ID **is** the last 16 hex digits
of its fingerprint. Lesson 01 teaches this and a quiz question tests it, so any
fabricated pair must actually satisfy it.

## Target environment

These lessons are written against one specific setup. State it as the lessons'
assumption, not as a fact about the reader.

- Arch Linux, bash, **Wayland** — clipboard is `wl-copy` (wl-clipboard 2.3.0),
  `xclip` not installed. `pass -c` shells out to `xclip` on X11; verify how it behaves
  under Wayland before teaching the clipboard lesson rather than assuming.
- GnuPG 2.4.9 with the **keyboxd** backend (`common.conf` contains `use-keyboxd`).
  `pubring.kbx` does not exist; public keys live in `public-keys.d/`. Any guide saying
  "back up `~/.gnupg/pubring.kbx`" silently backs up nothing here — teach `--export`.
- pinentry available in curses, gnome3 and qt flavours.
- `pass` installed; `pass-otp` and `gopass` are not.
- A disposable practice key exists (ed25519 primary `[SC]` + cv25519 `[E]` subkey, no
  expiry) alongside a scratch `~/.password-store`. Both may be destroyed by any lesson;
  the real key gets created deliberately later in the arc.

## Teaching preferences

- The learner is an experienced Unix/bash user. Do not explain shell basics, pipes,
  redirection, or file permissions. Explain GPG semantics, not command-line mechanics.
- The stated blocker is *discomfort*, not ignorance — `pass` was abandoned previously
  because GPG underneath was opaque, not because a command failed. Favour
  **demystification by demonstration**: prove each claim with a command the reader runs,
  don't assert it.
- Lessons are written in English.

## Planned arc (revise freely)

1. ✅ Anatomy of the key — `sec`/`ssb`, `[SC]`/`[E]`, fingerprint vs key ID.
2. `pass` is a directory of `gpg -d` files — `.gpg-id`, proven with raw gpg.
3. Creating the real key properly: expiry, revocation cert, backup via `--export`.
4. Daily driver: `generate`, `-c`, multiline entries, reads inside scripts.
5. git sync + moving a key to a second machine.
6. Importing from an external manager with no plaintext hitting disk.
7. Team store: multiple `.gpg-id` recipients, subfolder scoping, offboarding.

## Open questions to revisit

- Does `pass -c` work out of the box on Wayland here? Test during lesson 4.
- Team size and whether everyone is on Unix — shapes lesson 7 heavily. Ask before writing it.
