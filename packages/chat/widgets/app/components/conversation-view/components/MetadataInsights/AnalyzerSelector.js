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

let DomUtils=require("../../utils/DomUtils"),getAnalyzers=require("../../Dependencies").getAnalyzers,Table=require("../../Dependencies").Table,h=DomUtils.h;class AnalyzerSelector{constructor(e,t,a){this.parentElem=e,this.context=t,this.onAnalyzerSelected=a,this.tableInstance=null,this.analyzers=null,this._handleSelectAnalyzerClick=this._handleSelectAnalyzerClick.bind(this),this._renderTable(),this._loadAnalyzersAndRenderTable()}_renderTable(){this.parentElem.appendChild(h.createP({text:"Select an analyzer"}));var e=[{id:"analyzer",header:"Analyzer",width:"auto",whiteSpace:"normal",renderCell:e=>h.createDiv({append:[h.createSpan({text:e.name,style:{fontWeight:"600"}}),h.createBr(),h.createSpan({text:e.description||"No description available.",style:{fontSize:".9em",color:"#666"}})]})},{id:"select",header:"Select",width:"80px",textAlign:"center",verticalAlign:"middle",whiteSpace:"normal",renderCell:t=>{var e=h.createLink({text:"Select",href:"#",cls:"select-analyzer-link",dataset:{analyzerId:t.id}});return e.addEventListener("click",e=>this._handleSelectAnalyzerClick(e,t)),e}}];this.tableInstance=new Table(this.parentElem,{columns:e,options:{maxBodyHeight:"300px",emptyMessage:"No analyzers available."}})}async _loadAnalyzersAndRenderTable(){try{this.analyzers=await getAnalyzers(this.context.widget,!0)||[],this.tableInstance.updateData(this.analyzers)}catch(e){console.error("Error loading analyzers:",e),this.tableInstance.updateData([])}}_handleSelectAnalyzerClick(e,t){e.preventDefault(),t&&this.onAnalyzerSelected(t)}cleanup(){this.tableInstance&&this.tableInstance.cleanup(),console.log("Cleaned up AnalyzerSelector.")}}module.exports=AnalyzerSelector;
