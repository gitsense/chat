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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),chatApi=require("../../../chat"),BULK_BATCH_JOB_TOOL_NAME="bulk-batch-job";class StateManager{static async save(t,r,o,e=!0){var a=GSToolBlockUtils.getToolBlocksByTool(t.message,BULK_BATCH_JOB_TOOL_NAME,CodeBlockUtils);if(1!==a.length)throw new Error(`BulkBatchJob.StateManager.save: Found ${a.length} ${BULK_BATCH_JOB_TOOL_NAME} tool blocks`);try{var s=a[0].toolData||{},c={tool:BULK_BATCH_JOB_TOOL_NAME,config:{...s.config,batchGroups:o.batchGroups||[]}},l=GSToolBlockUtils.formatToolBlock(c);return t.message=CodeBlockUtils.updateCodeBlockByIndex(t.message,a[0].index,l),e&&await chatApi.updateChatMessage(r.widget,t.id,{newMessage:t.message}),{success:!0}}catch(t){return console.error("Error saving state:",t),{success:!1,error:t}}}static async restore(t,r){t=GSToolBlockUtils.getToolBlocksByTool(t.message,BULK_BATCH_JOB_TOOL_NAME,CodeBlockUtils);if(1!==t.length)throw new Error(`BulkBatchJob.StateManager.restore: Expected to find one ${BULK_BATCH_JOB_TOOL_NAME} tool block but found `+t.length);t=t[0].toolData?.config||null;if(!t)throw new Error("BulkBatchJob.StateManager.restore: No tool data config defined");try{return{batchGroups:t.batchGroups||[]}}catch(t){return console.error("Error restoring state:",t),null}}static async updateBatchGroups(t,r,o){try{var e,a=await this.restore(t,r);return a?(e={...a,batchGroups:o},await this.save(t,r,e)):await this.save(t,r,{batchGroups:o})}catch(t){return console.error("Error updating batch groups:",t),{success:!1,error:t.message}}}static async getGroupChatUuid(t,r,o){try{var e,a=await this.restore(t,r);return a&&a.batchGroups?(e=a.batchGroups.find(t=>t.id===o))?e.chatUuid:null:null}catch(t){return console.error("Error getting group chat UUID:",t),null}}static async setGroupChatUuid(t,r,o,e){try{var a,s=await this.restore(t,r);return s&&s.batchGroups?-1===(a=s.batchGroups.findIndex(t=>t.id===o))?{success:!1,error:`Group with ID ${o} not found`}:(s.batchGroups[a].chatUuid=e,await this.save(t,r,s)):{success:!1,error:"No state found"}}catch(t){return console.error("Error setting group chat UUID:",t),{success:!1,error:t.message}}}}module.exports=StateManager;
