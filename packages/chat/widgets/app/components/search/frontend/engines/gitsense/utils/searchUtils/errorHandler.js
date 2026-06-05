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
