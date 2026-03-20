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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),SEARCH_TOOL=require("../constants").SEARCH_TOOL;function getSearchTools(o){o=CodeBlockUtils.extractCodeBlocks(o,{silent:!0}).blocks;return o.filter(o=>GSToolBlockUtils.isToolBlock(o.content)&&GSToolBlockUtils.parseToolBlock(o.content)?.tool===SEARCH_TOOL)}function getSearchToolConfigs(o){let l=getSearchTools(o);if(!l||!l.length)return[];let t=[];return l.forEach(o=>{var e=l[0],e=GSToolBlockUtils.parseToolBlock(e.content);t.push(e.config)}),t}module.exports={getSearchTools:getSearchTools,getSearchToolConfigs:getSearchToolConfigs};
