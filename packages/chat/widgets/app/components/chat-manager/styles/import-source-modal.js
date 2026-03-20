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

let importSourceModalStyles=`
/* Import Modal Container */
.gs-import-source-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(95vh - 60px); /* Account for header height */
}

/* Scrollable content area */
.gs-import-source-modal-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px 20px;
}

/* Import Modal Explanation */
.gs-import-source-modal-explanation {
    margin-bottom: 20px;
    padding-top: 10px;
}

.gs-import-source-modal-explanation p {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5;
    color: #555;
}

/* Drop Zone Styles */
.gs-import-drop-zone {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 20px;
    background-color: #fafafa;
    position: relative;
}

.gs-import-drop-zone:hover {
    border-color: #4a90e2;
    background-color: #f0f7ff;
}

.gs-import-drop-zone.dragover {
    border-color: #4a90e2;
    background-color: #e3f2fd;
}

/* Drop Zone Icon */
.gs-import-drop-zone-icon {
    color: #999;
    margin-bottom: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

/* Drop Zone Text */
.gs-import-drop-zone-text {
    color: #666;
    font-size: 16px;
    margin-bottom: 8px;
}

.gs-import-drop-zone-subtext {
    color: #999;
    font-size: 14px;
}

/* File Input (Hidden) */
.gs-import-file-input {
    display: none;
}

/* Choose File Button */
.gs-import-choose-file-button {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 20px;
    display: inline-block;
    transition: all 0.2s ease;
}

.gs-import-choose-file-button:hover {
    background-color: #e9ecef;
    border-color: #ccc;
}

/* JSON Textarea */
.gs-import-json-textarea {
    width: 100%;
    min-height: 200px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    font-size: 13px;
    resize: vertical;
    margin-bottom: 20px;
}

.gs-import-json-textarea:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

/* File Info Display */
.gs-import-file-info {
    margin-top: 10px;
    padding: 10px;
    background-color: #f0f7ff;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    display: none;
}

.gs-import-file-info-name {
    font-weight: 600;
}

/* Modal Footer */
.gs-import-source-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid #eee;
    background-color: #f9f9f9;
    flex-shrink: 0;
    position: sticky;
    bottom: 0;
    z-index: 10;
}

/* Button Styles */
.gs-import-source-modal-footer .btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease;
}

/* Error Notification */
.gs-import-error {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 4px;
    background-color: #f8d7da;
    color: #721c24;
    z-index: 1000003;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-size: 14px;
    max-width: 300px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .gs-import-drop-zone {
        padding: 30px 15px;
    }
    
    .gs-import-drop-zone-text {
        font-size: 14px;
    }
    
    .gs-import-drop-zone-subtext {
        font-size: 12px;
    }
    
    .gs-import-json-textarea {
        min-height: 150px;
    }
}
`;module.exports=importSourceModalStyles;
