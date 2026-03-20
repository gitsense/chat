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

let GitFilesTable=require("../../../../../git-files-table").GitFilesTable,DomUtils=require("@gitsense/gsc-utils").DomUtils;class ReferenceFilesView{constructor(e,i,t={}){this.container=e,this.referenceFiles=i||[],this.chatApi=t.chatApi||null,this.onFileClick=t.onFileClick||null,this.h=DomUtils.h,this.gitFilesTable=null}_transformData(){return this.referenceFiles.map(e=>({id:String(e.id),name:e.name,path:e.meta?.path||e.path||"",repo:e.group_name||"Unknown",origin:"imported",version:e.block?.header?.Version||"N/A",commit:e.meta?.commit||null,message:{id:e.id,position:0,created_at:e.created_at,role:"user"}}))}render(){this.container.innerHTML="";var e=this._transformData();this.gitFilesTable=new GitFilesTable(this.container,{onFileClick:e=>{this.onFileClick&&this.onFileClick(e)},emptyMessage:"No reference files found.",itemsPerPage:25,enableSearch:!0,searchPlaceholder:"Filter reference files...",enablePagination:!0,tableOptions:{maxBodyHeight:-60}}),this.gitFilesTable.render(e)}destroy(){this.gitFilesTable&&(this.gitFilesTable.destroy(),this.gitFilesTable=null),this.container.innerHTML=""}}module.exports={ReferenceFilesView:ReferenceFilesView};
