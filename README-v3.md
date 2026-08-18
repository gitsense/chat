# GitSense: Chat

**Human ↔ AI**

GitSense Chat is a human-agent collaboration platform. It brings new and
existing agent sessions together with human expertise and knowledge gathered
through agent work, so people and agents can build on what is already known.

## Start with a lead agent, then build a team around the problem

Start with the problem instead of an empty team. A lead agent can find relevant
work, rank potential contributors, and help you reuse existing context before
creating more agents.

![Video placeholder for the complete lead-agent team-building workflow.](assets/lead-agent-team-building-video-placeholder.svg)

The video follows one collaboration from beginning to end:

1. **Create a lead agent.** Choose a model suited to planning, synthesis, and
   coordination. Use less expensive models for bounded work when appropriate.
2. **Explain the problem.** Describe the outcome and constraints, then ask the
   lead to propose a name and description for the group.
3. **Scout.** Rank relevant sessions using their work, checkpoints, freshness,
   and current state. Show the evidence behind each recommendation.
4. **Plan and execute.** Add the strongest candidate, resume it, and ask whether
   it is a good fit. Create new agents only for the gaps that remain.
5. **Review.** Bring the evidence, disagreements, risks, and open questions back
   together. Preserve useful knowledge for the next collaboration.

<!-- Add timestamp links to the five steps when the final video is published. -->

## Quick Start

Review the [install script](install.sh), then install `gsc`:

```bash
curl https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

Or [build it yourself](https://github.com/gitsense/chat).

### Ask your coding agent

```text
Install and configure GitSense Chat for me. Start by running `gsc docs help`.
```

Your agent will guide you through the rest and stop when you need to enter an
API key privately. For detailed installation instructions, run:

```bash
gsc docs install
```

## Scaling AI collaboration

### Management: multiple sessions, one conversation

Bring independently created sessions together and give the group a lead agent.
Ask about the work, consult existing agents, resume useful sessions, and create
new agents only when relevant knowledge or capacity is missing.

### Insights: one session, multiple views

Create Session Insight views around the questions that matter to you. Condense
a long timeline, review changes, check ownership or risk, verify whether a
command ran, and connect the evidence to actions.

### Knowledge: past work, better starting point

Combine human domain expertise with useful findings gathered through agent
work. Brains, lessons, notes, and rules make that knowledge available to people
and agents when it applies.

## How GitSense Chat works

### Same sessions. One home.

GitSense Chat uses the session logs your agents already create. Sessions remain
searchable and useful while agents are active and after they stop.

![GitSense Chat brings existing coding-agent sessions into one searchable, reusable workspace.](assets/same-sessions-more-useful.png)

| With session logs | With optional lifecycle integration |
| :--- | :--- |
| Search messages, files, operations, and activity | See which agents are running |
| Inspect tool calls, changes, Git state, and checkpoints | Start an eligible stopped session |
| Create custom Session Insight views | Send messages through agent mailboxes |
| Group and organize sessions | Coordinate a group through a lead agent |
| Copy resume and attach commands | Receive messages in the agent's existing interface |

### Add the context that matters

GitSense Chat can connect session and file activity to repository purpose,
ownership, risk, tests, lessons, policies, and other user-defined knowledge.
Custom analyzers can turn that context into focused views, reports, and
user-confirmed actions.

The [smart-ripgrep example](https://github.com/gitsense/smart-ripgrep) shows how
a repository can ship its knowledge and Session Insight analyzers beside its
code.

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
