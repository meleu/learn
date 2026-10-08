# Mission: Relearn C by building a CHIP-8 emulator

## Why
Get fluent in C again, 15 years after college, by building something real rather than doing exercises, and learn how emulators work inside. CHIP-8 is the classic first emulator. It is the way into the core ideas: the fetch/decode/execute loop, a memory map, registers, and timing.

## Success looks like
- A CHIP-8 emulator written in C from scratch that plays classic ROMs (Pong, Tetris, Space Invaders) in the terminal
- It passes the Timendus `chip8-test-suite` ROMs (opcodes, flags, quirks, keypad)
- Can explain and use the C features an emulator relies on: fixed-width unsigned integers, bitwise ops, arrays as memory, structs, pointers, `switch` decoding, file I/O
- Can read a hardware spec and turn it into C without looking at someone else's emulator

## Constraints
- 3–5 hours per week
- Background: C in college (rusty), daily Bash, Ruby, Go and SQL. Knows programming; doesn't need general concepts explained
- Linux with gcc/clang. Terminal rendering first (no SDL dependency at the start)
- Learn from the spec, with guided hints. Code snippets are OK when stuck, but no copying a full emulator

## Out of scope
- SUPER-CHIP / XO-CHIP extensions (maybe later)
- GUI/SDL frontend and sound polish, until the core passes the tests
- Other emulated systems (Game Boy, NES): a possible later mission
