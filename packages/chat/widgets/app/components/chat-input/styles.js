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
/* Main container */
.gsc-chat-input-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
}

/* Options bar */
.gsc-chat-input-options-bar-container {
    display: flex;
    justify-content: center;
}

.gsc-chat-input-options-bar {
    display: flex;
    align-items: center;
    padding: 7px 20px;
    white-space: nowrap;
    font-size: 14px;
    justify-content: center;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border: 1px solid #ccc;
    border-bottom: 0;
    background-color: #FFF;
}

.gsc-chat-input-options-bar .gsc-chat-input-cancel-option,
.gsc-chat-input-options-bar .gsc-chat-input-option-link {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-right: 5px;
}

.gsc-chat-input-options-bar .gsc-chat-input-option-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.gsc-chat-input-options-bar .gsc-chat-input-resize-handle {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    cursor: ns-resize;
}

/* Model selection dropdown */
.gsc-chat-input-model-select {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    margin-right: 12px;
}

.gsc-chat-input-model-select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* Input box */
.gsc-chat-input-box {
    border: 1px solid #666;
    border-radius: 16px;
    min-height: 75px;
    overflow: hidden;
}

.gsc-chat-input-textarea {
    width: 100%;
    min-height: 50px;
    border: none;
    outline: none;
    resize: none;
    padding: 20px 45px 20px 20px;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.4;
    box-sizing: border-box;
    flex: 1;
}

.gsc-chat-input-files {
    text-align: left;
    border-top: 1px solid #aaa;
    padding: 10px 20px;
}

.gsc-chat-input-status {
    height: 30px;
}

/* Buttons */
.gsc-chat-input-go-btn,
.gsc-chat-input-stop-btn {
    border: 1px solid #666;
    position: absolute;
    border-radius: 50%;
    background-color: white;
    padding: 5px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    top: 57px;
    right: 10px;
    bottom: 10px;
    z-index: 10;
}

.gsc-chat-input-go-btn:hover,
.gsc-chat-input-stop-btn:hover {
    background-color: #f5f5f5;
}

/* Settings panels */
.gsc-chat-input-settings {
    padding-bottom: 5px;
}

.gsc-chat-input-settings-header {
    border-top: 1px solid #ccc;
    margin-top: 10px;
    padding-top: 15px;
}

.gsc-chat-input-settings-options {
    text-align: center;
    margin-top: 12px;
    margin-bottom: 10px;
    border: 1px dashed #aaa;
    border-radius: 5px;
    padding: 12px;
}

.gsc-chat-input-settings-options > div {
    display: inline-block;
    text-align: left;
    margin-right: 20px;
}

.gsc-chat-input-settings-options > div:last-child {
    margin-right: 0;
}

/* Error display */
.gsc-chat-input-errors {
    display: none;
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #FFCDD2;
    color: #d32f2f;
    font-size: 13px;
}

.gsc-chat-input-error-msg {
    margin: 0;
}

/* Arrow controls */
.gsc-chat-input-arrow-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.gsc-chat-input-arrow-controls svg {
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.gsc-chat-input-arrow-controls svg.disabled {
    cursor: default;
}

/* CLI Command Bar */
.gsc-chat-input-cli-command-bar {
    display: none; /* Hidden by default */
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 10px;
    height: 50px;
    background-color: white;
}

.gsc-chat-input-cli-command-bar.visible {
    display: flex;
}

/* CLI Command Input Wrapper - The realistic terminal container */
.gsc-chat-input-cli-command-input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 1px 10px;
    border: 1px solid #ddd;
    border-radius: 13px;
    background-color: white;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s ease;
}

/* Disabled state for the wrapper (when input is disabled) */
.gsc-chat-input-cli-command-input-wrapper:has(.gsc-chat-input-cli-command-input:disabled) {
    background-color: white;
    border-color: #ddd;
    cursor: not-allowed;
}

/* CLI Command Prompt - The static '$> ' text */
.gsc-chat-input-cli-command-prompt {
    color: #444;
    font-weight: bold;
    margin-right: 4px;
    user-select: none; /* Prevent highlighting */
}

/* CLI Command Input - The actual transparent input */
.gsc-chat-input-cli-command-input {
    flex: 1;
    border: none;
    padding: 5px 1px;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    color: inherit;
}

.gsc-chat-input-cli-command-input:focus {
    box-shadow: none;
}

.gsc-chat-input-cli-authcode-input {
    width: 60px;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 13px;
    font-family: monospace;
    font-size: 13px;
    text-align: center;
    letter-spacing: 2px;
    outline: none;
}

.gsc-chat-input-cli-authcode-input:focus {
    border-color: #007bff;
}

.gsc-chat-input-cli-status-message {
    flex: 1;
    font-size: 13px;
    color: #666;
    font-style: italic;
    text-align: center;
}

/* CLI Output Prompt Box */
.gsc-cli-output-container {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 15px;
    border-radius: 4px;
    overflow-y: auto;
    max-height: calc(80vh - 170px);
    min-height: calc(80vh - 170px);
    white-space: pre-wrap;
    font-size: 13px;
    line-height: 1.5;
}

.gsc-cli-output-footer {
    margin-top: 15px;
    text-align: right;
    border-top: 1px solid #eee;
    padding-top: 15px;
}

.gsc-cli-copy-btn {
    padding: 8px 16px;
    background-color: white;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 10px;
}

.gsc-cli-copy-btn:hover {
    background-color: #f5f5f5;
}

.gsc-cli-add-to-chat-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.gsc-cli-add-to-chat-btn:hover {
    background-color: #0056b3;
}

/* Responsive design */
@media (max-width: 768px) {
    .gsc-chat-input-options-bar {
        padding: 8px 15px;
        font-size: 13px;
    }

    .gsc-chat-input-model-select {
        max-width: 180px;
        font-size: 13px;
    }

    .gsc-chat-input-textarea {
        padding: 15px;
        padding-right: 35px;
    }

    .gsc-chat-input-go-btn,
    .gsc-chat-input-stop-btn {
        top: 10px;
        left: -35px;
    }
}

/* Focus states */
.gsc-chat-input-textarea:focus {
    outline: none;
}

/* Animation for buttons */
.gsc-chat-input-go-btn,
.gsc-chat-input-stop-btn {
    transition: background-color 0.2s ease, transform 0.1s ease;
}

.gsc-chat-input-go-btn:active,
.gsc-chat-input-stop-btn:active {
    transform: scale(0.95);
}

/* File upload area */
.gsc-chat-input-files:empty {
    border-top: none;
}

/* Status message at bottom */
.gsc-chat-input-status {
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
}
`;module.exports={styles:styles};
