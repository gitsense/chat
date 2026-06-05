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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,{AnalyzersSection,MetadataSection}=require("../../../metadata-insights-builder");class MetadataConfigurator{constructor(t,e,a,i){this.container=t,this.state={step:e.analyzers&&0<e.analyzers.length?"metadata":"analyzers",analyzers:e.analyzers||[],metadataFields:e.metadataFields||[]},this.callbacks=a,this.context=i,this.activeView=null,this.render()}render(){var t;this.container.innerHTML="","metadata"===this.state.step&&0<this.state.analyzers.length&&((t=DomUtils.h.createLink({text:"← Change Analyzer",href:"#",style:{display:"block",marginBottom:"10px",fontSize:"0.9em",fontWeight:500,color:"#666"}})).addEventListener("click",t=>{t.preventDefault(),this.state.step="analyzers",this.render()}),this.container.appendChild(t)),"analyzers"===this.state.step?this._renderAnalyzersStep():this._renderMetadataStep()}_renderAnalyzersStep(){this.activeView=new AnalyzersSection(this.container,{initialState:{items:this.state.analyzers,isEditing:!0},callbacks:{onSave:t=>{t&&0<t.length&&(this.state.analyzers=t,this.state.step="metadata",this.render())}},mode:"multi",text:{header:"Select Analyzer",description:"Choose the analyzer that contains the metadata fields you want to analyze."}},this.context)}_renderMetadataStep(){this.activeView=new MetadataSection(this.container,{hideFieldsWithoutDescription:!0,initialState:{items:this.state.metadataFields,isEditing:!0},analyzers:this.state.analyzers,callbacks:{onSave:t=>{t&&(this.state.metadataFields=t,this.callbacks.onSave)&&this.callbacks.onSave({analyzers:this.state.analyzers,metadataFields:this.state.metadataFields})}},mode:"selection",text:{header:"Select Metadata Fields",description:"Select the specific metadata fields to include in the analysis."}},this.context)}cleanup(){this.activeView&&(this.activeView.cleanup&&this.activeView.cleanup(),this.activeView=null),this.container.innerHTML=""}}module.exports=MetadataConfigurator;
