<!--
Component: Tabs
Block-UUID: 7a86824e-1844-4358-8f71-e633a5b9ae47
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the reusable Tabs component.
Language: markdown
Created-at: 2025-10-11T15:59:20.000Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# Tabs Component

This directory contains the source code for a reusable `Tabs` UI component for navigation.

## Purpose

The `Tabs` component provides a simple way to switch between different views or sections of content. It highlights the active tab with a colored bottom border and provides hover feedback for inactive tabs.

## Usage

1.  **Import the Component:**

```javascript
const { Tabs } = require('./path/to/tabs');
```

2.  **Prepare Configuration and Container:**

```html
<div id="tabs-container"></div>
```

```javascript
const tabsContainer = document.getElementById('tabs-container');

const tabsConfig = {
  tabs: [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'User Profile' },
    {
      id: 'settings',
      label: (() => {
        const span = document.createElement('span');
        span.innerHTML = 'Settings <svg>...</svg>'; // Example of rich label
        return span;
      })()
    }
  ],
  initialActiveTab: 'home',
  borderWidth: '3px',
  borderColor: 'red',
  hoverBorderColor: 'orange',
  onTabChange: (newId, oldId) => {
    console.log(`Tab changed from ${oldId} to ${newId}`);
    // Load content for newId
  }
};

const myTabs = new Tabs(tabsContainer, tabsConfig);
myTabs.render(); // Explicitly render the component
```

## API

### `constructor(parentElement, config)`

Creates a new instance of the `Tabs` component.

*   `parentElement`: The DOM element to append the tabs to.
*   `config`: Configuration options.
    *   `tabs` (Array): Definitions for each tab. Each object requires `id` and `label`. `label` can be a string or an `HTMLElement`.
    *   `initialActiveTab` (String/Number): ID of the tab to be active on first render.
    *   `orientation` (String): `'horizontal'` (default) or `'vertical'`.
    *   `borderWidth` (String): CSS value for the active/hover border width (e.g., `'2px'`).
    *   `borderColor` (String): CSS color for the active tab's border (e.g., `'#007bff'`).
    *   `hoverBorderColor` (String): CSS color for the hover border on inactive tabs.
    *   `style` (Object): Inline styles for the main container.
    *   `className` (String): Additional CSS classes for the main container.
    *   `onTabChange` (Function): Callback `function(newActiveTabId, previousActiveTabId)`.

### `render()`

Builds and appends the component's HTML to the `parentElement`.

### `setActiveTab(tabId)`

Activates the tab with the given `tabId`.

### `getActiveTabId()`

Returns the `id` of the currently active tab.

### `disableTab(tabId)`

Disables the tab with the given `tabId`.

### `enableTab(tabId)`

Enables the tab with the given `tabId`.

### `cleanup()`

Removes the component from the DOM and cleans up internal references.

## Implementation Details

*   Uses vanilla JavaScript.
*   Self-contained CSS injected via a `style` tag.
*   Supports rich labels via `HTMLElement`.
*   Provides hover feedback for interactive tabs.
