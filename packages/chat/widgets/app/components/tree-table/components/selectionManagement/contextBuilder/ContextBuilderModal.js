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

let hljs=require("highlight.js"),MessageUtils=require("@gitsense/gsc-utils").MessageUtils,ContextBuilderTable=require("./ContextBuilderTable").ContextBuilderTable,createContentLoader=require("./ContentLoader").createContentLoader,FilterManager=require("./filters/FilterManager").FilterManager,FilterState=require("./filters/FilterState").FilterState,filterConfig=require("./filters/config/filterConfig").filterConfig,MetadataFilter=require("./filters/types/metadata/MetadataFilter").MetadataFilter,LanguageFilter=require("./filters/types/language/LanguageFilter").LanguageFilter,LanguageFilterLogic=require("./filters/types/language/LanguageFilterLogic").LanguageFilterLogic,createMetadataInsightsModal=require("./MetadataInsightsModal").createMetadataInsightsModal,createModalControls=require("./ModalControls").createModalControls,createModalFooter=require("./ModalFooter").createModalFooter,{formatTokens,formatOverviewTable}=require("../../../utils/formatterUtils"),{h,createMarkdownRenderer,Dropdown}=require("../../../Dependencies"),formatBytes=require("../../../utils/formatterUtils").formatBytes;function createContextBuilderModal({state:l,chatApi:d,saveCurrentSelection:c,batchChatsSize:e=25,showAdd:h=!0,showSave:f=!0,showCopy:g=!0}){if(!d||!d.search||"function"!=typeof d.search)throw new Error("chaApi not defined or no chatApi search defined or chatApi search is not a function");let m=document.createElement("div");m.className="context-builder-modal",m.setAttribute("role","dialog"),m.setAttribute("aria-modal","true"),m.setAttribute("aria-labelledby","modal-title"),m.style.display="none";m.innerHTML=`
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
  `,document.body.appendChild(m);var t=m.querySelector(".close-button");m.querySelector(".modal-search-and-filter-stats");let a=m.querySelector(".modal-search-and-filter-message");var i=createMarkdownRenderer(hljs);let v="review",p=[],w="file content",y="imported",C=null;let b=null,r=null,R=500,S=null,I=null,o=new ContextBuilderTable({container:m.querySelector(".context-builder-table-container"),onItemSelectionChange:function(e){E();o.getSelectedItems();let t=o.getSelectedTotalSize(),a=e.length,i=o.allItems.length,l=o.getSelectedTotalTokens();0===e.length?(u.disableLoadButton(),u.disableAiButton()):(u.enableLoadButton(),u.enableAiButton());u.updateLoadButtonText(a,i,l,t)},onItemNameClick:function(e){},md:i,getContent:async e=>{if("file content"!==w)throw new Error("Unsupported content type "+w);e=(await d.getGitBlobChatMessagesByChatIds([e],"imported"!==y))[e]?.message||{};return{content:e.content||"No content available",metadata:e.meta||{}}}}),M=createModalControls({container:m,onMetadataToggle:()=>{}}),F=createContentLoader({controls:M,controls:M,progress:M.progress,chatApi:d,batchSize:e}),u=createModalFooter({container:m,contextBuilderTable:o,onCancel:B,onLoadFullContent:function(){var e;"review"===v&&(v="full-loading",T(),q(),0===(e=o.getSelectedItems()).length?(console.warn("No items selected for full content loading."),v="review",T(),q()):F.loadContent(e,w,y,U,x))},onSave:function(e,t){let{hideErrorMessage:a,showErrorMessage:i,disableSaveButton:l,enableSaveButton:r,updateSaveButtonText:o,getSaveButtonText:n}=u,s=n(),d=(l(),a(),o("Saving..."),c(e,t,!0));u.clearContextNameInput(),r(),d.success?(o("Saved"),setTimeout(()=>{o(s)},1500)):i(d.error)},onAdd:async function(e,t){B(),C&&"function"==typeof C?C(e,t):onclickAddDefault&&"function"==typeof onclickAddDefault&&onclickAddDefault(e,t)},onAskAI:async function(){var e=o.getSelectedItems();var t;0===e.length?(u.showErrorMessage("Please select items to Ask AI about."),setTimeout(()=>u.hideErrorMessage(),3e3)):({tableString:e,estimatedTokens:t}=formatOverviewTable(e),5e4<t?u.showErrorMessage(`Context is too large (~${formatTokens(t)} tokens). Please select fewer items.`):(t=await d.createAskAIChat(e),b&&"function"==typeof b&&b(t)))}});i={search:m.querySelector(".search-input-wrapper"),path:m.querySelector(".path-filter-section"),language:m.querySelector(".language-filter-section"),keywords:m.querySelector(".keyword-filter-section"),metadata:m.querySelector(".modal-metadata-filter-section")};let A=new FilterManager({contextBuilderTable:o,filterUIContainers:i,chatApi:d,onSearchExecute:async function(t){N();let a=A.activeFilters.find(e=>"search"===e.id)?.ui;if(a)if(a.setSearchInProgress(!0),t){var i=[...new Set(p.map(e=>e.repo?.fullName).filter(Boolean))],i=0<i.length?"repo:"+i.join(","):"";let e="";p.length<100&&(l=p.map(e=>e.id),e="chat-id:"+l.join(","));var l=(`profile:context-builder-search-filter ${i} ${e} `+t).trim().replace(/\s+/g," ");try{var r=await d.search(l),o=r?.results?.messages||[],n=r?.totalCounts?.messages||0,s=o.map(e=>e.messages_chat_id);500<n&&D(`Search returned ${n} matches. Displaying the first 500. Consider refining your query for more focused results.`),a.setMatchingItemIds(s),A.handleFilterChange(),L()}catch(e){D("Search failed: "+(e.message||"Unknown error"));let t=A.activeFilters.find(e=>"search"===e.id)?.ui;t&&t.setMatchingItemIds([]),A.handleFilterChange(),L()}finally{let e=A.activeFilters.find(e=>"search"===e.id)?.ui;e&&e.setSearchInProgress(!1)}}else a.setMatchingItemIds(null),A.handleFilterChange(),L(),a.setSearchInProgress(!1);else console.error("SearchFilter UI instance not found.")}}),n=new MetadataFilter({container:m.querySelector(".modal-metadata-filter-section"),chatApi:d,contextBuilderTable:o,onFilterChange:A.handleFilterChange.bind(A),onShowInsightsModal:function(e){$.show(e)}}),$=createMetadataInsightsModal({chatApi:d,contextBuilderTable:o,metadataSearch:n.metadataSearch,onReplaceFilterRules:function(e){n&&"function"==typeof n.setRulesFromInsights?n.setRulesFromInsights(e):console.error("ContextBuilderModal: MetadataFilter instance or setRulesFromInsights method not available.")}});function s(e,t="file content",a="imported",i="review",l={}){var{showCopy:l,showSave:r,showAdd:o,onclickAddDefault:n,onclickAdd:s,initialAnalyzerId:d,initialInsightsFields:c,onAskAICreateChat:u}=l;if(!e||0===e.length)throw new Error("ContextBuilderModal.show: No items defined or provided");if(!["file content","overview"].includes(t))throw new Error("ContextBuilderModal.show: Invalid type "+t);if(!["imported","working directory","short","long"].includes(a))throw new Error("ContextBuilderModal.show: Invalid option "+a);if(!["review","full-loading","full-loaded"].includes(i))throw new Error("ContextBuilderModal.show: Invalid modal stage "+i);p=e,w=t,y=a,v=i,null!=l&&(g=l),null!=r&&(f=r),null!=o&&(h=o),onclickAddDefault=n,b=u,C=s,S=d,I=c,L(),T(),M.reset(),m.style.display="flex",q(),F.loadContent(p,"review::"+w,"review::"+y,z,x)}function k(){S&&I&&0<I.length&&(n.addInsightRulesAndShowInsights(S,I),S=null,I=null)}function z(e){o.loadItems(e,v,()=>{L()}),k(),A.initialize(e,E,n),L(),T(),q()}function x(e,t){}function U(e){o.loadItems(e,v,()=>{L()}),v="full-loaded",T(),q(),E(),k()}function B(){m.style.display="none",F.stopLoading(),v="review",q(),u.hideErrorMessage(),T();var e=m.querySelector(".filter-stats-display");e&&(e.textContent=""),N(),r&&(clearTimeout(r),r=null),o.clear(),u.disableLoadButton(),u.disableAiButton(),n.reset()}function T(){var e=o.allItems,t=e.length,a=e.reduce((e,t)=>e+(t.tokenCount||0),0),e=e.reduce((e,t)=>e+(t.size||0),0);"full-loaded"===v&&u.updateAddButtonText(t,a,e),u.updateVisibility(v,{showAdd:h,showCopy:g,showSave:f})}function q(){A.setFiltersDisabled("review"!==v),n.setDisabled("review"!==v)}function L(){var e,t,a,i,l,r=m.querySelector(".filter-stats-display");r&&(a=(l=o.allItems).filter(e=>e.row&&"none"!==e.row.style.display),e=o.getSelectedItems(),t=l.length,a=a.length,e.length,(i=(i=A.activeFilters.find(e=>"search"===e.id)?.ui)?i.getState():{}).matchingItemIds&&i.matchingItemIds.length,i.searchTerm&&i.searchTerm.length,l.reduce((e,t)=>e+(t.tokenCount||0),0),e.reduce((e,t)=>e+(t.tokenCount||0),0),i=formatOverviewTable(e).estimatedTokens,l=e.filter(e=>e.purpose).length,r.innerHTML=`Showing ${a} of ${t} items`,0===e.length?u.updateAskAiButtonText("Ask AI"):(r=1===e.length?"":"s",u.updateAskAiButtonText(`Ask AI (${e.length} item${r}, ${l} analyzed, ~${formatTokens(i)} tokens)`)))}function E(){r&&clearTimeout(r),r=setTimeout(()=>{L()},R)}function D(e){a&&(a.textContent=e,a.style.display="block")}function N(){a&&(a.style.display="none")}return T(),t.addEventListener("click",B),{show:s,getContextBuilderTable:function(){return o},hide:B,loadFromNodeIds:function(e,t=0,i="imported"){if(e&&0!==e.length){let a=[];e.forEach(e=>{var t=l.findNodeById(e);t?a.push(t):console.warn(`Node with ID ${e} not found`)}),0===a.length?console.warn("No valid nodes found for the provided IDs"):s(a,"file content",i)}else console.warn("No node IDs provided to context builder")},element:m}}module.exports={createContextBuilderModal:createContextBuilderModal};
