
<!--
 * Component: GitFilesTable - README
 * Block-UUID: 8a3d5f2e-7b4c-4d9e-8f1a-2c6e9b3d7f5a
 * Parent-UUID: 7b0f1b73-02da-4153-aa16-f2618ae2d158
 * Version: 1.1.0
 * Description: Documentation for the GitFilesTable reusable component.
 * Language: markdown
 * Created-at: 2025-11-03T16:15:44.817Z
 * Authors: GLM-4.6 (v1.0.0), GLM-4.6 (v1.1.0)
-->


# GitFilesTable Component

A reusable and configurable JavaScript component for displaying a table of Git files. It is designed to be integrated into any web application that needs to show a list of files with associated metadata like repository, commit info, and origin.

## Features

-   **Configurable Columns:** Displays Origin, Version, File, Repo, and Committed information.
-   **Search/Filter:** Optional search input to filter files by path or UUID.
-   **Pagination:** Optional pagination controls for handling large datasets.
-   **Customizable Styling:** Pass-through options to control the underlying table's appearance (e.g., height, font size).
-   **Event Handling:** Provides a callback for when a file link is clicked, enabling drill-down functionality.
-   **Clean UI:** Uses a two-line cell structure for clean display of primary and secondary metadata.
-   **Bottom Row Layout:** Features a bottom row with pagination on the left and an actions container on the right for custom buttons.

## Installation

Assuming the component is part of your project's monorepo or installed as a package:

```javascript
const { GitFilesTable } = require('@gitsense/gsc-git-files-table');

```

## Usage

### 1. HTML

Provide a container element in your HTML where the table will be rendered.

```html
<div id="my-file-table" style="height: 600px; width: 100%;"></div>
```

### 2. JavaScript

Instantiate and render the table with your data and configuration.

```javascript
const { GitFilesTable } = require('@gitsense/gsc-git-files-table');

// 1. Get the container element
const tableContainer = document.getElementById('my-file-table');

// 2. Define your data (an array of GitFileNode objects)
const fileData = [
    {
        id: 'chat-123',
        name: 'index.js',
        path: 'src/components/index.js',
        repo: 'gitsense/my-repo',
        origin: 'imported',
        version: 'a1b2c3d4',
        commit: { timestamp: 1698712800, author: 'Jane Doe' },
        message: { id: 456, position: 3, created_at: '2023-10-30T10:00:00.000Z', role: 'user' }
    },
    {
        id: 'chat-124',
        name: 'styles.css',
        path: 'src/styles.css',
        repo: 'gitsense/another-repo',
        origin: 'working-directory',
        version: 'N/A',
        commit: null,
        message: { id: 457, position: 4, created_at: '2023-10-30T11:00:00.000Z', role: 'assistant' }
    }
    // ... more file objects
];

// 3. Define the table options
const tableOptions = {
    onFileClick: (fileNode) => {
        console.log('File clicked:', fileNode);
        alert(`You clicked on ${fileNode.path}`);
        // Navigate to a detail view for the selected file
    },
    emptyMessage: 'No files found in this view.',
    itemsPerPage: 10,
    enableSearch: true,
    searchPlaceholder: 'Filter files...',
    enablePagination: true,
    tableOptions: {
        maxBodyHeight: '400px', // Override the default dynamic height
        fontSize: '14px'
    }
};

// 4. Create a new instance of the GitFilesTable
const myTable = new GitFilesTable(tableContainer, tableOptions);

// 5. Render the table with your data
myTable.render(fileData);

// 6. Add custom buttons to the actions container (right side of bottom row)
const actionsContainer = myTable.getActionsContainer();

// Create an export button
const exportButton = document.createElement('button');
exportButton.textContent = 'Export';
exportButton.className = 'btn btn-primary';
exportButton.onclick = () => {
    // Export functionality here
    console.log('Exporting data...');
};

// Create a refresh button
const refreshButton = document.createElement('button');
refreshButton.textContent = 'Refresh';
refreshButton.className = 'btn btn-secondary';
refreshButton.onclick = () => {
    // Refresh functionality here
    console.log('Refreshing data...');
};

// Add buttons to the actions container
actionsContainer.appendChild(exportButton);
actionsContainer.appendChild(refreshButton);

// 7. When the component is no longer needed (e.g., navigating away from the view)
// call destroy to clean up event listeners and prevent memory leaks.
// myTable.destroy();
```

## API Reference

### Data Structures

#### `GitFileNode`

An object representing a single file to be displayed in the table.

| Property | Type | Description |
| --- | --- | --- |
| `id` | `string` | A unique identifier for the file node. |
| `name` | `string` | The file name (e.g., `index.js`). |
| `path` | `string` | The full file path (e.g., `src/components/index.js`). |
| `repo` | `string` | The full repository name (e.g., `gitsense/gsc-context-browser`). |
| `origin` | `string` (optional) | The origin of the file. Expected: `'imported'` or `'working-directory'`. Defaults to `'imported'`. |
| `version` | `string` (optional) | The version identifier (e.g., commit hash or semantic version). |
| `commit` | `object` (optional) | An object containing commit metadata. |
| `commit.timestamp` | `number` (optional) | The commit timestamp in Unix seconds. |
| `commit.author` | `string` (optional) | The commit author's name. |
| `message` | `object` (optional) | The chat message associated with this file. |
| `message.id` | `number` (optional) | The ID of the chat message. |
| `message.position` | `number` (optional) | The position of the message in the chat. |
| `message.created_at` | `string` (optional) | The ISO 8601 creation timestamp of the message. |
| `message.role` | `string` (optional) | The role of the message sender (e.g., `'user'`, `'assistant'`). |

#### `GitFilesTableOptions`

Configuration options passed to the `GitFilesTable` constructor.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `onFileClick` | `function` | `null` | Callback triggered when a file name link is clicked. Receives the `GitFileNode` object as an argument. |
| `emptyMessage` | `string` | `'No files to display.'` | Message shown when the data array is empty. |
| `itemsPerPage` | `number` | `25` | Default number of items to show per page. |
| `enableSearch` | `boolean` | `true` | Flag to enable or disable the search/filter input. |
| `searchPlaceholder` | `string` | `'Filter by file path or UUID...'` | Placeholder text for the search input. |
| `enablePagination` | `boolean` | `true` | Flag to enable or disable the pagination controls. |
| `tableOptions` | `object` | `{}` | An object of settings passed directly to the underlying table component for fine-grained control. |

### Methods

#### `constructor(container, options)`

Creates an instance of the GitFilesTable.

-   `container` (`HTMLElement`): The DOM element to render the table into.
-   `options` (`GitFilesTableOptions`): Configuration options for the table.

#### `render(data)`

Renders the table with the provided data.

-   `data` (`Array<GitFileNode>`): The array of file data to display.

#### `destroy()`

Destroys the component, removing all event listeners and clearing the container to prevent memory leaks.

#### `getActionsContainer()`

Returns the actions container DOM element, which is positioned on the right side of the bottom row below the table. This allows external code to add custom buttons or controls.

-   **Returns:** `HTMLElement` - The actions container DOM element.

### Layout Structure

The GitFilesTable component has the following layout structure:


```
┌─────────────────────────────────────┐
│ Search Input (optional)              │
├─────────────────────────────────────┤
│ Results Count                        │
├─────────────────────────────────────┤
│                                     │
│ Table Content                       │
│                                     │
├─────────────────────────────────────┤
│ Bottom Row                          │
│ ┌─────────────────────┬───────────┐ │
│ │   Pagination        │ Actions   │ │
│ │   Controls          │ Container │ │
│ │                     │           │ │
│ └─────────────────────┴───────────┘ │
└─────────────────────────────────────┘
```

The bottom row contains:
- **Left side:** Pagination controls (if enabled)
- **Right side:** Actions container for custom buttons/controls

### Adding Custom Actions

To add custom buttons or controls to the actions container:

1. Get the actions container using `getActionsContainer()`
2. Create your buttons or controls using standard DOM methods
3. Append them to the actions container

Example:

```javascript
// Get the actions container
const actionsContainer = myTable.getActionsContainer();

// Create a custom button
const customButton = document.createElement('button');
customButton.textContent = 'Custom Action';
customButton.className = 'btn btn-custom';
customButton.onclick = () => {
    // Custom action logic
    alert('Custom action triggered!');
};

// Add the button to the actions container
actionsContainer.appendChild(customButton);
```
