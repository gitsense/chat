<!--
Component: Analyze Messages README
Block-UUID: f0a9f31b-89a3-4df4-906c-17ff032953ff
Parent-UUID: N/A
Version: 1.0.0
Description: Documentation for the messages/analyze directory structure and adding new analyzers.
Language: markdown
Created-at: 2025-07-10T17:25:25.013Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0)
-->

# Analyze Messages Directory Structure

This directory (`messages/analyze`) contains the templates used to generate chat messages for the "Analyze" chat type. The structure is designed to be modular, allowing for easy addition of new analyzer types, content sources, and instruction sets.

The directory follows a hierarchical structure:

`messages/analyze/{analyzer}/{content}/{instructions}/`

Where:

*   **`{analyzer}`**: Represents the type of analyzer to be performed (e.g., `tiny-overview`, `short-overview`). These are the top-level directories under `messages/analyze` (excluding `_shared`).
*   **`{content}`**: Represents the source or type of content being analyzed (e.g., `file-content`, `git-blob`). These are directories nested within an `{analyzer}` directory.
*   **`{instructions}`**: Represents the specific set of instructions or prompt variations for the given analyzer and content type (e.g., `default`, `detailed`). These are directories nested within a `{content}` directory.

Within the `{instructions}` directory, you will find the Markdown files (`.md`) containing the actual message content templates. There may also be a `config.json` file at any level (`{analyzer}`, `{content}`, or `{instructions}`) to provide a human-readable label for that option in the UI menus.

## Naming Conventions

To be recognized by the system, directory names within `messages/analyze` must adhere to the following rules:

*   Cannot start with an underscore (`_`).
*   Must only contain alphanumeric characters (a-z, A-Z, 0-9), dashes (`-`), or underscores (`_`). Dots (`.`) are not allowed in directory names.

Files starting with an underscore (`_`) or having a `.md` extension are ignored when building the menu options, but are used when constructing the actual chat messages.

## Adding a New Analyzer Type

To add a new analyzer type, follow these steps:

1.  **Create the Analysis Directory:** Under `messages/analyze/`, create a new directory for your analyzer type. The directory name should follow the naming conventions (e.g., `my-new-analyzer`).
2.  **(Optional) Add Analysis Config:** Inside your new analyzer directory (`messages/analyze/my-new-analyzer/`), you can optionally create a `config.json` file to define a human-readable label for this analyzer type in the menu:
    ```json
    {
        "label": "My New Analysis"
    }
    ```
    If `config.json` is not present or lacks a `label`, the directory name (`my-new-analyzer`) will be used as the label.
3.  **Create the Content Directory:** Inside your analyzer directory (`messages/analyze/my-new-analyzer/`), create a directory for the content type you want to analyze (e.g., `file-content`). The directory name must follow the naming conventions.
4.  **(Optional) Add Content Config:** Inside your content directory (`messages/analyze/my-new-analyzer/file-content/`), you can optionally create a `config.json` file for the content type label:
    ```json
    {
        "label": "File Content"
    }
    ```
5.  **Create the Instructions Directory:** Inside your content directory (`messages/analyze/my-new-analyzer/file-content/`), create a directory for the specific instructions set (e.g., `default`). The directory name must follow the naming conventions.
6.  **(Optional) Add Instructions Config:** Inside your instructions directory (`messages/analyze/my-new-analyzer/file-content/default/`), you can optionally create a `config.json` file for the instructions label:
    ```json
    {
        "label": "Default Instructions"
    }
    ```
7.  **Add Message Template Files:** Inside your instructions directory (`messages/analyze/my-new-analyzer/file-content/default/`), add the Markdown files (`.md`) that define the chat messages for this specific analyzer, content, and instruction combination. These files should be named numerically (e.g., `1.md`, `2.md`) and follow the instructions in the `Message Format Specification` README.md which is in the parent `messages` directory. If this README file is not in context, ask the user to load it.

By following this structure, your new analyzer type will be automatically picked up by the system and become available in the "Analyze" chat menu options.

## Example Structure

Based on the provided tree, the structure maps as follows:

```
messages/analyze/
└── tiny-overview/         <- Analysis Type (name: "tiny-overview", label: "Tiny Overview" from config.json)
    ├── config.json
    └── file-content/      <- Content Type (name: "file-content", label: "File Content" from config.json)
        ├── config.json
        └── default/       <- Instructions Type (name: "default", label: "Default" from config.json)
            ├── 1.md       <- Message template file
            └── config.json
```

The utility will traverse this structure and build the menu options based on the valid directories found at each level and their corresponding `config.json` files.
