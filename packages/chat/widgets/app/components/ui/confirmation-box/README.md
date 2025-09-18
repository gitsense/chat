<!--
Component: Confirmation Box
Block-UUID: 849b3be5-351c-4104-9934-8f4e554c798c
Parent-UUID: 54b580d9-a1c5-42ad-9a1d-2afb32536c85
Version: 1.1.0
Description: README documentation for the reusable Confirmation Box component.
Language: markdown
Created-at: 2025-09-10T00:29:56.316Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash (v1.1.0)
-->


# Confirmation Box Component

This directory contains the source code for a reusable `ConfirmationBox` UI component, designed to provide a customizable modal dialog for user confirmations.

## Purpose

The `ConfirmationBox` component aims to:

*   Provide a simple, customizable confirmation dialog.
*   Be self-contained, injecting its own necessary CSS styles.
*   Offer a simple API for integration into your application.
*   Prevent body scrolling when active.

## Usage

This component is typically instantiated once and then reused to display various confirmation messages.

1.  **Import the Component:**

```javascript
// In your application code (e.g., a script file)
const { ConfirmationBox } = require('./path/to/confirmation-box');
```

2.  **Instantiate the Confirmation Box:**

    Create a new instance of the `ConfirmationBox` class. It will automatically append its HTML structure to the `document.body` and inject its styles.

```javascript
const myConfirmationBox = new ConfirmationBox();
```

3.  **Show the Confirmation Box:**

    Call the `show` method, passing an options object for the title and message, and a callback function to execute upon confirmation.

```javascript
myConfirmationBox.show(
  {
    title: "Delete Item",
    message: "Are you sure you want to delete this item permanently? This action cannot be undone."
  },
  () => {
    console.log("User confirmed deletion!");
    // Add your deletion logic here
  }
);

// You can also pass a DOM element as the message or title
const customMessageElement = document.createElement('div');
customMessageElement.innerHTML = '<h3>Warning!</h3><p>This is a <strong>critical</strong> operation.</p>';

myConfirmationBox.show(
  {
    title: 'Custom Confirmation',
    message: customMessageElement
  },
  () => {
    console.log("Custom message confirmed!");
  }
);

// Example with custom button text and asynchronous confirmation
myConfirmationBox.show(
  {
    title: "Create Batch Job",
    message: "This operation might process a large number of files and incur costs. Are you sure you want to proceed?",
    confirmButtonText: "Create Batch",
    cancelButtonText: "No, Cancel",
    confirmButtonLoadingText: "Creating Batch..."
  },
  async () => {
    console.log("User confirmed batch creation!");
    // Simulate an asynchronous API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Batch creation simulated successfully!");
    // After the promise resolves, the modal will automatically hide.
    // You can then show a global success notification here if needed.
  }
);
```

## API

### `constructor()`

Creates a new instance of the `ConfirmationBox`. This will automatically inject styles and render the hidden modal into the `document.body`.

### `show(options, onConfirm)`

Displays the confirmation box.

*   `options` (`object`): An object containing configuration for the dialog.
    *   `title` (Optional `string` or `Node`): The title text or a DOM element to display in the header. Defaults to `"Confirm Action"`.
    *   `message` (Optional `string` or `Node`): The message text or a DOM element to display in the body. Defaults to `"Are you sure you want to proceed?"`.
    *   `confirmButtonText` (Optional `string`): Text for the confirm button. Defaults to `"Confirm"`.
    *   `cancelButtonText` (Optional `string`): Text for the cancel button. Defaults to `"Cancel"`.
    *   `confirmButtonLoadingText` (Optional `string`): Text for the confirm button while an asynchronous operation is in progress. Defaults to `"Processing..."`.
*   `onConfirm` (`function`): A callback function that will be executed when the user clicks the "Confirm" button. This function receives no arguments.
    *   If `onConfirm` returns a `Promise`, the confirmation box will remain open, disable its buttons, and update the confirm button's text to `confirmButtonLoadingText` until the Promise resolves or rejects.

### `hide()`

Hides the confirmation box. This method is automatically called when the user clicks "Confirm", "Cancel", the close button, or the overlay.

### `destroy()`

Removes the confirmation box's DOM elements and event listeners from the document. Use this if you need to completely remove the component from memory.

## Implementation Details

*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created, making it self-contained.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation, with no external library dependencies.
*   **Singleton Usage:** While technically a class, it's designed for a single instance to be created and reused, as it appends its modal directly to `document.body`.
*   **Body Scroll Prevention:** When the confirmation box is active, it sets `overflow: hidden` on the `document.body` to prevent scrolling.
*   **Asynchronous Confirmation:** The `show` method now supports `onConfirm` callbacks that return a `Promise`. When a Promise is returned, the modal will automatically enter a "loading" state (disabling buttons, updating confirm button text) until the Promise resolves or rejects, making it suitable for long-running operations.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `ConfirmationBox` class.
*   `confirmation-box.js`: Contains the main `ConfirmationBox` class logic.
*   `confirmation-box.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names and other constants.
*   `README.md`: This file.
