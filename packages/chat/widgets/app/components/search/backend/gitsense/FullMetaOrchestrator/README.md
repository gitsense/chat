<!--
Component: FullMetaOrchestrator README
Block-UUID: ae5b652e-878e-477b-a4bf-70df7b7cc754
Parent-UUID: N/A
Version: 1.0.0
Description: Documentation for the FullMetaOrchestrator module implementing the 'full-meta:' search filter.
Language: Markdown
Created-at: 2025-10-30T23:27:56.558Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.0.0)
-->


# FullMetaOrchestrator

This directory contains the implementation for the GitSense Chat `full-meta:` search filter feature. This feature enables cross-analyzer metadata queries by preprocessing the `full-meta:` syntax in `backend/gitsense/index.js` and orchestrating multiple standard search pipeline executions.

## Overview

The `full-meta:` filter allows users to define metadata search conditions (`profile:meta-search`) or insight fields (`profile:meta-insights`) that span multiple LLM analyzers within a single query. This overcomes the limitation of the standard syntax which ties conditions to a single global `analyzer:<id>` filter.

**Example Queries:**

*   **Meta-Search:** `profile:meta-search full-meta:analyzer1|has_spelling_mistakes|boolean=true full-meta:analyzer2|state|string=open`
    *   Finds items where *analyzer1* marked `has_spelling_mistakes` as true AND *analyzer2* marked `state` as "open".
*   **Meta-Insights:** `profile:meta-insights full-meta:analyzer1|language|string full-meta:analyzer2|issue_type|string`
    *   Generates separate insight counts for `language` (from *analyzer1*) and `issue_type` (from *analyzer2*).

## Implementation Structure

The orchestrator is designed to minimize changes to the core search components (`SearchParser`, `SearchBuilder`, `SearchExecutor`). It handles the complexity of `full-meta:` by breaking it down and reusing the existing pipeline.


```
FullMetaOrchestrator/
├── index.js                          # Main orchestrator class
├── shared/
│   ├── FullMetaQueryProcessor.js     # Parsing, grouping, sub-query generation
│   ├── FullMetaErrorHandler.js       # Centralized error handling
│   └── constants.js                  # Shared constants (e.g., delimiter)
├── metaSearch/
│   ├── MetaSearchExecutor.js         # Orchestrates multi-pass filtering for meta-search
│   └── MetaSearchResultProcessor.js # Merges results for meta-search
└── metaInsights/
    ├── MetaInsightsExecutor.js       # Orchestrates independent queries for meta-insights
    └── MetaInsightsResultProcessor.js # Merges and formats results for meta-insights
```

### Components

*   **`index.js`**: The main `FullMetaOrchestrator` class. It's instantiated by `backend/gitsense/index.js` and routes the query to the appropriate profile-specific executor.
*   **`shared/FullMetaQueryProcessor.js`**:
    *   Parses the `full-meta:` syntax (`<analyzer-id>|<field>|<type><operator><value>`).
    *   Groups parsed filters by `analyzer-id`.
    *   Generates standard query strings for the core pipeline for each analyzer group.
*   **`shared/FullMetaErrorHandler.js`**: Provides consistent error creation and formatting for `full-meta:` related issues.
*   **`shared/constants.js`**: Defines shared values like the `FULL_META_DELIMITER` (`|`).
*   **`metaSearch/`**:
    *   **`MetaSearchExecutor.js`**: Handles `profile:meta-search`. It executes sequential standard queries, using the `chat-id`s from one pass to filter the next, achieving an intersection of results.
    *   **`MetaSearchResultProcessor.js`**: Merges the results from the sequential passes, ensuring only items matching *all* `full-meta:` conditions are returned.
*   **`metaInsights/`**:
    *   **`MetaInsightsExecutor.js`**: Handles `profile:meta-insights`. It executes independent standard insight queries for each analyzer group derived from the `full-meta:` filters.
    *   **`MetaInsightsResultProcessor.js`**: Merges the results from the independent queries, formatting them into distinct insight data blocks keyed by `analyzer|field|type`.

This structure encapsulates all `full-meta:` logic, keeping the core search backend clean and facilitating future extensions or modifications to this specific feature.
