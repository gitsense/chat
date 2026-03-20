<!--
Component: Import Data User Guide
Block-UUID: 156a5e92-02a8-44cf-a50a-1ff317ba1139
Parent-UUID: N/A
Version: 1.0.0
Description: User guide for the Import Data component, explaining Dropzone, Manual, and Enterprise import methods.
Language: Markdown
Created-at: 2026-01-30T18:36:09.510Z
Authors: GLM-4.7 (v1.0.0)
-->


# GitSense Chat - Import Data User Guide

This guide explains how to use the **Import Data** component to bring files into GitSense Chat for analysis and conversation.

## Overview

GitSense Chat offers three methods to import data, depending on your workflow and the size of your project:

1.  **Dropzone:** Best for quick uploads of individual files or text snippets directly from your browser.
2.  **Manual (CLI):** Best for importing large existing Git repositories or complete directory structures using the command line.
3.  **Direct (Enterprise):** Best for importing very large codebases or repositories from GitHub URLs via an asynchronous job queue (requires Enterprise component installation).

---

## Method 1: Dropzone (Browser Upload)

This is the default tab. It allows you to quickly upload text files or paste code snippets.

### Step 1: Choose Your Input Mode

At the top of the Dropzone area, you will see a toggle with two options:

#### A. Drag and Drop
Use this to upload files from your computer.
*   **Action:** Drag files into the box or click to browse your file system.
*   **Limits:** Check the limits displayed on the screen (e.g., "0 / 10 files"). These are customizable by your administrator.
*   **Note:** You can select multiple files at once.

#### B. Create Text Snippet
Use this to paste text directly (e.g., a log output, a code snippet, or a config block).
*   **File Name:** Enter a name with the correct extension (e.g., `error.log`, `script.js`) to enable syntax highlighting.
*   **Content:** Paste your text into the text area.

### Step 2: Configure Your Repository

Once you add files or content, the **Repository Configuration** section will appear.

*   **Name Prefix (Optional):** Enter a custom name for your repository (e.g., `my-project`).
    *   If left blank, it defaults to `my-project`.
    *   The system will automatically append a random suffix (e.g., `my-project-a1b2c3d4`) to ensure uniqueness.
*   **Visibility Duration:** Note the time limit displayed (e.g., "1 day").
    *   Dropzone repositories are temporary. They will be automatically hidden from the Repositories tree after this period to keep your workspace organized.

### Step 3: Review and Import

*   **File List:** Review the list of files to be imported.
    *   **Skipped Files:** If you upload binary files (images, PDFs, executables), they will be marked as "Skipped" and will not be imported. Only text files are supported.
    *   **Duplicate Files:** If you upload files with the same name, they will be automatically renamed (e.g., `file_1.js`).
*   **Import:** Click the **Import Files** button.
    *   You will see a confirmation dialog summarizing the import details.
    *   Once confirmed, a progress bar will show the status: *Uploading* → *Creating Repository* → *Importing to GitSense*.

### Step 4: Access Your Data

After the import is complete:
1.  Your files are available in the **Repositories tree** (usually on the right side of the screen).
2.  You can click on files to chat with them or add them to your current conversation context.

---

## Method 2: Manual (CLI)

Use this method for power users who need to import large directories or existing Git repositories.

1.  Click the **Manual** tab.
2.  Follow the **Quick Start** instructions provided in the interface.
3.  **Basic Command Syntax:**
    ```bash
    gscb import git <path-to-repo> <repo-owner> <repo-name> <branch>
    ```
4.  **Docker Users:** If running GitSense Chat in Docker, ensure your `GSC_REPOS_DIR` environment variable is set before starting the container.

---

## Method 3: Direct (Enterprise)

This method is designed for enterprise environments needing to import large codebases asynchronously.

*   **Features:**
    *   Import from local filesystem paths.
    *   Import from GitHub URLs.
    *   Unlimited repository size.
    *   Background job processing.
*   **Note:** If you see a message stating "Component Not Installed," this feature is not currently available on your instance. Contact your administrator to enable it.

---

## Troubleshooting & Tips

### "Binary files will be skipped"
The Dropzone currently only supports **text-based files** (code, logs, JSON, XML, Markdown, etc.).
*   **Supported:** `.js`, `.py`, `.txt`, `.md`, `.json`, `.log`, etc.
*   **Not Supported:** `.png`, `.jpg`, `.pdf`, `.zip`, `.exe`.
*   **Workaround:** Use the **Manual (CLI)** method if you need to import a repository containing binary files.

### File Size Limits
If you receive an error about file size:
*   Check the limits displayed in the Dropzone area.
*   Try uploading fewer files at a time.
*   Contact your administrator to increase the limits if necessary.

### Repository Visibility
*   **Dropzone:** Repositories are temporary (hidden after a set time, e.g., 24 hours).
*   **Manual/CLI:** Repositories are permanent.

### Error During Import
*   **Network Errors:** Check your internet connection and try clicking the **Retry** button in the error dialog.
*   **Validation Errors:** Ensure your repository name contains only valid characters (letters, numbers, hyphens, underscores).
