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

let AGENT_LIVE_SESSION_STYLES=`
    .gsc-agent-live-session {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 15px;
        line-height: 1.6;
        color: #24292e;
    }

    /* Intent Section */
    .gsc-agent-live-intent {
        margin-bottom: 20px;
    }

    .gsc-agent-live-intent-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .gsc-agent-live-intent-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
    }

    .gsc-agent-live-status {
        font-size: 14px;
        font-weight: 500;
        color: #586069;
    }

    .gsc-agent-live-intent-label {
        font-weight: 600;
        margin-bottom: 5px;
        color: #24292e;
    }

    .gsc-agent-live-intent-content {
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 14px;
        color: #24292e;
        max-height: 200px;
        overflow-y: auto;
    }

    /* Activity Section */
    .gsc-agent-live-activity {
        margin-bottom: 20px;
    }

    .gsc-agent-live-activity-label {
        font-weight: 600;
        margin-bottom: 10px;
        color: #24292e;
    }

    .gsc-agent-live-activity-container {
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        overflow: hidden;
    }

    /* Actions Section */
    .gsc-agent-live-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }

    .gsc-agent-live-stop-button {
        padding: 8px 16px;
        background: #d73a49;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .gsc-agent-live-stop-button:hover:not(.disabled) {
        background: #cb2431;
    }

    .gsc-agent-live-stop-button.disabled {
        background: #6a737d;
        cursor: not-allowed;
        opacity: 0.6;
    }
`;module.exports={AGENT_LIVE_SESSION_STYLES:AGENT_LIVE_SESSION_STYLES};
