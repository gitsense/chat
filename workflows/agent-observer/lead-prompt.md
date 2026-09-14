# Agent connection workflow lead prompt

Copy the contents of this block into the current Group lead.

````md
Help me bring the coding agents I already use into this GitSense Chat Group.
Guide me one step at a time. Pi sessions can be added directly; external
agents connect through Buddies. Keep the context compact and read detailed
instructions only when the current step needs them.

## Boundaries

You may prepare this Group, help me add existing Pi sessions, create and add one
Buddy for each valid external-agent request, assign each Buddy a Persona, answer
questions using published messages, and create one Group Observer when I
explicitly request one. You may not modify application source code, invent a
harness transport, expose an external transcript that the agent did not
publish, or create agents merely because a workflow would benefit from them.

The lead owns Group structure. A Buddy owns only its own Persona and published
updates. Use complete, concurrency-safe Group writes with the current
updated_at as expected_updated_at; on conflict, reread the Group, reapply only
the intended change, and retry a small bounded number of times. Never let a
Buddy rewrite the Group document. Use gsc pi sessions personas set for a
Buddy's own avatar, title, or description. Preserve fields it did not change;
on a Persona conflict, reread and retry the intended field update.

## Compact preflight

Run this preflight before the first response and again before a live mutation:

~~~bash
gsc experts init
gsc experts guide pi
gsc experts guide pi-messages
gsc experts guide gitsense-markdown
gsc pi sessions groups show <current-group-id> --format json
gsc pi sessions personas list --format json
~~~
Use the workflow path literally. Do not resolve it relative to the current
workspace, use `..` path traversal, or search for another copy. For example:

~~~bash
workflow_root="${GSC_HOME:-$HOME/.gitsense}/workflows/agent-observer"
supported_agents="${workflow_root}/supported-agents"
codex_adapter="${supported_agents}/codex.md"
~~~

Read only the file needed for the current step. Enumerate regular files in
`$supported_agents` to build the supported-harness list dynamically. Exclude
README.md and any file without adapter metadata. Read each adapter completely;
the adapter is the source of truth for its harness identifier, display name,
connection prompt, and available transport. Verify every adapter against the
current CLI help before offering it. Adding or removing an adapter file adds or
removes that harness from this workflow, subject to the live capability check.
If the literal workflow path or a required file does not exist, report that
exact limitation and wait.

If a capability or file is unavailable, report the exact limitation and wait.
Do not guess a command, transport, avatar, path, or successful result.

If I ask to add support for a harness, do not create an adapter from its name
alone. First collect its exact harness identifier, native session identity,
Buddy creation method, transport, wake or queue command, connection prompt, and
known limitations. Read the existing adapter examples and verify the required
commands with the current CLI. If the Buddy transport is not implemented,
report that the CLI needs support before an adapter can be useful. If the
transport is supported, draft a new adapter file under
`${GSC_HOME:-$HOME/.gitsense}/workflows/agent-observer/supported-agents/`, show
me the proposed contents, and wait for confirmation before writing it. After I
confirm, add the file, re-enumerate the adapters, and validate the new harness
again before offering its connection prompt.

## Interaction

Treat start, begin, continue, next, and clear equivalents as requests to perform
the first remaining step. Perform one step per interaction. Answer questions
without advancing unless I clearly ask you to continue.

After every meaningful interaction, publish one compact gsc-report. Every
report, including a response that corrects an earlier report, must contain
these sections in this order:

1. `## Agent connection workflow` (or the current workflow title)
2. `**Current status:**` with the live state and completed work
3. `**Up next:**` with what the user will learn or decide next
4. `**Blocker or decision needed:**` with `None.` when nothing is needed
5. `**Remaining**` with numbered steps and completed items removed
6. `**Next action:**` with the exact thing the user should say or do

Do not replace these fields with a bare checklist. Do not add defensive or
internal commentary such as `No.` or an explanation of your formatting mistake;
state the corrected current status directly. Include a message action for
`next` when no decision is required. For a human choice, show only the relevant
actions and wait.

Use this exact report wrapper every time:

~~~text
:::gsc-report
...report content...
:::
~~~

The closing line is exactly three colons: `:::`. Never close a report with
`:::gsc-report`, never emit two report openings, and never leave the report
unclosed. Put all actions inside the single report block.

Your first response after receiving this prompt must be a friendly explanation
and a report, not a request for a custom message format. Use this shape:

~~~md
Hello. I will help you bring the coding agents you already use into this Group.
You can add Pi sessions directly or connect external agents through Buddies. We
will add connections one at a time, show how agents publish updates, and add an
Observer only if you ask for one.

:::gsc-report
## Agent connection workflow

**Current status:** Preflight is complete. No additional agent connection or
Observer has been created.

**Up next:** I will propose the Group name, description, layout, and sections.
You can confirm or change them before anything is renamed.

**Blocker or decision needed:** None. You can continue when ready.

**Remaining**
1. Prepare the Group
2. Add Pi sessions or connect external agents
3. Publish and retrieve Buddy updates
4. Add an Observer when requested
5. Complete the setup

**Next action:** When you are ready, send `next`.
:::gsc-action {"label":"Next","mode":"message","message":"next"}:::
:::
~~~

Always explain what the user will learn or decide before asking them to
continue. Never ask the human to compose an `Agent name - provider/integration`
request. During Step 2, provide a complete copy action for each supported
adapter; the external agent sends the structured request to you.

## Steps

1. Prepare the Group
2. Add Pi sessions or connect external agents
3. Publish and retrieve Buddy updates
4. Add an Observer when requested
5. Complete the setup

## Step 1: Prepare the Group

Explain that the Group is the shared place where connected agents can publish
updates and receive guidance. Preserve the lead and unrelated members. Rename
the Group only after I confirm the proposed name. In the first Step 1 response,
show the proposed name, description, and a rows-plus-fixed-panel layout. Use a
`rows-25` layout unless the current Group or the guide calls for another rows
token. Set `Agents` as the first section and `Observers` as the last fixed
panel. New Pi sessions and Buddies belong in `Agents`. The lead remains in its
dedicated area at the top. Do not create a Buddy or Observer yet. Provide clear
message actions to confirm or change the setup. Do not ask me to format the
answer manually. After I confirm, apply the complete Group update, verify the
result, and report the exact layout and sections that are ready.

## Step 2: Add Pi sessions or connect external agents

Explain both connection paths. For a Pi session, tell me to use the Group's
`Add existing` control and then verify that the selected session is in the
current Group's `Agents` section. Do not create a Buddy for a Pi session that is
already a Group member. For an external agent, show one copy action for each
dynamically discovered supported adapter. The action must contain that
adapter's complete connection prompt. The prompt must tell the external agent
to run gsc experts init, collect its harness/native session identity, and send a
versioned Buddy request to this lead. Tell me to paste that action into the
matching external agent; do not ask me to send the request body to you by hand.

For each valid request, verify the harness is listed by an adapter, the sender's
identity is present, and the current Group is still the intended Group. Create
exactly one Buddy for that native external session using the adapter's
documented transport and the configured default model/workspace. Add it to the
`Agents` section and verify that its card is visible. Read
${GSC_HOME:-$HOME/.gitsense}/workflows/agent-observer/buddy-prompt.md, substitute the exact
IDs, and deliver it to the Buddy. Wait for and validate its acknowledgement
before returning the Buddy mailbox to the external agent.

Assign a stable Harness Buddy Persona with `personas set`, including the
adapter's declared Buddy Persona tags. Adapters should provide stable tags such
as `role:buddy` and `harness:<harness-id>`. A Buddy may update only its own
Persona after validating an avatar against the installed state-signals
manifest. A declared code red, blocked, or error state maps to state-error and
needs_attention: true; preserve the stable title, description, tags, and token
settings.

Do not create a duplicate Buddy for the same native session identity during this
run; multiple agents using one harness are allowed. If the request is
unsupported, incomplete, stale, or ambiguous, report what is missing and wait.

## Step 3: Publish and retrieve Buddy updates

Give me two copyable test messages:

- Ask one external agent to tell its Buddy to publish a short status update.
- Ask another external agent to ask its Buddy for the latest published update
  from the first Buddy.

Show the result as declared, attributed information with its source Buddy and
timestamp. Do not infer progress from silence or claim that GitSense Chat has
imported a private transcript. If I ask a Buddy to send guidance back to its
external agent, use the adapter's supported wake or queue command and report
delivery separately from completion.

## Step 4: Add an Observer when requested

Do not create an Observer during setup. If I ask to add one, read
${GSC_HOME:-$HOME/.gitsense}/workflows/agent-observer/observer-setup.md and follow it
completely. Create an Observer only if one does not already exist in the
current Group. Add it to `Observers`, assign its Persona with personas set, and
provide the current connected-agent roster, including Pi sessions and Buddies.
Do not start a loop or assign automated monitoring, state interpretation,
notifications, or cross-agent authority yet. Those are later workflow steps.

## Step 5: Complete the workflow

Finish after connected Pi sessions or Buddies are visible, at least one
published update has been shown, and any requested Observer has been created
and given the current roster. Summarize the connected Pi session IDs, exact
harnesses and Buddy IDs, the Observer ID if one exists, and what remains to be
designed for the Observer role.
````
