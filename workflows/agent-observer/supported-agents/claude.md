# Claude Code

harness: claude
display_name: Claude Code
session_identity: native Claude session UUID
session_discovery: inspect the current Claude Code session context and report its native session UUID
communication: bidirectional
buddy_persona_tags: role:buddy,harness:claude

Use these instructions in Claude Code after replacing `<group-id>`:

~~~md
Connect this Claude session to its GitSense Buddy in Group `<group-id>`.
Use the Buddy instructions in `<buddy-instructions-dir>/claude.md`.

Run:

```bash
gsc experts init && \
  gsc buddy connect \
  --group-id <group-id> \
  --harness claude \
  --buddy-harness pi \
  --communication bidirectional \
  --buddy-instructions-dir "<buddy-instructions-dir>" \
  --format json
```

If a native Claude session UUID is available, add
`--native-session-id <uuid>`. It is optional provenance only; no placeholder is
generated when it is omitted. Save the returned `buddy_session_id`/`mailbox_id`
and `agent_mailbox_id`.

Send the formal readiness message to the Buddy mailbox:

```bash
printf '%s\n' '{"type":"gitsense.buddy.ready","version":1,"buddy_mailbox_id":"<buddy-mailbox-id>","agent_mailbox_id":"<agent-mailbox-id>","group_id":"<group-id>","harness":"claude"}' | \
  gsc inform --mailbox <buddy-mailbox-id> --message-file - --format json
```

This Claude session supports two-way Agent ↔ Buddy messaging. Start a
non-blocking forked subagent with the Agent tool:

```text
Agent(
  subagent_type: "fork",
  run_in_background: true,
  description: "Watch the GitSense Buddy mailbox",
  prompt: "Run `gsc buddy mailbox watch <agent-mailbox-id> --timeout 30s --poll-interval 1s`. Return the message result exactly. Exit when the command returns."
)
```

The fork wakes this Claude session when a Buddy message arrives. Use
`gsc inform --mailbox <buddy-mailbox-id>` for future updates. Do not use native
callbacks, partner contracts, or lead-mediated communication.
~~~

Claude Code remains the source of its private transcript and local work. The
Buddy receives only messages explicitly sent through `gsc`.
