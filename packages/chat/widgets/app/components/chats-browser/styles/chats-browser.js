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

let chatBrowserStyles=`
/* Main modal container */
.gsc-chats-browser-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100000000001;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Facets panel styles */
.gsc-chats-facets-panel {
    background-color: #fafafa;
    border-right: 1px solid #eee;
    padding: 15px;
    overflow-y: auto;
    height: 100%;
}

/* Preview panel styles */
.gsc-chats-preview-panel {
    background-color: #ffffff;
    padding: 20px 25px 0px 25px;
    height: 100%;
    overflow-y: auto;
}

/* Chats table styles */
.gsc-chats-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.gsc-chats-table th,
.gsc-chats-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.gsc-chats-table th {
    font-weight: 600;
    color: #333;
    background-color: #f8f9fa;
}

.gsc-chats-table tr:hover {
    background-color: #f8f9fa;
}

/* Chat row styles */
.gsc-chat-row {
    cursor: pointer;
}

.gsc-chat-row:hover {
    background-color: #f8f9fa;
}

/* Chat name cell styles */
.gsc-chat-name-cell {
    font-weight: 500;
}

.gsc-chat-name-cell a {
    color: #0366d6;
    text-decoration: none;
}

.gsc-chat-name-cell a:hover {
    text-decoration: underline;
}

/* Chat level indent styles */
.gsc-chat-level-indent {
    display: inline-block;
    width: 20px;
}

/* Filter section styles */
.gsc-filter-section {
    margin-bottom: 20px;
}

.gsc-filter-header {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
}

.gsc-filter-options {
    margin-bottom: 10px;
}

.gsc-filter-option {
    margin-bottom: 5px;
}

.gsc-filter-option label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.gsc-filter-option input[type="checkbox"] {
    margin-right: 8px;
}

/* Results count styles */
.gsc-results-count {
    font-size: 14px;
    color: #666;
}

/* Footer styles */
.gsc-chats-browser-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    border-top: 1px solid #eee;
    background-color: #f8f9fa;
}

/* Clear button styles */
.gsc-clear-button {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
    cursor: pointer;
}

.gsc-clear-button:hover {
    background-color: #f8f9fa;
}

/* Sorting container styles */
.gsc-sorting-container {
    display: flex;
    align-items: center;
}

/* Sorting dropdown styles */
.gsc-sorting-dropdown {
    padding: 4px 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
}

.gsc-sorting-dropdown:focus {
    outline: none;
    border-color: #0366d6;
    box-shadow: 0 0 0 2px rgba(3, 102, 214, 0.2);
}

/* Search container styles */
#gsc-chats-home-search-container {
    margin-bottom: 15px;
}

/* Results and sort container styles */
#gsc-chats-home-results-sort-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Table container styles */
#gsc-chats-home-table-container {
    margin-bottom: 15px;
}

/* Bottom container styles */
#gsc-chats-home-bottom-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}

/* Pagination container styles */
#gsc-chats-home-pagination-container {
    flex: 1;
}

/* Results count styles */
#gsc-chats-home-results-count {
    color: #666;
    font-size: 14px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .gsc-chats-browser-modal {
        padding: 10px;
    }
    
    .gsc-chats-preview-panel {
        padding: 15px;
    }
    
    .gsc-chats-browser-footer {
        flex-direction: column;
        gap: 10px;
    }
    
    #gsc-chats-home-results-sort-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
}
`;module.exports=chatBrowserStyles;
