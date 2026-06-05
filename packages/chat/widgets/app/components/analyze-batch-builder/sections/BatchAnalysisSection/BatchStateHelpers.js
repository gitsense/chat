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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,TEXT=require("./constants").TEXT;module.exports={_getFilteredBatches(){let t=[...this.state.batches],e=0;for(var s in this.state.statusFilters)this.state.statusFilters[s]&&e++;if(0!==e&&(t=t.filter(t=>!1!==this.state.statusFilters[t.status])),this.state.searchTerm&&""!==this.state.searchTerm.trim()){let e=this.state.searchTerm.toLowerCase().trim();t=t.filter(t=>!!t.id.toString().includes(e)||!!t.status.toLowerCase().includes(e))}return t},_getPaginatedBatches(){var t=this._getFilteredBatches(),e=(this.state.currentPage-1)*this.state.itemsPerPage,s=e+this.state.itemsPerPage;return t.slice(e,s)},_updateUI(){var t=this.analyzer&&this.analyzer.requires_reference_files,e=0!==this.referenceFilesSection.state.items.length,t=!t||e;if(this.state.hasBatches&&t){var e=this._getFilteredBatches(),s=this._getPaginatedBatches(),a=this._hasActiveFilters();this.resultsCountContainer.innerHTML="";let t;t=(a?TEXT.SHOWING_FILTERED_RESULTS.replace("{visible}",e.length):TEXT.SHOWING_ALL_RESULTS).replace("{total}",this.state.batchGroups.length),this.resultsCountContainer.appendChild(DomUtils.h.createDiv({text:t,style:{display:"inline-block",marginBottom:"5px"}})),this.resultsCountContainer.appendChild(DomUtils.h.createDiv({text:TEXT.FILES_COUNT_INSTRUCTION,style:{display:"inline-block",fontSize:"0.9em",color:"#666",fontStyle:"italic",position:"relative",float:"right"}})),this.batchTable&&this.batchTable.updateData(s),this.pagination&&(this.pagination.setTotalItems(e.length),this.pagination.setCurrentPage(this.state.currentPage)),this.statusFilters&&(a=this._getStatusCounts(),this.statusFilters.updateCounts(a)),this._updateActiveProcessesIndicator(),this.bulkBatch&&(this.bulkBatch.update(this.state.batches),s={batchGroups:this._getBatchAnalysisState().batchGroups,analyzer:this.analyzer},this.bulkBatch.update(s))}else this.contentElement.innerHTML="",this.contentElement.appendChild(DomUtils.h.createParagraph({text:t?TEXT.NO_BATCHES:TEXT.NO_REFERENCE_FILES_FOR_ANALYZER,style:{fontStyle:"italic",color:"#666",marginTop:"15px",marginBottom:"15px"}}))},_updateActiveProcessesIndicator(){var t,e=this.batchTracker.getActiveTrackingCount(),s=this.state.settings.maxActiveProcesses;this.infoSection&&(t=this.infoSection.querySelector(".abb-active-count"))&&(t.textContent=`Active Analyses: ${e}/`+s,t.style.color=s<=e?"#dc3545":.8*s<=e?"#ffc107":"#28a745")},_hasActiveFilters(){return!(!this.state.searchTerm||""===this.state.searchTerm.trim())||!Object.values(this.state.statusFilters).every(t=>!0===t)},_getStatusCounts(){let e={pending:0,running:0,completed:0,failed:0,cancelled:0};return this.state.batches.forEach(t=>{e.hasOwnProperty(t.status)&&e[t.status]++}),e},_calculateLanguageCounts(t){let e={};return t.forEach(t=>{t=t.meta?.language||"Unknown";e[t]=(e[t]||0)+1}),e},_calculateTotalTokens(t){return t.reduce((t,e)=>t+(e.meta?.tokens?.content?.estimate||0),0)},_getUngroupableReasons(t){if(!t||!Array.isArray(t))return[];let e=new Set;return t.forEach(t=>{t.reason&&e.add(t.reason)}),Array.from(e)},_getBatchAnalysisState(){return{batchGroups:this.state.batchGroups,analyzer:this.analyzer}}};
