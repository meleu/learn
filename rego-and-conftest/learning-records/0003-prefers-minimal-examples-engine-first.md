# Prefers minimal examples, and the engine before the wrapper

**Status**: point 2 superseded by LR-0007; point 1 active.

After L1's first draft, the user asked to replace the Kubernetes Deployment example with the simplest one possible (`input.age >= 18`) and to remove conftest so fundamentals were explored in plain `opa` first.

**Evidence**: unprompted, citing a simpler treatment from an earlier course attempt.

**Implications**

1. **When the concept is the point, strip the domain.** Realistic config competes for working memory. Work-shaped examples (Kubernetes, Dockerfile, `pom.xml`) only where the format itself is the subject.
2. **Engine before wrapper.** Learning conftest first produces someone who copy-pastes policies they can't debug; the user also needs the layer underneath to answer coworkers' "why does it do that?" (LR-0002).
