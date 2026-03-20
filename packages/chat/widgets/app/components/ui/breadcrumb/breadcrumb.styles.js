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
