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

let{VIRTUAL_NODE_TYPES,VIRTUAL_NODE_IDS}=require("../../constants"),Breadcrumb=require("../../../ui/breadcrumb").Breadcrumb,{GitFileView,DataProcessor}=require("../../../git-file-view"),StructuralNodeView=require("./StructuralNodeView").StructuralNodeView,DomUtils=require("@gitsense/gsc-utils").DomUtils,LEAF_NODE_TYPES=new Set([VIRTUAL_NODE_TYPES.FILE,VIRTUAL_NODE_TYPES.TRACEABLE_CODE,VIRTUAL_NODE_TYPES.NON_TRACEABLE_CODE]);class PreviewPanel{constructor(e,t,i,r,s){this.chat=t,this.container=e,this.onBreadcrumbClick=i,this.onDrillDown=r,this.onJumpToMessage=s||null,this.h=DomUtils.h,this.data=null,this.node=null,this.breadcrumbPath=[],this.elements=this._createLayout(),this.gitFileView=null,this.structuralNodeView=null,this.breadcrumb=null,this.resizeListener=null}_createLayout(){var e=this.h.createDiv({className:"gsc-preview-breadcrumb-container",style:{marginBottom:"10px"}}),t=this.h.createDiv({className:"gsc-preview-view-container",style:{padding:"0 0 10px 0"}});return this.container.appendChild(e),this.container.appendChild(t),{breadcrumbContainer:e,viewContainer:t}}_renderBreadcrumb(){var e=this.elements.breadcrumbContainer;e.innerHTML="";let s=[];var t=this.breadcrumbPath[0],i=this.breadcrumbPath[this.breadcrumbPath.length-1],r=new Set([VIRTUAL_NODE_TYPES.REPO_OWNER,VIRTUAL_NODE_TYPES.REPO,VIRTUAL_NODE_TYPES.BRANCH,VIRTUAL_NODE_TYPES.PATH,VIRTUAL_NODE_TYPES.FILE]);if(i.id===VIRTUAL_NODE_IDS.HOME)s=[t];else if(i.type===VIRTUAL_NODE_TYPES.FILE){s.push(t);let e=!1;for(var a of this.breadcrumbPath)(e=a.type===VIRTUAL_NODE_TYPES.REPO_OWNER?!0:e)&&r.has(a.type)&&s.push({id:a.id,name:a.name,type:a.type})}else s=LEAF_NODE_TYPES.has(i.type)?[t,i]:[t];i=s.map((t,e)=>{var i=e===s.length-1;let r;return r=0===e&&!i?this.h.createLink({href:"#",text:t.name,style:{color:"#007bff",textDecoration:"none"},onclick:e=>{e.preventDefault(),this.onBreadcrumbClick(t.id)}}):t.name,{id:t.id,label:r,active:i}});this.breadcrumb&&this.breadcrumb.cleanup(),this.breadcrumb=new Breadcrumb(e,{items:i,separator:" / ",style:{fontSize:"0.9em"}}),this.breadcrumb.render()}updateContent(e,t,i){var r,s;this.node=e,this.data=t,this.breadcrumbPath=i,this.gitFileView&&(this.gitFileView.destroy(),this.gitFileView=null),this.structuralNodeView&&(this.structuralNodeView.destroy(),this.structuralNodeView=null),this.elements.viewContainer.innerHTML="",LEAF_NODE_TYPES.has(e.type)?(r=DataProcessor.processContextBrowserNode(e,t),s={tabs:{content:{enabled:!0,showCopyButton:!0},metadata:{enabled:!0}}},this.onJumpToMessage&&(s.actionElement={type:"link",text:"Close browser and jump to message #"+e.data.message.id,nodeId:e.data.message.id,onClick:e=>{this.onJumpToMessage(e)}}),this.gitFileView=new GitFileView(this.elements.viewContainer,s),this.gitFileView.render(r)):(this.structuralNodeView=new StructuralNodeView(this.elements.viewContainer,t,this.onDrillDown),this.structuralNodeView.render(e,i)),this._renderBreadcrumb()}destroy(){this.gitFileView&&(this.gitFileView.destroy(),this.gitFileView=null),this.structuralNodeView&&(this.structuralNodeView.destroy(),this.structuralNodeView=null),this.breadcrumb&&(this.breadcrumb.cleanup(),this.breadcrumb=null),this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null),this.container.innerHTML=""}}module.exports={PreviewPanel:PreviewPanel};
