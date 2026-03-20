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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,HomeView=require("./HomeView").HomeView;class PreviewPanel{constructor(e,i,t,h,s){this.container=e,this.chats=i||[],this.onChatClick=t,this.decorateRow=h,this.onSortChange=s,this.homeView=null,this.h=DomUtils.h,this.elements=this._createLayout(),this.render()}_createLayout(){this.container.innerHTML="";var e=this.h.createDiv({id:"gsc-chats-preview-panel",style:{height:"100%",display:"flex",flexDirection:"column",padding:"20px 25px 0px 25px",backgroundColor:"#ffffff"}}),i=this.h.createDiv({id:"gsc-chats-preview-view-container",style:{flexGrow:"1",display:"flex",flexDirection:"column"}});return e.appendChild(i),this.container.appendChild(e),{container:e,viewContainer:i}}render(){this.homeView&&(this.homeView.destroy(),this.homeView=null),this.homeView=new HomeView(this.elements.viewContainer,this.chats,e=>{this.onChatClick&&this.onChatClick(e)},e=>{this.decorateRow&&this.decorateRow(e)}),this.onSortChange&&this.homeView.setSortChangeCallback(this.onSortChange),this.homeView.render()}updateChats(e){this.chats=e||[],this.homeView&&this.homeView.updateChats(this.chats)}updateFilteredChats(e){this.homeView&&this.homeView.updateFilteredChats(e)}destroy(){this.homeView&&(this.homeView.destroy(),this.homeView=null),this.container.innerHTML="",this.elements={}}}module.exports={PreviewPanel:PreviewPanel};
