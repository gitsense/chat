<!--
Component: GitSense Chat README
Block-UUID: fd3dfd8f-5a0c-4ed5-9aee-72330693e45b
Parent-UUID: 4b090c76-74a3-4ffb-921b-97aaf7482cf3
Version: 4.2.0
Description: Restructured README to place "See It in Action" as a subsection under "The 30-Second Proof", updated Portable Intelligence section with two concrete examples (code-intent and owners), and refined the narrative flow.
Language: Markdown
Created-at: 2026-02-21T19:30:05.899Z
Authors: LLM GLM-4.7 (v1.0.0), Gemini 2.5 Flash Lite (v2.0.0), Gemini 3 Flash (v2.1.0), Gemini 3 Flash (v2.2.0), DeepSeek V4 Pro (v2.3.0), Gemini 3 Flash (v2.4.0), claude-sonnet-4-6 (v2.5.0), DeepSeek V4 Pro (v2.6.0), DeepSeek V4 Pro (v2.7.0), GLM-4.7 (v2.8.0), Gemini 3 Flash (v2.9.0), Gemini 3 Flash (v3.0.0), claude-sonnet-4-6 (v4.0.0), claude-sonnet-4-6 (v4.1.0), claude-sonnet-4-6 (v4.2.0)
-->


# GitSense Chat: Teach Agents What Matters

**Build repository intelligence for AI agents.**

GitSense Chat turns domain knowledge into queryable repository intelligence so agents know where to look, why it matters, and what to do next. You decide what intent, behavior, risks, ownership, or patterns matter; GitSense applies that knowledge across your files; and the `gsc` CLI makes the results available in terminals and agent sessions.

## Quick Start

GitSense is a two-part system. GitSense Chat, this repository, is where you build repository intelligence. The `gsc` CLI is how you access that intelligence from your terminal or agent session.

### The CLI

Install `gsc` first:

```bash
curl https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

Or [build it yourself](https://github.com/gitsense/gsc-cli).

### The App

The app is where you teach AI what matters and apply that knowledge across your repository. Once `gsc` is installed, use it to install and start GitSense Chat:

```bash
# 1. Install the App
gsc app native install

# 2. Start the App
gsc app native start
```

Open **http://localhost:3357** in your browser.

**Using a coding agent?** Install the CLI, then run `gsc docs help` in your agent session, and let it guide you through the rest.

## Context Without Complexity

You just need your files and an understanding of what you want agents to understand. GitSense Chat handles the prompt engineering, batching, model selection, and reuse strategy so agents can work across large collections without reanalyzing everything from scratch. Filter what needs reanalysis, set your batch size, and pick the right model for the job.

Watch the short Create, Analyze, and Package demos at [gitsense.com](https://gitsense.com) to see the workflow in action.

### What Agents Can Learn

- **Class notes:** what themes, definitions, sources, assignments, or open questions matter across a course
- **Financial records:** which transactions, accounts, patterns, or anomalies need closer review
- **Legal documents:** which matter, status, attorney, obligation, or risk applies to each file
- **Codebases:** what a file is for, which behavior it protects, where tests belong, and what patterns are risky

## Create Knowledge Assistants

Imagine you lead a team and want to stay ahead of technical debt. Finding `TODO` and `FIXME` is easy. That is not what you are worried about.

You care about the warning signs that are harder to search for:

```text
This is probably not ideal.
```

Grep can find exact words. It cannot tell you which comments imply future work, which files are worth reviewing, or where hidden maintenance debt is starting to pile up.

This is where GitSense comes in. By chatting with AI, you can create a Knowledge Assistant for the questions you care about. Explain what hidden technical debt looks like, and GitSense can turn that conversation into portable intelligence that can live in your repository. Import it with `gsc`, and your agent gets a local Brain it can query.

To see how that works, try the `implicit-todos` example Brain in `smart-ripgrep`.

```bash
git clone https://github.com/gitsense/smart-ripgrep
cd smart-ripgrep
gsc manifest import implicit-todos
```

Start your agent in that repository, then run:

```text
! gsc experts init
```

Now ask:

```text
Use the implicit-todos Brain to find hidden technical debt in this repository.

Group the results by area of the codebase and tell me which files look worth reviewing before the next release.
```

Then ask your agent how it would have found the same issues without GitSense:

```text
If the GitSense CLI (`gsc`) and the `implicit-todos` Brain did not exist, how would you have found these hidden technical debt signals?

Be specific about the searches you would run, the files you would inspect, and what you might still miss.
```

That comparison is the value of creating your own Knowledge Assistant: you define what matters once, and your agent can query that judgment whenever the question comes up again.

## Same Search, More Context

See how GitSense adds repository intelligence to ordinary search.

Install the CLI and compare standard search with GitSense-enriched search. We'll use the `smart-ripgrep` repository, a fork of `BurntSushi/ripgrep` enhanced with one example intelligence layer: `code-intent`.

```bash
# Clone the smart repository
git clone https://github.com/gitsense/smart-ripgrep

# Enter the directory
cd smart-ripgrep

# Create the code-intent intelligence database ("The Brain")
gsc manifest import code-intent

# Search with standard ripgrep
rg cache

# Search with ripgrep enriched with GitSense intelligence
gsc rg --db code-intent --fields purpose cache
```

Ask your agent to compare the two searches:

```text
Compare the `rg cache` result with the `gsc rg` result.

Before opening files, explain what the GitSense metadata helps you understand and which files you would inspect first.
```

Now the agent sees more than a match. It sees why the matched file exists, whether it is relevant, and what role it plays before spending turns opening files.

## Human Intent, Agent Scale

Humans are good at intent. Agents are good at scale. GitSense connects the two.

Humans know the domain, the real question, and the language that matters. Agents can scan hundreds of short clues faster than a human can during an interactive coding session. The missing piece is a cheap way to give the agent useful clues before it opens files.

In the hands-on exercise below, we will use a `code-intent` Brain, which attaches purpose metadata to files, to help a human guide an agent toward the right files faster and with less wandering.

**Set up the repository.**

```bash
git clone https://github.com/gitsense/smart-codex
cd smart-codex
gsc manifest import code-intent
```

**Initialize your agent.**

Start your coding agent in that repository, then run:

```text
! gsc experts init
```

**Lead, don't follow.**

```text
I want to know how to add skills programmatically to the OpenAI Codex CLI with a script or program.

I know that searching for "skills" will return a lot of matches, so use `gsc rg` with `--summary` to avoid opening file contents too early. I also want files where skills are mentioned more than three times, so use `--min-matches 3`.

Use the search results to identify the 10 most relevant files to consider for review.
```

The agent should converge on a command like this:

```bash
gsc rg -i "skills*" --db code-intent --fields purpose,keywords --summary --min-matches 3
```

In this repository, that search returns thousands of matches across nearly two hundred files. With GitSense, the result is still manageable because the agent sees file paths, match counts, keywords, and purpose sentences instead of raw file contents.

That is the collaboration shift: the human guides by intent, GitSense supplies purpose context, and the agent does the fast triage before opening files.

The point is not to replace human judgment. It is to give agents enough structured context to help humans make better decisions faster.

## Portable Intelligence

An Analyzer extracts structured knowledge from your repository. A Manifest packages that knowledge so it travels with the repository, independently from the data itself.

A manifest can be published by the repository owner, downloaded by a developer, or regenerated nightly by a CI job. It can ship with the repository in a `.gitsense/manifests/` directory or be hosted externally and imported by URL.

Manifests are plain JSON files - inspectable, committable, and importable with the open-source `gsc` CLI. You're not locked into GitSense Chat to use the intelligence you create.


## What to Build First

Start with one question your team keeps answering by hand. Build an Analyzer for it, run it across a repository, and let your agent query the result. That's the shift: from searching harder to working with intelligence your repository carries forward.

The **Code Smarter 101** guide in the app walks through building your first Analyzer step by step, using an Implicit TODO Finder as the example — an Analyzer that surfaces work items buried in comments that `grep TODO` would never catch. When it comes time to create the manifest, the guide packages the TODO findings alongside purpose metadata from a separate code intent Analyzer. Two focused Analyzers, one manifest, better results than either could produce alone.

## License

The **`gsc` CLI** is open source — licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) and available at [github.com/gitsense/gsc-cli](https://github.com/gitsense/gsc-cli). Apache 2.0 means anyone can use, modify, and distribute `gsc` freely for personal or commercial purposes, but attribution to GitSense must be preserved. The origin of the tool stays on the record regardless of where it travels.

**Manifests** are plain JSON files built on an open format. You are free to create, modify, and distribute manifests for any purpose — personal or commercial. The format is documented and not owned by GitSense. Build your own tooling around it, generate manifests in your own pipelines, or ship them with your repositories without restriction.

**GitSense Chat** (this repository) is licensed under the **[Fair Core License (FCL-1.0-ALv2)](https://faircode.io)**.

The short version: you're welcome to use, modify, and run GitSense Chat internally — for personal projects, team workflows, or self-hosted deployments. What you may not do is use it to build or operate a product or service that competes directly with GitSense Chat.

**Why not a permissive license?**

GitSense Chat is the product that funds this project. A permissive license like MIT or Apache 2.0 would allow anyone to take this code, wrap it in a competing service, and undercut the very work that keeps GitSense Chat alive and improving. The FCL exists precisely for this situation — it keeps the source open and usable for the vast majority of users, while protecting the project from being used against itself.

If you're a developer, researcher, or team using GitSense Chat to do your own work, the license doesn't affect you. If you're unsure whether your use case qualifies, contact [terrchen@gitsense.com](mailto:terrchen@gitsense.com) before building.

The core application ships as minified source to protect against direct competition while the project is in its early stages. As GitSense Chat matures, we intend to open the source further. The `gsc` CLI and manifest format are already fully open.
