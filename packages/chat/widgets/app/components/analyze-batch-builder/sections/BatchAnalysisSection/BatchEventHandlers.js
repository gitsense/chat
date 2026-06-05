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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{chatApi,ConfirmationBox}=require("../../Dependencies"),TEXT=require("./constants").TEXT,BatchReviewBrowser=require("../../../batch-review-browser").BatchReviewBrowser,TimeoutModal=require("./TimeoutModal");module.exports={_handleSearchChange(t){this.state.searchTerm=t.target.value,this.state.currentPage=1,this._updateUI()},_handlePageChange(t){this.state.currentPage=t,this._updateUI()},_handleItemsPerPageChange(t){this.state.itemsPerPage=t,this.state.currentPage=1,this._updateUI()},_handleSettingsChange(t){this.state.settings={...this.state.settings,...t},this.callbacks.onSettingsChange&&this.callbacks.onSettingsChange(this.state.settings)},_handleStatusFilterChange(t){this.state.statusFilters={...this.state.statusFilters,...t},this.state.currentPage=1,this._updateUI()},_handleFilesCountClick(t){var e=t.fileIds.map(e=>this.filesSection.state.items.find(t=>t.id===e)).filter(Boolean),s=t.referenceFileIds.map(e=>this.referenceFilesSection.state.items.find(t=>t.id===e)).filter(Boolean);new BatchReviewBrowser(this.context,{batch:t,referenceFiles:s,filesToAnalyze:e,chatApi:chatApi,onClose:()=>{}}).show()},_canStartNewAnalysis(){return this.batchTracker.getActiveTrackingCount()<this.state.settings.maxActiveProcesses},_showMaxActiveProcessesWarning(){var t=new ConfirmationBox,e=this.batchTracker.getActiveTrackingCount(),s=this.state.settings.maxActiveProcesses;t.show({title:TEXT.MAX_ACTIVE_PROCESSES_TITLE,message:TEXT.MAX_ACTIVE_PROCESSES_MESSAGE.replace("{active}",e).replace("{max}",s),confirmButtonText:"OK",showCancelButton:!1,width:"400px"},()=>{})},_handleResetClick(){(new ConfirmationBox).show({title:"Reset",htmlMessage:"This will permanently delete all batch jobs and their analysis status. This action cannot be undone.<br><br>Are you sure you want to continue?",confirmButtonText:"Reset Batches",cancelButtonText:"Cancel",confirmButtonLoadingText:"Resetting..."},async()=>{await this._resetAllBatches()})},async _resetAllBatches(){this.batchTracker&&this.batchTracker.stopAllTracking(),this.state.batchJobs=[],this.state.batches=[],this.state.bulkBatchJobs=[],this.state.currentPage=1,this.state.searchTerm="",this.state.statusFilters={pending:!1,running:!1,completed:!1,failed:!1,cancelled:!1},this.state.hasBatches=!1,this.state.batchGroups=[],await this._saveBatchState(),window.location.reload()},_showTimeoutModal(t){var e;this.timeoutModal?this.timeoutModal.update(t,this.state.settings.batchTimeoutSeconds):(e=DomUtils.h.createDiv(),this.container.appendChild(e),this.timeoutModal=new TimeoutModal(e,{batch:t,currentTimeout:this.state.settings.batchTimeoutSeconds,onCheckAgain:this._boundHandlers.timeoutCheckAgain,onIncreaseTimeout:this._boundHandlers.timeoutIncreaseTimeout,onCancel:this._boundHandlers.timeoutCancel})),this.timeoutModal.show()},_handleTimeoutCheckAgain(t){},_handleTimeoutIncreaseTimeout(t,e){this.state.settings.batchTimeoutSeconds=e,this.settings&&this.settings.updateSettings({batchTimeoutSeconds:e})},_handleTimeoutCancel(t){},_handleVisibilityChange(){document.hidden&&this.savePending&&(this.saveDebounceTimer&&clearTimeout(this.saveDebounceTimer),this._saveBatchState().catch(t=>{console.error("Failed to save state on visibility change:",t)}))},_handleBeforeUnload(){this.batchTracker&&this.batchTracker.hasActiveTracking()&&this._saveBatchState().catch(t=>{console.error("Failed to save state on page unload:",t)})}};
