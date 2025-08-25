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

let DomUtils=require("../../utils/DomUtils");function handleSplitMessage(t,r,e,n){if(!t||null==t.message||!r)return console.error("handleSplitMessage: Missing required parameters."),!1;var i,l="---split---",t=t.message;if(!t||-1===t.indexOf(l))return!1;let s=null;for(i of r.querySelectorAll("p"))if(i.textContent.trim()===l){s=i;break}if(!s)return!1;try{var o=DomUtils.h;let t=o.createDiv({style:{display:"none",marginTop:"10px"}}),e=s.nextElementSibling;for(;e;){var a=e;e=a.nextElementSibling,t.appendChild(a)}let r=o.createA({href:"#",text:"View the rest of the message",style:{display:"inline-block",marginTop:"10px",marginBottom:"10px",fontWeight:500,cursor:"pointer"}});return r.onclick=e=>{e.preventDefault();e="none"===t.style.display;t.style.display=e?"":"none",r.textContent=e?"Hide the rest of the message":"View the rest of the message"},s.parentNode.insertBefore(r,s.nextSibling),s.parentNode.insertBefore(t,r.nextSibling),s.remove(),!0}catch(e){console.error("Error handling split message:",e);t=DomUtils.h.createP({text:"Error processing split message content.",style:{color:"red"}});return r.appendChild(t),!1}}module.exports={handleSplitMessage:handleSplitMessage};
