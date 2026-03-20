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

let Tabs=require("../../../../ui/tabs").Tabs,DomUtils=require("@gitsense/gsc-utils").DomUtils,ReferenceFilesView=require("./tabs/ReferenceFilesView").ReferenceFilesView,FilesToAnalyzeView=require("./tabs/FilesToAnalyzeView").FilesToAnalyzeView;class HomeView{constructor(e,i,t,s={}){this.container=e,this.data=i,this.context=t,this.onFileClick=s.onFileClick||null,this.h=DomUtils.h,this.activeTab="analyze",this.elements=this._createLayout(),this.tabs=null,this.currentTabView=null}_createLayout(){var e=this.h.createDiv({className:"gsc-brb-home-tabs-container",style:{marginBottom:"15px"}}),i=this.h.createDiv({className:"gsc-brb-home-view-container",style:{padding:"0 0 10px 0"}});return this.container.appendChild(e),this.container.appendChild(i),{tabsContainer:e,viewContainer:i}}_renderTabs(){var e=this.elements.tabsContainer,i=(e.innerHTML="",this.activeTab="analyze",[{id:"reference",label:`Reference Files (${this.data.referenceFiles.length})`},{id:"analyze",label:`Files to Analyze (${this.data.filesToAnalyze.length})`}]);this.tabs=new Tabs(e,{tabs:i,initialActiveTab:this.activeTab,onTabChange:e=>{this.activeTab=e,this._renderActiveTabView()}}),this.tabs.render()}_renderActiveTabView(){this.currentTabView&&(this.currentTabView.destroy(),this.currentTabView=null),this.elements.viewContainer.innerHTML="","reference"===this.activeTab?this.currentTabView=new ReferenceFilesView(this.elements.viewContainer,this.data.referenceFiles,{onFileClick:e=>{e="file-"+e.id;this.onFileClick&&this.onFileClick(e)}}):"analyze"===this.activeTab&&(this.currentTabView=new FilesToAnalyzeView(this.elements.viewContainer,this.data.filesToAnalyze,{onFileClick:e=>{e="file-"+e.id;this.onFileClick&&this.onFileClick(e)}})),this.currentTabView&&this.currentTabView.render()}render(){this._renderTabs(),this._renderActiveTabView()}destroy(){this.tabs&&(this.tabs.cleanup(),this.tabs=null),this.currentTabView&&(this.currentTabView.destroy(),this.currentTabView=null),this.container.innerHTML=""}}module.exports={HomeView:HomeView};
