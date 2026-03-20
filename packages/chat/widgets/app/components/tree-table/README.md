<!--
Component: TreeTable Documentation
Block-UUID: ca180c44-da2e-4896-9a09-ab4574dfb12c
Parent-UUID: N/A
Version: 1.0.0
Description: Documentation for the TreeTable component, focusing on node expansion and API usage.
Language: Markdown
Created-at: 2025-10-13T01:22:14.701Z
Authors: Gemini 2.5 Flash (v1.0.0)
-->


# GitSense TreeTable Component

The TreeTable component is a JavaScript utility for rendering and managing hierarchical data (tree structures) within an HTML table, supporting features like pagination, dynamic updates, and selection management.

## Node Expansion and Traversal

The component provides several ways to navigate and expand the tree structure, ensuring users can reach any leaf node efficiently.

### 1. Manual Expansion

Nodes with children display a chevron icon (▶/▼). Clicking this icon toggles the visibility of the node's direct children.

### 2. Programmatic Path Expansion (To Any Leaf Node)

The most reliable way to ensure the path to a specific node is visible is by using the `expandToChild` method. This method automatically traverses the tree from a specified root node down to the target node, expanding all intermediate parents along the way.

| Method | Description |
| :--- | :--- |
| `expandToChild(rootNodeId, targetNodeId)` | **Expands the full path** from the `rootNodeId` down to the `targetNodeId` (which can be a leaf or any descendant). |
| `expandToLatestChild(rootNodeId)` | Expands the path leading to the node with the most recent `updated_at` timestamp within the subtree of `rootNodeId`. |
| `expandNode(nodeId)` | Expands a single node to show its direct children. |
| `expandAllNodesWithChildren()` | Expands every node in the table that has children. |

**Example: Expanding to a specific file (leaf node)**

```javascript
// Assuming '456' is the ID of a top-level chat/directory, and '999' is the ID of the target file.
treeTable.expandToChild(456, 999);
```

### 3. Lazy Loading Support

For nodes representing Git references (`git-ref`), the component supports lazy loading. When a `git-ref` node is expanded for the first time, the component uses the configured `chatApi.getGitRefChatDescendants` to fetch its children dynamically, allowing the tree to expand to arbitrary depth without loading all data upfront.

## Public API Methods

| Method | Description |
| :--- | :--- |
| `refresh()` | Re-renders the table based on the current state. |
| `destroy()` | Cleans up resources and removes the table from the DOM. |
| `goToPage(page)` | Navigates to a specific page of root nodes. |
| `showColumn(key)` / `hideColumn(key)` | Toggles the visibility of a configured column. |
| `expandNode(nodeId)` / `collapseNode(nodeId)` | Toggles the expansion state of a single node. |
| `expandToChild(rootNodeId, childNodeId)` | Expands the path to a specific descendant node. |
| `expandToLatestChild(rootNodeId)` | Expands the path to the most recently updated descendant. |
| `expandAllNodesWithChildren()` | Expands all nodes that contain children. |
| `updateData(newData)` | Replaces the entire dataset and re-renders the table. |
| `addChildrenToNode(parentNodeId, newNodes)` | Adds new nodes to an existing parent node's children array. |
| `isNodeExpanded(nodeId)` | Checks if a node is currently expanded. |
| `findNode(nodeId)` | Retrieves a node object by its ID from the internal state map. |
| `getSelectedNodes()` | Returns an array of currently selected node objects. |
| `showSelectionColumn()` / `hideSelectionColumn()` | Toggles the visibility of the selection checkbox column. |
| `updateSelectionUI()` | Forces an update of the selection management component UI. |
| `showContextBuilder(...)` | Opens the context builder modal with the specified nodes and options. |

