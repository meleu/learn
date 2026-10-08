# C with TDD (Unity) Resources

## Knowledge

- [Unity: Getting Started Guide (ThrowTheSwitch, GitHub)](https://github.com/ThrowTheSwitch/Unity/blob/master/docs/UnityGettingStartedGuide.md)
  The official guide: the three core files, test-file anatomy (`setUp`, `tearDown`, `RUN_TEST`, `UNITY_BEGIN/END`), and how to build. Use for: setup, runner structure.
- [Unity: Assertions Reference (ThrowTheSwitch, GitHub)](https://github.com/ThrowTheSwitch/Unity/blob/master/docs/UnityAssertionsReference.md)
  Every `TEST_ASSERT_*` macro and its semantics. Use for: picking the right assertion and reading failure output.
- [Unity: Assertions Cheat Sheet PDF (ThrowTheSwitch, GitHub)](https://github.com/ThrowTheSwitch/Unity/blob/master/docs/UnityAssertionsCheatSheetSuitableforPrintingandPossiblyFraming.pdf)
  Printable one-pager of the assertions. Use for: desk reference.
- [Unity: Configuration Guide (ThrowTheSwitch, GitHub)](https://github.com/ThrowTheSwitch/Unity/blob/master/docs/UnityConfigurationGuide.md)
  `UNITY_*` defines and how `RUN_TEST` works internally. Use for: anything beyond the defaults.
- [Learn Go with Tests: "Hello, World" (Chris James)](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/hello-world)
  The model for this course's style: write a test, make it compile, watch it fail, pass it, refactor. Use for: TDD discipline and lesson pacing.
- [GNU make manual: Automatic Variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html) and [Prerequisite Types](https://www.gnu.org/software/make/manual/html_node/Prerequisite-Types.html)
  Primary source for `$@`, `$^`, `$<` and order-only prerequisites (`| dir`). Use for: Makefile questions.
- [cppreference: C language](https://en.cppreference.com/w/c/language)
  Precise, standard-referenced documentation of C syntax and the standard library. Use for: checking any claim about C semantics.

## Wisdom (Communities)

- [ThrowTheSwitch Discourse forum](https://throwtheswitch.discourse.group/)
  The official community for Unity, CMock and Ceedling, run by the maintainers. Use for: Unity-specific questions.
- [r/C_Programming](https://www.reddit.com/r/C_Programming/)
  Large, active C subreddit. Use for: code review and "is this idiomatic?" questions.

## Gaps

- A Test-Driven Development for Embedded C-style book is the classic C TDD text (James Grenning), but it's embedded-focused and not yet verified as a fit for this mission.
