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

let{BATCH_NODE_TYPES,BATCH_NODE_IDS}=require("../constants"),DomUtils=require("@gitsense/gsc-utils").DomUtils,CLICKABLE_LEAF_TYPES=new Set([BATCH_NODE_TYPES.FILE]);class Browser{constructor(e,t,i){this.container=e,this.treeData=t,this.onNodeSelect=i,this.treeTable=null,this.h=DomUtils.h,this.init()}_getColumnConfig(){return[{key:"name",label:"Name",visible:!0,width:"90%"},{key:"chats",visible:!1},{key:"created_at",visible:!1},{key:"latest_child",visible:!1}]}_findDrillDownTarget(e){return CLICKABLE_LEAF_TYPES.has(e.type)||e.id===BATCH_NODE_IDS.HOME||!e.kids||1!==e.kids.length?e:this._findDrillDownTarget(e.kids[0])}_getDecoratorConfig(){return{name:i=>{var e=this.h.createSpan({text:i.name,style:{cursor:"pointer"}});return e.addEventListener("click",()=>{var e=i.type===BATCH_NODE_TYPES.BATCH,t=CLICKABLE_LEAF_TYPES.has(i.type);e||t?this.onNodeSelect(i.id):this.treeTable.isNodeExpanded(i.id)?this.treeTable.collapseNode(i.id):(t=((e=this._findDrillDownTarget(i)).kids&&e.kids.length?e.kids[0]:e).id,this.treeTable.expandToChild(BATCH_NODE_IDS.HOME,t))}),e},details:e=>this.h.createTextNode("Type: "+e.type),source:e=>this.h.createTextNode("ID: "+e.id)}}init(){var e={showHeader:!0,showPagination:!1,columns:this._getColumnConfig(),sortRootBy:"order_weight",sortRootOrder:"asc",decorator:this._getDecoratorConfig()},t=require("../../tree-table/TreeTable");this.treeTable=t(this.treeData,this.container,e),this.treeData[0]?.kids&&this.treeData[0].kids.forEach(e=>{e.kids&&0<e.kids.length&&this.treeTable.expandToChild(BATCH_NODE_IDS.HOME,e.kids[0].id)})}selectNode(e){this.treeTable.expandToChild(BATCH_NODE_IDS.HOME,e)}destroy(){this.treeTable&&(this.treeTable.destroy(),this.treeTable=null)}}module.exports={Browser:Browser};
