# Codex

harness: codex
display_name: Codex
session_identity: native Codex session UUID
session_discovery: inspect the current Codex session context and report its native session UUID
buddy_persona_tags: role:buddy,harness:codex

Use these instructions in Codex after replacing `<group-id>`:

~~~md
Run `gsc experts init`. Collect your native Codex session UUID, current working
directory, repository, branch, and task when available. Then run:

```bash
gsc buddy connect \
  --group-id <group-id> \
  --harness codex \
  --native-session-id <native Codex session UUID> \
  --buddy-harness pi \
  --format json
```

Save the returned `buddy_session_id` or `mailbox_id`. Use `gsc inform` with that
mailbox to publish concise status updates, and `gsc ask` with it to ask what
published information is available from other connected agents. The command is
idempotent and adds the Buddy to the Group's `Agents` section when available;
it does not import your private transcript. The Buddy cannot send messages
back into this Codex session yet.
~~~

Codex remains the source of its private transcript and local work. The Buddy
receives only messages explicitly sent through `gsc`.
