<!--
Component: Message Drafter
Block-UUID: 290b918a-db96-40db-b96e-143ca8a2b2e3
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the Message Drafter component.
Language: markdown
Created-at: 2026-01-09T23:24:27.079Z
Authors: GLM-4.6 (v1.0.0)
-->


# Message Drafter Component

This directory contains the source code for the Message Drafter component, which provides users with an ergonomic way to draft chat messages before sending them.

## Purpose

The Message Drafter component allows users to:
- Compose messages in a dedicated editor with markdown support
- Preview messages with rendered markdown
- Choose whether to send the message as a user or assistant message
- Auto-save drafts to prevent data loss
- Persist state across page reloads

## Usage

The Message Drafter is typically used through the GitSense Chat Tool system. Users can start a new message drafter by sending a message with the following tool block:

```markdown
\```txt
# GitSense Chat Tool

{
    "tool": "message-drafter",
    "config": {}
}

\```
```

## Component Structure

```
message-drafter/
├── index.js                           # Entry point that exports the main MessageDrafter class
├── MessageDrafter.js                  # Main component class with UI rendering and state management
├── StateManager.js                    # Handles state persistence
├── constants.js                       # Configuration constants, default values, messages
├── styles.js                          # CSS styles as a JavaScript string
├── components/
│   ├── EditorPanel.js                 # The textarea editor with resize functionality
│   ├── PreviewPanel.js                # Renders the markdown preview
│   └── StatusBar.js                   # Displays token count, size, last save time
├── utils/
│   ├── TokenCounter.js                # Estimates token count for the message content
│   └── AutoSave.js                    # Handles auto-save logic with debouncing and timing
└── README.md                          # This file
```

## API

### MessageDrafter Class

#### Constructor

```javascript
new MessageDrafter(containerElement, message, context)
```

Creates a new instance of the MessageDrafter component.

*   `containerElement` (`HTMLElement`): The DOM element where the component will be rendered. **Required.**
*   `message` (`Object`): The message object containing the content and tool block. **Required.**
*   `context` (`Object`): The rendering context (chat, widget API, etc.). **Required.**

#### Methods

*   `initialize()`: Initializes the component and renders the UI.
*   `cleanup()`: Cleans up resources when the component is no longer needed.

### StateManager Class

#### Static Methods

*   `save(message, context, state, saveToServer)`: Saves the component state to the tool block.
*   `restore(message, context)`: Restores the component state from the tool block.
*   `updateMessageContent(message, context, content)`: Updates only the message content.
*   `updateUIState(message, context, uiState)`: Updates only the UI state.
*   `updateLastSaveTime(message, context, saveTime)`: Updates the last save time.

### Component Classes

#### EditorPanel

*   `getContent()`: Gets the current content of the editor.
*   `setContent(content)`: Sets the content of the editor.
*   `getHeight()`: Gets the current height of the textarea.
*   `setHeight(height)`: Sets the height of the textarea.
*   `onContentChange(callback)`: Sets a callback for content changes.
*   `onHeightChange(callback)`: Sets a callback for height changes.

#### PreviewPanel

*   `getContent()`: Gets the current content of the preview.
*   `setContent(content)`: Sets the content of the preview.
*   `getHeight()`: Gets the current height of the preview.
*   `setHeight(height)`: Sets the height of the preview.

#### StatusBar

*   `updateContent(content)`: Updates the status bar with new content.
*   `updateLastSaveTime(saveTime)`: Updates the last save time.
*   `setSavingState(isSaving)`: Sets the saving state.
*   `onSubmit(callback)`: Sets a callback for the submit button.

## Configuration

The Message Drafter component can be configured through the tool block's config property:

```javascript
{
    "tool": "message-drafter",
    "config": {
        "message": {
            "role": "user|assistant",  // The role of the message
            "content": "markdown content"  // The actual message content
        },
        "ui": {
            "mode": "edit|preview",  // Current view mode
            "textareaHeight": 200,  // Height of textarea in pixels
            "lastSaveTime": "2026-01-09T23:24:27.079Z",  // ISO timestamp
            "autoSaveEnabled": true  // Whether auto-save is enabled
        }
    }
}
```

## Implementation Details

*   **State Persistence**: The component uses the StateManager to persist state in the tool block's config property.
*   **Auto-Save**: The AutoSave utility handles debounced saving of content to prevent excessive server requests.
*   **Markdown Preview**: The PreviewPanel component provides a simple markdown-to-HTML conversion for previewing messages.
*   **Responsive Design**: The component uses flexbox for responsive layout and adapts to different screen sizes.
*   **Token Estimation**: The TokenCounter utility provides an estimate of token count for the message content.

## Dependencies

The Message Drafter component depends on:
- `@gitsense/gsc-utils` - Utility functions for DOM manipulation and tool block handling
- `@gitsense/gsc-ui/toggle` - Toggle component for switching between edit/preview modes
- `@gitsense/gsc-ui/confirmation-box` - Confirmation dialog for message submission

## Integration

To integrate the Message Drafter component into GitSense Chat:

1. Add the MESSAGE_DRAFTER_TOOL constant to the GSToolHandlers constants.js file
2. Add the handleMessageDrafterTool function to the GSToolHandlers directory
3. Update the gitsenseChatToolHandler.js to recognize and handle the message-drafter tool
4. Import and use the MessageDrafter component in the tool handler

## Files in this Directory

*   `index.js`: Entry point for the component, exports the MessageDrafter class.
*   `MessageDrafter.js`: Contains the main MessageDrafter class logic.
*   `StateManager.js`: Handles state persistence for the component.
*   `constants.js`: Defines constants, default values, and UI text.
*   `styles.js`: Contains the component's CSS as a JavaScript string.
*   `components/`: Directory containing child components.
    *   `EditorPanel.js`: The textarea editor component.
    *   `PreviewPanel.js`: The markdown preview component.
    *   `StatusBar.js`: The status bar component.
*   `utils/`: Directory containing utility functions.
    *   `TokenCounter.js`: Utility for estimating token count.
    *   `AutoSave.js`: Utility for handling auto-save logic.
*   `README.md`: This file.
