# Connect your agents with Buddies

This guided workflow connects coding agents that already run in their own tools
to a shared GitSense Chat Group. Each agent gets a visible Buddy with a
mailbox, Persona, and published updates. The Group lead owns structure and
coordination.

It starts with Buddies. The Observer is optional and is created only when you
ask the lead to add one. Its monitoring behavior is intentionally left for a
later workflow.

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
- [observer-setup.md](observer-setup.md) defines the optional Observer setup.
- [observer-prompt.md](observer-prompt.md) is a legacy monitoring draft and is
  not used by the current workflow.

## Try it yourself

1. Open or create a GitSense Chat Group with a lead.
2. Copy the contents of [lead-prompt.md](lead-prompt.md) into the lead.
3. Let the lead enumerate the adapter files in
   ${GSC_HOME:-$HOME/.gitsense}/workflows/agent-observer/supported-agents/.
4. Follow the lead's instructions and copy the connection prompt it provides
   for a supported harness into that external agent.
5. The external agent runs gsc experts init, requests a Buddy, and waits for
   the lead to return its Buddy mailbox.
6. Ask the external agent to tell its Buddy to publish a short status update.
7. Ask another connected agent to ask its Buddy for the latest published update
   from the first Buddy.
8. When ready, ask the lead to add an Observer for all current Buddies.

## What this demonstrates

Your agents keep working in Claude Code, Codex, or another supported harness.
GitSense Chat gives each one a visible place to publish updates, learn from
other agents' published information, and receive guidance. The external agent's
private transcript is not silently imported.

A Buddy may update only its own Persona through the partial gsc pi sessions
personas set command. Group structure remains the lead's responsibility and
uses complete, optimistic-concurrency-safe updates.

The adapter list is intentionally data-driven. To add a harness, add an adapter
file with its exact request identifier, creation command, transport, connection
prompt, and limitations. To remove one, remove its adapter file. The lead still
verifies that the current CLI and runtime support it before offering the prompt.

## Current boundaries

Buddy support is transport-specific. The adapter files are the source of truth
for what is currently available. A successful message delivery means the
message was committed, not that the external agent read or completed it.

The Observer setup step creates one visible Group member and gives it the
current Buddy roster. It does not start a loop or define automated monitoring,
state interpretation, notifications, or cross-Buddy authority.
