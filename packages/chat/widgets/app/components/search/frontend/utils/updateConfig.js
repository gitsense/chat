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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),chatApi=require("../Dependencies").chatApi;async function updateConfig(e,o,t){if(!e||null==e.message||!o)throw new Error("updateConfig: Missing required parameters (message or newConfig).");if(!t||!t.widget)throw new Error("updateConfig: Missing required context parameters or context invalid");var i,l=e.message,n=CodeBlockUtils.extractCodeBlocks(l,{silent:!0}).blocks,n=n.find((e,o)=>{if(GSToolBlockUtils.isToolBlock(e.content)&&"search"===GSToolBlockUtils.parseToolBlock(e.content)?.tool)return e.index=o,e});if(n)return i=GSToolBlockUtils.parseToolBlock(n.content),(o={...o}).layoutName&&(o.layout=o.layoutName,delete o.layoutName),o.engineName&&(o.engine=o.engineName,delete o.engineName),delete o.actions,i.config=o,o=GSToolBlockUtils.formatToolBlock(i),i=CodeBlockUtils.updateCodeBlockByIndex(l,n.index,o,n.language),await chatApi.updateChatMessage(t.widget,e.id,null,i),!0;throw new Error("updateConfig: No search tool block found in the message.")}module.exports={updateConfig:updateConfig};
