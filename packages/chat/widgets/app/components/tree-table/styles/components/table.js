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

let variables=require("../base/variables"),table={columns:`
        .tree-table th[data-column="selection"],
        .tree-table td[data-column="selection"] {
            width: 20px;
            text-align: center;
            padding: 0;
        }

        .tree-table th:first-child,
        .tree-table td:first-child {
            width: var(--column-width-1);
            overflow: hidden;
            white-space: nowrap;
        }

        .tree-table th:nth-child(2),
        .tree-table td:nth-child(2) {
            width: var(--column-width-2);
            white-space: nowrap;
        }

        .tree-table th:nth-child(3),
        .tree-table td:nth-child(3) {
            width: var(--column-width-3);
            white-space: nowrap;
        }

        .tree-table th:nth-child(4),
        .tree-table td:nth-child(4) {
            width: var(--column-width-4);
            white-space: nowrap;
        }

        .tree-table th:nth-child(5),
        .tree-table td:nth-child(5) {
            width: var(--column-width-5);
            white-space: nowrap;
        }
    `,cells:`
        .tree-table th,
        .tree-table td {
            padding: 6px ${variables.spacing.sm};
        }

        .tree-table th {
            text-align: left;
            font-weight: 600;
            color: ${variables.colors.text};
            border-bottom: 1px solid ${variables.colors.borderDark};
        }
    `,toggleButtonColumn:`
        .tree-table th[data-column="toggle_button"],
        .tree-table td[data-column="toggle_button"] {
            width: 26px;
            text-align: center;
            padding: 0;
        }

        .tree-table td[data-column="toggle_button"] .expand-button {
            margin-right: 0;
        }
    `};module.exports=table;
