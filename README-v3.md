# GitSense: Chat

**Human ↔ AI**

GitSense Chat is a human-agent collaboration platform. It brings new and
existing agent sessions together with human expertise and knowledge gathered
through agent work, so people and agents can build on what is already known.

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

## Spread knowledge. Improve reasoning.

Let each agent focus on a manageable part of a large codebase or domain. The
lead combines their findings, keeps track of who knows what, and routes new
questions to the right agents.

![Video placeholder for building a domain expert from related agent sessions.](assets/lead-agent-team-building-video-placeholder.svg)

The video follows one knowledge-sharing workflow:

1. **Create a domain lead.** Start a group with a lead and several helper
   agents, then give the lead a clear question and scope.
2. **Divide the context.** Ask the lead to map the repository using available
   file-purpose metadata and assign meaningful areas to focused helpers.
3. **Combine the findings.** Each helper returns concise findings with evidence;
   the lead builds a map of who investigated what.
4. **Route a question.** Ask about one area and watch the lead involve the
   relevant helper instead of loading the entire repository or its transcripts.
5. **Connect the answers.** Ask a question that crosses two areas and watch the
   lead involve the right agents, combine their findings, and show the evidence.

The lead gains a compact working map through these handoffs. After reviewing the
findings, you can preserve selected knowledge as durable notes for future work.

<!-- Add timestamp links to the five steps when the final video is published. -->

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
