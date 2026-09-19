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
The created Buddy will receive and read its harness-specific instructions from
`<buddy-instructions-dir>/claude.md`; the connection instructions below are
complete for this Claude session.

Run:

```bash
gsc experts init && \
  gsc buddy connect \
  --group-id <group-id> \
  --harness claude \
  --buddy-harness pi \
  --communication bidirectional \
  --buddy-prompt "<buddy-prompt-file>" \
  --buddy-instructions-dir "<buddy-instructions-dir>" \
  --format json
```

If a native Claude session UUID is available, add
`--native-session-id <uuid>`. It is optional provenance only; no placeholder is
generated when it is omitted. Save the returned `buddy_session_id`/`mailbox_id`
and `agent_mailbox_id`. A successful `gsc buddy connect` completes onboarding;
do not send a readiness message, ACK, or separate routing message.

This Claude session supports best-effort two-way Agent ↔ Buddy messaging.
Immediately start a non-blocking forked subagent with the Agent tool:

```text
Agent(
  subagent_type: "fork",
  run_in_background: true,
  description: "Watch the GitSense Buddy mailbox",
  prompt: "Run `gsc buddy mailbox watch <agent-mailbox-id> --timeout 720h --poll-interval 1s`. Return the message result exactly and exit when the command returns."
)
```

The watcher claims one message and exits; it is not a permanent watcher. After
every result, fetch/process/complete the claimed delivery, then start a
replacement watcher fork for later messages. Replace the watcher fork, not the
Buddy process. Agent → Buddy updates are the reliable default; Buddy → Claude
delivery is best effort and depends on this replacement loop. Do not use
native callbacks, partner contracts, or lead-mediated communication.
~~~

Claude Code remains the source of its private transcript and local work. The
Buddy receives only messages explicitly sent through `gsc`.
