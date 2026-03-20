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

let rangeFilterStyles=`
/* Range Filter */
.gs-range-filter {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Range Input Label */
.gs-range-filter-label {
    font-size: 13px;
    font-weight: 500;
    margin-right: 5px;
}

/* Range Input Styles */
.gs-range-filter-from,
.gs-range-filter-to {
    width: 50px;
    padding: 5px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 13px;
    background-color: #fff;
}

.gs-range-filter-from:focus,
.gs-range-filter-to:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Clear Button Styles */
.gs-range-filter-clear {
    margin-left: 10px;
    padding: 5px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f8f9fa;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.gs-range-filter-clear:hover {
    background-color: #e9ecef;
    border-color: #ccc;
}

.gs-range-filter-clear:active {
    background-color: #dee2e6;
}

.gs-range-filter-clear:disabled {
    pointer-events: none;
}

/* Range Filter Container in Quick Filters */
.gs-quick-filters .gs-range-filter {
    margin-right: 15px;
    flex-shrink: 0;
}
`;module.exports=rangeFilterStyles;
