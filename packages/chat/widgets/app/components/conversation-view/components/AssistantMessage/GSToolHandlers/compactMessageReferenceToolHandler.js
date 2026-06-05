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

let{ChatUtils,CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),COMPACT_MESSAGE_REFERENCE_TOOL=require("./constants").COMPACT_MESSAGE_REFERENCE_TOOL,{chatApi,CompactMessageValidator,MessagesTool}=require("../../../Dependencies");async function handleCompactMessageReferenceTool(e,a,n,s){if(!e||null==e.message||!a||!n)return console.error("handleCompactMessageReferenceTool: Missing required parameters."),!1;if("compact-messages-data"===e.type){if(n.renderedMessage[e.id]?.gitsenseChatTools?.compactMessageReference)return!1;var r,t=GSToolBlockUtils.getToolBlocksByTool(e.message,COMPACT_MESSAGE_REFERENCE_TOOL,CodeBlockUtils);if(0===t.length)return!1;if(1!==t.length)return console.warn("More than one compact message reference tool defined. Update message to ensure there is only one."),!1;let o=t[0].toolData.config||{};try{a.innerHTML="";let s=await chatApi.getChat(n.widget,o.origChatUuid);if(!s)return m=`# Error

**Unable to retrieve original chat**

No chat with the UUID \`${o.origChatUuid}\` was found. This compact message reference may be invalid.

Please check the chat UUID and try again.`,r=n.md.render(m),a.innerHTML=r,!1;let t=ChatUtils.getChatMessages(s);var i=CompactMessageValidator.validateHash(t,o.validationHash),c=((new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),t.length-o.messagesToCompact.length),l=i?"✅ Original chat exists and validation successful":"⚠️ Original chat exists but validation failed - the chat may have changed since this compact message was created",d=`# Compact Chat Messages

**Messages to Compact:** ${o.messagesToCompact.length} messages  
**Messages to Keep:** ${c} messages

This compact chat contains ${o.messagesToCompact.length} messages that need to be compacted from "${s.name||"Untitled Chat"}" and ${c} context messages that will be preserved. The compacted message will replace the selected range in a new chat.

[Review Messages](#)

---

`+l,g=n.md.render(d),h=(a.innerHTML=g,a.querySelector("a"));return h&&h.addEventListener("click",e=>{e.preventDefault();e=t.map((e,a)=>({id:e.id,position:a+1,type:e.type,role:e.role,content:e.message,meta:e.meta,visibility:e.visibility,created_at:e.created_at,updated_at:e.updated_at}));let a=new MessagesTool(e,{...n,chat:s},{title:"Compact Chat Messages",showActionBar:!1,viewMode:"checked",checkedMessageIds:o.messagesToCompact,defaultSkimOptions:{leadingLines:5,trailingLines:5},layout:{leftPanel:"selection",rightPanel:"preview"},onClose:()=>{a&&(a.cleanup(),a=null)}});a.show()}),n.renderedMessage[e.id]||(n.renderedMessage[e.id]={}),n.renderedMessage[e.id].gitsenseChatTools||(n.renderedMessage[e.id].gitsenseChatTools={}),n.renderedMessage[e.id].gitsenseChatTools.compactMessageReference={cleanup:()=>{a.innerHTML=""}},!0}catch(e){console.error("handleCompactMessageReferenceTool: Error processing tool block:",e);var t=`# Error

**An error occurred while processing the compact message reference**

\`${e.message||"Unknown error"}\`

Please check the console for more details and try again.`,m=n.md.render(t);return a.innerHTML=m,!1}}}module.exports={handleCompactMessageReferenceTool:handleCompactMessageReferenceTool};
