<!--
Component: MenuButton Component Overview
Block-UUID: 3a4cdb28-6b5c-4d53-a963-47b231096daf
Parent-UUID: N/A
Version: 2.0.0
Description: Documentation for the MenuButton component, a split button that combines a primary action with a dropdown menu for additional options.
Language: markdown
Created-at: 2025-10-21T16:54:18.815Z
Authors: Gemini 2.5 Flash (v1.0.0), GLM-4.6 (v2.0.0)
-->


# MenuButton Component

The MenuButton component is a split button that combines a primary action button with a dropdown menu for additional options. It's designed to provide users with quick access to both a default action and alternative options.

## Component File Structure

```
menu-button/
├── menu-button.js
├── menu-button.styles.js
├── constants.js
├── index.js
└── README.md
```

---

## Usage

### Basic Usage

```javascript
const { MenuButton } = require('./menu-button');

const menuButton = new MenuButton(container, {
    text: 'Replace',
    variant: 'secondary',
    size: 'small',
    defaultAction: () => {
        console.log('Default action executed');
    },
    menuOptions: [
        {
            label: 'Replace current message and close',
            value: 'replace-and-close',
            action: () => {
                console.log('Replace and close action executed');
            }
        },
        {
            label: 'Add to message and close modal',
            value: 'add-and-close',
            action: () => {
                console.log('Add and close action executed');
            }
        }
    ]
});

menuButton.render();

```

### Advanced Usage

```javascript
const { MenuButton, MENU_POSITIONS } = require('./menu-button');

const menuButton = new MenuButton(container, {
    text: 'Export',
    variant: 'primary',
    size: 'medium',
    menuPosition: MENU_POSITIONS.BOTTOM_LEFT,
    defaultAction: () => {
        exportAsPDF();
    },
    menuOptions: [
        {
            label: 'Export as PDF',
            value: 'pdf',
            action: () => {
                exportAsPDF();
            }
        },
        {
            label: 'Export as Word',
            value: 'word',
            action: () => {
                exportAsWord();
            }
        },
        {
            label: 'Export as Excel',
            value: 'excel',
            action: () => {
                exportAsExcel();
            }
        },
        {
            label: 'Export as CSV',
            value: 'csv',
            action: () => {
                exportAsCSV();
            },
            disabled: true // Disabled option
        }
    ]
});

menuButton.render();
```

---

## API

### Constructor

```javascript
new MenuButton(parentElement, config)
```

**Parameters:**
- `parentElement` (HTMLElement): The DOM element to render the menu button into
- `config` (object): Configuration object with the following properties:
  - `text` (string): Text for the main button
  - `variant` (string, default: 'secondary'): Button variant (primary, secondary, tertiary, danger, link, icon)
  - `size` (string, default: 'medium'): Button size (small, medium, large)
  - `defaultAction` (function): Function to execute when main button is clicked
  - `menuOptions` (array): Array of menu options with the following structure:
    - `label` (string): Display text for the option
    - `value` (any): Value associated with the option
    - `action` (function): Function to execute when option is selected
    - `disabled` (boolean, optional): Whether the option is disabled
  - `menuPosition` (string, default: 'bottom-right'): Position of the dropdown menu
  - `className` (string, optional): Additional CSS classes
  - `style` (object, optional): Additional inline styles

### Methods

- `render()`: Renders the component to the DOM
- `setText(text)`: Updates the main button text
- `setDisabled(disabled)`: Enables or disables the entire component
- `updateMenuOptions(options)`: Updates the dropdown menu options
- `destroy()`: Cleans up the component and removes it from the DOM

---

## Constants

### MENU_POSITIONS

- `MENU_POSITIONS.BOTTOM_RIGHT`: Menu appears below and to the right of the dropdown button
- `MENU_POSITIONS.BOTTOM_LEFT`: Menu appears below and to the left of the dropdown button
- `MENU_POSITIONS.TOP_RIGHT`: Menu appears above and to the right of the dropdown button
- `MENU_POSITIONS.TOP_LEFT`: Menu appears above and to the left of the dropdown button

### CSS_CLASSES

- `CSS_CLASSES.CONTAINER`: Container class for the entire component
- `CSS_CLASSES.MAIN_BUTTON`: Class for the main button
- `CSS_CLASSES.DROPDOWN_BUTTON`: Class for the dropdown button
- `CSS_CLASSES.DISABLED`: Class for the disabled state

---

## Styling

The MenuButton component injects its own styles using DomUtils.injectStyles. The styles create a split button appearance with:

- Visual connection between the two buttons through a shared container
- Contrasting border-right on the main button to create a clear visual separation
- Consistent height and alignment
- Appropriate hover states
- Disabled state handling
- Focus indicators for accessibility

The component uses custom button elements instead of the base Button component to provide more control over styling, particularly for the border between the main button and dropdown button.

### Visual Design

The MenuButton uses a contrasting border-right on the main button to create a clear visual break between the two buttons:

- **Container**: Defines the outer border color (varies by variant)
- **Main button**: Background color + border-right in the font color (white for primary/danger, dark for secondary)
- **Dropdown button**: Just background color, no borders
- **No divider element**: The contrasting border-right replaces the need for a separate divider

---

## Dependencies

The MenuButton component depends on:

- `@gitsense/gsc-utils`: For SVGUtils and DomUtils
- `../tooltip-menu`: For the dropdown menu functionality

---

## Accessibility

The MenuButton component includes accessibility features:

- Keyboard navigation support
- Proper focus indicators
- Screen reader compatibility
- Disabled state handling

---

## Browser Compatibility

The MenuButton component supports all modern browsers that support:

- ES6 classes
- CSS Grid and Flexbox
- DOM manipulation APIs

---

## Examples

### Message History Integration

```javascript
const { MenuButton } = require('./menu-button');

// Create a menu button for message history actions
const messageMenuButton = new MenuButton(messageContainer, {
    text: 'Use Message',
    variant: 'primary',
    size: 'small',
    defaultAction: () => {
        // Replace current message with selected message
        replaceCurrentMessage(selectedMessage);
    },
    menuOptions: [
        {
            label: 'Replace current message and close',
            value: 'replace-and-close',
            action: () => {
                replaceCurrentMessage(selectedMessage);
                closeMessageHistory();
            }
        },
        {
            label: 'Add to message and close modal',
            value: 'add-and-close',
            action: () => {
                addToCurrentMessage(selectedMessage);
                closeMessageHistory();
            }
        },
        {
            label: 'Replace input',
            value: 'replace-input',
            action: () => {
                replaceInput(selectedMessage);
            }
        }
    ]
});

messageMenuButton.render();
```

### Dynamic Menu Updates

```javascript
// Update menu options based on context
function updateMenuOptions(context) {
    const options = [
        {
            label: 'Edit',
            value: 'edit',
            action: () => editItem(context.id)
        }
    ];
    
    if (context.canDelete) {
        options.push({
            label: 'Delete',
            value: 'delete',
            action: () => deleteItem(context.id)
        });
    }
    
    if (context.canShare) {
        options.push({
            label: 'Share',
            value: 'share',
            action: () => shareItem(context.id)
        });
    }
    
    menuButton.updateMenuOptions(options);
}
```
