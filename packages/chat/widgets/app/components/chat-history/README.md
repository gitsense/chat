<!--
Component: Chat History
Block-UUID: 8c3b90a7-9b40-4fe6-ac92-5086a656576a
Parent-UUID: N/A
Version: 1.2.1
Description: README documentation for the Chat History component, detailing its usage, API, and configuration options.
Language: markdown
Created-at: 2026-01-11T18:28:15.456Z
Authors: GLM-4.6 (v1.0.0), GLM-4.6 (v1.1.0), GLM-4.6 (v1.2.0), GLM-4.6 (v1.2.1)
-->


# Chat History Component

This directory contains the source code for a reusable `ChatHistory` UI component. This component provides a comprehensive interface for browsing, searching, and managing user's chat history in a chat application.

## Purpose

The `ChatHistory` component aims to:

*   Provide a searchable, sortable, and paginated table of chat history
*   Support expandable breadcrumb paths for chat hierarchies
*   Offer pin/unpin functionality for important chats
*   Enable export/import of chat history across devices
*   Display an informative empty state with import instructions
*   Be self-contained, injecting its own necessary CSS styles
*   Offer a comprehensive API for programmatic control and configuration

## Usage

The `ChatHistory` component is instantiated with a parent DOM element and a configuration object, then explicitly rendered.

### 1. Import the Component

```javascript
// In your application code
const { ChatHistory } = require('./path/to/chat-history');

```

### 2. Prepare Configuration and Container

```html
<!-- In your HTML file -->
<div id="chat-history-container"></div>
```

```javascript
// In your JavaScript
const chatHistoryContainer = document.getElementById('chat-history-container');

const chatHistoryConfig = {
    onChatClick: (chat) => {
        console.log('Chat clicked:', chat);
        // Handle chat navigation
    },
    onChatFocus: (chat) => {
        console.log('Focus chat:', chat);
        // Handle focus action (e.g., open in new tab)
    },
    onChatValidate: async (chat) => {
        // Validate chat exists before navigation
        try {
            const response = await fetch(`/api/chats/${chat.id}`);
            return response.ok ? await response.json() : null;
        } catch (error) {
            console.error('Error validating chat:', error);
            return null;
        }
    },
    itemsPerPage: 25,
    itemsPerPageOptions: [10, 25, 50, 100],
    showOptions: true,
    showSearch: true,
    showPagination: true,
    defaultSort: 'last_viewed',
    defaultSortOrder: 'desc',
    defaultChatNameDisplay: 'nameAndRoot',
    defaultTimeDisplay: 'viewed'
};

const chatHistory = new ChatHistory(chatHistoryContainer, chatHistoryConfig);
chatHistory.render();
```

### 3. Saving Chats to History

```javascript
// When a chat is loaded, save it to history
function onChatLoaded(fullChatObject) {
    chatHistory.saveChat(fullChatObject);
    chatHistory.refresh();
}
```

## API

### Constructor Options

```javascript
new ChatHistory(container, options)
```

*   `container` (`HTMLElement`): The DOM element where the chat history will be rendered. **Required.**
*   `options` (`object`): An object containing configuration for the chat history.
    *   `onChatClick` (Optional `function(chat)`): Callback when a chat is clicked.
    *   `onChatFocus` (Optional `function(chat)`): Callback when focus icon is clicked.
    *   `onChatValidate` (Optional `function(chat)`): Async callback to validate chat before navigation.
    *   `itemsPerPage` (Optional `number`, default: `10`): Number of chats per page.
    *   `itemsPerPageOptions` (Optional `Array<number>`, default: `[10, 25, 50, 100]`): Available page size options.
    *   `showOptions` (Optional `boolean`, default: `true`): Whether to show the options menu.
    *   `showSearch` (Optional `boolean`, default: `true`): Whether to show the search input.
    *   `showPagination` (Optional `boolean`, default: `true`): Whether to show pagination controls.
    *   `defaultSort` (Optional `string`, default: `'last_viewed'`): Default sort field.
    *   `defaultSortOrder` (Optional `string`, default: `'desc'`): Default sort order.
    *   `defaultChatNameDisplay` (Optional `string`, default: `'nameAndRoot'`): Default chat name display mode.
    *   `defaultTimeDisplay` (Optional `string`, default: `'viewed'`): Default time display mode.

### Public Methods

#### Data Management

*   `saveChat(fullChatObject)`: Saves or updates a chat in the history.
    *   `fullChatObject` (`object`): The complete chat object from the API.
*   `getSavedChats()`: Returns an array of all saved chat objects.
*   `getChat(chatIdOrUuid)`: Returns a specific chat by ID or UUID or null if not found.
    *   `chatIdOrUuid` (`string|number`): The ID or UUID of the chat to retrieve.
*   `getChatById(chatId)`: Returns a specific chat by ID or null if not found.
*   `getChatByUUID(uuid)`: Returns a specific chat by UUID or null if not found.
*   `deleteChat(chatIdOrUuid)`: Deletes a chat from the history by ID or UUID.
    *   `chatIdOrUuid` (`string|number`): The ID or UUID of the chat to delete.
*   `clearAllChats()`: Clears all chats from the history.
*   `refresh()`: Refreshes the component display from storage.

#### Display Control

*   `setSearchTerm(searchTerm)`: Sets the search term and filters the chats.
*   `setCurrentPage(page)`: Sets the current page.
*   `setItemsPerPage(itemsPerPage)`: Sets the number of items per page.
*   `setSort(sortField, sortOrder)`: Sets the sorting field and order.
*   `setChatNameDisplay(displayMode)`: Sets the chat name display mode.
*   `setTimeDisplay(displayMode)`: Sets the time display mode.

#### Chat Actions

*   `updatePinnedStatus(chatId, pinned)`: Updates the pinned status of a chat.
*   `getChatUrl(uuid)`: Generates a chat URL from a UUID.

#### Export/Import

*   `exportHistory(options)`: Exports chat history to a JSON file.
*   `importHistory(file, options)`: Imports chat history from a JSON file.
*   `getHistoryStats()`: Gets statistics about the chat history.

#### Lifecycle

*   `render()`: Renders the component (called automatically in constructor).
*   `destroy()`: Destroys the component and cleans up resources.

## Data Structure

### Chat Object Format

The component works with pruned chat objects that contain essential information:

```javascript
{
    // Core identification
    id: 6498,
    uuid: "50754f33-7742-4c14-a849-e74c225b7ba0",
    name: "Chat Name",
    type: "regular",
    
    // Hierarchy
    parent_id: 6497,
    group_id: 754,
    lineage: [
        {
            id: 5103,
            uuid: "ea7724cb-f9bf-42b3-9cb5-a637297c85be",
            name: "Parent Chat",
            type: "notes",
            main_model: "GitSense Notes"
        }
    ],
    
    // Model
    main_model: "GLM-4.6",
    
    // Timestamps
    created_at: "2026-01-11T02:05:54.302Z",
    updated_at: "2026-01-11T02:06:50.766Z",
    last_viewed: "2026-01-11T02:12:52.886Z",
    
    // Message activity
    last_message: {
        id: 25358,
        updated_at: "2026-01-11T02:10:00.871Z"
    },
    message_count: 7,
    
    // Tracking
    view_count: 1,
    pinned: false
}
```

## Display Modes

### Chat Name Display

*   `name`: Name with expandable breadcrumb
*   `path`: Full path without toggle
*   `nameAndPath`: Both name and path visible
*   `nameAndRoot`: Both name and root chat visible (default)

### Time Display

*   `viewed`: Last viewed time (default)
*   `created`: Original creation time

## Sort Fields

*   `last_viewed`: Sort by last viewed time
*   `created_at`: Sort by creation time
*   `updated_at`: Sort by last update time
*   `name`: Sort by chat name
*   `message_count`: Sort by message count
*   `view_count`: Sort by view count

## Export/Import Format

### Export Structure

```javascript
{
    version: "1.0.0",
    exportedAt: "2026-01-11T18:30:00.000Z",
    chatCount: 25,
    chats: {
        "123": {
            // Pruned chat objects
        }
    }
}
```

### Import Options

```javascript
await chatHistory.importHistory(file, {
    merge: true,              // Merge with existing or replace
    updateViewCount: false    // Update view counts for imported chats
});
```

## Implementation Details

### CSS Injection

The component injects its own styles into the document's `<head>` when the first instance is created, making it self-contained and consistent with other `gsc-ui` components.

### Storage

The component uses localStorage with the key `'gsc-chat-history'` to persist chat data across sessions.

### Data Pruning

Full chat objects from the API are pruned to include only essential information, reducing storage requirements and improving performance.

### Chat Validation

When `onChatValidate` is provided, the component validates chats before navigation, handling cases where chats have been deleted or are no longer accessible.

### ID and UUID Support

The component supports retrieval and deletion of chats by both ID and UUID. This provides flexibility when working with chat data, as users can use whichever identifier is available.

### Unified API Methods

For convenience, the component provides unified methods (`getChat` and `deleteChat`) that automatically route to the appropriate implementation based on whether the input is an ID or UUID. This makes the API more intuitive and reduces the need for users to know which method to use.

### Responsive Design

The component includes responsive adjustments for smaller screens, with proper handling of table overflow and mobile-friendly interactions.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the main `ChatHistory` class.
*   `ChatHistory.js`: Contains the main `ChatHistory` class logic.
*   `constants.js`: Defines constants, CSS class names, and configuration values.
*   `components/`: Custom UI components used by the main component.
    *   `ChatsTable.js`: Table component for displaying chat history.
    *   `EmptyState.js`: Empty state component with import instructions.
*   `utils/`: Utility modules for data processing and management.
    *   `storageManager.js`: Local storage operations.
    *   `chatDataProcessor.js`: Data pruning and processing.
    *   `dateFormatter.js`: Date formatting utilities.
    *   `exportImportManager.js`: Export/import functionality.
*   `styles/chat-history.css`: Component-specific styles.
*   `README.md`: This file.

## Dependencies

The component depends on the following `gsc-ui` components:

*   `@gitsense/gsc-ui/search-input`: For the search functionality
*   `@gitsense/gsc-ui/pagination`: For pagination controls
*   `@gitsense/gsc-ui/tooltip-menu`: For the options dropdown
*   `@gitsense/gsc-ui/confirmation-box`: For confirmation dialogs
*   `@gitsense/gsc-ui/notification-manager`: For user notifications
*   `@gitsense/gsc-utils`: For DOM utilities and date formatting

## Browser Compatibility

The component supports all modern browsers that support:
*   ES6+ JavaScript features
*   CSS Grid and Flexbox
*   LocalStorage API
*   File API for import/export

## Performance Considerations

*   Chat data is pruned before storage to minimize localStorage usage
*   Pagination limits the number of DOM elements rendered
*   Search debouncing prevents excessive filtering operations
*   Styles are injected only once per page load, regardless of instance count
