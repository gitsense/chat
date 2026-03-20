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

async function resolveConnectedChatIds(e,t){console.warn("resolveConnectedChatIds: Logic not yet fully implemented. Returning simple connected IDs.");let r=new Set([t]);try{var n=await e("chats").select("parent_id","group_id").where("id",t).first();n&&(n.parent_id&&0!==n.parent_id&&r.add(n.parent_id),(await e("chats").select("id").where("parent_id",t)).forEach(e=>r.add(e.id)))}catch(e){console.error("Error resolving connected chat IDs:",e)}return Array.from(r)}module.exports={resolveConnectedChatIds:resolveConnectedChatIds};
