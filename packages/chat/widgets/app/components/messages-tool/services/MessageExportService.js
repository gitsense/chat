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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,messageUtils=require("../utils/messageUtils");class MessageExportService{static async exportMessages(t,e,a){let i=this.filterMessages(t,e,a.scope,a.visibility);switch("skim"===a.contentType&&(i=this.applySkimSettings(i,a.skimOptions)),a.format){case"json":return a.includeChatMetadata?this.formatAsChatJson(i,a.chatMetadata):this.formatAsJson(i);case"jsonl":return this.formatAsJsonl(i);case"tagged":return this.formatAsTagged(i);default:throw new Error("Unsupported format: "+a.format)}}static filterMessages(t,e,a,i){let s="selected"===a?e:t;return s="public"===i?s.filter(t=>"public"===t.visibility):s}static applySkimSettings(t,a){return t.map(t=>{var e;return t.content?(e=messageUtils.truncateMessage(t.content,Math.max(a.leadingLines,a.trailingLines)),{...t,content:e}):t})}static formatAsJson(t){t=t.map(t=>({role:t.role,content:t.content,created_at:t.created_at,updated_at:t.updated_at||null,position:t.position,visibility:t.visibility}));return JSON.stringify(t,null,2)}static formatAsChatJson(t,e){t=t.map(t=>({role:t.role,content:t.content,created_at:t.created_at,updated_at:t.updated_at||null,position:t.position,visibility:t.visibility}));return JSON.stringify({name:e.name||"",type:e.type||"",messages:t},null,2)}static formatAsJsonl(t){return t.map(t=>{t={role:t.role,content:t.content,created_at:t.created_at,updated_at:t.updated_at||null,position:t.position,visibility:t.visibility};return JSON.stringify(t)}).join("\n")}static formatAsTagged(t){return t.map(t=>{var e=t.role||"unknown",a=t.position||1;return`<${e} message number ${a}>
${t.content||""}
</${e} message number ${a}>`}).join("\n\n")}static downloadAsFile(t,e,a){t=new Blob([t],{type:this.getMimeType(a)}),a=URL.createObjectURL(t),t=document.createElement("a");t.href=a,t.download=e,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)}static async copyToClipboard(t){try{return await navigator.clipboard.writeText(t),!0}catch(t){return console.error("Failed to copy to clipboard:",t),!1}}static getMimeType(t){switch(t){case"json":return"application/json";case"jsonl":return"application/x-jsonlines";default:return"text/plain"}}static sanitizeFilename(t){return t.replace(/[<>:"/\\|?*]/g,"_")}static generateDefaultFilename(t,e=""){var a=new Date,a=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-`+String(a.getDate()).padStart(2,"0");return(e?e.replace(/[<>:"/\\|?*]/g,"_")+"-"+a:"chat-export-"+a)+"."+this.getFileExtension(t)}static getFileExtension(t){switch(t){case"json":return"json";case"jsonl":return"jsonl";default:return"txt"}}}module.exports={MessageExportService:MessageExportService};
