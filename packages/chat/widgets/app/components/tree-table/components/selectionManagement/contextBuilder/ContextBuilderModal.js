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

let hljs=require("highlight.js"),MessageUtils=require("@gitsense/gsc-utils").MessageUtils,ContextBuilderTable=require("./ContextBuilderTable").ContextBuilderTable,createContentLoader=require("./ContentLoader").createContentLoader,FilterManager=require("./filters/FilterManager").FilterManager,FilterState=require("./filters/FilterState").FilterState,filterConfig=require("./filters/config/filterConfig").filterConfig,MetadataFilter=require("./filters/types/metadata/MetadataFilter").MetadataFilter,LanguageFilter=require("./filters/types/language/LanguageFilter").LanguageFilter,LanguageFilterLogic=require("./filters/types/language/LanguageFilterLogic").LanguageFilterLogic,createMetadataInsightsModal=require("./MetadataInsightsModal").createMetadataInsightsModal,createModalControls=require("./ModalControls").createModalControls,createModalFooter=require("./ModalFooter").createModalFooter,{formatTokens,formatOverviewTable}=require("../../../utils/formatterUtils"),{h,createMarkdownRenderer,Dropdown,ConfirmationBox}=require("../../../Dependencies"),formatBytes=require("../../../utils/formatterUtils").formatBytes;function createContextBuilderModal({state:l,chatApi:d,saveCurrentSelection:c,batchChatsSize:R=25,showAdd:h=!0,showSave:f=!0,showCopy:g=!0}){if(!d||!d.search||"function"!=typeof d.search)throw new Error("chaApi not defined or no chatApi search defined or chatApi search is not a function");let m=document.createElement("div");m.className="context-builder-modal",m.setAttribute("role","dialog"),m.setAttribute("aria-modal","true"),m.setAttribute("aria-labelledby","modal-title"),m.style.display="none";m.innerHTML=`
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
  `,document.body.appendChild(m);var $=m.querySelector(".close-button");m.querySelector(".modal-search-and-filter-stats");let t=m.querySelector(".modal-search-and-filter-message");var e=createMarkdownRenderer(hljs);let i=new ConfirmationBox,p="review",v=[],w="file content",y="imported",C=null;let b=null,a=null,z=500,S=null,I=null,r=new ContextBuilderTable({container:m.querySelector(".context-builder-table-container"),onItemSelectionChange:function(e){D();r.getSelectedItems();let t=r.getSelectedTotalSize(),a=e.length,i=r.allItems.length,l=r.getSelectedTotalTokens();0===e.length?(u.disableLoadButton(),u.disableAiButton()):(u.enableLoadButton(),u.enableAiButton());u.updateLoadButtonText(a,i,l,t)},onItemNameClick:function(e){},md:e,getContent:async e=>{if("file content"!==w)throw new Error("Unsupported content type "+w);e=(await d.getGitBlobChatMessagesByChatIds([e],"imported"!==y))[e]?.message||{};return{content:e.content||"No content available",metadata:e.meta||{}}}}),M=createModalControls({container:m,onMetadataToggle:()=>{}}),F=createContentLoader({controls:M,controls:M,progress:M.progress,chatApi:d,batchSize:R}),u=createModalFooter({container:m,contextBuilderTable:r,onCancel:B,onLoadFullContent:function(){var e;"review"===p&&(p="full-loading",T(),q(),0===(e=r.getSelectedItems()).length?(console.warn("No items selected for full content loading."),p="review",T(),q()):F.loadContent(e,w,y,j,A))},onSave:function(e,t){let{hideErrorMessage:a,showErrorMessage:i,disableSaveButton:l,enableSaveButton:o,updateSaveButtonText:r,getSaveButtonText:n}=u,s=n(),d=(l(),a(),r("Saving..."),c(e,t,!0));u.clearContextNameInput(),o(),d.success?(r("Saved"),setTimeout(()=>{r(s)},1500)):i(d.error)},onAdd:async function(e,t){B(),C&&"function"==typeof C?C(e,t):onclickAddDefault&&"function"==typeof onclickAddDefault&&onclickAddDefault(e,t)},onAskAI:async function(){var a=r.getSelectedItems();if(0===a.length)u.showErrorMessage("Please select items to Ask AI about."),setTimeout(()=>u.hideErrorMessage(),3e3);else{let{tableString:e,estimatedTokens:t}=formatOverviewTable(a);1e5<t?(a=`
                <p>The selected context contains approximately <strong>${formatTokens(t)}</strong> tokens, 
                which exceeds the recommended limit of <strong>${formatTokens(1e5)}</strong> tokens. 
                Large contexts may lead to slower responses or unexpected behavior from the AI.</p>
                <p>Consider reducing the context size by:</p>
                <ul style='margin-left:25px;margin-bottom:10px'>
                    <li>Filtering files by path patterns</li>
                    <li>Selecting specific languages</li>
                    <li>Filtering by keywords</li>
                </ul>
                <p>Do you want to proceed with this large context anyway?</p>
            `,i.show({title:"Large Context Warning",htmlMessage:a,confirmButtonText:"Proceed Anyway",cancelButtonText:"Cancel"},()=>{k(e)})):k(e)}}});e={search:m.querySelector(".search-input-wrapper"),path:m.querySelector(".path-filter-section"),language:m.querySelector(".language-filter-section"),keywords:m.querySelector(".keyword-filter-section"),metadata:m.querySelector(".modal-metadata-filter-section")};let x=new FilterManager({contextBuilderTable:r,filterUIContainers:e,chatApi:d,onSearchExecute:async function(t){N();let a=x.activeFilters.find(e=>"search"===e.id)?.ui;if(a)if(a.setSearchInProgress(!0),t){var i=[...new Set(v.map(e=>e.repo?.fullName).filter(Boolean))],i=0<i.length?"repo:"+i.join(","):"";let e="";v.length<100&&(l=v.map(e=>e.id),e="chat-id:"+l.join(","));var l=(`profile:context-builder-search-filter ${i} ${e} `+t).trim().replace(/\s+/g," ");try{var o=await d.search(l),r=o?.results?.messages||[],n=o?.totalCounts?.messages||0,s=r.map(e=>e.messages_chat_id);500<n&&E(`Search returned ${n} matches. Displaying the first 500. Consider refining your query for more focused results.`),a.setMatchingItemIds(s),x.handleFilterChange(),L()}catch(e){E("Search failed: "+(e.message||"Unknown error"));let t=x.activeFilters.find(e=>"search"===e.id)?.ui;t&&t.setMatchingItemIds([]),x.handleFilterChange(),L()}finally{let e=x.activeFilters.find(e=>"search"===e.id)?.ui;e&&e.setSearchInProgress(!1)}}else a.setMatchingItemIds(null),x.handleFilterChange(),L(),a.setSearchInProgress(!1);else console.error("SearchFilter UI instance not found.")}}),o=new MetadataFilter({container:m.querySelector(".modal-metadata-filter-section"),chatApi:d,contextBuilderTable:r,onFilterChange:x.handleFilterChange.bind(x),onShowInsightsModal:function(e){U.show(e)}}),U=createMetadataInsightsModal({chatApi:d,contextBuilderTable:r,metadataSearch:o.metadataSearch,onReplaceFilterRules:function(e){o&&"function"==typeof o.setRulesFromInsights?o.setRulesFromInsights(e):console.error("ContextBuilderModal: MetadataFilter instance or setRulesFromInsights method not available.")}});function n(e,t="file content",a="imported",i="review",l={}){var{showCopy:l,showSave:o,showAdd:r,onclickAddDefault:n,onclickAdd:s,initialAnalyzerId:d,initialInsightsFields:c,onAskAICreateChat:u}=l;if(!e||0===e.length)throw new Error("ContextBuilderModal.show: No items defined or provided");if(!["file content","overview"].includes(t))throw new Error("ContextBuilderModal.show: Invalid type "+t);if(!["imported","working directory","short","long"].includes(a))throw new Error("ContextBuilderModal.show: Invalid option "+a);if(!["review","full-loading","full-loaded"].includes(i))throw new Error("ContextBuilderModal.show: Invalid modal stage "+i);v=e,w=t,y=a,p=i,null!=l&&(g=l),null!=o&&(f=o),null!=r&&(h=r),onclickAddDefault=n,b=u,C=s,S=d,I=c,L(),T(),M.reset(),m.style.display="flex",q(),F.loadContent(v,"review::"+w,"review::"+y,P,A)}function s(){S&&I&&0<I.length&&(o.addInsightRulesAndShowInsights(S,I),S=null,I=null)}function P(e){r.loadItems(e,p,()=>{L()}),s(),x.initialize(e,D,o),L(),T(),q()}function A(e,t){}function j(e){r.loadItems(e,p,()=>{L()}),p="full-loaded",T(),q(),D(),s()}function B(){m.style.display="none",F.stopLoading(),i.hide(),p="review",q(),u.hideErrorMessage(),T();var e=m.querySelector(".filter-stats-display");e&&(e.textContent=""),N(),a&&(clearTimeout(a),a=null),r.clear(),u.disableLoadButton(),u.disableAiButton(),o.reset()}async function k(e){e=await d.createAskAIChat(e);b&&"function"==typeof b&&b(e)}function T(){var e=r.allItems,t=e.length,a=e.reduce((e,t)=>e+(t.tokenCount||0),0),e=e.reduce((e,t)=>e+(t.size||0),0);"full-loaded"===p&&u.updateAddButtonText(t,a,e),u.updateVisibility(p,{showAdd:h,showCopy:g,showSave:f})}function q(){x.setFiltersDisabled("review"!==p),o.setDisabled("review"!==p)}function L(){var e,t,a,i,l,o=m.querySelector(".filter-stats-display");o&&(a=(l=r.allItems).filter(e=>e.row&&"none"!==e.row.style.display),e=r.getSelectedItems(),t=l.length,a=a.length,e.length,(i=(i=x.activeFilters.find(e=>"search"===e.id)?.ui)?i.getState():{}).matchingItemIds&&i.matchingItemIds.length,i.searchTerm&&i.searchTerm.length,l.reduce((e,t)=>e+(t.tokenCount||0),0),e.reduce((e,t)=>e+(t.tokenCount||0),0),i=formatOverviewTable(e).estimatedTokens,l=e.filter(e=>e.purpose).length,o.innerHTML=`Showing ${a} of ${t} items`,0===e.length?u.updateAskAiButtonText("Ask AI"):(o=1===e.length?"":"s",u.updateAskAiButtonText(`Ask AI (${e.length} item${o}, ${l} analyzed, ~${formatTokens(i)} tokens)`)))}function D(){a&&clearTimeout(a),a=setTimeout(()=>{L()},z)}function E(e){t&&(t.textContent=e,t.style.display="block")}function N(){t&&(t.style.display="none")}return T(),$.addEventListener("click",B),{show:n,getContextBuilderTable:function(){return r},hide:B,loadFromNodeIds:function(e,t=0,i="imported"){if(e&&0!==e.length){let a=[];e.forEach(e=>{var t=l.findNodeById(e);t?a.push(t):console.warn(`Node with ID ${e} not found`)}),0===a.length?console.warn("No valid nodes found for the provided IDs"):n(a,"file content",i)}else console.warn("No node IDs provided to context builder")},element:m}}module.exports={createContextBuilderModal:createContextBuilderModal};
