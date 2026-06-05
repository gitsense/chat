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

let addOrUpdateLoadedSelection=require("./loaded/loadedStorage").addOrUpdateLoadedSelection,formatSelectedItemsInfo=require("../../utils/formatterUtils").formatSelectedItemsInfo,{ContextUtils,FormatterUtils}=require("@gitsense/gsc-utils"),PromptBox=require("../../Dependencies").PromptBox,createContentLoader=require("./contextBuilder/ContentLoader").createContentLoader;function createSelectionInfoRow({state:i,contextBuilderModal:o,chatApi:l,batchChatsSize:a=25,onAddContext:d}){var e=document.createElement("div"),t=(e.className="selection-info-row",document.createElement("div"));t.className="selection-info-container";let n=document.createElement("div");n.className="selection-info",n.textContent="No items selected",t.appendChild(n);var s=document.createElement("div");s.className="selection-button-container";let c=document.createElement("button"),r=(c.className="action-button quick-add-button",c.textContent="Add",c.setAttribute("aria-label","Add selected items directly"),s.appendChild(c),document.createElement("button"));function p(){var{selectedItems:e,html:t}=formatSelectedItemsInfo(i.getSelectedNodes(),i.selectionOptions.selectedType,i.selectionOptions.selectedOption);return n.innerHTML=t,c.disabled=0===e.length,r.disabled=0===e.length,e}return r.className="action-button review-button",r.textContent="Review",r.setAttribute("aria-label","Review selected items"),s.appendChild(r),e.appendChild(t),e.appendChild(s),c.addEventListener("click",async()=>{let s=i.getSelectedNodes().filter(e=>"git-blob"===e.type);if(0!==s.length){let n=new PromptBox({title:"Loading Context",width:"500px",showCloseButton:!1,closeOnOverlayClick:!1});n.show({content:"Initializing..."});var e={updateStats:e=>{var{loadedCount:e,totalItems:t,totalTokens:o}=e,e=`<div style="line-height:1.7"><span style='font-size:16px'>Loading context...</span><br><strong>${e} of ${t}</strong> items loaded (~${FormatterUtils.formatTokens(o)} tokens).</div>`;n.show({content:e,isHtmlContent:!0})},progress:{set:()=>{}}};let t=createContentLoader({controls:e,chatApi:{getGitBlobChatMessagesByChatIds:async(e,t)=>l.getGitBlobChatMessagesByChatIds(e,t)},batchSize:a});try{await new Promise((o,e)=>{t.loadContent(s,i.selectionOptions.selectedType,i.selectionOptions.selectedOption,e=>{var t=ContextUtils.formatContextContent(e,i.selectionOptions.selectedType,i.selectionOptions.selectedOption);d(t,e),o()},(e,t)=>{})}),n.show({content:'<h3 style="margin-bottom:10px;">Success!</h3><p>Context added to chat.</p>',isHtmlContent:!0}),setTimeout(()=>n.hide(),1500)}catch(e){console.error("Quick Add Error:",e),n.show({content:"<strong>Error:</strong><br>"+e.message,isHtmlContent:!0})}}}),r.addEventListener("click",()=>{var e={type:i.selectionOptions.selectedType,option:i.selectionOptions.selectedOption},t=p();0<t.length&&o.show(t,e.type,e.option,"review",{onclickAddDefault:(e,t)=>{d(e,t)}})}),{element:e,update:p}}module.exports={createSelectionInfoRow:createSelectionInfoRow};
