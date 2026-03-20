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

let promptBoxStyles=`
/* --- Base Overlay Structure --- */
.gsc-prompt-overlay {
    display: none; /* Hidden by default */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    z-index: 100000000000; /* Default high z-index */
    justify-content: center;
    align-items: center;
    animation: gscPromptFadeIn 0.3s ease-in-out;
}

/* --- Modal Content Box --- */
.gsc-prompt-content {
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%; /* Default responsive width */
    max-width: 500px; /* Default max width */
    height: auto; /* Default height */
    max-height: 90vh; /* Prevents modal from being taller than viewport */
    display: flex;
    flex-direction: column;
    animation: gscPromptSlideIn 0.3s ease-in-out;
    /* Ensure content doesn't overflow the modal box itself */
    overflow: hidden;
}

/* --- Modal Header --- */
.gsc-prompt-header {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    align-items: center;
    border-bottom: 1px solid #eee;
    flex-shrink: 0; /* Prevents header from shrinking */
    background-color: #ffffff;
}

.gsc-prompt-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
    font-weight: 500;
}

/* --- Close Button --- */
.gsc-prompt-close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

.gsc-prompt-close-button:hover {
    background-color: #f5f5f5;
}

.gsc-prompt-close-button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
    background-color: transparent; /* Ensure disabled state doesn't change background */
}

/* --- Modal Body --- */
.gsc-prompt-body {
    padding: 20px;
    /* Allow body content to scroll if it overflows the content box */
    overflow-y: auto;
    flex-grow: 1; /* Takes up remaining space */
}

/* --- Animations --- */
@keyframes gscPromptFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes gscPromptSlideIn {
    from {
        transform: translate(-50%, -60%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}

/* Center the modal content if it's positioned absolutely (for animations) */
.gsc-prompt-overlay .gsc-prompt-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
`;module.exports=promptBoxStyles;
