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

let MessageUtils=require("@gitsense/gsc-utils"),chatApi=require("../Dependencies");async function setChat(e){if(chatApi.setChat)return chatApi.setChat(e);throw new Error("setChat method not available")}async function getChat(e,a){if(e&&chatApi.newChat)return chatApi.getChat(e,a);throw new Error("Widget or newChat method not available")}async function newChat(e,a){if(e&&chatApi.newChat)return chatApi.newChat(e,a);throw new Error("Widget or newChat method not available")}async function updateChats(e,a){if(e&&chatApi.newChat)return chatApi.updateChats(e,a);throw new Error("Widget or newChat method not available")}async function newChatMessage(e,a,t,s,n,r,i={}){if(e&&chatApi.newChatMessage)return chatApi.newChatMessage(e,a,t,s,n,r,i);throw new Error("Widget or newChatMessage method not available")}async function updateChatMessage(e,a,t,s){if(e&&chatApi.updateChatMessage)return chatApi.updateChatMessage(e,a,t,s);throw new Error("Widget or updateChatMessage method not available")}async function saveAnalyzer(e,a,t){if(e&&chatApi.saveAnalyzer)return chatApi.saveAnalyzer(e,a,t);throw new Error("Widget or saveAnalyzer method not available")}async function cloneAnalyzer(e,a,t){if(e&&chatApi.cloneAnalyzer)return chatApi.cloneAnalyzer(e,a,t);throw new Error("Widget or cloneAnalyzer method not available")}async function updateAnalyzer(e,a,t){if(e&&chatApi.updateAnalyzer)return chatApi.updateAnalyzer(e,a,t);throw new Error("Widget or updateAnalyzer method not available")}async function deleteChatMessage(e,a,t=!1){if(e&&chatApi.deleteChatMessage)return chatApi.deleteChatMessage(e,a,t);throw new Error("Widget or deleteChatMessage method not available")}async function resetChatMessage(e,a){if(e&&chatApi.resetChatMessage)return chatApi.resetChatMessage(e,a);throw new Error("Widget or resetChatMessage method not available")}function createSplitOrValidatePayload(e,a,t,s,n,r,i,o,h,l,d){var g=MessageUtils.getMessagesBeforeId(a,e.messages[0]),a="system"===g[0].role?g.shift():null,c=[];for(let e=0;e<g.length;e++){var{role:u,message:p}=g[e];if("user"===u)c.push("<user_message>"+p+"</user_message>");else{if("assistant"!==u)throw new Error("Unrecognized message role "+u);c.push("<assistant_message>"+p+"</assistant_message>")}}var a=(a?a.message+"\n\n":"")+"# Conversation History\n\nThe following XML-style tags represent a previous conversation, where user messages are enclosed in <user_message> tags and assistant responses in <assistant_message> tags. Please consider this conversation history as context for our continued interaction:\n\n"+c.join("\n"),C=e.uuid.replace(/-/g,"").substring(0,8);return{type:"validate-chat"===t?"validate":"split",name:("validate-chat"===t?"Validate":"Split")+` :: ${l} :: `+d,model:s,temperature:o,parentId:r,groupId:i,message:n,systemMessageName:e.prompt+" :: "+C+" :: "+g[g.length-1].id,systemMessage:a,analysis:h}}function getUniqueModels(e,a=new Set){if(e&&e.length)for(var t of e){var{model:t,kids:s}=t;t&&a.add(t),s&&s.length&&getUniqueModels(s,a)}return Array.from(a)}module.exports={setChat:setChat,getChat:getChat,newChat:newChat,updateChats:updateChats,newChatMessage:newChatMessage,cloneAnalyzer:cloneAnalyzer,saveAnalyzer:saveAnalyzer,updateAnalyzer:updateAnalyzer,updateChatMessage:updateChatMessage,deleteChatMessage:deleteChatMessage,resetChatMessage:resetChatMessage,createSplitOrValidatePayload:createSplitOrValidatePayload,getUniqueModels:getUniqueModels};
