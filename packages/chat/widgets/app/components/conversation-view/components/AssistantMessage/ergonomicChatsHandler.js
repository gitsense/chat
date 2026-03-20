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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;async function handleErgonomicChats(e,t,n,o){return"ergonomic-chats"===e.type&&!!t&&(e=!1,e=processTableOfContents(t)||!1,processTryItNowInstructions(t)||e)}function processTableOfContents(e){let o=DomUtils.h;var t="[table-of-contents-placeholder]";let n=null;for(var r,i=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null,!1);r=i.nextNode();)if(r.textContent.includes(t)){n=r;break}if(!n)return!1;e=e.querySelectorAll("h3");if(0===e.length)return n.textContent=n.textContent.replace(t,""),!1;let l=[];e.forEach((e,t)=>{var n;e.textContent.match(/^\d/)&&(e.id||(n=e.textContent.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),e.id=`section-${n}-`+t),l.push({element:e,level:parseInt(e.tagName.charAt(1)),text:e.textContent,id:e.id}))});e=o.createDiv({});let a=o.createUl({style:{margin:"0",paddingLeft:"0",listStyleType:"none"}});l.forEach(t=>{var e=o.createLi({style:{marginBottom:"5px"}}),n=o.createLink({text:t.text,href:"#"+t.id,style:{textDecoration:"none"},onclick:e=>{e.preventDefault();e=document.getElementById(t.id);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}});e.appendChild(n),a.appendChild(e)}),e.appendChild(a);var s,c,d=n.parentNode;return n.textContent.trim()===t?d.parentNode.replaceChild(e,d):2===(c=n.textContent.split(t)).length&&(s=document.createTextNode(c[0]),c=document.createTextNode(c[1]),d.insertBefore(s,n),d.insertBefore(e,n),d.insertBefore(c,n),d.removeChild(n)),!0}function processTryItNowInstructions(e){let r=DomUtils.h;e=e.querySelectorAll("p");let i=!1;return e.forEach(e=>{if("Try it now:"===e.innerText.trim()){var o=e.nextElementSibling;if(o&&"OL"===o.tagName){let t=r.createDiv({style:{display:"none",marginTop:"10px",marginBottom:"20px",padding:"15px",backgroundColor:"#f8f9fa",border:"1px solid #e9ecef",borderRadius:"4px"}}),n=(e.parentNode.insertBefore(t,e),t.appendChild(e),t.appendChild(o),r.createLink({text:"Show instructions",href:"#",style:{textDecoration:"none",fontWeight:"bold"},onclick:e=>{e.preventDefault();e="none"===t.style.display;t.style.display=e?"block":"none",n.textContent=e?"Hide instructions":"Show instructions"}}));t.parentNode.insertBefore(n,t),i=!0}}}),i}module.exports={handleErgonomicChats:handleErgonomicChats};
