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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,METADATA_INSIGHT_RESULT_CONSTANTS=require("../constants").METADATA_INSIGHT_RESULT_CONSTANTS;class ResultsCount{constructor(t,e={}){if(!t)throw new Error("ResultsCount: Container is required");this.container=t,this.config={initialData:{currentCount:0,baseDatasetCount:0,hasActiveFilters:!1,visibleFieldsCount:0,maxVisibleFields:3},options:{showFilterInfo:!0,...e.options},...e},this.countElement=null,this.currentData={...this.config.initialData},this._initialize()}_initialize(){this._render()}_render(){this.countElement=DomUtils.h.createDiv({cls:METADATA_INSIGHT_RESULT_CONSTANTS.CSS_CLASSES.RESULTS_COUNT,style:{fontSize:"14px",color:"#6c757d",marginBottom:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}),this.resultsTextElement=DomUtils.h.createSpan({style:{fontWeight:"500"}}),this.filterInfoElement=DomUtils.h.createSpan({style:{fontSize:"12px",color:"#007bff",fontStyle:"italic"}}),this.countElement.appendChild(this.resultsTextElement),this.config.options.showFilterInfo&&this.countElement.appendChild(this.filterInfoElement),this._updateDisplay(),this.container.appendChild(this.countElement)}_updateDisplay(){var t,e,i,s;this.resultsTextElement&&({currentCount:t,baseDatasetCount:e,visibleFieldsCount:i,maxVisibleFields:s}=this.currentData,this.resultsTextElement.textContent=t===e?`Showing all ${e} files with ${i} metadata columns (max ${s} visible)`:`Showing ${t} of ${e} results with ${i} metadata columns (max ${s} visible)`,this.filterInfoElement)&&this.config.options.showFilterInfo&&(this.currentData.hasActiveFilters?(this.filterInfoElement.textContent="(filtered)",this.filterInfoElement.style.display="inline"):this.filterInfoElement.style.display="none")}updateCount(t){this.currentData={currentCount:t.currentCount||0,baseDatasetCount:t.baseDatasetCount||0,hasActiveFilters:t.hasActiveFilters||!1,visibleFieldsCount:t.visibleFieldsCount||0,maxVisibleFields:t.maxVisibleFields||3},this._updateDisplay()}updateCurrentCount(t){this.currentData.currentCount=t,this._updateDisplay()}updateBaseDatasetCount(t){this.currentData.baseDatasetCount=t,this._updateDisplay()}updateFilterState(t){this.currentData.hasActiveFilters=t,this._updateDisplay()}updateVisibleFieldsCount(t){this.currentData.visibleFieldsCount=t,this._updateDisplay()}updateMaxVisibleFields(t){this.currentData.maxVisibleFields=t,this._updateDisplay()}getCurrentData(){return{...this.currentData}}getCurrentCount(){return this.currentData.currentCount}getBaseDatasetCount(){return this.currentData.baseDatasetCount}hasActiveFilters(){return this.currentData.hasActiveFilters}getVisibleFieldsCount(){return this.currentData.visibleFieldsCount}getMaxVisibleFields(){return this.currentData.maxVisibleFields}showFilterInfo(t){this.config.options.showFilterInfo=t,this.filterInfoElement&&(this.filterInfoElement.style.display=t?"inline":"none")}setColor(t){this.countElement&&(this.countElement.style.color=t)}setFontSize(t){this.countElement&&(this.countElement.style.fontSize=t)}cleanup(){this.countElement&&this.countElement.parentElement&&this.countElement.remove(),this.countElement=null,this.resultsTextElement=null,this.filterInfoElement=null}}module.exports=ResultsCount;
