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

let chatHistoryStyles=`
/* Main container */
.gsc-chat-history {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #333;
    margin: 0 auto;
}

/* Search container */
.gsc-chat-history-search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

/* Options */
.gsc-chat-history-options-link {
    display: flex;
    align-items: center;
    color: #000000;
    font-size: 14px;
    font-weight: normal;
    text-decoration: none;
    cursor: pointer;
}

.gsc-chat-history-options-link:hover {
    text-decoration: none;
}

/* Archive checkbox container */
.gsc-chat-history-archive-checkbox-container {
    display: flex;
    align-items: center;
    margin-left: 15px;
    white-space: nowrap;
}

.gsc-chat-history-archive-checkbox {
    margin-right: 6px;
    cursor: pointer;
}

.gsc-chat-history-archive-label {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    user-select: none;
}

.gsc-chat-history-archive-label:hover {
    color: #555;
}

/* Root Only checkbox container */
.gsc-chat-history-root-checkbox-container {
    display: flex;
    align-items: center;
    margin-left: 15px;
    white-space: nowrap;
}

.gsc-chat-history-root-checkbox {
    margin-right: 6px;
    cursor: pointer;
}

.gsc-chat-history-root-label {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    user-select: none;
}

.gsc-chat-history-root-label:hover {
    color: #555;
}

/* Table container */
.gsc-chat-history-table-container {
    overflow-x: auto;
    border-bottom: 0;
}

/* Table styles */
.gsc-chat-history-table {
    width: 100%;
    font-size: 13px;
    table-layout: fixed;
    border-collapse: collapse;
    background-color: white;
}

.gsc-chat-history-table th ,
.gsc-chat-history-table td {
    padding: 12px 10px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.6;
}

.gsc-chat-history-table th {
    padding: 12px 10px 2px 10px;
    font-weight: 600;
    font-size: 14px;
    color: #475569;
}

.gsc-chat-history-table tr:hover {
    background-color: #f8fafc;
}

.gsc-chat-history-table td {
    padding-left: 0px;
}

/* Archived row styling */
.gsc-chat-history-archived-row {
    opacity: 0.7;
    background-color: #f9f9f9;
}

.gsc-chat-history-archived-row:hover {
    background-color: #f0f0f0;
}

/* Chat name cell */
.gsc-chat-history-name-cell {
    position: relative;
}

/* Root chat cell */
.gsc-chat-history-root-chat-cell {
    color: #475569;
}

.gsc-chat-history-chat-link {
    color: #000000;
    font-size: 14px;
    font-weight: normal;
    text-decoration: none;
    cursor: pointer;
}

.gsc-chat-history-chat-link:hover {
    text-decoration: underline;
}

/* Archive icon */
.gsc-chat-history-archive-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #64748b;
    opacity: 0.8;
}

.gsc-chat-history-archive-icon:hover {
    color: #475569;
    opacity: 1;
}

/* Breadcrumb styles */
.gsc-chat-history-breadcrumb {
    font-size: 13px;
    color: #000000;
    margin-top: 4px;
    line-height: 1.3;
    display: flex;
    align-items: center;
}

.gsc-chat-history-breadcrumb a {
    color: #000000;
    font-size: 13px;
    font-weight: normal;
}

.gsc-chat-history-breadcrumb a:hover {
    text-decoration: underline;
}

.gsc-chat-history-breadcrumb-container {
    overflow: hidden;
    transition: max-height 0.3s ease;
    max-height: 0;
}

.gsc-chat-history-breadcrumb-container.show {
    max-height: 50px;
}

/* Actions cell */
.gsc-chat-history-actions-cell {
}

.gsc-chat-history-actions {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Expand icon */
.gsc-chat-history-expand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s ease;
    opacity: .7;
}

.gsc-chat-history-expand-icon:hover {
    color: #374151;
}

.gsc-chat-history-expand-icon.expanded {
    color: #3b82f6;
}

/* Focus icon */
.gsc-chat-history-focus-icon {
    opacity: .7;
    transition: opacity 0.2s ease;
    cursor: pointer;
    color: #64748b;
    display: flex;
    align-items: center;
    margin-right: 10px;
    justify-content: center;
}

.gsc-chat-history-focus-icon:hover {
    color: #3b82f6;
}

/* Bump icon */
.gsc-chat-history-bump-icon {
    opacity: .7;
    transition: opacity 0.2s ease;
    cursor: pointer;
    color: #64748b;
    display: flex;
    align-items: center;
    margin-right: 5px;
    justify-content: center;
}

.gsc-chat-history-bump-icon:hover {
    color: #f59e0b;
}

.gsc-chat-history-bump-icon:active {
    color: #d97706;
}

/* Menus icon */
.gsc-chat-history-menu-icon {
    opacity: .7;
    transition: opacity 0.2s ease;
    cursor: pointer;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gsc-chat-history-menu-icon:hover {
    color: #3b82f6;
}

/* Time cell */
/* Time cell */
.gsc-chat-history-time-cell {
    font-size: 13px;
    color: #666;
}

/* Options cell */
.gsc-chat-history-options-cell {

}

.gsc-chat-history-options-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 2px;
    border-radius: 3px;
    color: #64748b;
}

.gsc-chat-history-options-button:hover {
    color: #334155;
}

/* Column selectors */
.gsc-chat-history-chat-name-selector {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.gsc-chat-history-time-selector {
    display: flex;
}

.gsc-chat-history-column-dropdown {
    background: transparent;
    border: none;
    border-bottom: 1px solid #aaa;
    padding: 8px 0;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
}

.gsc-chat-history-column-dropdown:hover {
    background-color: #f8fafc;
}

/* Pagination container */
.gsc-chat-history-pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}

/* Empty state styles */
.gsc-chat-history-empty-state {
    margin-top: 30px;
    text-align: center;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    padding: 30px 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: inline-block;
    width: 780px;
}

.gsc-chat-history-empty-state-icon {
    font-size: 48px;
    color: #94a3b8;
    margin-top: 20px;
    margin-bottom: 20px;
}

.gsc-chat-history-empty-state-title {
    font-size: 20px;
    font-weight: 500;
    color: #334155;
    margin-bottom: 10px;
}

.gsc-chat-history-empty-state-description {
    font-size: 15px;
    color: #64748b;
    line-height: 1.5;
}

.gsc-chat-history-empty-state-features {
    text-align: left;
}

.gsc-chat-history-empty-state-features h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 18px;
    color: #334155;
}

.gsc-chat-history-empty-state-features ul {
    margin: 0;
    padding-left: 20px;
    line-height: 1.8;
}

.gsc-chat-history-empty-state-features li {
    color: #475569;
}

.gsc-chat-history-empty-state-import-export {
    background-color: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    text-align: left;
}

.gsc-chat-history-empty-state-import-export h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 18px;
    color: #0369a1;
    display: flex;
    align-items: center;
}

.gsc-chat-history-empty-state-import-export p {
    margin-bottom: 15px;
    color: #0c4a6e;
}

.gsc-chat-history-import-steps {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.gsc-chat-history-import-step {
    flex: 1;
    text-align: center;
    padding: 0 10px;
}

.gsc-chat-history-import-step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #0284c7;
    color: white;
    font-weight: bold;
    margin-bottom: 10px;
}

.gsc-chat-history-import-step-title {
    font-weight: 600;
    color: #0c4a6e;
    margin-bottom: 5px;
}

.gsc-chat-history-import-step-desc {
    font-size: 14px;
    color: #075985;
}

.gsc-chat-history-import-button {
    background-color: #0284c7;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 20px;
}

.gsc-chat-history-import-button:hover {
    background-color: #0369a1;
}

/* Loading state */
.gsc-chat-history-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: #64748b;
}

.gsc-chat-history-loading::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #e2e8f0;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: gsc-chat-history-spin 1s linear infinite;
    margin-right: 10px;
}

@keyframes gsc-chat-history-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Error state */
.gsc-chat-history-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: #ef4444;
    text-align: center;
}

.gsc-chat-history-error-icon {
    font-size: 48px;
    margin-bottom: 15px;
}

.gsc-chat-history-error-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
}

.gsc-chat-history-error-message {
    font-size: 14px;
    margin-bottom: 20px;
}

.gsc-chat-history-error-button {
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
}

.gsc-chat-history-error-button:hover {
    background-color: #dc2626;
}

/* No matches state */
.gsc-chat-history-no-matches-row {
    height: 200px;
}

.gsc-chat-history-no-matches-cell {
    padding: 20px;
    text-align: center;
    vertical-align: middle;
}

.gsc-chat-history-no-matches-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.gsc-chat-history-no-matches-icon {
    margin-bottom: 15px;
}

.gsc-chat-history-no-matches-title {
    font-size: 18px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 8px;
}

.gsc-chat-history-no-matches-description {
    font-size: 14px;
    color: #64748b;
    max-width: 400px;
}

/* Responsive adjustments */
@media (max-width: 800px) {
    .gsc-chat-history {
        padding: 0 10px;
    }

    .gsc-chat-history-table-container {
        margin: 0 -10px;
    }

    .gsc-chat-history-search-container {
        flex-direction: column;
        gap: 10px;
        align-items: stretch;
    }

    .gsc-chat-history-archive-checkbox-container,
    .gsc-chat-history-root-checkbox-container {
        margin-left: 0;
        margin-top: 10px;
    }
}
`;module.exports=chatHistoryStyles;
