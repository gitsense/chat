# OpenCode

harness: opencode
display_name: OpenCode
session_identity: native OpenCode session ID
session_discovery: `opencode session list --format json`
buddy_persona_tags: role:buddy,harness:opencode

Limitation: the current `gsc buddy connect` implementation supports only
Codex and Claude native transports. Do not offer this adapter until an
OpenCode transport is implemented and passes the live capability check.

If OpenCode support is added, use these instructions after replacing
`<group-id>`:

~~~md
Use `opencode session list --format json` to identify your current native
OpenCode session. Collect your current working directory, repository, branch,
and task when available. Then run this fail-fast command:

```bash
gsc experts init && \
gsc buddy connect \
  --group-id <group-id> \
  --harness opencode \
  --native-session-id <native OpenCode session ID> \
  --buddy-harness pi \
  --format json
```

Save the returned `buddy_session_id` or `mailbox_id`. Use `gsc inform` with that
mailbox to publish concise status updates, and `gsc ask` with it to ask what
published information is available from other connected agents. The command is
idempotent and adds the Buddy to the Group's `Agents` section when available;
it does not import your private transcript. The Buddy cannot send messages
back into this OpenCode session yet.
~~~

OpenCode remains the source of its private transcript and local work. The Buddy
receives only messages explicitly sent through `gsc`.
