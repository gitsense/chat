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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),GS_TOOL_BLOCK_TYPE="gs-tool";function getToolBlocksByTool(e,t){var o=CodeBlockUtils.extractCodeBlocks(e,{silent:!0}).blocks;return o.filter((o,l)=>{if(o.type===GS_TOOL_BLOCK_TYPE)try{if(GSToolBlockUtils.parseToolBlock(o.content).tool===t)return o.index=l,o}catch(o){e.match(/Internal INTEGER IDs/)||console.warn("Invalid tool block JSON: "+o.message)}})}function getToolBlockElemsByTool(o,e){var t=o.querySelectorAll("pre"),s=[];for(let o=0;o<t.length;o++){var c=t[o];let l=c.textContent;if(l=l.split("\n").slice(2).join("\n"),GSToolBlockUtils.isToolBlock(l))try{GSToolBlockUtils.parseToolBlock(l,{silent:!0}).tool===e&&s.push(c)}catch(o){l.match(/Internal INTEGER IDs/)||console.warn("getToolBlockElemsByTool: ",o.message);continue}}return s}module.exports={getToolBlocksByTool:getToolBlocksByTool,getToolBlockElemsByTool:getToolBlockElemsByTool};
