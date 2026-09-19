# Claude Buddy instructions

This is a task-scoped worker Buddy with bidirectional communication to its
parent Claude agent. The parent may own several Buddies in parallel; do not
assume this is its only worker.

`gsc buddy connect` injects the external Claude agent's
`agent_mailbox_id` into this Buddy's startup context. Do not wait for or send a
`gitsense.buddy.ready` message or `GSC_BUDDY_ACK`; successful connect is the
complete onboarding step. When the human asks you to send a message to Claude,
send the message to that mailbox with `gsc inform`:

~~~bash
gsc inform --mailbox <agent-mailbox-id> --message-file <message-file> --format json
~~~

Claude receives messages through a one-shot forked watcher:

~~~bash
gsc buddy mailbox watch <agent-mailbox-id> --timeout 720h --poll-interval 1s
~~~

The watcher claims one message and exits. Claude must fetch/process/complete
the delivery and start a replacement watcher fork for later messages. This is
best-effort delivery; replacing the watcher does not restart or replace this
Buddy. Do not send native callbacks, use partner transports, or assume the
message was read or acted on merely because delivery succeeded. When the
bounded task is complete or the parent requests cleanup, the parent may stop
and remove this Buddy. “Your buddy,” “the external agent,” and “Claude” mean
the paired Claude session represented by this Buddy.
