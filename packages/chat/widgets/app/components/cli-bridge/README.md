<!--
Component: CLI Bridge Documentation
Block-UUID: 46b1a182-71a1-4073-937b-aca2c659ebab
Parent-UUID: N/A
Version: 1.2.0
Description: Documentation for the CLI Bridge integration, including the handshake schema, lifecycle, and the new max output size negotiation flow.
Language: Markdown
Created-at: 2026-02-08T01:55:00.000Z
Authors: Gemini 3 Flash (v1.2.0)
-->


# GitSense Chat CLI Bridge

The **CLI Bridge** component enables seamless integration between the GitSense Chat web application and the `gsc` command-line tool. It allows users to generate temporary, 6-digit codes that bridge CLI output directly into their active chat conversations without manual copy-pasting.

## Features

- **Zero-friction CLI-to-Chat workflow**: Run `gsc grep "pattern" --code 123456` and results appear automatically in chat.
- **Ephemeral, secure codes**: 6-digit codes expire after a configurable timeout (default 2 minutes).
- **Smart Recovery**: Codes persist across page reloads via `localStorage`. The system validates that the conversation context (last message ID) hasn't changed before allowing recovery, ensuring the CLI output replies to the correct message.
- **Output Size Protection**: Users can configure a maximum output size limit (default 1MB). If the CLI output exceeds this limit, the system enters a negotiation flow where the user must explicitly confirm in the Web UI before the data is inserted into the chat, preventing performance issues.
- **Safe Closure**: Prevents accidental loss of active codes by requiring confirmation before closing the modal.
- **Lazy cleanup**: Automatically cleans up expired and completed codes on modal open.
- **Dual-state UI**: Handles both "New Code" generation and "Recovered Code" scenarios seamlessly.

## Architecture

The component is split into Frontend (UI/State) and Backend (Filesystem) logic.

### Frontend
- **`CLIBridgeManager`**: The main orchestrator that manages the `PromptBox` modal lifecycle, coordinates between views, and handles polling.
- **Views**:
    - `SetupView`: Allows users to configure timeout, max output size, and generate a new code.
    - `ActiveView`: Displays the active code, handles copy-to-clipboard, and shows the countdown timer.
- **Services**:
    - `PollingService`: Polls the backend every 1.5 seconds to check the status of the code file.
    - `StateManager`: Manages `localStorage` persistence for recovery across reloads.

### Backend
- **`GSCCodeService`**: A Node.js service responsible for:
    - Resolving `GSC_HOME`.
    - Creating `<code>.json` files in `${GSC_HOME}/data/codes/`.
    - Handling code collisions (10 retries).
    - Reading status for the polling service.
    - Performing "Lazy Cleanup" of expired codes.

## Usage

### Initialization

```javascript
const { CLIBridgeManager } = require('@gitsense/gsc-cli-bridge');

// Context is typically provided by the GitSense Chat rendering engine
const context = { 
    widget, 
    chat: {
        id: 'numberic chat id',
        uuid: 'unique chat id',
        ...
    }
};

const manager = new CLIBridgeManager(context);

// Open the modal
await manager.open();
```

### User Workflow

1.  User clicks "GSC CLI Code" button in the UI.
2.  `manager.open()` is called.
3.  **Setup View** appears. User sets timeout, max size, and clicks "Generate Code".
4.  **Active View** appears showing the 6-digit code (e.g., `847291`).
5.  User runs CLI command: `gsc grep TODO --code 847291`.
6.  `PollingService` detects the status change in the backend JSON file.
7.  **If output is small:** Modal closes automatically when the CLI finishes. Results appear in the chat.
8.  **If output is oversized:** Modal updates to show a confirmation dialog. User clicks "Yes" to proceed or "No" to cancel.
9.  CLI resumes (inserts data or aborts) and modal closes.

## API Reference

### `CLIBridgeManager`

#### Constructor
```javascript
new CLIBridgeManager(context, options)
```
- `context` (Object): The rendering context containing `widget`, `chat`, etc.
- `options` (Object): Configuration options (currently reserved for future use).

#### Methods

##### `async open()`
Initializes the manager, performs lazy cleanup, and opens the modal.

##### `close()`
Closes the modal, stops polling, and cleans up resources.

##### `handleGenerateCode(timeoutMinutes, maxOutputSizeMB)`
Called by `SetupView` to generate a new code.
- `timeoutMinutes` (Number): Duration in minutes.
- `maxOutputSizeMB` (Number): Maximum output size in Megabytes.

##### `handleCancelCode(code)`
Called by `ActiveView` to delete an active code.
- `code` (String): The 6-digit code.

## Backend Requirements

The `CLIBridgeManager` relies on the `chatApi` object to communicate with the server. The following methods must be implemented in your application's API layer:

### `chatApi.createGSCCode(widget, options)`
Creates a new code file on the server.
- **Options:**
    - `chatId` (Number): The ID of the chat.
    - `timeoutMinutes` (Number): The duration in minutes.
    - `parentMessageId` (Number): The ID of the last message in the chat.
    - `maxOutputSizeMB` (Float): The maximum output size in Megabytes.
- **Returns:** `{ success: boolean, code: string, codeData: object, error: string }`

### `chatApi.getGSCCodeStatus(widget, code)`
Checks the status of a specific code.
- **Returns:** `{ success: boolean, data: object, error: string }`

### `chatApi.deleteGSCCode(widget, code)`
Deletes a specific code file.
- **Returns:** `{ success: boolean, error: string }`

### `chatApi.cliBridgeCleanup(widget)`
Performs lazy cleanup of expired codes on the server.
- **Returns:** `{ success: boolean, error: string }`

## Code File Schema

The backend creates a JSON file at `${GSC_HOME}/data/codes/<code>.json`:

```json
{
  "code": "123456",
  "chatId": "numeric-id-of-the-chat",
  "dbPath": "/absolute/path/to/chats.sqlite3",
  "gscHome": "/absolute/path/to/gsc_home",
  "expiresAt": 1738867200000,
  "createdAt": 1738867080000,
  "defaultVisibility": "public",
  "generatedBy": "web-ui",
  "consumer": "gsc",
  "status": "pending",
  "command": null,
  "startedAt": null,
  "finishedAt": null,
  "error": null,
  "result": { "messageId": null, "output": null },
  "parentMessageId": "numeric-id-of-the-last-message",
  "maxOutputSize": 1048576
}
```

### Schema Fields

- **`parentMessageId`**: The ID of the last message in the chat at the time of code generation. The CLI uses this to insert the output as a reply to the correct message, ensuring conversational context is maintained.
- **`maxOutputSize`**: The maximum allowed size of the CLI output in bytes. If the output exceeds this size, the CLI will set the status to `oversized` and wait for user confirmation before inserting the message.

## Lifecycle & Status Types

The `status` field in the JSON file drives the interaction between the CLI and the Web UI.

1.  **`pending`**: Initial state. Code is generated and waiting for the CLI to run.
2.  **`running`**: CLI has started execution. The JSON file is updated with `startedAt` and the `command` string.
3.  **`oversized`**: (New) CLI has finished execution, but the output size exceeds `maxOutputSize`. The CLI waits for the Web UI to confirm.
    - **Web UI Action**: Displays a confirmation dialog. If user confirms, UI updates status to `running` (or a new `confirmed` status) to signal the CLI to proceed. If user cancels, UI updates status to `error`.
4.  **`success`**: CLI finished successfully and inserted the message into the database. The JSON file contains the `messageId` and `output`.
5.  **`error`**: CLI failed or was cancelled. The JSON file contains error details.
6.  **`expired`**: Code has passed its expiration time.

## Dependencies

- `@gitsense/gsc-utils`: For `DomUtils` and `PromptBox`.
- `../../chat`: The main chat API (assumed to be available in the parent application).

## License

This component is part of GitSense Chat and is subject to the same license terms.
