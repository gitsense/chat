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

let GSToolBlockUtils=require("@gitsense/gsc-utils").GSToolBlockUtils,updateConfig=require("../../../../utils/updateConfig").updateConfig,chatApi=require("../../../../Dependencies").chatApi,SEARCH_TOOL=require("../../../../constants").SEARCH_TOOL;async function handleSearchError(r,t,a,o,e,n,s){var i=o?.message||String(o),c=o?.stack||"No stack trace available";if(console.error(`Search Error Handler: Handling error in state "${a?.type||"Unknown"}": ${i}
Stack: `+c),s){a&&!a.started_at&&(a.started_at=(new Date).toISOString()),a&&(a.finished_at=(new Date).toISOString(),a.error=i,a.error_stack=c);let e=s.failStage(a?.type||"Search Process",i)+`

### Error

${i}

\`\`\`
${c}
\`\`\`
`;o.response&&(e+=`### Response
\`\`\`
${o.response}
\`\`\`
`);s={tool:SEARCH_TOOL,config:t},a=GSToolBlockUtils.formatToolBlock(s),i=e+`

\`\`\`txt
${a}
\`\`\``;try{await chatApi.updateChatMessage(n.widget,r.id,null,i)}catch(o){console.error("updateMessageContent: Error updating message content:",o)}n.updateChat&&"function"==typeof n.updateChat?n.updateChat():console.warn("Search Error Handler: Unable to update chat since it is not defined in the context")}else console.error("Search Error Handler: progressRenderer not defined. Cannot update UI.")}module.exports={handleSearchError:handleSearchError};
