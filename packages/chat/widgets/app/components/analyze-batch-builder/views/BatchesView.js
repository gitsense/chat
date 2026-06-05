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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,BatchAnalysisSection=require("../sections/BatchAnalysisSection");class BatchesView{constructor(t,e,s,i,a){this.container=t,this.state=e,this.callbacks=s,this.context=i,this.sections=a,this.batchAnalysisSection=null,this.viewElement=null,this.render()}render(){this.viewElement=DomUtils.h.createDiv({cls:"abb-batches-view"});var t=DomUtils.h.createDiv(),e=this.callbacks.getBatchAnalysisState();this.batchAnalysisSection=new BatchAnalysisSection(t,e,this.context,this.state.sections.analyzer.analyzer,this.sections.filesToAnalyze,this.sections.referenceFiles,{onBatchJobUpdate:this.callbacks.onBatchJobUpdate,onForkConfig:this.callbacks.onForkConfig,onBulkBatchJobCreated:this.callbacks.onBulkBatchJobCreated}),this.viewElement.appendChild(t),this.container.appendChild(this.viewElement)}update(t,e){this.state=t,this.sections=e,this.batchAnalysisSection&&(t=this.callbacks.getBatchAnalysisState(),this.batchAnalysisSection.update(this.state.sections.analyzer.analyzer,t))}getBatchCount(){var t=this.callbacks.getBatchAnalysisState();return t.batchGroups?t.batchGroups.length:0}setVisible(t){this.viewElement&&(this.viewElement.style.display=t?"block":"none")}cleanup(){this.batchAnalysisSection&&this.batchAnalysisSection.cleanup(),this.viewElement&&this.viewElement.parentElement&&this.viewElement.remove(),this.batchAnalysisSection=null,this.viewElement=null}}module.exports=BatchesView;
