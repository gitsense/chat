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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,ContextUtils=require("@gitsense/gsc-utils").ContextUtils,CodeBlockUtils=require("@gitsense/gsc-utils").CodeBlockUtils,MessageUtils=require("@gitsense/gsc-utils").MessageUtils;function groupChatData(e){let t=[],o=[];e=ChatUtils.getChatMessages(e);e.forEach(s=>{if("system"===s.role)s.codeBlockSummary={total:0,byType:{},traceable:0,nonTraceable:0};else{let a={total:0,byType:{},traceable:0,nonTraceable:0};if(MessageUtils.isContextMessage(s.message))try{ContextUtils.extractContextSections(s.message).forEach(e=>{t.push({contextFile:e,message:s})})}catch(e){console.warn(`Failed to extract context sections from message ID ${s.id}:`,e)}else try{var e=CodeBlockUtils.extractCodeBlocks(s.message,{silent:!0}).blocks;e.forEach(e=>{var t;"gs-tool"!==e.type&&(o.push({codeBlock:e,message:s}),t=e.type,a.total++,a.byType[t]=(a.byType[t]||0)+1,"code"===t)&&(!!e.header?.["Block-UUID"]?a.traceable++:a.nonTraceable++)}),s.codeBlockSummary=a}catch(e){console.warn(`Failed to extract code blocks from message ID ${s.id}:`,e)}}});let c=new Map,l=(t.forEach(e=>{var t=e.contextFile?.block?.header?.["Block-UUID"],a=e.contextFile?.block?.header?.["Parent-UUID"];t&&c.set(t,e),a&&"N/A"!==a&&c.set(a,e)}),new Map);return o.forEach(e=>{var t,a,s=e.codeBlock;"code"===s.type&&s.header?(t=s.header["Block-UUID"]||null,a=s.header["Parent-UUID"]||null,t&&l.set(t,e),t&&c.has(t)?e.associatedContextFileEntry=c.get(t):a&&c.has(a)&&(e.associatedContextFileEntry=c.get(a))):"patch"===s.type&&s.metadata&&(t=s.metadata["Source-Block-UUID"]||null)&&c.has(t)&&(a=c.get(t),(e.associatedContextFileEntry=a).associatedCodeBlockEntries||(a.associatedCodeBlockEntries=[]),delete(s=JSON.parse(JSON.stringify(e))).associatedContextFileEntry,a.associatedCodeBlockEntries.push(s))}),o.forEach(e=>{var t,{type:a,metadata:s={}}=e.codeBlock,o=s["Source-Block-UUID"],s=s["Target-Block-UUID"];"patch"===a&&o&&s&&(a=l.get(o),o=c.get(a),s=l.get(s),t=c.get(s),a&&(e.associatedSourceEntry=a),o&&(e.associatedSourceContextFileEntry=o),s&&(e.associatedTargetEntry=s),t)&&(e.associatedTargetContextFileEntry=t)}),{contextFiles:t,codeBlocks:o,messages:e}}module.exports={groupChatData:groupChatData};
