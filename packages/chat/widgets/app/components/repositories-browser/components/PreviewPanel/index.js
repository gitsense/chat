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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,Breadcrumb=require("../../../ui/breadcrumb").Breadcrumb,{VIRTUAL_NODE_IDS,VIRTUAL_NODE_TYPES}=require("../../constants"),HomeView=require("./HomeView").HomeView;class PreviewPanel{constructor(e,i,t){this.container=e,this.context=i,this.onBreadcrumbClick=t,this.h=DomUtils.h,this.node=null,this.breadcrumbPath=[],this.data={},this.homeTitle=null,this.homeDescription=null,this.elements=this._createLayout(),this.breadcrumb=null,this.activeView=null}_createLayout(){var e=this.h.createDiv({className:"gsc-preview-breadcrumb-container",style:{marginBottom:"10px"}}),i=this.h.createDiv({className:"gsc-preview-view-container",style:{padding:"0 0 10px 0"}});return this.container.appendChild(e),this.container.appendChild(i),{breadcrumbContainer:e,viewContainer:i}}_renderBreadcrumb(){var e,i,t=this.elements.breadcrumbContainer;t.innerHTML="",this.node&&(e=[],i=this.node.type!==VIRTUAL_NODE_TYPES.FILE,e.push({id:VIRTUAL_NODE_IDS.HOME,label:"Home",active:i,onClick:i?null:e=>{e.preventDefault(),this.onBreadcrumbClick(VIRTUAL_NODE_IDS.HOME)}}),this.node.type===VIRTUAL_NODE_TYPES.FILE&&(i=this.breadcrumbPath.map(e=>e.name).slice(1).join(" / "),e.push({id:this.node.id,label:i,active:!0,onClick:null})),this.breadcrumb&&this.breadcrumb.cleanup(),this.breadcrumb=new Breadcrumb(t,{items:e,separator:" / ",style:{fontSize:"0.9em"}}),this.breadcrumb.render())}updateContent(e,i,t){this.node=e,this.breadcrumbPath=i,this.data=t,this.activeView&&(this.activeView.destroy(),this.activeView=null),this.elements.viewContainer.innerHTML="",e.type===VIRTUAL_NODE_TYPES.FILE?this.elements.viewContainer.innerHTML=`
                <h2>File View Placeholder</h2>
                <p>Node clicked: ${e.name} (ID: ${e.id})</p>
                <p>Content fetching logic will go here.</p>
            `:(this.activeView=new HomeView(this.elements.viewContainer,this.context,{reposTreeData:this.reposTreeData,actionButtonText:this.actionButtonText,onActionClick:this.onActionClick,onFileClick:this.onFileClick,homeTitle:this.homeTitle,homeDescription:this.homeDescription}),this.activeView.render(e,t)),this._renderBreadcrumb()}setHomeViewOptions(e,i,t,r,n,s){this.reposTreeData=e,this.actionButtonText=i,this.onActionClick=t,this.homeTitle=n,this.homeDescription=s,this.onFileClick=r}destroy(){this.breadcrumb&&this.breadcrumb.cleanup(),this.activeView&&this.activeView.destroy(),this.container.innerHTML=""}}module.exports={PreviewPanel:PreviewPanel};
