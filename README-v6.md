# GitSense: Chat

**GitSense is the intelligence platform for AI agent workflows.**

It works quietly alongside the tools you already use. No proxy or wrapper is
required. GitSense gathers useful information from agent sessions, codebase
activity, and reviewed knowledge. Use it to understand what your agents are
doing, guide work while it is underway, and give every agent a better starting
point.

GitSense Chat makes that intelligence easy to work with. Find sessions, ask AI
about the work, organize related sessions into Groups, monitor sessions and
generate reports from their activity, and build reusable knowledge. The `gsc`
CLI makes the same intelligence available to terminal workflows and other
agents.

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
about. No transcripts to open or sessions to click through. If the name is not
enough, search messages or files touched. If you remember the goal but not the
words, use checkpoints to ask an agent which sessions match the intent.

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

### Give your sessions context.

Bring related sessions into a Group and organize them around how you work. The
same session can appear in more than one Group, so you can create personal
workspaces, project views, temporary reviews, or any other arrangement without
moving or duplicating the underlying session.

<table>
  <tr>
    <td width="50%" valign="top"><img src="assets/many-sessions-my-work-kanban.png" alt="A My Work Group organized as a Kanban board with an AI assistant monitoring the sessions." width="100%"></td>
    <td width="50%" valign="top"><img src="assets/many-sessions-my-work-recent-activity.png" alt="The same My Work Group organized by recent session activity with an AI assistant alongside it." width="100%"></td>
  </tr>
</table>

### Give Your Multiplexer a Lead.

tmux, cmux, and Herdr help you run and arrange agent sessions. Add those active
sessions to a GitSense Chat Group and give your multiplexer a lead that can
monitor the work happening inside every pane.

Tell the lead to create a loop with `gsc pi sessions groups messages`. It will
know how to efficiently monitor messages across the Group, skip reviews when
nothing has changed, and alert you to progress, blockers, or agents stuck in a
loop without rereading every transcript.

![Placeholder for a 5 by 4 GitSense Tiles view with 20 active sessions and a lead monitoring them for agents stuck in a loop.](assets/give-your-multiplexer-a-lead-placeholder.svg)

### Build Dashboards You Can Talk To

Every card can have its own agent session, context, history, and responsibility.
Instead of asking one agent to understand everything, distribute the work
across specialists. A dashboard with 30 cards can represent 30 independent
contexts, each focused on one team member, system, domain, risk, or source of
activity.

Mix team status reports with heads-up agents that watch Slack, GitHub, tests,
coordination risks, or anything else the team needs to keep in view. Ask the
agent behind a card why something changed, tell it what deserves attention, or
ask Roboto to coordinate the agents behind the entire dashboard.

![A My Team dashboard combining team status reports, heads-up metric cards, and Roboto as its AI assistant.](assets/group-my-team.png)

> **Why this scales:** GitSense Chat consolidates agent session activity into
> one place and makes it fast to query. Dashboards can reflect new activity in
> near real time, even when the work is spread across dozens of sessions.

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
