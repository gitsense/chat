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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,VIRTUAL_NODE_TYPES=require("../constants").VIRTUAL_NODE_TYPES;class Browser{constructor(e,t,i){this.container=e,this.treeData=t,this.onNodeSelect=i,this.treeTable=null,this.h=DomUtils.h,this.init()}_getColumnConfig(){return[{key:"name",label:"Name",visible:!0,width:"90%"},{key:"chats",visible:!1},{key:"created_at",visible:!1},{key:"latest_child",visible:!1}]}_getDecoratorConfig(){let s=new Set([VIRTUAL_NODE_TYPES.ANALYZER]);return{name:i=>{var e=this.h.createSpan({text:i.name,style:{cursor:"pointer"}});return e.addEventListener("click",()=>{var e=i.type===VIRTUAL_NODE_TYPES.ROOT,t=s.has(i.type);e||t?this.onNodeSelect(i.id):this.treeTable.isNodeExpanded(i.id)?this.treeTable.collapseNode(i.id):this.treeTable.expandNode(i.id)}),e},id:e=>this.h.createSpan({text:e.id})}}init(){var e={showHeader:!1,showPagination:!1,columns:this._getColumnConfig(),decorator:this._getDecoratorConfig()},t=require("../../tree-table/TreeTable"),t=(this.treeTable=t(this.treeData,this.container,e),this.treeData[0]);t&&t.kids&&0<t.kids.length&&(e=(e=t.kids[0]).kids[0]?.id||e.id,this.treeTable.expandToChild(t.id,e))}updateTreeData(e){this.treeData=e,this.treeTable&&this.treeTable.destroy(),this.init()}destroy(){this.treeTable&&(this.treeTable.destroy(),this.treeTable=null)}}module.exports={Browser:Browser};
