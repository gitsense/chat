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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),chatApi=require("../../chat"),MESSAGE_DRAFTER_TOOL_NAME="message-drafter";class StateManager{static async save(e,t,r,s=!0){var a=GSToolBlockUtils.getToolBlocksByTool(e.message,MESSAGE_DRAFTER_TOOL_NAME,CodeBlockUtils);if(1!==a.length)throw new Error(`MessageDrafter.StateManager.save: Found ${a.length} ${MESSAGE_DRAFTER_TOOL_NAME} tool blocks`);try{var o=a[0].toolData||{},c={tool:MESSAGE_DRAFTER_TOOL_NAME,config:{...o.config,...r}},i=GSToolBlockUtils.formatToolBlock(c);return e.message=CodeBlockUtils.updateCodeBlockByIndex(e.message,a[0].index,i),s&&await chatApi.updateChatMessage(t.widget,e.id,{newMessage:e.message}),{success:!0}}catch(e){return console.error("Error saving state:",e),{success:!1,error:e}}}static async restore(e,t){e=GSToolBlockUtils.getToolBlocksByTool(e.message,MESSAGE_DRAFTER_TOOL_NAME,CodeBlockUtils);if(1!==e.length)throw new Error(`MessageDrafter.StateManager.restore: Expected to find one ${MESSAGE_DRAFTER_TOOL_NAME} tool block but found `+e.length);e=e[0].toolData?.config||{};try{return e}catch(e){return console.error("Error restoring state:",e),null}}static async updateMessageContent(e,t,r){try{var s=await this.restore(e,t)||{},a={...s,message:{...s.message,content:r}};return await this.save(e,t,a)}catch(e){return console.error("Error updating message content:",e),{success:!1,error:e.message}}}static async updateUIState(e,t,r){try{var s=await this.restore(e,t)||{},a={...s,ui:{...s.ui,...r}};return await this.save(e,t,a)}catch(e){return console.error("Error updating UI state:",e),{success:!1,error:e.message}}}static async updateLastSaveTime(e,t,r){try{var s=await this.restore(e,t)||{},a={...s,ui:{...s.ui,lastSaveTime:r.toISOString()}};return await this.save(e,t,a)}catch(e){return console.error("Error updating last save time:",e),{success:!1,error:e.message}}}}module.exports=StateManager;
