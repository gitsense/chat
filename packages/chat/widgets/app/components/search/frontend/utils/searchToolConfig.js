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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),SEARCH_TOOL=require("../constants").SEARCH_TOOL;function getSearchTools(o){o=CodeBlockUtils.extractCodeBlocks(o,{silent:!0}).blocks;return o.filter(o=>GSToolBlockUtils.isToolBlock(o.content)&&GSToolBlockUtils.parseToolBlock(o.content)?.tool===SEARCH_TOOL)}function getSearchToolConfigs(o){let l=getSearchTools(o);if(!l||!l.length)return[];let t=[];return l.forEach(o=>{var e=l[0],e=GSToolBlockUtils.parseToolBlock(e.content);t.push(e.config)}),t}module.exports={getSearchTools:getSearchTools,getSearchToolConfigs:getSearchToolConfigs};
