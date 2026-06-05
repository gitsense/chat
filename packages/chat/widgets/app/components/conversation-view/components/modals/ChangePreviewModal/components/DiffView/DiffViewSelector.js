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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderDiffViewSelector(e){let{currentViewType:o="side-by-side",onViewTypeChange:r}=e,n=DomUtils.h.createDiv({cls:"diff-view-selector",style:{display:"flex",gap:"10px",marginBottom:"15px"}});return[{id:"side-by-side",label:"Side by Side",icon:"⇄"},{id:"unified",label:"Unified",icon:"≡"}].forEach(e=>{let i=e.id===o,t=DomUtils.h.createLink({cls:"view-type-button "+(i?"active":""),style:{display:"flex",alignItems:"center",gap:"5px",color:i?"black":"gray",cursor:"pointer",fontSize:"13px",transition:"background-color 0.2s, color 0.2s"},onclick:()=>{r&&!i&&r(e.id)}});var l=DomUtils.h.createSpan({text:e.icon,style:{fontSize:"14px",fontWeight:"bold"}}),l=(t.appendChild(l),DomUtils.h.createSpan({text:e.label}));t.appendChild(l),t.addEventListener("mouseenter",()=>{i||(t.style.backgroundColor="#e0e0e0")}),t.addEventListener("mouseleave",()=>{i||(t.style.backgroundColor="#f0f0f0")}),n.appendChild(t)}),n}module.exports={renderDiffViewSelector:renderDiffViewSelector};
