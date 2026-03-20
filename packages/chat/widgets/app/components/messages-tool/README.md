# MessagesTool

A flexible tool for managing chat messages with features for selecting, editing, compacting, replacing, deleting, and exporting messages. The tool provides a full-screen interface with configurable panel positioning and persistent user settings.

## Features

### Message Management
- **Select Messages**: Choose individual messages or ranges using checkboxes or a visual grid
- **Edit Messages**: Inline editing of message content with automatic save
- **Add Messages**: Insert new blank messages at any position in the conversation
- **Delete Messages**: Remove selected messages by creating a new chat without them
- **Replace Messages**: Replace a range of messages with a single user-specified message
- **Compact Messages**: Reduce context size by replacing message ranges with compacted summaries

### Message Display
- **Preview Panel**: View messages with configurable display options
- **Skim View**: Show only leading and trailing lines of long messages
- **Rendered Markdown**: Toggle between raw markdown and rendered HTML view
- **Pagination**: For rendered mode, load messages incrementally for better performance

### Filtering and Search
- **Type Filters**: Filter messages by role (system, user, assistant)
- **Search**: Find messages containing specific text
- **Range Filter**: Show only messages within a specified range
- **Real-time Updates**: Filters apply instantly to both panels

### Export Options
- **Multiple Formats**: Export as JSON, JSONL, or tagged text
- **Content Options**: Full messages or skimmed content
- **Visibility Control**: Export all messages or only public ones
- **Download or Copy**: Save to file or copy to clipboard

### Conversation Analysis
- **Conversation Assistant**: Create an AI assistant to analyze your conversation
- **Topic Identification**: Identify main topics and themes discussed
- **Compaction Suggestions**: Get recommendations for optimal message ranges to compact

### User Experience
- **Persistent Settings**: Your preferences are saved automatically
- **Responsive Layout**: Flexible panel positioning (left/right configuration)
- **Keyboard Shortcuts**: Efficient navigation and interaction
- **Visual Feedback**: Clear indicators for selected, edited, and compacted messages

## Usage

### Basic Usage

```javascript
const { MessagesTool } = require('./messages-tool');

// Create a new MessagesTool instance
const messagesTool = new MessagesTool(messages, context, {
    onClose: () => {
        console.log('MessagesTool closed');
    }
});

// Show the tool
messagesTool.show();
```

### Panel Layout Configuration

The MessagesTool supports flexible panel positioning through the `layout` option:

```javascript
// Default layout: Selection on left, Preview on right
const messagesTool = new MessagesTool(messages, context, {
    layout: {
        leftPanel: 'selection',  // 'preview' or 'selection'
        rightPanel: 'preview'    // 'preview' or 'selection'
    }
});

// Alternative layout: Preview on left, Selection on right
const messagesTool = new MessagesTool(messages, context, {
    layout: {
        leftPanel: 'preview',    // 'preview' or 'selection'
        rightPanel: 'selection'  // 'preview' or 'selection'
    }
});
```

### Message Compaction

The MessagesTool provides a sophisticated message compaction feature:

1. Click the "Compact" button in the action bar
2. In the modal that appears:
   - Use the visual grid to select a message range
   - Choose the relationship between original and compacted chat
   - Select the AI model for compaction
   - Click "Start Compact Chat" to open a guided chat in a new tab
3. In the compact chat:
   - Work with the LLM to create a compacted version
   - The system will automatically detect and import the result
4. Return to the original modal:
   - Review the compacted message
   - Click "Save & Reload" to create the new chat

#### Compaction Rules

- Only continuous message ranges can be compacted
- System messages (message 1) cannot be compacted
- Previously compacted messages cannot be included in new compactions
- The compacted message replaces the selected range in a new chat

#### Chat Relationships

When creating a compacted chat, you can choose how it relates to the original:

- **Sibling**: Creates a new chat at the same level as the original
- **Child**: Makes the compacted chat a child of the original
- **Swap**: Makes the compacted chat the parent of the original

### Message Editing

Edit messages directly in the preview panel:

1. Click the edit icon (pencil) next to any message
2. Modify the content in the textarea
3. Click "Save" to persist changes or "Cancel" to discard

### Message Replacement

Replace a range of messages with a single message:

1. Click the "Replace" button in the action bar
2. Specify the message range to replace
3. Choose the role for the replacement message
4. Enter the replacement content
5. Configure the chat relationship
6. Click "Save & Reload" to create the new chat

### Message Deletion

Delete selected messages by creating a new chat without them:

1. Select messages using the checkboxes in the selection panel
2. Click the "Delete" button in the action bar
3. Configure names for the original and new chats
4. Choose the chat relationship
5. Click "Delete Messages & Reload" to create the new chat

### Conversation Assistant

Create an AI assistant to analyze your conversation:

1. Click the "Assistant" button in the action bar
2. Configure the assistant chat name and model
3. Choose an initial query or create your own
4. Click "Create Assistant Chat" to open in a new tab

### Export Messages

Export messages in various formats:

1. Click the "Export" button in the action bar
2. Configure export options:
   - Scope: All messages or selected messages only
   - Visibility: All messages or public messages only
   - Content: Full messages or skimmed content
   - Format: JSON, JSONL, or tagged text
3. Click "Download" to save as a file or "Copy to Clipboard"

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `messages` | Array | [] | Array of message objects to display |
| `context` | Object | null | Context object containing widget and chat information |
| `title` | String | 'Messages' | Custom title for the tool |
| `showActionBar` | Boolean | true | Control action bar visibility |
| `disabledMessageIds` | Array | [] | Message IDs to disable (non-interactive) |
| `viewMode` | String | 'checkbox' | 'checkbox' or 'checked' display mode |
| `checkedMessageIds` | Array | [] | Message IDs to show as checked (for 'checked' mode) |
| `onClose` | Function | () => {} | Callback when the tool is closed |
| `layout.leftPanel` | String | 'selection' | Panel to show on the left |
| `layout.rightPanel` | String | 'preview' | Panel to show on the right |

### Message Object Structure

Each message object should have the following properties:

```javascript
{
    id: 'unique-message-id',
    role: 'user|assistant|system',
    content: 'Message content',
    created_at: '2023-01-01T00:00:00Z',
    position: 1,  // Position in conversation
    type: 'regular',  // 'regular', 'compacted-message', 'trace-metadata'
    visibility: 'public'  // 'public' or 'human-public'
}
```

#### Compacted Message Structure

Compacted messages have a special type and metadata:

```javascript
{
    id: 'unique-message-id',
    role: 'assistant',
    content: 'Compacted message content',
    type: 'compacted-message',
    metadata: {
        compactedFrom: 'original-chat-id',
        compactedRange: '2-5',
        compactedAt: '2023-01-01T00:00:00Z'
    }
}
```

## Component Architecture

The MessagesTool is built with a modular component architecture:

### Main Components

- **MessagesTool**: The main class that orchestrates all functionality
- **SelectionPanel**: Left panel containing the messages table for selection
- **PreviewPanel**: Right panel for viewing and editing messages
- **QuickFilters**: Component for filtering messages by type, search, and range
- **ActionButtons**: Component with buttons for various actions

### Modal Components

- **CompactMessageModal**: Modal for compacting message ranges
- **ReplaceMessageModal**: Modal for replacing message ranges
- **DeleteMessageModal**: Modal for deleting selected messages
- **ConversationAssistantModal**: Modal for creating conversation assistants
- **ExportModal**: Modal for configuring and executing exports
- **AddMessageModal**: Modal for adding new blank messages

### Service Components

- **CompactMessageService**: Handles compaction operations and validation
- **ReplaceMessageService**: Handles replacement operations
- **DeleteMessageService**: Handles deletion operations
- **ConversationAssistantService**: Creates and manages conversation assistants
- **MessageExportService**: Handles export formatting and delivery
- **MessageFilterService**: Provides filtering functionality

### Utility Components

- **UserSettingsUtils**: Manages persistent user settings
- **MessageRangeGrid**: Visual grid for selecting message ranges
- **FormHelper**: Utilities for creating form elements
- **MessagePreviewService**: Formats messages for display

## Styling

The tool uses CSS classes prefixed with `gs-` to avoid conflicts with other styles. The main styles are defined in `styles/messages-tool.js` and individual component styles are in the `styles/components/` directory.

## Browser Compatibility

The MessagesTool requires a modern browser with support for:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- LocalStorage for settings persistence
- Clipboard API for copy functionality

## Contributing

When contributing to the MessagesTool:
1. Follow the existing code style and patterns
2. Add appropriate metadata headers to new components
3. Update the README for any new features
4. Ensure all components have proper cleanup methods
5. Test with various message types and sizes
