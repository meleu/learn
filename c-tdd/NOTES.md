# Notes

- Learner knows C syntax from college (~15 years ago). Day-to-day languages since: Bash, Ruby, Go, SQL. Go comparisons are a good bridge, e.g. `go test` vs a Unity runner, Go strings vs `char *`.
- Wants a learn-go-with-tests-style progression: small requirements, test first, then production code.
- Build tool: plain Makefile (learner chose it over Ceedling and CMake).
- Practice code lives in `code/hello/` at the workspace root (not inside `lessons/`, which must stay flat). Lesson 2 extends the same project.
- Unity pinned to tag v2.7.0 (latest release as of 2026-10). Its `master` already reports 2.7.2 in `unity.h`, but that isn't tagged.
- Verified on the learner's machine: Unity v2.7.0 builds cleanly with `-std=c17 -Wall -Wextra -Wpedantic`. Leaving out `setUp`/`tearDown` causes a *linker* error ("undefined reference to `setUp'"), which makes a good teaching moment.
- Lesson 2 plan: mirror LGWT "Hello, World" (hello() → hello(name) → empty name defaults to "World" → language param: Spanish, French → refactor to switch / prefix function). C twist: returning strings means deciding who owns the buffer. Start with a caller-supplied buffer (`char *out, size_t size`) + `snprintf`, or return string literals only while that still works. Decide when writing it.
