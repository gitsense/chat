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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;async function handleCodeSmarter(e,t,o,r){return"code-smarter"===e.type&&!!t&&processVideoSyntax(t)}function processVideoSyntax(e){DomUtils.h;let o=!1;return e.querySelectorAll("p").forEach(e=>{var t;e.textContent.trim().startsWith("@")&&e.querySelector("a")&&"video"===(t=e.querySelector("a")).textContent.trim()&&(t=t.getAttribute("href"))&&(t=createVideoElement(t),e.parentNode.replaceChild(t,e),o=!0)}),o}function createVideoElement(e){let t=DomUtils.h;var o={width:"100%",height:"auto",controls:!0,preload:"metadata"},r=e.split("/");r[r.length-1].replace(/\.[^/.]+$/,"");let a=null;o.poster||(a=e.replace(/\.[^/.]+$/,".png"));r=t.createDiv({style:{width:"100%",margin:"20px 0",position:"relative"}});let i=t.createVideo({width:o.width,height:o.height,controls:o.controls,preload:o.preload,poster:a||null,style:{display:"block",width:"100%",height:"auto",border:"1px solid #bbb",borderRadius:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",marginBottom:"30px"}});var o=[],n=(e.endsWith(".mp4")?o.push({src:e,type:"video/mp4"}):e.endsWith(".webm")?(n=e.replace(".webm",".mp4"),o.push({src:n,type:"video/mp4"}),o.push({src:e,type:"video/webm"})):o.push({src:e,type:getVideoType(e)}),o.forEach(e=>{e=t.createSource({src:e.src,type:e.type});i.appendChild(e)}),document.createTextNode("Your browser does not support the video tag. "+`<a href="${e}" download>Download the video</a> instead.`));i.appendChild(n),createPlayButtonOverlay(i);return r.appendChild(i),r}function createPlayButtonOverlay(e){var t=DomUtils.h;let o=t.createDiv({style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.3)",borderRadius:"8px",cursor:"pointer",transition:"opacity 0.3s ease",zIndex:"10"}}),r=t.createDiv({style:{width:"80px",height:"80px",backgroundColor:"rgba(255, 255, 255, 0.9)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.3)",transition:"transform 0.2s ease, background-color 0.2s ease"}});t=t.createDiv({style:{width:"0",height:"0",borderTop:"15px solid transparent",borderBottom:"15px solid transparent",borderLeft:"25px solid #333",marginLeft:"5px"}});return r.appendChild(t),o.appendChild(r),r.addEventListener("mouseenter",()=>{r.style.transform="scale(1.1)",r.style.backgroundColor="rgba(255, 255, 255, 1)"}),r.addEventListener("mouseleave",()=>{r.style.transform="scale(1)",r.style.backgroundColor="rgba(255, 255, 255, 0.9)"}),o.addEventListener("click",()=>{e.play()}),e.addEventListener("play",()=>{o.style.opacity="0",o.style.pointerEvents="none"}),e.addEventListener("pause",()=>{o.style.opacity="1",o.style.pointerEvents="auto"}),e.addEventListener("ended",()=>{o.style.opacity="1",o.style.pointerEvents="auto"}),o}function getVideoType(e){return{mp4:"video/mp4",webm:"video/webm",ogg:"video/ogg",mov:"video/quicktime",avi:"video/x-msvideo"}[e.split(".").pop().toLowerCase()]||"video/mp4"}module.exports={handleCodeSmarter:handleCodeSmarter};
