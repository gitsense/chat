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

async function resolveConnectedChatIds(e,t){console.warn("resolveConnectedChatIds: Logic not yet fully implemented. Returning simple connected IDs.");let r=new Set([t]);try{var n=await e("chats").select("parent_id","group_id").where("id",t).first();n&&(n.parent_id&&0!==n.parent_id&&r.add(n.parent_id),(await e("chats").select("id").where("parent_id",t)).forEach(e=>r.add(e.id)))}catch(e){console.error("Error resolving connected chat IDs:",e)}return Array.from(r)}module.exports={resolveConnectedChatIds:resolveConnectedChatIds};
