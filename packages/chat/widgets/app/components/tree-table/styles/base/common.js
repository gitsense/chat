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
