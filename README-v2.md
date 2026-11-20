<h1 align="center">GitSense Chat</h1>

<h3 align="center">Same agents. More possibilities.</h3>

<p align="center">
  <a href="#quick-start">Quick start</a> &nbsp;·&nbsp;
  <a href="README-previous.md#runtime-details">Runtime details</a> &nbsp;·&nbsp;
  <a href="#give-yourself-and-your-agents-a-shared-workspace">Work together</a> &nbsp;·&nbsp;
  <a href="README-previous.md#connect-agents-across-environments">Communicate</a> &nbsp;·&nbsp;
  <a href="README-previous.md#give-agents-a-better-starting-point">Share knowledge</a>
</p>

<p align="center">Your agents keep working where they are. GitSense Chat gives you more ways to work together.</p>

<a href="hero-combined-gap-arrow.png"><img src="hero-combined-gap-arrow.png" alt="Codex and Claude Code in terminal panes beside their mirrored sessions in GitSense Chat, with an editable checklist, a searchable table, observer agents, and metric cards. The arrow reads: Same agents. More possibilities." width="100%"></a>

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

## Give yourself and your agents a shared workspace

Bring Claude Code and Codex into one Group, a shared space in GitSense Chat. Your agents stay in their own terminals. Their replies also appear in Chat, alongside the tables, notes, and diffs you work with together.

<img src="assets/readme-v2/work-together-overview-placeholder.png" alt="Layout preview: Claude Code and Codex in their native terminals on the left. In the Group on the right, Claude Code's mirrored reply sits beside an inventory table in the top row, and Codex's mirrored reply sits beside a file checklist and diff in the row below." width="100%">

*Video placeholders. Recordings to come.*

<table>
  <tr>
    <td width="38%" valign="middle">
      <h3>Claude Code - Inventory planner</h3>
      <p>Ask Claude Code to plan for seven days of stock, then say, "Make that ten days. Keep the daily-demand estimates unchanged." Claude reruns the calculation. You can check what needs reordering in the same table card without it printing every row in its reply.</p>
    </td>
    <td width="62%"><img src="assets/readme-v2/work-together-table-placeholder.png" alt="Video placeholder: Claude Code gets a request to plan for ten days of stock, and the inventory card shows the recalculated quantities." width="100%"></td>
  </tr>
  <tr>
    <td width="38%" valign="middle">
      <h3>Codex - Code reviewer</h3>
      <p>Check the files you want to review and choose Latest commit or Whole branch for each. Ask Codex to read your choices and show the changes. Change the scope or select another file, then ask Codex to update the same diff card.</p>
      <p>Use the diff menu to copy a command or open the comparison in your editor, depending on your setup.</p>
    </td>
    <td width="62%"><img src="assets/readme-v2/work-together-diff-placeholder.png" alt="Video placeholder: Codex uses saved file and scope choices from a checklist to update the diff card for hello.test.js." width="100%"></td>
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
