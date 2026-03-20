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

class BatchGroupMessageFormatter{static formatBatchGroupMessage(e,a,t,i,s,r={}){var n=new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"});return this._formatHeader(e,n,a,s)+`

${this._formatSummary(a,t,i,s)}

${this._formatDetailedSettings(a,t,i,s,r)}

`+this._formatFileOverview(s)}static _formatHeader(e,a,t,i){var t=t?t.id.split("::")[0]:"Unknown",s=i.totalFiles||0,r=i.batchesCreated||0,n=i.referenceFiles||0;return`## Batch Analysis: ${e}

**Created:** ${a}  
**Analyzer:** ${t}  
**Total Files:** ${s} files (${this._formatLanguages(i)})  
**Batches Created:** ${r} batches  
**Reference Files:** ${n} files`}static _formatSummary(e,a,t,i){var e=e?e.id.split("::")[0]:"Unknown",s=a.maxFilesPerBatch||5,r=a.maxTokensPerBatch||25e3,a=!1!==a.groupByLanguage,n=t.lastCommitted||"any",l=t.selectedLanguages||[];let o=`### Configuration Summary
`;return o=(o+=`This batch analysis was configured to analyze ${this._formatLanguages(t)} files with a ${e.toLowerCase()} focus. `)+`Files were grouped ${a?"by language":"without language grouping"} with a maximum of ${s} files per batch and a token limit of ${r.toLocaleString()} tokens per batch.`,"any"!==n&&(o+=` Only files modified within the last ${this._formatTimeFilter(n)} were included.`),0<l.length&&(o+=` Analysis was limited to ${l.join(", ")} files.`),o}static _formatDetailedSettings(e,a,t,i,s){e={analyzer:{id:e?e.id:null,name:e?e.id.split("::")[0]:null,requires_reference_files:!!e&&e.requires_reference_files},batchConfig:{maxFilesPerBatch:a.maxFilesPerBatch||5,maxTokensPerBatch:a.maxTokensPerBatch||25e3,maxBatchSizeMB:a.maxBatchSizeMB||5,groupByLanguage:!1!==a.groupByLanguage},filters:{analyzedStatus:t.analyzedStatus||"any",lastCommitted:t.lastCommitted||"any",lastAnalyzed:t.lastAnalyzed||"any",selectedLanguages:t.selectedLanguages||[],minFileSize:t.minFileSize||0,maxFileSize:t.maxFileSize||1048576},statistics:{totalFiles:i.totalFiles||0,referenceFiles:i.referenceFiles||0,batchesCreated:i.batchesCreated||0,totalTokens:i.totalTokens||0,ungroupableFiles:i.ungroupableFiles||0},metadata:{createdAt:s.createdAt||(new Date).toISOString(),createdBy:s.createdBy||null,chatId:s.chatId||null}};return`### Detailed Settings
\`\`\`json
${JSON.stringify(e,null,2)}
\`\`\``}static _formatFileOverview(e){let a=`### File Overview
`;var t;return e.languageCounts?(t=Object.entries(e.languageCounts).map(([e,a])=>e+": "+a).join(", "),a+=`- **Main Files:** ${e.totalFiles-(e.referenceFiles||0)} files (${t})
`):a+=`- **Main Files:** ${e.totalFiles-(e.referenceFiles||0)} files
`,a=(a+=`- **Reference Files:** ${e.referenceFiles||0} files
`)+`- **Ungroupable Files:** ${e.ungroupableFiles||0} files`,e.ungroupableReasons&&(a+=` (${e.ungroupableReasons.join(", ")})`),a}static _formatLanguages(e){return e.selectedLanguages&&0<e.selectedLanguages.length?e.selectedLanguages.join(", "):e.languageCounts?Object.keys(e.languageCounts).join(", "):"various"}static _formatTimeFilter(e){var a,t,i=e.match(/^(\d+)([hdwmy])$/);return i?(a=parseInt(i[1],10),i=i[2],t={h:"hour",d:"day",w:"week",m:"month",y:"year"},a+" "+(1<a?t[i]+"s":t[i])):e}}module.exports=BatchGroupMessageFormatter;
