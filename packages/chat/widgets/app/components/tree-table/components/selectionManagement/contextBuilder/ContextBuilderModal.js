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

let hljs=require("highlight.js"),MessageUtils=require("@gitsense/gsc-utils").MessageUtils,ContextBuilderTable=require("./ContextBuilderTable").ContextBuilderTable,createContentLoader=require("./ContentLoader").createContentLoader,FilterManager=require("./filters/FilterManager").FilterManager,FilterState=require("./filters/FilterState").FilterState,filterConfig=require("./filters/config/filterConfig").filterConfig,MetadataFilter=require("./filters/types/metadata/MetadataFilter").MetadataFilter,LanguageFilter=require("./filters/types/language/LanguageFilter").LanguageFilter,LanguageFilterLogic=require("./filters/types/language/LanguageFilterLogic").LanguageFilterLogic,createMetadataInsightsModal=require("./MetadataInsightsModal").createMetadataInsightsModal,createModalControls=require("./ModalControls").createModalControls,createModalFooter=require("./ModalFooter").createModalFooter,{formatTokens,formatOverviewTable}=require("../../../utils/formatterUtils"),{h,createMarkdownRenderer,Dropdown}=require("../../../Dependencies"),formatBytes=require("../../../utils/formatterUtils").formatBytes;function createContextBuilderModal({state:i,chatApi:d,saveCurrentSelection:c,batchChatsSize:e=25}){if(!d||!d.search||"function"!=typeof d.search)throw new Error("chaApi not defined or no chatApi search defined or chatApi search is not a function");let u=document.createElement("div");u.className="context-builder-modal",u.setAttribute("role","dialog"),u.setAttribute("aria-modal","true"),u.setAttribute("aria-labelledby","modal-title"),u.style.display="none";u.innerHTML=`
    <div class="modal-header">
      <h2 id="modal-title" class="modal-title">Context Builder</h2>
      <button class="close-button" aria-label="Close modal">&times;</button>
    </div>

    <div class="modal-controls"> <!-- Row 1: Controls and Statistics -->
      <div class="progress-container">
        <div class="progress-bar" style="width: 0%"></div>
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

    <!-- New Metadata Filter Section -->
    <div class="modal-metadata-filter-section">
        <div class="metadata-filter-header">
             <div class="metadata-filter-title">
                <h4>Metadata Filter &amp; Insights</h4>
             </div>
             <div class="metadata-filter-actions">
                 <a href="#" class="reset-metadata-filter-link">Reset</a>
             </div>
        </div>
        <div class="metadata-filter-controls">
           <div class="metadata-analyzer-select"></div> <!-- Container for the custom Dropdown -->
           <a href="#" class="add-metadata-condition-link">+Add Metadata Filter Rule</a>
        </div>
        <div class="metadata-filter-rules-container">
            <!-- Template for a single metadata filter condition row (initially hidden) -->
            <div class="metadata-filter-rule-template" style="display: none;">
                <select class="metadata-field-select"></select>
                <select class="metadata-operator-select"></select>
                <div class="metadata-value-input-area">
                    <!-- Input element(s) or dropdown will be added here dynamically -->
                </div>
                <span class="metadata-value-type-indicator"></span>
                <a href="#" class="fetch-metadata-values-link">Fetch Values</a>
                <button class="remove-metadata-condition-button">&times;</button>
            </div>
        </div>
        <!-- Container for the metadata query preview -->
        <!-- Hiding to reduce current scope 
            <div class="metadata-query-preview"></div>
        -->
    </div>

    <!-- Row 2: Filter Sidebar -->
    <div class="modal-body">
      <div class="context-builder-table-container"></div>
      <!-- Left Sidebar for Filters -->
      <div class="modal-filter-sidebar">
        <div class="filter-section path-filter-section" style="border-top:0px;">
          <!-- Path filter content will go here -->
        </div>
        <div class="filter-section language-filter-section" style="border-top:0px;min-height:35%">
          <!-- Language filter content will go here -->
        </div>
        <div class="filter-section keyword-filter-section" style="min-height:35%">
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
  `,document.body.appendChild(u);var t=u.querySelector(".close-button");u.querySelector(".modal-search-and-filter-stats");let a=u.querySelector(".modal-search-and-filter-message");var r=createMarkdownRenderer(hljs);let h="review",f=[],g="file content",m="imported",v=!0,p=!0,w=!1,y=null;let b=null,l=null,o=500,n=new ContextBuilderTable({container:u.querySelector(".context-builder-table-container"),onItemSelectionChange:function(e){E();n.getSelectedItems();let t=n.getSelectedTotalSize(),a=e.length,r=n.allItems.length,i=n.getSelectedTotalTokens();0===e.length?(M.disableLoadButton(),M.disableAiButton()):(M.enableLoadButton(),M.enableAiButton());M.updateLoadButtonText(a,r,i,t)},onItemNameClick:function(e){},md:r,getContent:async e=>{if("file content"!==g)throw new Error("Unsupported content type "+g);e=(await d.getGitBlobChatMessagesByChatIds([e],"imported"!==m))[e]?.message||{};return{content:e.content||"No content available",metadata:e.meta||{}}}}),C=createModalControls({container:u,onMetadataToggle:()=>{}}),S=createContentLoader({controls:C,controls:C,progress:C.progress,chatApi:d,batchSize:e}),M=createModalFooter({container:u,contextBuilderTable:n,onCancel:B,onLoadFullContent:function(){var e;"review"===h&&(h="full-loading",T(),q(),0===(e=n.getSelectedItems()).length?(console.warn("No items selected for full content loading."),h="review",T(),q()):S.loadContent(e,g,m,R,x))},onSave:function(e,t){let{hideErrorMessage:a,showErrorMessage:r,disableSaveButton:i,enableSaveButton:l,updateSaveButtonText:o,getSaveButtonText:n}=M,s=n(),d=(i(),a(),o("Saving..."),c(e,t,!0));M.clearContextNameInput(),l(),d.success?(o("Saved"),setTimeout(()=>{o(s)},1500)):r(d.error)},onAdd:async function(e,t){B(),y&&"function"==typeof y?y(e,t):onclickAddDefault&&"function"==typeof onclickAddDefault&&onclickAddDefault(e,t)},onAskAI:async function(){var e=n.getSelectedItems();var t;0===e.length?(M.showErrorMessage("Please select items to Ask AI about."),setTimeout(()=>M.hideErrorMessage(),3e3)):({tableString:e,estimatedTokens:t}=formatOverviewTable(e),5e4<t?M.showErrorMessage(`Context is too large (~${formatTokens(t)} tokens). Please select fewer items.`):(t=await d.createAskAIChat(e),b&&"function"==typeof b&&b(t)))}});r={search:u.querySelector(".search-input-wrapper"),path:u.querySelector(".path-filter-section"),language:u.querySelector(".language-filter-section"),keywords:u.querySelector(".keyword-filter-section"),metadata:u.querySelector(".modal-metadata-filter-section")};let I=new FilterManager({contextBuilderTable:n,filterUIContainers:r,chatApi:d,onSearchExecute:async function(t){N();let a=I.activeFilters.find(e=>"search"===e.id)?.ui;if(a)if(a.setSearchInProgress(!0),t){var r=[...new Set(f.map(e=>e.repo?.fullName).filter(Boolean))],r=0<r.length?"repo:"+r.join(","):"";let e="";f.length<100&&(i=f.map(e=>e.id),e="chat-id:"+i.join(","));var i=(`profile:context-builder-search-filter ${r} ${e} `+t).trim().replace(/\s+/g," ");try{var l=await d.search(i),o=l?.results?.messages||[],n=l?.totalCounts?.messages||0,s=o.map(e=>e.messages_chat_id);500<n&&D(`Search returned ${n} matches. Displaying the first 500. Consider refining your query for more focused results.`),a.setMatchingItemIds(s),I.handleFilterChange(),L()}catch(e){D("Search failed: "+(e.message||"Unknown error"));let t=I.activeFilters.find(e=>"search"===e.id)?.ui;t&&t.setMatchingItemIds([]),I.handleFilterChange(),L()}finally{let e=I.activeFilters.find(e=>"search"===e.id)?.ui;e&&e.setSearchInProgress(!1)}}else a.setMatchingItemIds(null),I.handleFilterChange(),L(),a.setSearchInProgress(!1);else console.error("SearchFilter UI instance not found.")}}),s=new MetadataFilter({container:u.querySelector(".modal-metadata-filter-section"),chatApi:d,contextBuilderTable:n,onFilterChange:I.handleFilterChange.bind(I),onShowInsightsModal:function(e){F.show(e)}}),F=createMetadataInsightsModal({chatApi:d,contextBuilderTable:n,metadataSearch:s.metadataSearch,onReplaceFilterRules:function(e){s&&"function"==typeof s.setRulesFromInsights?s.setRulesFromInsights(e):console.error("ContextBuilderModal: MetadataFilter instance or setRulesFromInsights method not available.")}});function A(e,t="file content",a="imported",r="review",i={}){var{showCopy:i=!0,showSave:l=!0,showAdd:o=!0,onclickAddDefault:n,onclickAdd:s,onAskAICreateChat:d}=i;if(!e||0===e.length)throw new Error("ContextBuilderModal.show: No items defined or provided");if(!["file content","overview"].includes(t))throw new Error("ContextBuilderModal.show: Invalid type "+t);if(!["imported","working directory","short","long"].includes(a))throw new Error("ContextBuilderModal.show: Invalid option "+a);if(!["review","full-loading","full-loaded"].includes(r))throw new Error("ContextBuilderModal.show: Invalid modal stage "+r);f=e,g=t,m=a,h=r,v=i,p=l,w=o,onclickAddDefault=n,b=d,y=s,L(),T(),C.reset(),u.style.display="flex",q(),S.loadContent(f,"review::"+g,"review::"+m,k,x)}function k(e){n.loadItems(e,h,()=>{L()}),I.initialize(e,E,s),L(),T(),q()}function x(e,t){}function R(e){n.loadItems(e,h,()=>{L()}),h="full-loaded",T(),q(),E()}function B(){u.style.display="none",S.stopLoading(),h="review",q(),M.hideErrorMessage(),T();var e=u.querySelector(".filter-stats-display");e&&(e.textContent=""),N(),l&&(clearTimeout(l),l=null),n.clear(),M.disableLoadButton(),M.disableAiButton(),s.reset()}function T(){var e=n.allItems,t=e.length,a=e.reduce((e,t)=>e+(t.tokenCount||0),0),e=e.reduce((e,t)=>e+(t.size||0),0);"full-loaded"===h&&M.updateAddButtonText(t,a,e),M.updateVisibility(h,{showAdd:w})}function q(){I.setFiltersDisabled("review"!==h),s.setDisabled("review"!==h)}function L(){var e,t,a,r,i,l=u.querySelector(".filter-stats-display");l&&(a=(i=n.allItems).filter(e=>e.row&&"none"!==e.row.style.display),e=n.getSelectedItems(),t=i.length,a=a.length,e.length,(r=(r=I.activeFilters.find(e=>"search"===e.id)?.ui)?r.getState():{}).matchingItemIds&&r.matchingItemIds.length,r.searchTerm&&r.searchTerm.length,i.reduce((e,t)=>e+(t.tokenCount||0),0),e.reduce((e,t)=>e+(t.tokenCount||0),0),r=formatOverviewTable(e).estimatedTokens,i=e.filter(e=>e.purpose).length,l.innerHTML=`Showing ${a} of ${t} items`,0===e.length?M.updateAskAiButtonText("Ask AI"):(l=1===e.length?"":"s",M.updateAskAiButtonText(`Ask AI (${e.length} item${l}, ${i} analyzed, ~${formatTokens(r)} tokens)`)))}function E(){l&&clearTimeout(l),l=setTimeout(()=>{L()},o)}function D(e){a&&(a.textContent=e,a.style.display="block")}function N(){a&&(a.style.display="none")}return T(),t.addEventListener("click",B),{show:A,getContextBuilderTable:function(){return n},hide:B,loadFromNodeIds:function(e,t=0,r="imported"){if(e&&0!==e.length){let a=[];e.forEach(e=>{var t=i.findNodeById(e);t?a.push(t):console.warn(`Node with ID ${e} not found`)}),0===a.length?console.warn("No valid nodes found for the provided IDs"):A(a,"file content",r)}else console.warn("No node IDs provided to context builder")},element:u}}module.exports={createContextBuilderModal:createContextBuilderModal};
