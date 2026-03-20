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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class ChatExportService{static getChatMetadataForDownload(e,t){return{name:t||e.name||"",type:e.type||"",meta:e.meta||null,visibility:e.visibility||"",created_at:e.created_at||"",updated_at:e.updated_at||""}}static downloadAsFile(e,t,a="json"){if("json"!==a)throw new Error(`Unsupported download file format "${a}"`);e=new Blob([e],{type:a}),a=URL.createObjectURL(e),e=document.createElement("a");e.href=a,e.download=t,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(a)}static async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),!0}catch(e){return console.error("Failed to copy to clipboard:",e),!1}}static getMimeType(e){switch(e){case"json":return"application/json";case"jsonl":return"application/x-jsonlines";default:return"text/plain"}}static sanitizeFilename(e){return e.replace(/[<>:"/\\|?*]/g,"_")}}module.exports={ChatExportService:ChatExportService};
