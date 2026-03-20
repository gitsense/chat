<!--
Component: Pagination
Block-UUID: 9a0945f7-f74b-417a-bf5a-90117cd229c2
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the reusable Pagination component, detailing its usage, API, and configuration options.
Language: markdown
Created-at: 2025-10-01T04:01:45.456Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# Pagination Component

This directory contains the source code for a reusable `Pagination` UI component. This component provides standard pagination controls (page buttons, Previous/Next navigation, page size selector) and can be used with tables, lists, or other paginated data views.

## Purpose

The `Pagination` component aims to:

*   Provide a customizable set of pagination controls.
*   Handle navigation for large page counts using ellipsis (`...`).
*   Allow users to change the number of items displayed per page.
*   Display informational text about the current page and total items.
*   Be self-contained, injecting its own necessary CSS styles.
*   Offer a simple API for programmatic control and state updates.

## Usage

The `Pagination` component is instantiated with a parent DOM element and a configuration object, then explicitly rendered.

1.  **Import the Component:**

```javascript
// In your application code
const { Pagination } = require('gsc-ui/pagination');
// Or, if using relative paths:
// const { Pagination } = require('./path/to/pagination');
```

2.  **Prepare Configuration and Container:**

Define your configuration options and get an HTML element in your page where the pagination controls will be rendered.

```html
<!-- In your HTML file -->
<div id="pagination-container"></div>
```

```javascript
// In your JavaScript
const paginationContainer = document.getElementById('pagination-container');

const paginationConfig = {
  currentPage: 1,
  itemsPerPage: 50,
  totalItems: 235,
  itemsPerPageOptions: [25, 50, 100, 200],
  maxVisiblePageButtons: 7,
  showPageSizeSelector: true,
  showPageInfo: true,
  onPageChange: (newPage) => {
    console.log(\`Navigating to page \${newPage}\`);
    // Your logic to load/fetch data for the new page
  },
  onPageSizeChange: (newPageSize) => {
    console.log(\`Changing page size to \${newPageSize}\`);
    // Your logic to re-load/fetch data with the new page size
    // Often, you'll also want to reset to the first page
  },
  text: {
    previous: "Prev",
    next: "Next",
    itemsPerPage: "Show:",
    pageInfo: "Displaying items {start} to {end} of {totalItems} (Page {currentPage} of {totalPages})"
  }
};

const pagination = new Pagination(paginationContainer, paginationConfig);
pagination.render(); // Explicitly render the component
```

## API

### `constructor(parentElement, config)`

Creates a new instance of the `Pagination` component. Styles are injected when the first instance is created.

*   `parentElement` (`HTMLElement`): The DOM element where the pagination controls will be rendered. **Required.**
*   `config` (`object`): An object containing configuration for the pagination controls.
    *   `currentPage` (Optional `number`, default: `1`): The initial active page number.
    *   `itemsPerPage` (Optional `number`, default: `25`): The initial number of items shown per page.
    *   `totalItems` (Optional `number`, default: `0`): The total number of items available for pagination.
    *   `itemsPerPageOptions` (Optional `Array<number>`, default: `[10, 25, 50, 100]`): The list of options for the page size selector dropdown.
    *   `maxVisiblePageButtons` (Optional `number`, default: `5`): Maximum number of page number buttons to show around the current page before using ellipsis.
    *   `showPageSizeSelector` (Optional `boolean`, default: `true`): Whether to display the page size dropdown selector.
    *   `showPageInfo` (Optional `boolean`, default: `true`): Whether to display the informational text showing the current range and totals.
    *   `text` (Optional `object`): An object for customizing UI text labels for localization or specific needs.
        *   `text.previous` (Optional `string`, default: `"Previous"`): Label for the 'Previous' navigation button.
        *   `text.next` (Optional `string`, default: `"Next"`): Label for the 'Next' navigation button.
        *   `text.itemsPerPage` (Optional `string`, default: `"Items per page:"`): Label displayed next to the page size selector.
        *   `text.pageInfo` (Optional `string`, default: `"{start}-{end} of {totalItems} items (Page {currentPage} of {totalPages})"`): Template for the page info text. Placeholders `{start}`, `{end}`, `{totalItems}`, `{currentPage}`, and `{totalPages}` will be replaced with actual values.
    *   `onPageChange` (Optional `function(pageNumber: number)`): Callback function invoked when the user clicks a page number button (including 'Previous'/'Next'). It receives the target `pageNumber` as an argument.
    *   `onPageSizeChange` (Optional `function(itemsPerPage: number)`): Callback function invoked when the user changes the `itemsPerPage` via the dropdown. It receives the new `itemsPerPage` value as an argument.

### `render()`

Renders the pagination controls component into the parent element. This method must be called explicitly after instantiation.

### `getCurrentPage()`

Returns the current page number.

### `getItemsPerPage()`

Returns the current number of items displayed per page.

### `getTotalItems()`

Returns the total number of items available for pagination.

### `getTotalPages()`

Calculates and returns the total number of pages based on `totalItems` and `itemsPerPage`.

### `goToPage(pageNumber)`

Programmatically sets the current page to `pageNumber` and updates the UI. If the page number is valid and different from the current page, it triggers the `onPageChange` callback.

*   `pageNumber` (`number`): The target page number to navigate to.

### `setItemsPerPage(itemsPerPage)`

Programmatically sets the number of items per page to `itemsPerPage`, recalculates the total number of pages, resets the current page to 1, and updates the UI. If the value is valid and different from the current setting, it triggers the `onPageSizeChange` callback.

*   `itemsPerPage` (`number`): The new number of items to display per page.

### `setTotalItems(totalItems)`

Updates the total item count to `totalItems` and refreshes the UI to reflect the new total and potentially updated page calculations.

*   `totalItems` (`number`): The new total number of items.

### `update({ currentPage, itemsPerPage, totalItems })`

Updates one or more state properties (`currentPage`, `itemsPerPage`, `totalItems`) at once and refreshes the UI accordingly.

*   `updateConfig` (`object`): An object containing the properties to update.
    *   `currentPage` (Optional `number`): The new current page number.
    *   `itemsPerPage` (Optional `number`): The new items per page value.
    *   `totalItems` (Optional `number`): The new total items count.

### `cleanup()`

Removes the component's DOM elements and clears any internal references to them, freeing resources. Event listeners attached to elements that are removed will be automatically cleaned up by the browser.

## Implementation Details

*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created, making it self-contained and consistent with other `gsc-ui` components.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation, with no external library dependencies.
*   **Ellipsis Handling:** For large page counts, the component intelligently displays ellipsis (`...`) to avoid cluttering the UI with too many page buttons.
*   **State Management:** The component maintains its own state (`currentPage`, `itemsPerPage`, `totalItems`) and updates its UI accordingly when these values change programmatically or via user interaction.
*   **Flexible Text:** UI text labels and the page info template can be customized, making it easier to adapt for different languages or specific phrasing needs.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `Pagination` class.
*   `pagination.js`: Contains the main `Pagination` class logic.
*   `pagination.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names and default configuration values.
*   `README.md`: This file.
