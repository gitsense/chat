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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,chatApi=require("../../../../Dependencies").chatApi;async function forkAndCustomizeChat(e,t,a,s,r,i,h){var n,o,l=await chatApi.getChat(t,e);return l?((n=ChatUtils.getChatMessages(l)).forEach(e=>{e.message=e.message.replace(new RegExp(a,"g"),s)}),o=n[n.length-1],await chatApi.newChat(t,{name:r,type:l.type,parentId:i,forkedFromMessageId:o.id,model:h,messages:n,temperature:0})):(console.error(`No chat template with the UUID ${e} found`),null)}module.exports={forkAndCustomizeChat:forkAndCustomizeChat};
