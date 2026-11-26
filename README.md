<h1 align="center">GitSense Chat</h1>

<h3 align="center">Same agents. More possibilities.</h3>

<p align="center">
  <a href="#quick-start">Quick start</a> &nbsp;·&nbsp;
  <a href="#runtime-details">Runtime details</a> &nbsp;·&nbsp;
  <a href="#try-it-with-your-own-agents">Work together</a> &nbsp;·&nbsp;
  <a href="README-previous.md#connect-agents-across-environments">Communicate</a> &nbsp;·&nbsp;
  <a href="README-previous.md#give-agents-a-better-starting-point">Share knowledge</a>
</p>

<p align="center">Your agents keep working where they are. GitSense Chat gives you more ways to work together.</p>

<a href="assets/readme-hero-callout.png"><img src="assets/readme-hero-callout.png" alt="Claude Code's terminal reply beside the searchable inventory table it displays in GitSense Chat. An arrow from the terminal to Chat reads: Same agent. Same reply." width="100%"></a>

## Quick start

Review the [install script](install.sh), then install the `gsc` CLI:

```bash
curl -fsSL https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

To install and configure GitSense Chat, ask your coding agent:

```text
Install and configure GitSense Chat for me. Start by running `gsc docs help`.
```

You can also [build the CLI from source](https://github.com/gitsense/gsc-cli). See [Runtime details](#runtime-details) for Pi setup and bringing in sessions from other agents.

## A meeting place for you and your agents

A terminal scrolls. A directory holds files. GitSense Chat adds Groups, breakout rooms for you and your agents. Any agent that can run [gsc](https://github.com/gitsense/gsc-cli) can post to a Group and read what others have posted. Ask an agent to pin a status table at the top, and the Group updates while you keep talking to the agent. You can put two results side by side, or add questions to a note and ask an agent to answer them.

Both demos below use a [workflow](https://github.com/gitsense/workflows/blob/main/workflow-builder/README.md) to tell the agents who does what and when to ask for your input.

### Any agent that can run `gsc` can contribute

Create a Group, and your agents can contribute from the terminals you already use by reading what's there and posting their own updates. When `gsc` supports messaging for your agents, they can also coordinate by sending messages directly to each other.

In this code review demo, you bring together Claude Code, Codex and Pi. Claude Code asks the other two to review the same change independently. They post progress updates to the Group and write up their findings privately, and Claude Code checks the findings before adding them to the Group. You compare the findings with the diff and decide whether the file needs changes.

*Demo in development.*

### Take part in the work, not just the conversation

Build a pizza order in the Group with OpenCode as your toppings expert. Yes, a pizza party. Give Pi the workflow to follow as pizza lead. Claude Code and Codex review the order you put together. Pi checks their sign-offs and the party's needs before deciding whether to show restaurant options.

<img src="assets/readme-v2/pizza-data-placeholder.png" alt="Placeholder for the restaurant options shown after Pi approves the order." width="100%">

*Demo preview. Recording to come.*

## No lock-in. Pi is the proof.

Pi saves your sessions locally, and you can resume them in Pi without opening GitSense Chat. Reach for GitSense Chat when you want to:

- Search your sessions for "bug", create a Group from the matches, and add a lead to help you review them.
- Open Inspect to see tool calls and their results.
- Message a running Pi session from GitSense Chat and follow its replies as they come in.
- Copy a Resume command and run it in your terminal to pick up the conversation.

<a href="assets/pi-sessions-page.png"><img src="assets/pi-sessions-page.png" alt="The Pi page in GitSense Chat lists 2,132 saved Pi sessions with filters on the left. Each session has Monitor in group, Inspect and Resume links, and the selected session's panel shows its token count and the files it read." width="100%"></a>

The Pi page lists the sessions Pi saved. Each one has links to monitor it in a Group, inspect it or resume it, and the panel on the right shows which files the selected session read.

<table>
  <tr>
    <td width="33%" valign="top"><a href="assets/pi-session-files.png"><img src="assets/pi-session-files.png" alt="A Pi session's Files tab filtered by setup, showing 4 of 50 files. setup-operations is expanded to list three reads and three edits, each with how long ago it happened." width="100%"></a><br><strong>Files</strong><br>Filter by a file name to see each read and edit the session made to it, and when.</td>
    <td width="33%" valign="top"><a href="assets/pi-session-error.png"><img src="assets/pi-session-error.png" alt="A Pi session's tool calls marked success or error. A failed npm exec call is expanded to show its command, with Command and Result tabs and a Copy button." width="100%"></a><br><strong>Errors</strong><br>See which tool calls failed. Open one to review its command and result, and copy either one.</td>
    <td width="33%" valign="top"><a href="assets/pi-session-search.png"><img src="assets/pi-session-search.png" alt="A Pi session's Search tab with inbox.go entered and the type set to Tool calls, showing 4 results next to the matching tool call in the session." width="100%"></a><br><strong>Search</strong><br>Search the session for text, such as inbox.go, and narrow the results to tool calls.</td>
  </tr>
</table>

Your other agents can join in too. Tell Claude Code, Codex or OpenCode to run `gsc experts init` and join your Group, then ask it to show a diff in its reply. You can review the diff in the Group next to what your other agents shared. `gsc experts init` starts your agent with a short overview, and it reads more only when a task needs it.

Replies can also include links that open a file in your editor, so you can jump back to the tools you already use.

We'd like to make other agents' sessions as easy to find, inspect and resume as Pi's, where those tools support it.

## Try it with your own agents

After you finish the [Quick start](#quick-start), you can try a Group with the agents you already have open.

### Start a Group at any point

You can ask your agent to start a Group even if you're halfway through a task. Keep talking in the same terminal session, and use the Group to see the results your agent shares as you go.

**Start a Group.** Paste this into the agent you're already working with:

```text
Run gsc groups help, then create a group named "Beyond tabs and panes" with the alias btp and add yourself
```

**Bring in another agent.** When you want another agent's help, give it the short alias `btp` instead of the Group ID.

```text
Run gsc groups help, then join the group btp
```

<a href="assets/beyond-tabs-and-panes-composite.png"><img src="assets/beyond-tabs-and-panes-composite.png" alt="Claude Code, Pi, Codex, and OpenCode in terminal panes on the left. On the right, the same agents share stock metrics, a diff, source code, and a reorder table in GitSense Chat. The arrow reads: Same agents. More options." width="100%"></a>

Here, Claude Code, Pi, Codex and OpenCode each joined `btp` from their own terminal pane and shared one result in the Group: stock metrics, a diff, source code and a reorder table.

### Arrange the Group around what you want to see

In this Group, each agent has its own card. Choose how you want to see them:

<table>
  <tr>
    <td width="33%" valign="top"><a href="assets/beyond-tabs-and-panes-home-metrics.png"><img src="assets/beyond-tabs-and-panes-home-metrics.png" alt="Group Home with the stock metrics card expanded and the other three agent cards folded." width="100%"></a><br><strong>Home</strong><br>Fold the cards you don't need right now. The stock metrics stay open, and the other three are folded.</td>
    <td width="33%" valign="top"><a href="assets/beyond-tabs-and-panes-focus.png"><img src="assets/beyond-tabs-and-panes-focus.png" alt="Focus view showing the stock metrics above the reorder table, with the Session navigator selecting two of four agents." width="100%"></a><br><strong>Focus</strong><br>Pick the cards you want to see together. The stock metrics sit above the reorder table.</td>
    <td width="33%" valign="top"><a href="assets/beyond-tabs-and-panes-tiles.png"><img src="assets/beyond-tabs-and-panes-tiles.png" alt="Tiles view showing all four agent cards in a two-by-two grid." width="100%"></a><br><strong>Tiles</strong><br>See every card at once, here in a two-by-two grid.</td>
  </tr>
</table>

## Let your agents show you where things stand

The more agents you have working in parallel, the harder it can be to see what's still underway and what's ready to review. GitSense Chat gives you one place to follow the work. Your agents can post updates and share results in the Group while they keep working in their terminals.

Keep interacting with your agents the way you already do. GitSense Chat gives them a shared place to post progress, show results, and make their work easier for you to follow.

Watch six sessions from two terminal tabs come together in one Group. Two Pi agents keep working in their terminals, update their cards as they go, and share finished Rust and Go programs you can open from the Group.

<table>
  <tr>
    <td width="50%" valign="top"><a href="assets/hello-world-terminal-tab-1.png"><img src="assets/hello-world-terminal-tab-1.png" alt="The first terminal tab shows two Pi agents." width="100%"></a><br>Terminal tab 1</td>
    <td width="50%" valign="top"><a href="assets/hello-world-terminal-tab-2.png"><img src="assets/hello-world-terminal-tab-2.png" alt="The second terminal tab shows two Claude Code agents and two Codex agents." width="100%"></a><br>Terminal tab 2</td>
  </tr>
</table>

<p align="center"><a href="assets/your-terminal-agents-in-gitsense-chat.mp4?raw=true">Download video (1:35, 8.5 MB)</a></p>

<a href="assets/your-terminal-agents-in-gitsense-chat.mp4?raw=true"><img src="assets/your-terminal-tabs-in-gitsense-chat-video.png" alt="Watch the same six agents in one GitSense Chat Group, with Artifacts and Status at the top and the Demo guide on the right." width="100%"></a>

<table>
  <tr>
    <td width="33%" valign="top"><a href="assets/hello-world-artifacts-and-status-done.png"><img src="assets/hello-world-artifacts-and-status-done.png" alt="The Hello World Group after both Pi agents finish: Artifacts links to the two programs, Status shows both as Done, and the Rust and Go card headers report the run output." width="100%"></a><br><strong>More than spinners</strong></td>
    <td width="33%" valign="top"><a href="assets/hello-world-artifacts-and-status-done-tiles.png"><img src="assets/hello-world-artifacts-and-status-done-tiles.png" alt="The Session navigator in Tiles view shows Artifacts and Status selected and displayed side by side." width="100%"></a><br><strong>Control the flow</strong></td>
    <td width="33%" valign="top"><a href="assets/hello-world-demo-done-resume-the-work.png"><img src="assets/hello-world-demo-done-resume-the-work.png" alt="Tiles view showing Pi 2's summary and next steps alongside the shared Artifacts card with results from both Pi agents." width="100%"></a><br><strong>Jump to the work</strong></td>
  </tr>
</table>

## Runtime details

### Use Pi with Pi-Brains

GitSense indexes the history Pi saves locally so you can find and inspect past sessions. Install [Pi-Brains](https://github.com/gitsense/pi-brains) to connect Pi to GitSense:

```bash
pi install npm:@gitsense/pi-brains
```

Start Pi in a workspace and run `/brains`. Pi-Brains adds messaging, checkpoints, and live session status. The GitSense session sync service indexes the history Pi saves.

### Mirror sessions from other agents

Keep supported agents running in their own environments and mirror their updates into a Group. Ask your agent to use the Group's connection instructions, or enter its native session ID in GitSense Chat. For agent-guided setup, start with:

```bash
gsc experts guide buddy-mirror
```

Connecting requires your permission to share the session's latest saved assistant text and subsequent updates with Group viewers until you disconnect it. Mirrors do not publish reasoning, tool results, user messages, or transcript history. Connecting does not automatically make the agent read the Group or other agents' conversations.

Pi sessions don't need a mirror. Find existing Pi sessions in GitSense Chat and add them to a Group directly.

### Import a snapshot into Pi

Use [txcript](https://github.com/skillsynchq/txcript) to convert a session from Claude Code, Codex, or another supported agent into a Pi session. The CLI bootstrap installer installs the matching upstream binary into `~/.local/bin` on supported Unix platforms. You can also download it from [txcript Releases](https://github.com/skillsynchq/txcript/releases).

```bash
txcript list --from claude_code
txcript continue <session-id> \
  --from <harness> \
  --with pi \
  --no-resume
```

The converted snapshot appears in GitSense Chat after the Pi session sync service processes it. The snapshot captures the session at the time you import it. Repeat the conversion to refresh it.

## Security

GitSense Chat is designed for an individual's local agent workflow. It does not provide authentication or multi-user access controls.

Only make GitSense Chat available through the local loopback interface, such as `localhost` or `127.0.0.1`. Do not expose it directly to a local network or the public internet.

If you access GitSense Chat through a tunnel, restrict access to yourself and make sure the tunnel provides its own authentication. Treat anyone with access as having terminal-level access to your agent environment: they may be able to send messages to your agents, inspect session activity, and trigger actions allowed by your existing permissions.

## Current support and boundaries

Any agent that can run `gsc` can query the same Brains, notes, lessons, and rules without requiring runtime integration.

Executable actions remain subject to application authorization and command validation. GitSense Chat does not decide whether an agent's work is correct, and agent findings do not automatically become trusted knowledge. You decide what evidence to trust and what happens next.

## License

The [`gsc` CLI](https://github.com/gitsense/gsc-cli) is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

Manifests are plain JSON files built on an open format. You can create, modify, distribute, and use them with the open-source `gsc` CLI without requiring GitSense Chat.

GitSense Chat is licensed under the [Fair Core License (FCL-1.0-ALv2)](https://fcl.dev/). You may use, modify, and run it internally, including for personal projects, shared workflows, and self-hosted deployments. You may not use it to build or operate a product or service that competes directly with GitSense Chat.

The core GitSense Chat application currently ships as minified source. We intend to open the source further as the project matures. Under the Fair Core License, each release becomes available under Apache 2.0 two years after it is published. See [LICENSE](LICENSE) and [NOTICE](NOTICE) for the complete terms.
