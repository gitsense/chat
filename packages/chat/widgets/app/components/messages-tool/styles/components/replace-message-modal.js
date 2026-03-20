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

let replaceMessageModalStyles=`
/* Replace Message Modal */
.gs-replace-message-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(95vh - 60px); /* Account for header height */
}

/* Scrollable content area */
.gs-replace-message-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px 20px;
}

.gs-replace-message-explanation {
    margin-bottom: 10px;
    padding-top: 10px;
}

.gs-replace-message-explanation p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
}

.gs-replace-message-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Field title style */
gs-replace-message-form strong {
    font-size: 16px;
}

/* Range Input Styles */
.gs-replace-message-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
}

.gs-replace-message-form input[type="number"],
.gs-replace-message-form input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.gs-replace-message-form input[type="number"] {
    width: 80px;
}

.gs-replace-message-form input[type="number"]:focus,
.gs-replace-message-form input[type="text"]:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Relationship Select Styles */
.gs-replace-message-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-replace-message-form select:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Textarea Styles */
.gs-replace-message-content {
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

.gs-replace-message-content:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Fixed Footer Styles */
.gs-replace-message-footer {
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

.gs-replace-message-footer-left {
    display: flex;
    gap: 10px;
}

.gs-replace-message-footer-right {
    display: flex;
    gap: 10px;
}

/* Error Notification Styles */
.gs-replace-message-error {
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
.gs-replace-message-range-inputs {
    display: flex;
    align-items: center;
    gap: 10px;
}

.gs-replace-message-range-inputs label {
    margin-bottom: 0;
    margin-right: 5px;
    font-weight: normal;
}

/* Grid Container Styles */
.gs-replace-message-grid-container {
    margin-bottom: 5px;
}
`;module.exports=replaceMessageModalStyles;
