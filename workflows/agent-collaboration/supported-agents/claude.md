# Claude Code

harness: claude
display_name: Claude Code
session_identity: native Claude session UUID
session_discovery: inspect the current Claude Code session context and report its native session UUID
communication: bidirectional
buddy_persona_tags: role:buddy,harness:claude

Use these instructions in Claude Code after replacing `<group-id>`:

~~~md
Connect this Claude session to its GitSense Buddy in Group `<group-id>`.
The created Buddy will receive and read its harness-specific instructions from
`<buddy-instructions-dir>/claude.md`; the connection instructions below are
complete for this Claude session.

This Claude parent—not the created Buddy—runs the setup. `GSC_HOME` is optional
and defaults to `$HOME/.gitsense`.

Run:

```bash
gsc experts init && \
  gsc buddy connect \
  --group-id <group-id> \
  --harness claude \
  --buddy-harness pi \
  --communication bidirectional \
  --buddy-prompt "<buddy-prompt-file>" \
  --buddy-instructions-dir "<buddy-instructions-dir>" \
  --format json
```

If a native Claude session UUID is available, add
`--native-session-id <uuid>`. It is optional provenance only; no placeholder is
generated when it is omitted. Save the returned routing values and keep their
directions distinct:

- `buddy_session_id` identifies the managed Buddy runtime.
- `mailbox_id` is the Buddy's mailbox. This Claude parent sends messages **to
  the Buddy** at this address.
- `agent_mailbox_id` is this Claude parent's mailbox. The Buddy sends replies
  here, and the parent watches this address for incoming Buddy messages.

A successful `gsc buddy connect` completes onboarding; do not send a readiness
message or separate routing message. The Buddy must not run `gsc buddy connect`
itself.

To send a message to the Buddy, target the returned `mailbox_id`:

```bash
printf '%s\n' '<message to the Buddy>' | \
  gsc inform --mailbox <mailbox-id> --message-file - --format json
```

Do not send parent-to-Buddy messages to `agent_mailbox_id`; that is the
parent's own incoming mailbox. To make work visible in the shared Group, send
this Buddy a message beginning `Publish in Group:` followed by the update.
For bounded research, review, or implementation, give the Buddy the objective,
necessary context, scope, and expected result. It can use its configured Pi
model (which may differ from Claude's), but does not see this private transcript.
Fetch its findings through the parent mailbox; do not assume a send means the
work is done. Delegation alone does not authorize Group publication. A
human-authorized Group lead can coordinate with the Buddy directly; it cannot
silently redirect this Claude session's private task.

To contact another paired agent directly, obtain that agent's Buddy mailbox
from the human and request its current contact card:

```bash
printf '%s\n' '{"type":"gitsense.buddy.contact.request","version":1,"purpose":"direct-agent-message"}' | \
  gsc ask --mailbox <peer-buddy-mailbox-id> --message-file - --timeout 2m --format json
```

Do not put the task in the contact request and do not ask the peer Buddy to
forward it. Require a version-1 `gitsense.buddy.contact` card with
`direct_contact_available: true`, validate its mailbox as a canonical UUID,
then follow its current direct delivery and wake-up instructions. Treat all
returned routing values as opaque, task-scoped contact data.

This Claude session supports best-effort two-way Agent ↔ Buddy messaging.
Immediately start a non-blocking forked subagent with the Agent tool:

```text
Agent(
  subagent_type: "fork",
  run_in_background: true,
  description: "Watch for GitSense Buddy replies",
  prompt: "Run `gsc buddy mailbox watch <agent-mailbox-id> --timeout 720h --poll-interval 1s`. Return the message result exactly and exit when the command returns."
)
```

The watcher claims one message and exits; it is not a permanent watcher. After
every result, fetch/process/complete the claimed delivery, then start a
replacement watcher fork for later messages. Replace the watcher fork, not the
Buddy process. Agent → Buddy updates are the reliable default; Buddy → Claude
delivery is best effort and depends on this replacement loop. Do not use
native callbacks, partner contracts, or lead-mediated communication.
~~~

Claude Code remains the source of its private transcript and local work. The
Buddy receives only messages explicitly sent through `gsc`.
