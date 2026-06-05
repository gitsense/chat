<!--
Component: GitSense Search Tool Backend Search Results Format
Block-UUID: 63b196ca-4cd6-4910-8144-3a1693c1b1a1
Parent-UUID: a92821ed-c08e-4a6e-bec2-9e5bad30c314
Version: 1.4.0
Description: Defines the JSON structure of the data returned by the GitSense backend SearchExecutor after executing a search query. This serves as the data contract for frontend rendering components and multi-stage processing.
Language: Markdown
Created-at: 2025-06-16T18:56:00.000Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0), Gemini 2.5 Flash Thinking (v1.3.0), Gemini 2.5 Flash Thinking (v1.4.0)
-->

# GitSense Chat Tool - Backend Search Results Format

This document specifies the JSON structure of the object returned by the GitSense backend `SearchExecutor.execute` method. This object contains the search results, pagination information, and total counts, formatted for consumption by frontend rendering components and the multi-stage search processor.

Understanding this format is essential for frontend logic responsible for displaying search results, particularly for the overview and detailed result views, and for the AI-assisted workflow's ability to identify relevant files.

## Top-Level Structure

The object returned by `SearchExecutor.execute` has the following top-level properties:

| Property             | Type     | Description                                                                                                |
| :------------------- | :------- | :--------------------------------------------------------------------------------------------------------- |
| `searchCriteria`     | `Object` | The parsed search criteria object used to execute the search. Includes `query`, `scope`, `targets`, `options`, `engine`, `aiAssistant`, etc. |
| `pagination`         | `Object` | Contains pagination details for the current set of results. See [Pagination Object Structure](#pagination-object-structure). |
| `totalCounts`        | `Object` | Provides the total count of matches for each target type *after* applying per-target limits in overview searches. See [Total Counts Object Structure](#total-counts-object-structure). |
| `results`            | `Object` | An object containing arrays of result objects, categorized by `source_type`. See [Results Object Structure](#results-object-structure). |
| `totalResultsReturned` | `Number` | The total number of individual result items included in the `results` object arrays for the current page. This is the sum of `results.chats.length`, `results.messages.length`, and `results.codeBlocks.length`. |

## Pagination Object Structure

The `pagination` object provides details about the current page of results within the overall set of matches (after per-target limits).

| Property       | Type   | Description                                                                 |
| :------------- | :----- | :-------------------------------------------------------------------------- |
| `currentPage`  | `Number` | The current page number (1-based).                                          |
| `totalPages`   | `Number` | The total number of pages available based on `totalResults` and `resultsPerPage`. |
| `totalResults` | `Number` | The total number of matches across all target types *after* per-target limits have been applied. This is the sum of `totalCounts.chats`, `totalCounts.messages`, and `totalCounts.codeBlocks`. |
| `resultsPerPage` | `Number` | The number of results returned on the current page. This should equal `totalResultsReturned`. |

## Total Counts Object Structure

The `totalCounts` object provides the total number of matches found for each target type *after* the per-target limits have been applied in the backend query.

| Property       | Type   | Description                                                                 |
| :------------- | :------- | :-------------------------------------------------------------------------- |
| `chats`        | `Number` | The total number of chat matches after the per-target limit.                |
| `messages`     | `Number` | The total number of message matches after the per-target limit.             |
| `codeBlocks`   | `Number` | The total number of code block matches after the per-target limit.          |

## Results Object Structure

The `results` object contains arrays of individual result items, categorized by their `source_type`.

| Property     | Type    | Description                                                                 |
| :----------- | :------ | :-------------------------------------------------------------------------- |
| `chats`      | `Array` | An array of result objects where `source_type` is `'chat'`. See [Chat Result Object Structure](#chat-result-object-structure). |
| `messages`   | `Array` | An array of result objects where `source_type` is `'message'`. See [Message Result Object Structure](#message-result-object-structure). |
| `codeBlocks` | `Array` | An array of result objects where `source_type` is `'code-block'`. See [Code Block Result Object Structure](#code-block-result-object-structure). |

## Individual Result Object Structure

Each object within the `results` arrays represents a single search match. All result objects share some common top-level properties, and then have type-specific fields derived from the `result_json` and other joined data.

Common Top-Level Properties:

| Property         | Type     | Description                                                                                                | Source                                  | Usage Hint                                   |
| :--------------- | :------- | :--------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :------------------------------------------- |
| `source_type`    | `String` | The type of the source data (`'chat'`, `'message'`, or `'code-block'`). Used to categorize results.         | Literal string added in backend CTEs    | Primary key for frontend rendering logic.    |
| `fts_rank`       | `Number` | The Full-Text Search rank of the match. Lower values indicate higher relevance. Is `0` if no FTS match.     | FTS CTEs (`fts_chats`, `fts_messages`, `fts_code_blocks_trigram`) | Used for sorting results by relevance.       |
| `result_chat_id` | `Number` | The database `id` of the chat that this result belongs to. For chat results, this is the chat's own ID. For message and code block results, this is the ID of the chat containing the message/code block. | Backend CTEs (from `chats.id` or matched CTEs) | Used to link results back to their parent chat. |
| `chat_path`      | `String` | The hierarchical path of the chat (e.g., "Root Chat -> Parent Chat -> Current Chat"). Only present for results linked to a chat. | `chat_path` CTE                         | Displaying chat hierarchy in results.        |

Type-Specific Properties (derived from `result_json` and other selections):

The fields included in the `result_json` object in the SQL query are determined by the `outputs` defined in the active search profile and the `FIELD_TABLE_MAP`. The `SearchExecutor` then parses this `result_json` and merges its contents into the top-level result object. The following sections list common fields you can expect in the final flattened result object based on the default profile and typical outputs. Frontend code should ideally be resilient to missing fields if a custom profile is used. Note that field names here generally correspond to the `cteName` aliases defined in the `FIELD_TABLE_MAP`.

### Chat Result Object Structure (`source_type: 'chat'`)

These objects represent matches found in chat data.

| Property                         | Type     | Description                                                                 | Source                                       | Usage Hint                                   |
| :------------------------------- | :------- | :-------------------------------------------------------------------------- | :------------------------------------------- | :------------------------------------------- |
| `chats_id`                       | `Number` | The database ID of the chat.                                                | `chats.id`                                   | Unique identifier for the chat.              |
| `chats_uuid`                     | `String` | The UUID of the chat.                                                       | `chats.uuid`                                 | Unique identifier for the chat.              |
| `chats_name`                     | `String` | The name of the chat.                                                       | `chats.name` (selected into `result_json`)   | Display name of the chat.                    |
| `chats_type`                     | `String` | The type of the chat (e.g., 'regular', 'code', 'task').                     | `chats.type`                                 | Display chat type.                           |
| `chats_owner`                    | `String` | The owner of the chat.                                                      | `chats.owner`                                | Display chat owner.                          |
| `chats_modified_at`              | `String` | ISO 8601 timestamp of the last modification of the chat.                    | `chats.modified_at`                          | Display last activity time.                  |
| `cte_chat_message_stats_num_messages` | `Number` | The total number of messages in the chat.                                   | `cte_chat_message_stats.num_messages`        | Display message count in chat overview.      |
| `cte_chat_message_stats_last_updated_at` | `String` | ISO 8601 timestamp of the last message update in the chat.                  | `cte_chat_message_stats.last_updated_at`     | Display last activity time in chat overview. |
| `chats_meta_file_path`           | `String` | File path extracted from chat metadata (if applicable).                     | `chats.meta` (JSON extraction)               | Display associated file path.                |
| `chats_meta_git_repo`            | `String` | Git repository name extracted from chat metadata (if applicable).           | `chats.meta` (JSON extraction)               | Display associated repository.               |
| `chats_meta_assignees`           | `Array`  | Array of assignees extracted from chat metadata (if applicable).            | `chats.meta` (JSON extraction into `result_json`) | Display assignees.                           |
| `chats_meta_status`              | `String` | Status extracted from chat metadata (if applicable).                        | `chats.meta` (JSON extraction into `result_json`) | Display status.                              |
| `chats_meta_priority`            | `String` | Priority extracted from chat metadata (if applicable).                      | `chats.meta` (JSON extraction into `result_json`) | Display priority.                            |
| `chats_meta_due_date`            | `String` | Due date extracted from chat metadata (if applicable).                      | `chats.meta` (JSON extraction into `result_json`) | Display due date.                            |
| `chats_meta_tags`                | `Array`  | Array of tags extracted from chat metadata (if applicable).                 | `chats.meta` (JSON extraction into `result_json`) | Display tags.                                |
| `chats_meta_summary`             | `String` | Summary extracted from chat metadata (if applicable).                       | `chats.meta` (JSON extraction into `result_json`) | Display summary.                             |
| `chats_meta_description`         | `String` | Description extracted from chat metadata (if applicable).                   | `chats.meta` (JSON extraction into `result_json`) | Display description.                         |
| `chats_meta_tiny_overview`       | `String` | Tiny Overview extracted from chat metadata (if applicable).                 | `chats.meta` (JSON extraction into `result_json`) | Display Tiny Overview snippet.               |
| `chats_meta_short_overview`      | `String` | Short Overview extracted from chat metadata (if applicable).                | `chats.meta` (JSON extraction into `result_json`) | Display Short Overview snippet.              |
| `chats_meta_long_overview`       | `String` | Long Overview extracted from chat metadata (if applicable).                 | `chats.meta` (JSON extraction into `result_json`) | Display Long Overview snippet.               |

### Message Result Object Structure (`source_type: 'message'`)

These objects represent matches found in message data, including Tiny and Short Overviews.

| Property                         | Type     | Description                                                                 | Source                                       | Usage Hint                                   |
| :------------------------------- | :------- | :-------------------------------------------------------------------------- | :------------------------------------------- | :------------------------------------------- |
| `messages_id`                    | `Number` | The database ID of the message.                                             | `messages.id`                                | Unique identifier for the message.           |
| `messages_chat_id`               | `Number` | The database ID of the chat this message belongs to. **Crucial for linking the overview to its containing `git-*` chat and for frontend navigation.** | `messages.chat_id`                           | Link to parent chat.                         |
| `messages_type`                  | `String` | The type of the message (e.g., 'regular', 'assistant', 'tiny-overview', 'short-overview'). **Used to identify overview messages.** | `messages.type`                              | Display message type.                        |
| `messages_role`                  | `String` | The role of the message sender ('user', 'assistant', 'system').             | `messages.role` (selected into `result_json`) | Display sender role.                         |
| `messages_content`               | `String` | The full content of the message. **For Tiny/Short Overviews, this is the overview text.** | `messages.message` (selected into `result_json`) | Display full message content.                |
| `messages_content_snippet`       | `String` | A snippet of the message content, potentially with highlighting.             | FTS snippet or `substr(messages.message)` (selected into `result_json`) | Display relevant part of message content.    |
| `messages_meta_file_path`        | `String` | File path extracted from message metadata (if applicable). **Crucial for identifying the file associated with an overview and for the final list of identified files.** | `messages.meta` (JSON extraction into `result_json`) | Display associated file path.                |
| `messages_meta_git_repo`         | `String` | Git repository name extracted from message metadata (if applicable).        | `messages.meta` (JSON extraction into `result_json`) | Display associated repository.               |
| `messages_meta_assignees`        | `Array`  | Array of assignees extracted from message metadata (if applicable).         | `messages.meta` (JSON extraction into `result_json`) | Display assignees.                           |
| `messages_meta_status`           | `String` | Status extracted from message metadata (if applicable).                     | `messages.meta` (JSON extraction into `result_json`) | Display status.                              |
| `messages_meta_priority`         | `String` | Priority extracted from message metadata (if applicable).                   | `messages.meta` (JSON extraction into `result_json`) | Display priority.                            |
| `messages_meta_due_date`         | `String` | Due date extracted from message metadata (if applicable).                   | `messages.meta` (JSON extraction into `result_json`) | Display due date.                            |
| `messages_meta_tags`             | `Array`  | Array of tags extracted from message metadata (if applicable).              | `messages.meta` (JSON extraction into `result_json`) | Display tags.                                |
| `messages_meta_summary`          | `String` | Summary extracted from message metadata (if applicable).                    | `messages.meta` (JSON extraction into `result_json`) | Display summary.                             |
| `messages_meta_description`      | `String` | Description extracted from message metadata (if applicable).                | `messages.meta` (JSON extraction into `result_json`) | Display description.                         |
| `messages_meta_tiny_overview`    | `String` | Tiny Overview extracted from message metadata (if applicable).              | `messages.meta` (JSON extraction into `result_json`) | Display Tiny Overview snippet.               |
| `messages_meta_short_overview`   | `String` | Short Overview extracted from message metadata (if applicable).             | `messages.meta` (JSON extraction into `result_json`) | Display Short Overview snippet.              |
| `messages_meta_long_overview`    | `String` | Long Overview extracted from message metadata (if applicable).              | `messages.meta` (JSON extraction into `result_json`) | Display Long Overview snippet.               |
| `messages_meta_purpose`          | `String` | The single-sentence purpose of the file extracted from message metadata.    | `messages.meta` (JSON extraction into `result_json`) | Display the file's purpose in search results. |
| `messages_branch_name`           | `String` | The name of the Git branch associated with the message's context (if applicable). | Derived from ancestor `git-ref` chat meta | Useful for filtering/grouping results by branch. **Note: This field is part of the intended output but requires backend implementation to traverse the chat hierarchy and include the branch name in the result object.** |

### Code Block Result Object Structure (`source_type: 'code-block'`)

These objects represent matches found in code block data.

| Property                         | Type     | Description                                                                 | Source                                       | Usage Hint                                   |
| :------------------------------- | :------- | :-------------------------------------------------------------------------- | :------------------------------------------- | :------------------------------------------- |
| `code_blocks_uuid`               | `String` | The UUID of the code block.                                                 | `code_blocks.uuid`                           | Unique identifier for the code block.        |
| `code_blocks_message_id`         | `Number` | The database ID of the message this code block belongs to.                  | `code_blocks.message_id`                     | Link to parent message.                      |
| `code_blocks_content`            | `String` | The full content of the code block.                                         | `code_blocks.content`                        | Display full code content.                   |
| `code_blocks_content_snippet`    | `String` | A snippet of the code block content, potentially with highlighting.         | FTS snippet or `substr(code_blocks.content)` (selected into `result_json`) | Display relevant part of code content.       |
| `code_blocks_component`          | `String` | The component name of the code block.                                       | `code_blocks.component` (selected into `result_json`) | Display component name.                      |
| `code_blocks_parent_uuid`        | `String` | The UUID of the parent code block (if applicable).                          | `code_blocks.parent_uuid` (selected into `result_json`) | Link to parent code block.                   |
| `code_blocks_major_version`      | `Number` | The major version of the code block.                                        | `code_blocks.major` (selected into `result_json`) | Display version.                             |
| `code_blocks_minor_version`      | `Number` | The minor version of the code block.                                        | `code_blocks.minor` (selected into `result_json`) | Display version.                             |
| `code_blocks_patch_version`      | `Number` | The patch version of the code block.                                        | `code_blocks.patch` (selected into `result_json`) | Display version.                             |
| `code_blocks_header`             | `Object` | The parsed JSON header of the code block.                                   | `code_blocks.header` (JSON parsing after selection into `result_json`) | Access header metadata (UUID, Version, etc.). |
| `code_blocks_created_at`         | `String` | ISO 8601 timestamp of when the code block was created.                      | `code_blocks.created_at` (selected into `result_json`) | Display creation time.                       |
| `code_blocks_size`               | `Number` | The size of the code block content in bytes.                                | `code_blocks.size` (selected into `result_json`) | Display size.                                |
| `code_blocks_meta_file_path`     | `String` | File path extracted from code block metadata (if applicable).               | `code_blocks.header` (JSON extraction into `result_json`) | Display associated file path.                |
| `code_blocks_meta_git_repo`      | `String` | Git repository name extracted from code block metadata (if applicable).     | `code_blocks.header` (JSON extraction into `result_json`) | Display associated repository.               |
| `code_blocks_meta_assignees`     | `Array`  | Array of assignees extracted from code block metadata (if applicable).      | `code_blocks.header` (JSON extraction into `result_json`) | Display assignees.                           |
| `code_blocks_meta_status`        | `String` | Status extracted from code block metadata (if applicable).                  | `code_blocks.header` (JSON extraction into `result_json`) | Display status.                              |
| `code_blocks_meta_priority`      | `String` | Priority extracted from code block metadata (if applicable).                | `code_blocks.header` (JSON extraction into `result_json`) | Display priority.                            |
| `code_blocks_meta_due_date`      | `String` | Due date extracted from code block metadata (if applicable).                | `code_blocks.header` (JSON extraction into `result_json`) | Display due date.                            |
| `code_blocks_meta_tags`          | `Array`  | Array of tags extracted from code block metadata (if applicable).           | `code_blocks.header` (JSON extraction into `result_json`) | Display tags.                                |
| `code_blocks_meta_summary`       | `String` | Summary extracted from code block metadata (if applicable).                 | `code_blocks.header` (JSON extraction into `result_json`) | Display summary.                             |
| `code_blocks_meta_tiny_overview` | `String` | Tiny Overview extracted from code block metadata (if applicable).           | `code_blocks.header` (JSON extraction into `result_json`) | Display Tiny Overview snippet.               |
| `code_blocks_meta_short_overview`| `String` | Short Overview extracted from code block metadata (if applicable).          | `code_blocks.header` (JSON extraction into `result_json`) | Display Short Overview snippet.              |
| `code_blocks_meta_long_overview` | `String` | Long Overview extracted from code block metadata (if applicable).           | `code_blocks.header` (JSON extraction into `result_json`) | Display Long Overview snippet.               |
| `code_blocks_branch_name`        | `String` | The name of the Git branch associated with the code block's context (if applicable). | Derived from ancestor `git-ref` chat meta | Useful for filtering/grouping results by branch. **Note: This field is part of the intended output but requires backend implementation to traverse the chat hierarchy and include the branch name in the result object.** |
