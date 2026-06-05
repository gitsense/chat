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

let GitFilesTable=require("../../../../../git-files-table").GitFilesTable,DomUtils=require("@gitsense/gsc-utils").DomUtils;class ContextFilesView{constructor(e,t,i){this.container=e,this.data=t,this.onNodeDrillDown=i,this.h=DomUtils.h,this.gitFilesTable=null,this.tableWrapper=this.h.createDiv({style:{height:"100%",width:"100%"}}),this.container.appendChild(this.tableWrapper),this.gitFilesTable=new GitFilesTable(this.tableWrapper,{onFileClick:e=>{e="chat-id-"+e.id;this.onNodeDrillDown(e)},emptyMessage:"No context files match the current filter criteria.",itemsPerPage:25,enableSearch:!0,searchPlaceholder:"Filter by file path or UUID...",enablePagination:!0,tableOptions:{maxBodyHeight:-60}})}_transformData(){return this.data&&this.data.contextFiles?this.data.contextFiles.map(e=>{var t=e.contextFile,e=e.message;return{id:String(t["chat id"]),name:t.name,path:t.path,repo:t.repo,origin:t.contextOrigin||"imported",version:t.block?.header?.Version,commit:t.chatMetadata?.commit,message:{id:e.id,position:e.position,created_at:e.created_at,role:e.role}}}):[]}render(e){var t=this._transformData();this.gitFilesTable.render(t)}destroy(){this.gitFilesTable&&(this.gitFilesTable.destroy(),this.gitFilesTable=null),this.container.innerHTML=""}}module.exports={ContextFilesView:ContextFilesView};
