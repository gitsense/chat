# Pair agents across tools

This guided workflow brings the coding agents you already use into a shared
GitSense Chat Group. The lead prepares the Group and provides guidance.
External parent agents connect themselves through `gsc buddy connect`, which
creates a new task-scoped visible Pi Buddy with its own mailbox, Persona, and
published updates. The created Buddy never runs `gsc buddy connect` or repeats
parent-side onboarding. A parent agent may create multiple Buddies in the same
Group.

Pi agents can also create task-scoped Buddies. The Buddy is another managed Pi
session with a focused role and a mailbox, not a copy of the parent's private
transcript. Pi-to-Pi communication uses the existing mailbox flow: send with
`gsc inform`, receive through the Pi mailbox watcher, then fetch and complete
messages with `gsc pi sessions inbox`. Claude and Codex also support two-way
Agent ↔ Buddy messaging; other harnesses currently support only Agent → Buddy
updates. A Buddy may also perform explicitly delegated, bounded research,
review, or implementation; it is not an automatic second worker or a copy of
the parent's private context. For example, Claude can delegate research to a
Buddy using a different, potentially less expensive Pi model if that model is
configured. The parent supplies the objective, context, scope, and expected
result; a task request alone does not authorize Group publication.

A human can give one agent another agent's Buddy mailbox. The first agent asks
that Buddy for a current direct-contact card with `gsc ask`, then communicates
directly with the paired agent using the returned harness-specific mailbox and
wake-up instructions. The Buddy supplies contact knowledge; it does not forward
the task. When the human says **“Update your Buddy with your current thread
ID”** or **“Refresh your Buddy routing,”** Codex sends its Buddy the current
`CODEX_THREAD_ID`. Agents publish shared results by sending their own Buddy an
explicit `Publish in Group:` update. Ordinary coordination stays out of the
Group unless explicitly authorized for publication. Buddy replies should
explain the message's substance—what finished, what is blocked, or what was
found—rather than say only that mail was processed. Readiness and route updates
remain silent.

With human authorization, the lead can greet or coordinate Group members. A
message from one agent to the lead does not by itself authorize a broadcast.
For a greeting to visible Buddies, the lead contacts those Buddies; to reach
the paired external agents, it requests current contact cards and messages
those agents directly. Delivery is not proof of a reply.

The Observer is optional and is
created and onboarded by the lead only when you request one; its monitoring
behavior is intentionally left for a later workflow.

The default layout uses a simple rows arrangement with one `Agents` section.
The lead remains in its dedicated area at the top. No Observer row or fixed
Observer column is created by default. If you request an Observer, the lead
asks whether it should use the normal rows layout or a fixed/dedicated column.

## Start here

Copy the contents of [lead-prompt.md](lead-prompt.md) into the current Group
lead. That is the only prompt you need to provide to start the workflow. The lead
displays the canonical help menu through a `gsc-embed` report, keeping the
menu out of the lead's context while rendering the current workflow file. It
runs the connection-report script when you choose an action.

## Supporting files

You do not need to paste these files into the lead separately. Review them for
more detail, or ask the lead to read the relevant file when prompted:

- [supported-agents/](supported-agents/) contains the harness adapter content
  used by the connection report.
- [scripts/connections-report](scripts/connections-report) deterministically
  generates a connection report file with copy actions and emits a compact
  embed report for the Group.
- [buddy-instructions/](buddy-instructions/) contains optional harness-specific
  Buddy behavior passed with `--buddy-instructions-dir`.
- [buddy-prompt.md](buddy-prompt.md) is the common workflow prompt passed with
  `--buddy-prompt` and injected into each new Buddy session.
- [observer-setup.md](observer-setup.md) defines the optional Observer setup
  for the connected agent roster.


The lead's menu embed references `/--/workflows/agent-collaboration/help.md`. This
is a root-relative local workflow URL and is intentionally not copied into the
lead prompt. Connection reports use the same local workflow server and write
runtime-specific documents under `reports/`; the script emits an embed pointing
to the report so copy actions remain available after expansion.

## Try it yourself

1. Open or create a GitSense Chat Group with a lead.
2. Copy the contents of [lead-prompt.md](lead-prompt.md) into the lead.
3. Choose **Set up this Group** if you want the lead to organize the Group.
4. Choose **Pair an existing agent**. The lead runs the deterministic report script.
5. Copy one generated prompt and paste it into the existing agent's composer.
6. The external parent agent runs `gsc buddy connect` to create a new
   task-scoped Buddy. The common Buddy prompt and optional harness-specific
   instructions are injected into the new Buddy session. Pi and generic/legacy
   harnesses then send the formal readiness message; Claude and Codex complete
   onboarding during connection and send no readiness message. In the returned
   connection result, `buddy_session_id` identifies the managed Buddy,
   `mailbox_id` is the Buddy mailbox used for Agent → Buddy messages, and
   `agent_mailbox_id` is the parent's incoming mailbox used for Buddy → Agent
   messages. The optional `--agent-mailbox-id` selects that parent inbox; it
   does not identify or reuse a Buddy. Reuse the first connection's returned
   `agent_mailbox_id` for additional task-scoped Buddies owned by the same
   parent.
7. Pi, Claude, and Codex can receive Buddy findings and replies; other harnesses
   currently send updates only, so delegated work cannot be returned to those
   parents through this workflow. To communicate across supported harnesses, give an agent
   the peer Buddy's mailbox; it requests a contact card and then messages the
   peer agent directly. The Buddy does not relay the task.
8. When ready, ask the lead to add an Observer and choose normal rows or a
   fixed/dedicated column.

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

For a focused human-facing surface, any parent agent can turn Buddy updates
into a compact `gsc-report` and use `gsc-embed` to load a local Markdown status
file. That keeps relevant status, decisions, blockers, and actions visible
without showing the agent's reasoning or tool-call stream in the live
interface. `gsc-embed` controls presentation, not access to the embedded
document.

The adapter list is intentionally data-driven. To add a harness, add an adapter
file with its exact request identifier, native-session discovery method,
connection prompt, Persona tags, and limitations. To remove one, remove its
adapter file. The lead still verifies that the current CLI and runtime support
it before offering the prompt.

## Current boundaries

Buddy support is message-based. Direct contact cards contain routing
capabilities and must be requested explicitly; they are not published as Group
metadata. When the human explicitly asks Codex to update its Buddy with the
current thread ID, the Buddy replaces its retained queue target.

The Buddy creation report is generated by
`scripts/connections-report` from the adapter files and always includes a
generic fallback. Every option, including the generic fallback, injects the
common Buddy runtime prompt. Each report option creates a fresh task-scoped
Buddy; it is not a reconnect or restart operation. Pi, Claude, and Codex
support two-way mailbox messaging. Other harnesses support Agent → Buddy updates only. Stop and remove abandoned task-scoped Buddies explicitly; `connect` is
not a restart or recovery command. A successful `gsc ask` or `gsc inform`
delivery means the message was committed, not that the recipient read or
completed it.

The Observer setup step creates one visible Group member and gives it the
current connected-agent roster. It does not start a loop or define automated
monitoring, state interpretation, notifications, or cross-agent authority. The
external-agent mailbox watcher is separate from the Group Observer.
