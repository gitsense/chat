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

let chatApi=require("../../../chat");class ChatImportService{static validateImportData(t){if(!t)return{isValid:!1,error:"No chat data provided"};if(!t.messages||!Array.isArray(t.messages))return{isValid:!1,error:"Invalid or missing messages array"};if(0===t.messages.length)return{isValid:!1,error:"No messages to import"};for(let e=0;e<t.messages.length;e++){var r=t.messages[e];if(!r.role||null==r.content)return{isValid:!1,error:`Message at index ${e} is missing required fields (role or content)`}}return{isValid:!0,error:null}}static processImportData(e){e=JSON.parse(JSON.stringify(e));return e.messages=e.messages.map((e,t)=>{t={id:e.id||"imported-"+t,position:t+1,role:e.role,content:e.content,type:e.type||"message",visibility:e.visibility||"public",created_at:e.created_at||(new Date).toISOString(),updated_at:e.updated_at||(new Date).toISOString()};return e.meta&&(t.meta=e.meta),t}),e}static async createImportChat(e,t){try{var r=e.widget,{selectedMessages:a,chatName:i,relationship:s,model:o,currentChat:n,importedChat:c}=t;if(!c)throw new Error("No imported chat property defined in the import options");var m=this.determineParentId(s,n),d={name:i,type:c.type||"regular",visibility:c.visibility||"public",parentId:m||0,model:o,messages:a},p=await chatApi.createChat(r,d);if(p)return"parent"===s&&n&&await chatApi.updateChat(r,n.id,{parent_id:p.id}),{success:!0,newChat:p,messageCount:a.length};throw new Error("Failed to create new chat")}catch(e){return console.error("Error creating imported chat:",e),{success:!1,error:e.message||"Failed to create imported chat"}}}static determineParentId(e,t){if(!t)return 0;switch(e){case"child":return t.id;case"sibling":case"parent":return t.parent_id||0;default:return 0}}static openImportedChat(e){window.location.assign("/?chat="+e.uuid)}static openImportedChatInNewTab(e){window.open("/?chat="+e.uuid,"_blank")}static showImportConfirmation(t,r){var e;return this.confirmationBox||(e=require("../../ui/confirmation-box").ConfirmationBox,this.confirmationBox=new e),new Promise(e=>{this.confirmationBox.show({title:"Confirm Import",message:`Import ${r} messages into a new chat named '${t}'?`,confirmButtonText:"Confirm",cancelButtonText:"Cancel"},()=>{e(!0)})})}}module.exports={ChatImportService:ChatImportService};
