# Checkpoint-driven Group File Dashboard

This workflow publishes a compact view of files changed across the sessions
in a GitSense Chat Group. Checkpoints are the primary data source; the Group
only selects the sessions to observe.

The report groups files by repository, counts distinct contributing sessions,
and provides GitSense Markdown actions for opening resolved files in Zed.

## Run the monitor

The monitor is a standalone Node.js process that uses only `gsc` and Node
built-ins. It does not require an LLM.

Run this command from `workflows/checkpoint-file-dashboard`:

```bash
GSC_HOME=/path/to/gsc-home \
node scripts/checkpoint-file-monitor.js \
  --group-id <group-id> \
  --persona-session-id <session-id>
```

`--persona-session-id` is optional. Without it, the monitor does not guard its
lifecycle with a Persona session. The Zed actions require the `zed` CLI to be
installed and available on `PATH`.

If `GSC_HOME` is not set, the monitor uses `~/.gitsense`. The report is written
to `<gsc-home>/share/session-files-monitor.md` and served at:

```text
/--/share/session-files-monitor.md
```

The loop polls every five seconds, queries Group membership and each member's
checkpoint records, and hashes a deterministic file/session projection. It
rewrites the report only when that projection changes.

## Embed the report

Add this to the monitor session's message:

```md
:::gsc-embed {"src":"/--/share/session-files-monitor.md","type":"text/markdown","cache":false}
:::
```

The embed is a stable reference. GitSense Chat fetches the served Markdown
when the message renders; the embed does not schedule polling or force a pane
to rerender.

## Lead setup

Create or add a monitor agent to the target Group, then ask the lead to read
[`lead-instructions.md`](lead-instructions.md). The lead should tell the
monitor agent which Group ID to use and how to publish its Persona and embed.

## Lifecycle and safety

Stop gracefully by touching the generated stop file. Use the exact path shown
in the report or Persona description:

```bash
touch <gsc-home>/share/session-files-monitor.md.stop
```

A restart must remove the stop file first. If startup reports an existing lock,
inspect the PID recorded in `<report>.lock` before removing a stale lock. The
monitor also stops when the Group is missing or when its Persona session is
stopped, deleted, stale, or unavailable. It writes reports atomically. The
final report records the stop reason and force-stop command.

## Raw and rendered views

The generated message contains only the small embed directive. The rendered
view expands the saved Markdown into repository headings, compact file paths,
distinct-session counts, and clickable Zed actions. The raw view shows the
source directive and generated Markdown.
