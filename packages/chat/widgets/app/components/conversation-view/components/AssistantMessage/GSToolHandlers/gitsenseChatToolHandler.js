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

let{CodeBlockUtils,GSToolBlockUtils,JsonUtils}=require("@gitsense/gsc-utils"),handleContextLoaderTool=require("./contextLoaderToolHandler").handleContextLoaderTool,handleSendMessageTool=require("./sendMessageToolHandler").handleSendMessageTool,handleFixPatchTool=require("./fixPatchToolHandler").handleFixPatchTool,handleSearchTool=require("./searchToolHandler").handleSearchTool,handleAnalyzeBatchJobTool=require("./analyzeBatchJobToolHandler").handleAnalyzeBatchJobTool,{ANALYZE_BATCH_JOB_TOOL,CONTEXT_LOADER_TOOL,FIX_PATCH_TOOL,SEARCH_TOOL,SEND_MESSAGE_TOOL}=require("./constants");async function handleGitSenseChatTools(o,a,l,n){if(!o||null==o.message||!a||!l)return console.error("handleGitSenseChatTools: Missing required parameters."),!1;var e=CodeBlockUtils.extractCodeBlocks(o.message,{silent:!0}).blocks;let t=!1;var s,T=new Set;for(s of e)if(GSToolBlockUtils.isToolBlock(s.content))try{var r=GSToolBlockUtils.parseToolBlock(s.content);if(!r||!r.tool){console.warn("Parsed tool block is missing 'tool' property.",s);continue}var d=r.tool;let e=!1;switch(d){case ANALYZE_BATCH_JOB_TOOL:T.has(ANALYZE_BATCH_JOB_TOOL)||(e=await handleAnalyzeBatchJobTool(o,a,l,n),T.add(ANALYZE_BATCH_JOB_TOOL));break;case CONTEXT_LOADER_TOOL:T.has(CONTEXT_LOADER_TOOL)||(e=await handleContextLoaderTool(o,a,l,n),T.add(CONTEXT_LOADER_TOOL));break;case FIX_PATCH_TOOL:T.has(FIX_PATCH_TOOL)||(e=await handleFixPatchTool(o,a,l,n),T.add(FIX_PATCH_TOOL));break;case SEARCH_TOOL:T.has(SEARCH_TOOL)||(e=await handleSearchTool(o,a,l,n),T.add(SEARCH_TOOL));break;case SEND_MESSAGE_TOOL:T.has(SEND_MESSAGE_TOOL)||(e=await handleSendMessageTool(o,a,l,n),T.add(SEND_MESSAGE_TOOL));break;default:console.warn(`handleGitSenseChatTools: Unrecognized tool name '${d}'.`)}e&&(t=!0)}catch(e){0!==JsonUtils.detectJsonComments(s.content).length||e.message.match(/Internal INTEGER IDs/)||e.message.match(/REPLACE/)||console.error("handleGitSenseChatTools: Error processing tool block (index 0):",e)}return t}module.exports={handleGitSenseChatTools:handleGitSenseChatTools};
