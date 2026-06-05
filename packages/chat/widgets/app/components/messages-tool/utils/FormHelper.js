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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class FormHelper{static createFieldInfo(e,t,l,n,o={}){let{fieldLabelStyle:i={fontSize:"1.2em"},fieldInfoStyle:s={color:"#666",fontStyle:"italic"},showMoreText:r="Show more...",showLessText:a="Show less..."}=o;var o=e.createDiv({style:{display:"flex",flexDirection:"column",gap:"5px"}}),t=e.createDiv({html:`<strong>${t}</strong>`,style:{...i}}),p=e.createDiv({style:{}}),l=e.createSpan({text:l,style:{...s,marginRight:"5px"}});let d=e.createSpan({text:n,style:{...s,display:"none"}}),c=e.createA({text:r,href:"#",style:{color:"#0366d6",cursor:"pointer",fontSize:"12px",textDecoration:"none",display:n?null:"none"},onclick:e=>{e.preventDefault(),this.toggleFieldInfo(d,c,r,a)}});return p.appendChild(l),p.appendChild(d),p.appendChild(c),o.appendChild(t),o.appendChild(p),o}static toggleFieldInfo(e,t,l,n){"none"===e.style.display?(e.style.display="inline",t.textContent=n):(e.style.display="none",t.textContent=l)}}module.exports={FormHelper:FormHelper};
