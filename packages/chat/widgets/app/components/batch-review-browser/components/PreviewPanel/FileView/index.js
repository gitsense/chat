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

let Tabs=require("../../../../ui/tabs").Tabs,DomUtils=require("@gitsense/gsc-utils").DomUtils,FileContentView=require("./tabs/FileContentView").FileContentView;class FileView{constructor(e,t,i,n=0){this.container=e,this.node=t,this.context=i,this.h=DomUtils.h,this.activeTab="content",this.elements=this._createLayout(),this.tabs=null,this.currentTabView=null}_createLayout(){var e=this.h.createDiv({className:"gsc-brb-file-tabs-container",style:{marginBottom:"15px"}}),t=this.h.createDiv({className:"gsc-brb-file-view-container",style:{padding:"0 0 10px 0"}});return this.container.appendChild(e),this.container.appendChild(t),{tabsContainer:e,viewContainer:t}}_renderTabs(){var e=this.elements.tabsContainer;e.innerHTML="";this.tabs=new Tabs(e,{tabs:[{id:"content",label:"Content"}],initialActiveTab:this.activeTab,onTabChange:e=>{this.activeTab!==e&&(this.activeTab=e,this._renderActiveTabView())}}),this.tabs.render()}_renderActiveTabView(){this.currentTabView&&(this.currentTabView.destroy(),this.currentTabView=null),this.elements.viewContainer.innerHTML="","content"===this.activeTab&&(this.currentTabView=new FileContentView(this.elements.viewContainer,this.node,this.context)),this.currentTabView&&this.currentTabView.render()}render(e){this._renderTabs(),this._renderActiveTabView()}destroy(){this.tabs&&(this.tabs.cleanup(),this.tabs=null),this.currentTabView&&(this.currentTabView.destroy(),this.currentTabView=null),this.container.innerHTML=""}}module.exports={FileView:FileView};
