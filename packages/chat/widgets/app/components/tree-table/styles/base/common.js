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

let variables=require("./variables"),common={table:(o=14)=>`
        .tree-table {
            border-collapse: collapse;
            width: 100%;
            font-family: ${variables.fonts.family};
            font-size: ${variables.fonts.size.base};
            table-layout: fixed;
            --indent-base: ${o}px;
            --column-width-1: 40%;
            --column-width-2: 10%;
            --column-width-3: 20%;
            --column-width-4: 20%;
            --column-width-5: 10%;
        }
    `,utilities:`
        .hidden {
            display: none;
        }

        .highlight {
            background-color: ${variables.colors.highlight};
            transition: background-color 0.5s;
        }

        .expanded-row {
            background-color: ${variables.colors.background};
        }
    `};module.exports=common;
