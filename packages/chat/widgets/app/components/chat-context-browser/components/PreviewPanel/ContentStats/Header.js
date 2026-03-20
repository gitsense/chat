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

let METRICS=require("./constants").METRICS,{formatBytes,formatTokens}=require("@gitsense/gsc-utils"),DomUtils=require("@gitsense/gsc-utils").DomUtils;class Header{constructor(e,t){this.container=e,this.onMetricChange=t,this.h=DomUtils.h,this.elements={}}render(e,n){this.container.innerHTML="",this.container.style.textAlign="center",this.container.style.padding="10px 0",this.container.style.borderBottom="1px solid #eee";let s=this.h.createDiv({style:{display:"inline-block",fontSize:"0.95em"}}),r=[{id:METRICS.TOKENS,label:"Tokens",value:formatTokens(e.tokens)},{id:METRICS.SIZE,label:"Size",value:formatBytes(e.size)},{id:METRICS.LINES,label:"Lines",value:e.lines.toLocaleString()}];r.forEach((e,t)=>{var i=this.h.createSpan({style:{margin:"0 15px",cursor:"pointer",color:"#333"}});e.id===n?(i.innerHTML=`<strong>${e.label}:</strong> `+e.value,i.style.color="black",i.style.borderBottom="2px solid black",i.style.paddingBottom="4px",i.style.cursor="default"):(i.innerHTML=e.label+": "+e.value,i.addEventListener("click",()=>this.onMetricChange(e.id))),s.appendChild(i),t<r.length-1&&(i=this.h.createSpan({text:"|",style:{color:"#ccc",margin:"0 5px"}}),s.appendChild(i))}),this.container.appendChild(s)}destroy(){this.container.innerHTML=""}}module.exports={Header:Header};
