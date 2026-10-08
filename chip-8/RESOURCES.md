# CHIP-8 in C Resources

## Knowledge

### CHIP-8 / emulation
- [Guide to making a CHIP-8 emulator — Tobias V. Langhoff](https://tobiasvl.github.io/blog/write-a-chip-8-emulator/)
  The standard modern guide. Explains every component and instruction, uses pseudocode, and leaves the implementation to you; it also flags quirks. Use for: the spec of each component and opcode, and troubleshooting. **Primary CHIP-8 source.**
- [Timendus chip8-test-suite](https://github.com/Timendus/chip8-test-suite)
  Test ROMs for CHIP-8 / SUPER-CHIP / XO-CHIP: IBM logo, opcodes, flags, quirks, keypad. Use for: the mission's finish line; run the tests in order as features land.
- [awesome-chip-8 — tobiasvl](https://github.com/tobiasvl/awesome-chip-8)
  Curated index of specs, ROMs, and documentation. Use for: finding ROMs and deeper historical references.

### C language
- [Beej's Guide to C Programming](https://beej.us/guide/bgc/html/split/)
  Free, modern (C11/C23), friendly and accurate. Use for: refreshers on any language feature. Most relevant chapters: 5/11 pointers, 6 arrays, 8/20 structs, 9 file I/O, 10 typedef, 12 malloc, 24 bitwise, 37 fixed-width integers.
- [cppreference — C language](https://en.cppreference.com/w/c/language)
  The authoritative reference for exact semantics. Use for: overflow, integer promotions, conversions, undefined behavior.
  - [Arithmetic operators → Overflows](https://en.cppreference.com/w/c/language/operator_arithmetic#Overflows)
  - [Implicit conversions → Integer promotions](https://en.cppreference.com/w/c/language/conversion#Integer_promotions)

## Wisdom (Communities)

- [r/EmuDev](https://www.reddit.com/r/EmuDev/)
  Emulator development subreddit; CHIP-8 is a frequent topic. Use for: sharing progress and getting design critique.
- [EmuDev Discord](https://discord.gg/dkmJAes) — `#chip-8` channel
  Experienced people answer CHIP-8 questions patiently. Use for: when a test ROM fails and you can't see why.

## Gaps
- Terminal rendering in C (raw mode via termios, ANSI escapes, non-blocking key reads): need a high-trust source before that lesson.
