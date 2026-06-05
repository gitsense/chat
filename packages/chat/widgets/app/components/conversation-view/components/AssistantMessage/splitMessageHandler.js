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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function handleSplitMessage(r,t,e,n){if(!r||null==r.message||!t)return console.error("handleSplitMessage: Missing required parameters."),!1;var i,s="---split---",l="---hidden-split---",r=r.message||"",o=-1!==r.indexOf(s),r=-1!==r.indexOf(l);if(!o&&!r)return!1;let a=null;for(i of t.querySelectorAll("p"))if(i.textContent.trim()===s||i.textContent.trim()===l){a=i;break}if(!a)return!1;try{var p=DomUtils.h;let t=p.createDiv({style:{display:"none",marginTop:"10px"}}),e=a.nextElementSibling;for(;e;){var g=e;e=g.nextElementSibling,t.appendChild(g)}let n=p.createA({href:"#",text:"View the rest of the message",style:{display:r?"none":"inline-block",marginTop:"10px",marginBottom:"10px",fontWeight:500,cursor:"pointer"}});return n.onclick=e=>{e.preventDefault();e="none"===t.style.display;t.style.display=e?"":"none",n.textContent=e?"Hide the rest of the message":"View the rest of the message"},a.parentNode.insertBefore(n,a.nextSibling),a.parentNode.insertBefore(t,n.nextSibling),a.remove(),!0}catch(e){console.error("Error handling split message:",e);o=DomUtils.h.createP({text:"Error processing split message content.",style:{color:"red"}});return t.appendChild(o),!1}}module.exports={handleSplitMessage:handleSplitMessage};
