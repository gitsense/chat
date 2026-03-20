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

let{DomUtils,formatTokens}=require("@gitsense/gsc-utils");class MetricCards{constructor(e,t){this.container=e,this.onMetricClick=t,this.h=DomUtils.h}_createCard(e){var t=this.h.createDiv({className:"gsc-cm-metric-card",style:{flex:"1",minWidth:"150px",padding:"10px",textAlign:"center",border:"1px solid #eee",borderRadius:"4px",backgroundColor:"#fcfcfc",transition:"background-color 0.2s"}}),r=this.h.createDiv({className:"gsc-cm-metric-value",style:{fontSize:"2rem",fontWeight:"600",color:"#333"},text:e.formatter(e.value)}),a=this.h.createDiv({className:"gsc-cm-metric-label",style:{fontSize:"0.9rem",color:"#666",marginTop:"5px"},text:e.label});return t.addEventListener("click",()=>{this.onMetricClick&&this.onMetricClick(e.id)}),t.appendChild(r),t.appendChild(a),t}render(e){this.container.innerHTML="",Object.assign(this.container.style,{display:"flex",gap:"15px",justifyContent:"center",flexWrap:"wrap",margin:"15px 0 25px 0"}),[{id:"totalMessages",value:e.totalMessages,label:"Messages",formatter:e=>e.toLocaleString()},{id:"curatedTokens",value:e.curatedTokens,label:"Curated Tokens",formatter:formatTokens},{id:"generatedTokens",value:e.generatedTokens,label:"Generated Tokens",formatter:formatTokens},{id:"curatedLines",value:e.curatedLines,label:"Curated Lines",formatter:e=>e.toLocaleString()},{id:"generatedLines",value:e.generatedLines,label:"Generated Lines",formatter:e=>e.toLocaleString()}].forEach(e=>{this.container.appendChild(this._createCard(e))})}destroy(){this.container.innerHTML=""}}module.exports={MetricCards:MetricCards};
