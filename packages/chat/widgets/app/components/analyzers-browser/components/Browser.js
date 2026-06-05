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

let DomUtils=require("@gitsense/gsc-utils").DomUtils,VIRTUAL_NODE_TYPES=require("../constants").VIRTUAL_NODE_TYPES;class Browser{constructor(e,t,i){this.container=e,this.treeData=t,this.onNodeSelect=i,this.treeTable=null,this.h=DomUtils.h,this.init()}_getColumnConfig(){return[{key:"name",label:"Name",visible:!0,width:"90%"},{key:"chats",visible:!1},{key:"created_at",visible:!1},{key:"latest_child",visible:!1}]}_getDecoratorConfig(){let s=new Set([VIRTUAL_NODE_TYPES.ANALYZER]);return{name:i=>{var e=this.h.createSpan({text:i.name,style:{cursor:"pointer"}});return e.addEventListener("click",()=>{var e=i.type===VIRTUAL_NODE_TYPES.ROOT,t=s.has(i.type);e||t?this.onNodeSelect(i.id):this.treeTable.isNodeExpanded(i.id)?this.treeTable.collapseNode(i.id):this.treeTable.expandNode(i.id)}),e},id:e=>this.h.createSpan({text:e.id})}}init(){var e={showHeader:!1,showPagination:!1,columns:this._getColumnConfig(),decorator:this._getDecoratorConfig()},t=require("../../tree-table/TreeTable"),t=(this.treeTable=t(this.treeData,this.container,e),this.treeData[0]);t&&t.kids&&0<t.kids.length&&(e=(e=t.kids[0]).kids[0]?.id||e.id,this.treeTable.expandToChild(t.id,e))}updateTreeData(e){this.treeData=e,this.treeTable&&this.treeTable.destroy(),this.init()}destroy(){this.treeTable&&(this.treeTable.destroy(),this.treeTable=null)}}module.exports={Browser:Browser};
