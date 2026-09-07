# Claims about `pass` get verified against the source and a sandbox, not the web

Lesson 02 needed to state why `pass` passes `--compress-algo=none` and `--no-encrypt-to` to every
`gpg` invocation. A web search returned a confident-sounding but plainly speculative explanation
("keeps files in their simplest form without additional processing overhead"). Rather than repeat it,
the claim was tested: an `encrypt-to` line was added to a throwaway `gpg.conf`, and raw `gpg -e`
was compared against `pass insert` in a sandbox store.

Raw `gpg -e` silently encrypted to a second recipient. `pass` did not. That turned a weak paraphrase
into a demonstrable security property, and it became the strongest section of the lesson.

## Method that produced this
A disposable `GNUPGHOME` plus `PASSWORD_STORE_DIR` under the scratch directory, with two fabricated
keys generated via `--quick-gen-key` / `--quick-add-key`. Every command that appears in lesson 02 and
reference 02 was executed there first, including the multi-line `find` loops. The published examples
are real output with the sandbox key IDs swapped for the fabricated ones from `NOTES.md`.

## Implications
- `/usr/bin/pass` is now listed in `RESOURCES.md` as a primary source. For "what does `pass` do
  when I…" questions it outranks both the man page and any blog post.
- Keep using the sandbox pattern: it satisfies "demystification by demonstration" (LR-0001) and the
  public-workspace constraint (LR-0003) simultaneously — real verified behaviour, no real key material.
- Where a rationale cannot be verified, teach the observable behaviour and leave the motive to the
  reader to ask about. Lesson 02 does this: `--no-encrypt-to` is demonstrated, `--compress-algo=none`
  is only named, and the "ask your teacher" box invites the question rather than inventing an answer.
