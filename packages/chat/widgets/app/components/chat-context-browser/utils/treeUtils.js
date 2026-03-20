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

let VIRTUAL_NODE_TYPES=require("../constants").VIRTUAL_NODE_TYPES,LEAF_NODE_TYPES=new Set([VIRTUAL_NODE_TYPES.FILE,VIRTUAL_NODE_TYPES.TRACEABLE_CODE,VIRTUAL_NODE_TYPES.NON_TRACEABLE_CODE]);function pruneEmptyNodes(e){if(e&&e.kids&&0!==e.kids.length){for(var t of e.kids)pruneEmptyNodes(t);e.kids=e.kids.filter(e=>!!LEAF_NODE_TYPES.has(e.type)||e.kids&&0<e.kids.length)}}function findNodesByType(e,s,t={}){let p=[],{maxDepth:r=1/0,pathConstraint:o=[]}=t;return function e(t,n){var i=n.length;if(!(i>r)){if(0<i&&i<=o.length){var E=o[i-1],i=n[i-1];if(E.id&&E.id!==i.id||E.type&&E.type!==i.type)return}if(t.type===s&&(0===o.length||n.length>=o.length)&&p.push(t),t.kids&&0<t.kids.length)for(var d of t.kids)e(d,[...n,t])}}(e,[]),p}module.exports={pruneEmptyNodes:pruneEmptyNodes,findNodesByType:findNodesByType};
