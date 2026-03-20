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

let previewPanelStyles=`
/* Preview Panel Container */
.gs-preview-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    padding: 0,
}

/* Skim Options */
.gs-skim-options {
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid #ccc;
}

.gs-skim-options select {
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 13px;
    background-color: #fff;
}

.gs-preset-button {
    padding: 4px 8px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: #fff;
    cursor: pointer;
}

.gs-preset-button:hover {
    background-color: #f0f0f0;
}

/* Messages Container */
.gs-messages-container {
    flex: 1;
    overflow: auto;
}

/* Message Preview */
.gs-message-preview {
    overflow: hidden;
}

/* Avatar Container */
.gs-message-avatar {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.gs-message-avatar svg {
    width: 18px;
    height: 18px;
}

/* Updated Message Header */
.gs-message-header {
    padding: 8px 12px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.gs-message-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.gs-message-header-right {
    display: flex;
    gap: 8px;
    align-items: center;
}

.gs-message-preview:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.gs-message-position {
    font-weight: 500;
    cursor: pointer;
}

.gs-message-position:hover {
    text-decoration: underline;
}

/* Message Actions */
.gs-message-actions {
    display: flex;
    gap: 8px;
}

.gs-action-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gs-action-button:hover {
    background-color: #f0f0f0;
}

/* Message Content */
.gs-message-content-container {
    padding: 12px;
}

.gs-message-content {
    margin: 0;
    font-family: monospace;
    font-size: 13px;
    line-height: 1.4;
    white-space: pre-wrap;
    overflow: auto;
    max-height: 300px;
}

.gs-expand-link,
.gs-collapse-link {
    text-align: center;
    color: #0366d6;
    cursor: pointer;
    margin-top: 8px;
    font-size: 13px;
    padding: 4px;
    border-radius: 4px;
}

.gs-expand-link:hover,
.gs-collapse-link:hover {
    background-color: #f0f8ff;
}

/* Message Actions Container */
.gs-message-actions-container {
    display: flex; /* Enable flex for left/right alignment */
    justify-content: space-between; /* Space out left and right containers */
    align-items: center;
    border-top: 1px solid #ddd;
    padding: 8px;
}

.gs-message-actions-left {
    display: flex;
    gap: 7px;
    align-items: center;
}

.gs-message-actions-right {
    display: flex;
    gap: 10px;
    align-items: center;
}

.gs-message-action-link {
    display: inline-block;
    text-decoration: none;
    font-size: 13px;
}

/* Message Modal */
.gs-message-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.gs-message-info-header {
    padding: 12px 20px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
}

.gs-message-tab-nav {
    display: flex;
    border-bottom: 1px solid #eee;
}

.gs-tab-button {
    padding: 10px 20px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
}

.gs-tab-button.active {
    font-weight: 500;
}

.gs-message-content-area {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.gs-message-raw-view {
    flex: 1;
    padding: 20px;
    margin: 0;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow: auto;
}

.gs-message-rendered-view {
    flex: 1;
    padding: 20px;
    overflow: auto;
}

/* Notification */
.gs-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 4px;
    z-index: 1000002;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-size: 14px;
    max-width: 300px;
}

.gs-notification.success {
    background-color: #d4edda;
    color: #155724;
}

.gs-notification.error {
    background-color: #f8d7da;
    color: #721c24;
}

.gs-notification.info {
    background-color: #d1ecf1;
    color: #0c5460;
}

/* Add Message Modal Styles */
.gs-add-message-modal {
    display: flex;
    flex-direction: column;
}

.gs-add-message-explanation p {
    margin-bottom: 10px;
}

.gs-add-message-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.gs-add-message-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

/* Focus Modal Styles */
.gs-focus-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.gs-focus-modal-content {
    flex: 1;
    overflow: hidden;
}

.gs-focus-message-content {
    height: 100%;
    overflow: auto;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 4px;
    margin: 10px;
    font-size: 13px;
    font-family: monospace;
    line-height: 1.7;
    padding: 15px;
}
`;module.exports=previewPanelStyles;
