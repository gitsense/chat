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

let ChatExportService=require("./ChatExportService").ChatExportService,ConfirmationBox=require("../../ui/confirmation-box").ConfirmationBox;class ChatDownloadService{static async downloadChat(e,a,r,t,o={}){try{var i,n,s,l,d=this.validateDownloadData(e,r,a,t);return d.isValid?(n=(i=!o.downloadAll&&0<r.length?r:e).map(e=>{e=JSON.parse(JSON.stringify(e));return delete e.id,delete e.position,e}),s={...a,messages:n},l=ChatExportService.sanitizeFilename(t),ChatExportService.downloadAsFile(JSON.stringify(s,null,2),l,"json"),{success:!0,message:`Downloaded ${i.length} messages to `+l,filename:l,messageCount:i.length}):{success:!1,error:d.error}}catch(e){return console.error("Error downloading chat:",e),{success:!1,error:e.message}}}static validateDownloadData(e,a,r,t){return e&&Array.isArray(e)?0===e.length?{isValid:!1,error:"No messages to download"}:a&&!Array.isArray(a)?{isValid:!1,error:"Invalid selected messages array"}:r&&"object"==typeof r?t&&"string"==typeof t?t.endsWith(".json")?{isValid:!0,error:null}:{isValid:!1,error:"Filename must have .json extension"}:{isValid:!1,error:"Invalid filename"}:{isValid:!1,error:"Invalid chat metadata"}:{isValid:!1,error:"Invalid messages array"}}static generateDefaultFilename(e=""){var a=new Date,a=`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-`+String(a.getDate()).padStart(2,"0"),e=e.replace(/[<>:"/\\|?*]/g,"_");return(e?e+"-chat":"chat")+`-${a}.json`}static showDownloadConfirmation(a,r){return this.confirmationBox||(this.confirmationBox=new ConfirmationBox),new Promise(e=>{this.confirmationBox.show({title:"Confirm Download",message:`Download chat with ${r} messages to '${a}'?`,confirmButtonText:"Confirm",cancelButtonText:"Cancel"},()=>{e(!0)})})}}module.exports={ChatDownloadService:ChatDownloadService};
