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

let arrayToTree=require("../../tree-table/utils/treeUtils").arrayToTree,TreeTable=require("../../tree-table/TreeTable"),VIRTUAL_NODE_TYPES=require("../constants").VIRTUAL_NODE_TYPES,chatApi=require("../dependencies").chatApi;class Browser{constructor(e,t,a,r,i){this.container=e,this.data=t,this.context=a,this.onNodeClick=r,this.onSelectionChange=i,this.treeTable=null}render(){var e=[{key:"name",label:"Name",visible:!0,width:"100%",render:t=>{var e;return t.type===VIRTUAL_NODE_TYPES.FILE?((e=document.createElement("span")).textContent=t.name,e.style.color="black",e.style.cursor="default",e):((e=document.createElement("a")).href="#",e.textContent=t.name,e.style.color="black",e.style.textDecoration="none",e.onclick=e=>{e.preventDefault(),this._handleNodeClick(t)},e)}},{key:"chats",visible:!1},{key:"created_at",visible:!1},{key:"latest_child",visible:!1},{key:"selection",label:" ",visible:!0,width:"20px"}];this.treeTable=TreeTable(this.data,this.container,{decorator:{},showHeader:!1,showPagination:!1,styles:"nav",autoExpandRoot:!0,columns:e,showSelectionCheckboxes:!0,showSelectionManagement:!1,chatApi:{getGitRefChatDescendants:async e=>{var e=await chatApi.getGitRefChatByFamilyMember(this.context.widget,{id:e}),t=[...e.descendants];return t.unshift(e),arrayToTree(t,"desc",e.id)},getGitRefChatByFamilyMember:async e=>chatApi.getGitRefChatByFamilyMember(this.context.widget,{id:e}),search:async e=>{console.log("Repositories Browser - Browser: Implement search")}},onSelectionStateChange:(e,t)=>{this.onSelectionChange(e,t)}})}_handleNodeClick(e){this.onNodeClick(e.id)}getTreeTable(){return this.treeTable}destroy(){this.treeTable&&(this.treeTable.destroy(),this.treeTable=null),this.container.innerHTML=""}}module.exports={Browser:Browser};
