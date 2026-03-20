<!--
Component: ConversationView Documentation
Block-UUID: 58482478-1589-4e1e-b576-a3a738835c00
Parent-UUID: N/A
Version: 1.0.0
Description: Documentation for the ConversationView component used in GitSense Chat
Language: Markdown
Created-at: 2025-10-22T14:31:23.486Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# Component: ConversationView

## Overview

The `ConversationView` component is responsible for rendering and managing chat conversations in the GitSense Chat application. It provides a complete chat interface including message display, user input, and various chat management features.

## Key Features

- **Message Rendering**: Displays chat messages with proper formatting and syntax highlighting
- **Streaming Support**: Handles real-time message streaming from AI models
- **Code Block Management**: Integrates with CodeBlockService for code handling
- **Navigation Controls**: Provides scroll-to-top/bottom and message folding capabilities
- **Chat Input**: Integrated chat input with model selection and file attachment support
- **State Management**: Tracks message states and user interactions

## Usage

### Basic Instantiation

```javascript
const conversationView = new ConversationView(
    widget,           // Parent widget reference
    settings,         // Application settings object
    chat,             // Chat data object
    mainModel,        // Currently selected AI model
    updateChat,       // Function to refresh chat data
    options,          // Configuration options
    events            // Event callback handlers
);
```

### Required Parameters

- **widget**: Reference to the parent application widget
- **settings**: Application configuration including models and prompts
- **chat**: The chat data structure containing messages
- **mainModel**: The primary AI model for this conversation
- **updateChat**: Callback function to refresh chat display

### Key Methods

- `render(element)`: Renders the conversation into the specified DOM element
- `update(chatData)`: Updates the conversation with new chat data
- `cleanup()`: Cleans up resources and event listeners
- `scrollToBottom()`: Scrolls to the bottom of the conversation
- `scrollToMessage(id)`: Scrolls to a specific message

### Configuration Options

The component accepts various options for customization:

- **showControlPanel**: Display navigation controls (default: true)
- **showChat**: Enable chat input functionality (default: true)
- **scrollThreshold**: Pixel threshold for scroll detection (default: 30)
- **scrollDebounceTime**: Debounce time for scroll events (default: 20ms)

### Event Handling

The component supports event callbacks:
- **onStreamMessageComplete**: Called when a streaming message completes
- **onStopStreaming**: Handler for stop streaming requests
- **onContinueCodeBlock**: For continuing truncated code blocks
- **onRegeneratePatch**: For retrying failed patch generation

This component serves as the core interface for user-AI interactions in GitSense Chat.

Authored by LLM Qwen 3 Coder 480B - Cerebras at Wed, 22 Oct 2025 14:30:38 GMT
