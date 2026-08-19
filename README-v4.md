# GitSense: Chat

**Human ↔ AI**

Give every AI conversation a better starting point.

GitSense Chat is a human-agent collaboration platform that turns past agent
work, human expertise, and repository knowledge into shared context. Build on
what is already known, then give each task the context and expertise it needs.

Start with the session logs you already have. GitSense Chat can make them
searchable, inspectable, and easy to organize while they are active and after
they stop.

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
Insights, checkpoints, shared knowledge, messaging, and lead agents work
together.

GitSense knowledge is not tied to Pi. Any agent that can run `gsc` can query the
same Brains, notes, lessons, and rules.

## Give every AI conversation a better starting point

GitSense Chat brings people, sessions, and repository knowledge into one shared
workspace. Use what has already been learned, then organize large domains into
focused context that people and agents can use.

### Leverage what was done

Find relevant sessions, understand what they established, and carry the useful
context into the next conversation.

Build on sessions from your own work, your team, or public sessions you can
access. Useful context does not have to start in the current conversation.

| **Find** | **Review** | **Investigate** |
| :---: | :---: | :---: |
| Search sessions by what you know: message content, files, and the operations that touched them. | Add a lead agent and ask it to review the matched sessions using token-efficient context like checkpoints and Brains. | Explain what you need and ask the lead which sessions bring the right context into the conversation. |
| ![Find sessions by file activity.](assets/find-sessions-by-file-activity.png) | ![Review matched sessions with a lead agent.](assets/review-sessions-with-lead-agent.png) | ![Investigate which sessions bring the right context.](assets/investigate-right-context-sessions.png) |
| The sessions that worked on the problem surface with the evidence that matched. | The lead organizes the matches into a layout you can apply to the group. | The lead digs into checkpoints and Brains and proposes the sessions that matter. |

| **Update team** | **Consult** | **Start** |
| :---: | :---: | :---: |
| Apply the lead's click-to-copy roster JSON to pull the right agents into the group. | With the fuller team in the group, ask what you should know before building. | Start a new session, explain what you want, and have it message the relevant agents for a quick primer. |
| ![Update the team from the lead's roster report.](assets/update-team-roster-report.png) | ![Consult the updated team on what to know.](assets/consult-updated-team.png) | ![Start a new session primed by relevant agents.](assets/start-primed-session.png) |
| The board grows with the agents the next session will need. | The experts surface the gotchas and constraints that matter. | The next conversation begins with context from the work before it. |

Watch the videos: [Find](assets/find-demo.mp4) · [Review](assets/review-demo.mp4) · [Investigate](assets/investigate-demo.mp4) · [Update team](assets/update-team-demo.mp4) · [Consult](assets/consult-demo.mp4) · [Start](assets/start-demo.mp4)

### Reason with the context that matters

Use shared knowledge and focused agents to make large domains manageable, so
each task starts with relevant context instead of the entire corpus.

![Video placeholder for distributing repository knowledge across focused agents.](assets/lead-agent-team-building-video-placeholder.svg)

### Beyond sessions

Session logs show what happened. Repository knowledge helps explain what it
means. Brains, lessons, notes, rules, and custom analyzers can connect session
activity to file purpose, ownership, risk, tests, and other domain knowledge.

A domain expert can use that context with checkpoints to build a repository-
aware map of prior work. This gives future questions a better starting point
than filenames or transcripts alone.

The [smart-ripgrep example](https://github.com/gitsense/smart-ripgrep) shows how
a repository can ship its knowledge and Session Insight analyzers beside its
code.

## How GitSense Chat works

GitSense Chat gives agent sessions a shared home without changing how agents
work. It uses the logs they already produce, making sessions searchable,
inspectable, and easy to organize while they are active and after they stop.

![GitSense Chat brings existing coding-agent sessions into one searchable, reusable workspace.](assets/same-sessions-more-useful.png)

| With the logs you already have | With optional runtime integration |
| :--- | :--- |
| Search messages, files, operations, and activity | See which agents are running |
| Inspect tool calls, changes, Git state, and checkpoints | Start an eligible stopped session |
| Create custom Session Insight views | Send messages through agent mailboxes |
| Group and organize sessions | Coordinate a group through a lead agent |
| Copy resume and attach commands | Receive messages in the agent's existing interface |

### Current support and boundaries

Pi is currently the supported runtime integration. Codex, Claude Code,
OpenCode, and other coding-agent harnesses are not yet integrated.

GitSense Chat surfaces evidence and supports action. It does not decide whether
an agent's work is correct, and agent findings do not automatically become
trusted knowledge. People remain responsible for reviewing evidence, resolving
uncertainty, and deciding what happens next.

## Scaling AI collaboration

GitSense Chat works alongside your existing workflow. It keeps sessions
searchable, uses checkpoints to scan many sessions without loading every
transcript, enriches activity with the context you define, and lets groups and
lead agents coordinate work. People and agents can pull in the detail they need
without interrupting every running session.

### Management: bring many sessions together

Bring independently created sessions together and give the group a lead agent.
Ask about the work, consult existing agents, resume useful sessions, and create
new agents only when relevant knowledge or capacity is missing.

### Checkpoints: quickly understand which sessions matter

Checkpoints capture the current state of a session, including its goal,
understanding, decisions, risks, files, and next action. GitSense Chat can scan
these compact records across dozens or hundreds of sessions without loading
every transcript, then identify which sessions are worth opening or resuming.
When more evidence is needed, the full session remains available.

### Insights: choose the views and signals needed for review

Create Session Insight views around the questions that matter to you. Condense
a long timeline, review changes, check ownership or risk, verify whether a
command ran, and connect the evidence to actions.

### Knowledge: preserve expertise and findings for future work

Combine human domain expertise with useful findings gathered through agent
work. Brains, lessons, notes, and rules make that knowledge available to people
and agents when it applies.

## License

The [`gsc` CLI](https://github.com/gitsense/gsc-cli) is open source under the
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

GitSense Chat is licensed under the
[Fair Core License (FCL-1.0-ALv2)](https://fcl.dev/). You may use, modify, and
run it internally, including for personal projects, shared workflows, and
self-hosted deployments. You may not use it to build or operate a product or
service that competes directly with GitSense Chat. Each version becomes
available under Apache 2.0 two years after its release. See [LICENSE](LICENSE)
and [NOTICE](NOTICE) for the complete terms.
