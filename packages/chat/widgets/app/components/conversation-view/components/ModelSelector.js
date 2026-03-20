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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderModelSelector(e,l,n,t,i,r,o){r?(r.innerHTML="",o.innerHTML=""):(r=DomUtils.h.createDiv({style:{display:"inline-block",width:"calc(100% - 50px)",marginTop:"30px",marginBottom:"15px",verticalAlign:"top"}}),o=DomUtils.h.createDiv({style:{display:"inline-block",width:"50px",textAlign:"right",marginTop:"35px",marginBottom:"15px",verticalAlign:"top"}}));let s={display:"inline-block",padding:"0px 1px 5px 1px",marginRight:"15px",position:"relative",fontWeight:500,top:"1px",whiteSpace:"nowrap"},{pathname:a,search:p}=window.location,d=new URLSearchParams(p),c=d.get("chats")?d.get("chats").split(","):[],m=(c.length&&(""===c[0]||""===c[1]||c[0]===c[1])||renderSplitViewButton(o,e,l,t,d,a),c[0]===t.uuid?0:1);return e.forEach(t=>{var i=n[t];if(!i)throw new Error("No messages associated with "+t);i=i[0].message;if(t===l){let e=DomUtils.h.createDiv({text:t,style:s});e.style.borderBottom="1px solid black",void r.appendChild(e)}else{c.length?((o=d.get("models").split(","))[m]=t,d.set("models",o.join(","))):d.set("model",t);var o=(""===a?"/":a)+"?"+d.toString();let e=DomUtils.h.createLink({html:t+(null===i?" (&#216;)":""),href:o,style:{display:"inline-block",whiteSpace:"nowrap",color:"black",textDecoration:"none",marginRight:"15px",marginBottom:"15px"}});e.style.color="black",r.appendChild(e)}}),{modelsBody:r,modelsOptionsBody:o}}function renderSplitViewButton(e,i,o,l,n,r){var t=require("../Dependencies.js").svg,t=t.columns({style:{cursor:"pointer"}});e.appendChild(t),t.onclick=()=>{var e=l.uuid,t=i.indexOf(o),t=t===i.length-1?0:t+1,e=[e,e],t=[o,i[t]],e=(n.delete("chat"),n.delete("model"),n.set("chats",e.join(",")),n.set("models",t.join(",")),(""===r?"/":r)+"?"+n.toString());window.location.assign(e)}}module.exports={renderModelSelector:renderModelSelector};
