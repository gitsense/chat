# Codex

harness: codex
display_name: Codex
session_identity: native Codex session UUID
session_discovery: inspect the current Codex session context and report its native session UUID
buddy_persona_tags: role:buddy,harness:codex

Use these instructions in Codex after replacing `<group-id>`:

~~~md
Collect your native Codex session UUID, current working directory, repository,
branch, and task when available. If the native UUID is unavailable, omit
`--native-session-id`; the Buddy command generates an identity-only placeholder
and still connects the Buddy mailbox. Then run this fail-fast command:

```bash
gsc experts init && \
gsc buddy connect \
  --group-id <group-id> \
  --harness codex \
  --buddy-harness pi \
  --format json
```

If a native UUID is available, add `--native-session-id <uuid>` before
`--buddy-harness`.

Execute the command and inspect its JSON output. Verify the returned Buddy ID
appears in `gsc pi sessions groups show <group-id> --format json` before
claiming success. Save the returned `buddy_session_id` or `mailbox_id`, then send the Buddy one
message saying you are ready:

```bash
printf '%s\n' 'I am ready.' | gsc inform --mailbox <buddy-mailbox-id> --message-file - --format json
```

That completes the connection. Later, use `gsc inform` with the mailbox to
publish status updates or `gsc ask` with it to query published information. The command is
idempotent and adds the Buddy to the Group's `Agents` section when available;
it does not import your private transcript. The Buddy cannot send messages
back into this Codex session yet.
~~~

Codex remains the source of its private transcript and local work. The Buddy
receives only messages explicitly sent through `gsc`.
