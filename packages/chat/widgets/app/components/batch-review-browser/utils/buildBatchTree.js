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

let{BATCH_NODE_TYPES,BATCH_NODE_IDS}=require("../constants");class BatchTreeBuilder{buildTree(e,t,a){let i={};var r=[],e=this._createNode(BATCH_NODE_IDS.HOME,0,"Batch "+e.id,BATCH_NODE_TYPES.BATCH,(new Date).toISOString(),{batch:e});i[e.id]=e,r.push(e);let _=this._createNode(BATCH_NODE_IDS.REFERENCE_FILES,BATCH_NODE_IDS.HOME,`Reference Files (${t.length})`,BATCH_NODE_TYPES.FILE_CATEGORY,(new Date).toISOString(),{category:"reference"}),d=(i[_.id]=_,e.kids.push(_),this._createNode(BATCH_NODE_IDS.FILES_TO_ANALYZE,BATCH_NODE_IDS.HOME,`Files to Analyze (${a.length})`,BATCH_NODE_TYPES.FILE_CATEGORY,(new Date).toISOString(),{category:"analyze"}));return i[d.id]=d,e.kids.push(d),t.forEach(e=>{this._addFileWithPathHierarchy(e,_.id,i)}),a.forEach(e=>{this._addFileWithPathHierarchy(e,d.id,i)}),r}_addFileWithPathHierarchy(i,r,_){var d=i.meta?.path||i.path||"";if(d){var h=d.split("/");h.pop();let t=r,a="";for(let e=0;e<h.length;e++){var E=h[e],n=r+"-"+(a+=(a?"/":"")+E);_[n]||(E=this._createNode(n,t,E,BATCH_NODE_TYPES.FILE_CATEGORY,i.created_at||(new Date).toISOString(),{path:a}),_[n]=E,_[t].kids.push(E)),t=n}let e=this._createFileNode(i,t);_[e.id]=e,_[t].kids.push(e)}else{let e=this._createFileNode(i,r);_[e.id]=e,void _[r].kids.push(e)}}_createNode(e,t,a,i,r,_={}){var d=(new Date).toISOString();return{id:e,parent_id:t,name:a,type:i,created_at:r||d,updated_at:d,kids:[],data:_}}_createFileNode(e,t){var a=e.name||e.path?.split("/").pop()||"Unknown File",i=e.meta?.tokens?.content?.estimate||0,r="file-"+(e.id||Math.random().toString(36).substr(2,9));return this._createNode(r,t,a+` (${i} tokens)`,BATCH_NODE_TYPES.FILE,e.created_at||(new Date).toISOString(),{file:e})}}module.exports={BatchTreeBuilder:BatchTreeBuilder};
