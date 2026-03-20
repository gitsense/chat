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

let{formatBytes,estimateTokens}=require("@gitsense/gsc-utils");function createContextSummary(e,t){if(0===e.length)return"";var o=e.filter(e=>"git-blob"===e.metadata?.type),n=e.filter(e=>"git-tree"===e.metadata?.type||"git-ref"===e.metadata?.type),r=e.reduce((e,t)=>e+(t.size||0),0),i=e.reduce((e,t)=>e+(t.tokenCount||0),0);let s="file content"===t?`
**Summary:** ${e.length} file${1===e.length?"":"s"} (${formatBytes(r)}, ${i.toLocaleString()} tokens)

`:`
**Summary:** ${o.length} file${1===o.length?"":"s"} - ${n.length} tree${1===n.length?"":"s"}

`;t=e.slice(0,10);return 0<t.length&&(t.forEach(e=>{e.tokenCount?s+=`- ${e.name} - ${formatBytes(e.size)}, ${e.tokenCount.toLocaleString()} tokens
`:s+=`- ${e.name} - Not analyzed
`}),10<e.length)&&(s+=`- ... and ${e.length-10} more
`),s+"\n"}function formatSelectedItemsInfo(e,t,r,i="short"){var o="file content"===t?e.filter(e=>"git-blob"===e.type):e;if(0===o.length)return{selectedItems:o,html:"No selected items"};let s=[];if("file content"===t){var t=o.reduce((e,t)=>e+(t.meta?.tokens?.content?.estimate||0),0);s.push({type:"file",total:o.length,tokens:t})}else{let n={file:e.filter(e=>"git-blob"===e.type),tree:e.filter(e=>"git-tree"===e.type||"git-ref"===e.type)};["file","tree"].forEach(e=>{var t,o=n[e];o.length&&(t=o.reduce((e,t)=>e=(e||0)+(t.meta?.tokens?.analysis?.[r.toLowerCase()]?.estimate||0),0),s.push({type:e,total:o.length,tokens:t}))})}let a=[],l=0;return s.forEach(e=>{var{type:e,total:t,tokens:o}=e,n=1===t?"":"s",r=1===o?"":"s";l+=o,"short"===i?a.push(t.toLocaleString()+" "+e+n):a.push(`${t.toLocaleString()} ${e+n} (${o.toLocaleString()} token${r})`)}),"short"===i&&(t=1===l?"":"s",a.push(l.toLocaleString()+" token"+t)),{selectedItems:o,html:a.join(" &middot; ")}}function escapeCodeBlocks(e){let o=[];return{escapedContent:e.replace(/\n$/,"").split("\n").map((e,t)=>(e.trimStart().startsWith("```")&&(e="\\"+e.trimStart(),o.push(t+1)),e)).join("\n"),escapedLineNums:o}}function formatOverviewTable(e){if(!e||0===e.length)return"## Context Overview\n\nNo items selected for overview.\n";var t=`## Context Overview

This context overview provides metadata about files and directories that are being considered as context for your response. Each row represents a file or directory with its purpose and keywords extracted by automated analysis. 
Use this information to understand the codebase context. When referring to specific files in your response, use their Item IDs to clearly identify them.
When you need to see the full content of any file, indicate this by referencing its Chat ID using the "Context Bundle" format that is described in the system prompt.

`,o=`| Chat ID | Type | Repository | Branch/Tag | Path | Purpose | Keywords |
|---|---|---|---|---|---|---|
`;let n="",r=estimateTokens(t)+estimateTokens(o);return e.forEach(e=>{e=`| ${e.id||"N/A"} | ${"git-blob"===e.type?"file":"git-tree"===e.type||"git-ref"===e.type?"directory":"unknown"} | ${e.repo?.fullName?.split("/").pop()||"N/A"} | ${e.repo?.ref||e.commit?.ref||"N/A"} | ${e.path||"N/A"} | ${e.purpose||"No purpose analysis available."} | ${e.keywords?.join(", ")||"None."} |
`;n+=e,r+=estimateTokens(e)}),{tableString:t+`**Context Summary:** ${e.length} item${1===e.length?"":"s"} (${r} tokens)

`+"---Start of Overview Items---\n\n"+o+n+"\n---End of Overview Items---\n",estimatedTokens:r}}module.exports={formatSelectedItemsInfo:formatSelectedItemsInfo,createContextSummary:createContextSummary,formatOverviewTable:formatOverviewTable};
