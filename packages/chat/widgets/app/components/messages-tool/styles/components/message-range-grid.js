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

let messageRangeGridStyles=`
/* Message Range Grid Container */
.gs-message-range-grid-container {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Grid Row */
.gs-message-range-grid-row {
    display: flex;
    margin-bottom: 5px;
}

.gs-message-range-grid-row:last-child {
    margin-bottom: 0;
}

/* Message Square */
.gs-message-range-square {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
}

/* Message Square Circle (for human-public messages) */
.gs-message-range-square-circle {
    border-radius: 50%;
    background-color: #f8f9fa;
    border-color: #6c757d;
}

/* Message Square Hover State */
.gs-message-range-square:hover {
    border-color: #888;
    transform: scale(1.2);
    z-index: 1;
}

/* Message Square Circle Hover State */
.gs-message-range-square-circle:hover {
    border-color: #495057;
    background-color: #e9ecef;
}

/* Message Square Selected State */
.gs-message-range-square-selected {
    border: 1px solid #333;
    background-color: #e3f2fd;
}

/* Message Square Circle Selected State */
.gs-message-range-square-circle.gs-message-range-square-selected {
    border: 1px solid #1976d2;
    background-color: #bbdefb;
}

/* Message Square Disabled State (System Messages) */
.gs-message-range-square-disabled {
    border: 1px solid #eee;
    background-color: #f5f5f5;
    cursor: not-allowed;
}

/* Empty Square (for grid alignment) */
.gs-message-range-square-empty {
    width: 10px;
    height: 10px;
    margin-right: 3px;
}

/* Count Display Container */
.gs-message-range-count-container {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #f8f9fa;
    border-radius: 4px;
    border-left: 4px solid #ffc107;
}

/* Count Display Text */
.gs-message-range-count-text {
    font-size: 13px;
    color: #495057;
    line-height: 1.4;
}
`;module.exports=messageRangeGridStyles;
