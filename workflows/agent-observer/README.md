# Connect agents across tools

This guided workflow brings the coding agents you already use into a shared
GitSense Chat Group. Add an existing Pi session directly, or connect an agent
from another harness through a visible Buddy. The lead creates each Buddy as a
regular managed Pi session with a mailbox, Persona, and published updates.

Pi sessions do not need Buddies. External agents use Buddies to publish the
information they choose to share while they continue working in their own
tools. Communication uses `gsc ask` and `gsc inform`; the Buddy cannot send a
message back into the external harness yet. The Observer is optional and is
created only when you ask the lead to add one; its monitoring behavior is
intentionally left for a later workflow.

The default layout uses rows with a fixed `Observers` column. Connected Pi
sessions and Buddies start in one `Agents` section, while the lead remains in
its dedicated area at the top. You can reorganize the Group manually or ask the
lead to arrange it around the way you work.

## Start here

Copy the contents of [lead-prompt.md](lead-prompt.md) into the current Group
lead. That is the only prompt you need to provide to start the workflow. The
lead will guide you one step at a time and read the supporting files when a
step needs them.

## Supporting files

You do not need to paste these files into the lead separately. Review them for
more detail, or ask the lead to read the relevant file when prompted:

- [supported-agents/](supported-agents/) contains the harness adapters the lead
  discovers and offers dynamically.
- [buddy-prompt.md](buddy-prompt.md) defines the narrow role assigned to each
  newly created Buddy.
- [observer-setup.md](observer-setup.md) defines the optional Observer setup
  for the connected agent roster.
- [observer-prompt.md](observer-prompt.md) is a legacy monitoring draft and is
  not used by the current workflow.

## Try it yourself

1. Open or create a GitSense Chat Group with a lead.
2. Copy the contents of [lead-prompt.md](lead-prompt.md) into the lead.
3. Let the lead enumerate the adapter files in
   ${GSC_HOME:-$HOME/.gitsense}/workflows/agent-observer/supported-agents/.
4. Add an existing Pi session directly from the Group, or follow the lead's
   instructions and copy a connection prompt into a supported external agent.
5. The external agent runs gsc experts init, requests a Buddy, and waits for
   the lead to return its Buddy mailbox.
6. Ask a connected agent to tell its Buddy to publish a short status update,
   then ask another connected agent for that published update.
7. When ready, ask the lead to add an Observer for the current connected agent
   roster.

## What this demonstrates

Your agents keep working in Pi, Claude Code, Codex, or another supported
harness. GitSense Chat gives each one a visible place to publish updates, learn
from other agents' published information, and receive guidance. The external
agent's private transcript is not silently imported.

A Buddy may update only its own Persona through the partial `gsc pi sessions personas set`
command. Use stable tags such as `role:buddy` and
`harness:<id>` to identify Buddies; additive tag updates preserve unrelated
tags. Group structure remains the lead's responsibility and uses complete,
optimistic-concurrency-safe updates.

The adapter list is intentionally data-driven. To add a harness, add an adapter
file with its exact request identifier, native-session discovery method,
connection prompt, Persona tags, and limitations. To remove one, remove its
adapter file. The lead still verifies that the current CLI and runtime support
it before offering the prompt.

## Current boundaries

Buddy support is message-based. The adapter files are the source of truth for
what is currently available. A successful `gsc ask` or `gsc inform` delivery
means the message was committed, not that the external agent read or completed
it.

The Observer setup step creates one visible Group member and gives it the
current connected-agent roster. It does not start a loop or define automated
monitoring, state interpretation, notifications, or cross-agent authority.
