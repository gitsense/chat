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

let confirmationBoxStyles=`
    /* Basic reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f9;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    /* Modal overlay */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    /* Modal box */
    .modal-box {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        padding: 24px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: fadeIn 0.3s ease-in-out;
    }

    /* Modal title */
    .modal-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 16px;
        color: #333;
    }

    /* Modal message */
    .modal-message {
        font-size: 1rem;
        color: #666;
        margin-bottom: 24px;
    }

    /* Button container */
    .button-container {
        display: flex;
        justify-content: center;
        gap: 16px;
    }

    /* Buttons */
    .modal-button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .modal-button.confirm {
        background-color: #4CAF50;
        color: white;
    }

    .modal-button.confirm:hover {
        background-color: #45a049;
    }

    .modal-button.cancel {
        background-color: #f44336;
        color: white;
    }

    .modal-button.cancel:hover {
        background-color: #e53935;
    }

    /* Animation */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;module.exports={confirmationBoxStyles:confirmationBoxStyles};
