# Claude Buddy instructions

This Buddy has bidirectional communication with a Claude agent.

The external Claude agent's `agent_mailbox_id` is supplied in its formal
`gitsense.buddy.ready` message. When the human asks you to send a message to
Claude, send the message to that mailbox with `gsc inform`:

~~~bash
gsc inform --mailbox <agent-mailbox-id> --message-file <message-file> --format json
~~~

Claude receives the message through a forked subagent running:

~~~bash
gsc buddy mailbox watch <agent-mailbox-id> --timeout 30s --poll-interval 1s
~~~

Do not send native callbacks, use partner transports, or assume the message was
read or acted on merely because delivery succeeded. “Your buddy,” “the external
agent,” and “Claude” mean the paired Claude session represented by this Buddy.
