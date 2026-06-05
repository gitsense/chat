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

let breadcrumbStyles=`
    /* Base styles for the breadcrumb container */
    .gsc-breadcrumb-container {
        font-family: sans-serif;
        /* Allow for custom inline styles to override these */
    }

    /* Style for the breadcrumb list (ordered list) */
    .gsc-breadcrumb-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap; /* Allow wrapping on small screens if needed */
    }

    /* Style for individual breadcrumb items */
    .gsc-breadcrumb-item {
        display: flex;
        align-items: center;
    }

    /* Style for the active breadcrumb item */
    .gsc-breadcrumb-item.gsc-breadcrumb-item-active {
        font-weight: bold;
    }

    /* Style for separators */
    .gsc-breadcrumb-separator {
        padding: 0 8px;
        color: #666; /* Default muted color for separators */
    }
`;module.exports=breadcrumbStyles;
