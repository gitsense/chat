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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,Breadcrumb=require("../../../ui/breadcrumb").Breadcrumb,{BATCH_NODE_TYPES,BATCH_NODE_IDS}=require("../../constants"),HomeView=require("./HomeView").HomeView,FileView=require("./FileView").FileView;class PreviewPanel{constructor(e,t,i={}){this.container=e,this.context=t,this.onBreadcrumbClick=i.onBreadcrumbClick||null,this.onNodeDrillDown=i.onNodeDrillDown||null,this.h=DomUtils.h,this.data=null,this.node=null,this.breadcrumbPath=[],this.elements=this._createLayout(),this.breadcrumb=null,this.currentView=null}_createLayout(){var e=this.h.createDiv({className:"gsc-brb-breadcrumb-container",style:{marginBottom:"10px"}}),t=this.h.createDiv({className:"gsc-brb-view-container",style:{padding:"0 0 10px 0"}});return this.container.appendChild(e),this.container.appendChild(t),{breadcrumbContainer:e,viewContainer:t}}_renderBreadcrumb(){var e=this.elements.breadcrumbContainer,t=(e.innerHTML="",this.breadcrumbPath.map((t,e)=>{var e=e===this.breadcrumbPath.length-1,i=t.type===BATCH_NODE_TYPES.BATCH,r=t.type===BATCH_NODE_TYPES.FILE;let n;return n=!e&&(i||r)&&this.onBreadcrumbClick?this.h.createLink({href:"#",text:t.name,style:{color:"#007bff",textDecoration:"none"},onclick:e=>{e.preventDefault(),this.onBreadcrumbClick(t.id)}}):t.name,{id:t.id,label:n,active:e}}));this.breadcrumb&&this.breadcrumb.cleanup(),this.breadcrumb=new Breadcrumb(e,{items:t,separator:" / ",style:{fontSize:"0.9em"}}),this.breadcrumb.render()}updateContent(e,t,i){this.node=e,this.data=t,this.breadcrumbPath=i,this.currentView&&(this.currentView.destroy(),this.currentView=null),this.elements.viewContainer.innerHTML="",e.type===BATCH_NODE_TYPES.BATCH?(this.currentView=new HomeView(this.elements.viewContainer,this.data,this.context,{onFileClick:e=>{this.onBreadcrumbClick&&this.onBreadcrumbClick(e)}}),this.currentView.render()):e.type===BATCH_NODE_TYPES.FILE?(this.currentView=new FileView(this.elements.viewContainer,this.node,this.context),this.currentView.render(this.breadcrumbPath)):this._renderBasicNodeInfo(),this._renderBreadcrumb()}_renderBasicNodeInfo(){var e,t,i,r=this.h.createDiv({style:{padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"4px"}}),n=this.h.createH3({text:"Selected: "+this.node.name,style:{margin:"0 0 10px 0"}}),a=this.h.createDiv({text:"Type: "+this.node.type,style:{marginBottom:"5px"}}),s=this.h.createDiv({text:"ID: "+this.node.id,style:{marginBottom:"5px"}});this.node.type===BATCH_NODE_TYPES.FILE&&this.node.data&&this.node.data.file&&(i=this.node.data.file,e=this.h.createDiv({text:"File ID: "+i.id,style:{marginBottom:"5px"}}),t=this.h.createDiv({text:"Path: "+(i.meta?.path||"Unknown"),style:{marginBottom:"5px"}}),i=this.h.createDiv({text:`Size: ${i.meta?.size||0} bytes`,style:{marginBottom:"5px"}}),r.appendChild(e),r.appendChild(t),r.appendChild(i)),r.appendChild(n),r.appendChild(a),r.appendChild(s),this.elements.viewContainer.appendChild(r)}destroy(){this.breadcrumb&&(this.breadcrumb.cleanup(),this.breadcrumb=null),this.currentView&&(this.currentView.destroy(),this.currentView=null),this.container.innerHTML=""}}module.exports={PreviewPanel:PreviewPanel};
