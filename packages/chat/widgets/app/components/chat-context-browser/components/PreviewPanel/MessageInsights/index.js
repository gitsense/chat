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

let CONFIG=require("./constants").CONFIG,formatAge=require("@gitsense/gsc-utils").formatAge,DomUtils=require("@gitsense/gsc-utils").DomUtils;class MessageInsights{constructor(e,t){this.container=e,this.onMessageClick=t,this.highlightedMessageId=null,this.messages=[],this.relevantMessageIds=new Set,this.h=DomUtils.h}render(e,t){this.messages=e,this.relevantMessageIds=t,this.container.innerHTML="",this._renderMessages(e,t)}highlightMessage(e){this.highlightedMessageId=String(e),this.render(this.messages,this.relevantMessageIds)}_renderMessages(e,h){Object.assign(this.container.style,{display:"flex",justifyContent:"center",alignItems:"center"});let n=this.h.createDiv({style:{display:"flex",flexWrap:"wrap",gap:CONFIG.GAP+"px",maxHeight:"100px",overflowY:"auto"}});this.container.appendChild(n);var t=this.h.createDiv({style:{display:"inline-block",width:3*CONFIG.RECT_WIDTH+2*CONFIG.GAP+"px",lineHeight:CONFIG.RECT_HEIGHT+"px",textAlign:"right",fontSize:"0.9em",color:"#333",flexShrink:"0"}}),s=this.h.createDiv({style:{display:"inline-block",width:3*CONFIG.RECT_WIDTH+2*CONFIG.GAP+"px",lineHeight:CONFIG.RECT_HEIGHT+"px",textAlign:"left",fontSize:"0.9em",color:"#333",flexShrink:"0"}}),i=formatAge(e[0].created_at),i=(t.appendChild(this.h.createTextNode(i)),n.appendChild(t),e.forEach(e=>{var t=this.h.createDiv({style:{width:CONFIG.RECT_WIDTH+"px",height:CONFIG.RECT_HEIGHT+"px",backgroundColor:"user"===e.role?CONFIG.BACKGROUND_USER:CONFIG.BACKGROUND_ASSISTANT},title:`Message #${e.position} (${formatAge(e.created_at)}) (${e.role})`}),s=String(e.id),i=h.has(s),s=s===this.highlightedMessageId,a=0<e.codeBlockSummary?.total,r=0<e.codeBlockSummary?.total||e.isContextMessage;let l=CONFIG.BORDER_DEFAULT;a?l=CONFIG.BORDER_CODE_BLOCK:r&&(l=CONFIG.BORDER_CONTENT),r&&!i||(t.style.border=a?"1px solid "+(CONFIG.BORDER_CODE_BLOCK_COLOR||"#000"):r?"1px solid "+(CONFIG.BORDER_CONTENT_COLOR||"#aaa"):CONFIG.BORDER_DEFAULT),t.style.border=l,s&&(t.style.border="2px solid "+(CONFIG.HIGHLIGHT_COLOR||"#007bff")),t.addEventListener("click",()=>{this.onMessageClick(e.id)}),n.appendChild(t)}),formatAge(e[e.length-1].created_at));s.appendChild(this.h.createTextNode(i)),n.appendChild(s)}destroy(){this.container.innerHTML=""}}module.exports={MessageInsights:MessageInsights};
