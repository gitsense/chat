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

let BlockMapService=require("./BlockMapService"),diff_match_patch=require("diff-match-patch");class CodeBlockService{constructor(){this.dmp=new diff_match_patch,this.blockMap=new BlockMapService}updateBlockMap(e){return e?this.blockMap.updateFromChat(e):0}getBlockInfo(e,t){return e?(t&&(e=this.blockMap.getBlockUUIDFromSourceAndTargetBlockUUID(e,t)),this.blockMap.getBlockInfo(e)):null}getBlockContent(e){return e?this.blockMap.getBlockContent(e):null}getBlockMap(){return this.blockMap.getDebugMap()}getCodeBlocksByMessageId(e){if(!e)return[];var t,r,a,c,o,l,u=this.getBlockMap(),s=[],p=new Set;for([t,r]of Object.entries(u))r.messageId===e&&(s.push({blockUUID:t,...r,partNumber:this._extractPartNumber(t)}),a=this._getBaseUUID(t),p.add(a));if(0===p.size)return[];for([c,o]of Object.entries(u))o.messageId!==e&&(l=this._getBaseUUID(c),p.has(l))&&s.push({blockUUID:c,...o,partNumber:this._extractPartNumber(c)});s.sort((e,t)=>null===e.partNumber&&null!==t.partNumber?-1:null!==e.partNumber&&null===t.partNumber?1:(e.partNumber||0)-(t.partNumber||0));var n,i={};for(n of s){var h=this._getBaseUUID(n.blockUUID);i[h]||(i[h]=[]),i[h].push(n)}return Object.values(i)}_extractPartNumber(e){e=e.match(/-(\d+)$/);return e?parseInt(e[1],10):null}_getBaseUUID(e){return e.replace(/-\d+$/,"")}}module.exports=CodeBlockService;
