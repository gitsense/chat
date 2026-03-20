<!--
Component: Notification Manager
Block-UUID: aa7d0d81-75a3-4e98-ab45-cb5c47d3f1c8
Parent-UUID: N/A
Version: 1.0.0
entation for the reusable Notification Manager component, which displays ephemeral toast notifications.
Language: markdown
Created-at: 2025-09-09T05:41:18.775Z
Authors: Gemini 2.5 Flash (v1.0.0)
-->

# Notification Manager Component

This directory contains the source code for a reusable `NotificationManager` UI component, designed to provide non-blocking, ephemeral "toast" notifications to the user. It manages the display, stacking, and dismissal of individual toast messages.

## Purpose

The `NotificationManager` component aims to:

*   Provide a modern, non-blocking way to inform users of events (success, error, info, warning).
*   Be self-contained, injecting its own necessary CSS styles.
*   Offer a simple, static API for integration into your application.
*   Automatically stack multiple notifications without overlapping.
*   Allow for auto-dismissal after a configurable duration, with optional manual dismissal.

## Usage

The `NotificationManager` is designed to be used as a singleton, providing static methods for convenience. You typically don't instantiate it directly in your application code, but rather call its static methods.

1.  **Import the Component:**

```javascript
// In your application code (e.g., a script file)
const { NotificationManager } = require('./path/to/notification-manager');
```

2.  **Trigger Notifications:**

Call the static methods `success`, `error`, `info`, or `warning` to display a toast.

```javascript
// Show a success toast
NotificationManager.success('Operation completed successfully!');

// Show an error toast with a custom duration (e.g., 8 seconds)
NotificationManager.error('Failed to save data. Please try again.', 8000);

// Show an informational toast
NotificationManager.info('Your changes are being processed.');

// Show a warning toast
NotificationManager.warning('Some optional fields were not filled.');
```

## API

The `NotificationManager` class provides the following static methods:

### `NotificationManager.success(message, [duration])`

Displays a success toast notification.

*   `message` (`string`): The message to display in the toast.
*   `duration` (Optional `number`): The time in milliseconds before the toast automatically dismisses. Defaults to `5000`ms (5 seconds).

### `NotificationManager.error(message, [duration])`

Displays an error toast notification.

*   `message` (`string`): The message to display in the toast.
*   `duration` (Optional `number`): The time in milliseconds before the toast automatically dismisses. Defaults to `5000`ms (5 seconds).

### `NotificationManager.info(message, [duration])`

Displays an informational toast notification.

*   `message` (`string`): The message to display in the toast.
*   `duration` (Optional `number`): The time in milliseconds before the toast automatically dismisses. Defaults to `5000`ms (5 seconds).

### `NotificationManager.warning(message, [duration])`

Displays a warning toast notification.

*   `message` (`string`): The message to display in the toast.
*   `duration` (Optional `number`): The time in milliseconds before the toast automatically dismisses. Defaults to `5000`ms (5 seconds).

### `NotificationManager.destroy()`
                                                                                                                                                                                                                                                            
(Internal/Advanced Use) Removes the notification manager's container and all active toasts from the DOM. This method is primarily for cleanup in specific application lifecycle scenarios (e.g., unmounting a root component).

## Implementation Details

*   **Singleton Pattern:** The `NotificationManager` ensures only one instance exists globally, managing a single container for all toasts.
*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first notification is triggered, making it self-contained.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation, with no external library dependencies.
*   **Stacking Logic:** New toasts appear at the top of the stack, and existing toasts adjust their position dynamically.
*   **Ephemeral:** Toasts automatically dismiss after a set duration, but can also be manually dismissed by the user.
*   **Hover to Pause:** The auto-dismiss timer pauses when the user hovers over a toast and resumes when the mouse leaves.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `NotificationManager` class.
*   `notification-manager.js`: Contains the main `NotificationManager` class logic, handling toast orchestration.
*   `toast.js`: Defines the `Toast` class, representing a single notification element and its behavior.
*   `notification-manager.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names, default durations, and other constants.
*   `README.md`: This file.
