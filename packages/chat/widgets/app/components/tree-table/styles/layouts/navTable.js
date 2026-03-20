/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * This software is permitted for internal use and modification.
 * Copying for profit or redistribution is strictly not permitted.
 *
 * The Fair License, which formalizes these terms, will be adopted as the official license in the future.
 * Once finalized, the unminified source code will be freely available for internal use for non-
 * commercial purposes.
 *
 * This software may not be used to develop or enhance any product or service that competes
 * directly or indirectly with GitSense Chat without explicit permission.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

let variables=require("../base/variables"),common=require("../base/common"),table=require("../components/table"),treeNode=require("../components/treeNode"),rowActions=require("../components/rowActions"),selectionManagement=require("../components/selectionManagement"),navTable={...common,...table,...treeNode,...rowActions,table:(e=26)=>`
        ${common.table(e)}
        .tree-table {
            margin: ${variables.spacing.md} 0;
        }

        .tree-table tbody tr:hover {
            background-color: ${variables.colors.backgroundHover};
        }
    `,cells:`
        .tree-table th,
        .tree-table td {
            padding: 6px ${variables.spacing.sm};
        }

        .tree-table th {
            display: none;
        }
    `,treeNode:`
        ${treeNode.treeNode}
        .tree-node {
            min-width: 0;
        }

        .tree-node > .text-content {
            flex: 1; /* Allows the text content to grow and shrink */
            white-space: nowrap; /* Prevents text wrapping */
            overflow: hidden; /* Hides overflowing content */
            text-overflow: ellipsis; /* Adds ellipsis for truncated text */
        }
    `,expandButton:`
        ${rowActions.expandButton}
    `,selectionManagement:`
        ${selectionManagement.container}
        ${selectionManagement.optionsRow}
        ${selectionManagement.dropdownsRow}
        ${selectionManagement.infoRow}
        ${selectionManagement.warningRow}
        ${selectionManagement.contextBuilderModal}
        ${selectionManagement.stats}
        ${selectionManagement.loadedSelections}
        ${selectionManagement.metadataFilter}
        ${selectionManagement.metadataInsightsModal}
    `};module.exports=navTable;
