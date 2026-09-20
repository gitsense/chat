# Claude Buddy instructions

## Startup contract

This is a task-scoped Buddy for a parent Claude agent. The parent may own
several Buddies. The parent already ran `gsc buddy connect`; **this Buddy must
never run it again**.

Connection injects `agent_mailbox_id` into this Buddy's startup context. It is
required routing metadata, not an environment variable to discover or an ID to
guess. Do not wait for or send a readiness or separate routing message. If the
value is unavailable, report that routing is blocked rather than searching the
repository or substituting another UUID.

## Required send sequence

Replace the placeholders and run:

```bash
SCRATCH=$(gsc pi sessions inbox scratch --session-id <buddy-session-id>)
printf '%s\n' '<message body>' > "$SCRATCH/claude-update.txt"
gsc inform \
  --mailbox <agent-mailbox-id> \
  --message-file "$SCRATCH/claude-update.txt" \
  --format json
```

Claude receives messages through the one-shot watcher started by the parent:

```bash
gsc buddy mailbox watch <agent-mailbox-id> --timeout 720h --poll-interval 1s
```

The parent, not this Buddy, owns and replaces that watcher after each claimed
message. Never start or replace it yourself.

## Failure recovery

If `gsc inform` fails, report the failure. Do not claim delivery, and do not
blindly retry an ambiguous result because `gsc inform` has no caller-supplied
idempotency key. Use the idempotent low-level flow described by `gsc experts
guide pi-messages` when deterministic retries are required. A successful send
means committed delivery only; it does not prove that Claude's watcher claimed
the message or that Claude read or acted on it.

Do not use native callbacks or partner transports. When the bounded task is
complete, the parent may stop and remove this Buddy.
