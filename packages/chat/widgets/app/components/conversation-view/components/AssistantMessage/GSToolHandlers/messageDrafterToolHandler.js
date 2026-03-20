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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),MESSAGE_DRAFTER_TOOL=require("./constants").MESSAGE_DRAFTER_TOOL,MessageDrafter=require("../../../../message-drafter").MessageDrafter;async function handleMessageDrafterTool(e,s,r,a){if(!e||null==e.message||!s||!r)return console.error("handleMessageDrafterTool: Missing required parameters."),!1;if(!r.chat||!r.chat.messages||!r.chat.messages[0])return console.error("handleMessageDrafterTool: Invalid chat context."),!1;if("message-drafter"!==e.type)return!1;if(r.renderedMessage[e.id]?.gitsenseChatTools?.messageDrafter)return!1;var o=GSToolBlockUtils.getToolBlocksByTool(e.message,MESSAGE_DRAFTER_TOOL,CodeBlockUtils);if(0===o.length)return!1;if(1!==o.length)return console.warn("More than one message drafter tool defined. Update message to ensure there is only one."),!1;o[0].toolData.config;try{return r.renderedMessage[e.id]||(r.renderedMessage[e.id]={}),r.renderedMessage[e.id].gitsenseChatTools||(r.renderedMessage[e.id].gitsenseChatTools={}),r.renderedMessage[e.id].gitsenseChatTools.messageDrafter={cleanup:()=>{console.log("Message Drafter Tool cleanup called")}},s.innerHTML="",new MessageDrafter(s,e,r).initialize(),!0}catch(e){return console.error("handleMessageDrafterTool: Error processing tool block:",e),!1}}module.exports={handleMessageDrafterTool:handleMessageDrafterTool};
