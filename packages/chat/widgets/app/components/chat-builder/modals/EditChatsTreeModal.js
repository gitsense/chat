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

let TreeEditor=require("@gitsense/tree-editor"),{h,s,svg}=require("../Dependencies"),arrayToTree=require("../../tree-table/utils/treeUtils").arrayToTree;function EditChatsTreeModal(e,g,p,t){let u="disabled",n=null;function a(){let i=null,s=null,o=null,l=null;async function c(){var e=i.getChangedNodes();if(e.length){let r=[];e.forEach(e=>{var{id:e,parent_id:t,name:n,order_weight:a,change_type:d}=e;"delete"!==d&&r.push({id:e,parent_id:t,name:n,order_weight:a})}),t(r)}}this.destroy=()=>{i.destroy(),s.parentNode.removeChild(s)},this.render=()=>{o=h.createButton({cls:"btn btn-primary disabled",text:"Save",style:{marginRight:"5px"}});var e=h.createSpan({append:[svg.x()],style:{cursor:"pointer"}}),t=h.createButton({cls:"btn",text:"Cancel",style:{marginRight:"10px"}}),n=h.createDiv({cls:"gs-chat-modal-header",append:[h.createH2({text:`Edit Chats in "${p.name.substring(0,60)}"`}),e]}),a=h.createDiv({cls:"gs-chat-modal-body",style:{display:"block",paddingTop:"5px",paddingRight:"30px",height:"calc(80vh)",overflow:"auto"}}),d=(l=a,h.createDiv({cls:"gs-chat-modal-footer",append:[t,o],style:{borderTop:"0px",padding:"15px 15px 25px 15px"}})),n=h.createDiv({cls:"gs-chat-modal-content",append:[n,a,d]});function r(){i.destroy(),s.parentNode.removeChild(s)}s=h.createDiv({cls:"gs-chat-modal",append:[n]}),document.body.appendChild(s),document.addEventListener("mousedown",()=>{isMouseDragging=!1}),document.addEventListener("mousemove",()=>{isMouseDragging=!0}),window.addEventListener("click",e=>{e.target!==s||isMouseDragging||0!==window.getSelection().toString().length||r(),isMouseDragging=!1}),t.onclick=r,e.onclick=r,(a={})[g.id]={border:"1px solid rgb(255, 160, 0)",backgroundColor:"rgb(255, 243, 205)"},i=new TreeEditor({container:l,data:[p],expandDescendants:p.descendants.length<100,defaultExpandedNodeId:g.id,nodeDecorations:a,onSave:e=>{var t=i.getChangedNodes();t.length&&o.classList.contains(u)?o.classList.remove(u):0!==t.length||o.classList.contains(u)||o.classList.add(u)}}),o.onclick=c}}this.render=()=>{(n=new a).render()},this.destroy=()=>{n.destroy()}}module.exports=EditChatsTreeModal;
