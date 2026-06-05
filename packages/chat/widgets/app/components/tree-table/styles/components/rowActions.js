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

let variables=require("../base/variables"),rowActions={expandButton:`
        .expand-button {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            min-width: 16px;
            min-height: 16px;
            margin-right: 3px;
            transition: transform 0.15s ease;
        }

        .expand-button:hover {
            opacity: 0.8;
        }

        .expand-button svg {
            fill: ${variables.colors.text};
            width: 16px;
            height: 16px;
        }

        .expand-button[data-state="expanded"] svg {
            fill: ${variables.colors.text};
        }
    `,latestChildIcon:`
        .expand-to-latest-icon {
            cursor: pointer;
            font-size: ${variables.fonts.size.xlarge};
            color: ${variables.colors.primary};
            transition: color 0.2s;
            opacity: 0; /* Hide by default */
        }

        .tree-table tr:hover .expand-to-latest-icon {
            opacity: 1; /* Show on hover */
        }

        .expand-to-latest-icon:hover {
            color: ${variables.colors.primaryHover};
        }

        /* Hide icon for nodes without children */
        .tree-table tr[data-has-children="false"] .expand-to-latest-icon {
            display: none;
        }
    `,kebabMenu:`
        /* Base style for the kebab menu trigger - hidden by default */
        .tree-table .kebab-menu-trigger {
            display: none;
            cursor: pointer;
            /* Ensure the SVG is centered and sized correctly */
            width: 16px;
            height: 16px;
            /* Add a transition for smooth appearance/disappearance if needed */
            transition: opacity 0.2s;
            opacity: 0.6; /* Slightly transparent by default */
        }

        /* Show the kebab menu trigger only when the row is hovered */
        .tree-table tbody tr:hover .kebab-menu-trigger {
            display: inline-block;
        }

        /* Rotate the kebab SVG 90 degrees to make it vertical */
        .tree-table .kebab-menu-trigger svg {
            transform: rotate(90deg);
        }
    `};module.exports=rowActions;
