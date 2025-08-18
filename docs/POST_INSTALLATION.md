<!--
Component: GitSense Chat Post-Installation Guide
Block-UUID: {{GS-UUID}}
Parent-UUID: N/A
Version: 1.0.0
Description: A comprehensive guide for configuring and managing GitSense Chat after initial installation, covering environment variables, application control, and the gsc-admin tool.
Language: Markdown
Created-at: 2025-08-13T14:47:36.607Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0)
-->


# GitSense Chat: Post-Installation Configuration & Usage

This document provides detailed instructions for configuring and managing your GitSense Chat application after the initial installation. These steps apply whether you installed GitSense Chat via NPM or Docker.

Throughout this guide, commands will be presented with both NPM and Docker variations. Choose the command that corresponds to your installation method.

---

## Table of Contents

*   [1. Configuring Environment Variables (API Keys)](#1-configuring-environment-variables-api-keys)
*   [2. Starting and Stopping GitSense Chat](#2-starting-and-stopping-gitsense-chat)
*   [3. Accessing the Application](#3-accessing-the-application)
*   [4. Managing LLM Models and Providers](#4-managing-llm-models-and-providers)
    *   [Introduction to `gsc-admin`](#introduction-to-gsc-admin)
    *   [Command Syntax](#command-syntax)
    *   [Example: Setting a Default LLM Model](#example-setting-default-model)
    *   [Example: Adding a New LLM Model](#example-adding-a-new-llm-model)
    *   [Other `gsc-admin llm` Commands](#other-gsc-admin-llm-commands)
*   [5. Restoring Configuration from Backup](#5-restoring-configuration-from-backup)

---

## 1. Configuring Environment Variables (API Keys)
<a id="1-configuring-environment-variables-api-keys"></a>

GitSense Chat uses environment variables to securely store API keys for your Large Language Model (LLM) providers (e.g., OpenAI, Anthropic, Google). These variables are loaded from a `.env` file.

1.  **Locate your `.env` file:**
    *   **NPM Installation:** The `.env` file is located in the root directory of your cloned `chat` repository.
    *   **Docker Installation:** The `.env` file is located in the dedicated directory where you downloaded `gsc-docker` and `.env.example` (e.g., `~/gitsense-chat-docker/`).

2.  **Edit the `.env` file:**
    Open the `.env` file in a text editor. You will find example entries for various providers. Uncomment the lines for the providers you wish to use and replace the placeholder values with your actual API keys.

    **Example `.env` content:**
    ```dotenv
    # OpenAI API Key
    OPENAI_API_KEY="sk-YOUR_OPENAI_API_KEY_HERE"

    # Anthropic API Key
    ANTHROPIC_API_KEY="sk-ant-api03-YOUR_ANTHROPIC_API_KEY_HERE"

    # Google Gemini API Key
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

    # ... other provider API keys
    ```

    **Important:**
    *   **Do not commit your `.env` file to version control.** It contains sensitive information.
    *   After making changes to your `.env` file, you **must stop and then start** the GitSense Chat application for the changes to take effect.

---

## 2. Starting and Stopping GitSense Chat
<a id="2-starting-and-stopping-gitsense-chat"></a>

Use the following commands to control the GitSense Chat application based on your installation method.

### NPM Installation

Navigate to the root directory of your cloned `chat` repository.

*   **Start the application:**
    ```bash
    npm start
    ```
    This uses `forever` (a dependency installed via `npm install`) to keep the application running in the background.

*   **Stop the application:**
    ```bash
    npm stop
    ```

*   **Check application status:**
    ```bash
    npm run status
    ```

*   **View application logs:**
    ```bash
    npm logs
    ```

### Docker Installation

Navigate to the directory where you downloaded the `gsc-docker` script (e.g., `~/gitsense-chat-docker/`).

*   **Start the application:**
    ```bash
    gsc-docker start
    ```
    This command will create a persistent Docker volume for your application data, mount your `.env` file, and start the GitSense Chat container.

*   **Stop the application:**
    ```bash
    gsc-docker stop
    ```
    This will stop and remove the running container.

*   **Check application status:**
    ```bash
    gsc-docker status
    ```

*   **View application logs:**
    ```bash
    gsc-docker logs
    ```
    (Press `Ctrl+C` to exit the log stream.)

---

## 3. Accessing the Application
<a id="3-accessing-the-application"></a>

Once the application is running, open your web browser and go to:

[http://localhost:3357](http://localhost:3357)

---

## 4. Managing LLM Models and Providers
<a id="4-managing-llm-models-and-providers"></a>

GitSense Chat provides a command-line administration tool, `gsc-admin`, to manage your LLM models and providers directly within the `chat.json` configuration file. This tool offers interactive prompts to guide you through the process.

### Introduction to `gsc-admin`
<a id="introduction-to-gsc-admin"></a>

The `gsc-admin` tool is a powerful utility for:
*   Adding, removing, and listing LLM providers.
*   Adding, removing, listing, reordering, and setting a default LLM model.
*   Adding and removing visual dividers in your model list.
*   Restoring your `chat.json` configuration from backups.

### Command Syntax
<a id="command-syntax"></a>

The way you invoke `gsc-admin` depends on your installation method:

*   **NPM Installation:**
    ```bash
    npm run gsc-admin <command>
    ```
    Example: `npm run gsc-admin llm list models`

*   **Docker Installation:**
    ```bash
    gsc-docker admin <command>
    ```
    Example: `gsc-docker admin llm list models`

    The `gsc-docker admin` command acts as a convenient proxy, executing the `gsc-admin` tool inside your running Docker container.

### Example: Setting a Default LLM Model
<a id="example-setting-default-model"></a>

You can easily set an existing model as the default using its display name or index. This is useful if you want a specific model to be pre-selected when users open GitSense Chat.

Let's say you want to make "GPT-4o" the default model.

**1. Start the command:**

*   **NPM:**
    ```bash
    npm run gsc-admin llm set-default-model "GPT-4o"
    ```
*   **Docker:**
    ```bash
    gsc-docker admin llm set-default-model "GPT-4o"
    ```

### Example: Adding a New LLM Model
<a id="example-adding-a-new-llm-model"></a>

Let's walk through an example of adding a new LLM model, such as "My Custom GPT-4" using an existing "OpenAI" provider. The `gsc-admin llm add model` command is interactive and will guide you.

**1. Start the command:**

*   **NPM:**
    ```bash
    npm run gsc-admin llm add model
    ```
*   **Docker:**
    ```bash
    gsc-docker admin llm add model
    ```

**2. Follow the interactive prompts:**

You will be guided through a series of questions:

*   **Select the provider for this model:**
    ```
    ? Select the provider for this model: (Use arrow keys)
    ❯ Anthropic
      DeepInfra
      DeepSeek
      Google
      Groq
      OpenAI
      OpenRouter
      together.ai
      [Create New Provider]
    ```
    *   Use arrow keys to select `OpenAI` and press Enter.

*   **Enter the display name for the new model:**
    ```
    ? Enter the display name for the new model (e.g., 'My Custom GPT-4'): My Custom GPT-4
    ```
    *   Type `My Custom GPT-4` and press Enter.

*   **Enter the model ID:**
    ```
    ? Enter the model ID:
      (e.g., 'gpt-4o', 'claude-3-5-sonnet-20241022')
      You can usually find this on the provider's API documentation or model list page.
    gpt-4
    ```
    *   Type `gpt-4` and press Enter.

*   **Enter the max allowable output tokens:**
    ```
    ? Enter the max allowable output tokens:
      (Your value cannot exceed the model's actual maximum output token capability.)
      (e.g., 8192, 20000)
    4096
    ```
    *   Type `4096` and press Enter.

*   **Should this be the default model?**
    ```
    ? Should this be the default model? (y/N) N
    ```
    *   Type `N` (or `y` if you want it to be the default) and press Enter.

*   **Current Models and Dividers (for positioning):**
    The tool will display the current order of your models and dividers, numbered.
    ```
    Models and Dividers (Current Order):
    0: Claude 3.5 Haiku (Anthropic)
    1: Claude 3.5 Sonnet (Anthropic)
    ...
    8: GPT-4o mini (OpenAI) [default]
    9: ---------
    10: OpenRouter - DeepSeek v3 (OpenRouter)
    ...
    ```

*   **Where would you like to place this new model?**
    ```
    ? Where would you like to place this new model? (Optional)
      (Enter 0-based index, 'top', 'end', 'before <num>', 'after <num>')
      (Press Enter to add to the bottom of the list) 8
    ```
    *   Type `8` (to place it before `GPT-4o mini`) and press Enter.

*   **Would you like to add a divider near this new model?**
    ```
    ? Would you like to add a divider near this new model? (y/N) N
    ```
    *   Type `N` and press Enter.

*   **Preview of New Order & Confirmation:**
    The tool will show a preview of how your `models` list will look in `chat.json` and ask for final confirmation.
    ```
    --- Preview of New Order ---
    0: Claude 3.5 Haiku (Anthropic)
    ...
    7: GPT-4o (OpenAI)
    8: My Custom GPT-4 (OpenAI)
    9: GPT-4o mini (OpenAI) [default]
    ...
    ----------------------------
    ? Confirm adding this model (and optional divider) with the above order? (Y/n) Y
    ```
    *   Type `Y` and press Enter.

**3. Completion:**
The tool will confirm that the model has been added to `chat.json`. Remember to restart your GitSense Chat application for the changes to take effect.

### Other `gsc-admin llm` Commands
<a id="other-gsc-admin-llm-commands"></a>

The `gsc-admin llm` tool supports a variety of commands for managing your LLM configuration:

*   **`gsc-admin llm list providers`**: Lists all configured LLM providers.
*   **`gsc-admin llm list models`**: Lists all configured LLM models and dividers in their current order.
*   **`gsc-admin llm set-default-model [name_or_index]`**: Sets the specified model as the default. 
*   **`gsc-admin llm add provider`**: Interactively adds a new LLM provider.
*   **`gsc-admin llm remove model [name_or_index]`**: Removes a model by its display name or numbered index. If no argument is provided, it will prompt interactively.
*   **`gsc-admin llm remove provider [name]`**: Removes a provider by its name. If no argument is provided, it will prompt interactively.
*   **`gsc-admin llm add divider [--index <num>]`**: Adds a visual divider to the model list.
*   **`gsc-admin llm remove divider [index] [--all]`**: Removes a divider by its numbered index, or all dividers with `--all`. If no argument is provided (and `--all` is not used), it will prompt interactively.
*   **`gsc-admin llm move model [name_or_index] [options]`**: Moves an existing model to a new position. If no argument is provided, it will prompt interactively.
*   **`gsc-admin llm move divider [index] [options]`**: Moves an existing divider to a new position. If no argument is provided, it will prompt interactively.
*   **`gsc-admin llm order models`**: Provides an interactive session for applying multiple reordering and divider adjustments with a live preview.

For comprehensive details on any command and its options, use the built-in help:

*   **NPM:** `npm run gsc-admin -- help` (for top-level commands) or `npm run gsc-admin llm -- help` (for LLM subcommands).
*   **Docker:** `gsc-docker admin -- help` or `gsc-docker admin llm -- help`.

---

## 5. Restoring Configuration from Backup
<a id="5-restoring-configuration-from-backup"></a>

The `gsc-admin` tool automatically creates rolling backups of your `chat.json` file whenever changes are saved. You can use the `gsc-admin config restore` command to revert to a previous version of your configuration.

**Important:** Restoring a backup will **overwrite your current `chat.json` file**. The tool will create an "undo" backup of your current `chat.json` before proceeding with the restore.

**1. Start the command:**

*   **NPM:**
    ```bash
    npm run gsc-admin config restore
    ```
*   **Docker:**
    ```bash
    gsc-docker admin config restore
    ```

**2. Follow the interactive prompts:**

The tool will list available backups (newest first) and prompt you to select one by number. It will then ask for explicit confirmation before proceeding with the overwrite.
