<!--
Component: SimpleTerminal
Block-UUID: 39e89a7e-c589-443c-88d3-c3e7a5f377f3
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the SimpleTerminal component, focusing on Playwright integration and automation workflows.
Language: markdown
Created-at: 2026-03-11T23:40:00.000Z
Authors: GLM-4.7 (v1.0.0)
-->


# SimpleTerminal Component

The `SimpleTerminal` is a standalone, interactive REPL (Read-Eval-Print Loop) component designed for executing CLI commands, reviewing history, and simulating terminal interactions for demos and automated testing.

## Features

- **Interactive REPL:** Execute commands and view streaming output in a fixed-size modal.
- **History Management:** Automatically saves the last 10 commands to LocalStorage, scoped by chat UUID.
- **Playwright-Ready:** Built-in support for state polling and simulation mode for automated testing and demo generation.
- **Simulation Mode:** Type commands and output at human-like speeds for video demos.

## Installation

```javascript
const { SimpleTerminal } = require('./simple-terminal');


```

## Usage

### Basic Initialization

```javascript
const terminal = new SimpleTerminal(contractManager, {
    width: '90vw',
    height: '90vh',
    typingSpeed: 200, // ms per char for simulation
    streamingSpeed: 0, // ms delay for output
    onAdd: (payload) => console.log('Add to chat:', payload),
    onClose: () => console.log('Terminal closed'),
    onStop: () => console.log('Stop requested'),
    onExecute: (command) => console.log('Execute:', command)
});

// Render to the document body
terminal.render();

// Show the terminal
terminal.show();
```

## Playwright Integration

This component is designed to be easily controlled by Playwright for automated testing and demo generation.

### Key Selectors

| Element | Selector | Description |
| :--- | :--- | :--- |
| **Command Input** | `.gsc-st-command-input` | The main input field for typing commands. |
| **Stop Button** | `.gsc-st-stop-button` | The stop button in the header. |
| **History Item** | `.gsc-st-history-item` | Items in the history list. |

### State Management

The command input element (`.gsc-st-command-input`) uses a `data-state` attribute to indicate its current status. Playwright should poll this attribute to synchronize actions.

| State | Description | Input Status |
| :--- | :--- | :--- |
| `idle` | Waiting for input. | Enabled |
| `executing` | Command is running. | **Disabled** |
| `finished` | Command completed. | Enabled |

### Polling for Completion

To wait for a command to finish (real or simulated), poll for the `finished` state and ensure the input is re-enabled.

```javascript
// Wait for state to be finished AND input to be enabled
await page.waitForFunction(() => {
    const input = document.querySelector('.gsc-st-command-input');
    return input && 
           input.dataset.state === 'finished' && 
           !input.disabled;
});
```

### Simulation Mode (Demo Generation)

To create a demo where the terminal "types" out commands and output, use the `data-fake-*` attributes on the input element before pressing Enter.

#### Attributes

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `data-fake-command` | string | The command to display (e.g., `find .`). |
| `data-fake-comments` | string | JSON stringified array of comment lines (e.g., `["# Showing files"]`). |
| `data-fake-output` | string | The full output text to simulate streaming. |

#### Workflow

1.  **Set Attributes:** Populate the input with the command and set the `data-fake-*` attributes.
2.  **Trigger:** Press `Enter`.
3.  **Wait:** Poll for `data-state="finished"`.
4.  **Cleanup:** The component automatically removes `data-fake-*` attributes upon completion.

#### Playwright Example: Simulation

```javascript
// 1. Select the input
const input = await page.locator('.gsc-st-command-input');

// 2. Set the value and attributes
await input.fill('find .');
await input.evaluate((el) => {
    el.dataset.fakeCommand = 'find .';
    el.dataset.fakeComments = JSON.stringify(['# This will find all files', '# in the current directory']);
    el.dataset.fakeOutput = './src\n./package.json\n./README.md';
});

// 3. Trigger the command
await input.press('Enter');

// 4. Wait for completion
await page.waitForFunction(() => {
    const el = document.querySelector('.gsc-st-command-input');
    return el && el.dataset.state === 'finished' && !el.disabled;
});

// 5. Verify attributes are cleaned up
const hasFakeOutput = await input.evaluate(el => el.dataset.fakeOutput !== undefined);
console.log('Simulation finished, attributes cleaned:', !hasFakeOutput);
```

#### Playwright Example: Real Execution

```javascript
// 1. Select the input
const input = await page.locator('.gsc-st-command-input');

// 2. Type a real command (no fake attributes)
await input.fill('ls -la');

// 3. Trigger the command
await input.press('Enter');

// 4. Wait for completion
await page.waitForFunction(() => {
    const el = document.querySelector('.gsc-st-command-input');
    return el && el.dataset.state === 'finished' && !el.disabled;
});

// 5. Proceed with next steps
console.log('Real execution finished');
```

## API Reference

### Constructor

```javascript
new SimpleTerminal(contractManager, options)
```

**Parameters:**

*   `contractManager` (Object): The ContractManager instance.
*   `options` (Object): Configuration options.
    *   `width` (string): Modal width (default: `'90vw'`).
    *   `height` (string): Modal height (default: `'90vh'`).
    *   `typingSpeed` (number): Delay in ms per character for simulation (default: `200`).
    *   `streamingSpeed` (number): Delay in ms for output chunks (default: `0`).
    *   `onAdd` (function): Callback when "Add" is clicked.
    *   `onClose` (function): Callback when "Close" is clicked.
    *   `onStop` (function): Callback when "Stop" is clicked.
    *   `onExecute` (function): Callback for real command execution.

### Methods

*   **`render()`**: Renders the terminal to the document body.
*   **`show()`**: Shows the terminal modal.
*   **hide()`**: Hides the terminal modal.
*   **`destroy()`**: Destroys the component and cleans up resources.
*   **`appendOutput(text)`**: Appends text to the active output view.
*   **setStreaming(isStreaming)**: Toggles the Stop button and input state.

## Architecture

The component is split into the following modules:

*   **SimpleTerminal.js**: Main orchestrator.
*   **HistoryManager.js**: LocalStorage persistence.
*   **components/Header.js**: Title, copy links, stop button.
*   **components/HistoryBrowser.js**: Left pane list.
*   **components/MainView.js**: Right pane (Output + Input).
*   **components/Footer.js**: Controls (Add/Close/Format).
