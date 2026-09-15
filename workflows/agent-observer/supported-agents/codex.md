# Codex

harness: codex
display_name: Codex
session_identity: native Codex session UUID
session_discovery: inspect the current Codex session context and report its native session UUID
communication: two-way
buddy_persona_tags: role:buddy,harness:codex

Use these instructions in Codex after replacing `<group-id>`:

~~~md
Connect this Codex session to its GitSense Buddy in Group `<group-id>`.

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
generated when it is omitted. Save the returned `buddy_session_id`/`mailbox_id`
and `agent_mailbox_id`. Also identify the parent Codex thread that should be
woken by `codex queue`.

Send the formal readiness message to the Buddy mailbox:

```bash
printf '%s\n' '{"type":"gitsense.buddy.ready","version":1,"buddy_mailbox_id":"<buddy-mailbox-id>","agent_mailbox_id":"<agent-mailbox-id>","group_id":"<group-id>","harness":"codex","codex_thread_id":"<parent-codex-thread>"}' | \
  gsc inform --mailbox <buddy-mailbox-id> --message-file - --format json
```

This Codex session supports two-way Agent ↔ Buddy messaging. Do not create a
watcher subagent. When the Buddy sends a message, it sends the message to
`agent_mailbox_id` with `gsc inform`, then wakes the parent thread with:

```bash
codex queue --thread <parent-codex-thread> --message $'you have mail\nmailbox_id: <agent-mailbox-id>\nmessage_id: <message-id>\ncontent:\n<message-content>'
```

When the parent is woken, fetch the message from the agent mailbox, process it,
and complete it using the returned `delivery_id`. Use
`gsc inform --mailbox <buddy-mailbox-id>` for future updates. Do not use native
callbacks, partner contracts, or lead-mediated communication.
~~~

Codex remains the source of its private transcript and local work. The Buddy
receives only messages explicitly sent through `gsc`.
