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

let variables=require("../base/variables"),common=require("../base/common"),table=require("../components/table"),treeNode=require("../components/treeNode"),rowActions=require("../components/rowActions"),pagination=require("../components/pagination"),indicators=require("../components/indicators"),selectionManagement=require("../components/selectionManagement"),mainTable={...common,...table,...treeNode,...rowActions,...pagination,...indicators,table:(e=14)=>`
        ${common.table(e)}
        .tree-table {
            margin: ${variables.spacing.xl} 0;
        }

        .tree-table tbody tr:hover {
            background-color: ${variables.colors.backgroundHover};
        }
    `,cells:`
        ${table.cells}
    `,treeNode:`
        ${treeNode.treeNode}
    `,expandButton:`
        ${rowActions.expandButton}
    `,latestChildIcon:`
        ${rowActions.latestChildIcon}
    `,pagination:`
        ${pagination.pagination}
    `,currentNode:`
        ${indicators.currentNode}
    `,groupSeparator:`
        ${indicators.groupSeparator}
    `,toggleButtonColumn:`
        ${table.toggleButtonColumn}
    `};module.exports=mainTable;
