# Supported agent adapters

Each Markdown file in this directory is an opt-in adapter for one external
coding harness. `README.md` is documentation, not an adapter. Pi connects
directly from the Group and does not need an adapter or Buddy.

The workflow script at `../scripts/connections-report` discovers adapter files,
reads their metadata and prompts, writes the complete connection report with
copy actions under the workflow `reports/` directory, and emits a compact
`gsc-embed` report. The lead does not interpret adapter files or construct
prompts.

The report always includes a generic `gsc buddy connect` fallback for any valid
harness identifier. Add an adapter to customize a harness with native-session
discovery, richer instructions, Persona tags, communication capability, and
limitations. An adapter does not add runtime support by itself.

Keep each adapter focused on:

- the exact harness identifier accepted by `gsc buddy connect`;
- the display name and native session identity the harness provides;
- the command or method used to discover that native session identity;
- the complete prompt to paste into that harness;
- whether communication is `two-way` or `one-way`; and
- the Buddy Persona tags, including a stable harness tag.

When a user wants harness-specific behavior, show a proposed `<harness>.md`
file and wait for confirmation before writing it. Until confirmed, use the
generic fallback.

The external agent runs `gsc buddy connect`, which creates or reuses the Buddy
as a regular managed Pi session and returns its Buddy mailbox plus a durable
`agent_mailbox_id`. The command returns immediately by default with
`status: "starting"`. The external agent then sends a versioned
`gitsense.buddy.ready` JSON message with `gsc inform`, including
`agent_mailbox_id`.

Claude and Codex support two-way Agent ↔ Buddy messaging through their
harness-specific wake mechanisms. Other harnesses currently support Agent →
Buddy updates only. A successful `gsc ask` or `gsc inform` delivery means the
message was committed, not that the recipient read or completed it.
