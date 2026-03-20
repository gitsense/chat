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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderDiffViewSelector(e){let{currentViewType:o="side-by-side",onViewTypeChange:r}=e,n=DomUtils.h.createDiv({cls:"diff-view-selector",style:{display:"flex",gap:"10px",marginBottom:"15px"}});return[{id:"side-by-side",label:"Side by Side",icon:"⇄"},{id:"unified",label:"Unified",icon:"≡"}].forEach(e=>{let i=e.id===o,t=DomUtils.h.createLink({cls:"view-type-button "+(i?"active":""),style:{display:"flex",alignItems:"center",gap:"5px",color:i?"black":"gray",cursor:"pointer",fontSize:"13px",transition:"background-color 0.2s, color 0.2s"},onclick:()=>{r&&!i&&r(e.id)}});var l=DomUtils.h.createSpan({text:e.icon,style:{fontSize:"14px",fontWeight:"bold"}}),l=(t.appendChild(l),DomUtils.h.createSpan({text:e.label}));t.appendChild(l),t.addEventListener("mouseenter",()=>{i||(t.style.backgroundColor="#e0e0e0")}),t.addEventListener("mouseleave",()=>{i||(t.style.backgroundColor="#f0f0f0")}),n.appendChild(t)}),n}module.exports={renderDiffViewSelector:renderDiffViewSelector};
