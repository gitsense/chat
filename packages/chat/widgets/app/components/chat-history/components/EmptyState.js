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

let{DomUtils,SVGUtils}=require("@gitsense/gsc-utils"),triggerFileSelection=require("../utils").triggerFileSelection,Tabs=require("../../ui/tabs").Tabs;class EmptyState{constructor(t,e={}){if(!t)throw new Error("EmptyState requires a container element.");this.container=t,this.options={onImport:e.onImport||null,onErgonomicChatsClick:e.onErgonomicChatsClick||null,onSmarterAgentsClick:e.onSmarterAgentsClick||null,onTryDemoLink:e.onTryDemoLink||null,...e},this.h=DomUtils.h,this.elements={},this.tabsInstance=null}render(){this.container.innerHTML="",this.elements.container=this.h.createDiv({cls:"gsc-chat-history-empty-state"}),this.elements.icon=this.h.createDiv({cls:"gsc-chat-history-empty-state-icon",append:[SVGUtils.commentDiscussions24({style:{height:"75px",width:"75px",fill:"#555"}})]}),this.elements.title=this.h.createH2({cls:"gsc-chat-history-empty-state-title",text:"Welcome! Start your first conversation"}),this.elements.description=this.h.createP({cls:"gsc-chat-history-empty-state-description",text:"Your conversation history will appear here once you start chatting."}),this.elements.featuresSection=this._createFeaturesSection(),this.elements.container.appendChild(this.elements.icon),this.elements.container.appendChild(this.elements.title),this.elements.container.appendChild(this.elements.featuresSection),this.container.appendChild(this.elements.container)}_createFeaturesSection(){var t=this.h.createDiv({cls:"gsc-chat-history-empty-state-features"}),e=(this.h.createH3({style:{marginTop:"20px",marginBottom:"10px",fontSize:"18px",color:"#334155",textAlign:"center"},text:"Chat Smarter, Build Faster"}),this.h.createP({style:{color:"#475569",marginBottom:"20px",fontSize:"15px",textAlign:"center",lineHeight:1.7}})),i=(e.appendChild(this.h.createTextNode("Start with ")),this.h.createA({text:"Ergonomic Chats 101",href:"#",style:{fontWeight:600},onclick:t=>{t.preventDefault(),this.options.onErgonomicChatsClick&&this.options.onErgonomicChatsClick()}})),i=(e.appendChild(i),e.appendChild(this.h.createTextNode(" for a quick introduction, ")),this.h.createA({text:"Smarter Agents 101",href:"#",style:{fontWeight:600},onclick:t=>{t.preventDefault(),this.options.onSmarterAgentsClick&&this.options.onSmarterAgentsClick()}})),i=(e.appendChild(i),e.appendChild(this.h.createTextNode(" to learn how to save money and scale coding agents, or try ")),this.h.createA({text:"Interactive Demos",href:"#",style:{fontWeight:600},onclick:t=>{t.preventDefault(),this.options.onTryDemoLink&&this.options.onTryDemoLink()}}));return e.appendChild(i),e.appendChild(this.h.createTextNode(" to explore on your own.")),t.appendChild(e),t}_updateTabContent(t,e){t.innerHTML="";let i=this.h.createUl({style:{paddingLeft:"20px",margin:"0"}});e.forEach(t=>{t=this.h.createLi({style:{color:"#475569",marginBottom:"10px",lineHeight:"1.4"},html:t});i.appendChild(t)}),t.appendChild(i)}destroy(){this.tabsInstance&&this.tabsInstance.cleanup(),this.container.innerHTML="",this.elements={}}}module.exports={EmptyState:EmptyState};
