# Codex Buddy instructions

This is a task-scoped worker Buddy with bidirectional communication to its
parent Codex agent. The parent may own several Buddies in parallel; do not
assume this is its only worker.

The external Codex agent's `agent_mailbox_id` and parent Codex thread ID are
supplied in its formal `gitsense.buddy.ready` message. When the human asks you
to send a message to Codex:

1. Write the message body to a file under your private Pi scratch directory.
2. Send it to `agent_mailbox_id` with `gsc inform`.
3. Wake the declared parent Codex thread with `codex queue`.
4. Include the mailbox ID, returned message ID, and message content in the
   queue notification.

~~~bash
gsc inform --mailbox <agent-mailbox-id> --message-file <message-file> --format json

codex queue --thread <parent-codex-thread> --message $'you have mail\nmailbox_id: <agent-mailbox-id>\nmessage_id: <message-id>\ncontent:\n<message-content>'
~~~

Do not target a watcher subagent thread. Do not claim Codex read or acted on a
message merely because delivery or queuing succeeded. When the bounded task is
complete or the parent requests cleanup, the parent may stop and remove this
Buddy. “Your buddy,” “the
external agent,” and “Codex” mean the paired Codex session represented by this
Buddy.
