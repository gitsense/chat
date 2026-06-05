<!--
Component: Context Builder Metadata Filter README
Block-UUID: bc345d18-0010-40ab-9bf8-3228e053b1d4
Parent-UUID: 8a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4e
Version: 1.0.0
Description: Documentation for the refactored Metadata Filter component structure.
Language: Markdown
Created-at: 2025-07-14T18:14:00.911Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0)
-->

# Metadata Filter Component (Refactored)

This directory contains the refactored implementation of the Metadata Filter UI component for the Context Builder Modal. The original monolithic `MetadataFilter.js` file has been broken down into smaller, more manageable modules to improve code organization, maintainability, and understandability, particularly for processing by Large Language Models (LLMs).

The component follows a modular architecture with clear separation of concerns.

## Structure

```
MetadataFilter/
├── index.js              # Main entry point and orchestrator
├── MetadataFilterUI.js   # Handles DOM manipulation and rendering
├── MetadataFilterEvents.js # Manages event listeners and handlers
├── MetadataFilterState.js # Manages the internal logical state
├── MetadataFilterApi.js  # Encapsulates API interactions
├── MetadataFilterConfig.js # Centralized configuration values
├── MetadataFilterTypes.js # JSDoc type definitions
└── README.md             # This documentation file
```

## Module Descriptions

*   **`index.js`**:
*   This is the public interface of the Metadata Filter component.
*   It is responsible for instantiating the other modules and wiring up their dependencies and callbacks.
*   It exposes the public methods (`initializeAnalyzerDropdown`, `setSearchInProgress`, `showSearchMessage`, `hideSearchMessage`, `getState`, `applyState`, `reset`, `setDisabled`) that are used by external components (like `FilterManager`).
*   These public methods delegate the actual work to the appropriate internal modules.
*   It also contains the `handleApplySearchClick` method, which coordinates building the search query from the state and triggering the external `onSearchTrigger` callback.

*   **`MetadataFilterUI.js`**:
*   Manages all interactions with the Document Object Model (DOM).
*   Responsible for rendering the initial structure, adding/removing rule rows, populating dropdowns, updating input fields based on type/operator, managing the visibility and state of buttons (Apply, Reset), and displaying messages (errors, info).
*   It reads the current state from the DOM elements when requested (e.g., by `MetadataFilterState.buildFilterState`).
*   It depends on `MetadataFilterState` to get the current analyzer schema and `MetadataFilterConfig` for configuration values.

*   **`MetadataFilterEvents.js`**:
*   Manages all event listeners for the UI elements (clicks, changes, inputs).
*   Event handlers delegate actions to the `UI`, `State`, and `API` modules as needed.
*   It uses a structured approach (`_ruleEventListeners` map) to add and remove listeners dynamically as rule rows are added or removed, preventing memory leaks.
*   It calls external callbacks (`onApplySearchClick`, `onFilterChange`, `resetCallback`) provided by `index.js` to trigger actions outside the component's internal modules.

*   **`MetadataFilterState.js`**:
*   Manages the internal logical state of the filter.
*   Holds the selected analyzer ID, the current analyzer schema, and the list of active filter rules.
*   It depends on `MetadataFilterApi` to fetch the analyzer schema when the selected analyzer changes.
*   It contains the logic to build the filter state object by reading values from the UI elements (via `buildFilterState`).
*   It can apply a given state object to its internal properties (used when loading saved states).

*   **`MetadataFilterApi.js`**:
*   Encapsulates all interactions with the external `chatApi`.
*   Provides methods for fetching the list of available analyzers, fetching the schema for a specific analyzer, and fetching distinct metadata values for a field.
*   Includes internal caching for analyzers and schemas to avoid unnecessary API calls.

*   **`MetadataFilterConfig.js`**:
*   Centralizes configuration values used throughout the component, such as thresholds for backend query filters, default dropdown options, and mappings of data types to available operators.

*   **`MetadataFilterTypes.js`**:
*   Contains JSDoc `@typedef` definitions for the main data structures used within the component, such as `Rule` and `FilterState`. This improves code clarity and provides type information for development tools and LLMs.

## Usage

The component is instantiated in the same way as the original `MetadataFilter` class. The external code should `require` the `MetadataFilter` directory, which will load the `index.js` file.

```javascript
// Example usage in ContextBuilderModal.js or similar
const { MetadataFilter } = require('./types/metadata/MetadataFilter');

// ... inside a class or function where the filter is initialized
this.metadataFilter = new MetadataFilter({
container: this.uiElements.metadataFilterContainer, // The DOM element for the filter
chatApi: this.chatApi, // The API instance
contextBuilderTable: this.contextBuilderTable, // Reference to the table for allItems
onSearchTrigger: this.handleMetadataSearchTrigger.bind(this), // Callback to trigger backend search
onFilterChange: this.handleMetadataFilterChange.bind(this), // Callback for filter state changes
});

// Initialize the analyzer dropdown
this.metadataFilter.initializeAnalyzerDropdown();

// Apply a saved state (example)
// this.metadataFilter.applyState(savedFilterState);
```

## Extending and Maintaining

This modular structure makes it easier to:

*   **Add new features:** Identify which module is responsible for the feature's concern (UI, events, state, API) and add/modify code within that specific module.
*   **Debug:** Pinpoint issues to a specific module based on the type of problem (e.g., UI not rendering correctly -> `MetadataFilterUI.js`, event not firing -> `MetadataFilterEvents.js`, state not updating -> `MetadataFilterState.js`).
*   **Understand:** Each file is smaller and focuses on a single responsibility, making the codebase easier to read and comprehend.
