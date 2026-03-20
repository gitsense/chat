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

let variables=require("../base/variables"),indicators={currentNode:`
        .current-node-indicator {
            width: 20px;
            text-align: center;
            padding: 2px;
            color: ${variables.colors.primary};
            font-size: ${variables.fonts.size.small};
        }

        .node-name[data-current="true"] {
            font-weight: 600; // Bold for current node
        }
    `,groupSeparator:`
        .group-separator {
            font-weight: bold;
        }

        .group-separator td {
            padding: ${variables.spacing.xxl} 0px ${variables.spacing.sm} ${variables.spacing.xl};
            text-align: left;
            border-bottom: 1px solid ${variables.colors.borderDark};
        }

        .group-separator td:hover {
            background-color: white;
        }
    `};module.exports=indicators;
