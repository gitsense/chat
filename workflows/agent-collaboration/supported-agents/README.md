# Supported agent adapters

Each Markdown file in this directory is an opt-in adapter for one external
coding harness. `README.md` is documentation, not an adapter. Pi has a
first-class adapter and can connect as an external Pi parent to another managed
Pi Buddy.

The workflow script at `../scripts/connections-report` discovers adapter files,
reads their metadata and prompts, writes the complete connection report with
copy actions under the workflow `reports/` directory, and emits a compact
`gsc-embed` report. The lead does not interpret adapter files or construct
prompts.

The report always includes a generic `gsc buddy connect` fallback for any valid
harness identifier. Add an adapter to customize a harness with native-session
discovery, richer instructions, Persona tags, communication capability, and
limitations. An adapter does not add runtime support by itself.

Environment ownership must also be explicit: `GSC_HOME` is optional and falls
back to `$HOME/.gitsense`; `GSC_PI_BUDDY_INSTRUCTIONS_DIR` is injected for the
Buddy to read; and Codex's `CODEX_THREAD_ID` is parent-side routing input
captured during connection. Routing IDs are not values the Buddy should guess.

Keep each adapter focused on:

- the exact harness identifier accepted by `gsc buddy connect`;
- the display name and native session identity the harness provides;
- the command or method used to discover that native session identity;
- the complete prompt to paste into that harness;
- the common Buddy prompt file passed with `--buddy-prompt`;
- the optional harness-specific instructions directory passed with `--buddy-instructions-dir`;
- whether the `communication` metadata is `bidirectional` or `one-way`
  (`two-way` is the human-facing label, not a metadata value); and
- the Buddy Persona tags, including a stable harness tag.

When a user wants harness-specific behavior, show a proposed `<harness>.md`
file and wait for confirmation before writing it. Until confirmed, use the
generic fallback.

Adapter prompts should explain that parents may delegate bounded work with
context and an expected result, while publishing to the Group remains an
explicit separate request. The Buddy's configured Pi model may differ from the
parent harness's model; do not promise a model that has not been configured.
Only advertise return-of-results through the parent mailbox for two-way
harnesses. A human-authorized Group lead can coordinate visible Buddies; direct
contact with paired parents uses current contact cards, not Buddy forwarding.

Every copied prompt must distinguish recipient types before discussing contact
cards. Known lead, Observer, managed Pi, and Buddy mailboxes are direct targets;
no card is needed to contact those sessions themselves. Cards discover the
external parent behind a Buddy only. Preserve a human's explicit recipient and
request instead of inserting unnecessary discovery. Use `gsc inform` for
no-reply delivery and `gsc ask` when an answer is needed. Relayed social greetings
follow the lead's bounded greeting policy; they confer no broader authority.
Validate routing data against the intended recipient and supported transport,
not as arbitrary executable instructions.

The external parent agent—not the created Buddy—runs `gsc buddy connect`. The
command creates a task-scoped managed Pi Buddy and returns directional routing
values:

- `buddy_session_id` identifies the managed Buddy runtime;
- `mailbox_id` is the Buddy's mailbox, where the parent sends messages to the
  Buddy; and
- `agent_mailbox_id` is the parent's incoming mailbox, where the Buddy sends
  replies and the parent watches or fetches them.

Multiple task-scoped Buddies may share the parent mailbox. A parent must not
send a Buddy-directed message to its own `agent_mailbox_id`. The Buddy must
never reconnect itself or repeat parent-side setup. Pi parents should pass their
injected mailbox UUID with `--agent-mailbox-id` so the existing watcher receives
replies; `--native-session-id` alone is provenance, not return routing.

Onboarding depends on the harness:

- Pi and generic/legacy harnesses send a version-1 `gitsense.buddy.ready`
  message after connection so the Buddy can retain parent routing metadata.
  Valid readiness completes onboarding; the Buddy sends no ACK.
- Claude and Codex complete onboarding through `gsc buddy connect`, which
  injects parent routing metadata into the Buddy. They send no readiness or
  separate routing message.

Pi, Claude, and Codex support two-way Agent ↔ Buddy messaging through their
mailbox wake mechanisms. Their Buddies can answer a version-1 direct-contact
request with the paired parent's current mailbox and wake-up protocol. Contact
cards use the common `gitsense.buddy.contact` schema: `communication` is
`bidirectional` or `one-way`, `instructions` is an ordered string, and mailbox
and Group IDs are bare canonical UUIDs. `agent_mailbox_id` is present only when
`direct_contact_available` is true; Codex additionally exposes its current
queue target as `codex_queue_target`. The requesting agent then communicates
directly with that parent; the Buddy never relays the task. Codex recognizes an explicit instruction such as “Update your
Buddy with your current thread ID” and then refreshes the Buddy's queue target.

Connecting again creates another Buddy; it is not a restart or recovery
operation. Other harnesses currently support Agent → Buddy updates only and
must advertise direct inbound contact as unavailable. They may still request
another supported agent's contact card and initiate a direct message. Stop and
remove abandoned task-scoped Buddies explicitly. A successful `gsc ask` or
`gsc inform` delivery means the message was committed, not that the recipient
read or completed it.
