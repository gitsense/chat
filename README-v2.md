# GitSense: Chat

**Give your agents a home. Make AI collaboration manageable at scale.**

Agents may work across different terminals, repositories, and tasks, but their
sessions do not have to remain scattered. GitSense Chat brings that work
together while it is happening and after sessions end.

<div align="center">
  <h2>Scale AI Collaboration</h2>
  <p>Turn distributed agent work into shared knowledge, focused insights, and coordinated action.</p>
</div>

| **Make every session more useful** | **Coordinate work across sessions** |
| :---: | :---: |
| ![GitSense Chat makes active and completed coding-agent sessions easier to find, inspect, group, organize, enrich, collaborate through, and resume.](assets/same-sessions-more-useful.png) | ![GitSense Chat connects distributed agent sessions through shared knowledge, checkpoints, groups, and lead agents.](assets/distributed-sessions-shared-coordination.png) |

![Placeholder for the Chat Widget Team report showing checkpoint freshness, work status, coordination risks, and possible next steps across twelve sessions.](assets/session-insight-placeholder.svg)

A lead agent can turn the latest checkpoints, live session freshness, group
layout, and shared file activity into one team report. Instead of opening every
session or interrupting every agent, ask one lead what is happening, what looks
stale, and what needs attention.

## How GitSense Chat supports this

GitSense Chat provides three layers for working with agents at scale:

| | Purpose | GitSense capabilities |
| :--- | :--- | :--- |
| **Remember** | Preserve what the team and its agents learn. | Brains, lessons, notes, and rules |
| **Understand** | Turn agent activity into the signals people and agents need. | Search, Session Insights, checkpoints, and freshness |
| **Coordinate** | Work across many sessions without checking each one individually. | Groups, mailboxes, lifecycle tools, and lead agents |

### Build shared knowledge

Brains encode structured domain knowledge about repositories and teams.
Lessons preserve discoveries that should not be rediscovered. Notes record
useful implementation context. Rules carry guidance into future work and can
apply it at the point where it matters.

Together, these give current and future agents more than another transcript.
They provide durable context that can travel with the repository and improve
the starting point for the next task.

### See what matters

Session Insights let developers, team leads, and managers create views around
their own questions. One view might show a compact session outline. Another
might focus on changed files, code ownership, risk, tests, repository lessons,
or whether a required command ran.

The same session can support different views because what matters depends on
who is asking and what they need to decide.

### Understand session state without interrupting the agent

Checkpoints record an agent's goal, current task, understanding, next action,
decisions, evidence, risks, open questions, and self-reported health. A lead
can read these records without sending a message to each agent or replaying
complete transcripts.

Checkpoint freshness is computed when queried. `events_behind` measures how
many session entries occurred after the checkpoint, which is often more useful
than age alone. A three-day-old checkpoint may describe the final state when
the session stopped immediately afterward. A checkpoint from fifteen hours ago
may already be stale when hundreds of events followed it.

Checkpoints report what was known when they were created. They are evidence,
not proof that the work is complete or correct.

### Find work wherever it happened

Search sessions available to GitSense by message content, tool activity, file
operations, changed files, repository metadata, and connected knowledge such as
lessons, notes, and rules. This makes it practical to find relevant work even
when nobody remembers which terminal, session, or agent produced it.

Groups are views over sessions, not folders. The same session can appear in
every project, workflow, dashboard, or temporary review where it is useful.

### Give a group a lead agent

Create a group, add a lead, and manage its sessions through one conversation.
The lead receives the current group layout and roster, starts with member
checkpoints, checks live session state, and reports uncertainty when evidence
is stale or unavailable.

Agents do not need to share a parent or have started together. A group can
bring independently created sessions into the same coordination structure.
The lead gives the user one place to ask what is happening across that group.

<div align="center">
  <h2>Data, your way</h2>
  <p>Control what you see so important work is harder to miss.</p>
</div>

<div align="center">
  <h3>Organize your sessions</h3>
  <p>Use different layouts to organize sessions around the work.</p>
</div>

| | |
| :---: | :---: |
| ![GitSense Chat sessions organized in a Kanban layout.](assets/organize-pi-sessions-kanban-layout-small.png) | ![GitSense Chat lead agent composer for asking about organized sessions.](assets/pi-sessions-ask-lead-agent-small.png) |

<div align="center">
  <h3>See what matters</h3>
  <p>Create custom views to see the forest, not just the trees.</p>
</div>

| | |
| :---: | :---: |
| ![Placeholder for a Change Review view showing changed files, impact, and review actions.](assets/session-insight-placeholder.svg) | ![Placeholder for a Session Outline view condensing messages, tools, and commands.](assets/session-insight-placeholder.svg) |
| ![Placeholder for a Code Ownership view matched to files an agent touched.](assets/session-insight-placeholder.svg) | ![Placeholder for a Tests and Validation view showing relevant checks and observed commands.](assets/session-insight-placeholder.svg) |

## Quick Start

Review the [install script](install.sh), then install `gsc`:

```bash
curl https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

Or [build it yourself](https://github.com/gitsense/chat).

### Ask Your Coding Agent

```text
Install and configure GitSense Chat for me. Start by running `gsc docs help`.
```

Your agent will guide you through the rest and stop when you need to enter an
API key privately.

For detailed installation instructions, run:

```bash
gsc docs install
```

## How it works

GitSense Chat uses the session logs your agents already create, so the core
search, review, insight, and organization workflows work while sessions are
active and after they end. Optional lifecycle integration adds live state,
mailboxes, agent-to-agent communication, and managed session startup.

| With session logs | With optional lifecycle integration |
| :--- | :--- |
| Search conversations, files, and operations | See which agents are running |
| Inspect messages, tool calls, file activity, and Git state | Start an eligible stopped session when requested |
| Create custom Session Insight views | Send messages to an agent's inbox |
| Group and organize related sessions | Let agents communicate with one another |
| Read checkpoints and measure freshness | Coordinate a group through a lead agent |
| Copy resume and attach commands | Receive messages in the agent's existing interface |

**Runtime support:** Pi is currently the supported integration. Codex, Claude
Code, OpenCode, and other coding-agent harnesses are not yet integrated. The
goal is a shared workspace where sessions, knowledge, and agent communication
work across harnesses.

## Working examples

- [smart-ripgrep](https://github.com/gitsense/smart-ripgrep) shows how committed
  repository knowledge helps agents find the right files, consult earlier
  lessons, and create custom Session Insight views.
- The Session Outline and Change Review analyzers show how the same raw session
  can be shaped around different questions.
- The Pi integration demonstrates session search, groups, checkpoints,
  messaging, lifecycle state, and lead-agent coordination.

## Boundaries

GitSense Chat surfaces evidence and makes distributed work easier to inspect.
It does not decide whether an agent's work is correct. Checkpoints and agent
reports describe what was known at a point in time. Humans remain responsible
for reviewing evidence, resolving uncertainty, and deciding what happens next.
