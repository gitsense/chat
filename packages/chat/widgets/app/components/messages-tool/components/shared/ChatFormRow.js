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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class ChatFormRow{constructor(e,t={}){this.container=e,this.options={defaultFilename:"chat-config.json",onFilenameChange:()=>{},defaultChatName:"",disableFilenameInput:!1,onChatNameChange:()=>{},...t},this.h=DomUtils.h,this.filenameInput=null,this.chatNameInput=null}render(){this.container.innerHTML="";var e=this.h.createDiv({className:"gs-chat-form-row"}),t=this.h.createDiv({className:"gs-chat-form-section"}),a=this.h.createDiv({className:"gs-chat-form-label",text:"Chat Name"}),n=(this.chatNameInput=this.h.createInput({type:"text",className:"gs-chat-form-input",value:this.options.defaultChatName,placeholder:"Enter chat name...",onchange:e=>{this.options.onChatNameChange(e.target.value)}}),this.h.createDiv({className:"gs-chat-form-section"})),i=this.h.createDiv({className:"gs-chat-form-label",text:"Filename"});this.filenameInput=this.h.createInput({type:"text",className:"gs-chat-form-input",value:this.options.defaultFilename,placeholder:"Enter filename...",disabled:this.options.disableFilenameInput,style:this.options.disableFilenameInput?{backgroundColor:"#f0f0f0",cursor:"default"}:{},onchange:e=>{this.options.onFilenameChange(e.target.value)}}),t.appendChild(a),t.appendChild(this.chatNameInput),n.appendChild(i),n.appendChild(this.filenameInput),e.appendChild(t),e.appendChild(n),this.container.appendChild(e)}getFilename(){return this.filenameInput?this.filenameInput.value:""}setFilename(e){this.filenameInput&&(this.filenameInput.value=e)}getChatName(){return this.chatNameInput?this.chatNameInput.value:""}setChatName(e){this.chatNameInput&&(this.chatNameInput.value=e)}cleanup(){this.container.innerHTML=""}}module.exports={ChatFormRow:ChatFormRow};
