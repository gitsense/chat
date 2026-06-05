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
