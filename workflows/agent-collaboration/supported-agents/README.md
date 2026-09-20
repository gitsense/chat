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
- whether communication is `two-way` or `one-way`; and
- the Buddy Persona tags, including a stable harness tag.

When a user wants harness-specific behavior, show a proposed `<harness>.md`
file and wait for confirmation before writing it. Until confirmed, use the
generic fallback.

The external parent agent—not the created Buddy—runs `gsc buddy connect`. The
command creates a task-scoped managed Pi Buddy and returns its Buddy mailbox
plus an optional parent `agent_mailbox_id`. Multiple task-scoped Buddies may
share the parent mailbox. The Buddy must never reconnect itself or repeat
parent-side setup.

Onboarding depends on the harness:

- Pi and generic/legacy harnesses send a version-1 `gitsense.buddy.ready`
  message after connection so the Buddy can retain parent routing metadata.
  Valid readiness completes onboarding; the Buddy sends no ACK.
- Claude and Codex complete onboarding through `gsc buddy connect`, which
  injects parent routing metadata into the Buddy. They send no readiness or
  separate routing message.

Pi, Claude, and Codex support two-way Agent ↔ Buddy messaging through their
mailbox wake mechanisms. Connecting again creates another Buddy; it is not a
restart or recovery operation. Other harnesses currently support Agent → Buddy
updates only. Stop and remove abandoned task-scoped Buddies
explicitly. A successful `gsc ask` or `gsc inform` delivery means the message
was committed, not that the recipient read or completed it.
