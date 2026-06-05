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

let ChatUtils=require("@gitsense/gsc-utils").ChatUtils,chatApi=require("../../../../../Dependencies").chatApi,MessageService=require("../../../../../services/MessageService");async function openAnalyzerChat(e,a,t,i){var n,s,{chat:r,widget:o}=a,l=await chatApi.getChat(o,e);l?((n=ChatUtils.getChatMessages(l)).forEach(e=>{e.message=e.message.replace(/demo-contextual-security-reviewer/g,i.split("::")[0])}),s=n[n.length-1],l=await chatApi.newChat(o,{name:"Create "+i,type:l.type,parentId:r.id,forkedFromMessageId:s.id,model:r.main_model,messages:n,temperature:0}),window.open("/?chat="+l.uuid,"_blank"),await MessageService.newChatMessage(o,r.id,{parentId:t.id,model:r.main_model,role:"assistant",message:`
### Waiting for Analyzer Creation...

We're waiting for you to create the analyzer in the other tab. Once you click **"Save Analyzer"**, we'll detect it automatically.

Time elapsed: \`0\` seconds

**Don't want to wait?** You can stop waiting and jump directly to the analysis part of the demo.

[**Skip to Analysis**]()`,meta:{onlyDemoHandler:!0,demo:{analyzerId:i,newAnalyzerChatUuid:l.uuid,scene:{id:"data-insights-await-analyzer-creation",rendered:!0}}},visibility:"human-public"}),a.updateChat()):console.error(`No create new analyzer chat with the UUID ${e} found`)}module.exports={openAnalyzerChat:openAnalyzerChat};
