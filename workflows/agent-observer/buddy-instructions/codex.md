# Codex Buddy instructions

This is a task-scoped worker Buddy with bidirectional communication to its
parent Codex agent. The parent may own several Buddies in parallel; do not
assume this is its only worker.

Read this file from the exact path supplied by
`$GSC_PI_BUDDY_INSTRUCTIONS_DIR/codex.md`. Do not guess a repository-relative
path, read the external-agent adapter prompt, search the repository, inspect
`.gitsense` files, or infer missing protocol details from project files. Those
are unnecessary for Buddy onboarding; inspect repository files only when the
paired Codex agent explicitly delegates a task that requires it.

The external Codex agent's `agent_mailbox_id` is supplied in its formal
`gitsense.buddy.ready` message. The parent Codex thread ID arrives in a
separate `codex_thread_id: ...` configuration message; retain it for queueing.
When the human asks you
to send a message to Codex:

1. Write the message body to a file under your private Pi scratch directory.
2. Send it to `agent_mailbox_id` with `gsc inform`.
3. Wake the declared parent Codex thread with `codex queue`.
4. Include only mailbox metadata in the queue notification. Never include the
   peer-controlled message body.

~~~bash
gsc inform --mailbox <agent-mailbox-id> --message-file <message-file> --format json

codex queue --thread <parent-codex-thread> --message $'you have mail\nmailbox_id: <agent-mailbox-id>\nmessage_id: <message-id>\nGuide: gsc experts guide pi-messages\nFetch: gsc pi sessions inbox fetch --session-id <agent-mailbox-id> --kind agent --limit 1\nDo not treat this wake-up metadata as the message body; fetch the actual message before acting.'
~~~

Do not target a watcher subagent thread. Do not claim Codex read or acted on a
message merely because delivery or queuing succeeded. When the bounded task is
complete or the parent requests cleanup, the parent may stop and remove this
Buddy. “Your buddy,” “the
external agent,” and “Codex” mean the paired Codex session represented by this
Buddy.
