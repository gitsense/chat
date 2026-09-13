# Agent Observer guided workflow

This workflow builds a reusable observer for coding agents that already run in
Claude Code, Codex, OpenCode, or another supported environment. A GitSense Chat
lead guides the setup, creates one buddy for each connected agent, and creates
an observer that turns buddy updates into Group status, reports, and optional
local notifications.

This is an experimental workflow for testing. It creates live managed Pi
sessions and can incur model usage.

## Workflow files

- [`lead-prompt.md`](lead-prompt.md) starts the guided setup in the current
  Group lead.
- [`observer-prompt.md`](observer-prompt.md) defines the observer's delegated
  authority, polling contract, reports, and stopping conditions.
- [`buddy-prompt.md`](buddy-prompt.md) defines the durable counterpart created
  for each external coding agent.
- [`connect-claude-code.md`](connect-claude-code.md),
  [`connect-codex.md`](connect-codex.md), and
  [`connect-opencode.md`](connect-opencode.md) connect external coding agents.

## What it builds

The lead remains in its dedicated area at the top of the Group. The user chooses
one of two layouts:

- `rows-25`: Claude Code, Codex, and OpenCode are rows on the left; Observers is
  a fixed panel on the right. This leaves room to add more buddies or observers.
- `4eq`: Claude Code, Codex, OpenCode, and Observers are equal-width columns.

Each external agent asks the lead to create a buddy. The lead generates the
buddy identity, creates its Pi session, places it in the matching section, and
returns its mailbox. The external agent then sends structured updates directly
to that buddy. The observer watches the Group, updates buddy state avatars, and
reports changes to the lead and user.

## Test the workflow

1. Open an empty GitSense Chat Group with a lead.
2. Copy the prompt from [`lead-prompt.md`](lead-prompt.md) into the lead.
3. Use the report actions or send `next` to move through the guided setup.
4. Choose a Group layout when the lead presents the two options.
5. Choose the language for the standalone observer controller.
6. Verify that the lead reports its active PID, latest check, and control
   commands after startup.
7. Replace `<lead-mailbox-id>` in one or more connection prompts and paste each
   prompt into the matching external coding agent.
8. After Claude Code connects, tell it:

   > Tell your buddy that you are pausing for a while and that your displayed
   > state should be changed to paused.

The test succeeds when the observer sees Claude Code's explicit update, changes
the Claude buddy to `state-paused`, informs the lead, and publishes the final
success report.

## Operating bounds

The five-second interval is for testing. The observer stops after ten minutes,
120 checks, removal from the Group, deletion of the Group, a user stop request,
or repeated observation failures.

The observer uses a standalone controller in its isolated workspace. It records
its PID and a status heartbeat, prevents duplicate instances, and exposes
file-based stop and restart controls. A PID alone is not proof that the correct
controller is healthy, so the workflow also checks its process start time,
command path, run ID, and latest successful check. Restarting never extends the
original deadline or check budget without explicit direction.

A Group can contain any number of agents. Activity is near real time for Groups
with up to 20 agents. In larger Groups, an update may take up to 10 seconds to
appear. Use longer intervals for ordinary work and lower-cost models for buddies
and observers when their role is limited to recording and summarizing updates.
