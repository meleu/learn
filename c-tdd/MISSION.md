# Mission: C with TDD (Unity)

## Why

Get fluent in C again after about 15 years away (it was a college language; since then it's been Bash, Ruby, Go and SQL), and build the TDD habit from the start using the Unity framework. Think "learn-go-with-tests, but for C": every language feature arrives because a test asked for it.

## Success looks like

- Set up a C project from scratch with vendored Unity and a hand-written Makefile, no IDE or generator needed
- Run the red → green → refactor loop in C without having to think about it: write a test, read the failure, write the least code that passes, then refactor
- Read compiler, linker and Unity failure messages and know which stage broke and why
- Write idiomatic modern C (C17): headers and translation units, `const`, strings as `char` arrays, pointers, structs, and memory ownership

## Constraints

- No specific project yet; this is a general refresher, so examples should stay small and self-contained
- Plain Makefile over Ceedling or CMake, so the build stays transparent
- Linux, gcc 16, GNU make 4.4

## Out of scope

- Ceedling, CMock and Unity's Ruby helper scripts (for now)
- Embedded/hardware-specific concerns
- C++
