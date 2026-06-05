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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,chatApi=require("../../Dependencies").chatApi,TEXT=require("./constants").TEXT,{createButton,createLink}=require("../../utils/helpers");class Selection{constructor(e,t,l){this.container=e,this.callbacks=t,this.context=l,this.selectionElement=null,this.selectAnalyzerLink=null,this._boundHandlers={selectAnalyzerClick:this._handleSelectAnalyzerClick.bind(this)},this.render()}render(){this.selectionElement=DomUtils.h.createDiv({style:{marginTop:"15px"}});var e=DomUtils.h.createDiv({html:TEXT.SELECTION_BLURB,style:{marginBottom:"20px",padding:"12px",backgroundColor:"#f8f9fa",border:"1px solid #e9ecef",borderRadius:"4px",fontSize:"0.95em",lineHeight:"1.5",color:"#495057"}}),t=DomUtils.h.createDiv({style:{display:"flex",gap:"20px",alignItems:"center",marginTop:"15px",flexWrap:"wrap"}});this.selectAnalyzerLink=createButton(TEXT.SELECT_ANALYZER,this._boundHandlers.selectAnalyzerClick,{variant:"primary"}),t.appendChild(this.selectAnalyzerLink),this.selectionElement.appendChild(e),this.selectionElement.appendChild(t),this.container.appendChild(this.selectionElement)}async _handleSelectAnalyzerClick(){var{AnalyzersBrowser:e,BROWSER_MODES:t}=require("../../../analyzers-browser");let l=new e(await chatApi.getAnalyzers(this.context.widget,{includeDescription:!0,includeInsights:!0}),{getAnalyzerDetail:async e=>chatApi.getAnalyzerDetail(this.context.widget,e)},{selectionMode:!0,mode:t.SINGLE,title:"Select Analyzer",onConfirm:e=>{this.callbacks.onSaveClick&&this.callbacks.onSaveClick(e),l.destroy()},onClose:()=>{l.destroy()}});l.show()}cleanup(){this.selectAnalyzerLink&&this.selectAnalyzerLink.removeEventListener("click",this._boundHandlers.selectAnalyzerClick),this.selectionElement&&this.selectionElement.parentElement&&this.selectionElement.remove(),this.selectionElement=null,this.selectAnalyzerLink=null}}module.exports=Selection;
