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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,styles=`
    .gsc-cli-bridge-modal-content {
        min-width: 800px;
    }

    /* Header */
    .gsc-cli-bridge-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        background-color: #fafafa;
    }

    .gsc-cli-bridge-header h2 {
        margin: 0;
        font-size: 18px;
        color: #333;
    }

    /* Content Area */
    .gsc-cli-bridge-body {
        padding: 20px;
    }

    /* --- Tabbed Interface Styles --- */
    
    /* Wrapper for the Tabs navigation bar */
    .gsc-cli-bridge-tabs-wrapper {
        margin-bottom: 15px;
    }

    /* Wrapper for the Tab Content Panes */
    .gsc-cli-bridge-content-wrapper {
        position: relative;
        min-height: 200px; /* Ensure height doesn't collapse when switching tabs */
    }

    /* Individual Tab Pane */
    .gsc-cli-bridge-tab-pane {
        display: none;
        animation: fadeIn 0.2s ease-in-out;
    }

    /* Active Tab Pane */
    .gsc-cli-bridge-tab-pane.active {
        display: block;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* --- Legacy View Sections (Setup/Active/Aborted) --- */
    /* These are now rendered inside the 'Code' tab pane */
    .gsc-cli-bridge-view-section {
        /* Styles previously here are now handled by the tab pane logic */
    }
    
    .gsc-cli-bridge-view-section.active {
        display: block;
        margin-top: 15px;
        font-size: 14px;
    }

    /* Typography */
    .gsc-cli-bridge-text {
        font-size: 15px;
        color: #666;
        line-height: 1.5;
    }

    .gsc-cli-bridge-info-text {
        margin-bottom: 20px;
    }

    /* Example Section (Setup View) */
    .gsc-cli-bridge-example-section {
        margin-bottom: 25px;
    }

    .gsc-cli-bridge-example-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 14px;
        color: #333;
    }

    .gsc-cli-bridge-command-box {
        background-color: #f8f8f8;
        color: black;
        border: 1px solid #ddd;
        padding: 12px 15px;
        border-radius: 4px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 13px;
        word-break: break-all;
    }

    .gsc-cli-bridge-code-placeholder {
        color: #ff7f0e;
        font-weight: bold;
    }

    .gsc-cli-bridge-example-description {
        font-size: 13px;
        color: #666;
        margin-top: 5px;
    }

    /* Configuration Row (Flex Layout) */
    .gsc-cli-bridge-config-row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    .gsc-cli-bridge-config-item {
        flex: 1;
    }

    /* Form Elements */
    .gsc-cli-bridge-form-group {
        margin-bottom: 20px;
    }

    .gsc-cli-bridge-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 14px;
        color: #333;
    }

    .gsc-cli-bridge-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
    }

    .gsc-cli-bridge-input-hint {
        font-size: 12px;
        color: #888;
        margin-top: 5px;
    }

    /* Buttons */
    .gsc-cli-bridge-btn-container {
        display: flex;
        gap: 10px;
    }

    /* Active View Specifics */
    .gsc-cli-bridge-code-display {
        text-align: center;
        margin: 20px 0;
    }

    .gsc-cli-bridge-code-number {
        font-size: 46px;
        font-weight: bold;
        color: #333;
        letter-spacing: 6px;
        cursor: pointer;
        transition: opacity 0.2s;
        user-select: all;
    }

    .gsc-cli-bridge-code-number:hover {
        opacity: 0.8;
    }

    .gsc-cli-bridge-active-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .gsc-cli-bridge-timer-display {
        font-size: 14px;
        color: #666;
    }

    .gsc-cli-bridge-timer-display.warning {
        color: #dc3545;
        font-weight: bold;
    }
`;function injectStyles(){return document.getElementById("gsc-cli-bridge-styles")?document.getElementById("gsc-cli-bridge-styles"):DomUtils.h.injectStyles(styles,"gsc-cli-bridge-styles")}module.exports={injectStyles:injectStyles,styles:styles};
