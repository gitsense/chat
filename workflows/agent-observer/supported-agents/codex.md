# Codex

harness: codex
display_name: Codex
session_identity: native Codex session UUID
session_discovery: inspect the current Codex session context and report its native session UUID
buddy_persona_tags: role:buddy,harness:codex

Use these instructions in Codex after replacing `<group-id>`:

~~~md
Run:

```bash
gsc experts init && \
gsc buddy connect \
  --group-id <group-id> \
  --harness codex \
  --buddy-harness pi \
  --format json
```

If a native Codex session UUID is available, add
`--native-session-id <uuid>`. It is optional provenance only; no placeholder is
generated when it is omitted. The command returns immediately by default with
the Buddy `buddy_session_id`/`mailbox_id` and usually `status: "starting"`.

Send the formal one-way readiness message to the returned mailbox:

```bash
printf '%s\n' '{"type":"gitsense.buddy.ready","version":1,"buddy_mailbox_id":"<mailbox_id>","agent_mailbox_id":"<agent_mailbox_id>","group_id":"<group-id>","harness":"codex"}' | \
  gsc inform --mailbox <mailbox_id> --message-file - --format json
```

Replace `<agent_mailbox_id>` with the value returned by `gsc buddy connect`.
Include `native_session_id` in the JSON when available. This visible message is
the sole handshake. Use `gsc inform` with the Buddy mailbox for future updates.
The Buddy can send messages to the agent mailbox; in the next iteration, run
`gsc buddy inbox watch --mailbox <agent_mailbox_id>` to receive them. Do not
use native callbacks, partner contracts, or lead-mediated communication.
~~~

Codex remains the source of its private transcript and local work. The Buddy
receives only messages explicitly sent through `gsc`.
