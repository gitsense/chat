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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,ForkConfig=require("../sections/BatchAnalysisSection/ForkConfig");class ForkView{constructor(t,e,i,s){this.container=t,this.state=e,this.callbacks=i,this.context=s,this.forkConfig=null,this.viewElement=null,this.render()}render(){this.viewElement=DomUtils.h.createDiv({cls:"abb-fork-view"});var t=DomUtils.h.createDiv(),e={...this.context,settings:{...this.context.settings,models:this.context.settings?.models||[]}};this.forkConfig=new ForkConfig(t,e,this.state.sections.analyzer.analyzer,{onForkConfig:t=>{this.callbacks.onForkConfig&&this.callbacks.onForkConfig(t)}}),this.viewElement.appendChild(t),this.container.appendChild(this.viewElement)}update(t){this.state=t,this.forkConfig&&this.forkConfig.update({context:this.context,currentAnalyzer:this.state.sections.analyzer.analyzer})}setVisible(t){this.viewElement&&(this.viewElement.style.display=t?"block":"none")}cleanup(){this.forkConfig&&this.forkConfig.cleanup(),this.viewElement&&this.viewElement.parentElement&&this.viewElement.remove(),this.forkConfig=null,this.viewElement=null}}module.exports=ForkView;
