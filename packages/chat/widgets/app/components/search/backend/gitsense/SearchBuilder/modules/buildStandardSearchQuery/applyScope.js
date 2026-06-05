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

let resolveDescendantChatIds=require("../scopeResolvers/resolveDescendantChatIds").resolveDescendantChatIds,resolveConnectedChatIds=require("../scopeResolvers/resolveConnectedChatIds").resolveConnectedChatIds;async function applyScope(t,e,l,n){let c=e;var e="all-chats"!==l.scope&&null!==n,a=null!==l.chatIds&&0<l.chatIds.length;if(e||a){let s=null;if(e){let e=null;"current-chat"===l.scope?e=[n]:"current-chat-and-branches"===l.scope?e=await resolveDescendantChatIds(t,n):"connected-chats"===l.scope&&(e=await resolveConnectedChatIds(t,n)),s=e}null!==(s=a?null!==s?s.filter(e=>l.chatIds.includes(e)):l.chatIds:s)&&0<s.length&&(c=c.where(function(){l.targets.includes("chats")&&null!==s&&this.orWhereIn("chats.id",s),l.targets.includes("messages")&&null!==s&&this.orWhereIn("messages.chat_id",s)}))}else"all-chats"===l.scope||null!==n||a||console.warn(`Scope "${l.scope}" requires a current chat ID, but none was provided. Scope filter will not be applied.`);return{queryBuilder:c}}module.exports={applyScope:applyScope};
