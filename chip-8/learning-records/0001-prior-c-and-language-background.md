# Prior knowledge: rusty college C, fluent in Go/Ruby/Bash

The user used C heavily in college about 15 years ago and remembers its syntax, but not necessarily the details (integer promotion, UB, `stdint.h`, pointer idioms). Since then they've worked in Bash, Ruby, Go and SQL. So loops, functions, and types don't need teaching. Teach C's *specifics* and compare them to Go where that helps.

**Implications:** Start at "C semantics that matter for emulation" (fixed-width ints, wraparound, bitwise, pointers to structs), not at "hello world". Go has explicit conversions and no implicit promotion, so C's promotion rules are a likely stumbling block.
