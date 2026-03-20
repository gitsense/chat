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

let{SearchInput,Table,Pagination}=require("../../../Dependencies"),{formatRelativeDate,renderStatus,createHeader,createGenericSummary,createFooter}=require("./utils");function renderBranches(e,t,n,r){t.innerHTML="";let a=e.meta?.owner||r.chat?.meta?.owner,i=e.meta?.name||r.chat?.meta?.name;a&&i||(e=n.included?.repositories?.[0]?.git)&&(a=e.owner,i=e.name);r=a&&i?a+" / "+i:"Unknown Repository",e=createHeader(r),t.appendChild(e),r=n.totalCounts.chats||0,createGenericSummary(r,"branches"),e=document.createElement("div");e.style.marginBottom="16px",t.appendChild(e);let o=new SearchInput(e,{placeholder:"Filter branches...",debounceMs:300,width:"100%",onFilterChange:e=>{d.setCurrentPage(1),l()}});o.render();r=document.createElement("div");t.appendChild(r);let m=new Table(r,{columns:[{id:"name",header:"Branch",width:"auto",renderCell:e=>{var t=document.createElement("div"),r=document.createElement("a");return r.href="/?chat="+e.chat_uuid,r.style.cursor="pointer",r.style.fontWeight=500,r.textContent=e.git.name,t.appendChild(r),t}},{id:"commit",header:"Commit",width:"125px",renderCell:e=>{var t=document.createElement("span"),e=e.git.commit?.timestamp;return e?t.textContent=formatRelativeDate(e):(t.textContent="Unknown",t.style.color="#6c757d"),t}},{id:"import",header:"Imported",width:"125px",renderCell:e=>{var t,r,e=e.git.import;return e?(t=e.status,r=e.startedAt?new Date(e.startedAt).getTime()/1e3:null,e=e.finishedAt?new Date(e.finishedAt).getTime()/1e3:null,renderStatus(t,r,e)):((t=document.createElement("span")).textContent="Unknown",t.style.color="#6c757d",t)}}],options:{maxBodyHeight:"auto"}});e=document.createElement("div");e.style.marginTop="15px",t.appendChild(e);let d=new Pagination(e,{currentPage:n.pagination.currentPage||1,itemsPerPage:n.pagination.resultsPerPage||25,totalItems:n.pagination.totalResults||0,onPageChange:e=>{l()},onPageSizeChange:e=>{d.setCurrentPage(1),l()}});d.render();r=createFooter('Branch data reflects the last imported commit. To add or update a branch, use the gscb tool. <a href="{{Importing Repositories with GitSense Chat Bridge (GSCB)|chat-uuid-link}}">Learn more</a>');function l(){var e=o.getValue(),t=d.getItemsPerPage(),r=d.getCurrentPage();let a=n.results;e=((e,t,r)=>(t=(r=(r-1)*t)+t,e.slice(r,t)))(a=(a=e&&""!==e.trim()?((e,t)=>{let r=t.trim().toLowerCase();return""!==r?e.filter(e=>e.git.name.toLowerCase().includes(r)):e})(n.results,e):[...n.results]).sort((e,t)=>{e=e.git.commit?.timestamp?e.git.commit.timestamp:0;return(t.git.commit?.timestamp?t.git.commit.timestamp:0)-e}),t,r);d.setTotalItems(a.length),m.updateData(e)}t.appendChild(r),l(),l()}module.exports={renderBranches:renderBranches};
