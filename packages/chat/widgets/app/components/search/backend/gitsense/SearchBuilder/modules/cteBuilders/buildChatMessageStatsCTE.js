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

function buildChatMessageStatsCTE(s,e=null){let a=s("messages").select("messages.chat_id").where("messages.deleted",0);return a=(a=e?a.join(e,e+".id","messages.chat_id"):a).max("messages.updated_at as last_updated_at").count("* as num_messages").groupBy("messages.chat_id")}module.exports={buildChatMessageStatsCTE:buildChatMessageStatsCTE};
