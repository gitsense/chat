<!--
Component: Prompt Box
Block-UUID: 461a9157-744f-4502-8be7-e8ac5f1a955e
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the generic Prompt Box UI component.
Language: markdown
Created-at: 2025-09-26T02:29:21.374Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# Prompt Box Component

This directory contains the source code for a reusable `PromptBox` UI component. It is designed to be a generic modal dialog that presents the user with a prompt (title and content) and relies on the caller to define and handle the specific actions (e.g., buttons) within the content area. It's a more flexible alternative to a `ConfirmationBox` for scenarios requiring custom action choices.

## Purpose

The `PromptBox` component aims to:
*   Provide a generic, customizable modal container.
*   Handle basic modal rendering, positioning, and visibility toggling.
*   Manage overlay background and prevent body scrolling when active.
*   Allow the caller full control over the content and action event handling.
*   Be self-contained by injecting its own necessary CSS styles.

## Usage

This component is typically instantiated once and then reused to display various prompts by updating its content.

1.  **Import the Component:**

```javascript
// In your application code (e.g., a script file)
const { PromptBox } = require('./ui/prompt-box');

```

2.  **Instantiate the Prompt Box:**

Create a new instance of the `PromptBox` class. It will automatically append its hidden HTML structure to the `document.body` and inject its styles.

```javascript
const myPromptBox = new PromptBox({
  // Optional initial configuration
  title: "Default Title",
  width: "400px",
  height: "300px",
  zIndex: 100000001,
  closeOnOverlayClick: false, // Example: disable overlay click to close
  showCloseButton: true,
  customClass: "my-specific-prompt-style"
});
```

3.  **Show the Prompt Box:**

Call the `show` method, passing an options object for the title, content, and other settings. Define your action buttons and their event handlers within the content you provide.

```javascript
// Example 1: Simple text prompt with custom buttons
const promptContent1 = document.createElement('div');
promptContent1.innerHTML = `
  <p>Would you like to add this context to the current chat or create a new one?</p>
  <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
    <button id="add-to-chat-btn" class="btn secondary-button">Add to Current Chat</button>
    <button id="new-chat-btn" class="btn primary-button">Create New Chat</button>
  </div>
`;

myPromptBox.show({
  title: "Add Context to AI Chat",
  content: promptContent1,
  closeOnOverlayClick: false // Ensure this setting for this specific prompt
}, () => {
  // onClose callback
  console.log("PromptBox was closed.");
});

// Attach event listeners to the buttons inside the content
document.getElementById('add-to-chat-btn')?.addEventListener('click', () => {
  console.log("Add to current chat logic...");
  // Perform action...
  myPromptBox.hide(); // Explicitly hide after action
});
document.getElementById('new-chat-btn')?.addEventListener('click', async () => {
  console.log("Create new chat logic...");
  // myPromptBox.hide(); // Can be called before or after async operation
  // Perform async action...
  // myPromptBox.hide(); // Or handled by the action itself
});
```

```javascript
// Example 2: More complex content with loading state handling
const createComplexPromptContent = (promptBoxInstance) => {
  const content = document.createElement('div');
  content.innerHTML = `
    <p>This operation requires careful consideration.</p>
    <ul>
      <li>It might take a few seconds.</li>
      <li>Data could be modified.</li>
    </ul>
    <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
      <button id="complex-cancel-btn" class="btn secondary-button">Never Mind</button>
      <button id="complex-proceed-btn" class="btn primary-button">Proceed</button>
    </div>
  `;

  const cancelButton = content.querySelector('#complex-cancel-btn');
  const proceedButton = content.querySelector('#complex-proceed-btn');

  cancelButton?.addEventListener('click', () => {
    promptBoxInstance.hide();
  });

  proceedButton?.addEventListener('click', async () => {
    // Disable buttons and show loading state
    cancelButton.disabled = true;
    proceedButton.disabled = true;
    proceedButton.textContent = 'Processing...';

    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log("Complex operation completed!");
      // The caller decides when to hide, e.g., after a success message is shown elsewhere
      // promptBoxInstance.hide();
    } catch (error) {
      console.error("Complex operation failed:", error);
      // Restore button state on error if modal is still used
      // proceedButton.textContent = 'Proceed';
      // cancelButton.disabled = false;
      // proceedButton.disabled = false;
    } finally {
       // Ensure final state or hide
       promptBoxInstance.hide();
    }
  });

  return content;
};

myPromptBox.show({
  title: "Complex Operation Confirmation",
  content: createComplexPromptContent(myPromptBox),
  width: "500px",
  height: "400px"
}, () => {
  console.log("Complex prompt closed.");
});
```

## API

### `constructor(options)`

Creates a new instance of the `PromptBox`.

*   `options` (`object`, optional): Initial configuration options for the prompt box.
    *   `title` (`string`, optional): The initial title text. Defaults to `"Prompt"`.
    *   `width` (`string` | `number`, optional): The width of the modal content box (e.g., `"400px"`, `500`). Defaults to a reasonable width (e.g., `"90%"` or `"400px"`).
    *   `height` (`string` | `number`, optional): The height of the modal content box (e.g., `"300px"`, `300`). Defaults to `"auto"`.
    *   `zIndex` (`number`, optional): The z-index for the modal overlay. Defaults to a high value (e.g., `100000000000`).
    *   `closeOnOverlayClick` (`boolean`, optional): Whether clicking the overlay closes the modal. Defaults to `true`.
    *   `showCloseButton` (`boolean`, optional): Whether to display the 'X' close button in the header. Defaults to `true`.
    *   `customClass` (`string`, optional): A custom CSS class to add to the main modal container.
    *   `container` (`HTMLElement`, optional): The parent element to append the modal to. Defaults to `document.body`.

### `show(options, onClose)`

Displays the prompt box.

*   `options` (`object`): Configuration for this specific display instance.
    *   `title` (`string` | `Node`, optional): The title text or a DOM element. Overrides the constructor title.
    *   `content` (`string` | `Node`, optional): The main body content (text, HTML string, or DOM element). This is where the caller defines action buttons.
    *   `width` (`string` | `number`, optional): The width for this display. Overrides the constructor width.
    *   `height` (`string` | `number`, optional): The height for this display. Overrides the constructor height.
    *   `zIndex` (`number`, optional): The z-index for this display. Overrides the constructor z-index.
    *   `closeOnOverlayClick` (`boolean`, optional): Whether clicking the overlay closes the modal for this display. Overrides the constructor setting.
    *   `showCloseButton` (`boolean`, optional): Whether to display the close button for this display. Overrides the constructor setting.
    *   `customClass` (`string`, optional): A custom CSS class for this display. Overrides the constructor custom class.
*   `onClose` (`function`, optional): A callback function that will be executed when the modal is closed (via close button, Escape key, or overlay click if enabled). This function receives no arguments.

### `hide()`

Hides the prompt box.

### `destroy()`

Removes the prompt box's DOM elements and event listeners from the document. Use this if you need to completely remove the component from memory.

## Implementation Details

*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation, with no external library dependencies.
*   **Singleton Style Usage:** While a class, it's designed to be instantiated once and reused by calling `show` with different content/options.
*   **Body Scroll Prevention:** Sets `overflow: hidden` on `document.body` when shown.
*   **Caller-Controlled Actions:** The component itself does not manage action buttons or their callbacks; this is entirely the responsibility of the caller via the `content` option.
*   **Accessibility (ARIA):** Will include basic ARIA attributes for the modal role and labelling.

## Files in this Directory

*   `index.js`: Entry point, exports the `PromptBox` class.
*   `prompt-box.js`: Main component logic.
*   `prompt-box.styles.js`: CSS styles as a JS string.
*   `constants.js`: CSS class names and constants.
*   `README.md`: This file.
