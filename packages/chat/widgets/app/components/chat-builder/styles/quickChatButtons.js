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

let variables=require("./variables"),quickChatButtons={quickOptionsMenu:`
        .quick-options-menu {
            position: absolute;
            z-index: 1000; /* Ensure it's above other content */
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            min-width: 160px; /* Adjust width as needed */
            display: none; /* Hidden by default */
            animation: fadeIn 0.15s ease-in-out;
            /* Ensure it doesn't interfere with pointer events when hidden */
            pointer-events: none;
        }

        .quick-options-menu.visible {
            display: block;
            pointer-events: auto; /* Enable pointer events when visible */
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .quick-options-menu ul {
            list-style: none;
            margin: 0;
            padding: 4px 0;
        }

        .quick-options-menu li {
            padding: 0;
        }

        .quick-options-menu li:not(:last-child) {
            border-bottom: 1px solid #f0f0f0;
        }

        .quick-options-menu button {
            display: flex;
            align-items: center;
            width: 100%;
            text-align: left;
            padding: 8px 12px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 13px;
            color: ${variables.colors.text}; /* Use text color from variables */
            transition: background-color 0.2s;
        }

        .quick-options-menu button:hover {
            background-color: #f5f5f5; /* Subtle hover effect */
        }
    `};module.exports=quickChatButtons;
