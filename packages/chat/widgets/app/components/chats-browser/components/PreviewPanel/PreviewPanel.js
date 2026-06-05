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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,HomeView=require("./HomeView").HomeView;class PreviewPanel{constructor(e,i,t,h,s){this.container=e,this.chats=i||[],this.onChatClick=t,this.decorateRow=h,this.onSortChange=s,this.homeView=null,this.h=DomUtils.h,this.elements=this._createLayout(),this.render()}_createLayout(){this.container.innerHTML="";var e=this.h.createDiv({id:"gsc-chats-preview-panel",style:{height:"100%",display:"flex",flexDirection:"column",padding:"20px 25px 0px 25px",backgroundColor:"#ffffff"}}),i=this.h.createDiv({id:"gsc-chats-preview-view-container",style:{flexGrow:"1",display:"flex",flexDirection:"column"}});return e.appendChild(i),this.container.appendChild(e),{container:e,viewContainer:i}}render(){this.homeView&&(this.homeView.destroy(),this.homeView=null),this.homeView=new HomeView(this.elements.viewContainer,this.chats,e=>{this.onChatClick&&this.onChatClick(e)},e=>{this.decorateRow&&this.decorateRow(e)}),this.onSortChange&&this.homeView.setSortChangeCallback(this.onSortChange),this.homeView.render()}updateChats(e){this.chats=e||[],this.homeView&&this.homeView.updateChats(this.chats)}updateFilteredChats(e){this.homeView&&this.homeView.updateFilteredChats(e)}destroy(){this.homeView&&(this.homeView.destroy(),this.homeView=null),this.container.innerHTML="",this.elements={}}}module.exports={PreviewPanel:PreviewPanel};
