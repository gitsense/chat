/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

let STYLES=`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.intent-trigger-widget {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.widget-header {
    margin-bottom: 20px;
}

.widget-title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.widget-description {
    font-size: 14px;
    color: #666;
}

.intent-section {
    margin-bottom: 20px;
}

.section-label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.edit-hint {
    font-size: 11px;
    color: #999;
    font-weight: normal;
}

.intent-textarea {
    width: 100%;
    min-height: 120px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 12px;
    color: #333;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
    font-size: 13px;
    line-height: 1.5;
    resize: vertical;
}

.intent-textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.model-section {
    margin-bottom: 20px;
}

.model-select {
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 10px 12px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
}

.model-select:focus {
    outline: none;
    border-color: #667eea;
}

.model-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

/* Error States */
.error-widget {
    background: #fff5f5;
    border: 1px solid #fed7d7;
}

.error-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.error-icon {
    width: 24px;
    height: 24px;
    background: #e53e3e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
}

.error-title {
    font-size: 18px;
    font-weight: 600;
    color: #c53030;
}

.error-message {
    background: #fff;
    border: 1px solid #feb2b2;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 15px;
}

.error-label {
    font-size: 12px;
    font-weight: 600;
    color: #c53030;
    margin-bottom: 6px;
}

.error-text {
    font-size: 13px;
    color: #742a2a;
    font-family: 'SF Mono', Monaco, monospace;
    white-space: pre-wrap;
    word-break: break-all;
}

.warning-widget {
    background: #fffff0;
    border: 1px solid #fefcbf;
}

.warning-icon {
    background: #d69e2e;
}

.warning-title {
    color: #975a16;
}

.warning-message {
    padding: 15px;
    background: #fff;
    border: 1px solid #fbd38d;
    border-radius: 6px;
    margin-bottom: 15px;
}

.warning-label {
    font-weight: 600;
    font-size: 16px;
    color: #975a16;
    margin-bottom: 3px;
}

.warning-text {
    color: #744210;
    font-size: 14px;
}

.info-box {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 15px;
}

.info-text {
    font-size: 13px;
    color: #2c5282;
}

.char-count {
    font-size: 12px;
    color: #999;
    margin-top: 7px;
}

.char-count.warning {
    color: #d69e2e;
}

.char-count.error {
    color: #e53e3e;
}

.delete-hint {
    font-size: 11px;
    color: #999;
    margin-top: 10px;
    font-style: italic;
}
`;module.exports={STYLES:STYLES};
