<h1 align="center">GitSense Chat</h1>

<h3 align="center">Same agents. More possibilities.</h3>

<p align="center">
  <a href="#quick-start">Quick start</a> &nbsp;·&nbsp;
  <a href="README-previous.md#runtime-details">Runtime details</a> &nbsp;·&nbsp;
  <a href="#keep-working-in-your-terminal-collaborate-in-gitsense-chat">Work together</a> &nbsp;·&nbsp;
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

You can also [build the CLI from source](https://github.com/gitsense/gsc-cli). See [Runtime details](README-previous.md#runtime-details) for Pi setup and bringing in sessions from other agents.

## Plan a pizza party with Claude Code, Codex and Pi

Give your agents a checklist and ask them to suggest an order. Adjust the selections yourself, then bring in another agent to review them.

<img src="assets/readme-v2/pizza-setup-placeholder.png" alt="Video placeholder for the Pizza Party workflow in GitSense Chat." width="100%">

*Video placeholder. Recording to come.*

[Learn how to design your own workflow with Workflow Builder](https://github.com/gitsense/workflows/blob/main/workflow-builder/README.md).

## Keep working in your terminal. Collaborate in GitSense Chat.

Create a Group in GitSense Chat to give yourself and your agents a shared workspace. It's like a breakout room with whiteboards you can talk to. Ask your agent in its terminal to update a table or show a different diff, then see the change in Chat.

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

<img src="assets/agents-in-their-terminals.png" alt="Four terminal panes showing Claude Code with the prompt to create Beyond tabs and panes, and Pi, Codex, and OpenCode with the prompt to join btp." width="100%">

Then organize the Group in a way that makes sense to you. Name your sections, arrange the cards, and choose how to display them.

<table>
  <tr>
    <td width="33%" valign="top"><a href="assets/beyond-tabs-and-panes-home.png"><img src="assets/beyond-tabs-and-panes-home.png" alt="Group Home with stock metrics above the diff, source file, and reorder table." width="100%"></a><br>Home</td>
    <td width="33%" valign="top"><a href="assets/beyond-tabs-and-panes-focus.png"><img src="assets/beyond-tabs-and-panes-focus.png" alt="Focus view showing just the reorder table and code diff side by side." width="100%"></a><br>Focus</td>
    <td width="33%" valign="top"><a href="assets/beyond-tabs-and-panes-tiles.png"><img src="assets/beyond-tabs-and-panes-tiles.png" alt="Tiles view showing all four agent cards in a two-by-two grid." width="100%"></a><br>Tiles</td>
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
