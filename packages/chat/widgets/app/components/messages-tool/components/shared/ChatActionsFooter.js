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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class ChatActionsFooter{constructor(t,e={}){this.container=t,this.options={messageCountText:"",primaryButtonText:"Download",primaryButtonAction:()=>{},secondaryButtonText:"Cancel",secondaryButtonAction:()=>{},primaryButtonDisabled:!1,secondaryButtonDisabled:!1,...e},this.h=DomUtils.h,this.primaryButton=null,this.secondaryButton=null,this.messageCountElement=null}render(){this.container.innerHTML="";var t=this.h.createDiv({className:"gs-chat-actions-footer"}),e=(this.messageCountElement=this.h.createDiv({className:"gs-chat-actions-footer-message-count",text:this.options.messageCountText}),this.secondaryButton=this.h.createButton({className:"btn",text:this.options.secondaryButtonText,disabled:this.options.secondaryButtonDisabled,onclick:()=>{this.options.secondaryButtonAction()}}),this.primaryButton=this.h.createButton({className:"btn btn-primary",text:this.options.primaryButtonText,disabled:this.options.primaryButtonDisabled,onclick:()=>{this.options.primaryButtonAction()}}),this.h.createDiv({className:"gs-chat-actions-footer-buttons"}));e.appendChild(this.secondaryButton),e.appendChild(this.primaryButton),t.appendChild(this.messageCountElement),t.appendChild(e),this.container.appendChild(t)}setPrimaryButtonEnabled(t){this.primaryButton&&(this.primaryButton.disabled=!t)}setPrimaryButtonText(t){this.primaryButton&&(this.primaryButton.textContent=t)}setSecondaryButtonEnabled(t){this.secondaryButton&&(this.secondaryButton.disabled=!t)}setSecondaryButtonText(t){this.secondaryButton&&(this.secondaryButton.textContent=t)}cleanup(){this.container.innerHTML=""}setMessageCountText(t){this.messageCountElement&&(this.messageCountElement.textContent=t)}getMessageCountText(){return this.messageCountElement?this.messageCountElement.textContent:""}}module.exports={ChatActionsFooter:ChatActionsFooter};
