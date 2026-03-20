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

class MessagePreviewService{static formatMessageContent(e,t,i=!1){var n,s;return e?(s=(n=e.split("\n")).length,i||s<=t.leadingLines+t.trailingLines?{content:e,isTruncated:!1,totalLines:s,visibleLines:s}:{content:n.slice(0,t.leadingLines).join("\n")+`

...

`+n.slice(-t.trailingLines).join("\n"),isTruncated:!0,totalLines:s,visibleLines:t.leadingLines+t.trailingLines}):{content:"",isTruncated:!1,totalLines:0,visibleLines:0}}static createMessageHeader(e,t={}){var{position:t=e.position||1,role:i=e.role||"unknown",type:e=e.type||"regular"}=t;return`**Position:** ${t}   **Role:** ${i.charAt(0).toUpperCase()+i.slice(1)}    **Type:** `+(e.charAt(0).toUpperCase()+e.slice(1))}static shouldTruncate(e,t){return!!e&&e.split("\n").length>t.leadingLines+t.trailingLines}static getLineCount(e){return e?e.split("\n").length:0}static formatRelativeTime(e){var t,i,n;return e?(e=new Date(e+(e.endsWith("Z")?"":"Z")),t=new Date,t=Math.floor((t-e)/1e3),e=Math.floor(t/60),i=Math.floor(e/60),n=Math.floor(i/24),t<60?t+"s ago":e<60?e+"m ago":i<24?i+"h ago":n+"d ago"):""}}module.exports={MessagePreviewService:MessagePreviewService};
