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

let GitFilesTable=require("../../../../git-files-table").GitFilesTable,DomUtils=require("@gitsense/gsc-utils").DomUtils,chatApi=require("../../../dependencies").chatApi;class HomeViewTable{constructor(e,t,i={}){this.container=e,this.context=t,this.options=i,this.h=DomUtils.h,this.gitFilesTable=null}async render(e){e=await this._transformData(e);this.gitFilesTable&&this.gitFilesTable.destroy(),this.gitFilesTable=new GitFilesTable(this.container,{onFileClick:e=>{e=e.id;this.options.onFileClick(e)},emptyMessage:this.h.createDiv({text:"No files selected. Check the boxes in the file tree on the left to add files to this list.",style:{padding:"5px"}}),visibleColumns:["file","repo","committed"],itemsPerPage:25,enableSearch:!0,searchPlaceholder:"Filter selected files by path or UUID...",enablePagination:!0,tableOptions:{maxBodyHeight:-110}}),this.gitFilesTable.render(e)}async _transformData(e){return e?e.map(e=>{var t=e.meta||{},i=t.commit||{},s=t.path||e.name||"Unknown Path",a=t.name||e.name||"Unknown File",l=e.group_name||"N/A";(t.refContext||{}).refName;return{id:String(e.id),name:a,path:s,repo:l,origin:"imported",version:i.hash?i.hash.substring(0,7):"N/A",commit:{timestamp:i.timestamp,author:i.author},message:{id:e.id,position:0,created_at:e.created_at,role:"user"}}}):[]}destroy(){this.gitFilesTable&&(this.gitFilesTable.destroy(),this.gitFilesTable=null),this.container.innerHTML=""}getGitFilesTable(){return this.gitFilesTable}}module.exports={HomeViewTable:HomeViewTable};
