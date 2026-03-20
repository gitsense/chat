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

let searchInputStyles=`
    /* CSS Variables for easy customization */
    .gsc-search-input-wrapper {
        --gsc-search-input-border-color: #ddd;
        --gsc-search-input-bg-color: #fff;
        --gsc-search-input-focus-border-color: #007bff;
        --gsc-search-input-disabled-bg-color: #f5f5f5;
        --gsc-search-input-disabled-color: #aaa;
        --gsc-search-input-icon-color: #666;
        --gsc-search-input-clear-icon-color: #999;
        --gsc-search-input-clear-icon-hover-color: #333;
    }

    .gsc-search-input-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--gsc-search-input-border-color);
        border-radius: 4px;
        background-color: var(--gsc-search-input-bg-color);
        transition: border-color 0.2s ease;
    }

    .gsc-search-input-wrapper:focus-within {
        border-color: var(--gsc-search-input-focus-border-color);
        outline: none;
    }

    .gsc-search-input {
        border: none;
        outline: none;
        background: transparent;
        font-family: sans-serif;
        color: #333;
        flex: 1;
        min-width: 0; /* Allow input to shrink */
    }

    .gsc-search-input:disabled {
        background-color: var(--gsc-search-input-disabled-bg-color);
        color: var(--gsc-search-input-disabled-color);
        cursor: not-allowed;
    }

    .gsc-search-input-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gsc-search-input-icon-color);
        cursor: pointer;
        flex-shrink: 0;
    }

    .gsc-search-input-left-icon {
        padding: 0 8px 0 10px;
    }

    .gsc-search-input-clear-icon {
        padding: 0 10px 0 8px;
        color: var(--gsc-search-input-clear-icon-color);
    }

    .gsc-search-input-clear-icon:hover {
        color: var(--gsc-search-input-clear-icon-hover-color);
    }
`;module.exports=searchInputStyles;
