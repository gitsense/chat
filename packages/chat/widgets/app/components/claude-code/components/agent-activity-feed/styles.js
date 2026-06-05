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

let AGENT_ACTIVITY_FEED_STYLES=`
    /* ==================== Container ==================== */
    .gsc-agent-activity-feed {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #24292e;
    }

    /* ==================== Two-Container Architecture ==================== */
    .gsc-agent-activity-feed-wrapper {
        display: flex;
        flex-direction: column;
    }

    .gsc-agent-activity-container {
        /* Scrollable activity container */
        min-height: 25px;
        max-height: 400px;
        overflow-y: auto;
        padding: 0 15px 15px 15px;
    }

    .gsc-agent-status-container {
        /* Fixed height status container */
        height: 25px;
        min-height: 25px;
        max-height: 25px;
        padding: 5px;
        background: #f6f8fa;
        border-top: 1px solid #ddd;
        font-size: 12px;
        color: #586069;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .gsc-agent-status-container .spinner {
        animation: spin 1s linear infinite;
    }

    .gsc-agent-status-container .label {
        font-weight: 500;
        border: 0;
    }

    .gsc-agent-status-container .char-count {
        font-family: 'SF Mono', 'Segoe UI Mono', monospace;
    }

    /* ==================== Post-Processing Status ==================== */
    .gsc-agent-status-container .post-processing-status {
        color: #0366d6;
        font-weight: 600;
    }

    .gsc-agent-status-container .post-processing-status .label {
        animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    /* ==================== Activity Items ==================== */
    .gsc-agent-activity-item {
        padding: 15px 0px;
        border-bottom: 1px solid #f6f8fa;
        transition: background 0.2s ease;
        animation: fadeIn 0.3s ease-in;
    }

    .gsc-agent-activity-item:hover {
        background: #f6f8fa;
    }

    .gsc-agent-activity-item:last-child {
        border-bottom: none;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* ==================== Header Row ==================== */
    .gsc-agent-activity-header-row {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }

    .gsc-agent-activity-icon {
        flex-shrink: 0;
        font-size: 18px;
        margin-top: 2px;
    }

    .gsc-agent-activity-content {
        flex: 1;
        min-width: 0;
    }

    .gsc-agent-activity-timestamp {
        font-size: 12px;
        color: #6a737d;
        margin-left: auto;
        white-space: nowrap;
    }

    /* ==================== Content Elements ==================== */
    .gsc-agent-activity-title {
        font-weight: 600;
        font-size: 14px;
        margin: 0 0 4px 0;
        color: #24292e;
    }

    .gsc-agent-activity-description {
        color: #586069;
        font-size: 13px;
        margin: 0 0 8px 0;
        line-height: 1.5;
    }

    /* ==================== Status Indicators ==================== */
    .gsc-agent-activity-receiving-indicator {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 8px;
        font-size: 12px;
        color: #6a737d;
        padding: 8px;
        background: #f8f9fa;
        border-radius: 4px;
    }

    .gsc-agent-activity-receiving-indicator .spinner {
        animation: spin 1s linear infinite;
    }

    .gsc-agent-activity-processing-indicator,
    .gsc-agent-activity-streaming-indicator {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 8px;
        font-size: 12px;
        color: #6a737d;
        padding: 8px;
        background: #f8f9fa;
        border-radius: 4px;
    }

    .gsc-agent-activity-processing-indicator .spinner,
    .gsc-agent-activity-streaming-indicator .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .gsc-agent-activity-processing-indicator .char-count,
    .gsc-agent-activity-streaming-indicator .char-count {
        font-family: 'SF Mono', 'Segoe UI Mono', monospace;
    }

    /* ==================== Content Blocks ==================== */
    .gsc-agent-activity-thinking-block,
    .gsc-agent-activity-text-block,
    .gsc-agent-activity-content-block {
        padding: 12px;
        border-radius: 0 6px 6px 0;
        margin-top: 8px;
        font-size: 13px;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
        max-height: 200px;
        overflow-y: auto;
    }

    /* Streaming state styling */
    .gsc-agent-activity-thinking-block.streaming,
    .gsc-agent-activity-text-block.streaming,
    .gsc-agent-activity-tool-use-block.streaming {
        opacity: 0.8;
        border-left-style: dashed;
    }

    /* Typing indicator */
    .gsc-agent-activity-thinking-block.streaming::after,
    .gsc-agent-activity-text-block.streaming::after {
        content: '...';
        animation: blink 1s infinite;
        color: #0366d6;
        font-weight: bold;
    }

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    /* ==================== Tool Use Block ==================== */
    .gsc-agent-activity-tool-use-block {
        padding: 12px;
        border-radius: 0 6px 6px 0;
        margin-top: 8px;
    }

    .gsc-agent-activity-tool-command {
        font-family: 'SF Mono', 'Segoe UI Mono', monospace;
        font-size: 12px;
        background: white;
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 8px;
        word-break: break-all;
        white-space: pre-wrap;
    }

    /* ==================== Tool Result Block ==================== */
    .gsc-agent-activity-tool-result-block {
        padding: 12px;
        border-radius: 0 6px 6px 0;
        margin-top: 8px;
    }

    .gsc-agent-activity-tool-result-content {
        font-family: 'SF Mono', 'Segoe UI Mono', monospace;
        font-size: 12px;
        max-height: 200px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-word;
        margin: 0;
    }

    /* ==================== Scroll Button ==================== */
    .gsc-agent-activity-scroll-button {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: #0366d6;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.2s;
        z-index: 10;
    }

    .gsc-agent-activity-scroll-button:hover {
        background: #0256c7;
        transform: scale(1.1);
    }

    .gsc-agent-activity-scroll-button.visible {
        display: flex;
    }

    /* ==================== Auto Scroll Toggle ==================== */
    .gsc-agent-activity-auto-scroll-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: #f6f8fa;
        border-bottom: 1px solid #ddd;
        border-radius: 6px;
        margin-bottom: 10px;
    }

    .gsc-agent-activity-auto-scroll-toggle input[type="checkbox"] {
        cursor: pointer;
    }

    .gsc-agent-activity-auto-scroll-toggle label {
        font-size: 13px;
        font-weight: 500;
        color: #24292e;
        cursor: pointer;
        user-select: none;
    }

    /* ==================== Custom Scrollbar ==================== */
    .gsc-agent-activity-feed::-webkit-scrollbar {
        width: 8px;
    }

    .gsc-agent-activity-feed::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    .gsc-agent-activity-feed::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
    }

    .gsc-agent-activity-feed::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
    }

    /* Firefox Scrollbar */
    .gsc-agent-activity-feed {
        scrollbar-width: thin;
        scrollbar-color: #c1c1c1 #f1f1f1;
    }

    /* ==================== Responsive Design ==================== */
    @media (max-width: 768px) {
        .gsc-agent-activity-item {
            padding: 12px 15px;
        }

        .gsc-agent-activity-header-row {
            flex-direction: column;
            gap: 8px;
        }

        .gsc-agent-activity-timestamp {
            margin-left: 0;
            font-size: 11px;
        }

        .gsc-agent-activity-scroll-button {
            width: 36px;
            height: 36px;
            bottom: 15px;
            right: 15px;
        }
    }

    /* ==================== Accessibility ==================== */
    .gsc-agent-activity-item:focus {
        outline: 2px solid #0366d6;
        outline-offset: 2px;
    }

    .gsc-agent-activity-scroll-button:focus {
        outline: 2px solid #0366d6;
        outline-offset: 2px;
    }

    /* ==================== Print Styles ==================== */
    @media print {
        .gsc-agent-activity-scroll-button,
        .gsc-agent-activity-auto-scroll-toggle {
            display: none !important;
        }

        .gsc-agent-activity-item {
            page-break-inside: avoid;
        }
    }

/* ==================== Indented Tool Results ==================== */
.gsc-agent-activity-item[data-parent-tool-use-id] {
    margin-left: 40px;
    border-left: 2px solid #e1e4e8;
    padding-left: 15px;
    background: #fafbfc;
}

.gsc-agent-activity-item[data-parent-tool-use-id]::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e1e4e8;
}
`;module.exports={AGENT_ACTIVITY_FEED_STYLES:AGENT_ACTIVITY_FEED_STYLES};
