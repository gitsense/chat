<!--
Component: GitSense Search Tool Search Profiles Directory README
Block-UUID: 9875261b-4cb7-4956-9321-4ba5d731f01b
Parent-UUID: N/A
Version: 1.0.0
Description: Documentation for the search profiles directory and the structure of profile configuration files.
Language: Markdown
Created-at: 2025-05-31T17:25:13.753Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0)
-->

# Search Profiles

This directory (`backend/gitsense/profiles/`) contains JSON configuration files that define **Search Profiles** for the GitSense Chat search tool.

Search profiles allow users (and the AI Assistant) to define and save custom default search settings for different types of searches. This helps streamline common queries, provides consistency, and is essential for enabling the AI Assistant to optimize searches based on user intent.

## Profile File Structure

Each file in this directory (excluding `profileLoader.js` and this `README.md`) should be a JSON file representing a single search profile. The file name (without the `.json` extension) serves as the profile's identifier (e.g., `default.json` defines the `default` profile).

The structure of a search profile JSON file is defined by the schema located at `./profile.schema.json`. This schema specifies the required properties, data types, and acceptable values for a valid profile configuration.

Key sections within a profile file include:

*   **`name`**: A unique identifier for the profile.
*   **`description`**: A human-readable explanation of the profile's purpose.
*   **`version`**: The version of the profile schema the file adheres to.
*   **`keywords`**: An array of strings listing terms relevant to the profile's content or purpose. This field is primarily used by the AI Assistant to help select the most appropriate profile for a given user query.
*   **`defaults`**: An object containing default search parameters such as `targets`, `scope`, `filters`, `nullFilters`, `notNullFilters`, `options`, `sortBy`, and `pagination`. These defaults are applied to a search query unless explicitly overridden by the user's input string.
*   **`rankingPreferences`**: A placeholder object for future implementation related to LLM-based result ranking.

## Schema Validation

The `profile.schema.json` file provides a formal definition of the expected JSON structure. It is recommended that profile files are validated against this schema to ensure correctness and compatibility with the `profileLoader`.

## Profile Loading

The `profileLoader.js` module in this directory is responsible for reading and parsing the JSON profile files. The `SearchBuilder` uses this module to load the profile specified in the user's query (via the `profile:<name>` syntax) or the `default` profile if none is specified.

## Adding New Profiles

To add a new search profile, create a new `.json` file in this directory following the structure defined in `profile.schema.json`. Ensure the file name is unique and descriptive of the profile's purpose.
