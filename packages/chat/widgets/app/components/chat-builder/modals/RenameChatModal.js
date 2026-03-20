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

let{h,s,svg}=require("../Dependencies"),{getChatTitleSuggestion,updateChatName}=require("../Dependencies");function RenameChatModal(f,x,a,k){let C=(()=>{for(let e=0;e<a.length;e++){var t=a[e];if(t.default)return t}return a[0]})(),{uuid:b,name:w}=x,D=""===x.messages[0].kids[0].message;function e(){let g=null,v=null,y=null;this.render=function(){{{v=h.createButton({cls:"btn btn-primary disabled",text:"Save",style:{marginRight:"5px"}});var d=h.createSpan({append:[svg.x()],style:{cursor:"pointer"}}),r=h.createButton({cls:"btn",text:"Cancel",style:{marginRight:"10px"}}),c=h.createDiv({cls:"gs-chat-modal-header",append:[h.createH2({text:"Rename Chat: "+(x.name.length<50?x.name:x.name.substring(0,50)+"...")}),d]}),o=h.createDiv({cls:"gs-chat-modal-body"}),p=(y=o,h.createDiv({cls:"gs-chat-modal-footer",append:[r,v]})),c=h.createDiv({cls:"gs-chat-modal-content",append:[c,o,p]});g=h.createDiv({cls:"gs-chat-modal",append:[c]}),document.body.appendChild(g);let t=!1;function m(){g.parentNode.removeChild(g)}document.addEventListener("mousedown",()=>{t=!1}),document.addEventListener("mousemove",()=>{t=!0}),window.addEventListener("click",e=>{e.target!==g||t||0!==window.getSelection().toString().length||m(),t=!1}),r.onclick=m,d.onclick=m}let n=h.createTextInput({cls:"form-control",style:{display:"inline-block",verticalAlign:"middle",width:"100%",padding:"10px",paddingRight:"60px"}}),t=(n.value=w,h.createLink({text:"Ask AI",style:{display:D?"none":"inline-block",verticalAlign:"middle",position:"relative",left:"-60px",fontWeight:500,cursor:"pointer"}})),e=h.createDiv({append:[n,t],style:{whiteSpace:"nowrap",overflow:"hidden"}}),a=h.createDiv({text:"Ask AI to get a suggestion from "+C.name,style:{marginTop:"10px"}}),i=h.createH5({text:"User asked",style:{marginTop:"20px"}}),l=h.createDiv({text:s.truncate(x.messages[0].kids[0].message),style:{marginTop:"5px"}});function u(){var e=n.value.trim(),t=v.className.match(/disabled/);return e===x.name||""===e?(t||(v.className+=" disabled"),!1):(t&&(v.className=v.className.replace(/disabled/,"")),!0)}y.appendChild(e),D||(y.appendChild(a),y.appendChild(i),y.appendChild(l)),n.addEventListener("keyup",e=>{u()}),t.onclick=async function(){n.value="Asking...",t.style.display="none";var e=await getChatTitleSuggestion(f,b,C.name);n.value=e.replace(/^'/,"").replace(/'$/,""),t.style.display="inline-block",e.match(/^No API key defined/)||u()},v.onclick=async function(){var e,t,a;u()&&(e=n.value.trim(),{success:e,chat:t,error:a}=await updateChatName(f,b,x.name,e),e?(x.name=t.name,k(!0,t)):k(!1,null,a),g.parentNode.removeChild(g))}}}}this.render=function(){(new e).render()}}module.exports=RenameChatModal;
