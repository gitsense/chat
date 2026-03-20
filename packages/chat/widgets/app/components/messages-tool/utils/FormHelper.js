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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class FormHelper{static createFieldInfo(e,t,l,n,o={}){let{fieldLabelStyle:i={fontSize:"1.2em"},fieldInfoStyle:s={color:"#666",fontStyle:"italic"},showMoreText:r="Show more...",showLessText:a="Show less..."}=o;var o=e.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}}),t=e.createDiv({html:`<strong>${t}</strong>`,style:{...i}}),p=e.createDiv({style:{}}),l=e.createSpan({text:l,style:{...s,marginRight:"5px"}});let d=e.createSpan({text:n,style:{...s,display:"none"}}),c=e.createA({text:r,href:"#",style:{color:"#0366d6",cursor:"pointer",fontSize:"12px",textDecoration:"none",display:n?null:"none"},onclick:e=>{e.preventDefault(),this.toggleFieldInfo(d,c,r,a)}});return p.appendChild(l),p.appendChild(d),p.appendChild(c),o.appendChild(t),o.appendChild(p),o}static toggleFieldInfo(e,t,l,n){"none"===e.style.display?(e.style.display="inline",t.textContent=n):(e.style.display="none",t.textContent=l)}}module.exports={FormHelper:FormHelper};
