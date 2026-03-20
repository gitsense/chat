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

let compactMessageModalStyles=`
/* Compact Message Modal */
.gs-compact-message-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(95vh - 60px); /* Account for header height */
}

/* Scrollable content area */
.gs-compact-message-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px 20px;
}

.gs-compact-message-explanation {
    margin-bottom: 10px;
    padding-top: 10px;
}

.gs-compact-message-explanation p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
}

.gs-compact-message-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Field title style */
gs-compact-message-form strong {
    font-size: 16px;
}

/* Range Input Styles */
.gs-compact-message-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
}

.gs-compact-message-form input[type="number"],
.gs-compact-message-form input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.gs-compact-message-form input[type="number"] {
    width: 80px;
}

.gs-compact-message-form input[type="number"]:focus,
.gs-compact-message-form input[type="text"]:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Relationship Select Styles */
.gs-compact-message-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-compact-message-form select:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Textarea Styles */
.gs-compact-message-content {
    width: 100%;
    min-height: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: monospace;
    font-size: 13px;
    line-height: 1.4;
}

.gs-compact-message-content:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Fixed Footer Styles */
.gs-compact-message-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid #eee;
    background-color: #f9f9f9;
    flex-shrink: 0;
    position: sticky;
    bottom: 0;
    z-index: 10;
}

.gs-compact-message-footer-left {
    display: flex;
    gap: 10px;
}

.gs-compact-message-footer-right {
    display: flex;
    gap: 10px;
}

/* Error Notification Styles */
.gs-compact-message-error {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 4px;
    background-color: #f8d7da;
    color: #721c24;
    z-index: 1000003;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-size: 14px;
    max-width: 300px;
}

/* Range Input Container */
.gs-compact-message-range-inputs {
    display: flex;
    align-items: center;
    gap: 10px;
}

.gs-compact-message-range-inputs label {
    margin-bottom: 0;
    margin-right: 5px;
    font-weight: normal;
}

/* Model Selection Styles */
.gs-compact-message-model {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-compact-message-model:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.gs-compact-message-model option:disabled {
    color: #999;
    background-color: #f5f5f5;
}

.gs-compact-message-model-note {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
}

/* Status Container Styles */
.gs-compact-message-status-container {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
}

.gs-compact-message-status-title {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
}

.gs-compact-message-instructions {
    margin-bottom: 15px;
}

.gs-compact-message-instructions p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
}

.gs-compact-message-instructions ol {
    padding-left: 20px;
    margin: 0;
}

.gs-compact-message-instructions li {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 1.5;
}

/* Polling Status Styles */
.gs-compact-message-polling-status {
    padding: 10px;
    background-color: #e9ecef;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 15px;
}

.gs-compact-message-polling-status div {
    margin-bottom: 5px;
}

.gs-compact-message-polling-status div:last-child {
    margin-bottom: 0;
}

/* Stop and Start Over Link Styles */
.gs-compact-message-polling-status #stop-and-start-over-link {
    color: #dc3545;
    font-size: 14px;
    text-decoration: underline;
    font-weight: 500;
}

.gs-compact-message-polling-status #stop-and-start-over-link:hover {
    color: #c82333;
    text-decoration: none;
}

/* Paste Option Styles */
.gs-compact-message-paste-container {
    margin-top: 15px;
}

.gs-compact-message-paste-textarea {
    width: 100%;
    min-height: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: monospace;
    font-size: 13px;
    line-height: 1.4;
}

.gs-compact-message-paste-textarea:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Message Preview Styles */
.gs-compact-message-preview {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 200px;
    overflow: auto;
    font-family: monospace;
    font-size: 13px;
    white-space: pre-wrap;
    margin-bottom: 15px;
}

/* Success Message Styles */
.gs-compact-message-success-message {
    margin-bottom: 10px;
}

/* Reset Button Styles */
.gs-compact-message-footer .btn:not(.btn-primary):not(.disabled) {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    color: #495057;
}

.gs-compact-message-footer .btn:not(.btn-primary):not(.disabled):hover {
    background-color: #e9ecef;
    border-color: #adb5bd;
}

/* Grid Container Styles */
.gs-compact-message-grid-container {
    margin-bottom: 5px;
}
`;module.exports=compactMessageModalStyles;
