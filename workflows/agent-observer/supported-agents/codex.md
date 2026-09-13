# Codex

harness: codex
display_name: Codex
buddy_transport: codex-queue
create_command: gsc pi sessions buddy create --agent codex --native-session <native-session-uuid>

Use this prompt after replacing <lead-mailbox-id>:

~~~md
Run gsc experts init. Collect your native Codex session UUID, current working
directory, repository, branch, and task when available. Do not fail if this is
not a Git repository.

Use gsc ask --mailbox <lead-mailbox-id> to send this request:

GSC_BUDDY_REQUEST
version: 1
harness: codex
native_session_id: <native Codex session UUID>
cwd: <current working directory>
repository: <repository root or unavailable>
branch: <branch or unavailable>
task: <current task or unavailable>

Wait for GSC_BUDDY_READY. Save the returned Buddy and mailbox IDs. Then use
gsc inform to send the Buddy a concise introduction and any status I explicitly
ask you to publish. Treat the Buddy's returned mailbox as the only GitSense
identity for this connection.
~~~

Codex Buddy messages can be delivered through the codex-queue transport. Delivery
does not prove that Codex read or completed the request.

