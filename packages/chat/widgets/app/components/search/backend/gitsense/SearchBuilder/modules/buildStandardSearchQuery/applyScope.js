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

let resolveDescendantChatIds=require("../scopeResolvers/resolveDescendantChatIds").resolveDescendantChatIds,resolveConnectedChatIds=require("../scopeResolvers/resolveConnectedChatIds").resolveConnectedChatIds;async function applyScope(t,e,l,n){let c=e;var e="all-chats"!==l.scope&&null!==n,a=null!==l.chatIds&&0<l.chatIds.length;if(e||a){let s=null;if(e){let e=null;"current-chat"===l.scope?e=[n]:"current-chat-and-branches"===l.scope?e=await resolveDescendantChatIds(t,n):"connected-chats"===l.scope&&(e=await resolveConnectedChatIds(t,n)),s=e}null!==(s=a?null!==s?s.filter(e=>l.chatIds.includes(e)):l.chatIds:s)&&0<s.length&&(c=c.where(function(){l.targets.includes("chats")&&null!==s&&this.orWhereIn("chats.id",s),l.targets.includes("messages")&&null!==s&&this.orWhereIn("messages.chat_id",s)}))}else"all-chats"===l.scope||null!==n||a||console.warn(`Scope "${l.scope}" requires a current chat ID, but none was provided. Scope filter will not be applied.`);return{queryBuilder:c}}module.exports={applyScope:applyScope};
