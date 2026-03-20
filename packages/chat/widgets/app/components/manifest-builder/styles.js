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

let manifestBuilderStyles=`
/* Form Group */
.mb-form-group {
    margin-bottom: 15px;
}

/* Form Label */
.mb-form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
    font-size: 14px;
}

/* Form Input */
.mb-form-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    font-family: inherit;
}

.mb-form-input:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.mb-form-input:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

/* Input with Reset Button Wrapper */
.mb-input-with-reset {
    position: relative;
    display: inline-block;
    width: 100%;
}

.mb-input-with-reset .mb-form-input {
    padding-right: 36px;
}

/* Form Textarea */
.mb-form-textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    font-family: inherit;
    min-height: 50px;
    resize: vertical;
}

.mb-form-textarea:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

/* Form Select */
.mb-form-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    font-family: inherit;
    background-color: white;
}

.mb-form-select:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

/* Form Hint */
.mb-form-hint {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}

/* AI Help Link */
.mb-ai-help-link {
    display: inline-block;
    margin-top: 10px;
    color: #2196F3;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
}

.mb-ai-help-link:hover {
    text-decoration: underline;
}

.mb-ai-help-link:disabled {
    color: #999;
    cursor: not-allowed;
    text-decoration: none;
}

/* AI Section */
.mb-ai-section {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e9ecef;
}

/* AI Section Label */
.mb-ai-section-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
    font-size: 14px;
}

/* AI Section Row */
.mb-ai-section-row {
    display: flex;
    gap: 10px;
    align-items: center;
}

/* AI Section Select */
.mb-ai-section-select {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    font-family: inherit;
    background-color: white;
}

.mb-ai-section-select:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

/* AI Section Button */
.mb-ai-section-button {
    padding: 8px 16px;
    border: 1px solid #2196F3;
    border-radius: 4px;
    background-color: #2196F3;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
}

.mb-ai-section-button:hover {
    background-color: #1976D2;
    border-color: #1976D2;
}

.mb-ai-section-button:disabled {
    background-color: #e0e0e0;
    border-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
}

/* Button Container */
.mb-button-container {
    display: flex;
    gap: 10px;
    margin-top: 25px;
    justify-content: flex-end;
}

/* Reset Button */
.mb-reset-button {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    vertical-align: middle;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
}

.mb-reset-button:hover {
    background-color: #e9ecef;
    color: #333;
}

.mb-reset-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Show reset button when input is focused or has value */
.mb-input-with-reset:has(.mb-form-input:focus) .mb-reset-button,
.mb-input-with-reset:has(.mb-form-input:not(:placeholder-shown)) .mb-reset-button {
    opacity: 1;
    pointer-events: auto;
}

.mb-reset-button:not(:disabled):hover {
    background-color: #e9ecef;
    color: #333;
}

/* Error State */
.mb-form-input.error,
.mb-form-textarea.error {
    border-color: #dc3545;
}

.mb-form-input.error:focus,
.mb-form-textarea.error:focus {
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.mb-error-message {
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
}

/* Character Counter */
.mb-character-counter {
    font-size: 11px;
    color: #999;
    text-align: right;
    margin-top: 2px;
}

.mb-character-counter.warning {
    color: #ffc107;
}

.mb-character-counter.error {
    color: #dc3545;
}
`;module.exports={manifestBuilderStyles:manifestBuilderStyles};
