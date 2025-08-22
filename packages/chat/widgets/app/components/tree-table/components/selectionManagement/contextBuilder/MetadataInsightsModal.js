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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let FilterTable=require("./filters/FilterTable").FilterTable;function createMetadataInsightsModal({onReplaceFilterRules:e,metadataSearch:d}){let c=new Map,l=document.createElement("div"),i=(l.className="metadata-insights-modal-backdrop",document.createElement("div")),u=(i.className="metadata-insights-modal",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-labelledby","insights-modal-title"),i.style.display="none",i.innerHTML=`
        <div class="modal-header">
            <h2 id="insights-modal-title" class="modal-title">Metadata Insights</h2>
            <button class="close-button" aria-label="Close insights modal">&times;</button>
        </div>
        <div class="modal-body">
            <div class="insights-content-area"></div>
        </div>
        <div class="modal-footer" style="justify-content:right;">
            <button class="secondary-button insights-replace-filter-button insights-replace-filter-button-disabled" disabled>Replace Filter Rules with Selected</button>
        </div>
    `,i.querySelector(".insights-content-area")),a=(document.body.appendChild(i),i.querySelector(".insights-replace-filter-button"));var t=i.querySelector(".close-button");function s(){c.clear(),l.parentElement&&(u.classList.remove("insights-grid-cols-2","insights-grid-cols-3"),u.innerHTML="",document.body.removeChild(l)),i.style.display="none",h()}function h(){let e=!1;for(var[t,{selectedIds:s}]of c.entries())if(s&&0<s.length){e=!0;break}e?(a.classList.remove("secondary-button","insights-replace-filter-button-disabled"),a.classList.add("primary-button"),a.disabled=!1):(a.classList.remove("primary-button"),a.classList.add("secondary-button","insights-replace-filter-button-disabled"),a.disabled=!0)}return l.addEventListener("click",e=>{e.target===l&&s()}),t.addEventListener("click",s),a.addEventListener("click",function(){let a=[];for(let[t,{selectedIds:e,dataType:s}]of c.entries())e&&0<e.length&&e.forEach(e=>{a.push({field:t,value:e,dataType:s})});0<a.length&&"function"==typeof e?(e(a),s()):console.warn("No insights selected or onReplaceFilterRules callback not provided.")}),{show:function({analyzerId:r,analyzerSchema:o,fields:e}){u.innerHTML="";var t=e.length;let s,a;t<=4?(s="repeat(2, 1fr)",u.classList.add("insights-grid-cols-2"),u.classList.remove("insights-grid-cols-3")):(s="repeat(3, 1fr)",u.classList.add("insights-grid-cols-3"),u.classList.remove("insights-grid-cols-2")),a=t<=2?"1fr":2<t&&t<=4?"repeat(2, 1fr)":"repeat(auto-fill, calc(50% - 15px))",u.style.display="grid",u.style.gridTemplateColumns=s,u.style.gridTemplateRows=a,u.style.gap="15px",u.style.overflowY="auto",e.forEach(async a=>{var t=document.createElement("div");t.className="insights-table-wrapper",u.appendChild(t);let l=document.createElement("p");l.textContent=`Loading insights for "${a}"...`,l.style.textAlign="center",l.style.padding="20px",t.appendChild(l);try{var e,s,i=await d.fetchDistinctValues(r,a,(e,t,s)=>{l.textContent=`Loading insights for "${a}"... (${s} unique values)`}),n=(t.removeChild(l),[]);for([e,s]of i.entries())n.push({id:String(e),name:String(null===e?"--NULL--":e),count:s});new FilterTable({container:t,data:n,nameColumnHeader:a,sortColumn:"count",sortDirection:"desc",onSelectionChange:e=>{c.set(a,{selectedIds:e,dataType:o.properties[a]?.type}),h()},inputPlaceholder:`Filter ${a} values...`})}catch(e){console.error(`Error loading insights for "${a}":`,e),l.textContent=`Failed to load insights for "${a}": `+e.message,l.style.color="red",l.style.fontWeight="bold",l.parentElement||t.appendChild(l)}}),document.body.appendChild(l),i.style.display="flex",h()},hide:s,element:i}}module.exports={createMetadataInsightsModal:createMetadataInsightsModal};
