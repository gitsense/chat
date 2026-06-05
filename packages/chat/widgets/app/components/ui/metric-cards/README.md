<!--
Component: Metric Cards
Block-UUID: 54497981-0d5b-4836-a133-89c3b8138989
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the reusable MetricCards component.
Language: markdown
Created-at: 2026-01-03T00:59:18.000Z
Authors: GLM-4.6 (v1.0.0)
-->


# Metric Cards Component

This directory contains the source code for a reusable `MetricCards` UI component that displays metric data in card format with optional checkboxes and icons.

## Purpose

The `MetricCards` component provides a flexible way to display metric data in card format with:
- Customizable card dimensions and styling
- Optional checkboxes for selection
- Optional icons for visual identification
- Responsive layout with configurable spacing
- Callbacks for user interactions

## Usage

1.  **Import the Component:**

```javascript
const { MetricCards } = require('./path/to/metric-cards');

```

2.  **Prepare Configuration and Container:**

```html
<!-- In your HTML file -->
<div id="metric-cards-container"></div>
```

3.  **Create Icon Elements:**

```javascript
// Create icon elements (required)
const circleIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
circleIcon.setAttribute("viewBox", "0 0 16 16");
circleIcon.setAttribute("width", "16");
circleIcon.setAttribute("height", "16");
circleIcon.innerHTML = '<circle cx="8" cy="8" r="6" fill="currentColor"/>';
```

4.  **Define Metrics Data:**

```javascript
const metrics = [
  {
    id: 'pending',
    label: 'Pending',
    value: 100,
    valueSuffix: '%',
    count: 1,
    countLabel: 'batch',
    countLabelPlural: 'batches',
    icon: circleIcon,
    color: '#007bff',
    selected: true
  },
  {
    id: 'completed',
    label: 'Success',
    value: 0,
    valueSuffix: '%',
    count: 0,
    countLabel: 'batch',
    countLabelPlural: 'batches',
    icon: checkIcon,
    color: '#28a745',
    selected: false
  }
  // ... more metrics
];
```

5.  **Instantiate the Component:**

```javascript
const container = document.getElementById('metric-cards-container');

const metricCards = new MetricCards(container, {
  metrics: metrics,
  showCheckboxes: true,
  showIcons: true,
  cardWidth: '180px',
  cardMinWidth: '150px',
  cardMaxWidth: '200px',
  valueFontSize: '30px',
  labelFontSize: '14px',
  countFontSize: '12px',
  onCheckboxChange: function(metricId, isChecked, metric) {
    console.log(`Checkbox ${metricId} is now ${isChecked ? 'checked' : 'unchecked'}`);
  },
  onCardClick: function(metricId, metric, event) {
    console.log(`Card ${metricId} was clicked`);
  },
  onSelectionChange: function(selectedIds, selectedMetrics) {
    console.log('Selected metrics:', selectedIds);
    // Apply filters based on selection
  }
});

metricCards.render();
```

## API

### `constructor(containerElement, options)`

Creates a new instance of the `MetricCards` component.

*   `containerElement` (`HTMLElement`): The DOM element where the component will be rendered. **Required.**
*   `options` (`object`): Configuration options for the component.

#### Options

*   `metrics` (`Array<object>`): Array of metric objects. **Required.**
    *   `id` (`string`): Unique identifier for the metric.
    *   `label` (`string`): Display label for the metric.
    *   `value` (`number`): Large number value to display.
    *   `valueSuffix` (`string`): Suffix for the value (e.g., '%').
    *   `count` (`number`): Count value to display.
    *   `countLabel` (`string`): Label for count (singular).
    *   `countLabelPlural` (`string`): Label for count (plural).
    *   `icon` (`HTMLElement`): DOM element for the icon. **Required.**
    *   `color` (`string`): Optional color for the card.
    *   `selected` (`boolean`): Initial selection state.

*   `showCheckboxes` (`boolean`, default: `true`): Show/hide checkboxes.
*   `showIcons` (`boolean`, default: `true`): Show/hide icons.
*   `allowMultipleSelection` (`boolean`, default: `true`): Allow selecting multiple cards.
*   `showSelectAllActions` (`boolean`, default: `true`): Show "Select All" and "Clear All" links.

*   `onCheckboxChange` (`function`): Callback when checkbox state changes.
    *   Parameters: `(metricId, isChecked, metric)`
*   `onCardClick` (`function`): Callback when a card is clicked.
    *   Parameters: `(metricId, metric, event)`
*   `onSelectionChange` (`function`): Callback when overall selection changes.
    *   Parameters: `(selectedIds, selectedMetrics)`

*   `cardWidth` (`string`, default: `'180px'`): Width of each card.
*   `cardMinWidth` (`string`, default: `'150px'`): Minimum width of each card.
*   `cardMaxWidth` (`string`, default: `'200px'`): Maximum width of each card.
*   `gap` (`string`, default: `'20px'`): Space between cards.
*   `className` (`string`): Additional CSS class for container.

*   `valueFontSize` (`string`, default: `'30px'`): Font size for the large value.
*   `valueSuffixFontSize` (`string`, default: `'.7em'`): Font size for the value suffix.
*   `labelFontSize` (`string`, default: `'14px'`): Font size for the label.
*   `countFontSize` (`string`, default: `'12px'`): Font size for the count.
*   `actionLinkFontSize` (`string`, default: `'0.9em'`): Font size for action links.

*   `selectAllText` (`string`, default: `'Select All'`): Text for "Select All" link.
*   `clearAllText` (`string`, default: `'Clear All'`): Text for "Clear All" link.

### Methods

*   `render()`: Renders the component into the parent element.
*   `updateMetrics(newMetrics)`: Updates the metrics data and re-renders the component.
*   `getSelectedMetrics()`: Returns array of selected metric objects.
*   `getSelectedIds()`: Returns array of selected metric IDs.
*   `setSelectedIds(ids)`: Sets selected metrics by ID array.
*   `selectAll()`: Selects all metrics.
*   `clearAll()`: Clears all selections.
*   `setMetricEnabled(id, enabled)`: Enables or disables a metric card.
*   `updateMetric(id, newData)`: Updates a single metric's data.
*   `setCheckboxesVisible(visible)`: Shows or hides checkboxes.
*   `setIconsVisible(visible)`: Shows or hides icons.
*   `setCardDimensions(width, minWidth, maxWidth)`: Updates card dimensions.
*   `setFontSizes(sizes)`: Updates font sizes.
*   `cleanup()`: Removes the component and cleans up resources.

## Implementation Details

*   **CSS Injection:** The component injects its own styles into the document's `<head>` when the first instance is created.
*   **Vanilla JavaScript:** Built using plain JavaScript classes and DOM manipulation.
*   **Flexible Layout:** Uses flexbox for responsive card layout with configurable spacing.
*   **Event Handling:** Manages checkbox changes and card clicks with separate callbacks.
*   **Dynamic Updates:** Supports updating metrics, styling, and visibility after initialization.

## Files in this Directory

*   `index.js`: Entry point for the component, exports the `MetricCards` class.
*   `metric-cards.js`: Contains the main `MetricCards` class logic.
*   `metric-cards.styles.js`: Exports the component's CSS as a JavaScript string.
*   `constants.js`: Defines CSS class names and default values.
*   `README.md`: This file.
