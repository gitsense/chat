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

let exportModalStyles=`
/* Export Modal */
.gs-export-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(95vh - 60px); /* Account for header height */
}

/* Scrollable content area */
.gs-export-modal-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 10px 20px 20px 20px;
}

.gs-export-modal-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Section styles */
.gs-export-modal-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.gs-export-modal-section-title {
    font-weight: 600;
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
}

.gs-export-modal-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.gs-export-modal-option {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: normal;
}

.gs-export-modal-option input[type="radio"] {
    margin: 0;
}

/* Skim Settings Section */
.gs-export-modal-skim-settings {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 15px;
}

.gs-export-modal-skim-option {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.gs-export-modal-skim-option label {
    font-weight: normal;
    min-width: 100px;
}

.gs-export-modal-skim-option select {
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
    min-width: 60px;
}

/* Configure link */
.gs-export-modal-options a {
    color: #0366d6;
    text-decoration: none;
    font-size: 13px;
    margin-top: 5px;
    align-self: flex-start;
}

.gs-export-modal-options a:hover {
    text-decoration: underline;
}

/* Filename input */
.gs-export-modal-filename {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.gs-export-modal-filename:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Fixed Footer Styles */
.gs-export-modal-footer {
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

.gs-export-modal-footer-right {
    display: flex;
    gap: 10px;
}

/* Button styles */
.gs-export-modal-footer button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.gs-export-modal-footer button:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
}

.gs-export-modal-footer button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.gs-export-modal-footer button.btn-primary {
    background-color: #0366d6;
    border-color: #0366d6;
    color: white;
}

.gs-export-modal-footer button.btn-primary:hover {
    background-color: #0256cc;
}

.gs-export-modal-footer button.btn-outline {
    background-color: transparent;
    border-color: #0366d6;
    color: #0366d6;
}

.gs-export-modal-footer button.btn-outline:hover {
    background-color: #f0f8ff;
}

/* Notification styles */
.gs-export-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 4px;
    z-index: 1000003;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-size: 14px;
    max-width: 300px;
}

.gs-export-notification.success {
    background-color: #d4edda;
    color: #155724;
}

.gs-export-notification.error {
    background-color: #f8d7da;
    color: #721c24;
}

.gs-export-notification.info {
    background-color: #d1ecf1;
    color: #0c5460;
}
`;module.exports=exportModalStyles;
