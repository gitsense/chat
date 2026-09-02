# GitSense: Chat

**GitSense is the intelligence platform for AI agent workflows.**

It works quietly alongside the tools you already use. No proxy or wrapper is
required. GitSense gathers useful information from agent sessions, codebase
activity, and reviewed knowledge. Use it to understand what your agents are
doing, guide work while it is underway, and give every agent a better starting
point.

## How GitSense Chat Works

Your agents keep working in the tools you already use. GitSense works with the
activity they create and connects it with reviewed knowledge, giving people and
AI agents more ways to understand and guide the work without replacing the
workflow.

![GitSense Chat captures the sessions agents already create and makes them searchable, organized, and reusable.](assets/same-sessions-more-useful-no-title.png)

## Quick Start

Review the [install script](install.sh), then install `gsc`:

```bash
curl https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

Install it yourself by [building from source](https://github.com/gitsense/chat),
or ask your coding agent:

```text
Install and configure GitSense Chat for me. Start by running `gsc docs help`.
```

Pi is GitSense Chat's first full reference integration. Follow
[pi-brains](https://github.com/gitsense/pi-brains) to see how sessions, Session
Insights, checkpoints, shared knowledge, messaging, lead agents, and group
observation loops work together.

GitSense knowledge is not tied to Pi. Any agent that can run `gsc` can query the
same Brains, notes, lessons, and rules.

## What Intelligence Lets You Do

Here are a few ways GitSense Chat turns agent activity and repository knowledge
into useful information for people and AI agents.

### Resume Faster

**Find your sessions by more than a name.**

Scan a dozen sessions and their last messages in seconds to see what each was
about. If that is not enough, search messages or files touched. If you remember
the goal but not the words, use checkpoints to ask an agent which sessions
match the intent.

<table>
  <thead>
    <tr>
      <th width="50%" align="center">Review quickly</th>
      <th width="50%" align="center">Search what you remember</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%" valign="top"><img src="assets/resume-faster-browse.png" alt="The Sessions page with sessions on the left and the latest message in a preview pane." width="100%"></td>
      <td width="50%" valign="top"><img src="assets/resume-faster-search.png" alt="Session search results matching both file activity and conversation content." width="100%"></td>
    </tr>
  </tbody>
</table>

### Organize around how you work.

Terminals and multiplexers give each agent session a place to run, whether that
is a pane, tab, or workspace. GitSense builds on that by letting you bring
related sessions into a Group, use sections and layouts to show how the work
fits together, and filter which sessions you see without changing where your
agents run.

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
    <td width="33%" valign="top"><img src="assets/many-sessions-my-work-kanban.png" alt="A My Work Group organized as a Kanban board with an AI assistant monitoring the sessions." width="100%"></td>
    <td width="33%" valign="top"><img src="assets/many-sessions-my-work-recent-activity.png" alt="The same My Work Group organized into sections by recent session activity with an AI assistant alongside it." width="100%"></td>
    <td width="34%" valign="top"><img src="assets/many-sessions-my-work-recent-activity-tiles.png" alt="A Tiles view filtered to show selected recent-activity sections from the My Work Group." width="100%"></td>
  </tr>
  </tbody>
</table>

### Add a lead that understands your work.

**Two clicks and a prompt. That is all it takes.**

Tell the lead what you want to know or monitor. GitSense leads know how to
retrieve only the context they need, avoid reprocessing unchanged activity,
and monitor the Group token efficiently.

<table>
  <tbody>
    <tr>
      <td width="50%" valign="top"><strong>1. Add a lead</strong><br><br>Click <strong>Add a lead</strong> from the Group.<br><br><img src="assets/create-a-lead-step-1-start.png" alt="A GitSense Chat Group with the Add a lead button ready to be selected." width="100%"></td>
      <td width="50%" valign="top"><strong>2. Create the lead agent</strong><br><br>Confirm the settings and click <strong>Create lead agent</strong>.<br><br><img src="assets/create-a-lead-step-2-confirm.png" alt="The Add a lead agent dialog with a managed lead ready to be created." width="100%"></td>
    </tr>
    <tr>
      <td width="50%" valign="top"><strong>3. Describe what you need</strong><br><br>Tell the lead what to monitor, how often to check, and the safeguards to follow.<br><br><img src="assets/create-a-lead-step-3-create-loop.png" alt="A prompt asking the Group lead to create a bounded read-only monitoring loop." width="100%"></td>
      <td width="50%" valign="top"><strong>4. Review the report</strong><br><br>The report appears beside the Group and shows what needs your attention.<br><br><img src="assets/create-a-lead-step-4-review-reports.png" alt="A Group monitoring report showing loop status, timing, controls, and sessions needing attention." width="100%"></td>
    </tr>
  </tbody>
</table>

### Build an observation system that scales.

Start with one focused task. Create a Group, add the agents it needs, and give
the Group a lead. Each agent keeps the context for its part of the work, while
the lead combines what they learn.

To bring that work into a larger view, add the lead to another Group. The
GitHub Watcher can lead a focused Group for issues and pull requests while
appearing as one agent in the My Team Dashboard Group. The dashboard stays
simple, but you can open the GitHub Watcher Group whenever you need the details.

![A GitHub Watcher appearing in the My Team Dashboard Group while leading a focused Group of GitHub observers.](assets/scalable-observation-groups.svg)

<table>
  <thead>
    <tr>
      <th width="50%" align="center">My Team Dashboard Group</th>
      <th width="50%" align="center">GitHub Watcher Group</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%" valign="top"><img src="assets/group-my-team.png" alt="The My Team Dashboard Group with GitHub Watcher, Product Health Monitor, Slack Watcher, team members, and Roboto." width="100%"></td>
      <td width="50%" valign="top"><img src="assets/github-watcher-group-placeholder.svg" alt="Placeholder for the GitHub Watcher Group with focused agents for issues and pull requests." width="100%"></td>
    </tr>
  </tbody>
</table>

### One Session. Multiple Perspectives.

Create custom views to examine the same session through different lenses. See
how one prompt and 52 tool calls become something you can actually review.

<table>
  <thead>
    <tr>
      <th width="33%" align="center">The session</th>
      <th width="33%" align="center">Change Review</th>
      <th width="33%" align="center">Session Outline</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="33%" valign="top"><img src="assets/one-session-the-session.png" alt="The original session with 52 tool calls and its available Session Insight views." width="100%"></td>
      <td width="33%" valign="top"><img src="assets/one-session-change-review.png" alt="A custom Change Review perspective over the same session." width="100%"></td>
      <td width="33%" valign="top"><img src="assets/one-session-session-outline.png" alt="A custom Session Outline perspective over the same session." width="100%"></td>
    </tr>
  </tbody>
</table>

### Same Search. More Context.

Give agents enough context to decide what matters before spending tokens on
entire files.

<table>
  <tr>
    <td width="35%" valign="top">
      <strong>Same matches. More to go on.</strong>
      <p>Plain ripgrep finds the matching code:</p>
      <pre><code>rg -g '**/src/**/s*.rs' matcher</code></pre>
      <p>GitSense returns the same matches with the purpose of each file:</p>
      <pre><code>gsc rg -g '**/src/**/s*.rs' \
  --db code-intent \
  --fields purpose \
  matcher</code></pre>
      <p>Agents can decide what matters before loading entire files.</p>
    </td>
    <td width="65%" valign="top">
      <img src="assets/same-search-more-to-go-on.png" alt="The same search in ripgrep and GitSense, with GitSense adding the purpose of each matching file." width="100%">
    </td>
  </tr>
</table>

### One Expert. Many Agents.

Build a Pi domain expert over knowledge too large for one context window. Five
focused helpers each cover part of the GitHub issue history, while the lead
keeps a lightweight map of who knows what and routes questions to the right
agent.

Agents are designed to be swappable. Save what needs to survive as durable
notes so new agents can pick up where previous agents left off.

**Build the GitHub Issues Expert**

![Placeholder for a GitHub Issues Expert Group with one lead and five focused helpers.](assets/session-insight-placeholder.svg)

Codex, Claude Code, and other agents can consult the same expert through
`gsc ask`:

> Do we already have an issue similar to [problem]? Return the matching issue
> numbers and explain why they are related.

| **Ask from Codex** | **Ask from Claude Code** |
| :---: | :---: |
| ![Placeholder for Codex consulting the GitHub Issues Expert through gsc ask.](assets/session-insight-placeholder.svg) | ![Placeholder for Claude Code consulting the same GitHub Issues Expert through gsc ask.](assets/session-insight-placeholder.svg) |

## One Goal. 4,878 Files. Start With a Conversation.

The examples above show a few things intelligence makes possible. This
walkthrough shows how they work together.

Create a Group and add a lead in three clicks. Then explain what you need. The
lead helps you turn the request into a goal with clear acceptance criteria,
decide how to divide the work, and create focused agents, each with a clear
name, identity, and responsibility.

In the demo, a human and a lead agent divide and conquer the 4,878-file Codex
repository. The lead coordinates focused agents, keeps the plan visible, and
helps the human monitor progress and steer the work through conversation.

The same workflow can build knowledge without stuffing the whole repository
into every context. Agents can preserve what matters in durable notes, and the
lead can keep a lightweight map of who knows what. Observation loops can watch
session activity and generate focused reports, giving both the human and the
lead better information for deciding what happens next.

The agents can work independently without turning the work into a black box.

![Placeholder for a video showing a lead agent helping a human divide and conquer a 4,878-file repository through conversation.](assets/lead-agent-team-building-video-placeholder.svg)

## Current Support and Boundaries

Pi is currently the supported runtime integration. Codex, Claude Code,
OpenCode, and other coding-agent harnesses are not yet integrated for session
logs, lifecycle state, or Group coordination.

GitSense knowledge is portable. Any agent that can run `gsc` can query the same
Brains, notes, lessons, and rules without requiring runtime integration.

GitSense Chat surfaces evidence and supports action. It does not decide whether
an agent's work is correct, and agent findings do not automatically become
trusted knowledge. People remain responsible for reviewing evidence, resolving
uncertainty, and deciding what happens next.

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
