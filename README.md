<!--
Component: GitSense Chat README
Block-UUID: fd3dfd8f-5a0c-4ed5-9aee-72330693e45b
Parent-UUID: 4b090c76-74a3-4ffb-921b-97aaf7482cf3
Version: 4.3.0
Description: Reframed GitSense Chat as the way to extract and refine repository knowledge for GitSense's on-demand context system.
Language: Markdown
Created-at: 2026-02-21T19:30:05.899Z
Authors: LLM GLM-4.7 (v1.0.0), Gemini 2.5 Flash Lite (v2.0.0), Gemini 3 Flash (v2.1.0), Gemini 3 Flash (v2.2.0), DeepSeek V4 Pro (v2.3.0), Gemini 3 Flash (v2.4.0), claude-sonnet-4-6 (v2.5.0), DeepSeek V4 Pro (v2.6.0), DeepSeek V4 Pro (v2.7.0), GLM-4.7 (v2.8.0), Gemini 3 Flash (v2.9.0), Gemini 3 Flash (v3.0.0), claude-sonnet-4-6 (v4.0.0), claude-sonnet-4-6 (v4.1.0), claude-sonnet-4-6 (v4.2.0), Codex GPT-5 (v4.3.0)
-->


# GitSense Chat

**Turn repository data into context coding agents can use.**

GitSense helps coding agents understand your codebase and the way you work. Save what you learn as you build, debug, and review code, or use GitSense Chat to work through a repository and pull out what matters.

![GitSense builds context by capturing knowledge during everyday work or extracting it at scale with GitSense Chat, then makes personal and repository knowledge available to coding agents through queryable Brains.](assets/gitsense-on-demand-context.png)

GitSense Chat is the right side of the picture. You tell it what matters, try the analysis on real files, and adjust it until the results are useful. When you are happy with it, you can package that knowledge and make it available to coding agents through `gsc`.

Some knowledge is personal, such as the way you prefer to work. Other knowledge belongs with the repository, where anyone who clones it can benefit from it. `gsc` can use both when an agent needs help.

## Quick Start

GitSense Chat, this repository, is where you build repository intelligence. The `gsc` CLI is how you access that intelligence from your terminal or agent session.

### The CLI

Install `gsc` first:

```bash
curl https://raw.githubusercontent.com/gitsense/chat/refs/heads/main/install.sh | bash
```

Or [build it yourself](https://github.com/gitsense/gsc-cli).

### The App

The app is where you teach AI what matters and apply that knowledge across your repository.

The easiest setup path is to let your coding agent guide you. Once `gsc` is installed, start your agent in this repository and ask it to run:

```text
gsc docs help
```

That gives your agent the current setup instructions and lets it walk you through installing, configuring, and starting GitSense Chat.

If you want to run the app setup yourself:

```bash
# 1. Install the App
gsc app native install

# 2. Start the App
gsc app native start
```

Open **http://localhost:3357** in your browser.

## Dead Simple

GitSense Chat is for turning data in a Git repository into reusable intelligence without designing a pipeline by hand.

Import a repository, explain what matters in plain language, select and refine the data, then package the extracted metadata for agents to use later.

| Step | Demo |
| :--- | :--- |
| **Import**<br>Bring repository data into GitSense Chat so it can be selected, analyzed, and updated later. | <img src="assets/readme-import-repository-placeholder.svg" alt="Placeholder for importing a Git repository into GitSense Chat" width="420"> |
| **Create**<br>Describe the pattern agents should understand. GitSense turns the conversation into a reusable Analyzer. | <a href="public/assets/create-analyzer-demo.mp4"><img src="public/assets/create-analyzer-demo.png" alt="Create an Analyzer demo preview" width="420"></a> |
| **Analyze**<br>Select files, apply filters, and run the Analyzer in batches. GitSense tracks progress and results. | <a href="public/assets/analyze-batch-demo.mp4"><img src="public/assets/analyze-batch-demo.png" alt="Analyze Batch demo preview" width="420"></a> |
| **Package**<br>Combine analysis into a queryable manifest that the CLI and coding agents can use later. | <a href="public/assets/package-analysis-demo.mp4"><img src="public/assets/package-analysis-demo.png" alt="Package Analysis demo preview" width="420"></a> |

```bash
git clone https://github.com/BurntSushi/ripgrep
cd ripgrep
gsc app import git --owner BurntSushi --repo ripgrep --branch master
```

Later, update the imported data incrementally:

```bash
gsc app import git --update
```

## What This Means

You do not need to decide how to stuff a prompt, track state across a long agent run, or hand-design a metadata format before you start. GitSense Chat gives you a workflow for extracting value from repository data and turning the useful parts into something durable.

| Instead Of | GitSense Chat Lets You |
| :--- | :--- |
| Pasting raw files into a chat | Keep repository data selectable until specific context is needed. |
| Asking an agent to invent structure each time | Save an Analyzer that extracts the same metadata consistently. |
| Reprocessing everything after changes | Update imported data and analyze changed or not-yet-analyzed items. |
| Trusting one long agent answer | Review batches, inspect metadata, refine instructions, and rerun. |
| Keeping useful output trapped in a chat | Package selected fields into a manifest that agents and the CLI can import. |

## Better Context, Sooner

GitSense Chat produces the intelligence. The `gsc` CLI and coding agents use it later.

| Command | What it gives the agent |
| :--- | :--- |
| `gsc rg filesize --db code-intent --fields purpose --summary` | Search results with file purpose attached before the agent opens files. |
| `gsc query --db code-intent --filter "purpose=auth" --fields purpose,keywords` | Files found by role or concept, not just exact words. |
| `gsc query --db ripgrep-intent-debt --filter "has_todo=true" --fields purpose,todo_summary` | Combined metadata from multiple Analyzers in one queryable layer. |
| `gsc coverage --db code-intent` | A check on how much of the repository the packaged intelligence actually covers. |

## License

The **`gsc` CLI** is open source — licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) and available at [github.com/gitsense/gsc-cli](https://github.com/gitsense/gsc-cli). Apache 2.0 means anyone can use, modify, and distribute `gsc` freely for personal or commercial purposes, but attribution to GitSense must be preserved. The origin of the tool stays on the record regardless of where it travels.

**Manifests** are plain JSON files built on an open format. You are free to create, modify, and distribute manifests for any purpose — personal or commercial. The format is documented and not owned by GitSense. Build your own tooling around it, generate manifests in your own pipelines, or ship them with your repositories without restriction.

**GitSense Chat** (this repository) is licensed under the **[Fair Core License (FCL-1.0-ALv2)](https://faircode.io)**.

The short version: you're welcome to use, modify, and run GitSense Chat internally — for personal projects, shared workflows, or self-hosted deployments. What you may not do is use it to build or operate a product or service that competes directly with GitSense Chat.

**Why not a permissive license?**

GitSense Chat is the product that funds this project. A permissive license like MIT or Apache 2.0 would allow anyone to take this code, wrap it in a competing service, and undercut the very work that keeps GitSense Chat alive and improving. The FCL exists precisely for this situation — it keeps the source open and usable for the vast majority of users, while protecting the project from being used against itself.

If you're a developer, researcher, maintainer, or organization using GitSense Chat to do your own work, the license doesn't affect you. If you're unsure whether your use case qualifies, contact [terrchen@gitsense.com](mailto:terrchen@gitsense.com) before building.

The core application ships as minified source to protect against direct competition while the project is in its early stages. As GitSense Chat matures, we intend to open the source further. The `gsc` CLI and manifest format are already fully open.
