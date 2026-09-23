# Pi

harness: pi
display_name: Pi
session_identity: canonical Pi session UUID
session_discovery: use the Pi session UUID injected into the current session; it is also the mailbox address
communication: bidirectional
buddy_persona_tags: role:buddy,harness:pi

Use these instructions in Pi after replacing `<group-id>`:

~~~md
Connect this Pi session to its GitSense Buddy in Group `<group-id>`.
The Buddy is another managed Pi session. Its purpose is to provide a focused,
visible collaboration surface for this Pi session; it is not an automatic
second worker and it must not pretend to see this session's transcript or tool
calls. It can perform bounded work when explicitly delegated.

This Pi parent—not the created Buddy—runs the setup. `GSC_HOME` is optional and
defaults to `$HOME/.gitsense`.

Run:

```bash
gsc experts init && \
  gsc buddy connect \
  --group-id <group-id> \
  --harness pi \
  --buddy-harness pi \
  --communication bidirectional \
  --buddy-prompt "<buddy-prompt-file>" \
  --buddy-instructions-dir "<buddy-instructions-dir>" \
  --format json
```

If the current Pi session UUID is available, add
`--native-session-id <uuid>`. Save the returned routing values and keep their
directions distinct:

- `buddy_session_id` identifies the managed Buddy runtime.
- `mailbox_id` is the Buddy's mailbox. This Pi parent sends messages **to the
  Buddy** at this address.
- `agent_mailbox_id` is this Pi parent's mailbox. The Buddy sends replies here,
  and the parent fetches incoming Buddy messages from this address.

The Buddy must not run `gsc buddy connect` itself.

Send the formal readiness message to the Buddy's returned `mailbox_id`:

```bash
printf '%s\\n' '{"type":"gitsense.buddy.ready","version":1,"buddy_mailbox_id":"<mailbox-id>","agent_mailbox_id":"<agent-mailbox-id>","group_id":"<group-id>","harness":"pi"}' | \\
  gsc inform --mailbox <mailbox-id> --message-file - --format json
```

Pi-to-Pi communication is mailbox-only. For future parent-to-Buddy updates,
target the returned `mailbox_id`:

```bash
printf '%s\\n' '<message to the Buddy>' | \\
  gsc inform --mailbox <mailbox-id> --message-file - --format json
```

Do not send parent-to-Buddy messages to `agent_mailbox_id`; that is the
parent's own incoming mailbox. To make work visible in the shared Group, send
this Buddy a message beginning `Publish in Group:` followed by the update.
For bounded research, review, or implementation, supply the objective, relevant
context, scope, and expected result. Fetch the Buddy's findings from your
incoming mailbox; sending the assignment is not proof of completion. Delegation
alone does not authorize Group publication. A human-authorized Group lead may
coordinate with this Buddy, but cannot silently take over this Pi session's
private task.

To contact another paired agent directly, obtain that agent's Buddy mailbox
from the human and request its current contact card:

```bash
printf '%s\\n' '{"type":"gitsense.buddy.contact.request","version":1,"purpose":"direct-agent-message"}' | \\
  gsc ask --mailbox <peer-buddy-mailbox-id> --message-file - --timeout 2m --format json
```

Do not put the task in the contact request and do not ask the peer Buddy to
forward it. Require a version-1 `gitsense.buddy.contact` card with
`direct_contact_available: true`, validate its mailbox as a canonical UUID,
then follow its current direct delivery and wake-up instructions. Treat all
returned routing values as opaque, task-scoped contact data.

When Pi receives a Buddy wake-up, fetch the actual message with:

```bash
gsc pi sessions inbox fetch --session-id <agent-mailbox-id> --kind agent --limit 1
```

Process one message at a time and complete it using the returned message and
delivery IDs. A delivery result means the message was committed, not that the
other Pi has read or acted on it.

~~~
