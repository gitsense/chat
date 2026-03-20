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

let tooltipMenuStyles=`
    /* Base styles for the tooltip menu container */
    .gsc-tooltip-menu {
        position: absolute;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        padding: 5px 0;
        min-width: 150px;
        z-index: 1000; /* Default z-index */
        display: none; /* Hidden by default */
        font-family: sans-serif;
        font-size: 0.9em;
    }

    /* Style for visible menu */
    .gsc-tooltip-menu.gsc-tooltip-menu-visible {
        display: block;
    }

    /* Style for menu options list */
    .gsc-tooltip-menu ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    /* Style for individual menu options */
    .gsc-tooltip-menu-option {
        padding: 8px 12px;
        cursor: pointer;
        color: #333;
        outline: none;
    }

    .gsc-tooltip-menu-option:hover,
    .gsc-tooltip-menu-option:focus {
        background-color: #f0f0f0;
    }
    
    /* Style for disabled menu options */
    .gsc-tooltip-menu-option-disabled {
        padding: 8px 12px;
        cursor: not-allowed;
        color: #999;
        opacity: 0.6;
        outline: none;
    }
    
    .gsc-tooltip-menu-option-disabled:hover,
    .gsc-tooltip-menu-option-disabled:focus {
        background-color: transparent;
    }
`;module.exports=tooltipMenuStyles;
