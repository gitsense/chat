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

let{CodeBlockUtils,MessageUtils}=require("@gitsense/gsc-utils");class BlockMapService{constructor(){this.blocks=new Map,this.processedMessages=new Set,this.processedPatches=new Set,this.lastUpdated=null}_extractCodeBlocksWithUUIDs(t){var e;return t&&"string"==typeof t?({blocks:t,warnings:e}=CodeBlockUtils.extractCodeBlocks(t,{silent:!0,validatePatches:!0}),t.map(t=>{var e="patch"===t.type,a=e?this.getBlockUUIDFromPatchBlock(t):t.header?.["Block-UUID"]||null;return{language:t.language||"text",content:t.content,header:t.header,headerText:t.headerText,metadata:t.metadata,patch:t.patch,patchFormat:t.patchFormat,patchValidation:t.patchValidation,diffContent:t.diffContent||null,blockUUID:a,isPatch:e,position:t.position}})):[]}getBlockUUIDFromPatchBlock(t){if("patch"!==t.type)throw new Error("Block must be a patch type");return this.getBlockUUIDFromSourceAndTargetBlockUUID(t.metadata?.["Source-Block-UUID"]||null,t.metadata?.["Target-Block-UUID"]||null)}getBlockUUIDFromSourceAndTargetBlockUUID(t,e){return t+":"+e}_processMessage(a){if(!a)return 0;let s=0;return this.processedMessages.has(a.id)&&(!a.updated_at||new Date(a.updated_at)<=new Date(this.lastUpdated))?a.kids&&Array.isArray(a.kids)&&a.kids.forEach(t=>{s+=this._processMessage(t)}):(this._extractCodeBlocksWithUUIDs(a.message||"").forEach(t=>{var e=t.header?t.header["Continuation-Part"]:null;e&&(t.blockUUID=t.blockUUID+"-"+e),t.blockUUID&&(this.blocks.set(t.blockUUID,{content:t.content,header:t.header,headerText:t.headerText,diffContent:t.diffContent,language:t.language||"text",metadata:t.metadata,patch:t.patch,patchFormat:t.patchFormat,patchValidation:t.patchValidation,messageId:a.id,updatedAt:a.updated_at||a.created_at,isPatch:t.isPatch||!1}),s++)}),this.processedMessages.add(a.id),a.kids&&Array.isArray(a.kids)&&a.kids.forEach(t=>{s+=this._processMessage(t)})),s}updateFromChat(t,e){if(!t||!t.messages||!Array.isArray(t.messages)||0===t.messages.length)return 0;let a=0;return t.messages.forEach(t=>{a+=this._processMessage(t)}),0<a&&(this.lastUpdated=(new Date).toISOString()),a}getBlockContent(t){t=this.blocks.get(t);return t?t.content:null}getBlockInfo(t){return this.blocks.get(t)||null}getBlockByPatchTargetUuid(t){for(var e of this.blocks.keys())if(e.includes(":")&&!e.includes("GS-UUID")){var[,a]=e.split(":");if(a===t)return this.blocks.get(e)}return null}isBlockReferencedInPatch(t){t=this.blocks.get(t);return t&&t.referencedInPatch||!1}updateBlockContent(t,e,a){var s;return!(!t||!e||((s=this.blocks.get(t))?(s.content=e,s.updatedAt=(new Date).toISOString(),a&&(s.messageId=a)):this.blocks.set(t,{content:e,messageId:a||"manual-update",updatedAt:(new Date).toISOString(),isPatch:!1}),0))}getDebugMap(){return Object.fromEntries(this.blocks)}getBlocksWhere(a){if("function"!=typeof a)return[];let s=[];return this.blocks.forEach((t,e)=>{a(t,e)&&s.push([e,t])}),s}clear(){this.blocks.clear(),this.processedMessages.clear(),this.lastUpdated=null}getBlocksImmutable(){return new Map(this.blocks)}}module.exports=BlockMapService;
