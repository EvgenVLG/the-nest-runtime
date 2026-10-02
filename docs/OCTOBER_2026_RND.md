# October 2026 R&D snapshot

The public beta demonstrates a small synthetic authority path. Current private R&D applies the same model to a broader physical environment.

## Current invariant

```text
model interprets intent
deterministic system owns identity, policy, capability, execution, and evidence
```

A model can propose an action. It cannot grant itself identity, permissions, device state, or proof that an action succeeded.

## Current private work

The control plane is being exercised across multiple execution lanes:

- simple reads;
- direct actions;
- multi-step actions;
- scheduled actions;
- automation creation;
- capability-gap handling;
- proactive suggestions.

Those lanes share the same authority boundary instead of inventing separate permission logic.

Current design work also separates:

- trusted subject identity from conversational text;
- policy decisions from model suggestions;
- resource/capability state from presentation;
- requested action from execution evidence;
- successful dispatch from confirmed physical outcome.

## Failure behavior

Unknown or unavailable truth is preserved as uncertainty rather than converted into confident prose. That is especially important for physical systems: a network timeout cannot safely become "done."

## What this demonstrates

For systems integration / AI integration work, the useful signal is the contract discipline:

- deterministic authorization;
- typed outcomes;
- fail-closed identity/policy handling;
- HTTP + SQLite reference implementation;
- explicit evidence boundaries;
- public synthetic fixtures separated from private live state.

The private system evolves faster than this public reference, but new adapters are accepted only when they preserve the authority/evidence contract.
