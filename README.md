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

### Many agents, one view

When your agents are spread across terminal tabs or workspaces, you can see them together in a Group while they keep working where they are.

<table>
  <tr>
    <td width="50%" valign="top"><a href="assets/hello-world-terminal-tab-1.png"><img src="assets/hello-world-terminal-tab-1.png" alt="The first terminal tab shows two Pi agents." width="100%"></a><br>Terminal tab 1</td>
    <td width="50%" valign="top"><a href="assets/hello-world-terminal-tab-2.png"><img src="assets/hello-world-terminal-tab-2.png" alt="The second terminal tab shows two Claude Code agents and two Codex agents." width="100%"></a><br>Terminal tab 2</td>
  </tr>
</table>

<img src="assets/your-terminal-tabs-in-gitsense-chat-video.png" alt="Video preview: the same six agents in one GitSense Chat Group, with Artifacts and Status at the top and the Demo guide on the right." width="100%">

*Video preview. Recording to come.*

<table>
  <tr>
    <td width="33%" valign="top"><img src="assets/readme-v2/hello-world-assignments-still-placeholder.png" alt="Screenshot placeholder for the two Pi cards showing their Rust and Go assignments." width="100%"><br><strong>Recognize the work</strong><br>Rust and Go avatars show each Pi agent's assignment.</td>
    <td width="33%" valign="top"><img src="assets/readme-v2/hello-world-progress-still-placeholder.png" alt="Screenshot placeholder for the shared Status table showing one agent compiling and the other running its program." width="100%"><br><strong>Follow progress</strong><br>Agents post updates in the shared Status table.</td>
    <td width="33%" valign="top"><img src="assets/readme-v2/hello-world-results-still-placeholder.png" alt="Screenshot placeholder showing a finished program and its run output in Artifacts." width="100%"><br><strong>Find the results</strong><br>Open finished programs or read their output in Artifacts.</td>
  </tr>
</table>

## Keep using the tools you know

Start in Chat, then keep working in the tools you already use. When an agent shares a file, diff, or table, you can look it over in Chat and open it in an app you've set up.

*Video placeholders. Short clips to come.*

<table>
  <tr>
    <td width="33%" valign="top"><img src="assets/readme-v2/acme-open-file-clip-placeholder.png" alt="Video placeholder: the ACME source file in Chat and in an editor." width="100%"><br><strong>Open a file</strong><br>Find the stock calculation in your editor.</td>
    <td width="33%" valign="top"><img src="assets/readme-v2/acme-open-diff-clip-placeholder.png" alt="Video placeholder: the same ACME comparison in Chat and Zed." width="100%"><br><strong>Open a diff</strong><br>Read the lines around the change in Zed.</td>
    <td width="33%" valign="top"><img src="assets/readme-v2/acme-open-table-clip-placeholder.png" alt="Video placeholder: the ACME inventory CSV in Chat and in a spreadsheet app." width="100%"><br><strong>Open a table</strong><br>Sort by Days of Stock in your spreadsheet.</td>
  </tr>
</table>

## Define how you and your agents can work together

Is AI overkill for a pizza party? Probably, but it's a familiar task for seeing how you, your agents and programs can work together in GitSense Chat. Start with pizza, then imagine your next code review, product launch or root cause analysis.

<!-- Draft layout: these are placeholder images, not playable videos. Replace with verified recordings and check captions before publication. -->

### Create your collaboration space

Agents need context, and so do you. Start the pizza party workflow and bring in your agents. Explore the available choices, then give each agent the saved information it needs for its part.

<img src="assets/readme-v2/pizza-setup-placeholder.png" alt="Video placeholder: Create your collaboration space. Start the pizza party workflow and bring in your agents." width="100%">

Explore what you can do next:

<table>
  <tr>
    <th width="50%">Work with the Steps agent</th>
    <th width="50%">Plan with an expert</th>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="assets/readme-v2/pizza-steps-placeholder.png" alt="Video placeholder: Work with the Steps agent." width="100%">
      <p>Edit the checklist yourself, then ask its agent to read your changes and help refine it.</p>
    </td>
    <td width="50%" valign="top">
      <img src="assets/readme-v2/pizza-expert-placeholder.png" alt="Video placeholder: Plan with an expert." width="100%">
      <p>Ask the expert to choose toppings, size and quantity, then review and adjust the selections directly in the builder.</p>
    </td>
  </tr>
  <tr>
    <th width="50%">Get another perspective</th>
    <th width="50%">Talk to your data</th>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="assets/readme-v2/pizza-reviews-placeholder.png" alt="Video placeholder: Get another perspective." width="100%">
      <p>Read each agent's review in its own pane, with their sign-offs recorded in Your Order.</p>
    </td>
    <td width="50%" valign="top">
      <img src="assets/readme-v2/pizza-data-placeholder.png" alt="Video placeholder: Talk to your data." width="100%">
      <p>Ask about restaurants and get recommendations in a new column beside each restaurant.</p>
    </td>
  </tr>
</table>

The restaurants in this demo are fictional. No order is placed.

What would you spread out, and where would you bring an agent in? [Workflow Builder](https://github.com/gitsense/workflows/blob/main/workflow-builder/README.md) can help you design your own workflow.
