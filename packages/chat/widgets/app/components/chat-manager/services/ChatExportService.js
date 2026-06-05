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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class ChatExportService{static getChatMetadataForDownload(e,t){return{name:t||e.name||"",type:e.type||"",meta:e.meta||null,visibility:e.visibility||"",created_at:e.created_at||"",updated_at:e.updated_at||""}}static downloadAsFile(e,t,a="json"){if("json"!==a)throw new Error(`Unsupported download file format "${a}"`);e=new Blob([e],{type:a}),a=URL.createObjectURL(e),e=document.createElement("a");e.href=a,e.download=t,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(a)}static async copyToClipboard(e){try{return await navigator.clipboard.writeText(e),!0}catch(e){return console.error("Failed to copy to clipboard:",e),!1}}static getMimeType(e){switch(e){case"json":return"application/json";case"jsonl":return"application/x-jsonlines";default:return"text/plain"}}static sanitizeFilename(e){return e.replace(/[<>:"/\\|?*]/g,"_")}}module.exports={ChatExportService:ChatExportService};
