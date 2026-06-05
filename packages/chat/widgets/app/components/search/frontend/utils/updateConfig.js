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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),chatApi=require("../Dependencies").chatApi;async function updateConfig(e,o,t){if(!e||null==e.message||!o)throw new Error("updateConfig: Missing required parameters (message or newConfig).");if(!t||!t.widget)throw new Error("updateConfig: Missing required context parameters or context invalid");var i,l=e.message,n=CodeBlockUtils.extractCodeBlocks(l,{silent:!0}).blocks,n=n.find((e,o)=>{if(GSToolBlockUtils.isToolBlock(e.content)&&"search"===GSToolBlockUtils.parseToolBlock(e.content)?.tool)return e.index=o,e});if(n)return i=GSToolBlockUtils.parseToolBlock(n.content),(o={...o}).layoutName&&(o.layout=o.layoutName,delete o.layoutName),o.engineName&&(o.engine=o.engineName,delete o.engineName),delete o.actions,i.config=o,o=GSToolBlockUtils.formatToolBlock(i),i=CodeBlockUtils.updateCodeBlockByIndex(l,n.index,o,n.language),await chatApi.updateChatMessage(t.widget,e.id,null,i),!0;throw new Error("updateConfig: No search tool block found in the message.")}module.exports={updateConfig:updateConfig};
