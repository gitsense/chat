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

let toggleStyles=`
    /* Base styles for the toggle container */
    .gsc-toggle-container {
        display: flex;
        width: 400px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    }

    /* Base style for individual toggle options */
    .gsc-toggle-option {
        flex: 1;
        padding: 10px 15px;
        text-align: center;
        cursor: pointer;
        background-color: #f8f9fa;
        border: none;
        font-size: 14px;
        transition: background-color 0.2s;
        color: #333;
        outline: none;
    }

    /* Active toggle option style */
    .gsc-toggle-option.gsc-toggle-option-active {
        background-color: #0969da;
        color: white;
    }

    /* Hover effect for inactive, enabled toggle options */
    .gsc-toggle-option:not(.gsc-toggle-option-active):not(.gsc-toggle-option-disabled):hover {
        background-color: #e9ecef;
    }

    /* Disabled toggle option style */
    .gsc-toggle-option.gsc-toggle-option-disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;module.exports=toggleStyles;
