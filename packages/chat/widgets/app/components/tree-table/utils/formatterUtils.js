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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

function formatBytes(e){var t,o;return"number"!=typeof e||isNaN(e)||0===e?"0 bytes":(t=["bytes","KB","MB","GB"],0===(o=Math.floor(Math.log(e)/Math.log(1024)))?e+" "+t[o]:(e=e/Math.pow(1024,o)).toFixed(e%1==0?0:1)+" "+t[o])}function formatTokens(e){return"number"!=typeof e||isNaN(e)||0===e?"0":e<1e3?""+e:e<1e6?(e/1e3).toFixed(1e4<=e?1:0)+"k":e<1e9?(e/1e6).toFixed(1)+"m":(e/1e9).toFixed(1)+"b"}function createContextSummary(e,t){if(0===e.length)return"";var o=e.filter(e=>"git-blob"===e.metadata?.type),n=e.filter(e=>"git-tree"===e.metadata?.type||"git-ref"===e.metadata?.type),a=e.reduce((e,t)=>e+(t.size||0),0),r=e.reduce((e,t)=>e+(t.tokenCount||0),0);let i="file content"===t?`
**Summary:** ${e.length} file${1===e.length?"":"s"} (${formatBytes(a)}, ${r.toLocaleString()} tokens)

`:`
**Summary:** ${o.length} file${1===o.length?"":"s"} - ${n.length} tree${1===n.length?"":"s"}

`;t=e.slice(0,10);return 0<t.length&&(t.forEach(e=>{e.tokenCount?i+=`- ${e.name} - ${formatBytes(e.size)}, ${e.tokenCount.toLocaleString()} tokens
`:i+=`- ${e.name} - Not analyzed
`}),10<e.length)&&(i+=`- ... and ${e.length-10} more
`),i+"\n"}function formatFilesForContext(e,a=!0){return e&&0!==e.length?`### Loaded Files (${e.length} files)

`+e.map(e=>{let t=`=== ${e.name} ===
`;var o,n;return a&&(t=(t+=`Path: ${e.path||"N/A"}
`)+`Size: ${formatBytes(e.size)}
`,o=estimateTokenCount(JSON.stringify(e.metadata||{})),n=e.tokenCount||estimateTokenCount(e.content||""),t+=`Tokens: ${n} (content) + ${o} (metadata)
`),t+=`
${e.content||"Content not available"}

`}).join(""):""}function formatSelectedItemsInfo(e,t,a,r="short"){var o="file content"===t?e.filter(e=>"git-blob"===e.type):e;if(0===o.length)return{selectedItems:o,html:"No selected items"};let i=[];if("file content"===t){var t=o.reduce((e,t)=>e+(t.meta?.tokens?.content?.estimate||0),0);i.push({type:"file",total:o.length,tokens:t})}else{let n={file:e.filter(e=>"git-blob"===e.type),tree:e.filter(e=>"git-tree"===e.type||"git-ref"===e.type)};["file","tree"].forEach(e=>{var t,o=n[e];o.length&&(t=o.reduce((e,t)=>e=(e||0)+(t.meta?.tokens?.analysis?.[a.toLowerCase()]?.estimate||0),0),i.push({type:e,total:o.length,tokens:t}))})}let s=[],l=0;return i.forEach(e=>{var{type:e,total:t,tokens:o}=e,n=1===t?"":"s",a=1===o?"":"s";l+=o,"short"===r?s.push(t.toLocaleString()+" "+e+n):s.push(`${t.toLocaleString()} ${e+n} (${o.toLocaleString()} token${a})`)}),"short"===r&&(t=1===l?"":"s",s.push(l.toLocaleString()+" token"+t)),{selectedItems:o,html:s.join(" &middot; ")}}function escapeCodeBlocks(e){let o=[];return{escapedContent:e.replace(/\n$/,"").split("\n").map((e,t)=>(e.trimStart().startsWith("```")&&(e="\\"+e.trimStart(),o.push(t+1)),e)).join("\n"),escapedLineNums:o}}function estimateTokens(e){return e?Math.ceil(e.length/4):0}function formatOverviewTable(e){if(!e||0===e.length)return"## Context Items Overview\n\nNo items selected for overview.\n";var t=`## Context Items Overview

This section provides a summary of the selected items to help the AI understand the context without loading full content. Use this information to assist the user in identifying relevant items for further analysis or full content loading.

`,o=`| Chat ID | Type | Repo | Ref | Path | Purpose | Keywords |
|---|---|---|---|---|---|---|
`;let n="",a=estimateTokens(t)+estimateTokens(o);return e.forEach(e=>{e=`| ${e.id||"N/A"} | ${"git-blob"===e.metadata?.type?"file":"git-tree"===e.metadata?.type||"git-ref"===e.metadata?.type?"directory":"unknown"} | ${e.repo?.fullName?.split("/").pop()||"N/A"} | ${e.repo?.ref||"N/A"} | ${e.path||"N/A"} | ${e.purpose||"No purpose analysis available."} | ${e.keywords?.join(", ")||"None."} |
`;n+=e,a+=estimateTokens(e)}),{tableString:t+`**Summary:** ${e.length} item${1===e.length?"":"s"}. Estimated overview tokens: ${a}

`+"---Start of Overview Items---\n\n"+o+n+"\n---End of Overview Items---\n",estimatedTokens:a}}module.exports={formatBytes:formatBytes,formatTokens:formatTokens,formatFilesForContext:formatFilesForContext,formatSelectedItemsInfo:formatSelectedItemsInfo,createContextSummary:createContextSummary,estimateTokens:estimateTokens,formatOverviewTable:formatOverviewTable};
