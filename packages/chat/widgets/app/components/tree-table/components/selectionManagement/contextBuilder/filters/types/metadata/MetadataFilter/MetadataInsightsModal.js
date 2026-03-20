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

let FilterTable=require("./filters/FilterTable").FilterTable,buildFullMetaSearchQueryFromInsights=require("./filters/types/metadata/metadataFilterUtils").buildFullMetaSearchQueryFromInsights;function createMetadataInsightsModal({chatApi:s,contextBuilderTable:r,onReplaceFilterRules:t}){let u=new Map,n=document.createElement("div"),d=(n.className="metadata-insights-modal-backdrop",document.createElement("div")),p=(d.className="metadata-insights-modal",d.setAttribute("role","dialog"),d.setAttribute("aria-modal","true"),d.setAttribute("aria-labelledby","insights-modal-title"),d.style.display="none",d.innerHTML=`
        <div class="modal-header">
            <h2 id="insights-modal-title" class="modal-title">Metadata Insights</h2>
            <button class="close-button" aria-label="Close insights modal">&times;</button>
        </div>
        <div class="modal-body">
            <div class="insights-content-area"></div>
        </div>
        <div class="modal-footer" style="justify-content:right;">
            <button class="secondary-button insights-replace-filter-button insights-replace-filter-button-disabled" disabled>Generate Filter Query</button>
        </div>
    `,d.querySelector(".insights-content-area")),o=void(document.body.appendChild(d),new Map),i=d.querySelector(".insights-replace-filter-button");var e=d.querySelector(".close-button");function a(){u.clear(),n.parentElement&&(p.classList.remove("insights-grid-cols-2","insights-grid-cols-3"),p.innerHTML="",document.body.removeChild(n)),d.style.display="none",h()}function h(){let e=!1;for(var[t,{selectedIds:a}]of u.entries())if(a&&0<a.length){e=!0;break}e?(i.classList.remove("secondary-button","insights-replace-filter-button-disabled"),i.classList.add("primary-button"),i.disabled=!1):(i.classList.remove("primary-button"),i.classList.add("secondary-button","insights-replace-filter-button-disabled"),i.disabled=!0)}return n.addEventListener("click",e=>{e.target===n&&a()}),e.addEventListener("click",a),i.addEventListener("click",function(){let n=[];for(let[e,{analyzerId:a,field:i,selectedIds:l,joinOperator:s,dataType:r}]of u.entries())if(l&&0<l.length){let e="is",t;var d;"array"===r&&1<l.length?(e="includes",d="all"===s?"&&":"||",t='"'+l.join(d)+'"',n.push({analyzerId:a,field:i,value:t,dataType:r,operator:e})):l.forEach(e=>{n.push({analyzerId:a,field:i,value:e,dataType:r,operator:"is"})})}{var e;0<n.length&&"function"==typeof t?(e=buildFullMetaSearchQueryFromInsights(n))?(t(e),a()):console.error("Failed to generate metadata search query from selected insights."):console.warn("No insights selected or onReplaceFilterRules callback not provided.")}}),{show:async function({analyzerSchemas:e}){p.innerHTML="",u.clear();var t=(e=>{var t,a,i=[],l=new Set;for([t,a]of e.entries())if(a&&a.properties)for(var s in a.properties){var r=a.properties[s].type,n=t+"|"+s;l.has(n)||(l.add(n),i.push({analyzerId:t,fieldName:s,dataType:r}))}return i})(o=e),a=t.length;let i,l,c=(a<=4?(i="repeat(2, 1fr)",p.classList.add("insights-grid-cols-2"),p.classList.remove("insights-grid-cols-3")):(i="repeat(3, 1fr)",p.classList.add("insights-grid-cols-3"),p.classList.remove("insights-grid-cols-2")),l=a<=2?"1fr":2<a&&a<=4?"repeat(2, 1fr)":"repeat(auto-fill, calc(50% - 15px))",p.style.display="grid",p.style.gridTemplateColumns=i,p.style.gridTemplateRows=l,p.style.gap="15px",p.style.overflowY="auto",new(require("./utils/MetadataSearch"))(s,r,{}));c.setAnalyzerSchemas(e),t.forEach(async t=>{let{analyzerId:a,fieldName:i,dataType:l}=t;var t=document.createElement("div"),e=(t.className="insights-table-wrapper",p.appendChild(t),`
                <div style="padding-bottom: 5px;">
                    <div style="font-weight: bold;">${i}</div>
                    <div style="font-size: 0.8em; color: #888;">Analyzer: ${a}</div>
                </div>
            `);t.insertAdjacentHTML("beforeend",e);let s=document.createElement("p");s.textContent="Loading insights...",s.style.textAlign="center",s.style.padding="20px",t.appendChild(s);try{var r,n,d=await c.fetchDistinctValues(a,i,(e,t,a)=>{s.textContent=`Loading insights for "${i}"... (${a} unique values)`}),o=(s.parentElement&&t.removeChild(s),[]);for([r,n]of d.entries())o.push({id:String(r),name:String(null===r||""===r?"--NULL/EMPTY--":r),count:n});new FilterTable({container:t,data:o,nameColumnHeader:"Value",showMetadataType:!0,dataType:l,sortColumn:"count",sortDirection:"desc",onSelectionChange:e=>{var t=a+"|"+i;u.set(t,{analyzerId:a,field:i,selectedIds:e.selectedIds,joinOperator:e.joinOperator,dataType:l}),h()},inputPlaceholder:`Filter ${i} values...`})}catch(e){console.error(`Error loading insights for "${i}" (analyzer: ${a}):`,e.message),s.textContent="Failed to load insights: "+e.message,s.style.color="red",s.style.fontWeight="bold",s.parentElement||t.appendChild(s)}}),document.body.appendChild(n),d.style.display="flex",h()},hide:a,element:d}}module.exports={createMetadataInsightsModal:createMetadataInsightsModal};
