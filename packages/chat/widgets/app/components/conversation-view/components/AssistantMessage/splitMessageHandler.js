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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function handleSplitMessage(r,t,e,n){if(!r||null==r.message||!t)return console.error("handleSplitMessage: Missing required parameters."),!1;var i,s="---split---",l="---hidden-split---",r=r.message||"",o=-1!==r.indexOf(s),r=-1!==r.indexOf(l);if(!o&&!r)return!1;let a=null;for(i of t.querySelectorAll("p"))if(i.textContent.trim()===s||i.textContent.trim()===l){a=i;break}if(!a)return!1;try{var p=DomUtils.h;let t=p.createDiv({style:{display:"none",marginTop:"10px"}}),e=a.nextElementSibling;for(;e;){var g=e;e=g.nextElementSibling,t.appendChild(g)}let n=p.createA({href:"#",text:"View the rest of the message",style:{display:r?"none":"inline-block",marginTop:"10px",marginBottom:"10px",fontWeight:500,cursor:"pointer"}});return n.onclick=e=>{e.preventDefault();e="none"===t.style.display;t.style.display=e?"":"none",n.textContent=e?"Hide the rest of the message":"View the rest of the message"},a.parentNode.insertBefore(n,a.nextSibling),a.parentNode.insertBefore(t,n.nextSibling),a.remove(),!0}catch(e){console.error("Error handling split message:",e);o=DomUtils.h.createP({text:"Error processing split message content.",style:{color:"red"}});return t.appendChild(o),!1}}module.exports={handleSplitMessage:handleSplitMessage};
