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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,PromptBox=require("../../../ui/prompt-box").PromptBox;class FocusModal{constructor(o={}){this.options={message:{},onClose:()=>{},...o},this.promptBox=null,this.h=DomUtils.h}show(){var o;this.promptBox?console.warn("FocusModal is already shown"):(this.promptBox=new PromptBox({title:"Message #"+(this.options.message.position||1),width:"900px",height:"90vh",maxWidth:"90vw",maxHeight:"90vh",bodyPadding:"0px",headerPadding:"10px 20px",showCloseButton:!0,zIndex:1000003}),o=this.createContent(),this.promptBox.show({content:o},()=>{this.cleanup()}))}hide(){this.promptBox&&this.promptBox.hide()}cleanup(){this.promptBox&&(this.promptBox.destroy(),this.promptBox=null),this.options.onClose()}createContent(){var o=this.h.createDiv({className:"gs-focus-modal"}),t=this.h.createDiv({className:"gs-focus-modal-content"}),s=this.h.createPre({className:"gs-focus-message-content",text:this.options.message.content||""});return t.appendChild(s),o.appendChild(t),o}}module.exports={FocusModal:FocusModal};
