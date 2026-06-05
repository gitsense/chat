<!--
Component: Manifest Builder - README
Block-UUID: 7a9c8d3e-5f6a-4e8b-9c2d-4e5f6a7b8c9d
Parent-UUID: b52a1fbb-3287-4dd5-824d-e581bafd225b
Version: 1.1.0
Description: Documentation for the Manifest Builder component, including installation, usage, API reference, and examples.
Language: Markdown
Created-at: 2026-02-01T06:18:21.554Z
Authors: GLM-4.7 (v1.0.0), GLM-4.7 (v1.1.0)
-->


# Manifest Builder

A reusable UI component for creating and downloading GitSense manifest files from markdown-formatted analysis results.

## Overview

The Manifest Builder provides a modal interface that allows users to:
- Convert markdown analysis results into standardized JSON manifests
- Provide manifest metadata (name, database name, description, tags)
- Get AI assistance for generating descriptions and tags
- Download manifests as JSON files for import via `gsc manifest import`

## Installation

```bash
npm install @gitsense/gsc-ui
```

## Quick Start

```javascript
const { ManifestBuilder } = require('@gitsense/gsc-ui/manifest-builder');

// Create and show the modal
const builder = new ManifestBuilder();
builder.show({
    markdown: analysisResultsMarkdown,
    context: renderingContext,
    onDownload: (manifest, filename) => {
        console.log('Manifest downloaded:', filename);
    },
    onClose: () => {
        console.log('Modal closed');
    }
});
```

## Features

- **Smart Auto-Generation**: Automatically generates database names and filenames from the manifest name
- **User Edit Tracking**: Respects manual edits and provides reset buttons to revert to auto-generated values
- **AI Assistance**: Creates a new chat with context to help generate descriptions and tags
- **Model Selection**: Allows users to select which AI model to use for assistance (defaults to current chat model)
- **Form Validation**: Validates all inputs before allowing download
- **Static Methods**: Provides programmatic access to manifest building and downloading
- **Responsive Design**: Works well on different screen sizes

## Usage

### As a Modal Component

```javascript
const { ManifestBuilder } = require('@gitsense/gsc-ui/manifest-builder');

const builder = new ManifestBuilder({
    width: '600px',
    height: 'auto',
    maxHeight: '80vh',
    zIndex: 100000000000
});

builder.show({
    markdown: markdownContent,
    context: {
        chat: chatObject,
        widget: widgetObject,
        settings: settingsObject
    },
    onDownload: (manifest, filename) => {
        // Handle download completion
    },
    onClose: () => {
        // Handle modal close
    }
});
```

### Programmatic Usage (Static Methods)

```javascript
const { buildManifest, downloadManifest } = require('@gitsense/gsc-ui/manifest-builder');

// Build manifest from markdown
const manifest = buildManifest(markdownContent, {
    name: 'Security Analysis',
    database_name: 'security',
    description: 'Security analysis of payment system backend code',
    tags: ['security', 'javascript', 'payment']
});

// Download manifest
downloadManifest(manifest, 'security-20260201-143022.json');
```

### Using Utility Functions

```javascript
const {
    parseMarkdown,
    generateDisplayName,
    slugify,
    generateFilename,
    validateManifest
} = require('@gitsense/gsc-ui/manifest-builder');

// Parse markdown to structured data
const parsedData = parseMarkdown(markdownContent);

// Generate display name from field name
const displayName = generateDisplayName('violation_count'); // "Violation Count"

// Generate database name slug
const slug = slugify('Security Analysis'); // "security-analysis"

// Generate timestamped filename
const filename = generateFilename('security'); // "security-20260201-143022.json"

// Validate manifest
const validation = validateManifest(manifest);
if (!validation.valid) {
    console.error('Validation errors:', validation.errors);
}
```

## API Reference

### Constructor Options

```javascript
new ManifestBuilder(options)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | string | `'600px'` | Modal width |
| `height` | string | `'auto'` | Modal height |
| `maxHeight` | string | `'80vh'` | Modal max height |
| `zIndex` | number | `100000000000` | Modal z-index |

### show() Options

```javascript
builder.show(options)
```

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `markdown` | string | Yes | Markdown content containing manifest data |
| `context` | object | Yes | Rendering context (chat, widget, settings) |
| `onDownload` | function | No | Callback when download is triggered |
| `onClose` | function | No | Callback when modal is closed |

### Static Methods

#### `buildManifest(markdown, manifestMetadata)`

Builds a manifest object from markdown and manifest metadata.

**Parameters:**
- `markdown` (string): The markdown content containing all metadata
- `manifestMetadata` (object): Manifest-level metadata
  - `name` (string): Human-readable name
  - `database_name` (string): Database name slug
  - `description` (string): Description
  - `tags` (array): Tags array

**Returns:** Object - Manifest object conforming to the schema

#### `validateManifest(manifest)`

Validates a manifest object against the schema.

**Parameters:**
- `manifest` (object): The manifest to validate

**Returns:** Object - `{ valid: boolean, errors: Array<string> }`

#### `generateFilename(databaseName)`

Generates a timestamped filename for the manifest.

**Parameters:**
- `databaseName` (string): The database name slug

**Returns:** string - Filename (e.g., "security-20260201-143022.json")

#### `downloadManifest(manifest, filename)`

Downloads a manifest as a JSON file.

**Parameters:**
- `manifest` (object): The manifest object
- `filename` (string): The filename to save as

### Utility Functions

#### `parseMarkdown(markdown)`

Parses markdown to extract structured data.

**Parameters:**
- `markdown` (string): Markdown content

**Returns:** Object - Parsed data with repositories, branches, analyzers, fields, rows

#### `generateDisplayName(fieldName)`

Generates display name from field name (snake_case to Title Case).

**Parameters:**
- `fieldName` (string): Field name in snake_case

**Returns:** string - Display name in Title Case

#### `slugify(name)`

Generates database name slug from manifest name.

**Parameters:**
- `name` (string): Manifest name

**Returns:** string - Database name slug

#### `generateTimestamp()`

Generates ISO 8601 timestamp.

**Returns:** string - ISO 8601 timestamp

## Manifest Schema

The generated manifest follows this schema:

```json
{
  "schema_version": "1.0",
  "generated_at": "ISO 8601 timestamp",
  "manifest": {
    "name": "Human-readable name",
    "database_name": "Slug for database name",
    "description": "Description",
    "tags": ["tag1", "tag2", "tag3"]
  },
  "repositories": [
    {
      "ref": "R0",
      "name": "Repository name"
    }
  ],
  "branches": [
    {
      "ref": "B0",
      "name": "Branch name"
    }
  ],
  "analyzers": [
    {
      "ref": "A0",
      "id": "Full analyzer ID",
      "name": "Human-readable analyzer name",
      "description": "What this analyzer does",
      "version": "Analyzer version"
    }
  ],
  "fields": [
    {
      "ref": "F0",
      "analyzer_ref": "A0",
      "name": "Field name",
      "display_name": "Human-readable field name",
      "type": "number | string | boolean | array",
      "description": "What this field represents"
    }
  ],
  "data": [
    {
      "repo_ref": "R0",
      "branch_ref": "B0",
      "file_path": "Full file path",
      "language": "Programming language",
      "chat_id": "Chat ID (integer)",
      "fields": {
        "F0": "value",
        "F1": "value"
      }
    }
  ]
}
```

## Markdown Format

The component expects markdown in the following format:

```markdown
# Metadata Insights Analysis

## Repository Reference
- **R0**: Tutorial/pay-vault - Repository: Tutorial/pay-vault

## Branch Reference
- **B0**: main

## Analyzer Reference
- **A0**: security-reviewer-javascript-authorization-logic::file-content::default - Analyzes JavaScript code for authorization logic flaws

## Analyzer Metadata
- **A0**: security-reviewer-javascript-authorization-logic::file-content::default
  - Label: Security Reviewer: JavaScript Authorization Logic
  - Version: 1.0.0

## Field Reference
- **F0**: violation_count (number) - The total number of violations found. Extracted by A0.

## Data (File Metadata)
| Repo | Branch | File | Language | Chat ID | F0 |
| ------ | -------- | ------ | --------- | ------- | --- |
| R0 | B0 | production/backend/src/utils/authService.js | javascript | 97 | 0 |
```

## Validation Rules

- **Name**: 3-100 characters, required
- **Database Name**: Only lowercase letters, numbers, and hyphens, max 100 characters, required
- **Description**: Max 500 characters, optional
- **Tags**: Max 10 tags, each max 50 characters, optional

## AI Assistance

The component can create a new chat with AI assistance to help generate descriptions and tags. The AI is provided with context about:
- Selected analyzers and their descriptions
- Selected files and their languages
- The purpose of the manifest

### Using AI Assistance

To use AI assistance:
1. Locate the "Ask AI" section at the bottom of the form
2. Select a model from the dropdown (the first option is an instruction)
3. Click the "Ask" button to create a new chat with AI assistance

The user can select which AI model to use for assistance. The default is the current chat's model.

## Examples

### Example 1: Basic Usage

```javascript
const { ManifestBuilder } = require('@gitsense/gsc-ui/manifest-builder');

const builder = new ManifestBuilder();
builder.show({
    markdown: myAnalysisResults,
    context: this.context
});
```

### Example 2: With Callbacks

```javascript
const builder = new ManifestBuilder();
builder.show({
    markdown: myAnalysisResults,
    context: this.context,
    onDownload: (manifest, filename) => {
        console.log('Downloaded:', filename);
        console.log('Manifest:', manifest);
    },
    onClose: () => {
        console.log('User closed the modal');
    }
});
```

### Example 3: Programmatic Manifest Creation

```javascript
const { buildManifest, downloadManifest } = require('@gitsense/gsc-ui/manifest-builder');

const manifest = buildManifest(markdownContent, {
    name: 'Code Quality Analysis',
    database_name: 'code-quality',
    description: 'Analysis of code quality metrics across the codebase',
    tags: ['quality', 'metrics', 'analysis']
});

downloadManifest(manifest, 'code-quality-20260201-143022.json');
```

### Example 4: Custom Validation

```javascript
const { buildManifest, validateManifest } = require('@gitsense/gsc-ui/manifest-builder');

const manifest = buildManifest(markdownContent, {
    name: 'My Analysis',
    database_name: 'my-analysis',
    description: 'Description here',
    tags: ['tag1', 'tag2']
});

const validation = validateManifest(manifest);
if (!validation.valid) {
    console.error('Validation failed:', validation.errors);
    // Handle errors
} else {
    // Proceed with download
}
```

## Dependencies

- `@gitsense/gsc-utils` - For DOM utilities
- `@gitsense/gsc-ui/prompt-box` - For modal functionality
- `@gitsense/gsc-ui/notification-manager` - For notifications
