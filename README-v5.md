# GitSense: Chat

**Turn session logs into insights. Make knowledge reusable. Give every agent a better starting point.**

GitSense Chat works with the logs your agents already create and the knowledge
around your work. Turn sessions into useful views, build focused knowledge
around repositories, pull requests, and domains, and make it available to every
agent that needs it. Your workflow does not have to change. GitSense Chat gives
you more ways to understand the work, reuse what was learned, and decide what
happens next.

![Placeholder for a GitSense Chat workspace showing session search, organized groups, Session Insights, and reusable knowledge.](assets/hero-workspace-placeholder.svg)

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

## Resume Faster.

**Find your sessions by more than a name.**

Scan a dozen sessions and their last messages in seconds to see what each was
about. No transcripts to open or sessions to click through. If the name is not
enough, search messages or files touched. If you remember the goal but not the
words, use checkpoints to ask an agent which sessions match the intent.

| **Review quickly** | **Search what you remember** | **Ask by intent** |
| :---: | :---: | :---: |
| Scan the latest message and checkpoint without opening every transcript. | Search conversations, files, and the operations that touched them. | Ask AI which sessions best match the work you want to continue. |
| ![Session cards showing recent messages and checkpoint notes.](assets/session-insight-placeholder.svg) | ![Session search results matched by message content and file activity.](assets/session-insight-placeholder.svg) | ![An agent ranking matching sessions from checkpoint evidence.](assets/session-insight-placeholder.svg) |

### Stay organized

A session name is a start. Add a lead agent and ask it to give your sessions a
clearer identity with personas, titles, descriptions, and tags. It can use
checkpoints to understand what each session is working on, choose avatars that
fit their roles, and organize related sessions into sections.

![Placeholder for the persona editor showing an agent lead assigning session personas, avatars, titles, descriptions, and tags.](assets/stay-organized-persona-editor-placeholder.svg)

> Review my 20 most recent sessions. Use their latest checkpoints to understand
> each session’s work. Suggest a persona, avatar, title, description, and tags
> for each one. Group related sessions into sections and put anything unclear
> in “Needs review.”

Checkpoints give the search enough context to compare many sessions without
loading every conversation. The full transcript is still there when you need
more evidence.

## `/goal`, But Better.

**Set a goal. Give it a team. See how the work is going.**

A harness-level `/goal` keeps one agent working toward an objective. GitSense
Groups turn that private execution loop into a visible management loop. Create
a group with a lead and as many focused agents and configurations as the work
requires. Define the goal with the lead, then let it coordinate responsibilities,
handoffs, and progress across the group.

| **Give the goal a team** | **See the latest status** | **Protect reasoning quality** |
| :---: | :---: | :---: |
| Use focused agents with different roles, tools, and model configurations. | Open the group report to review progress, blockers, evidence, and what happens next. | Monitor every agent's context usage and intervene before it leaves a safe region for effective reasoning. |

`/goal` reduces the need to prompt one agent between turns. GitSense Groups
reduce the need to manage every agent separately. The latest report is a
generated snapshot of the group's work, while live session signals let you
monitor the agents as they continue.

**`/goal` for a team of agents, with the visibility to trust it.**

## Same Sessions. More Useful.

**One prompt. 52 tool calls. Now what?**

A session log records what happened, but that does not make it easy to review.
Important files, decisions, risks, and lessons can stay buried inside messages,
commands, and tool calls.

Session Insights turn the same log into focused views built around the questions
you care about. Create an outline, review changed files, check ownership or
risk, verify that a command ran, or connect the evidence to an action.

![One agent session shown through several focused Session Insight views.](assets/one-session-multiple-views.png)

### Turn sessions into conversations

Bring related sessions into a group and arrange them around the work. The group
becomes a dashboard you can talk to. Reference a section by name, ask what an
agent is working on, or request a report across everything that is not done.

**Bring your sessions together**

Create a group to organize sessions and see what is happening. Add a lead agent
to ask questions and coordinate the work.

![A lead agent generating a report across an organized group of sessions.](assets/chat-widget-team-report.png)

The lead works from the sessions and layout you chose. You do not have to find
and name every session again.

### Coordinate with ease.

**A group and a lead are all you need to get started.**

Tell the lead what you want to accomplish. It can help decide how many agents
are needed, define their responsibilities, organize them around the work, and
explain how they should collaborate. When you ask, the lead can create agents
and add or remove agents from the group as the workflow evolves.

A simple chain reaction makes the idea tangible: the lead starts the first
handoff, each agent performs a meaningful step and passes the result to the
next, and the completed result returns to the lead. The tracker layout makes
that sequence visible while you keep one conversation with the lead.

This model can grow much further. Leads from different groups can coordinate
with one another to organize larger systems of work. GitSense Chat does not
visualize those cross-group relationships yet, but the foundation is already
there: groups, leads, agent identities, messaging, and reusable sessions.

## Make Knowledge Reusable.

**What one agent learns should not stay in one transcript.**

GitSense Chat makes it easy to capture useful knowledge and put it to work
wherever it is needed next.

| | |
| :--- | :--- |
| **Brains** | Give agents structured, queryable knowledge about a repository or domain. |
| **Lessons** | Preserve discoveries that should not have to be rediscovered. |
| **Notes** | Record useful context and point agents to the source that matters. |
| **Rules** | Bring guidance and context into the conversation when it applies. |
| **Domain experts** | Organize large bodies of knowledge and route questions to focused agents. |

Capture what one session learns. Make it available across future sessions,
agents, repositories, and teams. This is how knowledge scales without asking
every agent to read every transcript or rediscover the same facts.

![GitSense Chat connects distributed sessions through shared knowledge, checkpoints, groups, and lead agents.](assets/distributed-sessions-shared-coordination.png)

## Keep the workflow you already have

GitSense Chat does not replace the terminals and tools where your agents work.
The core experience starts with the session logs you already have. Optional
runtime integration adds live status, messaging, and coordination.

| With session logs | With optional runtime integration |
| :--- | :--- |
| Find sessions by messages, files, and operations | See which agents are running |
| Review messages, tool calls, changes, and checkpoints | Start an eligible stopped session |
| Create focused Session Insight views | Send messages through agent mailboxes |
| Group and organize related sessions | Let agents communicate with one another |
| Copy resume and attach commands | Coordinate a group through a lead agent |

## How GitSense Chat works

GitSense Chat reads the session logs agents already produce and makes them
searchable, inspectable, and reusable while sessions are active and after they
stop. Analyzers can turn the recorded activity into Session Insights. Brains,
lessons, notes, and rules carry reviewed knowledge into future work.

Groups are views over sessions, not folders. A session can appear in every
project, workflow, dashboard, or temporary review where it is useful. Add a lead
when you want one conversation across the group.

### Current support and boundaries

Pi is currently the supported runtime integration. Codex, Claude Code,
OpenCode, and other coding-agent harnesses are not yet integrated.

GitSense Chat surfaces evidence and supports action. It does not decide whether
an agent's work is correct, and agent findings do not automatically become
trusted knowledge. People remain responsible for reviewing evidence, resolving
uncertainty, and deciding what happens next.

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
