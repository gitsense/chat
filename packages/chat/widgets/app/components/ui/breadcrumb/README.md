<!--
Component: Breadcrumb
Block-UUID: 4658b881-8fc8-47bd-ab74-448f21bd7881
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the reusable Breadcrumb navigation component.
Language: markdown
Created-at: 2025-10-11T21:27:02.795Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# Breadcrumb Component

This directory contains the source code for a reusable `Breadcrumb` UI component for navigation.

## Purpose

The `Breadcrumb` component provides a simple way to display the current location within a website or application's hierarchy. It renders a horizontal list of links or labels separated by a delimiter.

## Usage

1.  **Import the Component:**

```javascript
const { Breadcrumb } = require('./path/to/breadcrumb');
```

2.  **Prepare Configuration and Container:**

```html
<div id="breadcrumb-container"></div>
```

```javascript
const breadcrumbContainer = document.getElementById('breadcrumb-container');

const breadcrumbConfig = {
  items: [
    { id: 'home', label: 'Home', active: false },
    { id: 'section', label: 'Section', active: false },
    { id: 'current', label: 'Current Page', active: true }
  ],
  separator: '>', // Optional custom separator
  style: { fontSize: '0.9em', color: '#333' }, // Optional inline styles for container
  className: 'my-custom-breadcrumb' // Optional additional CSS classes
};

const myBreadcrumb = new Breadcrumb(breadcrumbContainer, breadcrumbConfig);
myBreadcrumb.render(); // Explicitly render the component
```

3.  **Making Items Clickable (User-Managed):**

To make a breadcrumb item clickable, define its `label` as an `HTMLElement` (like a `<button>` or `<a>` tag) and attach your own event listeners to it.

```javascript
const clickableHomeLink = document.createElement('a');
clickableHomeLink.href = '#'; // Or your actual URL
clickableHomeLink.textContent = 'Home';
clickableHomeLink.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Navigating home...');
  // Your navigation logic here
});

const breadcrumbConfigWithClick = {
  items: [
    { id: 'home', label: clickableHomeLink, active: false },
    { id: 'section', label: 'Section', active: false },
    { id: 'current', label: 'Current Page', active: true }
  ],
  separator: '/' // Default separator
};

const myClickableBreadcrumb = new Breadcrumb(breadcrumbContainer, breadcrumbConfigWithClick);
myClickableBreadcrumb.render();
```

## API

### `constructor(parentElement, config)`

Creates a new instance of the `Breadcrumb` component.

*   `parentElement`: The DOM element to append the breadcrumb to.
*   `config`: Configuration options.
    *   `items` (Array): **Required.** Definitions for each breadcrumb item. Each object requires `id` and `label`. `label` can be a string or an `HTMLElement`. One item should typically have `active: true`.
    *   `separator` (String or HTMLElement): Custom separator to display between items. Defaults to `'/'`.
    *   `style` (Object): Inline styles for the main breadcrumb container (e.g., `{ fontSize: '14px', color: 'blue' }`).
    *   `className` (String): Additional CSS classes for the main breadcrumb container.

### `render()`

Builds and appends the component's HTML to the `parentElement`.

### `cleanup()`

Removes the component from the DOM and cleans up internal references.

## Implementation Details

*   Uses vanilla JavaScript.
*   Self-contained CSS injected via a `style` tag.
*   Supports rich labels via `HTMLElement`.
*   Automatically applies bold font weight to the active item if its label is a string.
*   Click interactivity is managed entirely by the user providing their own `HTMLElement` labels with attached listeners.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `Breadcrumb` class.
*   `breadcrumb.js`: Contains the main `Breadcrumb` class logic.
*   `breadcrumb.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names and default configuration values.
*   `README.md`: This file.
