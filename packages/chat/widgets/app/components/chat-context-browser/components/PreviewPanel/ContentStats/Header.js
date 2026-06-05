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

let METRICS=require("./constants").METRICS,{formatBytes,formatTokens}=require("@gitsense/gsc-utils"),DomUtils=require("@gitsense/gsc-utils").DomUtils;class Header{constructor(e,t){this.container=e,this.onMetricChange=t,this.h=DomUtils.h,this.elements={}}render(e,n){this.container.innerHTML="",this.container.style.textAlign="center",this.container.style.padding="10px 0",this.container.style.borderBottom="1px solid #eee";let s=this.h.createDiv({style:{display:"inline-block",fontSize:"0.95em"}}),r=[{id:METRICS.TOKENS,label:"Tokens",value:formatTokens(e.tokens)},{id:METRICS.SIZE,label:"Size",value:formatBytes(e.size)},{id:METRICS.LINES,label:"Lines",value:e.lines.toLocaleString()}];r.forEach((e,t)=>{var i=this.h.createSpan({style:{margin:"0 15px",cursor:"pointer",color:"#333"}});e.id===n?(i.innerHTML=`<strong>${e.label}:</strong> `+e.value,i.style.color="black",i.style.borderBottom="2px solid black",i.style.paddingBottom="4px",i.style.cursor="default"):(i.innerHTML=e.label+": "+e.value,i.addEventListener("click",()=>this.onMetricChange(e.id))),s.appendChild(i),t<r.length-1&&(i=this.h.createSpan({text:"|",style:{color:"#ccc",margin:"0 5px"}}),s.appendChild(i))}),this.container.appendChild(s)}destroy(){this.container.innerHTML=""}}module.exports={Header:Header};
