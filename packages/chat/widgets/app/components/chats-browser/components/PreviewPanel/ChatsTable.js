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

let{DomUtils,DateUtils}=require("@gitsense/gsc-utils"),Table=require("../../../ui/table").Table,ChatNavigationPrompt=require("./ChatNavigationPrompt").ChatNavigationPrompt;class ChatsTable{constructor(t,e){if(!t)throw new Error("ChatsTable requires a containerElement.");if(!e||!Array.isArray(e.chats))throw new Error("ChatsTable requires a config object with a chats array.");if("function"!=typeof e.onChatClick)throw new Error("ChatsTable requires an onChatClick callback function.");this.containerElement=t,this.config=e,this.chats=e.chats||[],this.table=null,this.h=DomUtils.h}render(){this.containerElement.innerHTML="";var t=this._getColumnConfig(),e=(this.table=new Table(this.containerElement,{columns:t,options:{emptyMessage:"No chats found.",cellPadding:"10px",fontSize:"14px",addMarkdownBodyClass:!0}}),this._setupEventDelegation(),this.updateData(this.chats),()=>{this.table&&(this.table.refreshColumnWidths(!0),this.table.refreshOptions({maxBodyHeight:-105}))});for(let t=1;t<10;t++)setTimeout(e,100*t)}_getColumnConfig(){return[{id:"root",header:"Root Chat",width:"250px",renderCell:e=>{var t=this.h.createDiv({style:{}}),a=this.h.createA({text:e.root_chat_name||"Root Chat",href:"#",style:{textDecoration:"none",color:"#0366d6",cursor:"pointer"}});return a.addEventListener("click",t=>{t.preventDefault(),this._handleRootChatClick(e)}),t.appendChild(a),t}},{id:"name",header:"Name",width:"auto",renderCell:e=>{var t=this.h.createDiv({style:{display:"flex",alignItems:"center"}}),a=20*(e.level||0),a=this.h.createDiv({style:{width:a+"px",height:"1px"}}),a=(t.appendChild(a),this.h.createA({text:e.name||"Untitled Chat",href:"#",style:{textDecoration:"none",color:"#0366d6",cursor:"pointer"}}));return a.addEventListener("click",t=>{t.preventDefault(),this._handleChatClick(e)}),t.appendChild(a),t}},{id:"message_count",header:"Msgs",width:"80px",textAlign:"center",renderCell:t=>this.h.createDiv({text:t.message_count.toString(),style:{textAlign:"center"}})},{id:"last_activity",header:"Last Activity",width:"150px",renderCell:t=>this.h.createDiv({text:DateUtils.formatAge(t.last_activity),style:{whiteSpace:"nowrap",color:"#666"}})},{id:"main_model",header:"Model",width:"200px",renderCell:t=>this.h.createDiv({text:t.main_model?.replace(/\(No API Key\)/,"")||"N/A",style:{whiteSpace:"nowrap"}})},{id:"created_at",header:"Created",width:"120px",renderCell:t=>this.h.createDiv({text:DateUtils.formatAge(t.created_at),style:{whiteSpace:"nowrap",color:"#666"}})}]}_setupEventDelegation(){}_handleChatClick(t){new ChatNavigationPrompt(t,t=>{t.chat_url&&(window.location.href=t.chat_url)}).show()}_handleRootChatClick(t){new ChatNavigationPrompt({name:t.root_chat_name},()=>{window.location.href="/?chat="+t.root_chat_uuid}).show()}updateData(t){this.chats=t||[],this.table&&(this.table.updateData(this.chats),this.config.decorateRow)&&setTimeout(()=>{this.table.getRows().forEach(t=>this.config.decorateRow(t))},500)}cleanup(){this.table&&(this.table.cleanup(),this.table=null),this.containerElement.innerHTML=""}}module.exports={ChatsTable:ChatsTable};
