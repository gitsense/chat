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
