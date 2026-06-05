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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,PromptBox=require("../../../ui/prompt-box").PromptBox,Tabs=require("../../../ui/tabs").Tabs,{HELP_TABS,HELP_MODAL_CONFIG}=require("./constants"),overviewContent=require("./content/overview.md.js"),codeProvenanceContent=require("./content/code-provenance.md.js"),scoutContent=require("./content/scout.md.js"),contractContent=require("./content/contract.md.js"),h=DomUtils.h;class Help{constructor(t){this.context=t,this.promptBox=new PromptBox,this.tabs=null,this.currentTabId=HELP_MODAL_CONFIG.defaultTab,this.tabContentElements={},this.h=DomUtils.h}show(){var t=this.h.createDiv({cls:"markdown-body",style:{fontSize:"15px"}});this._createTabs(t),this.promptBox.show({title:HELP_MODAL_CONFIG.title,content:t,minWidth:HELP_MODAL_CONFIG.minWidth||"768px",maxWidth:HELP_MODAL_CONFIG.maxWidth||null,showCloseButton:!0,closeOnOverlayClick:!0})}hide(){this.promptBox.hide()}_createTabs(e){var t=HELP_TABS.map(t=>{var e=this.h.createDiv({cls:"gsc-help-tab-pane "+(t.id===this.currentTabId?"active":"")});return this.tabContentElements[t.id]=e,this._loadTabContent(t,e),{id:t.id,label:t.label,content:e}}),n=this.h.createDiv();this.tabs=new Tabs(n,{tabs:t,initialActiveTab:this.currentTabId,onTabChange:(t,e)=>{this._handleTabChange(t,e)}}),this.tabs.render(),e.appendChild(n),t.forEach(t=>{e.appendChild(t.content)})}_loadTabContent(e,n){try{var t={overview:overviewContent,"code-provenance":codeProvenanceContent,scout:scoutContent,contract:contractContent}[e.id][this._getContentKey(e.id)],o=this.context.md.render(t);n.innerHTML=o}catch(t){console.error(`Failed to load content for tab ${e.id}:`,t),n.innerHTML=`<p>Error loading content: ${t.message}</p>`}}_handleTabChange(t,e){this.tabContentElements[e]&&this.tabContentElements[e].classList.remove("active"),this.tabContentElements[t]&&this.tabContentElements[t].classList.add("active"),this.currentTabId=t}_getContentKey(t){return{overview:"OVERVIEW_CONTENT","code-provenance":"CODE_PROVENANCE_CONTENT",scout:"SCOUT_CONTENT",contract:"CONTRACT_CONTENT"}[t]||"CONTENT"}cleanup(){this.tabs&&this.tabs.cleanup(),this.promptBox.destroy(),this.tabContentElements={}}}module.exports=Help;
