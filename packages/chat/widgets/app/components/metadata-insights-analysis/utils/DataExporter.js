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

let METADATA_INSIGHT_RESULT_CONSTANTS=require("../constants").METADATA_INSIGHT_RESULT_CONSTANTS;class DataExporter{static exportToCSV(e,r,t={}){let{delimiter:a=",",includeHeaders:i=!0}=t,s=this._createLookupMap(e.references.repositories),l=this._createLookupMap(e.references.branches),n=e.references.fields||[],c="";if(i){let r=["repo","branch","file","language","chatId"];n.forEach(e=>{r.push(e.label)}),c+=r.join(a)+"\n"}return r.forEach(e=>{let t=[this._escapeCsvField(s[e.repoId]||e.repoId),this._escapeCsvField(l[e.branchId]||e.branchId),this._escapeCsvField(e.file),this._escapeCsvField(e.language),e.chatId];n.forEach(r=>{r=e.metadata[r.id];if(null!=r){let e;e=Array.isArray(r)?JSON.stringify(r):r.toString(),t.push(this._escapeCsvField(e))}else t.push("")}),c+=t.join(a)+"\n"}),c}static exportToSimpleJSON(e,r){let i=this._createLookupMap(e.references.repositories),s=this._createLookupMap(e.references.branches),l=e.references.fields||[];e=r.map(t=>{let a={repo:i[t.repoId]||t.repoId,branch:s[t.branchId]||t.branchId,file:t.file,language:t.language,chatId:t.chatId};return l.forEach(e=>{var r=t.metadata[e.id];null!=r&&(a[e.label]=r)}),a});return JSON.stringify(e,null,2)}static exportToCompleteJSON(e,r,t={}){let i=this._createLookupMap(e.references.repositories),s=this._createLookupMap(e.references.branches),l=e.references.fields||[];r={data:r.map(t=>{let a={repo:i[t.repoId]||t.repoId,branch:s[t.branchId]||t.branchId,file:t.file,language:t.language,chatId:t.chatId};return l.forEach(e=>{var r=t.metadata[e.id];null!=r&&(a[e.label]=r)}),a}),references:{repositories:e.references.repositories,branches:e.references.branches,fields:l},metadata:{totalFiles:e.rows.length,filteredFiles:r.length,totalFields:e.references.fields.length,visibleFields:l.length,exportDate:(new Date).toISOString(),filterState:t}};return JSON.stringify(r,null,2)}static triggerDownload(e,r,t){e=new Blob([e],{type:t}),t=URL.createObjectURL(e),e=document.createElement("a");e.href=t,e.download=r,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(t)}static _createLookupMap(e){let r={};return e.forEach(e=>{r[e.id]=e.label}),r}static _escapeCsvField(e){return(e="string"!=typeof e?String(e):e).includes(",")||e.includes('"')||e.includes("\n")||e.includes("\r")?'"'+e.replace(/"/g,'""')+'"':e}static generateFilename(e,r="simple"){var t=new Date;let a=`metadata-insights-${t.toISOString().split("T")[0]}-`+t.toTimeString().split(" ")[0].replace(/:/g,"-");return"json"===e&&"complete"===r&&(a+="-complete"),a+="."+e}}module.exports=DataExporter;
