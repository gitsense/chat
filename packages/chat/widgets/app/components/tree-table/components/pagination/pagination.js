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

function createPageButton({page:e,currentPage:t,onClick:a,text:n=null,disabled:r=!1}){var c=document.createElement("button");return c.className="page-button",e===t&&c.classList.add("active"),c.textContent=n||e,(c.disabled=r)||(c.onclick=()=>a(e)),c}function createPageInfo({currentPage:e,totalPages:t,totalItems:a,itemsPerPage:n}){var r=document.createElement("span"),c=(e-1)*n+1,n=Math.min(e*n,a);return r.textContent=c+`-${n} of ${a} items (Page ${e} of ${t})`,r}function createPageSizeSelector({currentSize:a,options:e=[10,25,50,100],onSelect:t}){var n=document.createElement("div"),r=(n.className="page-size-selector",document.createElement("span"));r.textContent="",n.appendChild(r);let c=document.createElement("select");c.className="page-size-select";r=new Set([...e,a]);return Array.from(r).sort((e,t)=>e-t).forEach(e=>{var t=document.createElement("option");t.value=e,t.textContent=e,t.selected=e===a,c.appendChild(t)}),c.onchange=e=>t(Number(e.target.value)),n.appendChild(c),n}function createPageButtons({currentPage:t,totalPages:a,onClick:n}){let r=[];function e(){var e=document.createElement("span");e.className="page-ellipsis",e.textContent="...",r.push(e)}if(r.push(createPageButton({page:1,currentPage:t,onClick:n})),a<=5)for(let e=2;e<a;e++)r.push(createPageButton({page:e,currentPage:t,onClick:n}));else{3<t&&e();for(let e=Math.max(2,t-1);e<=Math.min(a-1,t+1);e++)r.push(createPageButton({page:e,currentPage:t,onClick:n}));t<a-2&&e()}return 1<a&&r.push(createPageButton({page:a,currentPage:t,onClick:n})),r}function createPagination({currentPage:e,totalPages:t,totalItems:a,itemsPerPage:n,onPageChange:r,onPageSizeChange:c}){var o=document.createElement("div"),c=(o.className="pagination-controls",createPageSizeSelector({currentSize:n,onSelect:c})),c=(o.appendChild(c),createPageInfo({currentPage:e,totalPages:t,totalItems:a,itemsPerPage:n}));o.appendChild(c);let i=document.createElement("div");i.className="pagination-buttons";createPageButtons({currentPage:e,totalPages:t,onClick:r}).forEach(e=>i.appendChild(e)),o.appendChild(i);a=createPageButton({page:e+1,currentPage:e,onClick:r,text:"Next",disabled:e===t});return o.appendChild(a),o}function updatePagination(e,t){t=createPagination(t);return e.replaceWith(t),t}module.exports={createPagination:createPagination,updatePagination:updatePagination,createPageSizeSelector:createPageSizeSelector};
