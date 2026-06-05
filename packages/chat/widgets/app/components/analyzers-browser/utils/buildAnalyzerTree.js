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

let VIRTUAL_NODE_TYPES={ROOT:"virtual-root",GROUP:"virtual-group",ANALYZER:"analyzer-item"},VIRTUAL_NODE_IDS={HOME:"analyzer-home-root",ALL:"analyzer-all-group"};function _createNode(e,r,a,t,_={}){var d=(new Date).toISOString();return{id:e,parent_id:r,name:a,type:t,created_at:d,updated_at:d,kids:[],data:_}}function buildAnalyzerTree(e){let t={};var r=[],a=_createNode(VIRTUAL_NODE_IDS.HOME,0,"Home",VIRTUAL_NODE_TYPES.ROOT);t[a.id]=a,r.push(a);let _=_createNode(VIRTUAL_NODE_IDS.ALL,VIRTUAL_NODE_IDS.HOME,"All",VIRTUAL_NODE_TYPES.GROUP);return t[_.id]=_,a.kids.push(_),e&&Array.isArray(e)&&e.forEach(e=>{var r=e.id.split("::")[0]||e.id,a="analyzer-"+e.id,r=_createNode(a,VIRTUAL_NODE_IDS.ALL,r,VIRTUAL_NODE_TYPES.ANALYZER,{analyzer:e});t[a]=r,_.kids.push(r)}),r}module.exports={buildAnalyzerTree:buildAnalyzerTree};
