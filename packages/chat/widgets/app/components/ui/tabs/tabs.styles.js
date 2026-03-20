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

let tabsStyles=`
    /* Base styles for the tabs container */
    .gsc-tabs-container {
        display: flex;
        /* Orientation will be handled by adding 'gsc-tabs-container-vertical' class if needed */
        /* Default to horizontal */
        flex-direction: row;
        align-items: flex-end; /* Aligns tabs to the bottom, making border positioning easier */
        border-bottom: 1px solid #eee; /* Optional subtle bottom border for the whole bar */
        font-family: sans-serif;
        margin-bottom: 10px; /* Space below the tabs */
    }

    /* Vertical orientation modifier */
    .gsc-tabs-container.gsc-tabs-container-vertical {
        flex-direction: column;
        align-items: stretch; /* Stretch tabs to fill container width */
        border-bottom: none;
        border-right: 1px solid #eee; /* Subtle right border instead */
        margin-bottom: 0;
        margin-right: 10px; /* Space to the right of the tabs */
    }

    /* Base style for individual tab buttons */
    .gsc-tab-button {
        background-color: transparent;
        border: none;
        padding: 8px 15px;
        margin-right: 5px;
        cursor: pointer;
        outline: none;
        /* Default transparent bottom border */
        border-bottom: 2px solid transparent;
        margin-bottom: -1px; /* Pulls the button down onto the container's border-bottom */
        transition: border-color 0.2s ease;
        font-size: 1.05em; /* Inherit or set a base font size */
        color: #333;
        position: relative; /* Needed for z-index */
        z-index: 1; /* Sit above the container's border */
    }

    /* Active tab style */
    .gsc-tab-button.gsc-tab-button-active {
        border-bottom: 2px solid #ff7f0e; /* GitSense orange active color */
        color: #000;
        font-weight: bold;
    }

    /* Hover effect for inactive, enabled tabs */
    .gsc-tab-button:not(.gsc-tab-button-active):not(.gsc-tab-button-disabled):hover {
        border-bottom: 2px solid #999; /* Default hover color */
    }

    /* Disabled tab style */
    .gsc-tab-button.gsc-tab-button-disabled {
        cursor: not-allowed;
        color: #999;
        opacity: 0.6;
    }

    /* Optional content area styling (if component manages it) */
    .gsc-tab-content-area {
        padding: 15px 0;
    }
`;module.exports=tabsStyles;
