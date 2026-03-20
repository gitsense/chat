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

let paginationStyles=`
    /* CSS Variables for easy customization within gsc-ui theme */
    .gsc-pagination-controls {
        --gsc-pagination-border-color: #ddd;
        --gsc-pagination-primary-color: #007bff;
        --gsc-pagination-text-color: #333;
        --gsc-pagination-text-muted-color: #666;
        --gsc-pagination-background-color: #fff;
        --gsc-pagination-hover-background-color: #f5f5f5;
        --gsc-pagination-disabled-opacity: 0.6;
        --gsc-pagination-spacing-sm: 5px;
        --gsc-pagination-spacing-md: 10px;
        --gsc-pagination-spacing-lg: 15px;
        --gsc-pagination-spacing-xl: 20px;
        --gsc-pagination-font-size-base: 0.9em;
    }

    .gsc-pagination-controls {
        display: flex;
        align-items: center;
        gap: var(--gsc-pagination-spacing-md);
        margin-top: var(--gsc-pagination-spacing-sm);
        padding: 5px 0px;
        border-radius: 4px;
        color: var(--gsc-pagination-text-color);
        font-family: sans-serif;
    }

    .gsc-pagination-buttons {
        display: flex;
        gap: var(--gsc-pagination-spacing-md);
        align-items: center;
    }

    .gsc-page-button {
        padding: 6px var(--gsc-pagination-spacing-lg);
        border: 1px solid var(--gsc-pagination-border-color);
        border-radius: 4px;
        background-color: var(--gsc-pagination-background-color);
        color: var(--gsc-pagination-primary-color);
        cursor: pointer;
        font-size: var(--gsc-pagination-font-size-base);
        line-height: 1.5;
        transition: all 0.2s;
        min-width: 40px; /* Ensure buttons have a minimum width for consistency */
        text-align: center;
    }

    .gsc-page-button:hover:not(:disabled) {
        background-color: var(--gsc-pagination-hover-background-color);
        border-color: var(--gsc-pagination-border-color);
    }

    .gsc-page-button.gsc-page-button-active {
        background-color: var(--gsc-pagination-primary-color);
        color: var(--gsc-pagination-background-color);
        border-color: var(--gsc-pagination-primary-color);
    }

    .gsc-page-button:disabled {
        cursor: not-allowed;
        opacity: var(--gsc-pagination-disabled-opacity);
        background-color: var(--gsc-pagination-background-color);
    }

    .gsc-page-ellipsis {
        padding: 6px var(--gsc-pagination-spacing-md);
        color: var(--gsc-pagination-text-muted-color);
        font-size: var(--gsc-pagination-font-size-base);
    }

    .gsc-page-size-selector {
        display: flex;
        align-items: center;
        gap: var(--gsc-pagination-spacing-md);
    }

    .gsc-page-size-select {
        padding: var(--gsc-pagination-spacing-sm) var(--gsc-pagination-spacing-lg);
        border: 1px solid var(--gsc-pagination-border-color);
        border-radius: 4px;
        background-color: var(--gsc-pagination-background-color);
        color: var(--gsc-pagination-text-color);
        cursor: pointer;
        font-size: var(--gsc-pagination-font-size-base);
    }

    .gsc-page-size-select:hover {
        border-color: var(--gsc-pagination-primary-color);
    }

    .gsc-page-info {
        color: var(--gsc-pagination-text-muted-color);
        font-size: var(--gsc-pagination-font-size-base);
        white-space: nowrap; /* Prevent line breaks in info text */
    }
`;module.exports=paginationStyles;
