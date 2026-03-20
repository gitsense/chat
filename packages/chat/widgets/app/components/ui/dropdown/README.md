<!--
Component: Dropdown
Block-UUID: d48d645e-1721-4a44-a252-c0e3dda55e04
Parent-UUID: 24d0578c-ff58-4067-86cf-19944c0c0c52
Version: 1.6.0

Description: README documentation for the reusable Dropdown component.
Language: markdown
Created-at: 2025-06-07T16:42:53.001Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0), Gemini 2.5 Flash Thinking (v1.3.0), Gemini 2.5 Flash (v1.4.0), GLM-4.6 (v1.5.0), GLM-4.6 (v1.6.0)
-->


# Dropdown Component

This directory contains the source code for the reusable `Dropdown` UI component, designed as a replacement for the native HTML `<select>` element to provide better control over styling and horizontal space usage.

## Purpose

The `Dropdown` component aims to:

*   Provide a customizable dropdown interface.
*   Avoid the fixed-width issues of native `<select>` elements.
*   Be self-contained, injecting its own necessary CSS styles.
*   Offer a simple API for integration into your application.
*   Include basic accessibility features.
*   Support smart positioning to optimize dropdown placement based on available viewport space.
*   Support visual dividers to group related options.

## Usage

Since this component is intended to be used directly within your application's component structure (as discussed), you can import and instantiate it like any other local module.

1.  **Import the Component:**

```javascript
    // In your application code (e.g., a script file or another component) using CommonJS:
    // const { Dropdown } = require('./components/ui/dropdown');
```

2.  **Prepare Configuration and Container:**

    Define your dropdown options and configuration. You also need an HTML element in your page where the dropdown will be rendered.

```html
    <!-- In your HTML file -->
    <div id="my-custom-dropdown-container"></div>
```

```javascript
    // In your JavaScript
    const dropdownConfig = {
      label: "Choose an Item:", // Optional label
      options: [
        { value: 'item1', text: 'First Item' },
        { value: 'item2', text: 'Second Item (This one is longer)' },
        { value: '---------', text: '' }, // Visual divider
        { value: 'item3', text: 'Third Item' },
        { value: 'item4', text: 'Fourth Item' },
        { value: '---------', text: 'Group 2' }, // Divider with text
        { value: 'item5', text: 'Fifth Item' },
        { value: 'item6', text: 'Sixth Item' },
        { value: 'item7', text: 'Seventh Item' },
        { value: 'item8', text: 'Eighth Item (More than threshold)' },
      ],
      initialValue: 'item2', // Optional initial selection by value
      // Optional custom SVG caret (replace with your SVG markup)
      // caretIconSVG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'

      // Optional scrollable menu header configuration
      scrollableMenuThreshold: 7, // Show header if options >= 7 (default is 7)
      scrollableMenuText: 'Scrollable Options', // Custom text for the header (default is 'Scrollable Menu')
      
      // New customization options
      selectedTextFontSize: '1em', // Override the default .9em font size for selected text
      displayBorder: 'none', // Remove the border (default is '1px solid #ccc')
      smartPositioning: true, // Enable smart positioning (default is false)
      positionThreshold: 300 // Minimum space required to position dropdown in a direction (default is 300px)
    };

    const containerElement = document.getElementById('my-custom-dropdown-container');
```

3.  **Instantiate the Dropdown:**

    Create a new instance of the `Dropdown` class, passing the container element, configuration, and an optional callback function.

```javascript
    const myDropdown = new Dropdown(containerElement, dropdownConfig, (newValue, previousValue) => {
      console.log(`Dropdown value changed from "${previousValue}" to "${newValue}"`);
      // Add your logic here based on the new value
    });
```

## Configuration Options

The `Dropdown` constructor accepts a `config` object with the following properties:

*   `label` (Optional `string`): Text to display as a label before the dropdown.
*   `options` (`Array<{value: string | number, text: string}>`): An array of objects representing the dropdown options. Each object must have a `value` (internal identifier) and `text` (display text).
*   `initialValue` (Optional `string` or `number`): The `value` of the option that should be selected when the dropdown is initialized. If not provided, the first non-divider option will be selected.
*   `caretIconSVG` (Optional `string`): A string containing the SVG markup to use for the dropdown's caret icon. If not provided, a default triangle down SVG is used.

*   `displayFontSize` (Optional `string`): Sets the font size of the selected text displayed in the dropdown. Accepts any valid CSS font-size value (e.g., `"1em"`, `"16px"`).
*   `displayFontWeight` (Optional `string` or `number`): Sets the font weight of the selected text displayed in the dropdown. Accepts any valid CSS font-weight value (e.g., `"bold"`, `"700"`).
*   `displayBorder` (Optional `string`): Sets the border style for the dropdown's display element. Accepts any valid CSS border value (e.g., `"none"`, `"1px solid #ccc"`).
*   `displayBackgroundColor` (Optional `string`): Sets the background color for the dropdown's display element. Accepts any valid CSS color value (e.g., `"transparent"`, `"#fff"`).
*   `displayPadding` (Optional `string`): Sets the padding for the dropdown's display element. Accepts any valid CSS padding value (e.g., `"0"`, `"5px 10px"`).

*   `selectedTextFontSize` (Optional `string`): Sets the font size for the selected text specifically, overriding the default `.9em`. Accepts any valid CSS font-size value (e.g., `"1em"`, `"14px"`).

*   `caretFontSize` (Optional `string`): Sets the font size specifically for the caret icon. Accepts any valid CSS font-size value (e.g., `"0.8em"`, `"10px"`). This is useful when the `displayFontSize` is changed and you need to adjust the caret size independently.

*   `scrollableMenuThreshold` (Optional `number`, default: `7`): The minimum number of options required for the "Scrollable Menu" header to be displayed in the options list.
*   `scrollableMenuText` (Optional `string`, default: `"Scrollable Menu"`): The text content for the scrollable menu header.

*   `smartPositioning` (Optional `boolean`, default: `false`): Enables smart positioning to automatically show the dropdown above or below based on available viewport space.
*   `positionThreshold` (Optional `number`, default: `300`): The minimum space (in pixels) required to position the dropdown in a direction when smart positioning is enabled.

## Creating Visual Dividers

To create visual dividers in the dropdown list, add options with values that consist only of dashes (e.g., "---------"). These divider options will be rendered as non-selectable visual separators.

### Divider Properties:
*   **Value**: Must consist only of dashes (e.g., "---------", "---", etc.)
*   **Text**: Optional text to display with the divider (can be empty string)

### Divider Behavior:
*   Dividers are non-interactive and cannot be selected
*   They are excluded from keyboard navigation
*   They are styled as visual separators with a horizontal line
*   They are skipped when determining the default selected option

### Example:
```javascript
options: [
  { value: 'option1', text: 'First Option' },
  { value: 'option2', text: 'Second Option' },
  { value: '---------', text: '' }, // Simple divider without text
  { value: 'option3', text: 'Third Option' },
  { value: '---------', text: 'Group 2' }, // Divider with text
  { value: 'option4', text: 'Fourth Option' },
]
```

## Callback Function

The third argument to the `Dropdown` constructor is an optional callback function that will be executed whenever the selected value of the dropdown changes.

The callback function receives two arguments:

1.  `newValue` (`string | number`): The `value` of the option that was just selected.
2.  `previousValue` (`string | number | undefined`): The `value` of the option that was selected before the change. This will be `undefined` if no option was previously selected (e.g., on initial load if no `initialValue` was set).

The callback is **only** triggered if the newly selected value is different from the previously selected value.

## Smart Positioning

When `smartPositioning` is enabled, the dropdown will automatically determine the optimal position for the options list based on available viewport space:

1.  If there's at least `positionThreshold` pixels of space below the dropdown, it will show below.
2.  If not, it checks if there's at least `positionThreshold` pixels of space above.
3.  If neither direction has enough space, it will show in the direction with more available space.
4.  A CSS class `positioned-above` is added to the container when the dropdown is positioned above, allowing for additional styling if needed.

## Implementation Details

*   **CSS Injection:** The component is responsible for injecting its own styles into the document's `<head>` when the first instance is created. This makes it self-contained and easy to drop into any project without needing to include a separate CSS file.
*   **Vanilla JavaScript:** The component is built using plain JavaScript classes and DOM manipulation, with no external library dependencies.
*   **Accessibility:** Basic ARIA attributes (`role`, `aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-hidden`, `aria-selected`) and keyboard navigation (`Enter`, `Space`, `Escape`, `ArrowUp`, `ArrowDown`, `Tab`) are included for improved accessibility. The scrollable menu header is non-interactive and excluded from keyboard navigation.
*   **Default Caret Icon:** The component now uses a triangle down SVG as the default caret icon, which can be overridden with a custom SVG through the `caretIconSVG` option.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `Dropdown` class.
*   `dropdown.js`: Contains the main `Dropdown` class logic.
*   `dropdown.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names, ARIA attributes, and other constants.
*   `README.md`: This file.
*   `utils.js` (Optional): Placeholder for potential utility functions.
