<h1 align="center">GitSense Chat</h1>

<h3 align="center">Same agents. More possibilities.</h3>

<p align="center">
  <a href="#quick-start">Quick start</a> &nbsp;·&nbsp;
  <a href="README-previous.md#runtime-details">Runtime details</a> &nbsp;·&nbsp;
  <a href="#give-yourself-and-your-agents-more-ways-to-collaborate">Work together</a> &nbsp;·&nbsp;
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

## Give yourself and your agents more ways to collaborate

Create a Group in GitSense Chat to give yourself and your agents a shared workspace. A Group is like a breakout room with whiteboards: your agents can lay out results and review notes in Chat so you can return to them as the conversation moves on. Your agents keep working in their own terminals.

In this demo, Claude Code puts the ACME inventory results in a table. You ask for a **Days of Stock** column, and Claude passes the request to Codex. You review the code with Codex, then Claude reruns the tool. The new column appears in the same table where you started.

<img src="assets/readme-v2/work-together-overview-placeholder.png" alt="Layout preview: Claude Code and Codex in their native terminals on the left. In the Group on the right, Claude Code's mirrored reply sits beside an inventory table in the top row, and Codex's mirrored reply sits beside a file checklist and diff in the row below." width="100%">

*Video placeholder. Recording to come. The previews below show two moments from the same demo.*

<table>
  <tr>
    <td width="38%" valign="middle">
      <h3>Claude Code - Inventory QA</h3>
      <p>Ask Claude to run ACME and put the results in a table. When you want to see how long the stock will last, ask Claude to send the request to Codex.</p>
    </td>
    <td width="62%"><img src="assets/readme-v2/work-together-table-placeholder.png" alt="Layout preview: Claude Code beside the ACME inventory table and the request for a Days of Stock column." width="100%"></td>
  </tr>
  <tr>
    <td width="38%" valign="middle">
      <h3>Codex - Inventory developer</h3>
      <p>Review the calculation and tests with Codex. Mark files as reviewed in the checklist and ask Codex to switch files in the same diff card. You can also open the diff in Zed if you've configured it.</p>
      <p>When you sign off, ask Codex to send Claude the reviewed revision. Claude checks the new calculation and updates the original table.</p>
    </td>
    <td width="62%"><img src="assets/readme-v2/work-together-diff-placeholder.png" alt="Layout preview: Codex beside a review checklist and a diff for the ACME inventory change." width="100%"></td>
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
