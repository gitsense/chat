# GitSense: Chat

**Give your agents more to work with. Give yourself more ways to guide the work.**

Keep working with the tools you already use. No proxy or wrapper is required.
GitSense Chat helps you find and organize sessions, coordinate work with lead
agents, and turn conversations into context you and your agents can reuse.

### Build and scale knowledge through conversation

Create a group in GitSense Chat and add a lead in two clicks. Your lead knows
how to use GitSense to help you create agents, bring existing ones into the
group, and organize their work. Tell it what knowledge you need, and let it
help you build and grow the group.

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

GitSense Chat gives you and your agents more to work with before starting
something new. That extra context is built here: describe what matters in a
conversation, and GitSense turns it into analyzers and lessons agents can
query. Agents understand why a file matters before reading it, while you can
find previous sessions worth continuing, reusing, or turning into shared
knowledge.

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
      <td width="50%" valign="top">Regular ripgrep is on the left; GitSense-enriched search is on the right. Both find the same files, but GitSense gives the agent more to reason with before opening a file.</td>
      <td width="50%" valign="top">Search past sessions by conversation, files, repository, role, or time to quickly resume work, reuse findings, or extract knowledge.</td>
    </tr>
  </tbody>
</table>

### Organize sessions around the work

Groups let you organize related sessions by status, recent activity, role, or
whatever structure fits the work. The same session can appear in more than one
Group, giving you different views without moving or duplicating the underlying
work.

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

GitSense is built around AI assistance. Agents know how to get more help when
they need it, and creating a Group with a lead gives you a personal GitSense
assistant to organize, coordinate, and guide the work. Start with an empty Group
and add a lead with two clicks. Describe the outcome you want, and it can help
turn a complex problem into coordinated work: creating the right team, querying
progress, guiding agents, and bringing the results back in a report. Whether
you need one agent or dozens, the lead can create and organize them with your
direction. The examples below show how one lead can help you scale management,
observation, and knowledge.

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

Once it's running, tell the lead what you care about.

### Work smarter with a lead

Describe the outcome you care about. The lead can keep an eye on your
sessions, alert you when something needs attention, watch what matters
through specialized agents, and coordinate the work from one conversation. It
retrieves only the context it needs, avoids reprocessing unchanged activity,
and monitors the Group while limiting unnecessary token use.

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

<p align="center"><strong>Coordinate the work</strong></p>

<p align="center">Ask a lead to bring your agents' work together.</p>

<p align="center"><img src="assets/scale-coordination-hello-world-lab.png" alt="A lead coordinating nine agents in the Hello World Lab." width="100%"></p>

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
