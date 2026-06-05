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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,messageUtils=require("../utils/messageUtils");class MessageExportService{static async exportMessages(t,e,a){let i=this.filterMessages(t,e,a.scope,a.visibility);switch("skim"===a.contentType&&(i=this.applySkimSettings(i,a.skimOptions)),a.format){case"json":return a.includeChatMetadata?this.formatAsChatJson(i,a.chatMetadata):this.formatAsJson(i);case"jsonl":return this.formatAsJsonl(i);case"tagged":return this.formatAsTagged(i);default:throw new Error("Unsupported format: "+a.format)}}static filterMessages(t,e,a,i){let s="selected"===a?e:t;return s="public"===i?s.filter(t=>"public"===t.visibility):s}static applySkimSettings(t,a){return t.map(t=>{var e;return t.content?(e=messageUtils.truncateMessage(t.content,Math.max(a.leadingLines,a.trailingLines)),{...t,content:e}):t})}static formatAsJson(t){t=t.map(t=>({role:t.role,content:t.content,created_at:t.created_at,updated_at:t.updated_at||null,position:t.position,visibility:t.visibility}));return JSON.stringify(t,null,2)}static formatAsChatJson(t,e){t=t.map(t=>({role:t.role,content:t.content,created_at:t.created_at,updated_at:t.updated_at||null,position:t.position,visibility:t.visibility}));return JSON.stringify({name:e.name||"",type:e.type||"",messages:t},null,2)}static formatAsJsonl(t){return t.map(t=>{t={role:t.role,content:t.content,created_at:t.created_at,updated_at:t.updated_at||null,position:t.position,visibility:t.visibility};return JSON.stringify(t)}).join("\n")}static formatAsTagged(t){return t.map(t=>{var e=t.role||"unknown",a=t.position||1;return`<${e} message number ${a}>
${t.content||""}
</${e} message number ${a}>`}).join("\n\n")}static downloadAsFile(t,e,a){t=new Blob([t],{type:this.getMimeType(a)}),a=URL.createObjectURL(t),t=document.createElement("a");t.href=a,t.download=e,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)}static async copyToClipboard(t){try{return await navigator.clipboard.writeText(t),!0}catch(t){return console.error("Failed to copy to clipboard:",t),!1}}static getMimeType(t){switch(t){case"json":return"application/json";case"jsonl":return"application/x-jsonlines";default:return"text/plain"}}static sanitizeFilename(t){return t.replace(/[<>:"/\\|?*]/g,"_")}static generateDefaultFilename(t,e=""){var a=new Date,a=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-`+String(a.getDate()).padStart(2,"0");return(e?e.replace(/[<>:"/\\|?*]/g,"_")+"-"+a:"chat-export-"+a)+"."+this.getFileExtension(t)}static getFileExtension(t){switch(t){case"json":return"json";case"jsonl":return"jsonl";default:return"txt"}}}module.exports={MessageExportService:MessageExportService};
