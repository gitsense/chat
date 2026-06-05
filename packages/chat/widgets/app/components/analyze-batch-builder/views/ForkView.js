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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,ForkConfig=require("../sections/BatchAnalysisSection/ForkConfig");class ForkView{constructor(t,e,i,s){this.container=t,this.state=e,this.callbacks=i,this.context=s,this.forkConfig=null,this.viewElement=null,this.render()}render(){this.viewElement=DomUtils.h.createDiv({cls:"abb-fork-view"});var t=DomUtils.h.createDiv(),e={...this.context,settings:{...this.context.settings,models:this.context.settings?.models||[]}};this.forkConfig=new ForkConfig(t,e,this.state.sections.analyzer.analyzer,{onForkConfig:t=>{this.callbacks.onForkConfig&&this.callbacks.onForkConfig(t)}}),this.viewElement.appendChild(t),this.container.appendChild(this.viewElement)}update(t){this.state=t,this.forkConfig&&this.forkConfig.update({context:this.context,currentAnalyzer:this.state.sections.analyzer.analyzer})}setVisible(t){this.viewElement&&(this.viewElement.style.display=t?"block":"none")}cleanup(){this.forkConfig&&this.forkConfig.cleanup(),this.viewElement&&this.viewElement.parentElement&&this.viewElement.remove(),this.forkConfig=null,this.viewElement=null}}module.exports=ForkView;
