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

function formatTimestamp(t){if(!t)return"N/A";try{return new Date(t).toLocaleString()}catch(t){return"Invalid Date"}}function formatRelativeTime(t){var e,a,r,n;return t?(t=new Date(t),e=new Date,e=Math.round((e.getTime()-t.getTime())/1e3),a=Math.round(e/60),r=Math.round(a/60),n=Math.round(r/24),e<10?"just now":e<60?e+" seconds ago":a<60?a+" minutes ago":r<24?r+" hours ago":n<30?n+" days ago":t.toLocaleDateString()):"N/A"}function isCancellable(t){return["EXTERNAL_CREATION_PENDING","PENDING","RUNNING"].includes(t)}function isJobFinal(t){return["SUCCEEDED","FAILED","CANCELLED","EXPIRED"].includes(t)}function calculateGroupCounts(t){let e={ALL:t.length,PENDING:0,RUNNING:0,SUCCEEDED:0,FAILED:0,OTHER:0};return t.forEach(t=>{t=t.status&&e.hasOwnProperty(t.status)?t.status:"OTHER";e[t]++}),e}function formatDuration(t){return null===t||isNaN(t)||t<0?"N/A":t<60?Math.round(t)+"s":(t=Math.round(t/60))<60?t+"m":Math.round(t/60)+"h"}function getGroupProgressText(t,e){var a=t.startedAt?new Date(t.startedAt):null,r=t.finishedAt?new Date(t.finishedAt):null,n=e?new Date(e):new Date;let o=null;switch(t.status){case"PENDING":case"EXTERNAL_CREATION_PENDING":return"";case"RUNNING":return a?"Analyzing for "+formatDuration(o=(n.getTime()-a.getTime())/1e3):"Analyzing...";case"SUCCEEDED":return a&&r?"Analyzed in "+formatDuration(o=(r.getTime()-a.getTime())/1e3):"Succeeded";case"FAILED":case"CANCELLED":case"EXPIRED":return a&&r?(o=(r.getTime()-a.getTime())/1e3,t.status.charAt(0).toUpperCase()+t.status.slice(1).toLowerCase()+" after "+formatDuration(o)):t.status.charAt(0).toUpperCase()+t.status.slice(1).toLowerCase();default:return t.status}}function startRelativeTimeUpdater(t,e,a=1e4){return t&&e?(t.textContent=formatRelativeTime(e),setInterval(()=>{t.textContent=formatRelativeTime(e)},a)):(console.warn("startRelativeTimeUpdater: Missing element or ISO string."),null)}function stopRelativeTimeUpdater(t){t&&clearInterval(t)}module.exports={formatTimestamp:formatTimestamp,formatRelativeTime:formatRelativeTime,isCancellable:isCancellable,isJobFinal:isJobFinal,calculateGroupCounts:calculateGroupCounts,formatDuration:formatDuration,getGroupProgressText:getGroupProgressText,startRelativeTimeUpdater:startRelativeTimeUpdater,stopRelativeTimeUpdater:stopRelativeTimeUpdater};
