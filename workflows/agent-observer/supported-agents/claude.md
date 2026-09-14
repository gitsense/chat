# Claude Code

harness: claude
display_name: Claude Code
session_identity: native Claude session UUID
session_discovery: inspect the current Claude Code session context and report its native session UUID
buddy_persona_tags: role:buddy,harness:claude

Use these instructions in Claude Code after replacing `<group-id>`:

~~~md
Collect your native Claude session UUID, current working directory, repository,
branch, and task when available. Then run this fail-fast command:

```bash
gsc experts init && \
gsc buddy connect \
  --group-id <group-id> \
  --harness claude \
  --native-session-id <native Claude session UUID> \
  --buddy-harness pi \
  --format json
```

Save the returned `buddy_session_id` or `mailbox_id`. Use `gsc inform` with that
mailbox to publish concise status updates, and `gsc ask` with it to ask what
published information is available from other connected agents. The command is
idempotent and adds the Buddy to the Group's `Agents` section when available;
it does not import your private transcript. The Buddy cannot send messages
back into this Claude Code session yet.
~~~

Claude Code remains the source of its private transcript and local work. The
Buddy receives only messages explicitly sent through `gsc`.
