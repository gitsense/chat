# Supported agent adapters

Each adapter Markdown file in this directory is an opt-in adapter for one
external coding harness. README.md is documentation, not an adapter. Pi is
connected directly from the Group and does not need an adapter or Buddy. The
lead prompt enumerates adapter files at runtime, reads them completely, and
verifies `gsc buddy connect`, native discovery, and messaging against the
installed CLI before offering direct connection instructions.

The workflow always provides a generic `gsc buddy connect` fallback for any
valid harness identifier. Add an adapter file to customize a harness with
native-session discovery, richer instructions, Persona tags, transport details,
and limitations. Remove its file to hide that customized experience. An
adapter does not add runtime support by itself; its discovery and messaging
commands must pass the live capability check.

When a user asks to add a harness, verify that it can run `gsc buddy connect`,
`gsc ask`, and `gsc inform` against the shared GitSense store before adding or
offering an adapter. Never
treat an adapter file as proof that a harness has private transcript or
lifecycle integration.

Keep each adapter focused on:

- the exact harness identifier accepted by `gsc buddy connect`;
- the display name and native session identity the harness provides;
- the command or method used to discover that native session identity;
- the complete prompt to paste into that harness;
- transport and limitations that must be shown to the user; and
- the Buddy Persona tags, including a stable harness tag.

When a user wants harness-specific behavior, explain that they can propose a
new `<harness>.md` file here. Show the proposed contents and wait for user
confirmation before writing it. Until confirmed, use the generic fallback.

The external agent runs `gsc buddy connect`, which creates or reuses the Buddy
as a regular managed Pi session and returns its mailbox ID. External agents use
`gsc ask` and `gsc inform` with that ID. The Buddy does not send messages
back into the native harness in this workflow.
