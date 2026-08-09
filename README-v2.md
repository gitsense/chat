# GitSense: Chat

**Turn coding-agent conversations into durable sessions and reusable context.**

Coding-agent conversations contain decisions, discoveries, changed files, and
valuable context about your code. They are also easy to forget, difficult to
find, and often too large to revisit. When that happens, useful work becomes
trapped in a session log and the next conversation starts over.

GitSense Chat preserves both the conversation and what should survive it:

- **The session itself.** Find it, organize it, inspect what happened, continue
  the work, or let another agent ask that session for help.
- **What should carry forward.** Turn a useful line of inquiry into a reusable
  Analyzer, review its results, and package the fields you trust as a queryable
  Brain.

An Analyzer makes the question reusable. A Brain makes the results queryable.
Together, they help future agents retrieve focused context instead of rereading
entire conversations or opening files blindly.

## Make every session reusable

GitSense Chat gives recorded coding-agent sessions enough structure to remain
useful after the conversation ends. Search by files changed, content, repository,
activity, or time. Review the messages, tool calls, summaries, and changed files.
Then continue the session, give it another task, or resume it in your own tools.

![Find the agent that already knows the work, inspect what it did, and continue in GitSense Chat or resume the session in your own tools.](assets/manage-agents.png)

A session does not have to belong to a predefined project or workflow. Bring any
related sessions together when you need them, organize them into a live board,
and monitor their activity and working state from one place.

| Find | Inspect | Build a dashboard |
| :--- | :--- | :--- |
| ![Placeholder for finding a Pi session by file, content, repository, or activity.](assets/session-insight-placeholder.svg) | ![Placeholder for inspecting a Pi session's messages, tool calls, changed files, summaries, and timeline.](assets/session-insight-placeholder.svg) | ![Placeholder for building a dashboard from a set of related Pi sessions.](assets/session-insight-placeholder.svg) |
| Search across recorded sessions by file, content, repository, activity, time, and other filters. | Review messages, tool calls, changed files, summaries, and focused slices of a session timeline. | Bring any set of sessions into one live board for a project, workstream, or review. |

| Organize | Monitor | Continue or hand off |
| :--- | :--- | :--- |
| ![Placeholder for organizing Pi sessions with sections, layouts, sorting, and activity groups.](assets/session-insight-placeholder.svg) | ![Placeholder for monitoring working state, recent activity, liveness, and inbox status.](assets/session-insight-placeholder.svg) | ![Placeholder for starting or messaging an agent, handing off work, or resuming a Pi session in a terminal.](assets/session-insight-placeholder.svg) |
| Add named sections, choose a board layout, reorder sessions, or group them by activity. | Watch working state, recent activity, timestamps, liveness, and inbox status as they change. | Start or message an agent, give an existing session a task, or copy a command to resume it in your terminal. |

The [Pi](https://github.com/gitsense/pi) repository includes a runnable
`change-review` Analyzer for the Inspect step. It reduces a session to the files
that changed, then adds purpose and dependency risk from Pi's repository Brains.

Pi is the first supported agent runtime. Sessions are reviewed from the local
`gsc` mirror, so freshness depends on the sync watcher. Saved boards are stored
per browser. The messaging protocol is designed to support more agent runtimes
through the same workspace in the future.

## Carry useful context forward

Some conversations reveal more than the answer to one task. They uncover how to
review a file, assess risk, find the right tests, identify ownership, or recognize
a repository-specific lesson.

GitSense Chat helps you turn that line of inquiry into reusable repository
analysis. Work with AI to define an Analyzer, run it across the relevant files,
review the results, and package the useful fields as a Brain.

![GitSense builds context by capturing knowledge during everyday work or extracting it at scale with GitSense Chat, then makes personal and repository knowledge available to coding agents through queryable Brains.](assets/gitsense-on-demand-context.png)

The open-source [`gsc` CLI](https://github.com/gitsense/gsc-cli) captures
knowledge while you work and delivers relevant Brain results inside coding-agent
sessions. GitSense Chat helps create, review, and maintain that knowledge across
files and repositories.

## Give the next conversation a better starting point

The left shows matching lines. The right shows the same matches with an
explanation of what each file is for.

![The same matcher search in ripgrep and GitSense, with GitSense adding the purpose of each matching file.](assets/same-search-more-to-go-on.png)

Both searches find the same code. GitSense adds purpose, risk, lessons, and other
repository context before the agent decides what to open.

That keeps context focused. Instead of loading every potentially relevant file
or carrying an oversized previous conversation forward, the agent can query what
is already known, choose the most relevant source, and verify it directly.

The [smart-ripgrep](https://github.com/gitsense/smart-ripgrep) example makes this
concrete. Its `file-review-context` Analyzer combines code intent, change risk,
dependency and test metadata, and repository lessons. Ask an agent to investigate
the proposed `--max-filesize-warning` change and show which lessons apply to the
files it touches.

## Quick Start

Review the [install script](install.sh), then install `gsc`:

```bash
curl https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

or [build it yourself](https://github.com/gitsense/chat).

### Ask Your Coding Agent

```text
Install and configure GitSense Chat for me. Start by running `gsc docs help`.
```

Your agent will guide you through the rest and stop when you need to enter an API key privately.

For detailed installation instructions, run:

```bash
gsc docs install
```

## Turn a conversation into reusable context

A useful conversation can become a repeatable way of understanding your
repository. Define what matters with an Analyzer, populate it with AI or
deterministic programs, review the results, and package the fields you trust as
a portable, queryable Brain.

| Step | Demo |
| :--- | :--- |
| **Import**<br>Bring repository data into GitSense Chat. | <a href="assets/how-it-works-import-repo-subtitled.mp4"><img src="assets/how-it-works-import-repo-thumbnail.png" alt="Import a Git repository into GitSense Chat demo" width="420"></a> |
| **Define**<br>Create an Analyzer that defines the fields, types, instructions, and output you want. | <a href="public/assets/create-analyzer-demo.mp4"><img src="public/assets/create-analyzer-demo.png" alt="Create an Analyzer demo preview" width="420"></a> |
| **Populate**<br>Generate results with GitSense Chat, deterministic programs, or both, then review them. | <a href="public/assets/analyze-batch-demo.mp4"><img src="public/assets/analyze-batch-demo.png" alt="Analyze Batch demo preview" width="420"></a> |
| **Package**<br>Select useful fields and package them as a portable, queryable Brain. | <a href="public/assets/package-analysis-demo.mp4"><img src="public/assets/package-analysis-demo.png" alt="Package Analysis demo preview" width="420"></a> |

An Analyzer is the contract, not necessarily an AI prompt. GitSense Chat can
populate it with managed model analysis. Existing programs can read other
Analyzer results and write deterministic results through the same interface:

```bash
gsc app analysis get
gsc app analysis set
```

Both paths produce the same reviewable metadata. A repository can ship the
Analyzer and the program that populates it under `.gitsense/`, keeping the
analysis workflow beside the code it explains.

## Keep repository context useful

Repository context is not a one-time answer. Files change, repositories grow,
and the first version of an Analyzer may not find exactly what you need. GitSense
Chat keeps that work visible so you can update it instead of starting over.

![Analyzing batches with filters in GitSense Chat.](assets/analyze-batches-control-panel.png)

| What you need | How GitSense Chat helps |
| :--- | :--- |
| Use the same analysis again | Save the instructions as a reusable Analyzer. |
| Work across one repository or many | Run the Analyzer wherever that knowledge is needed. |
| Avoid starting over | Analyze files that are new, changed, or still missing results. |
| Keep large jobs manageable | Select files, apply filters, and process them in batches. |
| Use lower batch pricing | Send work in batches when the provider offers it. |
| Check the quality | Inspect the metadata, adjust the Analyzer, and run it again. |
| Work across branches | Keep analysis tied to the repository and branch it came from. |
| Share the result | Package selected fields as a portable JSON manifest. |

## Examples

These examples show what changes once repository knowledge is available. Each
one uses a real command and will be replaced with output from a reproducible
demo.

<table>
  <thead>
    <tr>
      <th width="32%">Command</th>
      <th width="68%">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="32%" valign="top">
        <strong>See the shape before reading the code</strong>
        <pre><code>gsc rg cache \
  --db code-intent \
  --glob '**/src/**' \
  --fields purpose,keywords \
  --summary</code></pre>
        <p>See where something appears without loading every matching line.</p>
      </td>
      <td width="68%" valign="top">
        <img src="assets/see-the-shape-before-reading-the-code.png" alt="GitSense search summary example" width="900">
      </td>
    </tr>
    <tr>
      <td width="32%" valign="top">
        <strong>Find files and see what they are for</strong>
        <pre><code>gsc query \
  --db code-intent \
  --glob "**/cache*" \
  --fields purpose,keywords</code></pre>
        <p>Find familiar paths while seeing what each result does.</p>
      </td>
      <td width="68%" valign="top">
        <img src="assets/find-files-and-see-what-they-are-for.png" alt="GitSense path query example" width="900">
      </td>
    </tr>
    <tr>
      <td width="32%" valign="top">
        <strong>Find files by what they do</strong>
        <pre><code>gsc query \
  --db code-intent \
  --glob '**/*.rs' \
  --filter "keywords=send-input" \
  --fields purpose,keywords \
  --limit 20</code></pre>
        <p>Search repository knowledge instead of guessing the source wording.</p>
      </td>
      <td width="68%" valign="top">
        <img src="assets/find-files-by-what-they-do.png" alt="GitSense purpose query example" width="900">
      </td>
    </tr>
  </tbody>
</table>

## Route What You Already Have

Structured knowledge does not have to replace your skills, runbooks, or project
instructions. A GitSense note can act as a small index entry: what the source is
for, where it lives, and which part matters. A rule can fetch the matching notes
when an agent starts work, without loading a large table of contents into every
conversation.

The [skill-router demo](https://github.com/gitsense/gsc-rules-demos#3-route-to-an-existing-skill)
shows the full path. Work on a documentation file loads the `doc-styling` notes,
which point the agent to the relevant skill. GitSense Chat can help create and
refine this kind of repository knowledge at scale; `gsc` delivers it when the
agent needs it.

## License

The **`gsc` CLI** is open source, licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0), and available at [github.com/gitsense/gsc-cli](https://github.com/gitsense/gsc-cli). Apache 2.0 means anyone can use, modify, and distribute `gsc` freely for personal or commercial purposes, but attribution to GitSense must be preserved. The origin of the tool stays on the record regardless of where it travels.

**Manifests** are plain JSON files built on an open format. You are free to create, modify, and distribute manifests for any purpose, personal or commercial. The format is documented and not owned by GitSense. Build your own tooling around it, generate manifests in your own pipelines, or ship them with your repositories without restriction.

**GitSense Chat** (this repository) is licensed under the **[Fair Core License (FCL-1.0-ALv2)](https://fcl.dev/)**.

The short version: you're welcome to use, modify, and run GitSense Chat internally for personal projects, shared workflows, or self-hosted deployments. What you may not do is use it to build or operate a product or service that competes directly with GitSense Chat.

Each version automatically becomes available under Apache 2.0 on the second
anniversary of the date it was made available. Copyright and origin attribution
to Terrence Chen and GitSense must be preserved as required by the license.

**Why not a permissive license?**

GitSense Chat is the product that funds this project. A permissive license like MIT or Apache 2.0 would allow anyone to take this code, wrap it in a competing service, and undercut the very work that keeps GitSense Chat alive and improving. The FCL exists precisely for this situation. It keeps the source open and usable for the vast majority of users while protecting the project from being used against itself.

If you're a developer, researcher, maintainer, or organization using GitSense Chat to do your own work, the license doesn't affect you. If you're unsure whether your use case qualifies, contact [terrchen@gitsense.com](mailto:terrchen@gitsense.com) before building.

The core application ships as minified source to protect against direct competition while the project is in its early stages. As GitSense Chat matures, we intend to open the source further. The `gsc` CLI and manifest format are already fully open.
