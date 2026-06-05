<!--
Component: Batch Review Browser - README
Block-UUID: e7288ea3-eb49-4c38-8c6f-98f6e46c7771
Parent-UUID: N/A
Version: 1.0.0
Description: README documentation for the BatchReviewBrowser component, including data structures and usage examples.
Language: markdown
Created-at: 2025-11-24T19:21:24.297Z
Authors: GLM-4.6 (v1.0.0)
-->


# BatchReviewBrowser README

## Overview

The BatchReviewBrowser is a component that allows users to review the contents of a batch before launching analysis. It provides a tree browser for navigation and a preview panel for viewing file contents.

## Data Structure

### Batch Object

```javascript
{
    id: number,                    // Sequential batch ID (1, 2, 3...)
    fileIds: array,               // Array of file IDs to analyze
    referenceFileIds: array,      // Array of reference file IDs
    status: string,               // 'pending', 'running', 'completed', 'failed', 'cancelled'
    attempts: array,              // Analysis attempt history
    startedAt: string,            // When batch was started
    finishedAt: string,           // When batch was completed
    results: object               // Analysis results (when completed)
}
```

### File Object

```javascript
{
    id: string,                   // Unique identifier for the file
    name: string,                 // File name (e.g., "app.js")
    path: string,                 // Full path within repository
    language: string,             // Programming language
    size: number,                 // File size in bytes
    tokens: number,               // Estimated token count
    content: string,              // File content (optional, will be loaded if not provided)
    created_at: string            // Creation timestamp
}
```

## Usage

### Basic Usage

```javascript
const { BatchReviewBrowser } = require('./BatchReviewBrowser');

// Create a new BatchReviewBrowser instance
const batchReviewBrowser = new BatchReviewBrowser(context, {
    batch: batchObject,           // Required: Batch object to review
    referenceFiles: [...],       // Required: Array of reference file objects
    filesToAnalyze: [...],       // Required: Array of file objects to analyze
    chatApi: chatApi,            // Required: API for fetching file content
    onClose: () => {             // Optional: Callback when browser is closed
        console.log('BatchReviewBrowser closed');
    }
});

// Show the browser
batchReviewBrowser.show();
```

### Integration with AnalyzeBatchBuilder

```javascript
// In BatchAnalysisSection/index.js

// Add a review column to the batch table
_createReviewIcon(batch) {
    const reviewIcon = DomUtils.h.createDiv({
        cls: 'abb-review-icon',
        style: { cursor: 'pointer' },
        title: 'Review batch contents'
    });
    
    // Add eye icon
    const eyeIcon = SVGUtils.eye({ style: { width: '16px', height: '16px' } });
    reviewIcon.appendChild(eyeIcon);
    
    // Add click handler
    reviewIcon.addEventListener('click', () => {
        this._handleReviewClick(batch);
    });
    
    return reviewIcon;
}

// Handle review icon click
_handleReviewClick(batch) {
    // Get file objects from sections
    const referenceFiles = this.referenceFilesSection.state.items.map(id => 
        this._getFileObject(id)
    );
    
    const filesToAnalyze = batch.fileIds.map(id => 
        this._getFileObject(id)
    );
    
    // Create and show browser
    this.batchReviewBrowser = new BatchReviewBrowser(this.context, {
        batch: batch,
        referenceFiles: referenceFiles,
        filesToAnalyze: filesToAnalyze,
        chatApi: this.chatApi,
        onClose: () => {
            this.batchReviewBrowser = null;
        }
    });
    
    this.batchReviewBrowser.show();
}
```

## File Structure

```
BatchReviewBrowser/
├── index.js                    # Main component orchestrator
├── components/
│   ├── Browser.js             # Tree browser (reused from ChatContextBrowser)
│   └── PreviewPanel.js        # Simplified preview panel
├── utils/
│   └── buildBatchTree.js      # Utility to build batch tree structure
└── constants.js               # Constants specific to BatchReviewBrowser
```

## Features

### Tree Browser (Left Panel)
- Hierarchical navigation of batch contents
- Expandable/collapsible nodes
- Visual distinction between different node types

### Preview Panel (Right Panel)
- **Home View**: Tabs for reference files and files to analyze
  - Table view of files with name, path, and token count
  - Click on files to view their content
- **File View**: Individual file content with syntax highlighting
  - File metadata display
  - Content loaded via chatApi

## Console Logging

The BatchReviewBrowser logs initialization data for verification:

```javascript
console.log('BatchReviewBrowser initialized with:', {
    batch: this.batch,
    referenceFilesCount: this.referenceFiles.length,
    filesToAnalyzeCount: this.filesToAnalyze.length
});
```

## Error Handling

- Handles missing file content gracefully
- Shows error messages when content cannot be loaded
- Provides empty state displays when no data is available

## Dependencies

- `@gitsense/gsc-utils` - For DOM utilities and chat API
- `../ui/prompt-box` - For modal display
- `../ui/breadcrumb` - For breadcrumb navigation
- `../tree-table/TreeTable` - For tree browser display

## Next Steps

Phase 2 will focus on:
- Enhanced file content display with syntax highlighting
- Improved table formatting and sorting
- Batch-specific metrics and statistics
- File filtering and search functionality



Authored by LLM GLM-4.6 at Mon, 24 Nov 2025 19:20:25 GMT
