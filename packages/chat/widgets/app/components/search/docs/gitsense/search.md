<!--
Component: Search Configuration Specification
Block-UUID: 6acd4dda-a0bb-449b-8334-95588b0bf523
Parent-UUID: 1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f
Version: 1.10.0
Description: Describes the JSON structure for the `config` object used within a `gitsense-tool` block to define the user interface and behavior of the "search" tool in GitSense Chat.
Language: Markdown
Created-at: 2025-07-15T03:00:17.510Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0), Gemini 2.5 Flash Thinking (v1.3.0), Claude 3.5 Sonnet (v1.4.0), Gemini 2.5 Flash Thinking (v1.5.0), Gemini 2.5 Flash Thinking (v1.6.0), Gemini 2.5 Flash Thinking (v1.7.0), Gemini 2.5 Flash Thinking (v1.8.0), Gemini 2.5 Flash Thinking (v1.8.1), Gemini 2.5 Flash Thinking (v1.9.0), Gemini 2.5 Flash Thinking (v1.10.0)
-->


# GitSense Chat Tool - Search Configuration Specification

This document describes the JSON structure for the `config` object used within a `gitsense-tool` block to define the user interface and behavior of the "search" tool in GitSense Chat.

The "search" tool is triggered by including a `gitsense-tool` block in an assistant message with `"tool": "search"`. The `config` object within this block provides a declarative way to define the layout, elements, actions, and styling of the search interface presented to the user.

## Tool Block Example (Minimal)

\```txt
# GitSense Chat Tool

{
   "tool": "search",
   "config": {
      "layout": "default",
      "engine": "gitsense"
   }
}
\```

## Config Object Structure

The `config` object is the root of the search tool's configuration. It supports the following top-level properties:

| Property   | Type     | Required | Description                                                                                                |
| :--------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------- |
| `layout`   | `String` or `Array` | Yes      | Defines the arrangement of UI elements in rows. Can be a string name referencing a predefined layout (e.g., `"default"`) provided by the selected `engine`, or an array of `Row` objects for an inline definition. |
| `engine`   | `String` | Yes      | Specifies the search engine to use (e.g., `"gitsense"`). This name is used to load the corresponding engine object, which provides the action map, validation, execution, and layout retrieval logic. |
| `actions`  | `Object` | No       | **(Typically loaded via `engine`)** Defines the actions triggered by UI elements. Keys are element `name`s. If provided inline, may override actions loaded from the specified `engine`. After parsing, the full engine object is stored under the `engine` property, and its actions are also available under `config.actions`. |
| `sections` | `Array`  | No       | Defines collapsible or grouped sections of UI elements. Each item is a `Section` object.                   |
| `style`    | `Object` | No       | Optional CSS-like style properties for the main tool container.                                            |
| `states`   | `Array`  | No       | An array of state objects that track the progress and history of the multi-stage search process. **See [Search States Specification (states.md)](./states.md) for detailed information.** |
| `data`     | `Object` | No       | An object used to store persistent data needed across different stages of the search process (e.g., search criteria, intermediate results). This object will also store the `parsedQuery` object, which includes the name of the active search `profile` (determined by the `profile:` syntax in the query or the default). **For AI-assisted searches, if the final review stage identifies relevant files, this object may also contain an `identifiedFiles` array. Each item in this array is an object with `path` (string) and `chat_id` (number) properties, representing a file identified as relevant to the user's query.** |

**Note:**

The `actions` object and the layout array are typically loaded automatically by the `configParser` based on the specified `engine`. Engine definitions are located in dedicated directories under `engines/` (e.g., `engines/gitsense/`) . Providing `layout` as an array or `actions` object directly in the tool block JSON is possible but less common for standard configurations and may be used for specific overrides.

**Note on AI-Assisted Search Scope:**

When the AI Assistant is enabled for a search, the GitSense engine currently restricts the search scope to messages within chats of type `git-*` (e.g., `git-repository`, `git-blob`, `git-tree`, `git-commit`, `git-diff`). This AI-assisted workflow primarily leverages the Tiny and Short Overviews stored as messages within these chats to identify relevant files or provide direct answers. Direct searches (when the AI Assistant is off) can search across all data types and chat types within the configured scope.

## Engine Structure

Each search engine is defined as an object, typically exported from an `index.js` file within its own directory under the top-level `engines/` directory (e.g., `engines/gitsense/index.js`).

A standard engine object should include:

*   `name`: A string identifier for the engine.
*   `actions`: An object mapping element names to action configurations.
*   `validateCriteria(searchCriteria)`: A function to validate the collected search criteria.
*   `processSearch(message, config, contentBody, context)`: An async function to perform the search, orchestrating the multi-stage process.
*   `renderResults(results, searchCriteria, pagination, context)`: A function to format search results into Markdown.
*   `getLayout(layoutName)`: A function to retrieve engine-specific layouts by name.

## Row Object Structure

A `Row` object defines a horizontal grouping of UI elements.

| Property   | Type     | Required | Description                                                                 |
| :--------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `type`     | `String`| Yes      | Must be `"row"`.                                                            |
| `elements` | `Array`  | Yes      | An array of `Element` objects to be placed in this row, OR an array of arrays where each inner array contains `Element` objects to be grouped for layout (e.g., `[[...left elements], [...right elements]]`). |
| `style`    | `Object` | No       | Optional CSS-like style properties for the row container.                   |

## Element Object Structure

A `Element` object defines a single UI component within a row. The structure varies based on the `type` of the element. All elements share the following common properties:

| Property | Type     | Required | Description                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `type`   | `String` | Yes      | The type of UI element (e.g., `"input"`, `"button"`, `"radio-group"`, `"link"`, `"checkbox"`, `"multi-select"`, `"select"`, `"text"`, `"image"`). |
| `name`   | `String` | Yes      | A unique identifier for the element within the configuration. Used to link elements to actions defined in the selected `engine`. |
| `style`  | `Object` | No       | Optional CSS-like style properties for the individual element or element group container (if part of a nested `elements` array). |

### Specific Element Types

#### `type: "text"`

A simple text element (e.g., for headers or blurbs).

| Property | Type     | Required | Description                                   |
| :------- | :------- | :------- | :-------------------------------------------- |
| `text`   | `String` | No       | The text content.                             |

#### `type: "image"`

An image element.

| Property | Type     | Required | Description                                   |
| :------- | :------- | :------- | :-------------------------------------------- |
| `src`    | `String` | Yes      | The source URL of the image.                  |
| `alt`    | `String` | No       | Alternative text for the image.               |

#### `type: "input"`

A text input field.

| Property      | Type     | Required | Description                                                                 |
| :------------ | :------- | :------- | :-------------------------------------------------------------------------- |
| `placeholder` | `String` | No       | The placeholder text for the input field.                                   |
| `flex`        | `Number` | No       | Flexbox `flex` property value for layout.                                   |
| `defaultValue`| `String` | No       | The default value of the input field.                                       |
| `controls`    | `Array`  | No       | An array of `InputControl` objects to be displayed to the right of the input. |

#### `type: "button"`

A clickable button.

| Property | Type     | Required | Description             |
| :------- | :------- | :------- | :---------------------- |
| `label`  | `String` | Yes      | The text on the button. |

#### `type: "radio-group"`

A group of radio buttons.

| Property       | Type     | Required | Description                                                                 |
| :------------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `label`        | `String` | No       | A label for the radio group.                                                |
| `options`      | `Array`  | Yes      | An array of objects, each with `value` (String) and `label` (String) properties. |
| `defaultValue` | `String` | No       | The `value` of the option that should be selected by default.               |

#### `type: "link"`

A clickable text link.

| Property | Type     | Required | Description                                   |
| :------- | :------- | :------- | :-------------------------------------------- |
| `label`  | `String` | Yes      | The text displayed for the link.              |
| `align`  | `String` | No       | Text alignment (`"left"`, `"center"`, `"right"`). |

#### `type: "checkbox"`

A checkbox input.

| Property       | Type    | Required | Description                                   |
| :------------- | :------ | :------- | :-------------------------------------------- |
| `label`        | `String`| Yes      | The text label for the checkbox.              |
| `defaultValue` | `Boolean`| No       | The default checked state (`true` or `false`). |

#### `type: "multi-select"`

A multi-select dropdown or similar control.

| Property       | Type     | Required | Description                                                                 |
| :------------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `label`        | `String` | No       | A label for the multi-select.                                               |
| `options`      | `Array`  | Yes      | An array of objects, each with `value` (String) and `label` (String) properties. |
| `defaultValue` | `Array`  | No       | An array of `value`s that should be selected by default.                    |

#### `type: "select"`

A single-selection dropdown menu.

| Property       | Type     | Required | Description                                                                 |
| :------------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `label`        | `String` | No       | A label displayed before the dropdown.                                      |
| `options`      | `Array`  | Yes      | An array of objects, each with `value` (String) and `label` (String) properties. |
| `defaultValue` | `String` | No       | The `value` of the option that should be selected by default.               |


### InputControl Object Structure

An `InputControl` object defines a clickable control element displayed next to an input field.

| Property | Type     | Required | Description                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `type`   | `String` | Yes      | The type of input control (`"caseSensitive"`, `"regex"`, `"clear"`).        |
| `name`   | `String` | Yes      | A unique identifier for the control within the element's controls array.    |
| `label`  | `String` | Yes      | The text or symbol displayed for the control (e.g., `"Aa"`, `".*"`, `"X"`). |
| `initialState` | `String` | No       | The initial state for toggleable controls (`"enabled"` or `"disabled"`). Defaults to `"disabled"`. Only applicable for `type: "caseSensitive"` and `type: "regex"`. |
| `style`  | `Object` | No       | Optional CSS-like style properties for the individual control element.      |

## Search Syntax

The GitSense Chat search tool supports a flexible syntax for defining search queries, filters, scope, and options.

*   **Keywords and Phrases:**
    *   Enter words directly to search for them (e.g., `database connection`).
    *   Use double quotes for exact phrases (e.g., `"database connection pool"`).
*   **Filters:** Use `field:value` or `field:"phrase"` to filter results based on specific criteria. Multiple filters can be combined.
    *   `field:value`: Filters where the specified field exactly matches the value (case-insensitive by default).
    *   `field:"phrase"`: Filters where the specified field exactly matches the phrase (case-insensitive by default).
    *   `field:null`: Filters for results where the specified field is null or empty.
    *   `field:not_null`: Filters for results where the specified field is not null or empty.
    *   **`chat-id:id1,id2,...`**: **New Filter** Filters results to include only those associated with the specified comma-separated list of chat IDs. This filter applies across all targets (chats, messages, code blocks) and restricts results to items belonging to one of the listed chats. This filter can be used in conjunction with the `scope:` filter; if both are present, the results will be limited to the intersection of the scope and the specified chat IDs.
    *   **`name: name1,name2,...`**: **New Filter** Filters results to include only those associated with the specified names. This filter is particularly useful for finding chats or files by their exact name (e.g., `name:README.md`). Multiple names can be specified using comma-separated values. If a name contains a comma or space, enclose the name in double quotes (e.g., `name:"My Document","another,name"`). **This filter also supports being specified multiple times in a single query (e.g., `name:"fix bug" name:Debug`), and all provided names will be included in the search criteria.**
    *   **`msg-id: id1,id2,...`**: **New Filter** Filters results to include only the messages with the specified comma-separated list of message IDs. This filter applies only when `messages` is included in the `in:` target list.
    *   **`block-id: id1,id2,...`**: **New Filter** Filters results to include only the code blocks with the specified comma-separated list of code block IDs. This filter applies only when `code-blocks` is included in the `in:` target list.
    *   **`git-path: path1,path2,...`**: **Renamed Filter** Filters results to include only those associated with the specified Git-related file paths. This filter currently only applies to chats of type `git-*` where a `path` is stored in the chat's metadata. Multiple paths can be specified using comma-separated values. If a path contains a comma or space, enclose the path in double quotes (e.g., `git-path:"my folder/file.txt","another,file.log"`). The `*` character is captured as part of the path string; support for wildcard matching (e.g., `git-path:src/*` to match all files in `src/`) is a planned backend feature. **This filter also supports being specified multiple times in a single query (e.g., `git-path:src/file.js git-path:docs/README.md`), and all provided paths will be included in the search criteria.**
    *   **`msg-type: type1,type2,...`**: **New Filter** Filters results to include only messages of the specified types. Multiple message types can be specified using comma-separated values (e.g., `msg-type:git-blob,tiny-overview`). This filter applies only when `messages` is included in the `in:` target list. If a message type contains a comma or space, enclose the name in double quotes. **This filter also supports being specified multiple times in a single query (e.g., `msg-type:user msg-type:assistant`), and all provided types will be included in the search criteria.**
    *   **`chat-type: type1,type2,...`**: **New Filter** Filters results to include only items (chats, messages, code blocks) belonging to chats of the specified types. Multiple chat types can be specified using comma-separated values (e.g., `chat-type:git-repository,task`). This filter applies across all targets and restricts results to items within chats matching one of the listed types. If a chat type contains a comma or space, enclose the name in double quotes.
    *   **`lang: lang1,lang2,...`**: Filters results to include only those associated with the specified programming languages. Multiple languages can be specified using comma-separated values (e.g., `lang:javascript,python`). If a language name contains a comma or space, enclose the name in double quotes (e.g., `lang:"C#, C++"`). This filter applies to messages and code blocks.
    *   **`role: role1,role2,...`**: **New Filter** Filters results to include only messages with the specified roles. Multiple roles can be specified using comma-separated values (e.g., `role:user,assistant`). This filter applies only when `messages` is included in the `in:` target list. If a role contains a comma or space, enclose the name in double quotes. Valid roles are typically `system`, `user`, and `assistant`. **This filter also supports being specified multiple times in a single query (e.g., `role:user role:system`), and all provided roles will be included in the search criteria.**
    *   `repo: owner/name,owner/name,...`: Filters results to include only those associated with the specified Git repositories. Multiple repository full names (owner/name) can be specified using comma-separated values. This filter applies across all targets (chats, messages, code blocks) and restricts results to items belonging to chats associated with one of the listed repositories.
    *   `in: target1,target2,...`: Specifies the data types to search within. Valid targets are `all`, `chats`, `messages`, `code-blocks`. Overrides the default targets defined in the active profile.
    *   `scope: type`: Limits the search to a specific set of chats relative to the current chat. Valid types are `current-chat`, `current-chat-and-branches`, `connected-chats`, `all-chats`. Overrides the default scope defined in the active profile.
    *   `profile: profile-name`: Applies the default search settings defined in the specified profile file. Overrides the default profile selection logic.

## Metadata Filter Search Syntax

When the `profile:meta-search` filter is included in the query, the search parser enters a dedicated mode specifically for filtering based on extracted metadata. In this mode, **only** the following filters are recognized and processed. Any other syntax (keywords, phrases, or other standard filters like `in:`, `scope:`, `sort:`, `option:`) will be ignored and will result in a syntax error.

This mode is primarily intended to be used by the frontend UI to construct queries based on the Metadata Filter interface.

Supported filters in `profile:meta-search` mode:

*   **`profile:meta-search`**: Activates the metadata filter parsing mode. This filter is mandatory to use the syntax described below.
*   **`analyzer:<analyzer-id>`**: **Mandatory.** Specifies the ID of the analyzer whose metadata schema should be used for filtering. The backend uses this ID to understand the structure and data types of the metadata fields.
    *   Example: `analyzer:tiny-overview::file-content::default`
*   **`meta:<field>:<type>=<value>`** or **`meta:<field>:<type>!=<value>`**: Filters results based on a specific metadata field.
    *   `<field>`: The name of the metadata property (e.g., `language`, `code_major_version`, `state`). This name must match a property within the `extracted_metadata` JSON object produced by the specified `analyzer-id`.
    *   `<type>`: The data type of the metadata property. This is required to ensure correct type-safe comparison in the database. Supported types for the MVP are:
        *   `string`
        *   `number`
        *   `boolean`
    *   `=` or `!=`: The comparison operator.
        *   `=`: Exact match (is equal to).
        *   `!=`: Not equal to.
    *   `<value>`: The value to compare against. If the value contains spaces or commas, it must be enclosed in double quotes (e.g., `"My Value"`).
    *   **Combining `meta:` filters:**
        *   Multiple `meta:` filters for the *same* `<field>`, `<type>`, and operator (`=` or `!=`) are combined with **OR** logic. For example, `meta:language:string=c meta:language:string=c++` will find items where the language is 'c' OR 'c++'.
        *   `meta:` filters for different `<field>`/`<type>` combinations, or the same `<field>`/`<type>` but different operators, are combined with **AND** logic. For example, `meta:language:string=c AND meta:state:string=open` will find items where the language is 'c' AND the state is 'open'. `meta:language:string=c AND meta:language:string!=c++` will find items where the language is 'c' AND the language is NOT 'c++'.
    *   Examples:
        *   `meta:language:string=JavaScript`
        *   `meta:code_major_version:number=2`
        *   `meta:has_potentially_irrelevant_comments:boolean=true`
        *   `meta:state:string!=closed`
        *   `meta:labels:string="bug, feature"` (Note: The backend currently treats the entire quoted string as a single value for comparison, not a list of values for 'includes' logic. 'includes'/'excludes' operators are not supported in MVP).
*   **`chat-id:id1,id2,...`**: **Optional.** Filters results to include only those associated with the specified comma-separated list of chat IDs. This filter applies across all targets (messages in this mode) and restricts results to items belonging to one of the listed chats. Multiple `chat-id:` filters are combined with **OR** logic.
    *   Example: `chat-id:123,456`
*   **`repo:owner/name,owner/name,...`**: **Optional.** Filters results to include only those associated with the specified Git repositories. Multiple repository full names (owner/name) can be specified using comma-separated values. This filter restricts results to items belonging to chats associated with one of the listed repositories. Multiple `repo:` filters are combined with **OR** logic.
    *   Example: `repo:gitsense/gsc-search,myorg/myrepo`

**Example Metadata Filter Queries:**

*   Find messages analyzed by the tiny overview analyzer where the language is JavaScript:
    `profile:meta-search analyzer:tiny-overview::file-content::default meta:language:string=JavaScript`
*   Find messages analyzed by the comment relevance checker where `needs_review` is true, within chats belonging to the `gitsense/gsc-search` repository:
    `profile:meta-search analyzer:comment-relevance-checker::file-content::default meta:needs_review:boolean=true repo:gitsense/gsc-search`
*   Find messages analyzed by the tiny overview analyzer where the state is 'open' or 'pending', and the issue number is not 100:
    `profile:meta-search analyzer:tiny-overview::file-content::default meta:state:string=open meta:state:string=pending meta:issue_number:number!=100`

**Output in `profile:meta-search` mode:**

The default output for the `metadata-filter` profile includes the `result_chat_id` at the top level and a minimal set of essential message fields (`messages.id`, `messages.type`, `messages.chat_id`) within the `result_json` object for message results. This is optimized for the frontend Metadata Filter UI, which primarily needs the chat IDs of matching items.

\```json
{
  "topLevel": ["result_chat_id"],
  "messages": [
    "messages.id",
    "messages.type",
    "messages.chat_id"
  ]
}
\```

## Metadata Insights Search Syntax

When the `profile:meta-insights` filter is included in the query, the search parser enters a dedicated mode for generating aggregated counts of metadata values. In this mode, **only** the following filters are recognized and processed. Any other syntax (keywords, phrases, or other standard filters like `meta:`, `in:`, `scope:`, `sort:`, `option:`) will be ignored and will result in a syntax error.

This mode is intended to provide quick statistical overviews of metadata distribution.

*   **`profile:meta-insights`**: Activates the metadata insights parsing mode. This filter is mandatory to use the syntax described below.
*   **`analyzer:<analyzer-id>`**: **Mandatory.** Specifies the ID of the analyzer whose metadata should be used for generating insights.
    *   Example: `analyzer:tiny-overview::file-content::default`
*   **`insight-field:<field-name>:<type>`**: **Mandatory.** Specifies the name of the metadata field for which counts should be generated. This name must match a property within the `extracted_metadata` JSON object produced by the specified `analyzer-id`.
    *   **Updated Syntax:** The syntax is `insight-field:<field-name>:<type>`. The `<type>` is mandatory and specifies the data type of the metadata property, similar to the `meta:` filter. This is required to ensure correct type-safe aggregation and ordering in the database. **Multiple `insight-field` parameters can be provided in a single query, or multiple fields can be comma-separated within a single `insight-field` parameter.** Supported types for the MVP are:
        *   `string`
        *   `number`
        *   `boolean`
        *   `datetime`
    *   Examples:
        *   `insight-field:language:string`
        *   `insight-field:state:string`
        *   `insight-field:issue_number:number`
*   **`chat-id:id1,id2,...`**: **Optional.** Filters the messages included in the count to only those associated with the specified comma-separated list of chat IDs. Multiple `chat-id:` filters are combined with **OR** logic.
    *   Example: `chat-id:123,456`
*   **`repo:owner/name,owner/name,...`**: **Optional.** Filters the messages included in the count to only those associated with the specified Git repositories. Multiple repository full names (owner/name) can be specified using comma-separated values. Multiple `repo:` filters are combined with **OR** logic.
    *   Example: `repo:gitsense/gsc-search,myorg/myrepo`

**Example Metadata Insights Queries:**

*   Get counts for the 'language' field from the tiny overview analyzer across all content:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:language:string`
*   Get counts for the 'state' field from the tiny overview analyzer, filtered by a specific repository:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:state:string repo:gitsense/gsc-search`
*   Get counts for the 'author' field from the tiny overview analyzer, filtered by specific chat IDs:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:author:string chat-id:10,25,30`
*   Get counts for `outdated_comment_detected`, `outdated_comment_type`, and `has_spelling_mistakes` from the `code-comment-analyzer` in the "Hey World" and "Hello World" repos:
    `profile:meta-insights analyzer:code-comment-analyzer::file-content::default insight-field:outdated_comment_detected:boolean,outdated_comment_type:string,has_spelling_mistakes:boolean repo:"Hey World","Hello World"`
*   Alternatively, using multiple `insight-field` instances for the same query:
    `profile:meta-insights analyzer:code-comment-analyzer::file-content::default insight-field:outdated_comment_detected:boolean insight-field:outdated_comment_type:string insight-field:has_spelling_mistakes:boolean repo:"Hey World","Hello World"`
*   Get counts for the 'issue_number' field from the tiny overview analyzer:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:issue_number:number`

**Output in `profile:meta-insights` mode:**

The output for the `meta-insights` profile is a list of value/count pairs, representing the unique values found for the specified `insight-field` and the number of messages associated with each value, filtered by the provided criteria.
