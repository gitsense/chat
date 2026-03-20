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

let VIRTUAL_NODE_TYPES={ROOT:"virtual-root",GROUP:"virtual-group",ANALYZER:"analyzer-item"},VIRTUAL_NODE_IDS={HOME:"analyzer-home-root",ALL:"analyzer-all-group"};function _createNode(e,r,a,t,_={}){var d=(new Date).toISOString();return{id:e,parent_id:r,name:a,type:t,created_at:d,updated_at:d,kids:[],data:_}}function buildAnalyzerTree(e){let t={};var r=[],a=_createNode(VIRTUAL_NODE_IDS.HOME,0,"Home",VIRTUAL_NODE_TYPES.ROOT);t[a.id]=a,r.push(a);let _=_createNode(VIRTUAL_NODE_IDS.ALL,VIRTUAL_NODE_IDS.HOME,"All",VIRTUAL_NODE_TYPES.GROUP);return t[_.id]=_,a.kids.push(_),e&&Array.isArray(e)&&e.forEach(e=>{var r=e.id.split("::")[0]||e.id,a="analyzer-"+e.id,r=_createNode(a,VIRTUAL_NODE_IDS.ALL,r,VIRTUAL_NODE_TYPES.ANALYZER,{analyzer:e});t[a]=r,_.kids.push(r)}),r}module.exports={buildAnalyzerTree:buildAnalyzerTree};
