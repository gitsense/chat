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

let{TARGET_TABLE_MAP,FIELD_TABLE_MAP}=require("../../constants"),routeFilters=require("./filterRouter").routeFilters,buildMatchedMessagesCTE=require("./buildMatchedMessagesCTE").buildMatchedMessagesCTE,buildMatchedChatsCTE=require("./buildMatchedChatsCTE").buildMatchedChatsCTE,buildMatchedCodeBlocksCTE=require("./buildMatchedCodeBlocksCTE").buildMatchedCodeBlocksCTE,resolveDescendantChatIds=require("../scopeResolvers/resolveDescendantChatIds").resolveDescendantChatIds,resolveConnectedChatIds=require("../scopeResolvers/resolveConnectedChatIds").resolveConnectedChatIds,DEBUG_BUILD_INITIAL_QUERY="TRUE"===process.env.GSC_DEBUG_QUERY?.toUpperCase();async function buildInitialQuery(s,t,e,a){DEBUG_BUILD_INITIAL_QUERY&&(console.log("BUILD INTITIAL QUERY"),console.log(JSON.stringify({db:s,parsedQuery:t,parsedOutputs:e,currentChatId:a},null,2)));var l=t.targets.map(e=>TARGET_TABLE_MAP[e]).filter(Boolean);if(0===l.length)throw new Error("No valid search targets specified.");var c=routeFilters(t);let d=null,o=null,i=null;var r="all-chats"!==t.scope&&null!==a,n=null!==t.chatIds&&0<t.chatIds.length,h=null!==t.repoFullNames&&0<t.repoFullNames.length;if(r||n||h){o="cte_filter_chat_ids";let e=s("chats").select("chats.id as chat_id");r&&("current-chat"===t.scope?d=[a]:"current-chat-and-branches"===t.scope?d=await resolveDescendantChatIds(s,a):"connected-chats"===t.scope&&(d=await resolveConnectedChatIds(s,a)),null!==d&&0===d.length?i=s.raw("SELECT -10000000 as chat_id WHERE 1 = 0"):null!==d&&(e=e.whereIn("chats.id",d))),n&&null===i?e=e.whereIn("chats.id",t.chatIds):n&&i,h&&null===i?e=e.join("groups","chats.group_id","groups.id").whereIn("groups.name",t.repoFullNames):h&&i,null===i&&(i=e)}r={},a=e.targetSpecific||{};t.targets.includes("messages")&&(r.messages=buildMatchedMessagesCTE(s,t,c.messages,a.messages||[],o)),t.targets.includes("chats")&&(r.cte_matched_chats=buildMatchedChatsCTE(s,t,c.chats,a.chats||[],o)),t.targets.includes("code-blocks")&&(r.cte_matched_code_blocks=buildMatchedCodeBlocksCTE(s,t,c.code_blocks,a["code-blocks"]||[],o));let u=null;if(t.targets.includes("messages"))u="messages";else if(t.targets.includes("chats"))u="chats";else{if(!t.targets.includes("code-blocks"))throw new Error("Could not determine a base table for the query.");u="code_blocks"}let g=s(u);return"messages"!==u&&t.targets.includes("messages")&&("chats"===u?g=g.leftJoin("messages","chats.id","messages.chat_id"):"code_blocks"===u&&(g=g.leftJoin("messages","code_blocks.message_id","messages.id"))),"chats"!==u&&t.targets.includes("chats")&&("messages"===u?g=g.leftJoin("chats","messages.chat_id","chats.id"):"code_blocks"===u&&(g=(g=t.targets.includes("messages")?g:g.leftJoin("messages","chats.id, messages.chat_id")).leftJoin("chats","messages.chat_id","chats.id"))),"code_blocks"!==u&&t.targets.includes("code-blocks")&&("messages"===u?g=g.leftJoin("code_blocks","messages.id","code_blocks.message_id"):"chats"===u&&(g=(g=t.targets.includes("messages")?g:g.leftJoin("messages","chats.id","messages.chat_id")).leftJoin("code_blocks","messages.id","code_blocks.message_id"))),{baseQueryBuilder:g,matchCTEs:r,mainTables:l,tableFilters:c,filterChatIdsCteName:o,filterCteQuery:i}}module.exports={buildInitialQuery:buildInitialQuery};
