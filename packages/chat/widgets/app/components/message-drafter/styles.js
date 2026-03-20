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

let messageDrafterStyles=`
    /* Main container */
    .message-drafter-container {
        font-family: sans-serif;
        max-width: 100%;
    }
    
    /* Instructions */
    .message-drafter-instructions {
        color: #666;
        font-size: 14px;
        margin-bottom: 16px;
        line-height: 1.4;
    }
    
    /* Header with toggle and message type */
    .message-drafter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 17px;
    }
    
    .message-drafter-toggle-container {
        flex: 1;
    }
    
    .message-drafter-message-type-container {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .message-drafter-message-type-label {
        font-size: 14px;
        color: #333;
    }
    
    /* Body with editor/preview */
    .message-drafter-body {
        margin-bottom: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .message-drafter-editor-panel,
    .message-drafter-preview-panel {
        min-height: 200px;
    }
    
    .message-drafter-textarea {
        width: 100%;
        min-height: 200px;
        padding: 12px;
        border: none;
        font-family: monospace;
        font-size: 13px;
        line-height: 1.5;
        resize: vertical;
        box-sizing: border-box;
    }
    
    .message-drafter-textarea:focus {
        outline: none;
    }
    
    .message-drafter-preview-content {
        padding: 12px;
        font-size: 14px;
        line-height: 1.5;
        overflow-y: auto;
        height: 100%;
        box-sizing: border-box;
    }
    
    /* Status bar */
    .message-drafter-status-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #666;
        padding: 8px 0;
    }
    
    .message-drafter-status-left {
        margin-top: -30px;
        display: flex;
        gap: 10px;
    }
    
    .message-drafter-status-right {
        display: flex;
        align-items: center;
    }
    
    /* Submit button */
    .message-drafter-submit-button {
        background-color: #0969da;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s;
    }
    
    .message-drafter-submit-button:hover {
        background-color: #0860ca;
    }
    
    .message-drafter-submit-button:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
    }
    
    /* Message type selector */
    .message-drafter-message-type-select {
        padding: 6px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        background-color: white;
    }
    
    /* Loading state */
    .message-drafter-saving {
        opacity: 0.7;
    }
    
    /* Error state */
    .message-drafter-error {
        color: #d73a49;
        font-size: 12px;
        margin-top: 4px;
    }
`;function injectStyles(){var e;return document.getElementById("message-drafter-styles")?document.getElementById("message-drafter-styles"):((e=document.createElement("style")).id="message-drafter-styles",e.textContent=messageDrafterStyles,document.head.appendChild(e),e)}module.exports={messageDrafterStyles:messageDrafterStyles,injectStyles:injectStyles};
