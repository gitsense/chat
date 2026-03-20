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
/* Main Overlay */
.gsc-st-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none; /* Hidden by default */
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

/* Main Modal Container */
.gsc-st-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 90vw;
    height: 90vh;
}

/* Header */
.gsc-st-header {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: anchor-center;
    background-color: #fff;
}

.gsc-st-header-left {
    display: flex;
    flex-direction: column;
}

.gsc-st-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
}

.gsc-st-esc-hint {
    position: relative;
    top: 2px;
    font-size: 12px;
    color: #444;
    font-weight: normal;
}

.gsc-st-esc-dismiss-link {
    position: relative;
    top: 2px;
    font-size: 12px;
    font-weight: normal;
}

/* Header Action Links */
.gsc-st-header-actions {
    margin-top: 7px;
    font-size: 12px;
    font-weight: 500;
}

.gsc-st-copy-link {
    color: black;
    text-decoration: none;
    cursor: pointer;
    margin-right: 12px;
}

.gsc-st-copy-link:hover {
    text-decoration: underline;
}

/* Stop Button */
.gsc-st-stop-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
}

.gsc-st-stop-button:disabled {
    background-color: #e9ecef;
    color: #adb5bd;
    cursor: not-allowed;
}

/* Body (Split Pane) */
.gsc-st-body {
    flex: 1;
    display: flex;
    overflow: hidden;
}

/* History Browser (Left Pane) */
.gsc-st-history-pane {
    width: 280px;
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
}

.gsc-st-history-header {
    padding: 10px 15px;
    font-size: 12px;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    border-bottom: 1px solid #e0e0e0;
}

.gsc-st-history-list {
    flex: 1;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
}

.gsc-st-history-item {
    padding: 10px 15px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
    font-size: 12px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.gsc-st-history-item:hover {
    background-color: #e9ecef;
}

.gsc-st-history-item-active {
    background-color: #e3f2fd;
    border-left: 3px solid #007bff;
}

.gsc-st-history-timestamp {
    display: block;
    font-size: 10px;
    color: #999;
    margin-bottom: 2px;
}

/* Main View (Right Pane) */
.gsc-st-main-pane {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #1e1e1e;
    color: #ddd;
}

.gsc-st-output-area {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
}

.gsc-st-prompt {
    color: #4ec9b0;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}

/* Input Area - Column Layout */
.gsc-st-input-area {
    padding: 10px 15px;
    background-color: #252526;
    border-top: 1px solid #333;
    display: flex;
    flex-direction: column;
}

/* Path Row - Full Width */
.gsc-st-path-row {
    width: 100%;
    padding-bottom: 5px;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
    font-size: 12px;
}

.gsc-st-prompt-path {
    color: #FF4500; /* Red-Orange */
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}

/* Input Row - Symbol + Input */
.gsc-st-input-row {
    display: flex;
    align-items: center;
    width: 100%;
}

.gsc-st-prompt-symbol {
    color: #4ec9b0;
    margin-right: 10px;
    font-weight: bold;
    white-space: nowrap;
}

.gsc-st-command-input {
    flex: 1;
    background: transparent;
    border: none;
    color: #d4d4d4;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
    font-size: 13px;
    outline: none;
}

.gsc-st-command-input::placeholder {
    color: #ddd;
    opacity: 1;
}

.gsc-st-command-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Footer */
.gsc-st-footer {
    padding: 15px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
}

.gsc-st-controls {
    display: flex;
    gap: 10px;
}

.gsc-st-select {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 13px;
    outline: none;
}

.gsc-st-select:focus {
    border-color: #007bff;
}

.gsc-st-actions {
    display: flex;
    gap: 10px;
}

.gsc-st-button {
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
}

.gsc-st-button:hover {
    background-color: #f8f9fa;
}

.gsc-st-button-primary {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

.gsc-st-button-primary:hover {
    background-color: #0056b3;
}
`;module.exports={styles:styles};
