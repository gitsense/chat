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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,CONTRACT_CONSTANTS=require("./constants").CONTRACT_CONSTANTS,styles=`
    /* =========================================
       WIDGET STYLES (Pill)
       ========================================= */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        border-radius: 20px;
        padding: 6px 12px;
        transition: all 0.2s ease;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget-left {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget-right {
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
        font-weight: 600;
        font-size: 12px;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-icon {
        width: 16px;
        height: 16px;
    }

    /* Widget State: Muted */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget.muted {
        background-color: #f7fafc;
        border: 1px solid #e2e8f0;
        color: #718096;
    }

    /* Widget State: Active */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget.active {
        background-color: #f0fff4;
        border: 1px solid #c6f6d5;
        color: #2f855a;
    }

    /* Widget State: Expiring */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget.expiring {
        background-color: #fffaf0;
        border: 1px solid #feebc8;
        color: #c05621;
    }

    /* Widget State: Expired */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget.expired {
        background-color: #fff5f5;
        border: 1px solid #fed7d7;
        color: #c53030;
    }

    /* Widget State: Done */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-widget.done {
        background-color: #edf2f7;
        border: 1px solid #cbd5e0;
        color: #4a5568;
    }

    /* =========================================
       MODAL STYLES
       ========================================= */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-modal {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        max-height: 90vh;
    }

    /* Modal Widths */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-modal.mode-new-file {
        width: 600px;
        max-width: 90vw;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-modal.mode-update {
        width: 1100px;
        max-width: 95vw;
        min-width: 600px;
    }

    /* Modal Header */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-modal-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        background-color: #fafafa;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-modal-header h3 {
        margin: 0;
        font-size: 18px;
        color: #333;
    }

    /* Modal Body */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-modal-body {
        padding: 20px;
        overflow-y: auto;
        flex: 1;
    }

    /* Path Section */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-path-section {
        margin-bottom: 20px;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-path-section label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 14px;
        color: #333;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-path-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-path-display {
        padding: 10px;
        background-color: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 4px;
        font-family: monospace;
        color: #495057;
        display: flex;
        align-items: center;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-hint {
        font-size: 12px;
        color: #888;
        margin-top: 5px;
    }

    /* Diff Section */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-diff-section {
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f8f8f8;
        max-height: ${CONTRACT_CONSTANTS.CONFIG.DIFF_MAX_HEIGHT};
        overflow-y: auto;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-diff-content {
        margin: 0;
        padding: 10px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 13px;
        white-space: pre-wrap;
    }

    /* Diff Syntax Highlighting */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-diff-add {
        color: #22863a;
        background-color: #f0fff4;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-diff-remove {
        color: #b31d28;
        background-color: #ffebe9;
    }

    .${CONTRACT_CONSTANTS.CSS_PREFIX}-diff-header {
        color: #6a737d;
        font-weight: bold;
    }

    /* Error Box */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-error-box {
        color: #d73a49;
        padding: 10px;
        background: #ffebe9;
        border-radius: 4px;
        border: 1px solid #f97583;
        font-size: 14px;
    }

    /* Spinner */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(0,0,0,0.1);
        border-radius: 50%;
        border-top-color: #007bff;
        animation: ${CONTRACT_CONSTANTS.CSS_PREFIX}-spin 1s ease-in-out infinite;
        margin-right: 10px;
    }

    @keyframes ${CONTRACT_CONSTANTS.CSS_PREFIX}-spin {
        to { transform: rotate(360deg); }
    }

    /* Modal Footer */
    .${CONTRACT_CONSTANTS.CSS_PREFIX}-modal-footer {
        padding: 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        background-color: #fafafa;
    }
`;function injectStyles(){var o=CONTRACT_CONSTANTS.CSS_PREFIX+"-styles";return document.getElementById(o)?document.getElementById(o):DomUtils.h.injectStyles(styles,o)}module.exports={injectStyles:injectStyles,styles:styles};
