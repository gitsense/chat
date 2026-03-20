<!--
Component: Button and CopyButton Components Overview
Block-UUID: 721c1e66-0cb2-4345-b77d-79de52253b7c
Parent-UUID: N/A
Version: 1.1.0
Description: Overview of the reusable base Button component and the specialized CopyButton component for clipboard operations.
Language: markdown
Created-at: 2025-10-21T17:23:28.055Z
Authors: Gemini 2.5 Flash (v1.0.0), Qwen 3 Coder 480B - Cerebras (v1.1.0)
-->


# Button and CopyButton Components

This document details the base `Button` component, designed for universal styling and behavior, and the specialized `CopyButton` component, which extends the base to handle clipboard operations with visual feedback.

## Component File Structure

```
.
└── button
    ├── button.js
    ├── button.styles.js
    ├── constants.js
    ├── index.js
    └── copy
        ├── copy-button.component.js
        └── copy-button.constants.js
```

---

## Button Component

### Purpose

A reusable, customizable base component for all interactive buttons in the UI. It provides consistent styling, size control, and icon placement, ensuring a unified look and feel across the application.

### Key Files

*   `button/button.js`: Core logic and rendering.
*   `button/button.styles.js`: CSS styles for all variants and sizes.
*   `button/constants.js`: Defines `VARIANTS`, `SIZES`, and `CSS_CLASSES`.

### API (`Button` class)

#### Constructor

```javascript
new Button(parentElement, config)
```

*   `parentElement` (`HTMLElement`): The DOM container for the button.
*   `config` (`object`):
    *   `text` (`string`): The text content of the button.
    *   `variant` (`string`, default: `VARIANTS.PRIMARY`): The button style variant (`primary`, `secondary`, `danger`, `link`, `icon`).
    *   `size` (`string`, default: `SIZES.MEDIUM`): The button size (`small`, `medium`, `large`).
    *   `leftIcon` (`string` or `HTMLElement`): SVG string (or `SVGUtils` name like `'copy'`) or HTMLElement for the left icon.
    *   `rightIcon` (`string` or `HTMLElement`): SVG string or HTMLElement for the right icon.
    *   `disabled` (`boolean`, default: `false`): Initial disabled state.
    *   `onClick` (`function`): Click handler function.
    *   `style` (`object`): Additional inline styles.
    *   `className` (`string`): Additional CSS classes.

#### Methods

*   `render()`: Builds and appends the button's HTML to the `parentElement`.
*   `setDisabled(disabled)`: Sets the disabled state of the button.
*   `setLoading(loading)`: Sets the loading state (visually indicates processing).
*   `setText(newText)`: Updates the text content of the button, preserving icons.
*   `destroy()`: Removes the component from the DOM and cleans up references.

### Implementation Details

*   Uses vanilla JavaScript and injects its own CSS.
*   Icons are rendered using `SVGUtils` if a known name is provided, or raw SVG markup.
*   Handles disabled state visually and functionally.

---

## CopyButton Component

### Purpose

A specialized button component that inherits all styling and structure from the base `Button`. Its primary function is to copy a specified string of text to the user's clipboard and provide temporary visual feedback (e.g., changing text/icon to "Copied!") upon success.

### Key Files

*   `button/copy/copy-button.component.js`: Core logic, clipboard API integration, and feedback management.
*   `button/copy/copy-button.constants.js`: Defines default text, feedback text, and duration.

### API (`CopyButton` class)

#### Constructor

```javascript
new CopyButton(parentElement, config)
```

*   `parentElement` (`HTMLElement`): The DOM container for the button.
*   `config` (`object`):
    *   `contentToCopy` (`string`): **Required.** The text content to be copied to the clipboard.
    *   `iconOnly` (`boolean`, default: `false`): If true, renders only the icon (defaults to `VARIANTS.ICON`).
    *   `variant` (`string`, default: `VARIANTS.SECONDARY`): Inherited style variant.
    *   `size` (`string`, default: `SIZES.SMALL`): Inherited size.
    *   `onCopySuccess` (`function`): Optional callback after successful copy operation.
    *   *Inherits all other `Button` configuration options.*

#### Methods

*   `_handleCopyClick(e)`: (Internal) Executes the `navigator.clipboard.writeText()` operation.
*   `_showFeedback()`: (Internal) Temporarily changes the button's text and icon to indicate success.
*   `destroy()`: Overridden from `Button` to ensure the feedback timeout is cleared before cleanup.
*   *Inherits `render()`, `setDisabled()`, `setLoading()`, and `setText()` from `Button`.*

### Implementation Details

*   Uses the modern `navigator.clipboard.writeText()` API.
*   Automatically manages a timeout to revert the button state from "Copied!" back to the default state.
*   Defaults to the clipboard icon (`SVGUtils.copy`) and the checkmark icon (`SVGUtils.check`) for feedback.

