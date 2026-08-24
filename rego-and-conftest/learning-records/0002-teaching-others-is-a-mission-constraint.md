# Teaching coworkers is a first-class goal, not a side effect

The user will be the person who introduces Rego and conftest to their team, and said so before any
technical requirement. This reframes what "understanding" means here: a recipe that works is
insufficient if it cannot survive being repeated by someone else and defended under questioning.

**Implications**: every lesson should (a) prefer explanations that are portable to a whiteboard
over ones that depend on having the docs open, and (b) explicitly flag the points where a
newcomer's intuition breaks — those are the questions the user will be asked. Lesson 1 established
this pattern with the "flag this one for your coworkers" callout on undefined-vs-false, and with
the decision-versus-enforcement framing meant to be repeated verbatim to a team. A future
session on rollout strategy (how to introduce policy gates without the team resenting them) is
in scope for the mission even though it is not a Rego topic; `RESOURCES.md` records it as a gap.
