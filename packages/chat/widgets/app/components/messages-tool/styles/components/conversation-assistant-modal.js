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

let conversationAssistantModalStyles=`
/* Conversation Assistant Modal */
.gs-conversation-assistant-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(95vh - 60px); /* Account for header height */
}

/* Scrollable content area */
.gs-conversation-assistant-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px 20px;
}

.gs-conversation-assistant-explanation {
    margin-bottom: 10px;
    padding-top: 10px;
}

.gs-conversation-assistant-explanation p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
}

.gs-conversation-assistant-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Field title style */
.gs-conversation-assistant-form strong {
    font-size: 16px;
}

/* Input Styles */
.gs-conversation-assistant-form input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.gs-conversation-assistant-form input[type="text"]:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Select Styles */
.gs-conversation-assistant-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-conversation-assistant-form select:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.gs-conversation-assistant-form option:disabled {
    color: #999;
    background-color: #f5f5f5;
}

/* Model Selection Styles */
.gs-conversation-assistant-model {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-conversation-assistant-model:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.gs-conversation-assistant-model-note {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
}

/* Query Options Styles */
.gs-conversation-assistant-query-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.gs-conversation-assistant-query-option {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.gs-conversation-assistant-query-option:hover {
    background-color: #f5f5f5;
}

.gs-conversation-assistant-query-option input[type="radio"] {
    margin-top: 2px;
}

.gs-conversation-assistant-query-option span {
    line-height: 1.4;
    flex: 1;
}

/* Fixed Footer Styles */
.gs-conversation-assistant-footer {
    display: flex;
    justify-content: flex-end;
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

.gs-conversation-assistant-footer-right {
    display: flex;
    gap: 10px;
}

/* Error Notification Styles */
.gs-conversation-assistant-error {
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
`;module.exports=conversationAssistantModalStyles;
