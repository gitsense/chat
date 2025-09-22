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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let{CodeBlockUtils,GSToolBlockUtils,JsonUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../services/MessageService"),handleContextLoaderTool=require("./contextLoaderToolHandler").handleContextLoaderTool,handleSendMessageTool=require("./sendMessageToolHandler").handleSendMessageTool,handleFixPatchTool=require("./fixPatchToolHandler").handleFixPatchTool,handleSearchTool=require("./searchToolHandler").handleSearchTool,handleAnalyzeBatchJobTool=require("./analyzeBatchJobToolHandler").handleAnalyzeBatchJobTool,{ANALYZE_BATCH_JOB_TOOL,CONTEXT_LOADER_TOOL,FIX_PATCH_TOOL,SEARCH_TOOL,SEND_MESSAGE_TOOL}=require("./constants");async function handleGitSenseChatTools(o,a,l,t){if(!o||null==o.message||!a||!l)return console.error("handleGitSenseChatTools: Missing required parameters."),!1;var e=CodeBlockUtils.extractCodeBlocks(o.message,{silent:!0}).blocks,s=e.length&&"code"===e[0].type&&e[0].header?.Component,n=o.message.includes('"tool": "fix-patch",'),r=e.find(e=>"gs-tool"===e.type&&"fix-patch"===e.toolData?.tool);if(e.length<=2&&s&&n&&!r){s=GSToolBlockUtils.detectAndFormatUnfencedToolBlock(o.message);if(s.found)return n=o.message.substring(0,s.startIndex)+s.formattedToolBlock,await MessageService.updateChatMessage(l.widget,o.id,{newMessage:n}),o.message=n,l.updateChat(),!0}let T=!1;var d,i=new Set;for(d of e)if(GSToolBlockUtils.isToolBlock(d.content))try{var c=GSToolBlockUtils.parseToolBlock(d.content);if(!c||!c.tool){console.warn("Parsed tool block is missing 'tool' property.",d);continue}var h=c.tool;let e=!1;switch(h){case ANALYZE_BATCH_JOB_TOOL:i.has(ANALYZE_BATCH_JOB_TOOL)||(e=await handleAnalyzeBatchJobTool(o,a,l,t),i.add(ANALYZE_BATCH_JOB_TOOL));break;case CONTEXT_LOADER_TOOL:i.has(CONTEXT_LOADER_TOOL)||(e=await handleContextLoaderTool(o,a,l,t),i.add(CONTEXT_LOADER_TOOL));break;case FIX_PATCH_TOOL:i.has(FIX_PATCH_TOOL)||(e=await handleFixPatchTool(o,a,l,t),i.add(FIX_PATCH_TOOL));break;case SEARCH_TOOL:i.has(SEARCH_TOOL)||(e=await handleSearchTool(o,a,l,t),i.add(SEARCH_TOOL));break;case SEND_MESSAGE_TOOL:i.has(SEND_MESSAGE_TOOL)||(e=await handleSendMessageTool(o,a,l,t),i.add(SEND_MESSAGE_TOOL));break;default:console.warn(`handleGitSenseChatTools: Unrecognized tool name '${h}'.`)}e&&(T=!0)}catch(e){0!==JsonUtils.detectJsonComments(d.content).length||e.message.match(/Internal INTEGER IDs/)||e.message.match(/REPLACE/)||console.error("handleGitSenseChatTools: Error processing tool block (index 0):",e)}return T}module.exports={handleGitSenseChatTools:handleGitSenseChatTools};
