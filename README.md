<!--
Component: GitSense Chat README
Block-UUID: {{GS-UUID}}
Parent-UUID: 84313538-6e88-4652-a8b8-ec7295a91592
Version: 1.4.0
Description: A comprehensive README for GitSense Chat, detailing its purpose, features, licensing, and initial installation.
Language: Markdown
Created-at: 2025-08-13T14:50:49.574Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0), Gemini 2.5 Flash Thinking (v1.3.0), Gemini 2.5 Flash Thinking (v1.4.0)
-->


# GitSense Chat

GitSense Chat is reimagining how we can interact with Large Language Models (LLMs) to build better software, together. It provides an effective, intuitive environment for building highly relevant context, generating traceable code, managing knowledge, creating custom AI search assistants and more.

**🚀 Try GitSense Chat Live: [https://chat.gitsense.com](https://chat.gitsense.com)**

![GitSense Chat Home Page Screenshot](https://github.com/gitsense/chat/raw/main/assets/images/gitsense-chat-home-page-bordered.png)

## Table of Contents

*   [Why Use GitSense Chat?](#why-use-gitsense-chat)
    *   [No Lock-in, Just Better Workflows](#no-lock-in)
    *   [Your Personal AI Search Assistant](#your-personal-ai-search-assistant)
    *   [Context Engineering](#context-engineering)
    *   [Next-Gen Knowledge Base](#next-gen-knowledge-base)
    *   [And More](#and-more)
*   [License and Business Model](#license-and-business-model)
    *   [License](#license)
    *   [Business Model](#business-model)
*   [Installation](#installation)
    *   [NPM](#npm)
    *   [Docker](#docker)
*   [Post-Installation Configuration & Usage](#post-installation-configuration--usage)

## Why Use GitSense Chat?
<a id=why-use-gitsense-chat></a>
GitSense Chat is more than just a chat interface; it's a powerful platform designed to transform how users interact with their information and AI. Here are some of its key features:

### No Lock-in, Just Better Workflows
<a id=no-lock-in></a>

GitSense Chat is designed to be your **starting point for every LLM conversation**, not a walled garden. We empower you to define precise context, generate traceable code, and manage knowledge with great efficiency. Once you've crafted your perfect LLM interaction, our **Messages Tool** makes it dead simple to extract and copy your conversation content-including code, notes, and context-for seamless use in your IDE (like VS Code or Aider), other LLM solutions, or any documentation.

We're confident that once you experience the clarity, control, and traceability GitSense Chat provides, you'll want to come back for its other rich features. Our goal is to enhance your existing workflows, not replace them.

![No Lock-in](https://github.com/gitsense/chat/raw/main/assets/images/no-lock-in-bordered.png)

### Your Personal AI Search Assistant
<a id=your-personal-ai-search-assistant></a>

Simply chat with an LLM to make your data smarter. With GitSense Chat, you can turn any text-based data into intelligent insights that can help you find bugs faster, identify security vulnerabilities, and even organize your grocery bills. For example, you could ask, "find all files with high-priority TODOs in the `mobile-app-ios` and `mobile-app-android` repositories," and have AI search your GitSense Chat knowledge base to find answers that traditional text searches like grep can't.

![Personal AI Search Assistant Screenshot](https://github.com/gitsense/chat/raw/main/assets/images/personal-ai-search-assistant-bordered.png)

### Context Engineering
<a id=context-engineering></a>

Significantly improve the accuracy, relevance, and cost-efficiency of LLM responses by precisely managing the context you provide. GitSense Chat provides intuitive tools to build, refine, and manage the LLM's knowledge base, ensuring it always has the most relevant data for any task.

![Context Engineering](https://github.com/gitsense/chat/raw/main/assets/images/context-engineering-bordered.png)

### Next-Gen Knowledge Base
<a id=next-gen-knowledge-base></a>

Create a wiki that you can truly chat with, offering a dynamic and conversational experience unlike traditional wikis. This transforms how technical documents and training materials are created and consumed, fostering a more interactive and accessible learning environment.

![Knowledge Base](https://github.com/gitsense/chat/raw/main/assets/images/knowledge-base-bordered.png)

### And More
<a id=installation></a>

Explore GitSense Chat's full potential by loading your own personal help guide directly within the application. Visit [https://chat.gitsense.com](https://chat.gitsense.com) to chat with the documentation, ask questions, and learn interactively about all features, from advanced context management to custom AI tools.

## License and Business Model
<a id=license-and-business-model></a>

GitSense Chat is provided under a **Fair License**, permitting internal, non-commercial use and modification. Copying for profit or redistribution, or use in directly competing products/services, is strictly prohibited without explicit permission.

Our business model focuses on ensuring the long-term sustainability and continued development of the platform through a commercial version of the **GitSense Chat Bridge**.

[Read the full license details below.](#full-license-details)
[Learn more about our business model below.](#full-business-model-details)

## Installation
<a id=installation></a>

This section covers the initial steps to get GitSense Chat up and running. For detailed configuration, starting/stopping the application, and using the administration tool, please refer to the [Post-Installation Configuration & Usage Guide](#post-installation-configuration--usage).

### NPM
<a id=npm></a>

Run GitSense Chat directly using Node.js and npm.

#### Prerequisites

*   [Node.js](https://nodejs.org/) (version 20 or higher recommended) and npm installed.
*   [Git](https://git-scm.com/downloads) for cloning the repository.

#### 1. Clone the Repository

First, clone the GitSense Chat repository to your local machine:

```bash
git clone https://github.com/gitsense/chat.git
cd chat
```

#### 2. Install Dependencies

Navigate into the cloned directory and install the project dependencies. This step will also automatically build the necessary frontend assets.

```bash
npm install
```

#### 3. Initial Environment Variables Setup

Create a `.env` file in the root of the `chat` directory. Copy the contents of `.env.example` into your new `.env` file. You will configure your API keys in this file later.

```bash
# Example: Copy the template to create your .env file
cp .env.example .env
```

### Docker
<a id=docker></a>

Run GitSense Chat as a Docker container for easy setup and portability.

#### Prerequisites

*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Windows/macOS) or [Docker Engine](https://docs.docker.com/engine/install/) (for Linux) installed and running.

#### 1. Download the Docker Image

```bash
docker pull gitsense/chat
```

#### 2. Retrieve Helper Tools and Configuration

Download the `gsc-docker` helper script and the `.env.example` template. Its main purpose is to significantly simplify managing GitSense Chat as a Docker container. These files should be placed in a dedicated directory on your machine (e.g., `~/gitsense-chat-docker/`).

```bash
# Create a directory for your Docker setup (optional, but recommended)
mkdir -p ~/gitsense-chat-docker
cd ~/gitsense-chat-docker

# Download the gsc-docker helper script
curl -o gsc-docker https://raw.githubusercontent.com/gitsense/chat/main/bin/gsc-docker

# Download the .env.example template
curl -o .env.example https://raw.githubusercontent.com/gitsense/chat/main/.env.example

# Make the gsc-docker script executable
chmod +x gsc-docker
```

**Important:** For convenience, you can move the `gsc-docker` script to a directory in your system's `PATH` (e.g., `/usr/local/bin/`). If you don't, you'll need to run it with `./gsc-docker` from the directory where you saved it.

#### 3. Initial Environment Variables Setup

Create a `.env` file in the **same directory** where you downloaded `gsc-docker` and `.env.example` (e.g., `~/gitsense-chat-docker/`). Copy the contents of `.env.example` into your new `.env` file. You will configure your API keys in this file later.

```bash
# Example: Copy the template to create your .env file
cp .env.example .env
```

## Post-Installation Configuration & Usage
<a id="post-installation-configuration--usage"></a>

Once GitSense Chat is initially installed, you'll need to configure your LLM API keys, learn how to start and stop the application, and use the `gsc-admin` tool for managing models and providers.

**For detailed instructions on all post-installation tasks, please refer to the dedicated guide:**

[**`docs/POST_INSTALLATION.md`**](docs/POST_INSTALLATION.md)

This comprehensive guide covers:
*   Configuring your LLM API keys in the `.env` file.
*   Starting, stopping, checking status, and viewing logs for both NPM and Docker installations.
*   Using the `gsc-admin` command-line tool to manage LLM models, providers, and restore configurations from backup.
*   A step-by-step example of adding a new LLM model.

---

## Full License Details 
<a id=full-license-details></a>

The JavaScript files in this repository are currently provided in a minified distribution. While we finalize the adoption of the **Fair License**, the core terms are as follows:

You are permitted to use and modify this software for **internal, non-commercial purposes**. This means you can integrate GitSense Chat into your workflows, adapt it to your specific needs, and learn from its codebase. However, **copying for profit or redistribution is strictly not permitted**, nor can this software be used to develop or enhance any product or service that directly or indirectly competes with GitSense Chat without explicit permission. Once the Fair License is formally adopted, the unminified source code will be made freely available under these terms.

## Full Business Model Details
<a id=full-business-model-details></a>

GitSense Chat is designed to be a free-to-use application, providing **significant** value to individual developers and teams. Our business model focuses on ensuring the long-term sustainability and continued development of the platform through a commercial offering of the **GitSense Chat Bridge**.

GitSense Chat's **key strength** lies in its ability to import and manage software development data, such as Git repositories, and coordinate indexing at scale. The free version of the GitSense Chat Bridge, while functional, has inherent limitations due to its JavaScript implementation, which currently lacks support for multithreading and other advanced performance optimization capabilities.

Our goal is to generate revenue by charging for a commercial version of the GitSense Chat Bridge. This commercial bridge will offer enhanced performance and scalability, along with significantly more powerful search features, allowing companies to create advanced context engines for use when chatting with LLMs. This approach enables us to keep the core GitSense Chat application free and accessible to everyone, fostering a wide user base while monetizing the specialized, high-performance data ingestion component that is critical for enterprise-level adoption.
```
