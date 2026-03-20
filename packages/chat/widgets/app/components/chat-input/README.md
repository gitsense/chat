<!--
Component: ChatInput
Block-UUID: 8c521156-8d7a-43e9-9c0f-5b6a7c8d9e0f
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the refactored ChatInput component, a modern, modular chat input interface.
Language: markdown
Created-at: 2026-01-15T05:41:00.123Z
Authors: GLM-4.6 (v1.0.0)
-->


# ChatInput Component

The ChatInput component provides a modern, modular interface for user input in chat applications. It features a clean design with customizable options, file upload support, and a flexible architecture that makes it easy to extend and integrate with other components.

## Features

- **Modular Architecture**: Separated into distinct UI components and handlers for better maintainability
- **CSS-in-JS Styling**: Uses injectable CSS with consistent `gsc-chat-input-` class prefixes
- **File Upload Support**: Integrated with GSFileUploader for drag-and-drop file uploads
- **Resizable Textarea**: Users can resize the input area with a drag handle
- **Model Selection**: Support for switching between different AI models
- **Chat Options**: Support for new chat, split chat, and validate chat operations
- **Responsive Design**: Adapts to different screen sizes
- **Event-Driven**: Clean event system for easy integration with parent applications

## Installation

```javascript
const { ChatInput } = require('./chat-input');

```

## Usage

### Basic Usage

```javascript
// Create a new instance
const chatInput = new ChatInput(
    // Chat object with required properties
    {
        uuid: '758b6505-34a5-48d8-9e15-4f74443f5f48',
        name: 'Simple Math Question',
        main_model: 'GLM-4.6'
    },
    // Available models
    [
        { name: 'GLM-4.6' },
        { name: 'GPT-4' },
        { name: 'Claude' }
    ],
    // Options
    {
        showNewChatOptions: true,
        fakeLLMs: 2
    },
    // Actions
    {
        send: (type, relation, model, models, message, files) => {
            console.log('Sending message:', { type, relation, model, models, message, files });
        },
        stop: () => {
            console.log('Stopping generation');
        }
    },
    // Events
    {
        onResize: (rect) => {
            console.log('Component resized:', rect);
        }
    }
);

// Render to a container
const container = document.getElementById('chat-input-container');
chatInput.render(container);
```

### Advanced Usage

```javascript
// Create with custom options
const chatInput = new ChatInput(
    chat,
    availableModels,
    {
        dragAndDropMsg: "Custom drag and drop message",
        warningMsg: "Custom warning message",
        validateMsg: "Custom validation message",
        showNewChatOptions: false,
        fakeLLMs: 0
    },
    actions,
    events
);

// Access components and handlers
const inputBox = chatInput.components.inputBox;
const optionsBar = chatInput.components.optionsBar;
const inputHandler = chatInput.handlers.inputHandler;
const sendHandler = chatInput.handlers.sendHandler;
const resizeHandler = chatInput.handlers.resizeHandler;

// Listen to events
inputHandler.setEvent('onSaveDraft', (content) => {
    console.log('Draft saved:', content);
});

// Control the component
chatInput.showGoBtn();
chatInput.showStopBtn();
chatInput.reset();
```

## API

### Constructor

```javascript
new ChatInput(chat, availableModels, options, actions, events)
```

#### Parameters

- **chat** (Object, required): Chat object with properties:
  - `uuid` (string): Unique identifier for the chat
  - `name` (string): Display name for the chat
  - `main_model` (string): Name of the main model

- **availableModels** (Array, required): Array of available model objects with `name` property

- **options** (Object, optional): Configuration options:
  - `dragAndDropMsg` (string): Message for drag and drop area
  - `warningMsg` (string): Warning message displayed at bottom
  - `validateMsg` (string): Validation message for validate chat
  - `showNewChatOptions` (boolean): Whether to show new chat options
  - `fakeLLMs` (number): Number of fake LLM simulators to include

- **actions** (Object, optional): Action callbacks:
  - `send(type, relation, model, models, message, files)`: Called when user sends a message
  - `stop()`: Called when user clicks stop button

- **events** (Object, optional): Event callbacks:
  - `onResize(rect)`: Called when component is resized

### Methods

- **render(renderTo)**: Renders the component to the specified container
- **reset()**: Resets the component to default state
- **showGoBtn()**: Shows the go button
- **showStopBtn()**: Shows the stop button
- **destroy()**: Destroys the component and cleans up resources

### Components

The ChatInput component is composed of several sub-components:

- **InputBox**: Handles the textarea, file uploader, and go/stop buttons
- **OptionsBar**: Handles the top menu bar with options
- **OptionSettings**: Handles the settings panels for different options

### Handlers

The component uses several handlers to manage different aspects:

- **InputHandler**: Manages input events and auto-save coordination
- **SendHandler**: Handles send/stop actions and message dispatch
- **ResizeHandler**: Manages textarea resizing

## Styling

The component uses CSS classes with the `gsc-chat-input-` prefix for easy customization:

```css
/* Override main container */
.gsc-chat-input-container {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Customize textarea */
.gsc-chat-input-textarea {
    font-family: 'Monaco', monospace;
    font-size: 14px;
}

/* Customize buttons */
.gsc-chat-input-go-btn {
    background-color: #ff7f0e;
    border-color: #ff7f0e;
}
```

## File Structure

```
chat-input/
├── index.js                          // Entry point, exports ChatInput
├── ChatInput.js                      // Main controller/orchestrator
├── constants.js                      // Configuration constants, CSS classes, messages
├── styles.js                         // CSS string for injection
├── ui/
│   ├── InputBox.js                   // Textarea, file uploader, and buttons
│   ├── OptionsBar.js                 // Top menu bar
│   └── OptionSettings.js             // Settings panels for options
├── handlers/
│   ├── InputHandler.js               // Input event handling
│   ├── SendHandler.js                // Send/stop button logic
│   └── ResizeHandler.js              // Textarea resize logic
└── README.md                         // This file
```

## Dependencies

The ChatInput component depends on:

- `@gitsense/gsc-utils` - For DOM utilities and SVG icons
- `@gitsense/file-uploader` - For file upload functionality
- `drop-down-menu` - For dropdown menus in option settings
- `textarea_resizer` - For textarea resizing functionality
- `paste_events` - For handling paste events

## Browser Compatibility

The ChatInput component supports all modern browsers that support:

- ES6 classes and modules
- CSS Grid and Flexbox
- DOM manipulation APIs
- Event handling APIs

## Performance Considerations

- **Event Delegation**: Uses efficient event handling patterns
- **Lazy Loading**: Components are initialized only when needed
- **Memory Management**: Proper cleanup of event listeners and DOM elements
- **Debounced Input**: Input events are debounced to prevent excessive processing

## Security

- **Input Sanitization**: User input is properly sanitized before processing
- **XSS Prevention**: Safe DOM manipulation practices
- **File Upload Security**: File types and sizes are validated

## Examples

### Custom Styling

```javascript
// Create a custom styled ChatInput
const chatInput = new ChatInput(chat, availableModels, options, actions, events);

// Add custom styles
const customStyles = `
    .gsc-chat-input-container {
        background: linear-gradient(to right, #f8f9fa, #e9ecef);
    }
    
    .gsc-chat-input-textarea:focus {
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = customStyles;
document.head.appendChild(styleElement);
```

### Integration with MessageHistory

```javascript
// This will be implemented in the next phase
const chatInput = new ChatInput(chat, availableModels, options, actions, events);

// Initialize MessageHistory (future integration)
const messageHistory = new MessageHistory({
    chatInput: chatInput.components.inputBox.getInput(),
    chat: chat,
    onMessageUpdate: (message, action) => {
        // Handle message updates
    }
});

messageHistory.init();
```

### Custom Event Handling

```javascript
const chatInput = new ChatInput(chat, availableModels, options, actions, events);

// Add custom event handlers
chatInput.handlers.inputHandler.setEvent('onSaveDraft', (content) => {
    // Custom draft saving logic
    localStorage.setItem('custom-draft', content);
});

chatInput.handlers.sendHandler.setEvent('onSend', (type, relation, model, models, message, files) => {
    // Custom send logic
    console.log('Custom send handler:', { type, relation, model, models, message, files });
});
```

## Troubleshooting

### Component Not Rendering

1. Check that the chat object has valid uuid, name, and main_model properties
2. Verify that the container element exists in the DOM
3. Check browser console for any JavaScript errors

### File Upload Not Working

1. Verify that GSFileUploader is properly imported
2. Check that the drop zone is correctly configured
3. Ensure file types and sizes are within limits

### Resize Not Working

1. Check that the resize handle is properly initialized
2. Verify that mouse events are being captured
3. Ensure the ResizeHandler is initialized

### Options Not Working

1. Check that the OptionsBar component is properly initialized
2. Verify that event handlers are correctly attached
3. Ensure the DropDownMenu dependency is available

## Migration from Old Version

If you're migrating from the old ChatInput component:

1. Update the constructor call to use the new chat object format
2. Replace direct style manipulation with CSS classes
3. Update event handling to use the new handler system
4. Replace component-specific method calls with handler methods

```javascript
// Old way
const chatInput = new ChatInput(mainModel, availableModels, options, actions, events);

// New way
const chatInput = new ChatInput(
    { uuid, name, main_model }, // Chat object
    availableModels,
    options,
    actions,
    events
);
```

