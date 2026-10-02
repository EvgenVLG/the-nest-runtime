# The Nest

**Deterministic authority and orchestration for a physical environment.**

**Public beta: v0.1**

The Nest is a working reference implementation of the environment-authority layer behind a larger private physical-AI system.

A language model may interpret intent. It does not become the authority.

> **Interpretation is a proposal. Permission, execution and evidence belong to The Nest.**

The Nest owns the parts that must stay deterministic and inspectable:

- trusted execution context;
- identity and policy;
- capabilities and resources;
- state;
- bounded execution;
- typed outcomes and evidence;
- persistence.

## Why this exists

The project evolved from a practical problem.

A homelab became home automation. Home automation needed better control surfaces. Voice made the interaction natural, but it exposed a trust problem: a probabilistic assistant should not be allowed to invent identity, permissions, physical state or proof that an action happened.

That led to a hard boundary:

```text
assistant / model interpretation
          |
          v
        The Nest
 identity -> policy -> capability -> execution -> evidence
          |
          v
      environment
```

The assistant can ask. The Nest decides.

## What the public beta demonstrates

The v0.1 path is intentionally synthetic and reproducible:

```text
HTTP request
 -> trusted fixture subject
 -> deterministic policy
 -> capability resolution
 -> simulated execution
 -> typed evidence / outcome
 -> SQLite persistence
```

Supported outcome classes include:

- `SUCCESS`
- `DENIED`
- `CLARIFICATION_REQUIRED`
- `FAILED`
- `UNCERTAIN`
- `UNSUPPORTED`

Run it with Node.js 22+:

```sh
npm test
npm run demo
npm start
```

The server binds to `127.0.0.1` by default.

## What this architecture achieved

The private system and this public reference share the same design intent:

- probabilistic interpretation cannot grant itself permission;
- unknown identity fails closed;
- unavailable observation is represented as `UNCERTAIN`, not optimistic prose;
- execution results are returned as typed evidence/outcomes;
- assistant UX remains portable because environment authority is separate;
- the same contract can be exercised by text, voice or future device endpoints.

The public beta uses synthetic identities and resources so the trust model can be inspected without exposing household topology or credentials.

## Human technical ownership

The architecture was human-defined.

The human owner is responsible for:

- deciding the trust boundary between interpretation and authority;
- defining identity/policy/capability semantics;
- deciding what evidence is sufficient for each action;
- integrating and validating new capability adapters;
- rejecting model-generated shortcuts that violate the authority boundary;
- deciding when fixture evidence is insufficient and live/physical verification is required.

AI-assisted implementation is used as engineering labor, not as a substitute for ownership or acceptance.

## R&D direction

Ongoing private R&D explores:

- Home Assistant and device integration;
- presence and identity signals;
- network/media/environment capabilities;
- voice and mobile endpoints;
- physical sensors and cameras;
- policy and evidence models;
- safe automation creation;
- deployment and observability.

New integrations are added only when they preserve the core authority model.

## Relationship to Marinka

[Marinka](https://github.com/EvgenVLG/marinka-assistant) is the portable assistant runtime.

> **Marinka asks. The Nest decides.**

The shared versioned contract is in `contracts/nest-assistant-v1.json`.

## October 2026 update

Current private R&D is exercising the same authority/evidence model across direct actions, multi-step work, scheduled actions, automation creation, capability gaps, and proactive suggestions.

See the [October 2026 R&D snapshot](docs/OCTOBER_2026_RND.md) for the current integration boundary and what this project demonstrates for systems/AI integration roles.

## Status

This repository is a **working public beta v0.1 reference implementation**.

It is intentionally smaller than the private system and contains no real household identities, device bindings, private topology, credentials or raw telemetry.

## Related project

[Production Zoo](https://github.com/EvgenVLG/production-zoo) documents the controlled AI-engineering workflow used to build and verify systems like The Nest, including case studies on wrong-property testing and evidence-driven validation.
