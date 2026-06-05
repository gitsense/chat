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

let baseStyles=`
    .import-data-main-container {
        font-family: sans-serif;
        max-width: 100%;
        padding: 10px;
    }
    
    .import-data-subheader {
        color: #666;
        margin-bottom: 10px;
        font-size: 0.9rem;
    }
    
    .import-data-info-note {
        color: #666;
        margin-bottom: 20px;
        font-size: 0.95em;
        padding: 10px;
        background-color: #f9f9f9;
        border-left: 3px solid #ddd;
    }
    
    .import-data-tabs-container {
        margin-bottom: 15px;
    }
    
    .import-data-content-container {
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 20px;
        min-height: 300px;
    }
    
    .import-data-placeholder {
        text-align: center;
        padding: 50px 20px;
        color: #666;
    }
    
    .import-data-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding-top: 15px;
        border-top: 1px solid #eee;
    }
    
    .import-data-file-summary {
        font-size: 14px;
        color: #666;
    }
    
    .import-data-action-buttons {
        display: flex;
        gap: 10px;
    }
    
    .import-data-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }
    
    .import-data-btn-secondary {
        background-color: #f0f0f0;
        color: #333;
    }
    
    .import-data-btn-secondary:hover {
        background-color: #e0e0e0;
    }
    
    .import-data-btn-primary {
        background-color: #ff7f0e;
        color: white;
    }
    
    .import-data-btn-primary:hover {
        background-color: #e67300;
    }
    
    .import-data-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* Form styles */
    .import-data-form-group {
        margin-bottom: 15px;
    }
    
    .import-data-form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        font-size: 14px;
    }
    
    .import-data-form-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
    }
    
    .import-data-form-input:disabled {
        background-color: #f8f8f8;
        color: #666;
        cursor: not-allowed;
    }
    
    .import-data-form-hint {
        font-size: 13px;
        color: #666;
        margin-top: 5px;
    }
    
    /* Confirmation message styles */
    .import-data-confirmation-message {
        font-size: 14px;
    }
    
    .import-data-confirmation-message p {
        margin-bottom: 10px;
    }
    
    .import-data-confirmation-message ul {
        margin-left: 20px;
        margin-bottom: 10px;
    }
    
    .import-data-confirmation-message .warning {
        color: #856404;
    }
    
    .import-data-confirmation-message .info {
        color: #17a2b8;
    }
`;module.exports={baseStyles:baseStyles};
