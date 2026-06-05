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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,MessagesTable=require("./shared/MessagesTable").MessagesTable,MessageFilterService=require("../services/MessageFilterService").MessageFilterService;class SelectionPanel{constructor(e,s={}){this.container=e,this.options={messages:[],onSelectionChange:()=>{},selectedMessageIds:new Set,editingMessageIds:new Set,disabledMessageIds:[],viewMode:"checkbox",checkedMessageIds:[],onSelectAllChange:()=>{},...s},this.filterService=new MessageFilterService,this.components={},this.filteredMessages=[...this.options.messages],this.allMessages=[...this.options.messages],this.h=DomUtils.h}render(e){if(e&&(this.container=e),!this.container)throw new Error("SelectionPanel: No container provided");this.container.innerHTML="";e=this.h.createDiv({className:"gs-table-container markdown-body"});this.components.messagesTable=new MessagesTable(e,{messages:this.filteredMessages,selectedMessageIds:this.options.selectedMessageIds,onSelectionChange:e=>this.handleSelectionChange(e),editingMessageIds:this.options.editingMessageIds,onSelectAllChange:this.options.onSelectAllChange,disabledMessageIds:this.options.disabledMessageIds,viewMode:this.options.viewMode,checkedMessageIds:this.options.checkedMessageIds,onSelectionChange:e=>this.options.onSelectionChange(e)}),this.components.messagesTable.render(),this.container.appendChild(e)}handleSelectionChange(e){console.log("DEBUG: SelectionPanel: handleSelectionChange: ",e),this.options.selectedMessageIds.clear(),e.forEach(e=>this.options.selectedMessageIds.add(e.id)),this.options.onSelectionChange(e)}applyFilters(e){var{typeFilters:e,searchTerm:s,range:t}=e,i=this.getSelectedMessages(),e=(this.filteredMessages=this.filterService.filterMessages(this.allMessages,e,s,[],t),this.components.messagesTable.updateMessages(this.filteredMessages,this.options.editingMessageIds,!0),i.filter(s=>this.filteredMessages.some(e=>e.id===s.id)));this.components.messagesTable.restoreSelectionState(e.map(e=>e.id))}updateMessages(e){this.options.messages=e,this.allMessages=e,this.filteredMessages=e,this.render()}updateEditingState(e){this.options.editingMessageIds=e,this.components.messagesTable.updateEditingState(e)}updateDisabledMessageIds(e){this.options.disabledMessageIds=e,this.components.messagesTable.updateDisabledMessageIds(e)}updateCheckedMessageIds(e){this.options.checkedMessageIds=e,this.components.messagesTable.updateCheckedMessageIds(e)}updateSelectionState(e){this.options.selectedMessageIds=e,this.components.messagesTable&&this.components.messagesTable.updateSelectionState(e)}getSelectedMessages(){return this.components.messagesTable?this.components.messagesTable.getSelectedMessages():[]}cleanup(){Object.values(this.components).forEach(e=>{e.cleanup&&e.cleanup()}),this.container&&(this.container.innerHTML="")}}module.exports={SelectionPanel:SelectionPanel};
