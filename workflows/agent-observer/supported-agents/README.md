# Supported agent adapters

Each adapter Markdown file in this directory is an opt-in adapter for one
external coding harness. README.md is documentation, not an adapter. Pi is
connected directly from the Group and does not need an adapter or Buddy. The
lead prompt enumerates adapter files at runtime, reads them completely, and
verifies their commands against the installed CLI before offering a connection
prompt.

Add an adapter file to make a harness available to the workflow. Remove its file
to hide it. An adapter does not add runtime support by itself; its session
discovery and messaging commands must pass the live capability check.

When a user asks to add a harness, verify that it can run `gsc ask` and
`gsc inform` against the shared GitSense store before adding an adapter. Never
treat an adapter file as proof that a harness has private transcript or
lifecycle integration.

Keep each adapter focused on:

- the exact harness identifier accepted by the Buddy request;
- the native session identity the harness provides;
- the command or method used to discover that native session identity;
- the complete prompt to paste into that harness; and
- limitations that must be shown to the user; and
- the Buddy Persona tags, including a stable harness tag.

The lead creates the Buddy as a regular managed Pi session with a name in the
form `<harness>-<native-session-id>`. External agents use `gsc ask` and
`gsc inform` with the returned Pi session UUID. The Buddy does not send messages
back into the native harness in this workflow.
