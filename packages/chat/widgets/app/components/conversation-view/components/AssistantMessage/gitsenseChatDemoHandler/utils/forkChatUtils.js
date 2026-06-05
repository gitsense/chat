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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,chatApi=require("../../../../Dependencies").chatApi;async function forkAndCustomizeChat(e,t,a,s,r,i,h){var n,o,l=await chatApi.getChat(t,e);return l?((n=ChatUtils.getChatMessages(l)).forEach(e=>{e.message=e.message.replace(new RegExp(a,"g"),s)}),o=n[n.length-1],await chatApi.newChat(t,{name:r,type:l.type,parentId:i,forkedFromMessageId:o.id,model:h,messages:n,temperature:0})):(console.error(`No chat template with the UUID ${e} found`),null)}module.exports={forkAndCustomizeChat:forkAndCustomizeChat};
