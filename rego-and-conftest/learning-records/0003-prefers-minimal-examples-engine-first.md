# Prefers minimal examples, and the engine before the wrapper

After reading the first draft of lesson 1, the user asked for two changes: replace the Kubernetes
Deployment example with the simplest possible one (an `input.age >= 18` age check), and remove
conftest from the lesson entirely so the fundamentals could be explored in plain `opa` first.

**Evidence**: unprompted request, with a concrete reference to a simpler treatment of the same
material from an earlier course attempt.

**Implications**: two standing constraints on how lessons get designed here.

1. **When the concept is the point, strip the domain.** Realistic config competes for working
   memory with the idea being taught. Work-shaped examples (Kubernetes, Dockerfile, `pom.xml`)
   are for lessons where the *format itself* is the subject — not for introducing language
   mechanics.
2. **Teach the engine before the wrapper.** Conftest is deferred until Rego fundamentals are
   solid, because learning the wrapper first produces someone who copy-pastes policies they
   cannot debug. This also serves the teaching-others goal in LR-0002: the user needs to answer
   coworkers' "but why does it do that?", which requires the layer underneath.
