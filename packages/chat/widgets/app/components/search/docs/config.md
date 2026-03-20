<!--
Component: GitSense Search Tool Configuration Specification
Block-UUID: ce12dda9-063d-4a69-9cd5-66554189aab5
Parent-UUID: b2ef5461-5f81-4008-9782-2f353392b25b
Version: 1.2.0
Description: Describes the JSON structure for the `config` object used within a `gitsense-tool` block to define the user interface and behavior of the "search" tool in GitSense Chat, including how search profiles are referenced.
Language: Markdown
Created-at: 2025-05-31T18:52:59.537Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0)
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
| `data`     | `Object` | No       | An object used to store persistent data needed across different stages of the search process (e.g., search criteria, results). This object will also store the `parsedQuery` object, which includes the name of the active search `profile` (determined by the `profile:` syntax in the query or the default). |

 **Note:**

The `actions` object and the layout array are typically loaded automatically by the `configParser` based on the specified `engine`. Engine definitions are located in dedicated directories under `engines/` (e.g., `engines/gitsense/`). Providing `layout` as an array or `actions` object directly in the tool block JSON is possible but less common for standard configurations and may be used for specific overrides.

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

| Property   | Type    | Required | Description                                                                 |
| :--------- | :------ | :------- | :-------------------------------------------------------------------------- |
| `type`     | `String`| Yes      | Must be `"row"`.                                                            |
| `elements` | `Array` | Yes      | An array of `Element` objects to be placed in this row, OR an array of arrays where each inner array contains `Element` objects to be grouped for layout (e.g., `[[...left elements], [...right elements]]`). |
| `style`    | `Object`| No       | Optional CSS-like style properties for the row container.                   |

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

| Property       | Type     | Required | Description                                                                 |
| :------------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `type`         | `String` | Yes      | The type of input control (`"caseSensitive"`, `"regex"`, `"clear"`).        |
| `name`         | `String` | Yes      | A unique identifier for the control within the element's controls array.    |
| `label`        | `String` | Yes      | The text or symbol displayed for the control (e.g., `"Aa"`, `".*"`, `"X"`). |
| `initialState` | `String` | No       | The initial state for toggleable controls (`"enabled"` or `"disabled"`). Defaults to `"disabled"`. Only applicable for `type: "caseSensitive"` and `type: "regex"`. |
| `style`        | `Object` | No       | Optional CSS-like style properties for the individual control element.      |

## Action Configuration Structure (Defined within Engine Objects)

The `actions` object within an engine definition maps element `name`s to action configurations. The structure of an action object varies based on its `type`.

| Property | Type     | Required | Description                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `type`   | `String` | Yes      | The type of action (e.g., `"search"`, `"toggle-visibility"`, `"external-search"`). |

### Specific Action Types

#### `type: "search"`

Triggers a search operation using the currently active engine's search logic.

| Property | Type     | Required | Description                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `target` | `Array`  | Yes      | An array of strings specifying the data types to search within (e.g., `["chats", "messages", "code-blocks"]`). These can be defaults overridden by UI elements. |
| `options`| `Object` | No       | Default search options (e.g., `{"caseSensitive": false, "regex": false}`). These can be overridden by UI element values. |

#### `type: "toggle-visibility"`

Toggles the visibility of another UI element or section.

| Property | Type     | Required | Description                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `target` | `String` | Yes      | The `name` of the element or section whose visibility should be toggled.    |

#### `type: "external-search"` (Example)

Triggers a search operation using an external search engine.

| Property | Type     | Required | Description                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `engine` | `String` | Yes      | An identifier for the specific external engine (e.g., `"google"`).          |
| `url`    | `String` | No       | A base URL or endpoint for the external search (if applicable).             |
| `params` | `Object` | No       | Default parameters for the external search request.                         |

## Section Object Structure

A `Section` object defines a collapsible or grouped area of UI elements.

| Property | Type     | Required | Description                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `name`   | `String` | Yes      | A unique identifier for the section. Used as a target for `toggle-visibility` actions. |
| `type`   | `String` | Yes      | The type of section (e.g., `"collapsible"`).                                |
| `label`  | `String` | No       | The label displayed for the section header.                                 |
| `visible`| `Boolean`| No       | Whether the section is initially visible (`true` or `false`). Defaults to `true`. |
| `layout` | `Array`  | Yes      | Defines the arrangement of UI elements within this section, using the same structure as the top-level `layout` array. |
| `style`  | `Object` | No       | Optional CSS-like style properties for the section container or header.     |

## Style Object Structure

A `Style` object is a simple key-value map where keys are CSS-like property names (camelCased) and values are valid CSS property values (as strings).

```json
{
   "propertyName": "propertyValue",
   "anotherProperty": "anotherValue"
}
```

Example:

```json
{
   "marginTop": "10px",
   "color": "red",
   "fontWeight": "bold"
}
```
