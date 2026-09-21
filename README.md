# The Nest

**Deterministic authority and orchestration for a physical environment.**

The Nest knows what environment exists, who is acting, what they are allowed to do, which capability can satisfy a request and what evidence came back from execution.

A language model may interpret intent. It does not become the authority.

> **Interpretation is a proposal. Permission, execution and evidence belong to The Nest.**

The name is a subtle pop-culture nod. The implementation and branding are original and unaffiliated with any entertainment franchise.

## v0.1 candidate

This candidate uses synthetic users and simulated resources only.

```
HTTP request
 -> trusted fixture subject
 -> deterministic policy
 -> capability resolution
 -> simulated execution
 -> typed evidence/outcome
 -> SQLite persistence
```

Outcomes: `SUCCESS`, `DENIED`, `CLARIFICATION_REQUIRED`, `FAILED`, `UNCERTAIN`, `UNSUPPORTED`.

## Run

Requires Node.js 22+.

```sh
npm test
npm run demo
npm start
```

The server binds to `127.0.0.1` by default.

## Fixture policy

- `ADMIN` can use all fixture capabilities.
- `STANDARD_USER` can use fixture light control and reads.
- `RESTRICTED_USER` can read presence but cannot control lights.
- unknown actors fail closed.

The public demo contains no household identities, real devices, private topology or live Home Assistant writes.

## Relationship to Marinka

Marinka is portable assistant runtime. The Nest is environment authority.

> **Marinka asks. The Nest decides.**

The versioned assistant contract is in `contracts/nest-assistant-v1.json`.

## Status

Candidate, not yet a public release. Live authentication, real device writes, clean-room qualification and licensing remain separate gates.
