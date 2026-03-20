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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,MessagesTool=require("../messages-tool").MessagesTool,ChatImportService=require("./services/ChatImportService").ChatImportService,ImportSourceModal=require("./components/ImportSourceModal").ImportSourceModal;class ChatManager{constructor(e){this.context=e,this.activeTool=null,this.importSourceModal=null}downloadChat(e={}){var t,o=ChatUtils.getChatMessages(this.context.chat).map((e,t)=>({id:e.id,position:t+1,type:e.type,role:e.role,content:e.message,meta:e.meta,visibility:e.visibility,created_at:e.created_at,updated_at:e.updated_at})),a=this.validateChatData(o);return a.isValid?(this.cleanup(),t={title:"Download Chat",showActionBar:!1,viewMode:"download-chat",layout:{leftPanel:"selection",rightPanel:"preview"},defaultFilename:e.defaultFilename||this.generateDefaultFilename(this.context.chat?.name),onDownload:e.onDownload||(()=>{}),onCancel:e.onCancel||(()=>{}),onError:e.onError||(()=>{}),...e},this.activeTool=new MessagesTool(o,this.context,t),this.activeTool.show()):(console.error("Cannot download chat:",a.error),e.onError&&e.onError(a.error)),this}importChat(e={}){return this.cleanup(),e.importedChat?this.processImportedChat(e.importedChat,e):(this.showImportModal(e),this)}showImportModal(t={}){this.importSourceModal=new ImportSourceModal({onImport:e=>{this.processImportedChat(e,t)},onCancel:()=>{t.onCancel&&t.onCancel()}}),this.importSourceModal.show()}processImportedChat(e,t={}){this.cleanup();t={title:"Import Chat",sourceFilename:e.sourceFilename,showActionBar:!1,viewMode:"import-chat",layout:{leftPanel:"selection",rightPanel:"preview"},importedChat:e,currentChat:this.context.chat||null,onImport:t.onImport||(()=>{}),onCancel:t.onCancel||(()=>{}),onError:t.onError||(()=>{}),...t};return this.activeTool=new MessagesTool(e.messages,this.context,t),this.activeTool.show(),this}showError(e){var t=require("@gitsense/gsc-utils").DomUtils;let o=t.h.createDiv({text:e,style:{position:"fixed",top:"20px",right:"20px",padding:"12px 16px",borderRadius:"4px",backgroundColor:"#f8d7da",color:"#721c24",zIndex:1000003,boxShadow:"0 2px 10px rgba(0,0,0,0.1)",fontSize:"14px",maxWidth:"300px"}});document.body.appendChild(o),setTimeout(()=>{o.parentNode&&o.parentNode.removeChild(o)},3e3)}close(){return this.cleanup(),this}generateDefaultFilename(e=""){var t=new Date,t=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-`+String(t.getDate()).padStart(2,"0"),e=e.replace(/[<>:"/\\|?*]/g,"_");return(e?e+"-chat":"chat")+`-${t}.json`}validateChatData(e){return e&&Array.isArray(e)?0===e.length?{isValid:!1,error:"No messages to process"}:{isValid:!0,error:null}:{isValid:!1,error:"Invalid messages array"}}cleanup(){this.activeTool&&(this.activeTool.cleanup(),this.activeTool=null),this.importSourceModal&&(this.importSourceModal.cleanup(),this.importSourceModal=null)}}module.exports={ChatManager:ChatManager};
