# Component: Table
# Block-UUID: 557d2dec-79cf-41e3-9aab-c3592eedaa4d
# Parent-UUID: 6d374068-64f9-4201-bf09-013a4f79afaa
# Version: 1.2.0
# Description: README documentation for the reusable Table component, featuring a fixed header and scrollable body.
# Language: markdown
# Created-at: 2026-01-03T06:30:56.184Z
# Authors: Gemini 2.5 Flash (v1.0.0), Gemini 2.5 Flash (v1.1.0), GLM-4.6 (v1.2.0)


# Table Component

This directory contains the source code for a reusable `Table` UI component, designed to display tabular data with a fixed header and a scrollable body. This component is ideal for displaying lists of items where the number of rows can vary, and you want to keep the column headers visible while scrolling through the data.

## Purpose

The `Table` component aims to:

*   Provide a customizable table interface with a fixed header.
*   Allow the table body to scroll independently when its content exceeds a defined maximum height.
*   Be self-contained, injecting its own necessary CSS styles.
*   Offer a simple API for dynamic row management (adding, clearing, updating data).
*   Support custom rendering for individual cells.

## Usage

The `Table` component is instantiated with a parent DOM element and a configuration object.

1.  **Import the Component:**

```javascript
// In your application code (e.g., a script file or another component)
const { Table } = require('./path/to/table');
```

2.  **Prepare Configuration and Container:**

    Define your table columns and any global options. You also need an HTML element in your page where the table will be rendered.

```html
<!-- In your HTML file -->
<div id="my-data-table-container"></div>
```

```javascript
// In your JavaScript
const tableColumns = [ // All fixed-width columns must be specified with 'px'
  { id: 'name', header: 'Name', width: '150px' }, // Fixed width
  { id: 'type', header: 'Type', width: '100px' }, // Fixed width
  {
    id: 'description',
    header: 'Description',
    width: 'auto', // Only ONE column can have 'auto' width; it will fill remaining space.
    renderCell: (rowData, columnId) => {
      // Custom rendering for the description cell
      const div = document.createElement('div');
      div.textContent = rowData[columnId] || 'N/A';
      div.style.fontStyle = 'italic';
      return div;
    }
  }, // This column will dynamically take the remaining width
  { id: 'status', header: 'Status', width: '80px' } // Fixed width
];

const tableOptions = {
  maxBodyHeight: '250px', // Make the body scrollable after 250px
  emptyMessage: 'No items to display yet.',
  scrollbarWidth: '15px' // Adjust if your browser's scrollbar is different
};

const containerElement = document.getElementById('my-data-table-container');
```

3.  **Instantiate the Table:**

Create a new instance of the `Table` class. It will automatically append its HTML structure to the `parentElement` and inject its styles.

```javascript
const myTable = new Table(containerElement, {
  columns: tableColumns,
  options: tableOptions
});
```

4.  **Add Data Dynamically:**

Use the `addRow`, `addRows`, or `updateData` methods to populate the table.

```javascript
// Add a single row
myTable.addRow({ name: 'Item A', type: 'Type 1', description: 'A short description.', status: 'Active' });

// Add multiple rows
const moreData = [
  { name: 'Item B', type: 'Type 2', description: 'Another item with a longer description that might get truncated.', status: 'Pending' },
  { name: 'Item C', type: 'Type 1', description: 'Third item.', status: 'Completed' }
];
myTable.addRows(moreData);

// Replace all data
const newData = [
  { name: 'New Item 1', type: 'New Type', description: 'This is the first new item.', status: 'New' },
  { name: 'New Item 2', type: 'New Type', description: 'This is the second new item.', status: 'New' }
];
myTable.updateData(newData);

// Clear all rows
// myTable.clearRows();
```
 
 ## API
 
 ### `constructor(parentElement, config)`
 
 Creates a new instance of the `Table` component. This will automatically inject styles and render the initial table structure (header and empty body) into the `parentElement`.
 
 *   `parentElement` (`HTMLElement`): The DOM element where the table will be rendered. **Required.**
 *   `config` (`object`): An object containing configuration for the table. **Required.**
     *   `columns` (`Array<object>`): An array of objects, each defining a column. **Required.**
         *   `id` (`string`): A unique identifier for the column. This `id` is used to access the corresponding property in your row data objects.
         *   `header` (`string` or `HTMLElement`): The content to display in the column's header cell.
         *   `width` (`string`): **Required.** Defines the width of the column.
             *   Must be an integer followed by `px` (e.g., `"100px"`) for fixed-width columns.
             *   Alternatively, exactly **one** column can have `width: "auto"`. This column will dynamically adjust its width to fill the remaining available space in the table.
         *   `renderCell` (Optional `function(rowData: object, columnId: string): string|HTMLElement`): A callback function to custom-render the content of a cell. It receives the full `rowData` object for the current row and the `columnId`. It should return either a `string` or an `HTMLElement`. If not provided, `rowData[columnId]` will be used as `textContent`.
     *   `options` (Optional `object`): General table options.
         *   `maxBodyHeight` (Optional `string`, default: `"300px"`): The maximum height for the scrollable table body. Accepts any valid CSS height value.
         *   `emptyMessage` (Optional `string`, default: `"No data available."`): The message to display in the table body when there are no rows.
         *   `scrollbarWidth` (Optional `string`, default: `"17px"`): The explicit width of the scrollbar. This is used to adjust the header width to align perfectly with the body columns when a scrollbar appears. Adjust if your browser's scrollbar width differs.
 
 ### `addRow(rowData)`
 
 Adds a single row to the end of the table body.
 
 *   `rowData` (`object`): An object representing the data for the new row. The keys of this object should match the `id`s defined in your `columns` configuration.
 
 ### `addRows(dataArray)`
 
 Adds multiple rows to the end of the table body.
 
 *   `dataArray` (`Array<object>`): An array of `rowData` objects.
 
 ### `clearRows()`
 
 Removes all rows from the table body and displays the `emptyMessage`.
 
 ### `updateData(newDataArray)`
 
 Clears all existing rows and then adds the `newDataArray` to the table. This is the primary method for refreshing the entire table content.
 
 *   `newDataArray` (`Array<object>`): An array of `rowData` objects to replace the current table content.
 
 ### `clearRows()`
 
 Removes all rows from the table body and displays the `emptyMessage`.
 
### `updateRow(rowIdentifier, newData, identifierFn)`

Updates a specific row in the table without re-rendering the entire table.

*   `rowIdentifier` (`number|string`): The identifier for the row to update. By default, this is matched against the `id` property of the row data.
*   `newData` (`object`): The new data object for the row. Properties in this object will overwrite the corresponding properties in the existing row data.
*   `identifierFn` (Optional `function(rowData, rowIdentifier): boolean`): A custom function to identify the row to update. It receives the row's current data and the rowIdentifier, and should return `true` if this is the target row. If not provided, the default behavior is to match the `id` property.
*   **Returns:** `boolean` - `true` if the row was found and updated, `false` otherwise.

#### Example:

```javascript
// Update a row with id=123
const success = myTable.updateRow(123, { 
  status: 'Completed', 
  description: 'Updated description' 
});

// Update using a custom identifier function
myTable.updateRow('group-5', { status: 'Running' }, (data, id) => data.groupNumber === id);
```

 ### `cleanup()`
 
 Removes the table's DOM elements and associated resources from the document. Use this if you need to completely remove the component from memory.
 
 ## Implementation Details
 
 *   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created, making it self-contained.
 *   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation, with no external library dependencies.
 *   **Fixed Header/Scrollable Body:** Achieved using a combination of `display: block;` on `<thead>` and `<tbody>`, `table-layout: fixed;` on the `<table>` and `<tr>` elements, and `max-height` with `overflow-y: auto;` on the `<tbody>`.
 *   **Column Alignment:** The header row's width is dynamically adjusted using `calc(100% - var(--gsc-scrollbar-width))` to account for the scrollbar that appears in the `<tbody>`, ensuring perfect column alignment.
 *   **Dynamic Column Widths:** Columns with fixed pixel widths are explicitly set, and a single `auto` column dynamically calculates its width to fill any remaining horizontal space, ensuring the table always utilizes its full width.
 *   **Custom Cell Rendering:** The `renderCell` function in column definitions allows for flexible and custom content within table cells, including HTML elements.
 
 ## Files in this Directory
 
 *   `index.js`: Entry point for the component, exports the `Table` class.
 *   `table.js`: Contains the main `Table` class logic.
 *   `table.styles.js`: Exports the component's CSS as a JavaScript string.
 *   `constants.js`: Defines CSS class names and other constants.
 *   `README.md`: This file.
