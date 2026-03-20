# GitSense Chat Contract Component

The `gsc-contract` component enables users to save AI-generated content (code and text) from the GitSense Chat interface directly to their local filesystem. It provides a secure, traceable workflow using a handshake mechanism with the `gsc` CLI tool.

## Features

*   **Secure Handshake:** Uses a UUID-based contract to authorize file writes.
*   **Auto-Detection:** Automatically determines if a code block is an **Update** (modifying existing file) or **New File** based on `Parent-UUID` metadata.
*   **Message Workspaces:** Allows users to initialize a shadow workspace for any message, enabling local review and editing of code, commit messages, or other text content.
*   **Visual Feedback:**
    *   **Status Widget:** A "Pill" style indicator showing contract state (Active, Expiring, Expired) and countdown timer.
    *   **Save Modal:** A responsive modal for reviewing changes (diffs) or setting file paths.
*   **Pre-flight Validation:** Runs `gsc contract test` before saving to validate UUIDs, check for collisions, and generate diffs.
*   **Traceability:** Links saved files back to specific chat messages via `message-id`.

## Installation

```bash
npm install @gitsense/gsc-contract
```

**System Dependency:**
This component requires the `gsc` CLI tool to be installed and available in the system's `PATH`.

## Quick Start

```javascript
// Caller is assummed to be in the GitSense Chat components directory
const { ContractManager } = require('../contract');

// 1. Initialize the manager with the chat context
const context = { 
    chat: currentChatObject, 
    widget: widgetApi 
};

const manager = new ContractManager(context);

// 2. Initialize (Scans chat for contract message)
await manager.initialize();

// 3. Render the status widget in your UI
const widgetContainer = document.getElementById('contract-widget-container');
manager.renderStatusWidget(widgetContainer);

// 4. Render the Message Workspace for a specific message
const messageContainer = document.getElementById('message-content-container');
await manager.renderMessageWorkspace(currentMessage, messageContainer, context);

// 5. Open the Save Modal (e.g., when a "Save" button is clicked)
saveButton.onclick = () => {
    manager.openSaveModal({
        rawCodeContent: codeBlockContent, // The full code including header
        suggestedPath: 'src/utils/newHelper.js', // Optional: for new files
        messageId: message.id // The ID of the chat message
    });
};
```

## Architecture

The component is split into Frontend (UI/State) and Backend (CLI Bridge) logic.

```
gsc-contract/
├── backend/
│   ├── ContractService.js      # Executes gsc CLI commands
│   └── index.js
├── components/
│   ├── ContractSaveModal.js    # The save dialog
│   ├── ContractStatusWidget.js # The status pill
│   └── MessageWorkspace.js     # The message workspace UI
├── utils/
│   └── TimerService.js         # Countdown timer logic
├── constants.js                # Error codes & UI text
├── styles.js                   # CSS-in-JS styles
├── ContractManager.js          # Main orchestrator
└── index.js
```

## API Reference

### `ContractManager`

The main entry point for the component.

#### Constructor
```javascript
new ContractManager(context)
```
*   `context` (Object): The rendering context.
    *   `chat` (Object): The current chat object.
    *   `widget` (Object): The widget API instance.

#### Methods

##### `async initialize()`
Scans the chat history for a `gsc-cli-contract` message and extracts the contract UUID and expiration time.
*   **Returns:** `Promise<boolean>` - True if a valid contract is found.

##### `isActive()`
Checks if the contract is currently valid (not expired).
*   **Returns:** `boolean`

##### `getExpiresAt()`
Gets the expiration timestamp of the contract.
*   **Returns:** `string | null` - ISO timestamp or null.

##### `getContractUUID()`
Gets the UUID of the active contract.
*   **Returns:** `string | null`

##### `renderStatusWidget(container)`
Renders the status pill widget into the specified DOM element.
*   `container` (HTMLElement): The DOM element to render into.

##### `async renderMessageWorkspace(message, container, context)`
Renders the Message Workspace UI for a specific message, allowing users to initialize a shadow workspace for local review and editing.
*   `message` (Object): The message object.
*   `container` (HTMLElement): The DOM element to render into.
*   `context` (Object): The rendering context.

##### `openSaveModal(options)`
Opens the save modal to perform a file update or creation.
*   `options` (Object):
    *   `rawCodeContent` (string): The full content of the code block (including metadata header).
    *   `suggestedPath` (string, optional): Pre-fills the path input for new files.
    *   `messageId` (number): The ID of the chat message containing the code.

##### `cleanup()`
Stops timers and cleans up DOM elements. Call this when the chat view is destroyed.

## Dependencies

*   **@gitsense/gsc-utils**: Used for code block parsing (`ContractUtil`), DOM manipulation (`DomUtils`), and chat utilities (`ChatUtils`).
*   **gsc (CLI)**: The system command-line tool that performs the actual file operations.

## License

This component is part of GitSense Chat.
