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

| **1. Find** | **2. Ask AI** | **3. Start** |
| :---: | :---: | :---: |
| Search sessions by what you know: message content, files, and the operations that touched them. | Narrow the results, then ask AI to review the checkpoints and rank the sessions that best match. | Resume the strongest candidate, explain what you are working on, and give it the context needed for a head start. |
| ![Placeholder for finding sessions by file activity.](assets/session-insight-placeholder.svg) | ![Placeholder for asking AI to rank sessions by checkpoint evidence.](assets/session-insight-placeholder.svg) | ![Placeholder for starting a session with context from prior work.](assets/session-insight-placeholder.svg) |
| Find the sessions that worked on the problem. | Turn a shortlist into a reasoned recommendation. | Begin with relevant work instead of starting from zero. |

[Watch the complete video](assets/leverage-what-was-done-demo.mp4)

### Build scalable domain experts

Whether a domain contains one hundred files or one million, GitSense Chat is
designed to help humans and agents reason efficiently with shared, queryable
knowledge. Brains give every agent a better starting point without requiring
each one to rediscover the entire corpus.

In the video, a domain expert maps the 4,878-file `smart-codex` repository and
coordinates four focused helpers. Each helper uses the existing `code-intent`
Brain to understand a coherent part of the repository, while the lead keeps
a compact map of who knows what and routes new questions to the right agents.

| **1. Scout** | **2. Assign** | **3. Share** |
| :---: | :---: | :---: |
| Create a temporary planning agent to inspect the repository and Brain metadata, then recommend coherent domains and a helper count. | Create the helper agents and have the domain lead initialize each one with a focused role and scope. | Ask the domain lead a question and let it route the request to the helpers with the relevant knowledge. |
| ![Placeholder for scouting a large repository with a planning agent.](assets/session-insight-placeholder.svg) | ![Placeholder for assigning focused domains to helper agents.](assets/session-insight-placeholder.svg) | ![Placeholder for routing a question through a domain lead.](assets/session-insight-placeholder.svg) |
| The scout helps plan the knowledge team without becoming part of it. | Each helper builds knowledge about one coherent part of the domain. | The lead combines established findings and consults only when more detail is needed. |

[Watch the complete video](assets/build-scalable-domain-experts-demo.mp4)

#### Try it yourself

The video uses the 4,878-file `smart-codex` repository, but the same workflow
can be used with any repository that has a `code-intent` Brain. Follow
[pi-brains](https://github.com/gitsense/pi-brains) to prepare the integration.

<!-- Replace MM:SS and #t=SECONDS after the final video edit. -->

- **[MM:SS · Scout](assets/build-scalable-domain-experts-demo.mp4#t=SECONDS).**
  Create a domain lead and a temporary scout outside the knowledge team. Ask
  the scout to inspect the repository structure and available Brain metadata.

- **[MM:SS · Assign](assets/build-scalable-domain-experts-demo.mp4#t=SECONDS).**
  Review the scout's recommendation, create the helper sessions, and have the
  lead initialize each helper with a focused domain and role.

- **[MM:SS · Share](assets/build-scalable-domain-experts-demo.mp4#t=SECONDS).**
  Ask the domain lead a question. It should answer from established knowledge
  or route the question to the helpers with the relevant context.

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
