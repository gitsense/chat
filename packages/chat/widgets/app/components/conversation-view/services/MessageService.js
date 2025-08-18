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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let MessageUtils=require("@gitsense/gsc-utils"),chatApi=require("../Dependencies");async function setChat(e){if(chatApi.setChat)return chatApi.setChat(e);throw new Error("setChat method not available")}async function getChat(e,t){if(e&&chatApi.newChat)return chatApi.getChat(e,t);throw new Error("Widget or newChat method not available")}async function newChat(e,t){if(e&&chatApi.newChat)return chatApi.newChat(e,t);throw new Error("Widget or newChat method not available")}async function updateChats(e,t){if(e&&chatApi.newChat)return chatApi.updateChats(e,t);throw new Error("Widget or newChat method not available")}async function newChatMessage(e,t,a,s,r,n,i={}){if(e&&chatApi.newChatMessage)return chatApi.newChatMessage(e,t,a,s,r,n,i);throw new Error("Widget or newChatMessage method not available")}async function updateChatMessage(e,t,a,s){if(e&&chatApi.updateChatMessage)return chatApi.updateChatMessage(e,t,a,s);throw new Error("Widget or updateChatMessage method not available")}async function updateChatAnalyzer(e,t,a){if(e&&chatApi.updateChatAnalyzer)return chatApi.updateChatAnalyzer(e,t,a);throw new Error("Widget or updateChatAnalyzer method not available")}async function deleteChatMessage(e,t,a=!1){if(e&&chatApi.deleteChatMessage)return chatApi.deleteChatMessage(e,t,a);throw new Error("Widget or deleteChatMessage method not available")}async function resetChatMessage(e,t){if(e&&chatApi.resetChatMessage)return chatApi.resetChatMessage(e,t);throw new Error("Widget or resetChatMessage method not available")}function createSplitOrValidatePayload(e,t,a,s,r,n,i,h,o,l,g){var d=MessageUtils.getMessagesBeforeId(t,e.messages[0]),t="system"===d[0].role?d.shift():null,u=[];for(let e=0;e<d.length;e++){var{role:c,message:C}=d[e];if("user"===c)u.push("<user_message>"+C+"</user_message>");else{if("assistant"!==c)throw new Error("Unrecognized message role "+c);u.push("<assistant_message>"+C+"</assistant_message>")}}var t=(t?t.message+"\n\n":"")+"# Conversation History\n\nThe following XML-style tags represent a previous conversation, where user messages are enclosed in <user_message> tags and assistant responses in <assistant_message> tags. Please consider this conversation history as context for our continued interaction:\n\n"+u.join("\n"),p=e.uuid.replace(/-/g,"").substring(0,8);return{type:"validate-chat"===a?"validate":"split",name:("validate-chat"===a?"Validate":"Split")+` :: ${l} :: `+g,model:s,temperature:h,parentId:n,groupId:i,message:r,systemMessageName:e.prompt+" :: "+p+" :: "+d[d.length-1].id,systemMessage:t,analysis:o}}function getUniqueModels(e,t=new Set){if(e&&e.length)for(var a of e){var{model:a,kids:s}=a;a&&t.add(a),s&&s.length&&getUniqueModels(s,t)}return Array.from(t)}module.exports={setChat:setChat,getChat:getChat,newChat:newChat,updateChats:updateChats,newChatMessage:newChatMessage,updateChatAnalyzer:updateChatAnalyzer,updateChatMessage:updateChatMessage,deleteChatMessage:deleteChatMessage,resetChatMessage:resetChatMessage,createSplitOrValidatePayload:createSplitOrValidatePayload,getUniqueModels:getUniqueModels};
