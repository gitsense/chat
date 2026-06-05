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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),GS_TOOL_BLOCK_TYPE="gs-tool";function getToolBlocksByTool(e,t){var o=CodeBlockUtils.extractCodeBlocks(e,{silent:!0}).blocks;return o.filter((o,l)=>{if(o.type===GS_TOOL_BLOCK_TYPE)try{if(GSToolBlockUtils.parseToolBlock(o.content).tool===t)return o.index=l,o}catch(o){e.match(/Internal INTEGER IDs/)||console.warn("Invalid tool block JSON: "+o.message)}})}function getToolBlockElemsByTool(o,e){var t=o.querySelectorAll("pre"),s=[];for(let o=0;o<t.length;o++){var c=t[o];let l=c.textContent;if(l=l.split("\n").slice(2).join("\n"),GSToolBlockUtils.isToolBlock(l))try{GSToolBlockUtils.parseToolBlock(l,{silent:!0}).tool===e&&s.push(c)}catch(o){l.match(/Internal INTEGER IDs/)||console.warn("getToolBlockElemsByTool: ",o.message);continue}}return s}module.exports={getToolBlocksByTool:getToolBlocksByTool,getToolBlockElemsByTool:getToolBlockElemsByTool};
