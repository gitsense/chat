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

let hljs=require("highlight.js"),MessageUtils=require("@gitsense/gsc-utils").MessageUtils,ContextBuilderTable=require("./ContextBuilderTable").ContextBuilderTable,createContentLoader=require("./ContentLoader").createContentLoader,FilterManager=require("./filters/FilterManager").FilterManager,FilterState=require("./filters/FilterState").FilterState,filterConfig=require("./filters/config/filterConfig").filterConfig,MetadataFilter=require("./filters/types/metadata/MetadataFilter").MetadataFilter,LanguageFilter=require("./filters/types/language/LanguageFilter").LanguageFilter,LanguageFilterLogic=require("./filters/types/language/LanguageFilterLogic").LanguageFilterLogic,createMetadataInsightsModal=require("./MetadataInsightsModal").createMetadataInsightsModal,createModalControls=require("./ModalControls").createModalControls,createModalFooter=require("./ModalFooter").createModalFooter,{formatTokens,formatBytes,formatOverviewTable}=require("../../../utils/formatterUtils"),copyToClipboard=require("../../../utils/clipboard").copyToClipboard,{h,createMarkdownRenderer,Dropdown,ConfirmationBox,PromptBox}=require("../../../Dependencies");function createContextBuilderModal({state:O,chatApi:d,saveCurrentSelection:R,batchChatsSize:$=25,showAdd:h=!0,showSave:f=!0,showCopy:g=!0}){if(!d||!d.search||"function"!=typeof d.search)throw new Error("chaApi not defined or no chatApi search defined or chatApi search is not a function");let v=document.createElement("div");v.className="context-builder-modal",v.setAttribute("role","dialog"),v.setAttribute("aria-modal","true"),v.setAttribute("aria-labelledby","modal-title"),v.style.display="none";v.innerHTML=`
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
  `,document.body.appendChild(v);var z=v.querySelector(".close-button");v.querySelector(".modal-search-and-filter-stats");let t=v.querySelector(".modal-search-and-filter-message");var e=createMarkdownRenderer(hljs);let i=new ConfirmationBox,o=new PromptBox({width:500,height:"auto",customClass:"context-builder-prompt-box"}),m="review",p=[],w="file content",y="imported",b=null;let C=null,a=null,P=500,S=null,x=null,l=new ContextBuilderTable({container:v.querySelector(".context-builder-table-container"),onItemSelectionChange:function(e){E();l.getSelectedItems();let t=l.getSelectedTotalSize(),a=e.length,i=l.allItems.length,o=l.getSelectedTotalTokens();0===e.length?(c.disableLoadButton(),c.disableOverviewButton()):(c.enableLoadButton(),c.enableOverviewButton());c.updateLoadButtonText(a,i,o,t)},onItemNameClick:function(e){},md:e,getContent:async e=>{if("file content"!==w)throw new Error("Unsupported content type "+w);e=(await d.getGitBlobChatMessagesByChatIds([e],"imported"!==y))[e]?.message||{};return{content:e.content||"No content available",metadata:e.meta||{}}}}),M=createModalControls({container:v,onMetadataToggle:()=>{}}),I=createContentLoader({controls:M,controls:M,progress:M.progress,chatApi:d,batchSize:$}),c=createModalFooter({container:v,contextBuilderTable:l,onCancel:B,onLoadFullContent:function(){var e;"review"===m&&(m="full-loading",A(),q(),0===(e=l.getSelectedItems()).length?(console.warn("No items selected for full content loading."),m="review",A(),q()):I.loadContent(e,w,y,H,F))},onSave:function(e,t){let{hideErrorMessage:a,showErrorMessage:i,disableSaveButton:o,enableSaveButton:r,updateSaveButtonText:l,getSaveButtonText:n}=c,s=n(),d=(o(),a(),l("Saving..."),R(e,t,!0));c.clearContextNameInput(),r(),d.success?(l("Saved"),setTimeout(()=>{l(s)},1500)):i(d.error)},onAdd:k,onOverviewClick:async function(){var a=l.getSelectedItems();if(0===a.length)c.showErrorMessage("Please select items to generate an overview."),setTimeout(()=>c.hideErrorMessage(),3e3);else{let{tableString:e,estimatedTokens:t}=formatOverviewTable(a);1e5<t?(a=`
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
            `,i.show({title:"Large Context Warning",htmlMessage:a,confirmButtonText:"Proceed Anyway",cancelButtonText:"Cancel"},()=>{T(e)})):T(e)}}});e={search:v.querySelector(".search-input-wrapper"),path:v.querySelector(".path-filter-section"),language:v.querySelector(".language-filter-section"),keywords:v.querySelector(".keyword-filter-section"),metadata:v.querySelector(".modal-metadata-filter-section")};let u=new FilterManager({contextBuilderTable:l,filterUIContainers:e,chatApi:d,onSearchExecute:async function(t){N();let a=u.activeFilters.find(e=>"search"===e.id)?.ui;if(a)if(a.setSearchInProgress(!0),t){var i=[...new Set(p.map(e=>e.repo?.fullName).filter(Boolean))],i=0<i.length?"repo:"+i.join(","):"";let e="";p.length<100&&(o=p.map(e=>e.id),e="chat-id:"+o.join(","));var o=(`profile:context-builder-search-filter ${i} ${e} `+t).trim().replace(/\s+/g," ");try{var r=await d.search(o),l=r?.results?.messages||[],n=r?.totalCounts?.messages||0,s=l.map(e=>e.messages_chat_id);500<n&&D(`Search returned ${n} matches. Displaying the first 500. Consider refining your query for more focused results.`),a.setMatchingItemIds(s),u.handleFilterChange(),L()}catch(e){D("Search failed: "+(e.message||"Unknown error"));let t=u.activeFilters.find(e=>"search"===e.id)?.ui;t&&t.setMatchingItemIds([]),u.handleFilterChange(),L()}finally{let e=u.activeFilters.find(e=>"search"===e.id)?.ui;e&&e.setSearchInProgress(!1)}}else a.setMatchingItemIds(null),u.handleFilterChange(),L(),a.setSearchInProgress(!1);else console.error("SearchFilter UI instance not found.")}}),r=new MetadataFilter({container:v.querySelector(".modal-metadata-filter-section"),chatApi:d,contextBuilderTable:l,onFilterChange:u.handleFilterChange.bind(u),onShowInsightsModal:function(e){U.show(e)}}),U=createMetadataInsightsModal({chatApi:d,contextBuilderTable:l,metadataSearch:r.metadataSearch,onReplaceFilterRules:function(e){r&&"function"==typeof r.setRulesFromInsights?r.setRulesFromInsights(e):console.error("ContextBuilderModal: MetadataFilter instance or setRulesFromInsights method not available.")}});function n(e,t="file content",a="imported",i="review",o={}){var{showCopy:o,showSave:r,showAdd:l,onclickAddDefault:n,onclickAdd:s,initialAnalyzerId:d,initialInsightsFields:c,onAskAICreateChat:u}=o;if(!e||0===e.length)throw new Error("ContextBuilderModal.show: No items defined or provided");if(!["file content","overview"].includes(t))throw new Error("ContextBuilderModal.show: Invalid type "+t);if(!["imported","working directory","short","long"].includes(a))throw new Error("ContextBuilderModal.show: Invalid option "+a);if(!["review","full-loading","full-loaded"].includes(i))throw new Error("ContextBuilderModal.show: Invalid modal stage "+i);p=e,w=t,y=a,m=i,null!=o&&(g=o),null!=r&&(f=r),null!=l&&(h=l),onclickAddDefault=n,C=u,b=s,S=d,x=c,L(),A(),M.reset(),v.style.display="flex",q(),I.loadContent(p,"review::"+w,"review::"+y,j,F)}function s(){S&&x&&0<x.length&&(r.addInsightRulesAndShowInsights(S,x),S=null,x=null)}function j(e){l.loadItems(e,m,()=>{L()}),s(),u.initialize(e,E,r),L(),A(),q()}function F(e,t){}function H(e){l.loadItems(e,m,()=>{L()}),m="full-loaded",A(),q(),E(),s()}async function k(e,t){B(),b&&"function"==typeof b?b(e,t):onclickAddDefault&&"function"==typeof onclickAddDefault&&onclickAddDefault(e,t)}function T(i){o.show({title:"Context Overview",content:`
            <div style='padding-bottom:5px'>
                <p>This context overview contains the purpose and keywords for your selected items. Choose an option below:</p>
                <ul style="margin-left:20px;line-height:1.7">
                    <li><a href="#" class="overview-action-link" data-action="copy">Copy the context overview to your clipboard.</a></li>
                    <li><a href="#" class="overview-action-link" data-action="message">Add context overview as a new message.</a></li>
                    <li><a href="#" class="overview-action-link" data-action="chat">Create a new chat with the context overview.</a></li>
                </ul>
            </div>
        `,isHtmlContent:!0,width:550}),o.elements.body.querySelectorAll(".overview-action-link").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();var t=e.target.getAttribute("data-action"),a=i;switch(o.hide(),t){case"copy":(async e=>{(e=await copyToClipboard(e))?(c.showErrorMessage("Overview copied to clipboard.",!1),setTimeout(()=>c.hideErrorMessage(),3e3)):c.showErrorMessage("Failed to copy overview to clipboard.")})(a);break;case"message":(e=>{var t=l.getSelectedItems();k(e,t)})(a);break;case"chat":(async e=>{e=await d.createAskAIChat(e),C&&"function"==typeof C&&C(e)})(a);break;default:console.error("Unknown overview action: "+t)}})})}function B(){v.style.display="none",I.stopLoading(),o.hide(),i.hide(),m="review",q(),c.hideErrorMessage(),A();var e=v.querySelector(".filter-stats-display");e&&(e.textContent=""),N(),a&&(clearTimeout(a),a=null),l.clear(),c.disableLoadButton(),c.disableOverviewButton(),r.reset()}function A(){var e=l.allItems,t=e.length,a=e.reduce((e,t)=>e+(t.tokenCount||0),0),e=e.reduce((e,t)=>e+(t.size||0),0);"full-loaded"===m&&c.updateAddButtonText(t,a,e),c.updateVisibility(m,{showAdd:h,showCopy:g,showSave:f})}function q(){u.setFiltersDisabled("review"!==m),r.setDisabled("review"!==m)}function L(){var e,t,a,i,o,r=v.querySelector(".filter-stats-display");r&&(a=(o=l.allItems).filter(e=>e.row&&"none"!==e.row.style.display),e=l.getSelectedItems(),t=o.length,a=a.length,e.length,(i=(i=u.activeFilters.find(e=>"search"===e.id)?.ui)?i.getState():{}).matchingItemIds&&i.matchingItemIds.length,i.searchTerm&&i.searchTerm.length,o.reduce((e,t)=>e+(t.tokenCount||0),0),e.reduce((e,t)=>e+(t.tokenCount||0),0),i=formatOverviewTable(e).estimatedTokens,o=e.filter(e=>e.purpose).length,r.innerHTML=`Showing ${a} of ${t} items`,0===e.length?c.updateOverviewButtonText("Overview"):(r=1===e.length?"":"s",c.updateOverviewButtonText(`Overview (${e.length} item${r}, ${o} analyzed, ~${formatTokens(i)} tokens)`)))}function E(){a&&clearTimeout(a),a=setTimeout(()=>{L()},P)}function D(e){t&&(t.textContent=e,t.style.display="block")}function N(){t&&(t.style.display="none")}return A(),z.addEventListener("click",B),{show:n,getContextBuilderTable:function(){return l},hide:B,loadFromNodeIds:function(e,t=0,i="imported"){if(e&&0!==e.length){let a=[];e.forEach(e=>{var t=O.findNodeById(e);t?a.push(t):console.warn(`Node with ID ${e} not found`)}),0===a.length?console.warn("No valid nodes found for the provided IDs"):n(a,"file content",i)}else console.warn("No node IDs provided to context builder")},element:v}}module.exports={createContextBuilderModal:createContextBuilderModal};
