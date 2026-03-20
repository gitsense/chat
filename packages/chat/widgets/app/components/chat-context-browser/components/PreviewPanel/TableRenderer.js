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

let{VIRTUAL_NODE_IDS,VIRTUAL_NODE_TYPES}=require("../../constants"),{formatAge,formatBytes,formatTokens}=require("@gitsense/gsc-utils"),DomUtils=require("@gitsense/gsc-utils").DomUtils;function _createTwoLineCell(e,t){var o=DomUtils.h.createDiv({className:"gsc-cm-two-line-cell",style:{display:"flex",flexDirection:"column",lineHeight:"1.5",padding:"5px 3px"}});let n;"string"==typeof e?n=DomUtils.h.createSpan({text:e}):(n=DomUtils.h.createSpan()).appendChild(e);let r;return"string"==typeof t?r=DomUtils.h.createSpan({text:t}):(r=DomUtils.h.createSpan()).appendChild(t),r.style.fontSize="0.85em",r.style.color="#666",o.appendChild(n),o.appendChild(r),o}function _createOriginLink(t,e,o){return DomUtils.h.createSpan({text:e,style:{cursor:"pointer",color:"#007bff",fontWeight:"bold"},onclick:e=>{e.stopPropagation(),o(t)}})}class TableRenderer{constructor(e){this.onDrillDown=e,this.h=DomUtils.h}_getColumnConfig(){return[{id:"col2",header:"Content / Component",width:"auto",verticalAlign:"middle",renderCell:e=>e.col2},{id:"col3",header:"Source / Age",width:"150px",verticalAlign:"middle",textAlign:"right",renderCell:e=>e.col3}]}_formatContextFileRow(e){var t=e.contextFile,e=e.message,o="WORKING DIRECTORY"===t.source,[,,]=t.repo?.split("/")||["unknown","unknown"],n=(t.chatMetadata?.refContext?.refName,t.path||t.name,t.path.split("/")),n=1===n.length?"/":n.splice(0,n.length-1).join(" / "),r=_createTwoLineCell(""+t["chat id"],""),n=_createTwoLineCell(t.name,n),l=formatAge(e.created_at),t=this.h.createSpan({text:"by "+(t.author||e.role)}),e=(o&&(t.style.textDecoration="line-through",t.title="File is from the working directory and may not be committed."),t);return{col1:r,col2:n,col3:_createTwoLineCell(l,e)}}_formatTraceableCodeRow(e,t){var o=e.codeBlock,e=e.message,n="patch"===o.type,r=t.split("-").pop().toUpperCase(),t=_createOriginLink(t,r,this.onDrillDown),r=n?"Patch v"+(o.metadata?.["Target-Version"]||"N/A"):"v"+(o.header?.Version||"N/A");return{col1:_createTwoLineCell(t,`${o.language||"Unknown"} / `+r),col2:_createTwoLineCell(o.header?.Component||(n?"Code Patch":"N/A"),o.header?.Description||"No description provided."),col3:_createTwoLineCell("Msg #"+e.position,formatAge(e.created_at))}}_formatNonTraceableCodeRow(e,t){var o=e.codeBlock,e=e.message,n=o.content?o.content.substring(0,50)+"...":"Empty Content",r=t.split("-").pop().toUpperCase();return{col1:_createTwoLineCell(_createOriginLink(t,r,this.onDrillDown),"patch"===o.type?"Invalid Patch":"Code Snippet"),col2:_createTwoLineCell(o.language||"Unknown Language",n),col3:_createTwoLineCell("Msg #"+e.position,formatAge(e.created_at))}}}module.exports={TableRenderer:TableRenderer};
