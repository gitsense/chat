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
