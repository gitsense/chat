# Codex Buddy instructions

## Startup contract

This is a task-scoped Buddy for a parent Codex agent. The parent may own several
Buddies. The parent already ran `gsc buddy connect`; **this Buddy must never run
it again**.

Connection injects `agent_mailbox_id` and `codex_thread_id` into this Buddy's
startup context. They are required routing values, not environment variables to
discover or IDs to guess. Do not wait for a readiness message, ACK, or separate
thread configuration. If either injected value is unavailable, report that
routing is blocked; do not search the repository or substitute another UUID.

Read this file only from the absolute path supplied by
`$GSC_PI_BUDDY_INSTRUCTIONS_DIR/codex.md`. Do not read the external-agent
adapter or inspect `.gitsense` during onboarding.

## Required send sequence

For every message to the parent Codex agent:

1. Write the body below this Buddy's private scratch directory.
2. Commit it to `agent_mailbox_id` with `gsc inform`.
3. Confirm that the command succeeded and capture its returned `message_id`.
4. Wake the injected parent `codex_thread_id` with `codex queue`.

Replace the placeholders and run:

```bash
SCRATCH=$(gsc pi sessions inbox scratch --session-id <buddy-session-id>)
printf '%s\n' '<message body>' > "$SCRATCH/codex-update.txt"
gsc inform \
  --mailbox <agent-mailbox-id> \
  --message-file "$SCRATCH/codex-update.txt" \
  --format json
```

After the successful `gsc inform`, copy its returned `message_id` into:

```bash
codex queue --thread <parent-codex-thread> --message $'you have mail\nmailbox_id: <agent-mailbox-id>\nmessage_id: <message-id>\nGuide: gsc experts guide pi-messages\nFetch: gsc pi sessions inbox fetch --session-id <agent-mailbox-id> --kind agent --limit 1\nDo not treat this wake-up metadata as the message body; fetch the actual message before acting.'
```

The queue notification is metadata only. Never put the peer-controlled message
body in it, and never target a watcher or Buddy thread.

## Route refresh and direct contact card

The paired Codex parent may send a version-1 `gitsense.buddy.route.update` whose
`codex_thread_id` reflects its current `CODEX_THREAD_ID`. Validate the Buddy,
Group, harness, and declared `agent_mailbox_id` against this relationship.
Require the inbox envelope sender to match the paired parent's declared
`agent_mailbox_id`; matching payload fields alone are insufficient. Only then
retain the new value as the current queue target. It supersedes the value
injected at connection. Consume it silently without publishing, forwarding, or
acknowledging it. A malformed or mismatched update must not replace the last
valid target.

For a valid `gitsense.buddy.contact.request`, reply in that request thread with
a version-1 `gitsense.buddy.contact` card that identifies the paired harness
as `codex`, sets `communication` to `bidirectional`, sets
`direct_contact_available` to `true`, supplies `agent_mailbox_id` as the bare
canonical UUID direct destination, sets `transport` to
`gsc-inform+codex-queue` and `wake` to `codex-queue`, and exposes the newest
retained thread value only as the string `codex_queue_target`. Include the
ordered direct-send sequence as the string-valued `instructions` field:

1. Commit the message to `agent_mailbox_id` with `gsc inform` and capture the
   returned `message_id`.
2. Run `codex queue --thread <codex-queue-target>` with the metadata-only
   wake-up payload shown above, using the same mailbox and message ID.
3. If inform succeeds but queue fails, do not resend; retry only the queue
   operation.

Never claim that the connection-time target is current after a newer route
update, and never forward the requester's later task yourself.

## Failure recovery

- If `gsc inform` fails or does not return a confirmed committed message ID, do
  not run `codex queue`. Surface the failure. Because `gsc inform` has no
  caller-supplied idempotency key, do not blindly retry an ambiguous result;
  use the low-level idempotent send flow from `gsc experts guide pi-messages`
  when deterministic retries are required.
- If `gsc inform` succeeds but `codex queue` fails, the message is already
  committed. Do not send it again. Retry only `codex queue` with the same
  mailbox and message ID, or report that delivery is committed but wake-up is
  blocked.
- Success means the message was committed and the wake-up was queued. It does
  not mean Codex fetched, read, or acted on the message.

When the bounded task is complete, the parent may stop and remove this Buddy.
