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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class ChatActionsFooter{constructor(t,e={}){this.container=t,this.options={messageCountText:"",primaryButtonText:"Download",primaryButtonAction:()=>{},secondaryButtonText:"Cancel",secondaryButtonAction:()=>{},primaryButtonDisabled:!1,secondaryButtonDisabled:!1,...e},this.h=DomUtils.h,this.primaryButton=null,this.secondaryButton=null,this.messageCountElement=null}render(){this.container.innerHTML="";var t=this.h.createDiv({className:"gs-chat-actions-footer"}),e=(this.messageCountElement=this.h.createDiv({className:"gs-chat-actions-footer-message-count",text:this.options.messageCountText}),this.secondaryButton=this.h.createButton({className:"btn",text:this.options.secondaryButtonText,disabled:this.options.secondaryButtonDisabled,onclick:()=>{this.options.secondaryButtonAction()}}),this.primaryButton=this.h.createButton({className:"btn btn-primary",text:this.options.primaryButtonText,disabled:this.options.primaryButtonDisabled,onclick:()=>{this.options.primaryButtonAction()}}),this.h.createDiv({className:"gs-chat-actions-footer-buttons"}));e.appendChild(this.secondaryButton),e.appendChild(this.primaryButton),t.appendChild(this.messageCountElement),t.appendChild(e),this.container.appendChild(t)}setPrimaryButtonEnabled(t){this.primaryButton&&(this.primaryButton.disabled=!t)}setPrimaryButtonText(t){this.primaryButton&&(this.primaryButton.textContent=t)}setSecondaryButtonEnabled(t){this.secondaryButton&&(this.secondaryButton.disabled=!t)}setSecondaryButtonText(t){this.secondaryButton&&(this.secondaryButton.textContent=t)}cleanup(){this.container.innerHTML=""}setMessageCountText(t){this.messageCountElement&&(this.messageCountElement.textContent=t)}getMessageCountText(){return this.messageCountElement?this.messageCountElement.textContent:""}}module.exports={ChatActionsFooter:ChatActionsFooter};
