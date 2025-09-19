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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let tableStyles=`
    /* CSS Variables for easy customization */
    .gsc-table-wrapper {
        --gsc-table-body-max-height: 300px; /* Default max height for scrollable body */
        --gsc-scrollbar-width: 17px; /* Default scrollbar width for alignment */
        --gsc-table-border-color: #ddd;
        --gsc-table-header-bg: #f8f8f8;
        --gsc-table-header-color: #333;
        --gsc-table-row-hover-bg: #f5f5f5;
        --gsc-table-cell-padding: 8px;
        --gsc-table-font-size: 0.9em;
        --gsc-table-text-color: #555;
    }

    .gsc-table-wrapper {
        position: relative;
        overflow: hidden; /* Ensures no overflow from fixed header */
        border: 1px solid var(--gsc-table-border-color);
        border-radius: 4px;
        font-family: sans-serif;
        font-size: var(--gsc-table-font-size);
        color: var(--gsc-table-text-color);
    }

    .gsc-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed; /* Crucial for fixed column widths */
        margin: 0px;
    }

    .gsc-table-header {
        display: block; /* Makes the thead a block element */
        background-color: var(--gsc-table-header-bg);
        color: var(--gsc-table-header-color);
        font-weight: bold;
    }

    .gsc-table-header tr {
        display: table; /* Makes the header row behave like a table row */
        width: calc(100% - var(--gsc-scrollbar-width)); /* Account for scrollbar width */
        table-layout: fixed;
    }

    .gsc-table-header th {
        padding: var(--gsc-table-cell-padding);
        text-align: left;
        /* No right border here, handled by cells */
    }

    .gsc-table-body {
        display: block; /* Makes the tbody a block element, enabling scrolling */
        max-height: var(--gsc-table-body-max-height); /* Configurable scrollable height */
        overflow-y: auto; /* Add vertical scrollbar when content overflows */
        overflow-x: hidden; /* Hide horizontal scrollbar */
    }

    .gsc-table-body tr {
        display: table; /* Makes body rows behave like table rows */
        width: 100%; /* Fill available width */
        table-layout: fixed;
    }

    .gsc-table-body tr:last-child {
    }

    .gsc-table-body tr:hover {
        background-color: var(--gsc-table-row-hover-bg);
    }

    .gsc-table-body td {
        padding: var(--gsc-table-cell-padding);
        text-align: left;
        vertical-align: top;
        /* No borders here, handled by rows */
        white-space: nowrap; /* Prevent text wrapping */
        overflow: hidden; /* Hide overflow if text is too long */
        text-overflow: ellipsis; /* Add ellipsis for truncated text */
    }

    /* Empty message styling */
    .gsc-table-empty-message {
        text-align: center;
        padding: 10px;
        color: #888;
        font-style: italic;
    }
`;module.exports=tableStyles;
