<!--
Component: MessageHistory
Block-UUID: 47c6eff3-964d-42a3-bd29-09fe603fc6e6
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the MessageHistory component, a comprehensive solution for saving, managing, and retrieving chat messages.
Language: markdown
Created-at: 2026-01-15T04:42:15.456Z
Authors: GLM-4.6 (v1.0.0)
-->


# MessageHistory Component

The MessageHistory component provides a comprehensive solution for saving, managing, and retrieving chat messages. It allows users to save drafts, pin frequently used messages as templates, and access a history of recently sent messages.

## Features

- **Auto-save drafts** with configurable frequency and debouncing
- **One draft per chat** rule to prevent clutter
- **Message templates** with pinning functionality
- **Search functionality** across content, descriptions, tags, and chat names
- **Tabbed interface** for Drafts, Pinned, and Latest messages
- **Split button actions** for replacing or adding to current input
- **Responsive design** with mobile support
- **Storage quota handling** with graceful error recovery

## Installation

```javascript
const { MessageHistory } = require('./message-history');

```

## Usage

### Basic Usage

```javascript
// Create a new instance
const messageHistory = new MessageHistory({
    chatInput: document.getElementById('chat-input'),
    chat: {
        uuid: '758b6505-34a5-48d8-9e15-4f74443f5f48',
        name: 'Simple Math Question',
        main_model: 'GLM-4.6'
        // ... other chat properties
    },
    saveFrequency: 5000, // 5 seconds
    maxLatestMessages: 10,
    onMessageUpdate: (message, action) => {
        console.log(`Message ${action}d:`, message);
    }
});

// Initialize the component
messageHistory.init();

// Show the history modal
messageHistory.showHistory();
```

### Static Methods (No Initialization Required)

```javascript
// Get a draft for a specific chat
const draft = MessageHistory.getDraft('chat-uuid', {
    storageKey: 'custom-storage-key'
});

// Save a message without UI
const savedMessage = MessageHistory.saveMessage({
    content: 'This is a message',
    status: 'sent',
    chatUuid: 'chat-uuid',
    description: 'Important message',
    tags: ['important', 'reference']
});

// Delete a specific message
const deleted = MessageHistory.deleteMessage('message-id');

// Delete a draft for a specific chat
const draftDeleted = MessageHistory.deleteDraft('chat-uuid');

// Clear messages by status
const cleared = MessageHistory.clearHistory('drafts');
```

### Integration with ChatInput

```javascript
// In your ChatInput component initialization
const chatInput = document.getElementById('chat-input');
const chat = getCurrentChat(); // Your method to get current chat

// Create MessageHistory instance
const messageHistory = new MessageHistory({
    chatInput,
    chat,
    onMessageUpdate: (message, action) => {
        // Handle message updates
        if (action === 'replace') {
            chatInput.value = message.content;
        } else if (action === 'add') {
            chatInput.value += '\n\n' + message.content;
        }
    }
});

// Initialize
messageHistory.init();

// Recover draft on page load
const draft = MessageHistory.getDraft(chat.uuid);
if (draft) {
    chatInput.value = draft.content;
}

// Clean up draft when message is sent
function sendMessage() {
    // ... your send logic
    
    // Delete the draft after sending
    MessageHistory.deleteDraft(chat.uuid);
    
    // Save the sent message to history
    MessageHistory.saveMessage({
        content: chatInput.value,
        status: 'sent',
        chatUuid: chat.uuid
    });
}

// Clean up when ChatInput is destroyed
function destroyChatInput() {
    messageHistory.destroy();
}
```

## API

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chatInput` | HTMLElement | Required | The chat input element |
| `chat` | Object | Required | The chat object with uuid, name, and main_model |
| `saveFrequency` | Number | 5000 | Auto-save frequency in milliseconds |
| `maxLatestMessages` | Number | 10 | Maximum number of latest messages to keep |
| `storageKey` | String | 'gsc-message-history' | Storage key for localStorage |
| `onMessageUpdate` | Function | () => {} | Callback for message updates |

### Instance Methods

- `init()` - Initialize the component with event listeners
- `showHistory()` - Display the history modal
- `updateCurrentMessage(message, action)` - Update the chat input with a message
- `startAutoSave(chatInput, chat)` - Begin auto-saving with new input/chat
- `destroy()` - Clean up event listeners and remove DOM elements
- `reset()` - Clear all history data and reset to initial state

### Static Methods

- `MessageHistory.getDraft(chatUuid, options)` - Recover draft after page refresh
- `MessageHistory.saveMessage(message, options)` - Save without UI
- `MessageHistory.deleteMessage(messageId, options)` - Delete specific message
- `MessageHistory.deleteDraft(chatUuid, options)` - Delete draft for specific chat
- `MessageHistory.clearHistory(status, options)` - Clear messages by status

## Message Data Structure

```javascript
{
    id: "unique-message-id",           // UUID v4
    status: "draft|sent|pinned",       // Message status
    content: "message content",        // Full message content
    truncated: "first 100 chars...",   // Truncated preview
    length: 245,                       // Content length
    description: "user-provided description", // Optional description
    tags: ["tag1", "tag2"],            // Optional tags
    createdAt: "timestamp",            // Creation timestamp
    sentAt: "timestamp",               // Send timestamp (for sent messages)
    lastSavedAt: "timestamp",          // Last save timestamp (for drafts)
    chatUuid: "current-chat-uuid"      // Associated chat UUID
}
```

## Storage Options

```javascript
{
    storageKey: 'custom-storage-key'   // Custom storage key
}
```

## Auto-Save Implementation

The component implements intelligent auto-saving with:

- **Debounced saving** (1 second default) to avoid excessive writes
- **Content comparison** to prevent unnecessary saves
- **Configurable frequency** (5 seconds default)
- **Error handling** for storage quota exceeded scenarios

## UI Components

The MessageHistory component leverages these existing UI components:

- **PromptBox** - For the modal display
- **Tabs** - For navigation between Drafts/Pinned/Latest
- **SearchInput** - For filtering messages
- **MenuButton** - For the split button actions

## Styling

The component includes its own styles that can be customized:

```css
/* Override modal width */
.gsc-message-history-modal .gsc-prompt-content {
    width: 95%;
}

/* Customize card appearance */
.gsc-message-history-card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## Error Handling

The component handles various error scenarios:

- **Storage quota exceeded** - Graceful error message and fallback behavior
- **Storage access denied** - User notification for browser settings
- **Corrupted data** - Automatic reset with user notification
- **Invalid parameters** - Clear error messages for developers

## Browser Compatibility

The MessageHistory component supports all modern browsers that support:

- ES6 classes and modules
- localStorage API
- CSS Grid and Flexbox
- DOM manipulation APIs

## Performance Considerations

- **Lazy loading** of message content
- **Debounced search** to prevent excessive filtering
- **Efficient storage operations** with minimal reads/writes
- **Memory cleanup** when component is destroyed

## Security

- **Content sanitization** when displaying message previews
- **XSS prevention** in message content rendering
- **Secure storage** with no sensitive data in localStorage

## Examples

### Custom Storage Key

```javascript
const messageHistory = new MessageHistory({
    chatInput,
    chat,
    storageKey: 'my-app-message-history'
});
```

### Custom Auto-Save Frequency

```javascript
const messageHistory = new MessageHistory({
    chatInput,
    chat,
    saveFrequency: 10000 // 10 seconds
});
```

### Handling Message Actions

```javascript
const messageHistory = new MessageHistory({
    chatInput,
    chat,
    onMessageUpdate: (message, action) => {
        switch (action) {
            case 'replace':
                // Replace current input
                chatInput.value = message.content;
                break;
            case 'add':
                // Add to current input
                chatInput.value += '\n\n' + message.content;
                break;
        }
        
        // Focus the input after update
        chatInput.focus();
    }
});
```

### Integration with Menu Bar

```javascript
// Add History option to existing menu bar
const historyMenuItem = document.createElement('div');
historyMenuItem.className = 'menu-item';
historyMenuItem.innerHTML = `
    <svg>...</svg>
    <span>History</span>
`;
historyMenuItem.addEventListener('click', () => {
    messageHistory.showHistory();
});

menuBar.appendChild(historyMenuItem);
```

## Troubleshooting

### Draft Not Saving

1. Check that the chat object has a valid UUID
2. Verify the chat input element is valid
3. Check browser console for storage errors
4. Ensure the component has been initialized

### Modal Not Showing

1. Verify the PromptBox component is properly imported
2. Check that styles have been injected
3. Ensure the modal container exists in the DOM

### Search Not Working

1. Verify the SearchInput component is properly imported
2. Check that messages are loaded in the current tab
3. Ensure search terms are not empty

## File Structure

```
message-history/
├── index.js                 // Entry point, exports MessageHistory
├── MessageHistory.js        // Main controller
├── storage.js               // Storage operations
├── ui/
│   └── Card.js              // Message card component
├── styles.js                // CSS for cards and modal content
├── constants.js             // Configuration constants
└── README.md                // This file
```
