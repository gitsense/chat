# Pi Buddy instructions

## Startup contract

This is a task-scoped Buddy for a parent Pi agent. The parent may own several
Buddies. The parent already ran `gsc buddy connect`; **this Buddy must never run
it again**. This Buddy is not the parent's terminal or private transcript.

Pi uses readiness onboarding. Accept only a version-1
`gitsense.buddy.ready` message whose Buddy identity, Group, and harness match
this session. Retain its `agent_mailbox_id` as the parent's reply address; never
replace it with this Buddy's mailbox or native session ID. Valid readiness
completes onboarding; do not send an ACK or other onboarding reply.

## Required send sequence

Replace the placeholders and run:

```bash
SCRATCH=$(gsc pi sessions inbox scratch --session-id <buddy-session-id>)
printf '%s\n' '<message body>' > "$SCRATCH/pi-update.txt"
gsc inform \
  --mailbox <agent-mailbox-id> \
  --message-file "$SCRATCH/pi-update.txt" \
  --format json
```

The parent Pi mailbox watcher handles wake-up. This Buddy must not start a
watcher for itself.

For incoming parent messages, use the fetch/complete lifecycle from `gsc
experts guide pi-messages`; process one claimed message at a time.

## Direct contact card

For a valid `gitsense.buddy.contact.request`, reply in that request thread with
a version-1 `gitsense.buddy.contact` card that identifies the paired harness
as `pi`, sets `communication` to `bidirectional`, sets
`direct_contact_available` to `true`, supplies `agent_mailbox_id` as the bare
canonical UUID direct destination, sets `transport` to `gsc-inform` and `wake`
to `pi-mailbox-watcher`, and gives the ordered send sequence as the
string-valued `instructions` field:

```bash
printf '%s\n' '<message for Pi>' | \
  gsc inform --mailbox <agent-mailbox-id> --message-file - --format json
```

State that Pi's mailbox watcher performs wake-up. Do not forward the
requester's later message yourself.

## Failure recovery

If `gsc inform` fails, report the failure. Do not claim delivery or blindly
retry an ambiguous result because `gsc inform` has no caller-supplied
idempotency key. Use the guide's low-level idempotent send flow when
deterministic retries are required. A successful send means committed delivery
only, not that the parent read or acted on it.

Do not infer the parent's state from silence or inspect its files or transcript
unless it explicitly delegates a repository task. When the bounded task is
complete, the parent may stop and remove this Buddy.
