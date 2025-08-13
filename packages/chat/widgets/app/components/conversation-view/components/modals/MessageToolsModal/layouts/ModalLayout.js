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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let h=require("../../../../Dependencies").h;function ModalLayout(e={}){let{title:d="Messages Tool",onClose:i=()=>{}}=e,l=null,s=null,r=null,p=null,c=null;function u(e){"Escape"===e.key&&i()}return{render:function(e){var t,a,o,n;return l=l||(t=h.createDiv({className:"gs-modal gs-assistant-messages-modal",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e5,opacity:0,transition:"opacity 0.2s ease-in-out"}}),a=h.createDiv({className:"gs-modal-content",style:{backgroundColor:"white",borderRadius:"8px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.25)",width:"90%",maxWidth:"1400px",maxHeight:"90vh",display:"flex",flexDirection:"column",overflow:"hidden"}}),s=h.createDiv({className:"gs-modal-header",style:{padding:"10px 24px",borderBottom:"1px solid #e8e8e8",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"#f5f5f5"}}),o=h.createH3({text:d,style:{margin:0,fontSize:"18px",fontWeight:600}}),(n=h.createButton({className:"gs-modal-close",text:"×",style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",padding:"0 8px"}})).addEventListener("click",i),s.appendChild(o),s.appendChild(n),r=h.createDiv({className:"gs-menu-bar",style:{padding:"8px 16px",borderBottom:"1px solid #e8e8e8",display:"flex",gap:"8px",backgroundColor:"#fafafa"}}),p=h.createDiv({className:"gs-notification-area-container"}),c=h.createDiv({className:"gs-modal-body",style:{padding:"24px",display:"flex",gap:"24px",overflow:"auto",flex:1}}),a.appendChild(s),a.appendChild(r),a.appendChild(p),a.appendChild(c),t.appendChild(a),t),e.appendChild(l),l.addEventListener("click",e=>{e.target===l&&i()}),document.addEventListener("keydown",u),setTimeout(()=>{l&&(l.style.opacity="1")},25),{modal:l,header:s,menuBar:r,notificationArea:p,body:c}},cleanup:function(){l&&l.parentNode&&(l.style.opacity="0",setTimeout(()=>{l&&l.parentNode&&l.parentNode.removeChild(l)},200)),document.removeEventListener("keydown",u)}}}module.exports=ModalLayout;
