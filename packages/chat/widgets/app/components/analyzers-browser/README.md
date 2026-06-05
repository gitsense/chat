<!--
Component: AnalyzersBrowser - README
Block-UUID: 5e43b980-c61d-41a3-a49c-9298bf8df213
Parent-UUID: N/A
Version: 1.1.0
Description: Documentation for the AnalyzersBrowser component with mode-based functionality and tag-based filtering.
Language: Markdown
Created-at: 2025-11-25T17:17:03.216Z
Authors: GLM-4.6 (v1.0.0), GLM-4.6 (v1.1.0)
-->


# Analyzers Browser Component

A flexible, modal-based browser component for selecting and viewing analyzers in GitSense Chat. The component supports multiple interaction modes, making it reusable across different contexts.

## Features

- **Mode-based Operation**: Supports three distinct modes for different use cases
- **Tag-based Filtering**: Filter analyzers by tags with multi-selection capability
- **Responsive Design**: Full-screen modal with resizable panels
- **Search & Filter**: Real-time filtering of analyzers by ID, label, or description
- **Pagination**: Configurable pagination for large analyzer lists
- **Analyzer Details**: Detailed view with metrics, schema, and recent analysis history
- **Selection Management**: Built-in selection state management with validation

## Browser Modes

The AnalyzersBrowser supports three distinct modes that control its appearance and behavior:

### VIEW Mode (Default)
- **Purpose**: Read-only browsing of analyzers
- **UI Elements**: No selection controls, shows delete actions for non-protected analyzers
- **Use Case**: Documentation, help systems, or reference browsing
- **Example**:
\```javascript
const browser = new AnalyzersBrowser(analyzers, api, {
  mode: BROWSER_MODES.VIEW
});
\```

### MULTI Mode
- **Purpose**: Select multiple analyzers simultaneously
- **UI Elements**: Checkboxes, bulk actions (Select All/Clear), confirm button with count
- **Use Case**: Batch operations, metadata insights, bulk analysis
- **Example**:
\```javascript
const browser = new AnalyzersBrowser(analyzers, api, {
  mode: BROWSER_MODES.MULTI,
  onConfirm: (selectedAnalyzers) => {
    console.log(`Selected ${selectedAnalyzers.length} analyzers`);
  }
});
\```

### SINGLE Mode
- **Purpose**: Select exactly one analyzer
- **UI Elements**: Radio buttons, simplified confirm button
- **Use Case**: Tool configuration, analyzer selection for batch builder
- **Example**:
\```javascript
const browser = new AnalyzersBrowser(analyzers, api, {
  mode: BROWSER_MODES.SINGLE,
  onConfirm: (selectedAnalyzer) => {
    console.log(`Selected analyzer: ${selectedAnalyzer.id}`);
  }
});
\```

## Tag-based Filtering

The left panel of the AnalyzersBrowser provides a powerful tag-based filtering system that allows users to quickly find analyzers by their characteristics:

### Features
- **Tag Extraction**: Automatically extracts all unique tags from analyzers
- **Tag Counting**: Shows the number of analyzers associated with each tag
- **Multi-Selection**: Select multiple tags to filter analyzers that match ALL selected tags
- **Search**: Filter tags by name to quickly find specific tags
- **Select All/Clear All**: Bulk actions for tag selection

### Usage
1. **Filter by Tags**: Select one or more tags in the left panel to filter analyzers
2. **Combine Tags**: Select multiple tags to find analyzers that have all selected tags
3. **Search Tags**: Use the search input to find specific tags
4. **Clear Selection**: Use "Clear All" to remove all tag filters

### Example
\```javascript
// The TagsPanel automatically processes analyzer tags
// No additional configuration needed - it works with the standard analyzer format
const browser = new AnalyzersBrowser(analyzers, api);
browser.show();
\```

## API Reference

### Constructor

\```javascript
new AnalyzersBrowser(analyzers, analyzersApi, options)
\```

#### Parameters

- **analyzers** (Array<object>): List of available analyzers
- **analyzersApi** (object): API object for analyzer interactions
- **options** (object, optional): Configuration options

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| mode | string | 'view' | Browser mode: 'view', 'multi', or 'single' |
| onClose | function | null | Callback when modal is closed |
| onNewAnalyzer | function | null | Callback when 'New Analyzer' is requested |
| selectionMode | boolean | false | Enable selection features |
| onSelectionChange | function | null | Callback when selection changes |
| onConfirm | function | null | Callback when selection is confirmed |
| preSelectedAnalyzers | Array<object> | [] | Pre-selected analyzers |

### Methods

#### show()
Displays the browser modal.

\```javascript
browser.show();
\```

#### destroy()
Cleans up the browser and removes it from DOM.

\```javascript
browser.destroy();
\```

#### getSelectedAnalyzers()
Returns the current selection as analyzer objects.

\```javascript
const selected = browser.getSelectedAnalyzers();
\```

#### getSelectedAnalyzerIds()
Returns the current selection as analyzer IDs.

\```javascript
const selectedIds = browser.getSelectedAnalyzerIds();
\```

## Usage Examples

### Basic View Mode (Default)
\```javascript
const { AnalyzersBrowser } = require('./analyzers-browser');

const browser = new AnalyzersBrowser(analyzersList, analyzersApi);
browser.show();
\```

### Single Selection Mode
\```javascript
const { AnalyzersBrowser, BROWSER_MODES } = require('./analyzers-browser');

const browser = new AnalyzersBrowser(analyzersList, analyzersApi, {
  mode: BROWSER_MODES.SINGLE,
  onConfirm: (selectedAnalyzer) => {
    // Handle single analyzer selection
    console.log('Selected:', selectedAnalyzer.id);
    browser.destroy();
  }
});
browser.show();
\```

### Multi-Selection Mode
\```javascript
const { AnalyzersBrowser, BROWSER_MODES } = require('./analyzers-browser');

const browser = new AnalyzersBrowser(analyzersList, analyzersApi, {
  mode: BROWSER_MODES.MULTI,
  onConfirm: (selectedAnalyzers) => {
    // Handle multiple analyzer selection
    console.log(`Selected ${selectedAnalyzers.length} analyzers`);
    selectedAnalyzers.forEach(analyzer => {
      console.log('-', analyzer.id);
    });
    browser.destroy();
  }
});
browser.show();
\```

### With Pre-selected Analyzers
\```javascript
const browser = new AnalyzersBrowser(analyzersList, analyzersApi, {
  mode: BROWSER_MODES.MULTI,
  preSelectedAnalyzers: [analyzersList[0], analyzersList[2]],
  onConfirm: (selectedAnalyzers) => {
    console.log('Confirmed selection:', selectedAnalyzers);
  }
});
\```

## Component Structure

\```
analyzers-browser/
├── index.js                    # Main entry point
├── constants.js                # Browser modes and constants
├── components/
│   ├── TagsPanel/              # Tag-based filtering panel
│   │   ├── index.js            # Entry point
│   │   ├── TagsPanel.js        # Main panel component
│   │   └── TagsTable.js        # Table for displaying tags
│   └── PreviewPanel/
│       ├── index.js            # Preview panel orchestrator
│       ├── HomeView.js         # Home view with table
│       ├── AnalyzersTable.js   # Analyzer table component
│       └── AnalyzerDetailView.js # Detailed analyzer view
└── utils/
    ├── extractTags.js          # Utility to extract and count tags
    ├── SelectionManager.js     # Selection state management
    └── ...
\```

## Integration with AnalyzeBatchBuilder

The SINGLE mode is specifically designed for integration with the AnalyzeBatchBuilder component:

\```javascript
// In AnalyzeBatchBuilder's Selection component
_handleSelectAnalyzer() {
  const browser = new AnalyzersBrowser(this.analyzers, this.analyzersApi, {
    mode: BROWSER_MODES.SINGLE,
    onConfirm: (analyzer) => {
      this.setState({ selectedAnalyzer: analyzer });
      this._handleSaveAnalyzer();
    }
  });
  browser.show();
}
\```

## Browser Modes Reference

### Mode Constants
\```javascript
const { BROWSER_MODES } = require('./constants');

// Available modes:
BROWSER_MODES.VIEW    // 'view' - Read-only browsing
BROWSER_MODES.MULTI   // 'multi' - Multiple selection
BROWSER_MODES.SINGLE  // 'single' - Single selection
\```

### Mode Behavior Comparison

| Feature | VIEW Mode | MULTI Mode | SINGLE Mode |
|---------|-----------|------------|-------------|
| Selection UI | None | Checkboxes | Radio buttons |
| Bulk Actions | None | Select All/Clear | None |
| Delete Actions | Visible | Hidden | Hidden |
| Confirm Button | None | "Confirm Selection (n)" | "Confirm Selections" |
| New Analyzer Button | Visible | Hidden | Hidden |

## Styling

The component uses GitSense's standard CSS classes and can be customized through:

- `.gsc-analyzer-browser-modal` - Main modal container
- `.gsc-ab-tags-panel` - Left panel tags browser
- `.gsc-ab-preview-area` - Right panel preview area
- Standard table classes for the analyzer list

## Dependencies

- `@gitsense/gsc-utils` - Core utilities and DOM helpers
- `../ui/*` - UI components (PromptBox, Table, Pagination, etc.)

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When extending the AnalyzersBrowser:

1. Maintain backward compatibility with existing modes
2. Add new modes to `BROWSER_MODES` constant
3. Update mode-specific behavior in affected components
4. Document new mode behavior in this README
5. For tag-related changes, update the `extractTags` utility if needed
