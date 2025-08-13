<!--
Component: GitSense Chat README
Block-UUID: 84313538-6e88-4652-a8b8-ec7295a91592
Parent-UUID: c61c6598-fc84-43f1-bda4-016aef9e28ab
Version: 1.3.0
Description: A comprehensive README for GitSense Chat, detailing its purpose, features, licensing, and installation.
Language: Markdown
Created-at: 2025-08-11T15:31:31.637Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0), Gemini 2.5 Flash Thinking (v1.3.0)
-->


# GitSense Chat

GitSense Chat is reimagining how we can interact with Large Language Models (LLMs) to build better software, together. It provides an effective, intuitive environment for building highly relevant context, generating traceable code, managing knowledge, creating custom AI search assistants and more.

**🚀 Try GitSense Chat Live: [https://chat.gitsense.com](https://chat.gitsense.com)**

![GitSense Chat Home Page Screenshot](https://github.com/gitsense/chat/raw/main/assets/images/gitsense-chat-home-page-bordered.png)

## Table of Contents

*   [Why Use GitSense Chat?](#why-use-gitsense-chat)
    *   [No Lock-in, Just Better Workflows](#no-lock-in)
    *   [Empowering Code Creation with AI](#collaborate-not-delegate)
    *   [Seamless Data Integration](#seamless-data-integration)
    *   [Context Engineering](#context-engineering)
    *   [AI-Assisted Search](#ai-assisted-search)
    *   [AI-Powered Data](#ai-powered-data)
    *   [Next-Gen Knowledge Base](#next-gen-knowledge-base)
*   [License and Business Model](#license-and-business-model)
    *   [License](#license)
    *   [Business Model](#business-model)
*   [Installation](#installation)
    *   [NPM](#npm)
    *   [Docker](#docker)

## Why Use GitSense Chat?
<a id=why-use-gitsense-chat></a>
GitSense Chat is more than just a chat interface; it's a powerful platform designed to transform how users interact with their information and AI. Here are some of its key features:

### No Lock-in, Just Better Workflows
<a id=no-lock-in></a>

GitSense Chat is designed to be your **starting point for every LLM conversation**, not a walled garden. We empower you to define precise context, generate traceable code, and manage knowledge with unparalleled efficiency. Once you've crafted your perfect LLM interaction, our **Messages Tool** makes it dead simple to extract and copy your conversation content-including code, notes, and context-for seamless use in your IDE (like VS Code or Aider), other LLM solutions, or any documentation.

We're confident that once you experience the clarity, control, and traceability GitSense Chat provides, you'll want to come back for its other rich features. Our goal is to enhance your existing workflows, not replace them.

![No Lock-in](https://github.com/gitsense/chat/raw/main/assets/images/no-lock-in-bordered.png)

### Empowering Code Creation with AI
<a id=collaborate-not-delegate></a>

The quality of AI-generated code is directly dependent on the clarity and precision of human instructions. Understand every piece of generated code, with full traceability back to its conversational origin, versioning, and authorship. This isn't about humans versus AI; it's about **empowering humans** to achieve more by effectively guiding AI.

![Traceability](https://github.com/gitsense/chat/raw/main/assets/images/traceability-bordered.png)

### Seamless Data Integration
<a id=seamless-data-integration></a>

**AI <-> Your Data:** GitSense Chat lets you chat directly with your own information using Large Language Models. This means you can now chat with your codebase and other development data, turning them into interactive knowledge sources.

This capability is powered by the **GitSense Chat Bridge** (available in both free and commercial versions). The Bridge seamlessly imports your Git repositories into the application, transforming your code into an interactive knowledge base. We are actively expanding its capabilities to integrate with GitHub issues, pull requests, and more, ensuring all your development data is AI-ready.

![Seamless Data Integration](https://github.com/gitsense/chat/raw/main/assets/images/seamless-data-integration-bordered.png)

### Context Engineering
<a id=context-engineering></a>

Significantly improve the accuracy, relevance, and cost-efficiency of LLM responses by precisely managing the context you provide. GitSense Chat provides intuitive tools to build, refine, and manage the LLM's knowledge base, ensuring it always has the most relevant data for any task.

![Context Engineering](https://github.com/gitsense/chat/raw/main/assets/images/context-engineering-bordered.png)

### AI-Assisted Search
<a id=ai-assisted-search></a>

Quickly find precise, tailored answers across your data with AI-assisted search. Ask complex questions in natural language, and let AI intelligently refine your queries.

![AI-Assisted Search](https://github.com/gitsense/chat/raw/main/assets/images/ai-search-bordered.png)

### AI-Powered Data
<a id=ai-powered-data></a>

Turn any text into structured, actionable insights. Simply chat with an LLM to create custom Analyzers that can extract structured data and summaries, enabling powerful search and analysis.

![AI-Assisted Search](https://github.com/gitsense/chat/raw/main/assets/images/ai-data-bordered.png)

### Next-Gen Knowledge Base
<a id=next-gen-knowledge-base></a>

Create a wiki that you can truly chat with, offering a dynamic and conversational experience unlike traditional wikis. This transforms how technical documents and training materials are created and consumed, fostering a more interactive and accessible learning environment.

![Knowledge Base](https://github.com/gitsense/chat/raw/main/assets/images/knowledge-base-bordered.png)

## License and Business Model
<a id=license-and-business-model></a>

GitSense Chat is provided under a **Fair License**, permitting internal, non-commercial use and modification. Copying for profit or redistribution, or use in directly competing products/services, is strictly prohibited without explicit permission.

Our business model focuses on ensuring the long-term sustainability and continued development of the platform through a commercial version of the **GitSense Chat Bridge**.

[Read the full license details below.](#full-license-details)
[Learn more about our business model below.](#full-business-model-details)

## Installation
<a id=installation></a>

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

#### 3. Configure Environment Variables

Create a `.env` file in the root of the `chat` directory. Copy the contents of `.env.example` into your new `.env` file and fill in your API keys for the AI model providers you wish to use (e.g., OpenAI, Anthropic, Google).

```bash
# Example: Copy the template to create your .env file
cp .env.example .env

# Now, open .env in a text editor and add your API keys
# nano .env
```

> **Important:** If GitSense Chat is currently running, you must stop and then start the application after updating your `.env` file for the changes to take effect.

#### 4. Start the Application

From the `chat` directory, start the application. This uses `forever` (a dependency installed via `npm install`) to keep the application running in the background.

```bash
npm start
```

The application will be accessible on port `3357`.

#### 5. Access the Application

Open your web browser and go to: [http://localhost:3357](http://localhost:3357)

#### 6. Stop the Application

To stop the running application:

```bash
npm stop
```

#### Additional Commands

*   **Check Status:** `npm status`
*   **View Logs:** `npm logs` (Note: `npm logs` is not a standard npm script. You would typically use `forever logs` if `forever` is installed globally, or inspect logs directly from the `forever` process. For simplicity, `npm status` will show if it's running.)

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

#### 3. Configure Environment Variables

Create a `.env` file in the **same directory** where you downloaded `gsc-docker` and `.env.example` (e.g., `~/gitsense-chat-docker/`).

Copy the contents of `.env.example` into your new `.env` file and fill in your API keys for the AI model providers you wish to use.

```bash
# Example: Copy the template to create your .env file
cp .env.example .env

# Now, open .env in a text editor and add your API keys
# nano .env
```

> **Important:** If GitSense Chat is currently running, you must stop and then start the application after updating your `.env` file for the changes to take effect.

#### 4. Start the Application

Navigate to the directory containing your `.env` file (e.g., `~/gitsense-chat-docker/`) and run:

```bash
gsc-docker start
```

This command will:
*   Create a persistent Docker volume for your application data.
*   Mount your `.env` file into the container.
*   Start the GitSense Chat application, accessible on port `3357`.

#### 5. Access the Application

Open your web browser and go to: [http://localhost:3357](http://localhost:3357/)

#### 6. Stop the Application

To stop and remove the running container:

```bash
gsc-docker stop
```

#### Additional Commands

*   **Check Status:** `gsc-docker status`
*   **View Logs:** `gsc-docker logs` (Press `Ctrl+C` to exit)

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
