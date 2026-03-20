<!--
Component: Search Input
Block-UUID: e1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the reusable Search Input component with icon support and debounced input handling.
Language: markdown
Created-at: 2025-10-01T02:36:47.474Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# Search Input Component

This directory contains the source code for a reusable `SearchInput` UI component. This component provides a standardized way to add filter input functionality with built-in debouncing, icon support, and a clear button.

## Purpose

The `SearchInput` component aims to:

*   Provide a customizable search/filter input with consistent styling
*   Support debounced input handling to prevent excessive callback firing
*   Include icon support for visual identification (search, filter, etc.)
*   Offer a clear button that appears when input has content
*   Be self-contained, injecting its own necessary CSS styles
*   Provide a simple API for programmatic control

## Usage

The `SearchInput` component is instantiated with a parent DOM element and a configuration object, then explicitly rendered.

1.  **Import the Component:**

```javascript
// In your application code
const { SearchInput } = require('./path/to/search-input');

```

2.  **Prepare Configuration and Container:**

Define your configuration options and get an HTML element in your page where the search input will be rendered.

```html
<!-- In your HTML file -->
<div id="search-container"></div>
```

```javascript
// In your JavaScript
const searchContainer = document.getElementById('search-container');

const searchConfig = {
  placeholder: 'Search items...',
  initialValue: '',
  size: 'medium', // 'small', 'medium', or 'large'
  debounceMs: 300,
  onFilterChange: function(event) {
    const searchTerm = event.target.value;
    console.log('Search term:', searchTerm);
    // Filter your data here
  },
  leftIcon: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path></svg>',
    onClick: function(event) {
      console.log('Search icon clicked');
      // Optional functionality when icon is clicked
    }
  },
  showClearIcon: true,
  width: '300px' // Optional custom width
};

const searchInput = new SearchInput(searchContainer, searchConfig);
searchInput.render(); // Explicitly render the component
```

## API

### `constructor(parentElement, config)`

Creates a new instance of the `SearchInput` component. Styles are injected when the first instance is created.

*   `parentElement` (`HTMLElement`): The DOM element where the search input will be rendered. **Required.**
*   `config` (`object`): An object containing configuration for the search input.
    *   `placeholder` (Optional `string`, default: `"Search..."`): Sets the placeholder text for the input field.
    *   `initialValue` (Optional `string`, default: `""`): Sets the initial value of the input field.
    *   `size` (Optional `string`, default: `"medium"`): Sets the input size profile. Can be `"small"`, `"medium"`, or `"large"`.
    *   `debounceMs` (Optional `number`, default: `300`): The debounce delay in milliseconds for the input callback.
    *   `onFilterChange` (Optional `function`): A callback function that is invoked when the input value changes, respecting the debounce delay. It receives the `InputEvent` object as an argument. The callback is also fired immediately when the user presses the Enter key.
    *   `leftIcon` (Optional `object`): Configuration for the left icon.
        *   `svg` (`string` or `HTMLElement`): The SVG content for the icon.
        *   `onClick` (Optional `function`): A callback function invoked when the icon is clicked.
    *   `showClearIcon` (Optional `boolean`, default: `true`): Whether to show the clear icon when the input has content.
    *   `width` (Optional `string`): Custom width for the input (overrides size-based width).

### `render()`

Renders the search input component into the parent element. This method must be called explicitly after instantiation.

### `getValue()`

Returns the current string value of the input field.

### `setValue(value)`

Sets the string value of the input field programmatically and triggers the input event.

*   `value` (`string`): The value to set in the input field.

### `clear()`

Clears the input field's value and triggers the input event.

### `focus()`

Programmatically focuses the input field.

### `disable()`

Sets the input field to a disabled state.

### `enable()`

Sets the input field to an enabled state.

### `cleanup()`

Removes the component's DOM elements and clears any timers or event listeners to free resources.

## Implementation Details

*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created, making it self-contained.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation, with no external library dependencies.
*   **Debounced Input:** The `onFilterChange` callback is debounced by default but fires immediately on Enter key press.
*   **Icon Support:** Both left and clear icons are vertically centered using flexbox.
*   **Size Profiles:** Predefined size profiles control padding, font size, and width for consistent UI.
*   **Clear Button:** Automatically appears when the input has content and can be disabled via configuration.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `SearchInput` class.
*   `search-input.js`: Contains the main `SearchInput` class logic.
*   `search-input.styles.js`: Exports the component's CSS as a JavaScript string.
*   `search-input.constants.js`: Defines CSS class names, default values, and SVG icons.
*   `README.md`: This file.
