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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let notificationManagerStyles=`
    /* Notification Manager Container */
    .gsc-notification-manager-container {
        position: fixed;
        top: 20px; /* Adjust as needed */
        right: 20px; /* Adjust as needed */
        z-index: 100000000001; /* Higher than ConfirmationBox */
        display: flex;
        flex-direction: column-reverse; /* Stack new toasts on top */
        gap: 10px;
        pointer-events: none; /* Allow clicks to pass through container */
    }
    
    /* Individual Toast */
    .gsc-toast {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        color: white;
        font-family: sans-serif;
        font-size: 0.95em;
        min-width: 250px;
        max-width: 350px;
        pointer-events: auto; /* Re-enable pointer events for the toast itself */
        position: relative; /* For stacking */
        transition: bottom 0.3s ease-out; /* Smooth transition for stacking */
    }
    
    .gsc-toast-icon {
        margin-right: 10px;
        font-size: 1.2em;
        line-height: 1;
    }
    
    .gsc-toast-message {
        flex-grow: 1;
        line-height: 1.4;
    }
    
    .gsc-toast-close-btn {
        background: none;
        border: none;
        color: inherit; /* Inherit color from toast type */
        font-size: 1.2em;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }
    
    .gsc-toast-close-btn:hover {
        opacity: 1;
    }
    
    /* Toast Types */
    .gsc-toast.gsc-toast-success {
        background-color: #4CAF50; /* Green */
    }
    
    .gsc-toast.gsc-toast-error {
        background-color: #f44336; /* Red */
    }
    
    .gsc-toast.gsc-toast-info {
        background-color: #2196F3; /* Blue */
    }
    
    .gsc-toast.gsc-toast-warning {
        background-color: #ff9800; /* Orange */
        color: #333; /* Darker text for contrast */
    }
    
    /* Animations (handled by JS for now, but can be CSS-driven) */
    /*
    @keyframes fadeInSlideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOutSlideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    */
`;module.exports=notificationManagerStyles;
