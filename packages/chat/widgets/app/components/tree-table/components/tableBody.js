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

let sortKidsCriteria=require("../constants").sortKidsCriteria,createRow=require("./row/tableRow").createRow,{groupNodesByLatestTimestamp,sortNodes,sortNodesByLatestChild,sortNodesByOrderWeight}=require("../utils/treeUtils");function createTableBody(t){let{data:e,currentPage:r,rowsPerPage:o,decorator:d,handlers:a,columns:s,tableBodyCellStyle:i={},visualDayBreaks:l=!0,sortRootBy:n="updated_at",sortRootOrder:c="desc"}=t,p=document.createElement("tbody"),u=e.filter(e=>0===e.parent_id);var t=u.filter(e=>"git-repos"===e.type),y=u.filter(e=>"git-repos"!==e.type);let h;h=("order_weight"===n?sortNodesByOrderWeight:sortNodesByLatestChild)(y,c);y=(r-1)*o,t=(u=[...t,...h]).slice(y,y+o);function g(t,r=0,e=null){var o=createRow({node:t,level:r,decorator:d,handlers:a,parentId:e,columns:s,tableBodyCellStyle:i,isExpanded:a.state.isNodeExpanded(t.id)});e&&!a.state.isNodeExpanded(e)&&o.classList.add("hidden"),p.appendChild(o),t.kids&&0<t.kids.length&&a.state.isNodeExpanded(t.id)&&sortNodes([...t.kids],sortKidsCriteria).forEach(e=>g(e,r+1,t.id))}if(l){var m,f,B,N,y=groupNodesByLatestTimestamp(t);let e=!1;for([m,f]of Object.entries(y))0<f.length&&(e?((B=document.createElement("tr")).className="group-separator",(N=document.createElement("td")).colSpan=s.filter(e=>e.visible).length,N.textContent=m,N.style.paddingTop="40px",B.appendChild(N),p.appendChild(B),f.forEach(e=>g(e))):(e=!0,f.forEach(e=>g(e))))}else t.forEach(e=>g(e));return p}module.exports={createTableBody:createTableBody};
