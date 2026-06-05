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

class BatchGroupMessageFormatter{static formatBatchGroupMessage(e,a,t,r,i,s={}){var n=new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"});return this._formatHeader(e,n,a,i)+`

${this._formatSummary(a,t,r,i)}

${this._formatDetailedSettings(a,t,r,i,s)}

`+this._formatFileOverview(i)}static _formatHeader(e,a,t,r){var t=t?t.id.split("::")[0]:"Unknown",i=r.totalFiles||0,s=r.batchesCreated||0,n=r.referenceFiles||0;return`## Batch Analysis: ${e}

**Created:** ${a}  
**Analyzer:** ${t}  
**Total Files:** ${i} files (${this._formatLanguages(r)})  
**Batches Created:** ${s} batches  
**Reference Files:** ${n} files`}static _formatSummary(e,a,t,r){var e=e?e.id.split("::")[0]:"Unknown",i=a.maxFilesPerBatch||5,s=a.maxTokensPerBatch||25e3,n=!1!==a.groupByLanguage,l=!0===a.randomizeOrder,a=!0===a.groupByParent,o=t.lastCommitted||"any",u=t.selectedLanguages||[];let g=`### Configuration Summary
`;return g=(g+=`This batch analysis was configured to analyze ${this._formatLanguages(t)} files with a ${e.toLowerCase()} focus. `)+`Files were grouped ${n?"by language":"without language grouping"} with a maximum of ${i} files per batch and a token limit of ${s.toLocaleString()} tokens per batch.`,"any"!==o&&(g+=` Only files modified within the last ${this._formatTimeFilter(o)} were included.`),0<u.length&&(g+=` Analysis was limited to ${u.join(", ")} files.`),l&&(g+=" Batch and file order was randomized to prevent caching on retries."),a&&(g+=" Files were grouped by parent directory to keep related files together."),g}static _formatDetailedSettings(e,a,t,r,i){e={analyzer:{id:e?e.id:null,name:e?e.id.split("::")[0]:null,requires_reference_files:!!e&&e.requires_reference_files},batchConfig:{maxFilesPerBatch:a.maxFilesPerBatch||5,maxTokensPerBatch:a.maxTokensPerBatch||25e3,maxBatchSizeMB:a.maxBatchSizeMB||5,groupByLanguage:!1!==a.groupByLanguage,randomizeOrder:!0===a.randomizeOrder,groupByParent:!0===a.groupByParent},filters:{analyzedStatus:t.analyzedStatus||"any",lastCommitted:t.lastCommitted||"any",lastAnalyzed:t.lastAnalyzed||"any",selectedLanguages:t.selectedLanguages||[],minFileSize:t.minFileSize||0,maxFileSize:t.maxFileSize||1048576},statistics:{totalFiles:r.totalFiles||0,referenceFiles:r.referenceFiles||0,batchesCreated:r.batchesCreated||0,totalTokens:r.totalTokens||0,ungroupableFiles:r.ungroupableFiles||0},metadata:{createdAt:i.createdAt||(new Date).toISOString(),createdBy:i.createdBy||null,chatId:i.chatId||null}};return`### Detailed Settings
\`\`\`json
${JSON.stringify(e,null,2)}
\`\`\``}static _formatFileOverview(e){let a=`### File Overview
`;var t;return e.languageCounts?(t=Object.entries(e.languageCounts).map(([e,a])=>e+": "+a).join(", "),a+=`- **Main Files:** ${e.totalFiles-(e.referenceFiles||0)} files (${t})
`):a+=`- **Main Files:** ${e.totalFiles-(e.referenceFiles||0)} files
`,a=(a+=`- **Reference Files:** ${e.referenceFiles||0} files
`)+`- **Ungroupable Files:** ${e.ungroupableFiles||0} files`,e.ungroupableReasons&&(a+=` (${e.ungroupableReasons.join(", ")})`),a}static _formatLanguages(e){return e.selectedLanguages&&0<e.selectedLanguages.length?e.selectedLanguages.join(", "):e.languageCounts?Object.keys(e.languageCounts).join(", "):"various"}static _formatTimeFilter(e){var a,t,r=e.match(/^(\d+)([hdwmy])$/);return r?(a=parseInt(r[1],10),r=r[2],t={h:"hour",d:"day",w:"week",m:"month",y:"year"},a+" "+(1<a?t[r]+"s":t[r])):e}}module.exports=BatchGroupMessageFormatter;
