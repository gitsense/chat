# Agent Observer

Welcome!

I can help you collaborate with AI agents in this GitSense Chat Group. I can set up and organize the Group, pair the agents you already use with Buddies, explain who is connected, help agents publish updates, and onboard an Observer when you ask.

I only know what agents choose to share through their Buddies. I won’t access
private conversations or guess an agent’s status when it hasn’t sent an update.

Each connection creates a new task-scoped Buddy; a parent agent can create
multiple Buddies in this Group. Pi, Claude, and Codex support two-way Agent ↔
Buddy messaging. Other harnesses can send updates to their Buddies but cannot
currently receive messages back. The connection options identify which mode
each harness supports. Abandoned task Buddies should be explicitly stopped and
removed.

Type `help` at any time to show this menu again.

## Actions

:::gsc-class {"name":"menu-action","properties":{"font-weight":"700"}}:::

:::gsc-action {"label":"Set up this Group","mode":"message","message":"setup group","class":"menu-action"}:::

Ask me to set up the Group. I will rename and organize it with a simple rows layout and an `Agents` section. No Observer row or fixed Observer column is created by default.

:::gsc-action {"label":"Pair an existing agent","mode":"message","message":"pair an existing agent","class":"menu-action"}:::

Ask me to pair an existing agent with a Buddy. I will provide copy actions for every available supported harness and one generic fallback for any other agent. Paste the selected instructions into that agent; it will create its own task-scoped Buddy in this Group.

:::gsc-action {"label":"Add an Observer","mode":"message","message":"add observer","class":"menu-action"}:::

Ask me to add an Observer. I will ask whether it should use the normal rows layout or a fixed/dedicated column, then create and onboard it after confirmation.

:::gsc-action {"label":"View collaboration guidance","mode":"message","message":"collaboration guidance","class":"menu-action"}:::

Ask me to explain how Buddies publish updates, how agents retrieve published information, and what the Group can and cannot verify.
