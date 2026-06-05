<!--
Component: Toggle
Block-UUID: ecebb380-031c-4acd-8740-bda3afc04021
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the reusable Toggle component.
Language: markdown
Created-at: 2026-01-09T22:49:41.884Z
Authors: GLM-4.6 (v1.0.0)
-->


# Toggle Component

This directory contains the source code for a reusable `Toggle` UI component that allows users to switch between different options.

## Purpose

The `Toggle` component provides a flexible way to create toggle buttons with:
- Customizable options with labels and values
- Configurable colors for active/inactive states
- Disabled state support for individual options
- Event callbacks for option changes
- Responsive layout with configurable styling

## Usage

1.  **Import the Component:**

```javascript
const { Toggle } = require('./path/to/toggle');
```

2.  **Prepare Configuration and Container:**

```html
<!-- In your HTML file -->
<div id="toggle-container"></div>
```

3.  **Instantiate the Component:**

```javascript
const container = document.getElementById('toggle-container');

const toggle = new Toggle(container, {
  options: [
    { label: 'Edit', value: 'edit' },
    { label: 'Preview', value: 'preview' }
  ],
  activeOption: 'edit',
  activeColor: '#0969da',
  inactiveColor: '#f8f9fa',
  onToggle: function(newValue, oldValue, event) {
    console.log(`Toggle changed from ${oldValue} to ${newValue}`);
  }
});

toggle.render();
```

## API

### `constructor(containerElement, config)`

Creates a new instance of the `Toggle` component.

*   `containerElement` (`HTMLElement`): The DOM element where the component will be rendered. **Required.**
*   `config` (`object`): Configuration options for the component.

#### Options

*   `options` (`Array<object>`): Array of option objects. **Required.**
    *   `label` (`string`): Display label for the option.
    *   `value` (`string`): Value for the option.
    *   `disabled` (`boolean`, optional): Whether the option is disabled.

*   `activeOption` (`string`, optional): The value of the option to be active initially.
*   `activeColor` (`string`, default: `'#0969da'`): Background color for the active option.
*   `inactiveColor` (`string`, default: `'#f8f9fa'`): Background color for inactive options.
*   `activeTextColor` (`string`, default: `'white'`): Text color for the active option.
*   `inactiveTextColor` (`string`, default: `'#333'`): Text color for inactive options.
*   `hoverColor` (`string`, default: `'#e9ecef'`): Background color for inactive options on hover.
*   `borderColor` (`string`, default: `'#ddd'`): Border color for the toggle container.
*   `borderRadius` (`string`, default: `'5px'`): Border radius for the toggle container.
*   `padding` (`string`, default: `'10px 15px'`): Padding for each toggle option.
*   `fontSize` (`string`, default: `'14px'`): Font size for toggle option text.
*   `width` (`string`, default: `'400px'`): Width of the toggle container.
*   `height` (`string`, default: `'auto'`): Height of the toggle container.
*   `transition` (`string`, default: `'background-color 0.2s'`): CSS transition for background color changes.
*   `className` (`string`): Additional CSS class names for the toggle container.
*   `onToggle` (`function`): Callback when the active option changes.
    *   Parameters: `(newValue, oldValue, event)`

### Methods

*   `render()`: Renders the component into the parent element.
*   `setActiveOption(value, event)`: Sets the active option by value.
*   `getActiveOption()`: Returns the value of the currently active option.
*   `disableOption(value)`: Disables a specific option.
*   `enableOption(value)`: Enables a specific option.
*   `updateOptions(newOptions)`: Updates the options and re-renders the component.
*   `cleanup()`: Removes the component and cleans up resources.

## Implementation Details

*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation.
*   **Flexible Layout:** Uses flexbox for responsive option layout with configurable spacing.
*   **Event Handling:** Manages option changes with callbacks.
*   **Dynamic Updates:** Supports updating options and styling after initialization.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `Toggle` class.
*   `toggle.js`: Contains the main `Toggle` class logic.
*   `toggle.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names and default values.
*   `README.md`: This file.

```

I've created a complete reusable toggle component that follows the same pattern as the other UI components in the gitsense/gsc-ui repository. The component includes:

1. **Customizable Options**: Users can define toggle buttons with custom labels and values
2. **Visual Customization**: Full control over colors, sizes, and other visual properties
3. **Default Styling**: Uses the same default styling as the dropzone toggle
4. **Event Handling**: Support for callbacks when the toggle changes
5. **API Methods**: Methods for getting/setting the active option, enabling/disabling options, etc.
