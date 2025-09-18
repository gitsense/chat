<!--
Component: Context Builder Modal README
Block-UUID: {{GS-UUID}}
Parent-UUID: N/A
Version: 1.0.0
Description: Comprehensive documentation for the Context Builder Modal, detailing its purpose, architecture, public API, and internal components for easy LLM comprehension.
Language: Markdown
Created-at: 2025-09-11T16:24:48.649Z
Authors: Gemini 2.5 Flash (v1.0.0)
-->

# Context Builder Modal

The Context Builder Modal is a comprehensive UI component designed to facilitate the selection, loading, filtering, and formatting of content (files or chat overviews) for use as context in Large Language Model (LLM) interactions. It supports batch processing, dynamic filtering, and provides insights into metadata.

## Purpose

The primary goal of the Context Builder Modal is to allow users to:
*   Select multiple items (e.g., code files, chat messages) from a tree-like structure.
*   Load their content, either as a brief overview or full content.
*   Filter these items based on various criteria (search, path, language, keywords, metadata).
*   View metadata insights for selected fields.
*   Copy the formatted content to the clipboard, save it as a selection, or add it directly to a chat.
*   Initiate an "Ask AI" action with the selected content.

## Architecture Overview

The Context Builder Modal (`ContextBuilderModal.js`) acts as the orchestrator, integrating several sub-components to provide its functionality. It follows a modular design to enhance maintainability and clarity.

```
ContextBuilderModal.js
├── ContextBuilderTable.js        (Displays items, handles selection)
├── ContentLoader.js              (Manages batch loading of content)
├── ModalControls.js              (Displays loading progress and statistics)
├── ModalFooter.js                (Contains action buttons: Cancel, Copy, Save, Add, Ask AI, Load)
├── MetadataInsightsModal.js      (Displays distinct metadata values and counts)
└── filters/
    ├── FilterManager.js          (Coordinates all filter types)
    ├── FilterState.js            (Manages combined state of all filters)
    ├── config/filterConfig.js    (Defines filter order and configuration)
    └── types/
        ├── language/LanguageFilter.js
        ├── language/LanguageFilterLogic.js
        ├── keywords/KeywordsFilter.js
        ├── keywords/KeywordsFilterLogic.js
        ├── path/PathFilter.js
        ├── path/PathFilterLogic.js
        ├── search/SearchFilter.js
        ├── search/SearchFilterLogic.js
        └── metadata/
            └── MetadataFilter/
                ├── index.js              (Entry point for Metadata Filter UI)
                ├── MetadataFilterUI.js
                ├── MetadataFilterEvents.js
                ├── MetadataFilterState.js
                ├── MetadataFilterApi.js
                ├── MetadataFilterConfig.js
                └── MetadataFilterTypes.js
            └── metadataFilterUtils.js
├── utils/
    ├── MetadataSearch.js         (Handles batched metadata insights queries)
    └── formatterUtils.js
```

## Public API

The Context Builder Modal is instantiated via the `createContextBuilderModal` factory function.

### `createContextBuilderModal(params)`

**Description:** Creates and returns an instance of the Context Builder Modal.

**Parameters:**
*   `params` (`object`): Configuration parameters for the modal.
    *   `state` (`object`): The TreeTable state manager instance.
    *   `chatApi` (`object`): The chat API instance for fetching data (must have `search`, `getAnalyzers`, `getAnalyzerSchema`, `getTinyChatOverviewPurpose`, `getGitBlobChatMessagesByChatIds`, `getChatOverviewMessagesByChatIds`, `createAskAIChat` methods).
    *   `saveCurrentSelection` (`Function`): Callback to save currently selected items.
    *   `batchChatsSize` (`number`, optional, default: `25`): Number of items to process in each batch during content loading.

**Returns:**
*   `object`: An object containing the modal's public methods and its DOM element.
    *   `show` (`Function`): Displays the modal and initiates content loading.
    *   `getContextBuilderTable` (`Function`): Returns the internal `ContextBuilderTable` instance.
    *   `hide` (`Function`): Hides the modal.
    *   `loadFromNodeIds` (`Function`): Loads content based on an array of node IDs.
    *   `element` (`HTMLElement`): The root DOM element of the modal.

### `modal.show(items, contentType, contentOption, modalStage, options)`

**Description:** Displays the modal and starts loading content.

**Parameters:**
*   `items` (`Array<object>`): An array of nodes (files or chats) to load.
*   `contentType` (`string`, optional, default: `'file content'`): Type of content to load (`'file content'` or `'overview'`).
*   `contentOption` (`string`, optional, default: `'imported'`): Option for the content type (`'imported'`, `'working directory'`, `'short'`, `'long'`).
*   `modalStage` (`string`, optional, default: `'review'`): The initial modal stage (`'review'`, `'full-loading'`, `'full-loaded'`).
*   `options` (`object`, optional): Additional configuration options.
    *   `showCopy` (`boolean`, optional, default: `true`): Whether to show the "Copy" button.
    *   `showSave` (`boolean`, optional, default: `true`): Whether to show the "Save" button.
    *   `showAdd` (`boolean`, optional, default: `true`): Whether to show the "Add" button.
    *   `onclickAddDefault` (`Function`, optional): Default callback for the "Add" button.
    *   `onclickAdd` (`Function`, optional): Custom callback for the "Add" button.
    *   `contextNameInputPlaceholder` (`string`, optional): Placeholder text for the context name input.
    *   `onAskAICreateChat` (`Function`, optional): Callback when "Ask AI" button is clicked, receives the new chat object.
    *   `initialAnalyzerId` (`string`, optional): **New.** The ID of the analyzer to pre-select in the Metadata Filter.
    *   `initialInsightsFields` (`Array<string>`, optional): **New.** An array of field names for which to immediately show metadata insights.

**Returns:** `void`

### `modal.loadFromNodeIds(nodeIds, type, option)`

**Description:** Loads content from a list of node IDs. This is typically used when restoring a selection.

**Parameters:**
*   `nodeIds` (`Array<string>`): An array of node IDs to load.
*   `type` (`string`, optional, default: `'file content'`): Type of content (`'file content'` or `'overview'`).
*   `option` (`string`, optional, default: `'imported'`): Option for the content type.

**Returns:** `void`

## Internal Components and Interactions

*   **`ContextBuilderTable.js`**: Manages the display of loaded items in a table, including selection checkboxes, expansion/collapse of content, and error/loading indicators. It notifies `ContextBuilderModal` of selection changes.
*   **`ContentLoader.js`**: Handles the asynchronous loading of content in batches, tracks loading progress, and caches results. It interacts with `chatApi` to fetch content.
*   **`ModalFooter.js`**: Renders the action buttons at the bottom of the modal. It receives callbacks from `ContextBuilderModal` for actions like cancel, copy, save, add, load full content, and ask AI.
*   **`ModalControls.js`**: Displays loading statistics (items, size, tokens) and a progress bar.
*   **`FilterManager.js`**: Orchestrates all active filters. It receives `allItems` from `ContextBuilderModal` after initial load, initializes individual filter UIs and logic, and applies filters to update the `ContextBuilderTable`'s displayed items. It debounces filter changes to optimize performance.
*   **`MetadataFilter/index.js`**: The entry point for the Metadata Filter UI. It integrates `MetadataFilterUI`, `MetadataFilterEvents`, `MetadataFilterState`, `MetadataFilterApi`, and `MetadataFilterConfig` to provide a dynamic metadata filtering experience. It interacts with `MetadataSearch` for fetching distinct values and `FilterManager` to trigger backend searches.
*   **`MetadataInsightsModal.js`**: A separate modal that displays distinct values and their counts for selected metadata fields, allowing users to generate new filter rules from these insights. It is shown by `MetadataFilter`.
*   **`MetadataSearch.js`**: A utility class that handles batched `profile:meta-insights` queries to the `chatApi` for fetching distinct metadata values. It includes caching and progress reporting.

## Programmatic Metadata Insights (New Feature)

The Context Builder Modal now supports programmatically opening the Metadata Insights Modal with pre-selected analyzer and fields. This is achieved by passing `initialAnalyzerId` and `initialInsightsFields` to the `modal.show()` method.

When these options are provided:
1.  The `ContextBuilderModal` will wait for the initial content loading to complete.
2.  It will then call `metadataFilter.addInsightRulesAndShowInsights(analyzerId, fields)`.
3.  The `MetadataFilter` component will:
    *   Ensure the specified analyzer is selected and its schema is loaded.
    *   Clear any existing filter rules.
    *   Add new, empty rules for each of the `initialInsightsFields`.
    *   Update its UI to reflect these changes.
    *   Finally, trigger the `MetadataInsightsModal` to open, pre-populated with insights for the specified fields.

This allows for a streamlined workflow where a user can click a single button (e.g., in a parent component like `TreeTable`) to open the Context Builder Modal and immediately see metadata insights for relevant fields.

## Usage Example (with Programmatic Insights)

```javascript
const { createContextBuilderModal } = require('./components/selectionManagement/contextBuilder/ContextBuilderModal');
// Assume other dependencies like chatApi, state, etc., are available

// Mock dependencies for demonstration
const mockChatApi = {
    search: async (query) => { /* ... mock implementation ... */ return { results: { messages: [] }, totalCounts: { messages: 0 } }; },
    getAnalyzers: async () => [{ id: 'code_analyzer', label: 'Code Analyzer' }],
    getAnalyzerSchema: async (id) => {
        if (id === 'code_analyzer') {
            return {
                type: 'object',
                properties: {
                    language: { type: 'string', title: 'Language' },
                    author: { type: 'string', title: 'Author' },
                    lines_of_code: { type: 'number', title: 'Lines of Code' },
                    has_tests: { type: 'boolean', title: 'Has Tests' }
                }
            };
        }
        return null;
    },
    getTinyChatOverviewPurpose: async (ids) => { /* ... mock implementation ... */ return {}; },
    getGitBlobChatMessagesByChatIds: async (ids, workingDir) => { /* ... mock implementation ... */ return {}; },
    getChatOverviewMessagesByChatIds: async (ids, option) => { /* ... mock implementation ... */ return {}; },
    createAskAIChat: async (content) => ({ chatId: 'new-chat-123', title: 'AI Chat' }),
};

const mockState = {
    getSelectedNodes: () => [],
    selectionOptions: { selectedOption: 'imported' },
    findNodeById: (id) => ({ id, name: `file-${id}.js`, type: 'git-blob', repo: { fullName: 'user/repo' }, path: `src/file-${id}.js`, language: 'javascript', tokenCount: 100, size: 1024 }),
    // ... other state methods
};

const mockSaveCurrentSelection = (name, items, forceNew) => {
    console.log(`Saving selection: ${name}`, items);
    return { success: true };
};

const containerElement = document.createElement('div');
document.body.appendChild(containerElement); // Append to body for visibility

const contextBuilderModal = createContextBuilderModal({
    state: mockState,
    chatApi: mockChatApi,
    saveCurrentSelection: mockSaveCurrentSelection,
    batchChatsSize: 50,
});

// Example items (these would typically come from a TreeTable selection)
const exampleItems = [
    { id: 'file-1', name: 'main.js', type: 'git-blob', repo: { fullName: 'user/repo' }, path: 'src/main.js', language: 'javascript', tokenCount: 100, size: 1024 },
    { id: 'file-2', name: 'utils.py', type: 'git-blob', repo: { fullName: 'user/repo' }, path: 'src/utils.py', language: 'python', tokenCount: 150, size: 2048 },
    { id: 'file-3', name: 'test.js', type: 'git-blob', repo: { fullName: 'user/repo' }, path: 'tests/test.js', language: 'javascript', tokenCount: 80, size: 512 },
];

// --- Scenario 1: Show modal with programmatic insights ---
// This will open the Context Builder Modal, load the items,
// then automatically select the 'code_analyzer' and open the
// Metadata Insights Modal for 'language' and 'author' fields.
contextBuilderModal.show(
    exampleItems,
    'file content',
    'imported',
    'review',
    {
        initialAnalyzerId: 'code_analyzer',
        initialInsightsFields: ['language', 'author'],
        onAskAICreateChat: (newChat) => {
            console.log('Ask AI chat created:', newChat);
            // You might navigate to the new chat here
        }
    }
);

// --- Scenario 2: Show modal normally (user interacts with filters) ---
// (Uncomment to test this scenario after Scenario 1 is done or in a separate run)
/*
setTimeout(() => {
    contextBuilderModal.hide(); // Hide previous modal instance
    contextBuilderModal.show(
        exampleItems,
        'file content',
        'imported',
        'review',
        {
            onAskAICreateChat: (newChat) => {
                console.log('Ask AI chat created:', newChat);
            }
        }
    );
}, 5000); // Show after 5 seconds
*/
```

## Dependencies

*   `@gitsense/gsc-utils`: For utility functions like `ContextUtils.formatContextContent`, `MessageUtils`.
*   `highlight.js`: For syntax highlighting in expanded content views.
*   `dayjs`: For date formatting.
*   `markdown-it`: Markdown renderer.
*   `Dropdown` (custom component): Used for analyzer selection in `MetadataFilter`.
*   `MetadataSearch.js` (internal utility): For batched metadata insights queries.
*   `FilterTable.js` (internal utility): Re-usable table for filter sections.

## LLM Guidance

When processing this documentation, pay close attention to:
*   **JSDoc annotations:** They provide explicit type information for parameters and return values.
*   **Code examples:** They illustrate how to use the public API.
*   **"New Feature" sections:** These highlight recent additions and their specific usage.
*   **Component breakdown:** Understand the responsibility of each `.js` file to correctly identify where changes or information should be located.
*   **Callbacks:** Note the various `on...` callbacks, as these represent points of interaction with parent components.
*   **State management:** Recognize how `FilterState` and `MetadataFilterState` centralize filter criteria.
