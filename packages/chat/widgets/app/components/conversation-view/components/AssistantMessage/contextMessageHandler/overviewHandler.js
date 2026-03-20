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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderOverviewSection(e,t,l){let d=DomUtils.h;var a=d.createTable({style:{whiteSpace:"nowrap",width:"100%",borderCollapse:"collapse",marginTop:"15px"}}),e=(e.appendChild(a),d.createTableHead({style:{textAlign:"left"}})),i=(a.appendChild(e),d.createTableBody({})),a=(a.appendChild(i),d.createTableRow({}));e.appendChild(a),a.appendChild(d.createTableHeadCell({text:"Path",style:{width:"40%"}})),a.appendChild(d.createTableHeadCell({text:"Purpose",style:{width:"60%"}}));!function l(r,p,e=0,a=5){let n=e+a>p.length?p.length:e+a;for(let i=e;i<n;i++){let e=p[i],t=d.createTableRow({style:{backgroundColor:"white"}}),l=(r.appendChild(t),d.createTableCell({text:e.gitPath,style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}})),a=d.createTableCell({text:e.purpose,style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}});t.appendChild(l),t.appendChild(a)}if(n<p.length){let e=d.createA({text:`Show ${p.length-n} more`,href:"#",style:{display:"inline-block",fontWeight:500}}),t=d.createDiv({append:[e],style:{textAlign:"center",marginTop:"15px"}});e.onclick=e=>{e.preventDefault(),t.remove(),l(r,p,n,a)},r.appendChild(t)}}(i,t,0,5)}module.exports={render:renderOverviewSection};
