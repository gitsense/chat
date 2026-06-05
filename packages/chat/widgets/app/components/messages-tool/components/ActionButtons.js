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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class ActionButtons{constructor(t,n={}){this.container=t,this.options={onAssistantClick:()=>{},onExportClick:()=>{},onCompactClick:()=>{},onReplaceClick:()=>{},onDeleteClick:()=>{},onNewChatClick:()=>{},...n},this.h=DomUtils.h}render(){this.container.innerHTML="";var t=this.h.createDiv({className:"gs-action-buttons-container"}),n=this.h.createButton({className:"gs-action-button gs-new-chat-button",text:"New Chat",onclick:()=>{this.options.onNewChatClick()}}),o=this.h.createButton({className:"gs-action-button gs-assistant-button",text:"Assistant",onclick:()=>{this.options.onAssistantClick()}}),s=this.h.createButton({className:"gs-action-button gs-compact-button",text:"Compact",onclick:()=>{this.options.onCompactClick()}}),i=this.h.createButton({className:"gs-action-button gs-replace-button",text:"Replace",onclick:()=>{this.options.onReplaceClick()}}),e=this.h.createButton({className:"gs-action-button gs-delete-button",text:"Delete",onclick:()=>{this.options.onDeleteClick()}}),c=this.h.createButton({className:"gs-action-button gs-download-button",text:"Export",onclick:()=>{this.options.onExportClick()}});t.appendChild(n),t.appendChild(o),t.appendChild(s),t.appendChild(i),t.appendChild(e),t.appendChild(c),this.container.appendChild(t)}cleanup(){this.container.innerHTML=""}}module.exports={ActionButtons:ActionButtons};
