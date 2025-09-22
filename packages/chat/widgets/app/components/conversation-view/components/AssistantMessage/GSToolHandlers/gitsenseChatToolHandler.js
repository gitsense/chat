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

let{CodeBlockUtils,GSToolBlockUtils,JsonUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../services/MessageService"),{handleContextLoaderTool,DebounceHandleContextLoaderTool}=require("./contextLoaderToolHandler"),handleSendMessageTool=require("./sendMessageToolHandler").handleSendMessageTool,handleFixPatchTool=require("./fixPatchToolHandler").handleFixPatchTool,handleSearchTool=require("./searchToolHandler").handleSearchTool,handleAnalyzeBatchJobTool=require("./analyzeBatchJobToolHandler").handleAnalyzeBatchJobTool,{ANALYZE_BATCH_JOB_TOOL,CONTEXT_LOADER_TOOL,FIX_PATCH_TOOL,SEARCH_TOOL,SEND_MESSAGE_TOOL}=require("./constants");async function handleGitSenseChatTools(o,a,t,l){if(!o||null==o.message||!a||!t)return console.error("handleGitSenseChatTools: Missing required parameters."),!1;var e=CodeBlockUtils.extractCodeBlocks(o.message,{silent:!0}).blocks,n=e.length&&"code"===e[0].type&&e[0].header?.Component,s=o.message.includes('"tool": "fix-patch",'),r=e.find(e=>"gs-tool"===e.type&&"fix-patch"===e.toolData?.tool);if(e.length<=2&&n&&s&&!r){n=GSToolBlockUtils.detectAndFormatUnfencedToolBlock(o.message);if(n.found)return s="```"+e[0].language+"\n"+e[0].headerText+"\n\n\n"+e[0].content.trimEnd()+"\n```\n\n"+n.formattedToolBlock,await MessageService.updateChatMessage(t.widget,o.id,{newMessage:s}),o.message=s,t.updateChat(),!0}let T=!1;var d,c=new Set;for(d of e)if(GSToolBlockUtils.isToolBlock(d.content))try{var i=GSToolBlockUtils.parseToolBlock(d.content);if(!i||!i.tool){console.warn("Parsed tool block is missing 'tool' property.",d);continue}var h=i.tool;let e=!1;switch(h){case ANALYZE_BATCH_JOB_TOOL:c.has(ANALYZE_BATCH_JOB_TOOL)||(e=await handleAnalyzeBatchJobTool(o,a,t,l),c.add(ANALYZE_BATCH_JOB_TOOL));break;case CONTEXT_LOADER_TOOL:c.has(CONTEXT_LOADER_TOOL)||(e=await handleContextLoaderTool(o,a,t,l),c.add(CONTEXT_LOADER_TOOL));break;case FIX_PATCH_TOOL:c.has(FIX_PATCH_TOOL)||(e=await handleFixPatchTool(o,a,t,l),c.add(FIX_PATCH_TOOL));break;case SEARCH_TOOL:c.has(SEARCH_TOOL)||(e=await handleSearchTool(o,a,t,l),c.add(SEARCH_TOOL));break;case SEND_MESSAGE_TOOL:c.has(SEND_MESSAGE_TOOL)||(e=await handleSendMessageTool(o,a,t,l),c.add(SEND_MESSAGE_TOOL));break;default:console.warn(`handleGitSenseChatTools: Unrecognized tool name '${h}'.`)}e&&(T=!0)}catch(e){0!==JsonUtils.detectJsonComments(d.content).length||e.message.match(/Internal INTEGER IDs/)||e.message.match(/REPLACE/)||console.error("handleGitSenseChatTools: Error processing tool block (index 0):",e)}return T}function debounce(o,a){let t,l=0;return function(...e){Date.now()-l<a&&clearTimeout(t),t=setTimeout(()=>{o.apply(this,e),l=Date.now()},a),console.log("timeoutId: ",t)}}module.exports={handleGitSenseChatTools:handleGitSenseChatTools};
