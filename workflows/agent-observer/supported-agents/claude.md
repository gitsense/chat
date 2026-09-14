# Claude Code

harness: claude
display_name: Claude Code
buddy_transport: claude-print-resume
create_command: gsc pi sessions buddy create --agent claude --native-session <native-session-uuid>
buddy_persona_tags: role:buddy,harness:claude

Use this prompt after replacing <lead-mailbox-id>:

~~~md
Run gsc experts init. Collect your native Claude session UUID, current working
directory, repository, branch, and task when available. Do not fail if this is
not a Git repository.

Use gsc ask --mailbox <lead-mailbox-id> to send this request:

GSC_BUDDY_REQUEST
version: 1
harness: claude
native_session_id: <native Claude session UUID>
cwd: <current working directory>
repository: <repository root or unavailable>
branch: <branch or unavailable>
task: <current task or unavailable>

Wait for GSC_BUDDY_READY. Save the returned Buddy and mailbox IDs. Then use
gsc inform to send the Buddy a concise introduction and any status I explicitly
ask you to publish. Treat the Buddy's returned mailbox as the only GitSense
identity for this connection.
~~~

The Claude transport is a restricted headless continuation. It does not wake or
update the live Claude TUI and must not modify repository files.
