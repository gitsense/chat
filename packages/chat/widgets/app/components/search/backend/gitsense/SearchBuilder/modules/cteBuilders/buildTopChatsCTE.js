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

function buildTopChatsCTE(t,e,a,s,d){let l=t.from("cte_chats").select("chat_id","last_updated_at","num_messages");return l=(l=null!==a&&0<a.length?l.whereIn("chat_id",a):l).orderBy("last_updated_at","desc").limit(s).offset(d)}module.exports={buildTopChatsCTE:buildTopChatsCTE};
