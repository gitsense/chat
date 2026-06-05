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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderOverviewSection(e,t,l){let d=DomUtils.h;var a=d.createTable({style:{whiteSpace:"nowrap",width:"100%",borderCollapse:"collapse",marginTop:"15px"}}),e=(e.appendChild(a),d.createTableHead({style:{textAlign:"left"}})),i=(a.appendChild(e),d.createTableBody({})),a=(a.appendChild(i),d.createTableRow({}));e.appendChild(a),a.appendChild(d.createTableHeadCell({text:"Path",style:{width:"40%"}})),a.appendChild(d.createTableHeadCell({text:"Purpose",style:{width:"60%"}}));!function l(r,p,e=0,a=5){let n=e+a>p.length?p.length:e+a;for(let i=e;i<n;i++){let e=p[i],t=d.createTableRow({style:{backgroundColor:"white"}}),l=(r.appendChild(t),d.createTableCell({text:e.gitPath,style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}})),a=d.createTableCell({text:e.purpose,style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}});t.appendChild(l),t.appendChild(a)}if(n<p.length){let e=d.createA({text:`Show ${p.length-n} more`,href:"#",style:{display:"inline-block",fontWeight:500}}),t=d.createDiv({append:[e],style:{textAlign:"center",marginTop:"15px"}});e.onclick=e=>{e.preventDefault(),t.remove(),l(r,p,n,a)},r.appendChild(t)}}(i,t,0,5)}module.exports={render:renderOverviewSection};
