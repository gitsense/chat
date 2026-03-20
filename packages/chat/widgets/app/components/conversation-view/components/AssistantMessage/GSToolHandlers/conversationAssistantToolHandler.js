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

let{ChatUtils,CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),CONVERSATION_ASSISTANT_TOOL=require("./constants").CONVERSATION_ASSISTANT_TOOL,{chatApi,MessagesTool}=require("../../../Dependencies");async function handleConversationAssistantTool(e,n,a,t){if(!e||null==e.message||!n||!a)return console.error("handleConversationAssistantTool: Missing required parameters."),!1;if("conversation-analysis-data"===e.type){if(a.renderedMessage[e.id]?.gitsenseChatTools?.conversationAssistant)return!1;var i=GSToolBlockUtils.getToolBlocksByTool(e.message,CONVERSATION_ASSISTANT_TOOL,CodeBlockUtils);if(0===i.length)return!1;if(1!==i.length)return console.warn("More than one conversation assistant tool defined. Update message to ensure there is only one."),!1;var o,i=i[0].toolData.config||{};try{n.innerHTML="";let t=await chatApi.getChat(a.widget,i.origChatUuid);if(!t)return g=`# Error

**Unable to retrieve original chat**

No chat with the UUID \`${i.origChatUuid}\` was found. This conversation analysis reference may be invalid.

Please check the chat UUID and try again.`,o=a.md.render(g),n.innerHTML=o,!1;let s=ChatUtils.getChatMessages(t).filter(e=>"public"===e.visibility);var r=s.length,l=(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),d=`# Conversation Analysis

- **Original Chat:** [${t.name||"Untitled Chat"}](/?chat=${t.uuid})
- **Analysis Type:** Conversation Intelligence  
- **Analyzed:** ${r} public messages  
- **Created:** ${l}

This conversation analysis chat contains ${r} public messages from "${t.name||"Untitled Chat"}" and is designed to help you:

- Analyze conversation content and structure
- Identify optimal ranges for message compaction
- Understand what has been discussed
- Track questions and decisions
- Get recommendations for conversation optimization

[Vew Messages](#)

---

**Note:** This is a temporary analysis chat created as a child of the original conversation. Use the insights here to inform your compaction decisions in the Messages Tool.`,c=a.md.render(d),h=(n.innerHTML=c,n.querySelector("a"));return h&&h.addEventListener("click",e=>{e.preventDefault();e=s.map((e,n)=>({id:e.id,position:n+1,type:e.type,role:e.role,content:e.message,meta:e.meta,visibility:e.visibility,created_at:e.created_at,updated_at:e.updated_at}));let n=new MessagesTool(e,{...a,chat:t},{title:"Conversation Analysis",showActionBar:!0,viewMode:"checkbox",defaultSkimOptions:{leadingLines:5,trailingLines:5},layout:{leftPanel:"selection",rightPanel:"preview"},onClose:()=>{n&&(n.cleanup(),n=null)}});n.show()}),a.renderedMessage[e.id]||(a.renderedMessage[e.id]={}),a.renderedMessage[e.id].gitsenseChatTools||(a.renderedMessage[e.id].gitsenseChatTools={}),a.renderedMessage[e.id].gitsenseChatTools.conversationAssistant={cleanup:()=>{n.innerHTML=""}},!0}catch(e){console.error("handleConversationAssistantTool: Error processing tool block:",e);var i=`# Error

**An error occurred while processing the conversation analysis reference**

\`${e.message||"Unknown error"}\`

Please check the console for more details and try again.`,g=a.md.render(i);return n.innerHTML=g,!1}}}module.exports={handleConversationAssistantTool:handleConversationAssistantTool};
