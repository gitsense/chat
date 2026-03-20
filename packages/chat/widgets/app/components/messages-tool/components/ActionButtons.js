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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class ActionButtons{constructor(t,n={}){this.container=t,this.options={onAssistantClick:()=>{},onExportClick:()=>{},onCompactClick:()=>{},onReplaceClick:()=>{},onDeleteClick:()=>{},onNewChatClick:()=>{},...n},this.h=DomUtils.h}render(){this.container.innerHTML="";var t=this.h.createDiv({className:"gs-action-buttons-container"}),n=this.h.createButton({className:"gs-action-button gs-new-chat-button",text:"New Chat",onclick:()=>{this.options.onNewChatClick()}}),o=this.h.createButton({className:"gs-action-button gs-assistant-button",text:"Assistant",onclick:()=>{this.options.onAssistantClick()}}),s=this.h.createButton({className:"gs-action-button gs-compact-button",text:"Compact",onclick:()=>{this.options.onCompactClick()}}),i=this.h.createButton({className:"gs-action-button gs-replace-button",text:"Replace",onclick:()=>{this.options.onReplaceClick()}}),e=this.h.createButton({className:"gs-action-button gs-delete-button",text:"Delete",onclick:()=>{this.options.onDeleteClick()}}),c=this.h.createButton({className:"gs-action-button gs-download-button",text:"Export",onclick:()=>{this.options.onExportClick()}});t.appendChild(n),t.appendChild(o),t.appendChild(s),t.appendChild(i),t.appendChild(e),t.appendChild(c),this.container.appendChild(t)}cleanup(){this.container.innerHTML=""}}module.exports={ActionButtons:ActionButtons};
