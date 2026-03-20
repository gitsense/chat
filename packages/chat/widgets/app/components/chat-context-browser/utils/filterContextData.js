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

let VIRTUAL_NODE_IDS=require("../constants").VIRTUAL_NODE_IDS,MessageUtils=require("@gitsense/gsc-utils").MessageUtils,STRUCTURAL_VIEW_TABS=require("../components/PreviewPanel/StructuralNodeView/constants").STRUCTURAL_VIEW_TABS;function _getCodeBlockOriginId(e){var e=e.message,t=MessageUtils.isContextMessage(e.message);return"system"===e.role?VIRTUAL_NODE_IDS.SYSTEM_PROMPT:"user"===e.role?VIRTUAL_NODE_IDS.USER_LOADED:"assistant"===e.role?t?VIRTUAL_NODE_IDS.USER_LOADED:VIRTUAL_NODE_IDS.AI_GENERATED:null}function filterContextData(e,t,l,i){let c=i?i.toLowerCase():"",o=l===STRUCTURAL_VIEW_TABS.CONTEXT_FILES,u=l===STRUCTURAL_VIEW_TABS.CODE,d=l===STRUCTURAL_VIEW_TABS.MANUAL_CODE,U=l===STRUCTURAL_VIEW_TABS.GENERATED_CODE;l=e.filter(e=>o&&(""===i||!![(e=e.contextFile).path||e.name,e.block.header?.["Block-UUID"]||""].join("\n").toLowerCase().includes(c))),e=t.filter(e=>{if(!u&&!U&&!d)return!1;if(""===i)return!0;var t=e.codeBlock,l=t.header?.["Block-UUID"]?t.header:null,o=t.metadata?.["Source-Block-UUID"]?t.metadata:null,s=[e.associatedContextFileEntry,e.associatedTargetContextFileEntry,e.associatedSourceContextFileEntry,e.associatedTargetEntry,e.associatedSourceEntry],r=[];for(let o=0;o<s.length;o++){var{contextFile:n,codeBlock:a}=s[o]||{};let e=null,t=null,l=null;n?(r.push(n.path),e=n.block?.header?.Component||null,t=n.block?.header?.Description||null,l=n.block?.header?.["Block-UUID"]||null):a&&(e=a?.header?.Component||null,t=a?.header?.Description||null,l=a?.header?.["Block-UUID"]||null),l&&r.push(l),e&&r.push(e),t&&r.push(t)}return l?(r.push(l["Block-UUID"]),r.push(l.Component),r.push(l.Description)):o?(r.push(o["Source-Block-UUID"]),r.push(o["Target-Block-UUID"]),r.push(o.Description)):r.push(t.content),r.join("\n").toLowerCase().includes(c)});let s=[],r=[],n=[],a=[],D=[];return e.forEach(e=>{var t=e.codeBlock,l=t.type;if("patch"===l)n.push(e);else if("code"===l)(t.header&&t.header["Block-UUID"]?s:r).push(e);else{if("gs-tool"===l)return!1;console.warn(`Ignoring unrecognized code block with '${l}' type`)}var t=MessageUtils.isContextMessage(e.message.message),l="user"===e.message.role,o="assistant"===e.message.role;t||(o?D.push(e):l&&a.push(e))}),{filteredFiles:l,filteredCodeBlocks:e,filteredTraceableBlocks:s,filteredNonTraceableBlocks:r,filteredPatches:n,filteredManualBlocks:a,filteredGeneratedBlocks:D}}module.exports={filterContextData:filterContextData,_getCodeBlockOriginId:_getCodeBlockOriginId};
