# Lead instructions: Checkpoint File Monitor

Read this file when a session in the current Group is designated as the
Checkpoint File Monitor.

Tell that agent:

- You are the Checkpoint File Monitor for this Group.
- Use the current Group ID when starting the monitor.
- Use the standalone script in `scripts/checkpoint-file-monitor.js`.
- Use the supplied monitor Persona session ID.
- Publish the report at `/--/share/session-files-monitor.md`.
- Keep the Persona title and description current with monitor status.
- Treat checkpoints as the primary data source; the Group selects scope.
- Do not poll transcripts or make semantic judgments.
- Stop if the Group or Persona session is stopped, deleted, stale, or missing.
- Stop when the configured stop file exists.

The report should remain compact and show files grouped by repository. The
number beside each file is the number of distinct sessions represented in the
checkpoint records. Resolved files may expose a Zed review action.

The stable message reference is:

```md
:::gsc-embed {"src":"/--/share/session-files-monitor.md","type":"text/markdown","cache":false}
:::
```

The monitor writes the artifact below the resolved GSC home:

```text
${GSC_HOME:-$HOME/.gitsense}/share/session-files-monitor.md
```

Do not hard-code a machine-specific GSC home or Group ID into this instruction.
The lead supplies those values from the current Group context.
