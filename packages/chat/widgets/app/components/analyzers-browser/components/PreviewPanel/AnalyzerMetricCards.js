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
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

let DomUtils=require("@gitsense/gsc-utils").DomUtils;class AnalyzerMetricCards{constructor(e){this.container=e,this.h=DomUtils.h}_createCard(e){var a=this.h.createDiv({className:"gsc-am-metric-card",style:{flex:"1",minWidth:"120px",padding:"12px 15px",textAlign:"center",border:"1px solid #eee",borderRadius:"6px",backgroundColor:"#fafafa",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}),t=this.h.createDiv({className:"gsc-am-metric-value",style:{fontSize:"1.4rem",fontWeight:"600",color:"#24292f"},text:e.value}),e=this.h.createDiv({className:"gsc-am-metric-label",style:{fontSize:"0.85rem",color:"#57606a",marginTop:"6px"},text:e.label});return a.appendChild(t),a.appendChild(e),a}render(e){this.container.innerHTML="",Object.assign(this.container.style,{display:"flex",gap:"12px",justifyContent:"flex-start",flexWrap:"wrap",margin:"10px 0 20px 0"}),[{label:"Version",value:e.version},{label:"Last Analysis",value:e.lastAnalysis},{label:"Items Analyzed",value:e.itemsAnalyzed.toLocaleString()},{label:"Repos Analyzed",value:e.reposAnalyzed.toLocaleString()},{label:"Models Used",value:e.modelsUsed.toLocaleString()}].forEach(e=>{this.container.appendChild(this._createCard(e))})}destroy(){this.container.innerHTML=""}}module.exports={AnalyzerMetricCards:AnalyzerMetricCards};
