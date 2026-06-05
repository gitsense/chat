/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
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
