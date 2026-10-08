# Notes

- Background: C in college ~15 years ago; works daily with Bash, Ruby, Go, SQL. Draw comparisons to Go where useful (e.g. Go's `uint8` ≈ C `uint8_t`, but Go has no implicit integer promotion).
- Goal: emulator passes the Timendus test suite. Frontend: terminal first.
- Time: 3–5 h/week → one short lesson plus a coding chunk per week.
- Spoiler policy: spec first, collapsed hints, snippets OK when stuck. Never hand over a full opcode implementation unprompted.
- Compile everything with `gcc -std=c11 -Wall -Wextra -pedantic`.
- Lessons build toward the actual emulator code. Each lesson's practice task should leave a file in the user's emulator repo (location TBD: ask the user where the code lives).

## Planned arc: C refresher through emulator parts
1. Exact-width unsigned ints, wraparound, arrays as memory, the `Chip8` struct ← lesson 0001
2. Bitwise ops: combine two bytes into an opcode; extract X, Y, N, NN, NNN
3. Pointers: passing `Chip8 *` to functions; `->`; why not pass by value
4. File I/O: `fopen`/`fread` a ROM into memory at 0x200; error handling
5. `switch` on the first nibble: the decode skeleton; IBM logo test ROM as the first milestone
6. Multi-file project + Makefile
