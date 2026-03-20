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

let dropzoneStyles=`
    /* Dropzone specific styles */
    .import-data-dropzone-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .import-data-dropzone-intro {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        line-height: 1.4;
    }
    
    /* Toggle component styles */
    .import-data-toggle-container {
        display: flex;
        width: 350px;
        margin-bottom: 25px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    }
    
    .import-data-toggle-option {
        flex: 1;
        padding: 7px 15px;
        text-align: center;
        cursor: pointer;
        background-color: #f8f9fa;
        border: none;
        font-size: 14px;
        transition: background-color 0.2s;
    }
    
    .import-data-toggle-option.active {
        background-color: #1976D2;
        color: white;
    }
    
    .import-data-toggle-option:hover:not(.active) {
        background-color: #e9ecef;
    }
    
    /* Input area container */
    .import-data-input-area-container {
        position: relative;
    }
    
    /* Dropzone area styles */
    .import-data-dropzone-area {
        border: 2px dashed #ccc;
        border-radius: 8px;
        padding: 40px 20px;
        text-align: center;
        background-color: #fafafa;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .import-data-dropzone-area:hover {
        border-color: #1976D2;
        background-color: #eff6fa;
    }
    
    .import-data-dropzone-area.dragover {
        border-color: #1976D2;
        background-color: #ddf4ff;
        transform: scale(1.02);
    }
    
    .import-data-dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .import-data-dropzone-text {
        font-size: 20px;
        color: #666;
        margin-bottom: 10px;
    }
    
    .import-data-dropzone-hint {
        font-size: 14px;
        color: #999;
        margin-bottom: 15px;
    }
    
    .import-data-select-files-btn {
        background-color: #1976D2;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s;
    }
    
    .import-data-select-files-btn:hover {
        background-color: #0860ca;
    }
    
    /* Snippet area styles */
    .import-data-snippet-area {
        padding: 20px;
        border: 2px dashed #ccc;
        border-radius: 8px;
        background-color: #fafafa;
    }
    
    .import-data-form-textarea {
        width: 100%;
        min-height: 200px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 13px;
        font-family: monospace;
        box-sizing: border-box;
        resize: vertical;
    }
    
    .import-data-form-textarea:focus {
        border-color: #1976D2;
        outline: none;
        box-shadow: 0 0 0 2px rgba(9, 105, 218, 0.2);
    }
    
    /* Limits indicator styles */
    .import-data-limits-indicator {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #666;
        gap: 10px;
    }
    
    .import-data-limit-item {
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .import-data-limit-item.warning {
        color: #856404;
    }
    
    .import-data-limit-item.error {
        color: #721c24;
    }
    
    .import-data-limit-icon {
        font-size: 14px;
    }
    
    .import-data-limit-text {
        font-weight: 500;
    }
    
    .import-data-limits-message {
        font-size: .9em;
        color: #666;
        text-align: center;
        font-style: italic;
        margin-top: -7px;
        margin-bottom: 10px;
    }
    
    /* Warning banner styles - Updated to red color scheme for skipped files */
    .import-data-warning-banner {
        background-color: #f8d7da;
        color: #721c24;
        padding: 12px 15px;
        border-left: 4px solid #dc3545;
        border-radius: 4px;
        margin-bottom: 15px;
        font-size: 14px;
        line-height: 1.4;
    }
    
    /* Repository configuration styles */
    .import-data-repo-config {
        border-radius: 8px;
    }
    
    .import-data-repo-config h3 {
        color: #333;
    }
    
    .import-data-repo-config-subtitle {
        color: #666;
        font-size: 14px;
        text-align: center;
        margin-bottom: 15px;
    }
    
    /* Repository name preview styles */
    .import-data-repo-name-preview {
        margin-top: 10px;
        padding: 10px;
        background-color: #f8f9fa;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        color: #333;
    }
    
    .import-data-preview-prefix {
        color: #333;
    }
    
    .import-data-preview-suffix {
        color: #1976D2;
        font-weight: bold;
    }
    
    /* Repository visibility note styles */
    .import-data-visibility-note {
        margin-top: 0;
        padding: 12px 15px;
        border-left: 3px solid #ccc;
        background-color: #f7f7f7;
        border-radius: 0 4px 4px 0;
        font-size: 14px;
        color: #666;
    }
    
    .import-data-visibility-note p {
        margin: 0;
    }
    
    .import-data-visibility-note strong {
        color: #333;
    }
    
    /* File list styles */
    .import-data-file-list {
        margin-top: 20px;
    }
    
    .import-data-file-list h3 {
        margin-top: 0;
        font-size: 16px;
        color: #333;
    }
    
    .import-data-file-items {
        margin-top: 10px;
    }
    
    .import-data-file-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 10px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
    }
    
    .import-data-file-item:last-child {
        border-bottom: none;
    }
    
    /* Skipped file item styles - Updated to red color scheme */
    .import-data-file-item-skipped {
        background-color: #fff5f5;
        border: 1px solid #fed7d7;
        border-radius: 4px;
        padding: 8px 10px;
        margin-bottom: 8px;
    }
    
    .import-data-file-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .import-data-file-icon {
        color: #666;
        width: 16px;
        height: 16px;
    }
    
    .import-data-file-name {
        font-weight: 500;
    }
    
    .import-data-file-name-skipped {
        text-decoration: line-through;
        color: #999;
        opacity: 0.7;
    }
    
    .import-data-file-size {
        color: #666;
    }
    
    .import-data-file-status-container {
        display: flex;
        align-items: baseline;
        gap: 10px;
    }
    
    .import-data-file-status {
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 12px;
        background-color: #f0f0f0;
        color: #666;
    }
    
    .import-data-file-status.warning {
        background-color: #fff3cd;
        color: #856404;
    }
    
    .import-data-file-status.error {
        background-color: #dc3545;
        color: #ffffff;
    }
    
    .import-data-remove-file-btn {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        font-size: 16px;
        padding: 5px;
    }
    
    .import-data-remove-file-btn:hover {
        color: #333;
    }
    
    /* Actions styles */
    .import-data-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #eee;
    }
    
    .import-data-file-summary {
        font-size: 14px;
        color: #666;
    }
    
    .import-data-action-buttons {
        display: flex;
        gap: 10px;
    }
    
    .import-data-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }
    
    .import-data-btn-secondary {
        background-color: #f0f0f0;
        color: #333;
    }
    
    .import-data-btn-secondary:hover {
        background-color: #e0e0e0;
    }
    
    .import-data-btn-primary {
        background-color: #1976D2;
        color: white;
    }
    
    .import-data-btn-primary:hover {
        background-color: #0860ca;
    }
    
    .import-data-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* Import progress styles */
    .import-progress-container,
    .import-error-container,
    .import-success-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        text-align: center;
    }
    
    .import-progress-message,
    .import-error-message,
    .import-success-message {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 15px;
    }
    
    .import-error-message {
        color: #721c24;
    }
    
    .import-success-message {
        color: #155724;
    }
    
    .import-progress-details,
    .import-success-details {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
    }
    
    .import-progress-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #ff7f0e;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    
    .import-success-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    .import-success-view-btn,
    .import-success-close-btn,
    .import-error-close-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    
    .import-success-view-btn {
        background-color: #1976D2;
        color: white;
    }
    
    .import-success-view-btn:hover {
        background-color: #0860ca;
    }
    
    .import-success-close-btn,
    .import-error-close-btn {
        background-color: #f0f0f0;
        color: #333;
    }
    
    .import-success-close-btn:hover,
    .import-error-close-btn:hover {
        background-color: #e0e0e0;
    }
    
    /* Enhanced error display styles */
    .import-error-details {
        width: 100%;
        margin: 15px 0;
        text-align: left;
    }
    
    .import-error-details h4 {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #333;
    }
    
    .import-error-details pre {
        background-color: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 4px;
        padding: 10px;
        font-size: 12px;
        color: #333;
        overflow: auto;
        max-height: 150px;
        white-space: pre-wrap;
    }
    
    .import-error-debug {
        margin: 10px 0;
        width: 100%;
        text-align: left;
    }
    
    .import-error-debug small {
        color: #6c757d;
        font-style: italic;
    }
    
    .import-error-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        width: 100%;
        justify-content: center;
    }
    
    .import-error-retry-btn {
        background-color: #1976D2;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    
    .import-error-retry-btn:hover {
        background-color: #0860ca;
    }
    
    .import-error-retry-btn:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
    
    /* Error type specific styles */
    .import-error-container.validation {
        border-left: 4px solid #dc3545;
    }
    
    .import-error-container.network {
        border-left: 4px solid #fd7e14;
    }
    
    .import-error-container.system {
        border-left: 4px solid #6f42c1;
    }
    
    .import-error-container.repository {
        border-left: 4px solid #e83e8c;
    }
    
    .import-error-container.fileProcessing {
        border-left: 4px solid #20c997;
    }
    
    /* Error icon styles */
    .import-error-icon {
        width: 40px;
        height: 40px;
        margin-bottom: 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
    }
    
    .import-error-icon.validation {
        background-color: #dc3545;
    }
    
    .import-error-icon.network {
        background-color: #fd7e14;
    }
    
    .import-error-icon.system {
        background-color: #6f42c1;
    }
    
    .import-error-icon.repository {
        background-color: #e83e8c;
    }
    
    .import-error-icon.fileProcessing {
        background-color: #20c997;
    }
    
    /* Retry indicator styles */
    .import-error-retry-indicator {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 10px;
        font-size: 12px;
        color: #6c757d;
    }
    
    .import-error-retry-indicator .retry-count {
        font-weight: bold;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;module.exports={dropzoneStyles:dropzoneStyles};
