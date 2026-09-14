# Claude Code

harness: claude
display_name: Claude Code
session_identity: native Claude session UUID
session_discovery: inspect the current Claude Code session context and report its native session UUID
buddy_persona_tags: role:buddy,harness:claude

Use these instructions in Claude Code after replacing `<group-id>`:

~~~md
Run:

```bash
gsc experts init && \
gsc buddy connect \
  --group-id <group-id> \
  --harness claude \
  --buddy-harness pi \
  --format json
```

If a native Claude session UUID is available, add
`--native-session-id <uuid>`. It is optional provenance only; no placeholder is
generated when it is omitted. The command returns immediately by default with
the Buddy `buddy_session_id`/`mailbox_id` and usually `status: "starting"`.

Send the formal one-way readiness message to the returned mailbox:

```bash
printf '%s\n' '{"type":"gitsense.buddy.ready","version":1,"buddy_mailbox_id":"<mailbox_id>","group_id":"<group-id>","harness":"claude"}' | \
  gsc inform --mailbox <mailbox_id> --message-file - --format json
```

Include `native_session_id` in the JSON when available. This visible message is
the sole handshake. Use `gsc inform` with the mailbox for future updates. Do
not use `gsc ask`, native callbacks, partner contracts, or lead-mediated
communication. The Buddy does not send messages back into this Claude Code
session.
~~~

Claude Code remains the source of its private transcript and local work. The
Buddy receives only messages explicitly sent through `gsc`.
