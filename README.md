# GitSense: Chat

**A platform for scaling agent work through coordination and shared knowledge.**

GitSense Chat helps you organize sessions, coordinate work with lead agents, and
build knowledge you and your agents can reuse. Keep using the tools you already
use. No proxy or wrapper is required.

Start with the agents you have. As your work grows, use leads to bring in more
agents, share knowledge across them, organize sessions into focused groups, and
track progress without having to follow every conversation yourself.

### Beyond terminal tabs and panes

Keep using your terminal, agent environment, and existing workspace setup.
GitSense Chat adds a shared view across sessions so you can review, coordinate,
and monitor work without changing where you do it.

Find sessions by what was discussed or which files they touched, then bring
them into a Group. Add a lead or a dedicated agent to compare approaches,
summarize progress, and help coordinate the work.

Session activity stays up to date as agents work, giving you visibility across
the Group without switching between individual conversations.

<p align="center"><strong>Review and monitor the work</strong></p>
![Reviewing and monitoring grouped sessions in GitSense Chat](assets/beyond-tabs-review-monitor.png)

### Make complex workflows easier to manage

Create a group in GitSense Chat and add a lead in two clicks. Ask it to create
agents or bring existing sessions into the group, then help coordinate their
work.

Use the group for independent code reviews, competing implementations, or
experiments across agents. Your lead knows which sessions are in the group and
how they’re organized. Refer to a session by name, section, or member number to
direct follow-ups where they’re needed.

Here, one request reaches nine agents, then a follow-up changes only the C and Go
programs. The task is Hello World, demonstrating how you can guide the whole
group and then focus on specific agents as the work changes.

**[▶ Download and watch the demo video (MP4, 5.8 MB)](assets/scale-coordination-hello-world-lab.mp4)**

![A lead coordinating nine agents in the Hello World Lab.](assets/scale-coordination-hello-world-lab.png)

### Make knowledge available to all

Build knowledge through conversation and make it available to you and all your
agents. Tell your lead what you want to learn, and let it help you create
knowledge agents, save findings, and share what they know.

Agents can save findings as notes and lessons, letting the lead pass along
references without pulling every detail into its own conversation. As your
needs grow, ask it to add agents or help fresh sessions take over, without
juggling every conversation yourself.

Here, a GitHub Watcher brings together recent issues from two repositories and
answers questions from Claude Code, Codex, and OpenCode.

**[▶ Download and watch the demo video (MP4, 3.1 MB)](https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/assets/create-specialized-knowledge-agents.mp4)**

[![A GitHub Watcher in Pi alongside Claude, Codex, and OpenCode agents asking it for recent GitHub issues.](assets/create-specialized-knowledge-agents.png)](assets/create-specialized-knowledge-agents.png)

Any agent that can run `gsc` can ask your knowledge agents for help or share
information with them, such as new findings or a progress update.

### Scaling includes debugging

Scaling agent work also means understanding what went wrong and how to improve
it. Bring dozens of sessions into a Group, run them in gsc-managed tmux, and
track their activity. Start or stop agents and jump into inspection when
something needs attention.

#### Start and stop agents

Start or stop a managed agent from its session view while keeping the session
and its history available for inspection.

Turn a wall of tool calls into findings you can act on. Session Insights can
surface failed commands, recovery attempts, and whether an agent ran
verification after its final edit. Create different analyzers to examine the
same session logs from different perspectives, such as tool usage, code changes,
or progress.

#### Inspect session activity

The Overview shows message and tool-call counts and links to Session Insights.
File activity organizes every read, write, and edit as a file tree. Select a
file to see the operations recorded for it.

| Start a managed agent | Stop a managed agent | Session overview | File activity |
| --- | --- | --- | --- |
| ![Starting a managed agent from its session view.](assets/start-agent.png) | ![Stopping a managed agent from its session view.](assets/stop-agent.png) | ![Session overview with activity counts and Session Insights links.](assets/overview.png) | ![File activity organized as a tree of reads, writes, and edits.](assets/file-activity.png) |

For example, when building a GitHub Watcher, create an analyzer to review its API
calls and look for evidence that it read the required skill instructions. Use
the findings to investigate mistakes and refine the agent's instructions. Each
view helps you focus on a question, with the recorded activity available for
closer inspection.

### Give your agents more ways to help

You can ask an agent to open a diff or run a command. But coming back later can
mean finding the right session and asking again. GitSense Chat lets agents
include actions directly in their answers and reports, so you can open files,
launch applications, or run commands when you're ready.

You control execution permissions, including which commands can run without
another confirmation and for how long.

Here, a lead brings together findings from multiple sessions and adds actions
that take you to the work. Opening Zed is already approved for this demo, so
the diff opens with one click.

![A GitSense action link opening the relevant code diff for review with one click.](assets/shared-workspace-with-lead-open-diff.gif)

## Quick Start

Review the [install script](install.sh), then install the `gsc` CLI:

```bash
curl https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

This installs the `gsc` CLI. To install and configure GitSense Chat, ask your
coding agent:

```text
Install and configure GitSense Chat for me. Start by running `gsc docs help`.
```

You can also [build the CLI from source](https://github.com/gitsense/gsc-cli).

GitSense Chat currently supports Pi sessions, which you can organize into Groups
with lead agents. Follow
[pi-brains](https://github.com/gitsense/pi-brains) to see how sessions, Session
Insights, checkpoints, shared knowledge, messaging, lead agents, and group
observation loops work together.

GitSense knowledge is not tied to Pi. Any agent that can run `gsc` can query the
same Brains, notes, lessons, and rules.

## Why GitSense Chat?

Spend less time finding past work, explaining it again, and keeping track of
separate sessions.

### Give you and your agents a better starting point

Turn what you explain in a conversation into context agents can find and reuse.
Enrich code searches with what files do and why they matter, so agents have
more to go on before opening them.

Find past sessions by what was discussed or worked on, so you can pick up
useful work without remembering what the session was called.

<table>
  <thead>
    <tr>
      <th width="50%" align="center">Same search, more context</th>
      <th width="50%" align="center">Find work worth reusing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%" valign="top"><img src="assets/same-search-more-to-go-on.png" alt="The same search in ripgrep and GitSense, with GitSense adding the purpose of each matching file as one example of useful context." width="100%"></td>
      <td width="50%" valign="top"><img src="assets/resume-faster-search.png" alt="GitSense session search filtering previous work by content, time, repository, role, and file activity." width="100%"></td>
    </tr>
    <tr>
      <td width="50%" valign="top">Regular ripgrep on the left. GitSense adds each file’s purpose on the right, helping agents decide where to look next.</td>
      <td width="50%" valign="top">Search sessions by conversation, files, repository, role, or time to find the work you want to pick up again.</td>
    </tr>
  </tbody>
</table>

### Organize sessions around the work

Keep your terminals and panes arranged how you like. Groups give you another
way to organize sessions by status, recent activity, role, or whatever makes
sense for the work. The same session can appear in multiple Groups without
moving or copying it. Add a lead to help you keep track of the work across
those sessions.

<table>
  <thead>
    <tr>
      <th width="33%" align="center">Organize by status</th>
      <th width="33%" align="center">Review recent activity</th>
      <th width="34%" align="center">Filter what you see</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width="33%" valign="top"><img src="assets/organize-by-status.png" alt="A My Work Group organized as a Kanban board with an AI assistant monitoring the sessions." width="100%"></td>
    <td width="33%" valign="top"><img src="assets/organize-by-recency.png" alt="The same My Work Group organized into sections by recent session activity with an AI assistant alongside it." width="100%"></td>
    <td width="34%" valign="top"><img src="assets/filter-what-you-see.png" alt="A Tiles view filtered to show selected recent-activity sections from the My Work Group." width="100%"></td>
  </tr>
  </tbody>
</table>

## All you need is a lead, really

Your lead is a personal GitSense assistant. Tell it what you need help with,
from keeping an eye on sessions to creating agents and coordinating their work.
Start small and let it help you grow, without managing every session yourself.

### Create a lead in seconds

Adding a lead to a Group takes two clicks. No setup, no scripting.

<table>
  <tbody>
    <tr>
      <td width="50%" valign="top"><strong>1. Add a lead</strong><br><br><img src="assets/create-a-lead-step-1-start.png" alt="A GitSense Chat Group with the Add a lead button ready to be selected." width="100%"><br><br>Click <strong>Add a lead</strong> from the Group.</td>
      <td width="50%" valign="top"><strong>2. Create the lead agent</strong><br><br><img src="assets/create-a-lead-step-2-confirm.png" alt="The Add a lead agent dialog with a managed lead ready to be created." width="100%"><br><br>Confirm the settings and click <strong>Create lead agent</strong>.</td>
    </tr>
  </tbody>
</table>

Once it's running, tell the lead what you need or ask how it can help:

- Create agents or bring existing sessions into the Group.
- Arrange sessions into columns or sections that fit your work.
- Check progress and bring findings together.
- Set up reminders or monitoring for things you care about.

### Work smarter with a lead

Give your lead something to watch, remind you about, or help coordinate. It
can check for changes and use saved checkpoints to stay informed without
rereading every conversation. The examples below show a few ways to put it
to work.

<table>
  <tr>
    <td width="50%" align="center"><strong>Delegate the watching</strong></td>
    <td width="50%" align="center"><strong>Monitor what matters</strong></td>
  </tr>
  <tr>
    <td align="center" valign="top">Give the lead a job, like notifying you when a session stalls or finishes.</td>
    <td align="center" valign="top">Add focused agents that each watch a responsibility.</td>
  </tr>
  <tr>
    <td valign="top"><img src="assets/give-your-lead-a-job.png" alt="A Group lead being given a one-time monitoring job with instructions to send a macOS notification if a session has not finished." width="100%"></td>
    <td valign="top"><img src="assets/team-dashboard.png" alt="A GitSense Chat dashboard showing focused agents monitoring different responsibilities." width="100%"></td>
  </tr>
</table>

## Current Support and Boundaries

Pi is currently the supported runtime integration. Codex, Claude Code,
OpenCode, and other coding-agent harnesses are not yet integrated for session
logs, lifecycle state, or Group coordination.

GitSense knowledge is portable. Any agent that can run `gsc` can query the same
Brains, notes, lessons, and rules without requiring runtime integration.

GitSense Chat surfaces evidence and supports action. Executable actions remain
subject to application authorization and command validation. It does not decide
whether an agent's work is correct, and agent findings do not automatically
become trusted knowledge. People remain responsible for reviewing evidence,
resolving uncertainty, and deciding what happens next.

## License

The [`gsc` CLI](https://github.com/gitsense/gsc-cli) is licensed under the
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

GitSense Chat is licensed under the
[Fair Core License (FCL-1.0-ALv2)](https://fcl.dev/). You may use, modify, and
run it internally, including for personal projects, shared workflows, and
self-hosted deployments. You may not use it to build or operate a product or
service that competes directly with GitSense Chat. Each version becomes
available under Apache 2.0 two years after its release. See [LICENSE](LICENSE)
and [NOTICE](NOTICE) for the complete terms.
