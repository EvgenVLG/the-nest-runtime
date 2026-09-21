# Origin and evolution

The Nest did not start as an AI platform.

It started with a homelab: Linux, Docker and self-hosted services.

The progression was practical:

```text
homelab
 -> services / automation
 -> Home Assistant / IoT
 -> phone / Telegram / dashboards
 -> voice interaction
 -> need for deterministic identity, policy, execution and evidence
 -> The Nest
```

The important design change happened when voice/AI became capable of interpreting requests.

Interpretation was useful, but it was not safe to treat the model as the source of truth for:
- who the user is;
- what they may do;
- what resources exist;
- whether an action succeeded.

The Nest therefore became a separate authority layer.

## Engineering role

The human technical owner:
- identified the authority problem;
- separated assistant UX from environment truth;
- defined the deterministic request/outcome model;
- set fail-closed rules;
- designed verification around observed outcomes;
- controls integration, release and physical validation.

The implementation is AI-assisted, but the architectural and acceptance decisions remain human-owned.
