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

let variables=require("../base/variables"),treeNode={treeNode:`
        .tree-node {
            display: flex;
            align-items: center;
            width: 100%;
            min-width: 0; /* Crucial for text truncation */
            box-sizing: border-box;
        }

        .tree-node-content {
            flex: 1;
            min-width: 0; /* Crucial for text truncation */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            align-items: center;
        }

        .tree-node-text {
            flex: 1;
            min-width: 0; /* Crucial for text truncation */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Base container width calculation */
        :root {
            --container-width: 100%;
            --indent-width: var(--indent-base, 19px);
        }

        ${Array.from({length:15},(e,t)=>{var t=t+1,i=`calc(var(--indent-width) * ${t})`;return`
                .tree-node[data-level="${t}"] { 
                    margin-left: ${i}; 
                }
                
                .tree-node[data-level="${t}"] .tree-node-content {
                    max-width: calc(var(--container-width) - ${i});
                }
            `}).join("\n")}
    `};module.exports=treeNode;
