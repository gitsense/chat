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

let newChatModalStyles=`
/* New Chat Modal */
.gs-new-chat-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(95vh - 60px); /* Account for header height */
}

/* Scrollable content area */
.gs-new-chat-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px 20px;
}

.gs-new-chat-explanation {
    margin-bottom: 10px;
    padding-top: 10px;
}

.gs-new-chat-explanation p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
}

.gs-new-chat-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Field title style */
.gs-new-chat-form strong {
    font-size: 16px;
}

/* Selected Messages Section */
.gs-new-chat-selected-section {
    margin-bottom: 20px;
}

.gs-new-chat-selected-section h3 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
}

.gs-new-chat-no-selection {
    padding: 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    margin-bottom: 15px;
}

.gs-new-chat-no-selection p {
    margin: 0;
    color: #6c757d;
}

.gs-new-chat-selected-numbers {
    padding: 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    margin-bottom: 15px;
}

/* Form Input Styles */
.gs-new-chat-form label {
    display: block;
    font-weight: 500;
    font-size: 14px;
}

.gs-new-chat-form input[type="text"],
.gs-new-chat-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-new-chat-form input[type="text"]:focus,
.gs-new-chat-form select:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Checkbox and Radio Styles */
.gs-new-chat-form .checkbox-container,
.gs-new-chat-form .radio-container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
}

.gs-new-chat-form .checkbox-container input[type="checkbox"],
.gs-new-chat-form .radio-container input[type="radio"] {
    margin-right: 8px;
    margin-top: 2px;
}

.gs-new-chat-form .checkbox-label,
.gs-new-chat-form .radio-label {
    font-size: 14px;
    line-height: 1.4;
}

.gs-new-chat-form .field-description {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
    margin-left: 20px;
}

/* Fixed Footer Styles */
.gs-new-chat-footer {
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

.gs-new-chat-footer-left {
    display: flex;
    gap: 10px;
}

.gs-new-chat-footer-right {
    display: flex;
    gap: 10px;
}

/* Error Notification Styles */
.gs-new-chat-error {
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

/* Disabled button style */
.gs-new-chat-footer .btn.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
`;module.exports=newChatModalStyles;
