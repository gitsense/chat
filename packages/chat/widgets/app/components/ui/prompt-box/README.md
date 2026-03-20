# Prompt Box Component

The Prompt Box component provides a flexible, accessible, and customizable modal dialog solution for displaying prompts, alerts, or custom content overlays.

## Installation

(Installation instructions here...)

## Usage

```javascript
// Example usage
const promptBox = new PromptBox({
    title: 'Attention Required',
    content: 'Please confirm your action.',
    // ... other options
});

promptBox.show();
```

## Configuration Options

The Prompt Box constructor accepts an optional configuration object to customize its appearance and behavior.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Prompt'` | The text displayed in the header of the prompt box. |
| `width` | `string` or `number` | `'90%'` | The width of the modal content box. Can be a CSS string (e.g., `'500px'`) or a number (interpreted as pixels). |
| `height` | `string` or `number` | `'auto'` | The height of the modal content box. |
| `maxWidth` | `string` or `number` | `'500px'` | The maximum width the modal content box can reach. This prevents the modal from becoming too wide on large screens. |
| `maxHeight` | `string` or `number` | `'90vh'` | **The maximum height the modal content box can reach.** This ensures the modal remains visible within the viewport, typically allowing content to scroll internally if necessary. |
| `zIndex` | `number` | `100000000000` | The CSS z-index applied to the modal overlay. |
| `closeOnOverlayClick` | `boolean` | `true` | If `true`, clicking the semi-transparent overlay will close the prompt box. |
| `showCloseButton` | `boolean` | `true` | If `true`, displays the 'X' close button in the header. |

