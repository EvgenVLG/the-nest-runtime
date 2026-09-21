# The Nest architecture

The Nest is an environment authority, not an assistant.

```text
Untrusted interpretation / request
          |
Trusted execution context
          |
Identity + policy
          |
Capability resolution
          |
Bounded domain execution
          |
Typed evidence + outcome
          |
Persistent state
```

## Core rule

A probabilistic model may propose meaning. It cannot grant itself permission or declare a physical effect successful.

## Verification model

The verification level follows the claim.

A policy unit test can prove policy logic. It cannot prove a real device changed state.

A simulated capability can prove result handling. It cannot prove the physical environment.

For a real action, acceptance may require observed device state, transport evidence, sensor feedback or another domain-specific observation.

This follows the same outcome-driven verification principle documented in [Production Zoo](https://github.com/EvgenVLG/production-zoo): verify the property the task actually claims.

## Human ownership

The human owner defines:
- trust boundaries;
- identity and policy semantics;
- capability contracts;
- evidence requirements;
- integration/release decisions;
- the point at which fixture evidence must be escalated to live or physical verification.

## Public beta boundary

The public v0.1 implementation contains synthetic identities/resources and simulated actuators only. It is a sanitized working reference implementation of the architecture, not a mirror of the private home environment.
