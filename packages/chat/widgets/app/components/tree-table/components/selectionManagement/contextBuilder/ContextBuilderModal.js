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

let hljs=require("highlight.js"),{FormatterUtils,MessageUtils,MarkdownUtils}=require("@gitsense/gsc-utils"),ContextBuilderTable=require("./ContextBuilderTable").ContextBuilderTable,createContentLoader=require("./ContentLoader").createContentLoader,FilterManager=require("./filters/FilterManager").FilterManager,FilterState=require("./filters/FilterState").FilterState,{getAnalyzerSchemas,handleProgrammaticInsightsLoad,buildFullMetaSearchQueryFromInsights}=require("./filters/types/metadata/metadataFilterUtils"),LanguageFilter=require("./filters/types/language/LanguageFilter").LanguageFilter,LanguageFilterLogic=require("./filters/types/language/LanguageFilterLogic").LanguageFilterLogic,formatOverviewTable=require("../../../utils/formatterUtils").formatOverviewTable,createMetadataInsightsModal=require("./MetadataInsightsModal").createMetadataInsightsModal,createModalControls=require("./ModalControls").createModalControls,createModalFooter=require("./ModalFooter").createModalFooter,copyToClipboard=require("../../../utils/clipboard").copyToClipboard,{h,Dropdown,ConfirmationBox,PromptBox}=require("../../../Dependencies"),STATS_UPDATE_DELAY=500,SIZE_WARNING_THRESHOLD_BYTES=512e3;function createContextBuilderModal({state:N,chatApi:d,saveCurrentSelection:O,batchChatsSize:z=25,showAdd:h=!0,showSave:g=!0,showCopy:p=!0}){if(!d||!d.search||"function"!=typeof d.search)throw new Error("chatApi not defined or no chatApi search defined or chatApi search is not a function");let m=document.createElement("div");m.className="context-builder-modal",m.setAttribute("role","dialog"),m.setAttribute("aria-modal","true"),m.setAttribute("aria-labelledby","modal-title"),m.style.display="none";m.innerHTML=`
    <div class="modal-header">
      <h2 id="modal-title" class="modal-title">Context Builder</h2>
      <button class="close-button" aria-label="Close modal">&times;</button>
    </div>

    <div class="modal-controls"> <!-- Row 1: Controls and Statistics -->
      <div class="progress-container">
        <div class="progress-bar" style="width: 0%"></div>
      </div>
    </div>

    <!-- New Metadata Filter Section - Hide this section for now -->
    <div class="modal-metadata-filter-section" style="display:none"">
        <div class="metadata-filter-header" style="display:none">
             <div class="metadata-filter-title">
                <h4>Metadata Filter</h4>
             </div>
        </div>
        <div class="metadata-filter-controls">
           <div class="metadata-filter-input-container" style="display:contents">
               <textarea class="metadata-filter-textarea" placeholder="Enter metadata search query (e.g., profile:meta-search full-meta:analyzer-id|field|type=value)" style="height:34px;width:100%;padding:5px 10px;border-color:#ccc;border-radius:4px;"></textarea>
               <button class="metadata-filter-apply-button secondary-button" disabled>Apply</button>
           </div>
        </div>
    </div>

    <!-- Search Input and Filter Statistics Container -->
    <div class="modal-search-and-filter-stats">
      <div class="search-input-wrapper"></div> <!-- SearchFilter will render here -->
      <div class="filter-stats-display">
      </div>
    </div>
    <!-- Container for Search and Filter Error Messages -->
    <div class="modal-search-and-filter-message" style="display: none;">
      </div>
      <!-- Filter Statistics will be appended here by updateFilterStatsDisplay -->
    </div>

    <!-- Filter Statistics Display Above Table -->
    <div class="modal-filter-stats-above-table" style="padding:10px;border-bottom:1px solid #ccc;font-size:.9em">
      <div class="filter-stats-display-above-table"></div>
    </div>

    <!-- Row 2: Filter Sidebar -->
    <div class="modal-body">
      <div class="context-builder-table-container"></div>
      <!-- Left Sidebar for Filters -->
      <div class="modal-filter-sidebar">
        <div class="filter-section path-filter-section" style="border-top:0px;">
          <!-- Path filter content will go here -->
        </div>
        <div class="filter-section repository-filter-section" style="border-top:0px;min-height:20%">
          <!-- Repository filter content will go here -->
        </div>
        <div class="filter-section language-filter-section" style="border-top:0px;min-height:20%">
          <!-- Language filter content will go here -->
        </div>
        <div class="filter-section keyword-filter-section" style="min-height:20%">
          <!-- Keyword filter content will go here -->
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <div class="footer-left-container">
      </div>
      <div class="footer-right-container">
        <!-- Cancel, Load, Copy, Save buttons will go here -->
      </div>
    </div>
  `,document.body.appendChild(m);var $=m.querySelector(".close-button");m.querySelector(".modal-search-and-filter-stats");let t=m.querySelector(".modal-search-and-filter-message");var e=MarkdownUtils.createMarkdownRenderer(hljs);let o=new ConfirmationBox,i=new PromptBox({width:500,height:"auto",customClass:"context-builder-prompt-box"}),f="review",v=[],y="file content",w="imported",b=null;let S=null,a=null,x=null,C=null,l=new ContextBuilderTable({container:m.querySelector(".context-builder-table-container"),onItemSelectionChange:function(e){D();l.getSelectedItems();let t=l.getSelectedTotalSize(),a=e.length,o=l.allItems.length,i=l.getSelectedTotalTokens();0===e.length?(c.disableLoadButton(),c.disableOverviewButton()):(c.enableLoadButton(),c.enableOverviewButton());c.updateLoadButtonText(a,o,i,t)},onItemNameClick:function(e){},md:e,getContent:async e=>{if("file content"!==y)throw new Error("Unsupported content type "+y);e=(await d.getGitBlobChatMessagesByChatIds([e],"imported"!==w))[e]?.message||{};return{content:e.content||"No content available",metadata:e.meta||{}}},showKeywords:!0}),T=createModalControls({container:m,onMetadataToggle:()=>{}}),F=createContentLoader({controls:T,controls:T,progress:T.progress,chatApi:d,batchSize:z}),c=createModalFooter({container:m,contextBuilderTable:l,onCancel:A,onLoadFullContent:function(){if("review"===f){let e=l.getSelectedItems();var t,a;0===e.length?(console.warn("No items selected for full content loading."),f="review",L(),E()):(t=e.reduce((e,t)=>e+(t.size||0),0),a=e.reduce((e,t)=>e+(t.tokenCount||0),0),t>SIZE_WARNING_THRESHOLD_BYTES?(t=FormatterUtils.formatBytes(t),a=FormatterUtils.formatTokens(a),o.show({title:"Large Content Warning",htmlMessage:`
                    <p>The selected content contains approximately <strong>~${t}</strong> and <strong>~${a} tokens</strong>, which exceeds the recommended limit of <strong>500KB</strong>.</p>
                    <p>Loading this much content may:</p>
                    <ul style='margin-left:25px;margin-bottom:10px'>
                        <li>Significantly slow down your browser</li>
                        <li>Cause the page to become unresponsive</li>
                        <li>Take a long time to load on slower connections</li>
                    </ul>
                    <p>Consider reducing the content size by:</p>
                    <ul style='margin-left:25px;margin-bottom:10px'>
                        <li>Selecting fewer files</li>
                        <li>Using filters to narrow your selection</li>
                        <li>Loading content in smaller batches</li>
                    </ul>
                    <p>Do you want to proceed with loading this large amount of content?</p>
                `,confirmButtonText:"Proceed Anyway",cancelButtonText:"Cancel"},()=>{f="full-loading",L(),E(),s(e)})):(f="full-loading",L(),E(),s(e)))}},onSave:function(e,t){let{hideErrorMessage:a,showErrorMessage:o,disableSaveButton:i,enableSaveButton:r,updateSaveButtonText:l,getSaveButtonText:n}=c,s=n(),d=(i(),a(),l("Saving..."),O(e,t,!0));c.clearContextNameInput(),r(),d.success?(l("Saved"),setTimeout(()=>{l(s)},1500)):o(d.error)},onAdd:k,onOverviewClick:async function(){var a=l.getSelectedItems();if(0===a.length)c.showErrorMessage("Please select items to generate an overview."),setTimeout(()=>c.hideErrorMessage(),3e3);else{let{tableString:e,estimatedTokens:t}=formatOverviewTable(a);1e5<t?(a=`
                <p>The selected context contains approximately <strong>${FormatterUtils.formatTokens(t)}</strong> tokens, 
                which exceeds the recommended limit of <strong>${FormatterUtils.formatTokens(1e5)}</strong> tokens. 
                Large contexts may lead to slower responses or unexpected behavior from the AI.</p>
                <p>Consider reducing the context size by:</p>
                <ul style='margin-left:25px;margin-bottom:10px'>
                    <li>Filtering files by path patterns</li>
                    <li>Selecting specific languages</li>
                    <li>Filtering by keywords</li>
                </ul>
                <p>Do you want to proceed with this large context anyway?</p>
            `,o.show({title:"Large Context Warning",htmlMessage:a,confirmButtonText:"Proceed Anyway",cancelButtonText:"Cancel"},()=>{B(e)})):B(e)}}});e={search:m.querySelector(".search-input-wrapper"),path:m.querySelector(".path-filter-section"),repository:m.querySelector(".repository-filter-section"),language:m.querySelector(".language-filter-section"),keywords:m.querySelector(".keyword-filter-section"),metadata:m.querySelector(".modal-metadata-filter-section")};let u=new FilterManager({contextBuilderTable:l,filterUIContainers:e,chatApi:d,onSearchExecute:async function(t){M.value.trim();H();let a=u.activeFilters.find(e=>"search"===e.id)?.ui;if(a)if(a.setSearchInProgress(!0),t){var o=[...new Set(v.map(e=>e.repo?.fullName).filter(Boolean))],o=0<o.length?"repo:"+o.join(","):"";let e="";v.length<100&&(i=v.map(e=>e.id),e="chat-id:"+i.join(","));var i=(`profile:context-builder-search-filter ${o} ${e} `+t).trim().replace(/\s+/g," ");try{var r=await d.search(i),l=r?.results?.messages||[],n=r?.totalCounts?.messages||0,s=l.map(e=>e.messages_chat_id);500<n&&U(`Search returned ${n} matches. Displaying the first 500. Consider refining your query for more focused results.`),a.setMatchingItemIds(s),u.handleFilterChange(),q()}catch(e){U("Search failed: "+(e.message||"Unknown error"));let t=u.activeFilters.find(e=>"search"===e.id)?.ui;t&&t.setMatchingItemIds([]),u.handleFilterChange(),q()}finally{let e=u.activeFilters.find(e=>"search"===e.id)?.ui;e&&e.setSearchInProgress(!1)}}else a.setMatchingItemIds(null),u.handleFilterChange(),q(),a.setSearchInProgress(!1);else console.error("SearchFilter UI instance not found.")}}),M=m.querySelector(".metadata-filter-textarea"),r=m.querySelector(".metadata-filter-apply-button"),P=createMetadataInsightsModal({chatApi:d,contextBuilderTable:l,onReplaceFilterRules:function(e){e=buildFullMetaSearchQueryFromInsights(e);e&&(M.value=e,M.dispatchEvent(new Event("input")))},getAnalyzerSchemas:getAnalyzerSchemas});function n(e,t="file content",a="imported",o="review",i={}){var{showCopy:i,showSave:r,showAdd:l,onclickAddDefault:n,onclickAdd:s,onAskAi:d,initialAnalyzers:c,initialInsightsFields:u}=i;if(!e||0===e.length)throw new Error("ContextBuilderModal.show: No items defined or provided");if(!["file content","overview"].includes(t))throw new Error("ContextBuilderModal.show: Invalid type "+t);if(!["imported","working directory","short","long"].includes(a))throw new Error("ContextBuilderModal.show: Invalid option "+a);if(!["review","full-loading","full-loaded"].includes(o))throw new Error("ContextBuilderModal.show: Invalid modal stage "+o);v=e,y=t,w=a,f=o,null!=i&&(p=i),null!=r&&(g=r),null!=l&&(h=l),onclickAddDefault=n,b=s,S=d,x=c,C=u,q(),L(),T.reset(),m.style.display="flex",E(),F.loadContent(v,"review::"+y,"review::"+w,_,I)}function _(e){l.loadItems(e,f,()=>{q()}),u.initialize(e,D,M),x&&C&&0<C.length&&(handleProgrammaticInsightsLoad(d,x,C,P),x=null,C=null),q(),L(),E()}function s(e){F.loadContent(e,y,w,R,I)}function I(e,t){}function R(e){l.loadItems(e,f,()=>{q()}),f="full-loaded",L(),E(),D()}async function k(e,t){A(),b&&"function"==typeof b?b(e,t):onclickAddDefault&&"function"==typeof onclickAddDefault&&onclickAddDefault(e,t)}function B(o){i.show({title:"Context Overview",content:`
            <div style='padding-bottom:5px'>
                <p>This context overview contains the purpose and keywords for your selected items. Choose an option below:</p>
                <ul style="margin-left:20px;line-height:1.7">
                    <li><a href="#" class="overview-action-link" data-action="copy">Copy the context overview to your clipboard.</a></li>
                    <li><a href="#" class="overview-action-link" data-action="message">Add context overview as a new message.</a></li>
                    <li><a href="#" class="overview-action-link" data-action="chat">Create a new chat with the context overview.</a></li>
                </ul>
            </div>
        `,isHtmlContent:!0,width:550}),i.elements.body.querySelectorAll(".overview-action-link").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();var t=e.target.getAttribute("data-action"),a=o;switch(i.hide(),t){case"copy":(async e=>{(e=await copyToClipboard(e))?(c.showErrorMessage("Overview copied to clipboard.",!1),setTimeout(()=>c.hideErrorMessage(),3e3)):c.showErrorMessage("Failed to copy overview to clipboard.")})(a);break;case"message":(e=>{var t=l.getSelectedItems();k(e,t)})(a);break;case"chat":(async e=>{e=await d.createAskAIChat(e),S&&"function"==typeof S&&S(e)})(a);break;default:console.error("Unknown overview action: "+t)}})})}function A(){m.style.display="none",F.stopLoading(),i.hide(),o.hide(),f="review",E(),c.hideErrorMessage(),L();var e=m.querySelector(".filter-stats-display-above-table");e&&(e.textContent=""),H(),a&&(clearTimeout(a),a=null),l.clear(),c.disableLoadButton(),c.disableOverviewButton()}function L(){var e=l.allItems,t=e.length,a=e.reduce((e,t)=>e+(t.tokenCount||0),0),e=e.reduce((e,t)=>e+(t.size||0),0);"full-loaded"===f&&c.updateAddButtonText(t,a,e),c.updateVisibility(f,{showAdd:h,showCopy:p,showSave:g})}function E(){u.setFiltersDisabled("review"!==f)}function q(){var e,t,a,o,i,r=m.querySelector(".filter-stats-display-above-table");r&&(a=(i=l.allItems).filter(e=>e.row&&"none"!==e.row.style.display),e=l.getSelectedItems(),t=i.length,a=a.length,e.length,(o=(o=u.activeFilters.find(e=>"search"===e.id)?.ui)?o.getState():{}).matchingItemIds&&o.matchingItemIds.length,o.searchTerm&&o.searchTerm.length,i.reduce((e,t)=>e+(t.tokenCount||0),0),e.reduce((e,t)=>e+(t.tokenCount||0),0),o=formatOverviewTable(e).estimatedTokens,i=e.filter(e=>e.purpose).length,r.innerHTML=`Showing ${a} of ${t} items`,0===e.length?c.updateOverviewButtonText("Overview"):(r=1===e.length?"":"s",c.updateOverviewButtonText(`Overview (${e.length} item${r}, ${i} analyzed, ~${FormatterUtils.formatTokens(o)} tokens)`)))}function D(){a&&clearTimeout(a),a=setTimeout(()=>{q()},STATS_UPDATE_DELAY)}function U(e){t&&(t.textContent=e,t.style.display="block")}function H(){t&&(t.style.display="none")}return M.addEventListener("input",()=>{M.value.trim()?(r.disabled=!1,r.classList.remove("secondary-button"),r.classList.add("primary-button")):(r.disabled=!0,r.classList.remove("primary-button"),r.classList.add("secondary-button"))}),r.addEventListener("click",()=>{var e=M.value.trim();e&&u.executeMetadataSearch(e)}),L(),$.addEventListener("click",A),{show:n,getContextBuilderTable:function(){return l},hide:A,loadFromNodeIds:function(e,t=0,o="imported"){if(e&&0!==e.length){let a=[];e.forEach(e=>{var t=N.findNodeById(e);t?a.push(t):console.warn(`Node with ID ${e} not found`)}),0===a.length?console.warn("No valid nodes found for the provided IDs"):n(a,"file content",o)}else console.warn("No node IDs provided to context builder")},element:m}}module.exports={createContextBuilderModal:createContextBuilderModal};
