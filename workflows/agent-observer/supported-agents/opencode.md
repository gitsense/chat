# OpenCode

harness: opencode
display_name: OpenCode
session_identity: native OpenCode session ID
session_discovery: opencode session list --format json
buddy_persona_tags: role:buddy,harness:opencode

Use this prompt after replacing <lead-mailbox-id>:

~~~md
Run gsc experts init. Use `opencode session list --format json` to identify
your current native OpenCode session. Collect your current working directory,
repository, branch, and task when available. Do not fail if this is not a Git
repository.

Use gsc ask --mailbox <lead-mailbox-id> to send this request:

GSC_BUDDY_REQUEST
version: 1
harness: opencode
native_session_id: <native OpenCode session ID>
cwd: <current working directory>
repository: <repository root or unavailable>
branch: <branch or unavailable>
task: <current task or unavailable>

Wait for GSC_BUDDY_READY. Save the returned Buddy Pi session UUID. Use
`gsc inform <buddy-pi-session-uuid>` to publish a concise introduction or any
status I explicitly ask you to share. Use `gsc ask --mailbox
<buddy-pi-session-uuid>` when you need to ask the Buddy what another connected
agent has published. The Buddy cannot send messages back into this OpenCode
session yet.
~~~

OpenCode remains the source of its private transcript and local work. The Buddy
receives only the messages explicitly sent through `gsc`.
