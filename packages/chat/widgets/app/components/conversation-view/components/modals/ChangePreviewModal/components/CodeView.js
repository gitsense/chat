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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderCodeView(e){var{fromTitleText:e="From",toTitleText:t="To",fromHeaderText:o,fromText:i,toHeaderText:l,toText:n,language:a,hljs:r}=e,d=DomUtils.h.createDiv({cls:"code-view-section"}),s=DomUtils.h.createDiv({cls:"diff-view",style:{display:"flex",gap:"20px",height:"calc(90vh - 140px)"}}),e=createCodePanel(e,o+(o?"\n\n\n":"")+i,a,r),o=(s.appendChild(e),l+(l?"\n\n\n":"")+n),i=createCodePanel(t,o,a,r);return s.appendChild(i),d.appendChild(s),d}function createCodePanel(e,t,o,i){var l=DomUtils.h.createDiv({style:{flex:"1 0 50%",display:"flex",flexDirection:"column",maxWidth:"calc(50% - 10px)"}}),e=DomUtils.h.createH4({text:e,style:{margin:"0 0 10px 0"}}),e=(l.appendChild(e),DomUtils.h.createDiv({style:{height:"calc(80vh)",border:"1px solid #ddd",borderRadius:"4px",overflow:"auto",position:"relative"}}));let n=DomUtils.h.createButton({text:"📋",title:"Copy code",style:{position:"absolute",top:"10px",right:"10px",padding:"5px 8px",backgroundColor:"rgba(255, 255, 255, 0.9)",border:"1px solid #ddd",borderRadius:"4px",cursor:"pointer",fontSize:"14px",opacity:"0",transition:"opacity 0.2s ease",zIndex:"10"},onclick:e=>{e.stopPropagation(),navigator.clipboard.writeText(t).then(()=>{let e=n.textContent;n.textContent="✓",setTimeout(()=>{n.textContent=e},1e3)}).catch(e=>{console.error("Failed to copy code:",e),n.textContent="❌",setTimeout(()=>{n.textContent="📋"},1e3)})}});e.appendChild(n),e.addEventListener("mouseenter",()=>{n.style.opacity="1"}),e.addEventListener("mouseleave",()=>{n.style.opacity="0"});var a=document.createElement("pre"),r=(a.style.margin="0",a.style.padding="10px",a.style.height="auto",a.style.boxSizing="border-box",a.style.overflow="visible",document.createElement("code"));if(r.className=o?"language-"+o:"",i&&o)try{r.innerHTML=i.highlight(t,{language:o,ignoreIllegals:!0}).value}catch(e){console.error(`Failed to highlight ${o} code:`,e),r.textContent=t}else r.textContent=t;return a.appendChild(r),e.appendChild(a),l.appendChild(e),l}module.exports={renderCodeView:renderCodeView};
