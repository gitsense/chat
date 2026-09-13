# Supported agent adapters

Each adapter Markdown file in this directory is an opt-in adapter for one
external coding harness. README.md is documentation, not an adapter. The Buddy
lead prompt enumerates adapter files at runtime, reads them completely, and
verifies their commands against the installed CLI before offering a connection
prompt.

Add an adapter file to make a harness available to the workflow. Remove its file
to hide it. An adapter does not add runtime support by itself; its transport and
commands must pass the live capability check.

Keep each adapter focused on:

- the exact harness identifier accepted by the Buddy request;
- the native session identity the harness provides;
- the supported Buddy transport and wake command;
- the complete prompt to paste into that harness; and
- limitations that must be shown to the user.
