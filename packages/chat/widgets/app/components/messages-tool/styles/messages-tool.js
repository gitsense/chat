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

let messagesToolStyles=`
.gs-messages-tool {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.gs-quick-filters-zone {
    flex-shrink: 0;
}

.gs-content-zone {
    display: flex;
    flex: 1;
    overflow: hidden;
    padding: 0px 16px 16px 16px;
}

/* Action Buttons Zone */
.gs-action-buttons-zone {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 5px 13px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;
}

.gs-action-buttons-container {
    display: flex;
    gap: 15px;
}

.gs-action-button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 0;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.gs-action-button:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
}

.gs-action-button:active {
    background-color: #e0e0e0;
    transform: translateY(1px);
}

/* Specific button styles */
.gs-assistant-button {
    background-color: #f8f9fa;
    border-color: #dee2e6;
}

.gs-compact-button {
    background-color: #e3f2fd;
    border-color: #bbdefb;
}

.gs-download-button {
    background-color: #e8f5e9;
    border-color: #c8e6c9;
}

/* Generic panel container styles */
.gs-left-panel-container,
.gs-right-panel-container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* Panel specific styles */
.gs-panel-left {
    border: 1px solid #ccc;
    border-radius: 5px;
}

.gs-panel-right {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 20px;
}

/* Table styles */
.gs-table-container .gsc-table-wrapper {
    height: 100%;
    border: none;
}

.gs-table-container .gsc-table-header {
    background-color: #f9f9f9;
}

.gs-table-container .gsc-table-header th {
    font-weight: 600;
    font-size: 14px;
    padding: 8px;
}

.gs-table-container .gsc-table-body td {
    padding: 5px;
    vertical-align: middle;
}

/* Checkbox styles */
.gs-table-container input[type="checkbox"] {
    cursor: pointer;
}

/* Header checkbox styles */
.gs-table-container .gsc-table-header th input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
}

.gs-table-container .gsc-table-header th div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

/* Search input styles */
.gs-search-container .gsc-search-input-wrapper {
    width: 100%;
}

.gs-search-container .gsc-search-input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
}

/* Message content styles */
.gs-message-content {
    font-family: monospace;
    font-size: 12px;
    line-height: 1.4;
    white-space: pre-wrap;
    max-height: 200px;
    overflow-y: auto;
}

/* Copy button styles */
.gs-copy-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gs-copy-button:hover {
    background-color: #f0f0f0;
}

/* Quick Filters Layout Adjustments */
.gs-quick-filters {
    padding: 15px;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.gs-quick-range-filter-container {
    flex-shrink: 0;
    margin-right: 5px;
}

.gs-quick-search-container {
    flex: 1;
    min-width: 200px;
}

.gs-quick-type-filters-container .gs-type-filters {
    display: flex;
    gap: 10px;
    margin-left: 10px;
}

.gs-quick-type-filters-container .gs-type-filters label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
}

/* Search input styles in quick filters */
.gs-quick-search-container .gsc-search-input-wrapper {
    width: 100%;
}

.gs-quick-search-container .gsc-search-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-quick-search-container .gsc-search-input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
`;module.exports=messagesToolStyles;
