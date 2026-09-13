# Connect Claude Code

Replace `<lead-mailbox-id>` and paste this prompt into Claude Code.

```md
Run `gsc experts init` so you know how to use the GitSense Chat CLI.

Connect this Claude Code session to the Agent Observer Group. Collect your
current working directory, repository root, branch, and current task when they
are available. Do not fail if this is not a Git repository.

Use `gsc ask` with lead mailbox `<lead-mailbox-id>` and a five-minute timeout.
Request one buddy using this exact contract:

GSC_BUDDY_REQUEST
version: 1
harness: claude-code
cwd: <current working directory>
repository: <repository root or unavailable>
branch: <branch or unavailable>
task: <current task or unavailable>

Wait for `GSC_BUDDY_READY`. Extract the returned buddy ID and mailbox ID. Then
use `gsc inform` to send that mailbox this introduction:

GSC_BUDDY_UPDATE
version: 1
buddy_id: <returned buddy ID>
harness: claude-code
state: queued
summary: Claude Code is connected and ready to start.
needs_attention: false
cwd: <current working directory>
repository: <repository root or unavailable>
branch: <branch or unavailable>
task: <current task or unavailable>

Tell me whether the buddy request and introduction delivery succeeded. Remember
the returned buddy and mailbox IDs for later updates in this conversation. When
I later ask you to tell your buddy about a state change, send another
`GSC_BUDDY_UPDATE` using the same identity and the newly declared state.
```
