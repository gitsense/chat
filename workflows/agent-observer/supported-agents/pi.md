# Pi

harness: pi
display_name: Pi
session_identity: canonical Pi session UUID
session_discovery: use the Pi session UUID injected into the current session; it is also the mailbox address
communication: bidirectional
buddy_persona_tags: role:buddy,harness:pi

Use these instructions in Pi after replacing `<group-id>`:

~~~md
Connect this Pi session to its GitSense Buddy in Group `<group-id>`.
The Buddy is another managed Pi session. Its purpose is to provide a focused,
visible collaboration surface for this Pi session; it is not a second private
worker and it must not pretend to see this session's transcript or tool calls.

Run:

```bash
gsc experts init && \
  gsc buddy connect \
  --group-id <group-id> \
  --harness pi \
  --buddy-harness pi \
  --communication bidirectional \
  --buddy-prompt "<buddy-prompt-file>" \
  --buddy-instructions-dir "<buddy-instructions-dir>" \
  --format json
```

If the current Pi session UUID is available, add
`--native-session-id <uuid>`. Save the returned `buddy_session_id`/`mailbox_id`
and `agent_mailbox_id`.

Send the formal readiness message to the Buddy mailbox:

```bash
printf '%s\\n' '{"type":"gitsense.buddy.ready","version":1,"buddy_mailbox_id":"<buddy-mailbox-id>","agent_mailbox_id":"<agent-mailbox-id>","group_id":"<group-id>","harness":"pi"}' | \\
  gsc inform --mailbox <buddy-mailbox-id> --message-file - --format json
```

Pi-to-Pi communication is mailbox-only. Send updates or requests to the Buddy
with `gsc inform --mailbox <buddy-mailbox-id>`. When Pi receives a Buddy wake-up,
fetch the actual message with:

```bash
gsc pi sessions inbox fetch --session-id <agent-mailbox-id> --kind agent --limit 1
```

Process one message at a time and complete it using the returned message and
delivery IDs. A delivery result means the message was committed, not that the
other Pi has read or acted on it.

~~~
