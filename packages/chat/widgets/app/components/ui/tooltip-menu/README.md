<!--
Component: Tooltip Menu
Block-UUID: 8b135ca6-8330-46a3-8e74-8cdec4d0f032
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the reusable Tooltip Menu component, detailing its usage, API, and configuration options.
Language: markdown
Created-at: 2025-10-06T15:43:00.456Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# Tooltip Menu Component

This directory contains the source code for a reusable `TooltipMenu` UI component. This component provides a context menu or popup menu that appears adjacent to a specified trigger element (like a button or link) when clicked.

## Purpose

The `TooltipMenu` component aims to:

*   Provide a customizable tooltip/popup menu UI.
*   Position the menu relative to a trigger element (top/bottom, left/right).
*   Handle menu visibility toggling via click events.
*   Be self-contained, injecting its own necessary CSS styles.
*   Offer a simple API for programmatic control and configuration.

## Usage

The `TooltipMenu` component is instantiated with a trigger DOM element and a configuration object.

1.  **Import the Component:**

```javascript
// In your application code
const { TooltipMenu } = require('gsc-ui/tooltip-menu');
// Or, if using relative paths:
// const { TooltipMenu } = require('./path/to/tooltip-menu');
```

2.  **Prepare Trigger Element and Configuration:**

Get the HTML element that will act as the trigger and define your menu configuration.

```html
<!-- In your HTML file -->
<button id="my-trigger-button">Show Menu</button>
<div id="menu-content-placeholder"></div> <!-- Optional placeholder for complex content -->
```

```javascript
// In your JavaScript
const triggerButton = document.getElementById('my-trigger-button');

// Example 1: Simple list of options
const simpleMenuConfig = {
  content: [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" }
  ],
  position: 'bottom-right',
  onSelect: (value, label, event) => {
    console.log(`Selected: ${label} (${value})`);
    // Handle the selection, e.g., update state, call an API, etc.
  },
  onClose: () => {
    console.log("Tooltip menu was closed.");
  }
};

const tooltipMenu1 = new TooltipMenu(triggerButton, simpleMenuConfig);
// The menu will show when `triggerButton` is clicked.
```

```javascript
// Example 2: Custom HTML content
const customContentDiv = document.getElementById('menu-content-placeholder');
customContentDiv.innerHTML = `
  <ul>
    <li><a href="#" data-value="link1">Custom Link 1</a></li>
    <li><a href="#" data-value="link2">Custom Link 2</a></li>
  </ul>
  <p style="padding: 5px; text-align: center; font-size: 0.8em;">Custom Footer</p>
`;

const customMenuConfig = {
  content: customContentDiv.innerHTML, // Or pass the element itself: content: customContentDiv
  position: 'top-left',
  offset: { x: -10, y: -10 },
  autoClose: false, // Let the caller decide when to close
  onSelect: (value, label, event) => {
    console.log(`Custom content selected: ${value}`);
    // Perform action...
    // tooltipMenu2.hide(); // Explicitly close if autoClose is false
  }
};

const tooltipMenu2 = new TooltipMenu(triggerButton, customMenuConfig);
```

## API

### `constructor(element, config)`

Creates a new instance of the `TooltipMenu` component. Styles are injected when the first instance is created.

*   `element` (`HTMLElement`): The DOM element that will trigger the menu when clicked. **Required.**
*   `config` (`object`): An object containing configuration for the tooltip menu.
    *   `content` (`Array<{label: string, value?: any}>` | `string` | `HTMLElement`): **Required.** Defines the menu's content.
        *   As an `Array`: Each item is an object `{label: string, value?: any}`. An HTML list will be generated.
        *   As a `string`: Raw HTML string to populate the menu.
        *   As an `HTMLElement`: A DOM element to use as the menu content.
    *   `position` (Optional `string`, default: `"bottom-left"`): Position relative to the trigger element. Can be `"top-left"`, `"top-right"`, `"bottom-left"`, or `"bottom-right"`.
    *   `offset` (Optional `object`, default: `{x: 0, y: 5}`): Fine-tune the menu's position with pixel offsets.
        *   `offset.x` (`number`): Horizontal offset.
        *   `offset.y` (`number`): Vertical offset.
    *   `onSelect` (Optional `function(value: any, label: string, event: Event)`): Callback function invoked when a menu option (defined by `MENU_OPTION_CLASS`) is clicked. It receives the option's `value`, `label`, and the click `event`.
    *   `onClose` (Optional `function()`): Callback function invoked when the menu is closed (via `hide()`, Escape key, or outside click).
    *   `autoClose` (Optional `boolean`, default: `true`): If `true`, the menu automatically hides after an option is selected. If `false`, the menu remains open.
    *   `closeOnEscape` (Optional `boolean`, default: `true`): If `true`, pressing the Escape key will close the menu.
    *   `closeOnOutsideClick` (Optional `boolean`, default: `true`): If `true`, clicking anywhere outside the menu (and not on the trigger) will close it.
    *   `zIndex` (Optional `number`, default: `1000`): Sets the `z-index` CSS property for the menu container.
    *   `style` (Optional `object`): An object containing CSS properties to apply as inline styles to the menu container (e.g., `{ backgroundColor: 'lightblue', minWidth: '200px' }`).
    *   `className` (Optional `string`): Additional CSS class names to add to the menu container element (e.g., `"my-custom-menu-style another-class"`).

### `show()`

Programmatically shows the tooltip menu at the position specified in the configuration.

### `hide()`

Programmatically hides the tooltip menu.

### `destroy()`

Removes the component's DOM elements, clears internal references, and removes event listeners to free resources.

## Implementation Details

*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation.
*   **Flexible Content:** Supports simple option arrays, raw HTML strings, or complex DOM structures for content.
*   **Positioning:** Calculates absolute position based on the trigger element's bounding rectangle and the specified `position` and `offset`.
*   **Event Handling:** Manages its own event listeners for the trigger, document clicks, and Escape key. Uses `setTimeout` during show to prevent immediate closing.
*   **Self-Contained:** Designed to be appended to `document.body` for maximum flexibility in positioning.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `TooltipMenu` class.
*   `tooltip-menu.js`: Contains the main `TooltipMenu` class logic.
*   `tooltip-menu.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names and default configuration values.
*   `README.md`: This file.
