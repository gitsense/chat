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
.confirmation-box {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100000000000;
    animation: fadeIn 0.3s ease-in-out;
}

.confirmation-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 550px;
    animation: slideIn 0.3s ease-in-out;
}

.confirmation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
}

.confirmation-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0;
}

.confirmation-body {
    margin-bottom: 20px;
    color: #666;
}

.confirmation-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.cancel-btn {
    background-color: #f0f0f0;
    color: #333;
}

.confirm-btn {
    background-color: #4CAF50;
    color: white;
}

.cancel-btn:hover {
    background-color: #e0e0e0;
}

.confirm-btn:hover {
    background-color: #45a049;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from {
        transform: translate(-50%, -60%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}

/* Disabled button styles */
.btn:disabled {
    cursor: not-allowed;
    opacity: 0.6; /* Slightly more pronounced disabled state */
    pointer-events: none; /* Prevents hover events on disabled buttons */
}

.confirm-btn:disabled {
    background-color: #dddddd; /* Neutral gray background for disabled confirm */
    color: #999999; /* Darker gray text for disabled confirm */
}

.cancel-btn:disabled {
    background-color: #e0e0e0; /* Lighter gray background for disabled cancel */
    color: #999999; /* Darker gray text for disabled cancel */
}

.close-btn:disabled {
    cursor: not-allowed;
    opacity: 0.4; /* Make it visibly disabled */
    pointer-events: none;
}
`;module.exports=confirmationBoxStyles;
