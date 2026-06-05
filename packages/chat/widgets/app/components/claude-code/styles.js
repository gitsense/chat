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

let CHAT_STYLES=`
    .gsc-chat-progress-container {
        width: 100%;
        background: #ffffff;
        border: 1px solid #e1e4e8;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 10px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .gsc-chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
    }
    .gsc-chat-title {
        font-weight: 600;
        font-size: 1.5em;
        display: flex;
        align-items: center;
        color: black;
        gap: 8px;
    }
    .gsc-chat-timer {
        font-family: 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', monospace;
        background: #f6f8fa;
        color: #586069;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.85em;
        border: 1px solid #e1e4e8;
    }
    .gsc-chat-status {
        font-size: 1.1em;
        font-weight: 600;
        color: #333;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .gsc-chat-spinner {
        width: 16px;
        height: 16px;
        border: 3px solid rgba(51, 51, 51, 0.3);
        border-radius: 50%;
        border-top-color: #666666;
        animation: gsc-chat-spin 1s ease-in-out infinite;
    }
    @keyframes gsc-chat-spin {
        to { transform: rotate(360deg); }
    }
    .gsc-chat-log {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: 15px;
        border-radius: 6px;
        font-family: 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', monospace;
        font-size: 0.8em;
        line-height: 1.5;
        max-height: 150px;
        overflow-y: auto;
        white-space: pre-wrap;
        border: 1px solid #333;
    }
    .log-entry {
        margin-bottom: 2px;
        opacity: 0;
        animation: gsc-chat-fadeIn 0.3s forwards;
    }
    .log-timestamp {
        color: #858585;
        margin-right: 8px;
    }
    @keyframes gsc-chat-fadeIn {
        to { opacity: 1; }
    }
    
    /* ==================== Enhanced Thinking Container ==================== */
    .gsc-chat-thinking-container {
        background: #fff8e1;
        border-left: 3px solid #ffc107;
        border-radius: 0 6px 6px 0;
        padding: 12px;
        margin-bottom: 15px;
        max-height: 200px;
        overflow-y: auto;
    }
    .gsc-chat-thinking-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
        color: #5d4037;
    }
    .gsc-chat-thinking-icon {
        font-size: 16px;
    }
    .gsc-chat-thinking-content {
        font-size: 13px;
        line-height: 1.5;
        color: #5d4037;
        white-space: pre-wrap;
        word-break: break-word;
    }
    
    /* ==================== Status Container ==================== */
    .gsc-chat-status-container {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        font-size: 12px;
        color: #586069;
        margin-top: 10px;
    }
    .gsc-chat-status-label {
        font-weight: 500;
    }
    .gsc-chat-char-count {
        font-family: 'SF Mono', 'Segoe UI Mono', monospace;
        color: #0366d6;
        font-weight: 600;
    }
    
    /* ==================== Metrics Display ==================== */
    .gsc-chat-metrics-container {
        margin-top: 20px;
    }

    .gsc-chat-metrics-header {
        font-weight: 600;
        margin-bottom: 10px;
        color: #24292e;
        font-size: 14px;
    }
    .gsc-chat-metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
    }
    .gsc-chat-metric-item {
        background: white;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #e1e4e8;
    }
    .gsc-chat-metric-label {
        font-size: 12px;
        color: #586069;
        margin-bottom: 4px;
    }
    .gsc-chat-metric-value {
        font-size: 16px;
        font-weight: 600;
        color: #24292e;
    }
    .gsc-chat-metric-suffix {
        font-size: 12px;
        color: #586069;
        font-weight: normal;
    }

    /* ==================== Agent Session States ==================== */
    .gsc-agent-stopped {
        padding: 20px;
        background-color: #fff3cd;
        border: 1px solid #ffc107;
        border-radius: 8px;
        color: #856404;
    }

    .gsc-agent-error {
        padding: 20px;
        background-color: #ffebee;
        border: 1px solid #ffcdd2;
        border-radius: 8px;
        color: #c62828;
    }
`;module.exports={CHAT_STYLES:CHAT_STYLES};
