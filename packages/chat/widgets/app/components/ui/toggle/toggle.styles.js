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

let toggleStyles=`
    /* Base styles for the toggle container */
    .gsc-toggle-container {
        display: flex;
        width: 400px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    }

    /* Base style for individual toggle options */
    .gsc-toggle-option {
        flex: 1;
        padding: 10px 15px;
        text-align: center;
        cursor: pointer;
        background-color: #f8f9fa;
        border: none;
        font-size: 14px;
        transition: background-color 0.2s;
        color: #333;
        outline: none;
    }

    /* Active toggle option style */
    .gsc-toggle-option.gsc-toggle-option-active {
        background-color: #0969da;
        color: white;
    }

    /* Hover effect for inactive, enabled toggle options */
    .gsc-toggle-option:not(.gsc-toggle-option-active):not(.gsc-toggle-option-disabled):hover {
        background-color: #e9ecef;
    }

    /* Disabled toggle option style */
    .gsc-toggle-option.gsc-toggle-option-disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;module.exports=toggleStyles;
