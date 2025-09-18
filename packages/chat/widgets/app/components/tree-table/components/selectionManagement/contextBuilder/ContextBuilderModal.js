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

let hljs=require("highlight.js"),MessageUtils=require("@gitsense/gsc-utils").MessageUtils,ContextBuilderTable=require("./ContextBuilderTable").ContextBuilderTable,createContentLoader=require("./ContentLoader").createContentLoader,FilterManager=require("./filters/FilterManager").FilterManager,FilterState=require("./filters/FilterState").FilterState,filterConfig=require("./filters/config/filterConfig").filterConfig,MetadataFilter=require("./filters/types/metadata/MetadataFilter").MetadataFilter,LanguageFilter=require("./filters/types/language/LanguageFilter").LanguageFilter,LanguageFilterLogic=require("./filters/types/language/LanguageFilterLogic").LanguageFilterLogic,createMetadataInsightsModal=require("./MetadataInsightsModal").createMetadataInsightsModal,createModalControls=require("./ModalControls").createModalControls,createModalFooter=require("./ModalFooter").createModalFooter,{formatTokens,formatOverviewTable}=require("../../../utils/formatterUtils"),{h,createMarkdownRenderer,Dropdown}=require("../../../Dependencies"),formatBytes=require("../../../utils/formatterUtils").formatBytes;function createContextBuilderModal({state:r,chatApi:d,saveCurrentSelection:c,batchChatsSize:e=25}){if(!d||!d.search||"function"!=typeof d.search)throw new Error("chaApi not defined or no chatApi search defined or chatApi search is not a function");let h=document.createElement("div");h.className="context-builder-modal",h.setAttribute("role","dialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-labelledby","modal-title"),h.style.display="none";h.innerHTML=`
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
  `,document.body.appendChild(h);var t=h.querySelector(".close-button");h.querySelector(".modal-search-and-filter-stats");let a=h.querySelector(".modal-search-and-filter-message");var i=createMarkdownRenderer(hljs);let f="review",g=[],m="file content",v="imported",p=!0,w=!0,y=!1,b=null;let C=null,l=null,R=500,S=null,I=null,o=new ContextBuilderTable({container:h.querySelector(".context-builder-table-container"),onItemSelectionChange:function(e){E();o.getSelectedItems();let t=o.getSelectedTotalSize(),a=e.length,i=o.allItems.length,r=o.getSelectedTotalTokens();0===e.length?(u.disableLoadButton(),u.disableAiButton()):(u.enableLoadButton(),u.enableAiButton());u.updateLoadButtonText(a,i,r,t)},onItemNameClick:function(e){},md:i,getContent:async e=>{if("file content"!==m)throw new Error("Unsupported content type "+m);e=(await d.getGitBlobChatMessagesByChatIds([e],"imported"!==v))[e]?.message||{};return{content:e.content||"No content available",metadata:e.meta||{}}}}),M=createModalControls({container:h,onMetadataToggle:()=>{}}),F=createContentLoader({controls:M,controls:M,progress:M.progress,chatApi:d,batchSize:e}),u=createModalFooter({container:h,contextBuilderTable:o,onCancel:B,onLoadFullContent:function(){var e;"review"===f&&(f="full-loading",T(),q(),0===(e=o.getSelectedItems()).length?(console.warn("No items selected for full content loading."),f="review",T(),q()):F.loadContent(e,m,v,U,x))},onSave:function(e,t){let{hideErrorMessage:a,showErrorMessage:i,disableSaveButton:r,enableSaveButton:l,updateSaveButtonText:o,getSaveButtonText:n}=u,s=n(),d=(r(),a(),o("Saving..."),c(e,t,!0));u.clearContextNameInput(),l(),d.success?(o("Saved"),setTimeout(()=>{o(s)},1500)):i(d.error)},onAdd:async function(e,t){B(),b&&"function"==typeof b?b(e,t):onclickAddDefault&&"function"==typeof onclickAddDefault&&onclickAddDefault(e,t)},onAskAI:async function(){var e=o.getSelectedItems();var t;0===e.length?(u.showErrorMessage("Please select items to Ask AI about."),setTimeout(()=>u.hideErrorMessage(),3e3)):({tableString:e,estimatedTokens:t}=formatOverviewTable(e),5e4<t?u.showErrorMessage(`Context is too large (~${formatTokens(t)} tokens). Please select fewer items.`):(t=await d.createAskAIChat(e),C&&"function"==typeof C&&C(t)))}});i={search:h.querySelector(".search-input-wrapper"),path:h.querySelector(".path-filter-section"),language:h.querySelector(".language-filter-section"),keywords:h.querySelector(".keyword-filter-section"),metadata:h.querySelector(".modal-metadata-filter-section")};let A=new FilterManager({contextBuilderTable:o,filterUIContainers:i,chatApi:d,onSearchExecute:async function(t){N();let a=A.activeFilters.find(e=>"search"===e.id)?.ui;if(a)if(a.setSearchInProgress(!0),t){var i=[...new Set(g.map(e=>e.repo?.fullName).filter(Boolean))],i=0<i.length?"repo:"+i.join(","):"";let e="";g.length<100&&(r=g.map(e=>e.id),e="chat-id:"+r.join(","));var r=(`profile:context-builder-search-filter ${i} ${e} `+t).trim().replace(/\s+/g," ");try{var l=await d.search(r),o=l?.results?.messages||[],n=l?.totalCounts?.messages||0,s=o.map(e=>e.messages_chat_id);500<n&&D(`Search returned ${n} matches. Displaying the first 500. Consider refining your query for more focused results.`),a.setMatchingItemIds(s),A.handleFilterChange(),L()}catch(e){D("Search failed: "+(e.message||"Unknown error"));let t=A.activeFilters.find(e=>"search"===e.id)?.ui;t&&t.setMatchingItemIds([]),A.handleFilterChange(),L()}finally{let e=A.activeFilters.find(e=>"search"===e.id)?.ui;e&&e.setSearchInProgress(!1)}}else a.setMatchingItemIds(null),A.handleFilterChange(),L(),a.setSearchInProgress(!1);else console.error("SearchFilter UI instance not found.")}}),n=new MetadataFilter({container:h.querySelector(".modal-metadata-filter-section"),chatApi:d,contextBuilderTable:o,onFilterChange:A.handleFilterChange.bind(A),onShowInsightsModal:function(e){$.show(e)}}),$=createMetadataInsightsModal({chatApi:d,contextBuilderTable:o,metadataSearch:n.metadataSearch,onReplaceFilterRules:function(e){n&&"function"==typeof n.setRulesFromInsights?n.setRulesFromInsights(e):console.error("ContextBuilderModal: MetadataFilter instance or setRulesFromInsights method not available.")}});function s(e,t="file content",a="imported",i="review",r={}){var{showCopy:r=!0,showSave:l=!0,showAdd:o=!0,onclickAddDefault:n,onclickAdd:s,initialAnalyzerId:d,initialInsightsFields:c,onAskAICreateChat:u}=r;if(!e||0===e.length)throw new Error("ContextBuilderModal.show: No items defined or provided");if(!["file content","overview"].includes(t))throw new Error("ContextBuilderModal.show: Invalid type "+t);if(!["imported","working directory","short","long"].includes(a))throw new Error("ContextBuilderModal.show: Invalid option "+a);if(!["review","full-loading","full-loaded"].includes(i))throw new Error("ContextBuilderModal.show: Invalid modal stage "+i);g=e,m=t,v=a,f=i,p=r,w=l,y=o,onclickAddDefault=n,C=u,b=s,S=d,I=c,L(),T(),M.reset(),h.style.display="flex",q(),F.loadContent(g,"review::"+m,"review::"+v,z,x)}function k(){S&&I&&0<I.length&&(n.addInsightRulesAndShowInsights(S,I),S=null,I=null)}function z(e){o.loadItems(e,f,()=>{L()}),k(),A.initialize(e,E,n),L(),T(),q()}function x(e,t){}function U(e){o.loadItems(e,f,()=>{L()}),f="full-loaded",T(),q(),E(),k()}function B(){h.style.display="none",F.stopLoading(),f="review",q(),u.hideErrorMessage(),T();var e=h.querySelector(".filter-stats-display");e&&(e.textContent=""),N(),l&&(clearTimeout(l),l=null),o.clear(),u.disableLoadButton(),u.disableAiButton(),n.reset()}function T(){var e=o.allItems,t=e.length,a=e.reduce((e,t)=>e+(t.tokenCount||0),0),e=e.reduce((e,t)=>e+(t.size||0),0);"full-loaded"===f&&u.updateAddButtonText(t,a,e),u.updateVisibility(f,{showAdd:y})}function q(){A.setFiltersDisabled("review"!==f),n.setDisabled("review"!==f)}function L(){var e,t,a,i,r,l=h.querySelector(".filter-stats-display");l&&(a=(r=o.allItems).filter(e=>e.row&&"none"!==e.row.style.display),e=o.getSelectedItems(),t=r.length,a=a.length,e.length,(i=(i=A.activeFilters.find(e=>"search"===e.id)?.ui)?i.getState():{}).matchingItemIds&&i.matchingItemIds.length,i.searchTerm&&i.searchTerm.length,r.reduce((e,t)=>e+(t.tokenCount||0),0),e.reduce((e,t)=>e+(t.tokenCount||0),0),i=formatOverviewTable(e).estimatedTokens,r=e.filter(e=>e.purpose).length,l.innerHTML=`Showing ${a} of ${t} items`,0===e.length?u.updateAskAiButtonText("Ask AI"):(l=1===e.length?"":"s",u.updateAskAiButtonText(`Ask AI (${e.length} item${l}, ${r} analyzed, ~${formatTokens(i)} tokens)`)))}function E(){l&&clearTimeout(l),l=setTimeout(()=>{L()},R)}function D(e){a&&(a.textContent=e,a.style.display="block")}function N(){a&&(a.style.display="none")}return T(),t.addEventListener("click",B),{show:s,getContextBuilderTable:function(){return o},hide:B,loadFromNodeIds:function(e,t=0,i="imported"){if(e&&0!==e.length){let a=[];e.forEach(e=>{var t=r.findNodeById(e);t?a.push(t):console.warn(`Node with ID ${e} not found`)}),0===a.length?console.warn("No valid nodes found for the provided IDs"):s(a,"file content",i)}else console.warn("No node IDs provided to context builder")},element:h}}module.exports={createContextBuilderModal:createContextBuilderModal};
