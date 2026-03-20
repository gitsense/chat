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

let terminalStyles=`
    /* --- Instructions Row --- */
    .gsc-terminal-instructions-row {
        padding: 12px 20px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
        font-size: 13px;
        color: #555;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .gsc-terminal-instructions-text code {
        background-color: #e9ecef;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
        color: #d63384;
        font-weight: 600;
    }

    .gsc-terminal-theme-selector {
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-size: 12px;
        background: white;
        cursor: pointer;
    }

    /* --- Terminal Area --- */
    .gsc-terminal-container {
        /* Default Theme Variables (VS Code Dark) */
        --bg-color: #1e1e1e;
        --text-color: #d4d4d4;
        --prompt-color: #4ec9b0;
        --output-color: #9cdcfe;
        --error-color: #f48771;
        --status-color: #808080;
        --scrollbar-thumb: #444;
        --scrollbar-track: #1e1e1e;
        --input-caret: #d4d4d4;

        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
        padding: 20px;
        height: 60vh;
        min-height: 325px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: background-color 0.3s, color 0.3s;
    }

    /* --- THEME DEFINITIONS --- */

    /* 1. Dracula (Dark) */
    .gsc-terminal-container.theme-dracula {
        --bg-color: #282a36;
        --text-color: #f8f8f2;
        --prompt-color: #bd93f9;
        --output-color: #50fa7b;
        --error-color: #ff5555;
        --status-color: #6272a4;
        --scrollbar-thumb: #44475a;
        --scrollbar-track: #282a36;
        --input-caret: #f8f8f2;
    }

    /* 2. Nord (Dark) */
    .gsc-terminal-container.theme-nord {
        --bg-color: #2e3440;
        --text-color: #eceff4;
        --prompt-color: #88c0d0;
        --output-color: #a3be8c;
        --error-color: #bf616a;
        --status-color: #4c566a;
        --scrollbar-thumb: #4c566a;
        --scrollbar-track: #2e3440;
        --input-caret: #eceff4;
    }

    /* 3. Solarized Light (Light) */
    .gsc-terminal-container.theme-solarized-light {
        --bg-color: #fdf6e3;
        --text-color: #657b83;
        --prompt-color: #b58900;
        --output-color: #2aa198;
        --error-color: #dc322f;
        --status-color: #93a1a1;
        --scrollbar-thumb: #93a1a1;
        --scrollbar-track: #eee8d5;
        --input-caret: #657b83;
    }

    /* 4. GitHub Light (Light) */
    .gsc-terminal-container.theme-github-light {
        --bg-color: #ffffff;
        --text-color: #24292f;
        --prompt-color: #0969da;
        --output-color: #1a7f37;
        --error-color: #cf222e;
        --status-color: #8c959f;
        --scrollbar-thumb: #d0d7de;
        --scrollbar-track: #f6f8fa;
        --input-caret: #24292f;
    }

    /* 5. Matrix (Dark - Matches Fake Terminal) */
    .gsc-terminal-container.theme-matrix {
        --bg-color: #1e1e1e;
        --text-color: #00ff00;
        --prompt-color: #00ff00;
        --output-color: #00ff00;
        --error-color: #ff0000;
        --status-color: #008800;
        --scrollbar-thumb: #555;
        --scrollbar-track: #2a2a2a;
        --input-caret: #00ff00;
    }

    /* 6. Monokai (Dark) */
    .gsc-terminal-container.theme-monokai {
        --bg-color: #272822;
        --text-color: #f8f8f2;
        --prompt-color: #f92672;
        --output-color: #a6e22e;
        --error-color: #f92672;
        --status-color: #75715e;
        --scrollbar-thumb: #49483e;
        --scrollbar-track: #272822;
        --input-caret: #f8f8f2;
    }

    /* --- Terminal Components --- */
    .gsc-terminal-output {
        flex: 1;
        overflow-y: auto;
        margin-bottom: 10px;
        white-space: pre-wrap;
        font-size: 13px;
        line-height: 1.5;
    }

    .gsc-terminal-output::-webkit-scrollbar {
        width: 8px;
    }
    .gsc-terminal-output::-webkit-scrollbar-track {
        background: var(--scrollbar-track);
    }
    .gsc-terminal-output::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb);
        border-radius: 4px;
    }

    .gsc-terminal-line {
        margin-bottom: 4px;
    }

    .gsc-terminal-prompt {
        color: var(--prompt-color);
        font-weight: bold;
        margin-right: 8px;
    }

    .gsc-terminal-command-text {
        color: var(--text-color);
    }

    .gsc-terminal-output-text {
        color: var(--output-color);
    }

    .gsc-terminal-error-text {
        color: var(--error-color);
    }

    .gsc-terminal-status-text {
        color: var(--status-color);
        font-style: italic;
    }

    .gsc-terminal-input-line {
        display: flex;
        align-items: center;
        border-top: 1px solid rgba(128, 128, 128, 0.2);
        padding-top: 10px;
    }

    .gsc-terminal-input {
        background: transparent;
        border: none;
        color: var(--text-color);
        font-family: inherit;
        font-size: 14px;
        flex: 1;
        outline: none;
        caret-color: var(--input-caret);
    }

    /* --- Footer Row --- */
    .gsc-terminal-footer-row {
        padding: 15px 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fafafa;
    }

    .gsc-terminal-auth-code-group {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .gsc-terminal-auth-code-label {
        font-size: 14px;
        font-weight: 500;
        color: #333;
    }

    .gsc-terminal-auth-code-input {
        width: 80px;
        padding: 6px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        letter-spacing: 2px;
        font-family: monospace;
    }

    .gsc-terminal-auth-code-input:focus {
        border-color: #007bff;
        outline: none;
    }

    .gsc-terminal-btn-close {
        padding: 6px 16px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        color: #333;
        transition: background 0.2s;
    }

    .gsc-terminal-btn-close:hover {
        background-color: #f0f0f0;
    }
`;module.exports={terminalStyles:terminalStyles};
