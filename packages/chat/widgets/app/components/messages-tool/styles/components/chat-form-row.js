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

let chatFormRowStyles=`
/* Chat Form Row Styles */
.gs-chat-form-row {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 15px 20px;
    background-color: #f9f9f9;
}

.gs-chat-form-label {
    font-weight: 600;
    margin-right: 5px;
    color: #333;
    margin-bottom: 0;
    align-self: center; 
}

.gs-chat-form-section {
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-bottom: 0;
}

.gs-chat-form-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
}

.gs-chat-form-input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .gs-chat-form-row {
        flex-direction: column;
        gap: 0;
    }
    
    .gs-chat-form-section {
        flex-direction: column; /* Revert label/input stacking on small screens */
        margin-bottom: 10px; /* Restore vertical spacing */
    }
}
`;module.exports=chatFormRowStyles;
