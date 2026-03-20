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

let styles=`
/* Message History Modal */
.gsc-message-history-modal .gsc-prompt-content {
    min-width: 900px;
    width: 900px;
    max-width: 90%;
    height: 90vh;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
}

/* Tabs Container */
.gsc-message-history-tabs {
    display: flex;
    justify-content: center;
}

.gsc-message-history-tabs .gsc-tab-button {
    background-color: transparent;
    border: none;
    padding: 10px 15px;
    margin-right: 5px;
    cursor: pointer;
    outline: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: border-color 0.2s ease;
    font-size: 1.05em;
    color: #333;
    position: relative;
    z-index: 1;
}

.gsc-message-history-tabs .gsc-tab-button.gsc-tab-button-active {
    border-bottom: 2px solid #ff7f0e;
    color: #000;
    font-weight: bold;
}

.gsc-message-history-tabs .gsc-tab-button:not(.gsc-tab-button-active):hover {
    border-bottom: 2px solid #999;
}

/* Search Container */
.gsc-message-history-search {
    display: flex;
    padding: 15px 20px;
    align-items: center;
}

.gsc-message-history-search .gsc-search-input-wrapper {
    flex-grow: 1;
}

.gsc-message-history-search .results-count {
    margin-left: 15px;
    color: #666;
    font-size: 14px;
}

/* Messages Container */
.gsc-message-history-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 0 20px;
}

/* Message Card */
.gsc-message-history-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fafafa;
}

.gsc-message-history-card:last-child {
    margin-bottom: 0;
}

/* Message Header */
.gsc-message-history-card .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.gsc-message-history-card .message-title {
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
}

.gsc-message-history-card .message-status {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

.gsc-message-history-card .message-status.draft {
    background-color: #f44336;
}

.gsc-message-history-card .message-status.sent {
    background-color: #4CAF50;
}

.gsc-message-history-card .message-status.pinned {
    background-color: #2196F3;
}

.gsc-message-history-card .message-meta {
    font-size: 12px;
    color: #666;
}

/* Deleted Chat Name Styling */
.gsc-message-history-chat-name-deleted {
    text-decoration: line-through;
    color: #999;
}

.gsc-message-history-deleted-indicator {
    color: #999;
    font-style: italic;
    font-size: 12px;
}

/* Message Description */
.gsc-message-history-card .message-description {
    margin-bottom: 10px;
    color: #555;
}

.gsc-message-history-card .message-description-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.gsc-message-history-card .description-edit-icon {
    cursor: pointer;
    margin-left: 8px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
}

.gsc-message-history-card .description-edit-icon:hover {
    opacity: 1;
}

.gsc-message-history-card .description-edit-container {
    width: 100%;
    margin-bottom: 10px;
}

.gsc-message-history-card .description-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* Message Tags */
.gsc-message-history-card .message-tags {
    margin-bottom: 10px;
}

.gsc-message-history-card .message-tag {
    display: inline-block;
    background-color: #e1f5fe;
    color: #0277bd;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    margin-right: 5px;
}

/* Message Content */
.gsc-message-history-card .message-content-container {
    margin-bottom: 15px;
    position: relative;
}

.gsc-message-history-card .gsc-message-history-content {
    width: 100%;
    min-height: 120px;
    max-height: 120px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    font-family: monospace;
    font-size: 13px;
    line-height: 1.4;
    background-color: white;
}

/* Message Actions */
.gsc-message-history-card .gsc-message-history-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Empty State */
.gsc-message-history-empty {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    padding: 40px 20px;
    color: #666;
}

.gsc-message-history-empty svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    fill: #444
}

/* Responsive Design */
@media (max-width: 768px) {
    .gsc-message-history-modal .gsc-prompt-content {
        width: 95%;
        height: 95vh;
    }

    .gsc-message-history-tabs {
        padding: 0 10px;
    }

    .gsc-message-history-search {
        padding: 10px;
    }

    .gsc-message-history-messages {
        padding: 0 10px;
    }

    .gsc-message-history-card {
        padding: 10px;
    }

    .gsc-message-history-card .gsc-message-history-content {
        min-height: 80px;
        max-height: 80px;
    }
}

/* Animation for card hover */
.gsc-message-history-card {
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.gsc-message-history-card:hover {
    border-color: #ccc;
}

/* Focus styles for accessibility */
.gsc-message-history-card:focus-within {
    /* Do nothing for now */
}

/* Loading state */
.gsc-message-history-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: #666;
}

.gsc-message-history-loading::after {
    content: '';
    width: 20px;
    height: 20px;
    margin-left: 10px;
    border: 2px solid #ddd;
    border-top: 2px solid #ff7f0e;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;module.exports={styles:styles};
