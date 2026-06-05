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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,PromptBox=require("../../../ui/prompt-box").PromptBox;class MessageModal{constructor(e={}){this.options={message:{},onClose:()=>{},...e},this.promptBox=null,this.activeTab="raw",this.h=DomUtils.h}show(){var e;this.promptBox?console.warn("MessageModal is already shown"):(this.promptBox=new PromptBox({title:"Message "+(this.options.message.position||1),width:"90%",height:"80%",maxWidth:"1200px",maxHeight:"800px",bodyPadding:"0px",headerPadding:"10px 20px",showCloseButton:!0,zIndex:1000001}),e=this.createContent(),this.promptBox.show({content:e},()=>{this.cleanup()}))}hide(){this.promptBox&&this.promptBox.hide()}cleanup(){this.promptBox&&(this.promptBox.destroy(),this.promptBox=null),this.options.onClose()}createContent(){var e=this.h.createDiv({className:"gs-message-modal"}),t=this.createInfoHeader(),t=(e.appendChild(t),this.createTabNavigation()),t=(e.appendChild(t),this.createContentArea());return e.appendChild(t),e}createInfoHeader(){var e=this.options.message,t=this.h.createDiv({className:"gs-message-info-header"}),s=this.h.createDiv({style:{display:"flex",gap:"20px",fontSize:"14px"}}),a=this.h.createSpan({text:"Position: "+(e.position||1),style:{fontWeight:500}}),i=this.h.createSpan({text:"Role: "+(e.role?e.role.charAt(0).toUpperCase()+e.role.slice(1):"Unknown"),style:{fontWeight:500}}),o=this.h.createSpan({text:"Type: "+(e.type?e.type.charAt(0).toUpperCase()+e.type.slice(1):"Regular"),style:{fontWeight:500}}),e=this.h.createSpan({text:"Created: "+(e.created_at||"Unknown"),style:{fontWeight:500}});return s.appendChild(a),s.appendChild(i),s.appendChild(o),s.appendChild(e),t.appendChild(s),t}createTabNavigation(){var e=this.h.createDiv({className:"gs-message-tab-nav"}),t=this.h.createButton({text:"Raw Markdown",className:"gs-tab-button"+("raw"===this.activeTab?" active":""),style:{borderBottom:"raw"===this.activeTab?"2px solid #0366d6":"2px solid transparent",fontWeight:"raw"===this.activeTab?500:400},onclick:()=>{this.switchTab("raw")}}),s=this.h.createButton({text:"Rendered",className:"gs-tab-button"+("rendered"===this.activeTab?" active":""),style:{borderBottom:"rendered"===this.activeTab?"2px solid #0366d6":"2px solid transparent",fontWeight:"rendered"===this.activeTab?500:400},onclick:()=>{this.switchTab("rendered")}});return e.appendChild(t),e.appendChild(s),e}createContentArea(){var e=this.h.createDiv({className:"gs-message-content-area"}),t=this.h.createPre({className:"gs-message-raw-view",text:this.options.message.content||"",style:{display:"raw"===this.activeTab?"block":"none"}}),s=this.h.createDiv({className:"gs-message-rendered-view markdown-body",style:{display:"rendered"===this.activeTab?"block":"none"}});return s.innerHTML=`<pre style="white-space: pre-wrap; font-family: monospace;">${this.options.message.content||""}</pre>`,e.appendChild(t),e.appendChild(s),e}switchTab(s){var e,t;this.activeTab!==s&&(this.activeTab=s,this.promptBox.container.querySelectorAll(".gs-tab-button").forEach((e,t)=>{t=0===t&&"raw"===s||1===t&&"rendered"===s;e.style.borderBottom=t?"2px solid #0366d6":"2px solid transparent",e.style.fontWeight=t?500:400}),e=this.promptBox.container.querySelector(".gs-message-raw-view"),t=this.promptBox.container.querySelector(".gs-message-rendered-view"),"raw"===s?(e.style.display="block",t.style.display="none"):(e.style.display="none",t.style.display="block"))}}module.exports={MessageModal:MessageModal};
