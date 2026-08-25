# GitSense: Chat

**A collaboration platform for people and AI agents.**

Give your agents clear roles, a lead, and a better starting point.

GitSense Chat gives people and agents a shared place to work by bringing
together the sessions and logs you and your team already have. Your agents can
keep working in their existing tools and workflows. GitSense Chat adds
visibility and coordination around the work they already produce.

Find, inspect, and organize sessions while agents work and after they stop,
then carry useful context into future tasks. You decide how much responsibility
agents take on; with your approval, they can share knowledge, delegate work,
wait for results, and coordinate what happens next.

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

## Give your agents a lead and a Pi Buddy

Connect compatible coding-agent sessions through Pi Buddies, then bring Pi
sessions and Buddies into one group with a lead.

| **1. Create a Pi Buddy** | **2. Give the group a lead** |
| :---: | :---: |
| Pair a compatible coding-agent session with a durable Pi identity for cross-agent messages and explicitly requested checkpoints. | Add Pi sessions and Pi Buddies to one group, then add a lead to organize the group and coordinate its work with your approval. |
| ![Placeholder for creating a Pi Buddy for an existing coding-agent session.](assets/session-insight-placeholder.svg) | ![Placeholder for giving a group of Pi sessions and Pi Buddies a lead.](assets/session-insight-placeholder.svg) |
| The native agent remains responsible for its work and replies. | From one conversation, the lead can ask members for information, wait for replies, and summarize what it learns. |

[Watch the complete video](assets/pi-buddy-and-lead-demo.mp4)

## Give every AI conversation a better starting point

GitSense Chat brings people, sessions, and repository knowledge into one shared
workspace. Use what has already been learned, then organize large domains into
focused context that people and agents can use.

### Leverage what was done

Find relevant sessions, understand what they established, and carry the useful
context into the next conversation.

Build on sessions from your own work, your team, or public sessions you can
access. Useful context does not have to start in the current conversation.

| **1. Find** | **2. Ask AI** | **3. Share** |
| :---: | :---: | :---: |
| Search sessions by what you know: message content, files, and the operations that touched them. | Narrow the results, then ask AI to review the checkpoints and rank the sessions that best match. | Give a new session the relevant context from the strongest candidate so it can get a head start. |
| ![Placeholder for finding sessions by file activity.](assets/session-insight-placeholder.svg) | ![Placeholder for asking AI to rank sessions by checkpoint evidence.](assets/session-insight-placeholder.svg) | ![Placeholder for sharing context from prior work with a new session.](assets/session-insight-placeholder.svg) |
| Find the sessions that worked on the problem. | Turn a shortlist into a reasoned recommendation. | Carry useful knowledge into the next conversation. |

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

| **1. Scout** | **2. Assign** | **3. Ask** |
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

- **[MM:SS · Ask](assets/build-scalable-domain-experts-demo.mp4#t=SECONDS).**
  Ask the domain lead a question. It should answer from established knowledge
  or route the question to the helpers with the relevant context.

## How GitSense Chat works

GitSense Chat gives agent sessions a shared home without changing how agents
work. It uses the logs they already produce, making sessions searchable,
inspectable, and easy to organize while they are active and after they stop.

![GitSense Chat brings existing coding-agent sessions into one searchable, reusable workspace.](assets/same-sessions-more-useful.png)

With session logs alone, GitSense Chat can make agent work searchable,
inspectable, organized, and reusable. With a supported runtime integration, it
can also see agent status, start eligible sessions, exchange messages, and
coordinate groups through lead agents.

### Current support and boundaries

Pi is currently the supported runtime integration. Codex, Claude Code,
OpenCode, and other coding-agent harnesses are not yet integrated.

GitSense Chat surfaces evidence and supports action. It does not decide whether
an agent's work is correct, and agent findings do not automatically become
trusted knowledge. People remain responsible for reviewing evidence, resolving
uncertainty, and deciding what happens next.

## Keep AI-assisted work understandable

As AI-assisted work spreads across more sessions, repositories, and people,
keeping track of what happened becomes a challenge of its own. GitSense Chat
brings independent sessions together, uses checkpoints to record where each
session stood, surfaces user-defined signals through Session Insights, and
makes recorded domain knowledge available to the people and agents working
next.

### Many sessions. One conversation.

Bring independently created sessions together and give the group a lead agent.
Ask about the work, consult existing agents, resume useful sessions, and create
new agents only when relevant knowledge or capacity is missing.

### Durable checkpoints. Efficient catch-up.

Checkpoints capture a session's state at a point in time, including its goal,
understanding, decisions, risks, files, and next action. Their freshness helps
show whether the summary still represents the session's later activity.
GitSense Chat can scan these compact records across dozens or hundreds of
sessions without loading every transcript, then identify which sessions are
worth opening or resuming. When more evidence is needed, the full session
remains available.

### See the forest, not just the trees.

Create Session Insight views around the questions that matter to you. Condense
a long timeline, review changes, check ownership or risk, verify whether a
command ran, and connect the evidence to actions.

### Brains make domain knowledge reusable.

Combine human domain expertise with useful findings gathered through agent
work. Brains, lessons, notes, and rules make recorded domain knowledge
available to people and agents when it applies.

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
