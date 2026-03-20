<--
 Component: Search Configuration Specification
 Block-UUID: 0cd5ab41-8c35-474f-a07e-892b2e78a3d9
 Parent-UUID: 9de2ece1-cd13-47f7-9f4d-3aca2bcf4967
 Version: 1.22.0
 Description: Describes the JSON structure for the `config` object used within a `gitsense-tool` block to define the user interface and behavior of the "search" tool in GitSense Chat.
 Language: Markdown
 Created-at: 2025-11-13T02:23:22.616Z
 Authors: GPT-4o mini (v1.0.0), GPT-4o mini (v1.1.0), GPT-4o mini (v1.2.0), GPT-4o mini (v1.3.0), Claude 3.5 Sonnet (v1.4.0), GPT-4o mini (v1.5.0), GPT-4o mini (v1.6.0), GPT-4o mini (v1.7.0), GPT-4o mini (v1.8.0), GPT-4o mini (v1.8.1), GPT-4o mini (v1.9.0), GPT-4o mini (v1.10.0), GPT-4o mini (v1.11.0), GPT-4o mini (v1.12.0), Qwen 3 Coder 480B - Cerebras (v1.13.0), Qwen 3 Coder 480B - Cerebras (v1.14.0), Claude 4.0 Sonnet (v1.15.0), Qwen 3 Coder 480B - Cerebras (v1.16.0), Qwen 3 Coder 480B - Cerebras (v1.17.0), Qwen 3 Coder 480B - Cerebras (v1.18.0), Qwen 3 Coder 480B - Cerebras (v1.19.0), Gemini 2.5 Flash (v1.20.0), Gemini 2.5 Flash (v1.21.0), Gemini 2.5 Flash (v1.22.0)
-->


# GitSense Chat Tool - Search Configuration Specification

This document describes the JSON structure for the `config` object used within a `gitsense-tool` block to define the user interface and behavior of the "search" tool in GitSense Chat.

The "search" tool is triggered by including a `gitsense-tool` block in an assistant message with `"tool": "search"`. The `config` object within this block provides a declarative way to define the layout, elements, actions, and styling of the search interface presented to the user.

## Tool Block Example (Minimal)

```txt
# GitSense Chat Tool

{
   "tool": "search",
   "config": {
      "layout": "default",
      "engine": "gitsense"
   }
}
```

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
        *   `array`
    *   `=` or `!=`: The comparison operator.
        *   `=`: Exact match (is equal to).
        *   `!=`: Not equal to.
    *   `<value>`: The value to compare against. If the value contains spaces, it must be enclosed in double quotes (e.g., `"My Value"`). **For `array` types, the value must be a comma-separated list of items. Within this list, `||` (OR) and `&&` (AND) are reserved operators to define how items are combined for matching.**
    *   **Combining `meta:` filters:**
        *   Multiple `meta:` filters for the *same* `<field>`, `<type>`, and operator (`=` or `!=`) are combined with **OR** logic. For example, `meta:language:string=c meta:language:string=c++` will find items where the language is 'c' OR 'c++'. For `array` types, the filter will match if the array field contains *any* of the provided items.
        *   `meta:` filters for different `<field>`/`<type>` combinations, or the same `<field>`/`<type>` but different operators, are combined with **AND** logic. For example, `meta:language:string=c meta:state:string=open` will find items where the language is 'c' AND the state is 'open'. `meta:language:string=c meta:language:string!=c++` will find items where the language is 'c' AND the language is NOT 'c++'.
    *   **Array Value Combination Operators (`||`, `&&`):**
        *   **`||` (OR):** When used within the comma-separated value list for an `array` type, it specifies that the filter should match if the array field contains **at least one** of the items separated by `||`. Example: `meta:assignees:array="alice||bob"` finds messages where the `assignees` array contains 'alice' OR 'bob'.
        *   **`&&` (AND):** When used within the comma-separated value list for an `array` type, it specifies that the filter should match if the array field contains **all** of the items separated by `&&`. Example: `meta:labels:array="bug&&high-priority"` finds messages where the `labels` array contains both 'bug' AND 'high-priority'.
        *   **Default Behavior:** If neither `||` nor `&&` is present in the comma-separated list for an `array` type, the default operator is `||` (OR). Example: `meta:assignees:array="alice,bob"` is equivalent to `meta:assignees:array="alice||bob"`.
        *   **Note:** `||` and `&&` are reserved within `array` value lists. To match literal values containing these strings, escaping mechanisms will be required in future versions.
    *   Examples:
        *   **Note:** Currently, only one type of operator (`||` OR `&&`) can be used within a single array value. Mixing operators in a single value string (e.g., `"alice||bob&&mary"`) is not supported. In the future, more advanced comparison logic may be implemented.
        *   **Note:** When using multiple `meta:` filters for the same array field, the combination logic follows the rules in "Combining `meta:` filters" above, regardless of the individual array logic operators.
        *   **Note:** The `!=` operator with array values works as follows:
        *   When using `||` with `!=` (e.g., `meta:assignees:array!="alice||bob"`), it finds messages where the array field contains **none** of the specified items.
        *   When using `&&` with `!=` (e.g., `meta:labels:array!="bug&&high-priority"`), it finds messages where the array field does **not contain all** of the specified items (i.e., is missing at least one).
        *   `meta:language:string=JavaScript`
        *   `meta:code_major_version:number=2`
        *   `meta:has_potentially_irrelevant_comments:boolean=true`
        *   `meta:state:string!=closed`
        *   `meta:labels:string="bug, feature"`
        *   `meta:assignees:array!="alice||bob"` (Finds messages where the 'assignees' array contains neither 'alice' nor 'bob'.)
        *   `meta:assignees:array="alice||bob"` (Finds messages where the 'assignees' array contains 'alice' OR 'bob'.)
        *   `meta:labels:array="bug&&high-priority"` (Finds messages where the 'labels' array contains both 'bug' AND 'high-priority'.)
*   **`chat-id:id1,id2,...`**: **Optional.** Filters results to include only those associated with the specified comma-separated list of chat IDs. This filter applies across all targets (messages in this mode) and restricts results to items belonging to one of the listed chats. Multiple `chat-id:` filters are combined with **OR** logic.
    *   Example: `chat-id:123,456`
*   **`repo:owner/name,owner/name,...`**: **Optional.** Filters results to include only those associated with the specified Git repositories. Multiple repository full names (owner/name) can be specified using comma-separated values. This filter restricts results to items belonging to chats associated with one of the listed repositories. Multiple `repo:` filters are combined with **OR** logic.
    *   Example: `repo:gitsense/gsc-search,myorg/myrepo`

## Metadata Raw Search Syntax

When the `profile:meta-raw` filter is included in the query, the search parser enters a dedicated mode for retrieving raw, per-file metadata. This mode is designed to provide a complete, structured dataset for LLM analysis and interactive frontend display.

In this mode, **only** the following filters are recognized and processed. Any other syntax (keywords, phrases, or standard filters) will be ignored and will result in a syntax error.

*   **`profile:meta-raw`**: Activates the raw metadata retrieval mode. This filter is mandatory.
*   **`analyzer:<analyzer-id>`**: **Mandatory (if `full-meta:` is not used).** Specifies the ID of the analyzer whose metadata should be retrieved. If `full-meta:` is used, this filter is optional.
    *   Example: `analyzer:tiny-overview::file-content::default`
*   **`format:<type>`**: **Optional.** Specifies the output format of the results.
    *   `pretty`: (Recommended for LLM/MCP) Returns results as a token-efficient markdown table with lookup keys for fields, repositories, and branches.
    *   `raw`: Returns results as raw JSON objects.
    *   Example: `format:pretty`
*   **`chat-id:id1,id2,...`**: **Optional.** Filters the messages included to only those associated with the specified chat IDs.
    *   Example: `chat-id:123,456`
*   **`repo:owner/name,owner/name,...`**: **Optional.** Filters the messages included to only those associated with the specified Git repositories.
    *   Example: `repo:gitsense/gsc-search,myorg/myrepo`

*   **Custom Lookup Mappings (Optional, but all-or-nothing):** These parameters allow the client to define consistent lookup IDs (R1, B1, A1, F1, etc.) for batch processing. If any mapping is provided, all four must be provided, and `chat-id:` becomes mandatory. IDs must be numeric (system adds prefixes). Descriptions must be quoted.
    *   **`repo-mapping:id=repo|"description"`**: Defines custom lookup IDs for repositories. Description can be an empty quoted string (`""`).
        *   Example: `repo-mapping:1=facebook/react|"A JavaScript library",2=golang/go|""`
    *   **`branch-mapping:id=branch|"description"`**: Defines custom lookup IDs for branches.
        *   Example: `branch-mapping:1=main|"Main branch",2=develop|"Development branch"`
    *   **`analyzer-mapping:id=analyzer|"description"`**: Defines custom lookup IDs for analyzers.
        *   Example: `analyzer-mapping:1=comment-spelling-reviewer-for-agents|"Reviews code comments for spelling mistakes"`
    *   **`field-mapping:analyzerId|fieldId=field|"description"`**: Defines custom lookup IDs for metadata fields, explicitly linking them to an analyzer ID.
        *   Example: `field-mapping:1|1=has_spelling_mistakes|"Indicates if spelling mistakes were found",2|1=has_accuracy_issues|"Indicates if accuracy issues were found"`

**Custom Mapping Requirements:**
*   When using custom mappings, the `chat-id:id1,id2,...` filter is **mandatory** to define the scope.
*   All four mapping parameters (`repo-mapping`, `branch-mapping`, `analyzer-mapping`, `field-mapping`) must be provided (all-or-nothing).
*   Numeric IDs must be unique within each mapping type.


**Output in `profile:meta-raw` mode:**

The output is a raw dataset where each entry corresponds to a single file (chat ID) and includes all requested metadata fields, along with file context (repository, branch, full path). If `format:pretty` is used, the output is a single markdown string containing lookup tables and a unified data table.

---

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
        *   `array`
    *   Examples:
        *   `insight-field:language:string`
        *   `insight-field:state:string`
        *   `insight-field:issue_number:number`
*   **`chat-id:id1,id2,...`**: **Optional.** Filters the messages included in the count to only those associated with the specified comma-separated list of chat IDs. Multiple `chat-id:` filters are combined with **OR** logic.
    *   Example: `chat-id:123,456`
*   **`repo:owner/name,owner/name,...`**: **Optional.** Filters the messages included in the count to only those associated with the specified Git repositories. Multiple repository full names (owner/name) can be specified using comma-separated values. Multiple `repo:` filters are combined with **OR** logic.
    *   Example: `repo:gitsense/gsc-search,myorg/myrepo`

---

## Cross-Analyzer Metadata Search Syntax (full-meta:)

To enable filtering or generating insights based on metadata extracted by *different* analyzers in a single query, a new `full-meta:` filter syntax is available. This syntax can be used with both `profile:meta-search`, `profile:meta-insights`, **and `profile:meta-raw`**.

In this mode, the standard `analyzer:<analyzer-id>` and `meta:<field>:<type>` or `insight-field:<field>:<type>` filters are **not required**. Instead, the `full-meta:` filter encapsulates all necessary information for each condition.

*   **`full-meta:<analyzer-id>|<field>|<type><operator><value>`**: Specifies a metadata field condition from a specific analyzer.
    *   `<analyzer-id>`: The full ID of the analyzer (e.g., `comment-spelling-reviewer-for-agents::file-content::default`).
    *   `<field>`: The name of the metadata property (e.g., `has_spelling_mistakes`, `file_extension`).
    *   `<type>`: The data type of the metadata property (e.g., `boolean`, `string`, `number`). Supported types are `string`, `number`, `boolean`, `array`.
    *   `<operator>`: The comparison operator, either `=` (equal) or `!=` (not equal).
    *   `<value>`: The value to compare against. If the value contains spaces or the `|` delimiter, it must be enclosed in double quotes (e.g., `"My Value"`). For `array` types, the value follows the same rules as the standard `meta:` filter.
    *   **Combining `full-meta:` filters:**
        *   Multiple `full-meta:` filters in a single query are combined with **AND** logic. The query will return results that satisfy *all* specified `full-meta:` conditions.
        *   Example (Meta-Search): `profile:meta-search full-meta:comment-spelling-reviewer-for-agents::file-content::default|has_spelling_mistakes|boolean=true full-meta:comment-accuracy-reviewer-for-agents::file-content::default|has_accuracy_issues|boolean=true`
        *   Example (Meta-Insights): `profile:meta-insights full-meta:comment-spelling-reviewer-for-agents::file-content::default|file_extension|string full-meta:comment-accuracy-reviewer-for-agents::file-content::default|file_extension|string`
    *   **Note on `profile:meta-insights` with `full-meta:`:**
        *   **Note on `profile:meta-raw` with `full-meta:`:** When used with `profile:meta-raw`, each `full-meta:` filter defines a field to be extracted and merged into the single output table. The query will return a single table containing all fields specified by the `full-meta:` filters.
        *   Example (Meta-Raw): `profile:meta-raw format:pretty full-meta:purpose-analyzer::file-content::default|purpose|string full-meta:complexity-analyzer::file-content::default|score|number chat-id:123,456`
        *   
        *   When using `profile:meta-insights`, each `full-meta:` filter defines an *independent* insight field.
        *   The results will contain separate insight data blocks for each specified `full-meta:` filter.
        *   Example: `profile:meta-insights full-meta:analyzer1|language|string full-meta:analyzer2|state|string` will return two distinct insight result sets, one for `language` from `analyzer1` and one for `state` from `analyzer2`.

## Git Navigation Profile & Search Syntax

A dedicated search profile is available for easily navigating the Git repository structures stored within GitSense Chat. This profile provides a user-friendly syntax for listing owners, repositories, and branches.
 
### Filters

The navigation profile `profile:git-nav` supports the following intuitive filters:

*   **`git-owner:<owner_name>`**: Filters results to show only Git repositories (`git-repo` chats) belonging to the specified owner/organization.
    *   Example: `profile:git-nav git-owner:gitsense`

*   **`git-repository:<owner>/<repo_name>`**: Filters results to show only the specific Git repository chat identified by its full name (`owner/repo_name`).
    *   Example: `profile:git-nav git-repository:gitsense/gsc-search`

*   **`git-branch:<branch_name>`**: Filters results to show only the specific Git branch (`git-ref` chat where `meta.type` is `branch`) within a repository. This filter is intended for use when targeting a specific repository.
    *   **Special Syntax: `git-branch:*`**: If the value is `*`, the search lists *all* Git branches (`git-ref` chats where `meta.type` is `branch`) within the specified repository.
    *   Example: `profile:git-nav git-repository:gitsense/gsc-search git-branch:main`
    *   Example (List all branches): `profile:git-nav git-repository:gitsense/gsc-search git-branch:*`

*   **`git-ls-tree-id:<chat_id>`**: Lists the immediate children (files and subdirectories) of a specific Git tree or branch. This filter requires both `git-repository` and `git-branch` to be specified for context validation.
    *   Example: `profile:git-nav git-repository:facebook/react git-branch:main git-ls-tree-id:12345`

### Combining Filters

These filters can be combined to achieve specific navigation goals:

*   **List all branches in a repository:**
    *   `profile:git-nav git-repository:<owner>/<repo> git-branch:*`
    *   Example: `profile:git-nav git-repository:gitsense/gsc-search git-branch:*`
  
*   **Find a specific branch in a repository:**
    *   `profile:git-nav git-repository:<owner>/<repo> git-branch:<branch>`
    *   Example: `profile:git-nav git-repository:gitsense/gsc-search git-branch:main`

*   **List contents of a specific tree within a branch:**
    *   `profile:git-nav git-repository:<owner>/<repo> git-branch:<branch> git-ls-tree-id:<chat_id>`
    *   Example: `profile:git-nav git-repository:facebook/react git-branch:main git-ls-tree-id:12345`

*   **Note:** The `git-ls-tree-id` filter requires both `git-repository` and `git-branch` filters to be present for proper context validation.

### Default Behavior

If no specific filters are provided (e.g., just `profile:git-nav`), the profile defaults to listing all Git repositories (`git-repo` chats) available in the system.
If `git-repository` is provided without `git-branch`, it finds the specific repository.

### Output

Results from the `profile:git-nav` are formatted specifically for Git navigation, providing simplified objects with key details like owner, repository name, branch name, and local path.

### Example Output

The output structure for results from the `profile:git-nav` is designed to be simple and intuitive, reflecting common Git object properties.

*   **Listing Owners (`profile:git-nav chat-type:git-repo-owner` or just `profile:git-nav git-owner:<name>`):**

```json
{
  "chat_id": 100127,
  "chat_uuid": "b80a3d69-190f-407c-85ec-1a9050e5fe20",
  "git": {
    "type": "owner",
    "name": "gitsense"
  }
}
```

*   **Listing Repositories (`profile:git-nav` or `profile:git-nav git-owner:<owner>` or `profile:git-nav git-repository:<owner>/<repo>`):**

```json
{
  "chat_id": 100967,
  "chat_uuid": "1696a5bd-9098-4709-a345-d2144fb0c818",
  "git": {
    "type": "repository",
    "owner": "gitsense",
    "name": "gsc-utils",
    "full_name": "gitsense/gsc-utils",
    "path": "/Users/terrchen/devboard/chat/utils"
  }
}
```

*   **Listing Branches with Parent Navigation Context (`profile:git-nav git-repository:<owner>/<repo> git-branch:*` or `profile:git-nav git-repository:<owner>/<repo> git-branch:<name>`):**

```json
{
  "chat_id": 100968,
  "chat_uuid": "03ec7b7e-f061-4a7e-b875-fe7932e822df",
  "git": {
    "type": "ref",
    "ref_type": "branch",
    "name": "main",
    "owner": "gitsense",
    "repository": "gsc-utils",
    "full_name": "gitsense/gsc-utils",
    "path": "/app/repos/gitsense/gsc-utils",
    "commit": {
      "hash": "0a88339f70d1a6912daa1be1b600d3f60f276f4d",
      // ... other commit details from chats.meta.commit
    }
  },
  "parents": {
    "repository": {
      "chat_id": 100967,
      "chat_uuid": "1696a5bd-9098-4709-a345-d2144fb0c818",
      "git": {
        "type": "repository",
        "owner": "gitsense",
        "name": "gsc-utils"
      }
    }
  }
}
```

*   **Listing Branches (`profile:git-nav git-repository:<owner>/<repo> git-branch:*`):**

```json
{
  // ... primary branch results ...
  "included": {
    "repositories": [
      { /* ... full repository object from stage 1 ... */ }
    ]
  }
}
```

*   **Listing Tree Contents (`profile:git-nav git-repository:<owner>/<repo> git-branch:<branch> git-ls-tree-id:<chat_id>`):**

```json
{
  "chat_id": 101001,
  "chat_uuid": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "git": {
    "type": "tree-item",
    "mode": "100644",
    "object_type": "blob",
    "name": "README.md",
    "path": "README.md",
    "sha": "a1b2c3d4e5f6789012345678901234567890abcd"
  },
  "parents": {
    "tree": {
      "chat_id": 12345,
      "chat_uuid": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
      "git": {
        "type": "tree",
        "sha": "f0e9d8c7b6a54321fedcba9876543210fedcba98"
      }
    },
    "branch": {
      "chat_id": 100968,
      "chat_uuid": "03ec7b7e-f061-4a7e-b875-fe7932e822df",
      "git": {
        "type": "ref",
        "ref_type": "branch",
        "name": "main",
        "owner": "gitsense",
        "repository": "gsc-utils",
        "full_name": "gitsense/gsc-utils"
      }
    }
  }
}
```

**Example Metadata Insights Queries:**

*   Get counts for the 'language' field from the tiny overview analyzer across all content:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:language:string`
*   Get counts for the 'state' field from the tiny overview analyzer, filtered by a specific repository:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:state:string repo:gitsense/gsc-search`
*   Get counts for the 'author' field from the tiny overview analyzer, filtered by specific chat IDs:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:author:string chat-id:10,25,30`
*   Get counts for `outdated_comment_detected`, `outdated_comment_type`, and `has_spelling_mistakes` from the `code-comment-reviewer` in the "Hey World" and "Hello World" repos:
    `profile:meta-insights analyzer:code-comment-reviewer::file-content::default insight-field:outdated_comment_detected:boolean,outdated_comment_type:string,has_spelling_mistakes:boolean repo:"Hey World","Hello World"`
*   Alternatively, using multiple `insight-field` instances for the same query:
    `profile:meta-insights analyzer:code-comment-reviewer::file-content::default insight-field:outdated_comment_detected:boolean insight-field:outdated_comment_type:string insight-field:has_spelling_mistakes:boolean repo:"Hey World","Hello World"`
*   Get counts for the 'issue_number' field from the tiny overview analyzer:
    `profile:meta-insights analyzer:tiny-overview::file-content::default insight-field:issue_number:number`

**Output in `profile:meta-insights` mode:**

The output for the `meta-insights` profile is a list of value/count pairs, representing the unique values found for the specified `insight-field` and the number of messages associated with each value, filtered by the provided criteria.

### Output Structure for Cross-Analyzer Insights (`full-meta:`)

When using the `full-meta:` filter with `profile:meta-insights`, the top-level `results` field changes from an array to an object keyed by the specific insight source. This is necessary to distinguish results from different analyzers.

The key format is: `"<analyzer-id>|<field>|<type>"`

**Example Output Structure (Keyed Object):**

```json
{
  "status": "success",
  "data": {
    // ... other fields ...
    "results": {
      "analyzer1::id|language|string": {
        "description": "Language distribution from Analyzer 1",
        "results": [ /* array of { value, count, type } */ ]
      },
      "analyzer2::id|state|string": {
        "description": "State distribution from Analyzer 2",
        "results": [ /* array of { value, count, type } */ ]
      }
    }
  }
}
```

