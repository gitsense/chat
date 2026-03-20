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

let FilterTable=require("./filters/FilterTable").FilterTable,buildFullMetaSearchQueryFromInsights=require("./filters/types/metadata/metadataFilterUtils").buildFullMetaSearchQueryFromInsights;function createMetadataInsightsModal({chatApi:s,contextBuilderTable:r,onReplaceFilterRules:t}){let d=new Map,o=null,c=document.createElement("div"),p=(c.className="metadata-insights-modal-backdrop",document.createElement("div")),u=(p.className="metadata-insights-modal",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.setAttribute("aria-labelledby","insights-modal-title"),p.style.display="none",p.innerHTML=`
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
    `,p.querySelector(".insights-content-area")),l=(document.body.appendChild(p),p.querySelector(".insights-replace-filter-button"));var e=p.querySelector(".close-button");function a(){d.clear(),c.parentElement&&(u.classList.remove("insights-grid-cols-2","insights-grid-cols-3"),u.innerHTML="",document.body.removeChild(c)),p.style.display="none",h()}function h(){let e=!1;for(var[t,{selectedIds:a}]of d.entries())if(a&&0<a.length){e=!0;break}e?(l.classList.remove("secondary-button","insights-replace-filter-button-disabled"),l.classList.add("primary-button"),l.disabled=!1):(l.classList.remove("primary-button"),l.classList.add("secondary-button","insights-replace-filter-button-disabled"),l.disabled=!0)}return c.addEventListener("click",e=>{e.target===c&&a()}),e.addEventListener("click",a),l.addEventListener("click",function(){let i=[];for(let[t,{selectedIds:e,joinOperator:a,dataType:l}]of d.entries()){var s;e&&0<e.length&&("array"===l&&1<e.length?(s="all"===a?"&&":"||",i.push({field:t,value:'"'+e.join(s)+'"',dataType:l,operator:"includes"})):e.forEach(e=>{i.push({field:t,value:e,dataType:l,operator:"is"})}))}var e=i.map(e=>{let t=null;for(var[a,l]of o.entries())if(l&&l.properties&&l.properties[e.field]){t=a;break}return{...e,analyzerId:t}});0<i.length&&"function"==typeof t?(t(e),a()):console.warn("No insights selected or onReplaceFilterRules callback not provided.")}),{show:async function({analyzerSchemas:a,initialFields:e=[]}){u.innerHTML="",d.clear(),o=a;let t;e=(t=e&&0<e.length?e.map(e=>{var t=a.get(e.analyzerId)?.properties?.[e.fieldName]?.type||"any";return{analyzerId:e.analyzerId,fieldName:e.fieldName,dataType:t}}):(e=>{var t,a,l=[],i=new Set;for([t,a]of e.entries())if(a&&a.properties)for(var s in a.properties){var r=a.properties[s].type,n=t+"|"+s;i.has(n)||(i.add(n),l.push({analyzerId:t,fieldName:s,dataType:r}))}return l})(a)).length;let l,i,n=(e<=4?(l="repeat(2, 1fr)",u.classList.add("insights-grid-cols-2"),u.classList.remove("insights-grid-cols-3")):(l="repeat(3, 1fr)",u.classList.add("insights-grid-cols-3"),u.classList.remove("insights-grid-cols-2")),i=e<=2?"1fr":2<e&&e<=4?"repeat(2, 1fr)":"repeat(auto-fill, calc(50% - 15px))",u.style.display="grid",u.style.gridTemplateColumns=l,u.style.gridTemplateRows=i,u.style.gap="15px",u.style.overflowY="auto",new(require("./utils/MetadataSearch"))(s,r,{}));n.setAnalyzerSchemas(a),t.forEach(async l=>{var t=document.createElement("div");t.className="insights-table-wrapper",u.appendChild(t);let i=document.createElement("p");i.textContent=`Loading insights for "${l.fieldName}"...`,i.style.textAlign="center",i.style.padding="20px",t.appendChild(i);try{var e,a,s=await n.fetchDistinctValues(l.analyzerId,l.fieldName,(e,t,a)=>{i.textContent=`Loading insights for "${l.fieldName}"... (${a} unique values)`}),r=(t.removeChild(i),[]);for([e,a]of s.entries())r.push({id:String(e),name:String(null===e?"--NULL--":e),count:a});new FilterTable({container:t,data:r,nameColumnHeader:l.fieldName,showMetadataType:!0,dataType:l.dataType,sortColumn:"count",sortDirection:"desc",onSelectionChange:e=>{d.set(l.fieldName,{selectedIds:e.selectedIds,joinOperator:e.joinOperator,dataType:l.dataType}),h()},inputPlaceholder:`Filter ${l.fieldName} values...`})}catch(e){console.error(`Error loading insights for "${l.fieldName}" (analyzer: ${l.analyzerId}):`,e),i.textContent=`Failed to load insights for "${l.fieldName}": `+e.message,i.style.color="red",i.style.fontWeight="bold",i.parentElement||t.appendChild(i)}}),document.body.appendChild(c),p.style.display="flex",h()},hide:a,element:p}}module.exports={createMetadataInsightsModal:createMetadataInsightsModal};
