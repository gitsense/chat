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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),chatApi=require("../../../chat"),IMPORT_DATA_TOOL_NAME="import-data";class StateManager{static async save(r,t,e,a=!0){var s=GSToolBlockUtils.getToolBlocksByTool(r.message,IMPORT_DATA_TOOL_NAME,CodeBlockUtils);if(1!==s.length)throw new Error(`ImportData.StateManager.save: Found ${s.length} ${IMPORT_DATA_TOOL_NAME} tool blocks`);try{var o=s[0].toolData||{},n={tool:IMPORT_DATA_TOOL_NAME,config:{...o.config,...e}},c=GSToolBlockUtils.formatToolBlock(n);return r.message=CodeBlockUtils.updateCodeBlockByIndex(r.message,s[0].index,c),a&&await chatApi.updateChatMessage(t.widget,r.id,{newMessage:r.message}),{success:!0}}catch(r){return console.error("Error saving state:",r),{success:!1,error:r}}}static async restore(r,t){r=GSToolBlockUtils.getToolBlocksByTool(r.message,IMPORT_DATA_TOOL_NAME,CodeBlockUtils);if(1!==r.length)throw new Error(`ImportData.StateManager.restore: Expected to find one ${IMPORT_DATA_TOOL_NAME} tool block but found `+r.length);r=r[0].toolData?.config||{};try{return r}catch(r){return console.error("Error restoring state:",r),null}}static async updateUploadedFiles(r,t,e){try{var a={...await this.restore(r,t)||{},uploadedFiles:e};return await this.save(r,t,a)}catch(r){return console.error("Error updating uploaded files:",r),{success:!1,error:r.message}}}static async updateSubmittedJobs(r,t,e){try{var a={...await this.restore(r,t)||{},submittedJobs:e};return await this.save(r,t,a)}catch(r){return console.error("Error updating submitted jobs:",r),{success:!1,error:r.message}}}static async saveErrorState(r,t,e,a={}){try{var s={...await this.restore(r,t)||{},lastError:{type:e.type||"unknown",code:e.code||"UNKNOWN_ERROR",message:e.message,details:e.details||{},timestamp:(new Date).toISOString()},operationState:a,hasError:!0};return await this.save(r,t,s)}catch(r){return console.error("Error saving error state:",r),{success:!1,error:r.message}}}static async clearErrorState(r,t){try{var e={...await this.restore(r,t)||{},lastError:null,operationState:null,hasError:!1};return await this.save(r,t,e)}catch(r){return console.error("Error clearing error state:",r),{success:!1,error:r.message}}}static async getLastError(r,t){try{return(await this.restore(r,t)||{}).lastError||null}catch(r){return console.error("Error getting last error:",r),null}}static async getOperationState(r,t){try{return(await this.restore(r,t)||{}).operationState||null}catch(r){return console.error("Error getting operation state:",r),null}}static async hasErrorState(r,t){try{var e=await this.restore(r,t)||{};return!0===e.hasError&&null!==e.lastError}catch(r){return console.error("Error checking error state:",r),!1}}static async saveRetryState(r,t,e,a){try{var s={...await this.restore(r,t)||{},retryState:{retryCount:e,maxRetries:a,canRetry:e<a,lastRetryAt:(new Date).toISOString()}};return await this.save(r,t,s)}catch(r){return console.error("Error saving retry state:",r),{success:!1,error:r.message}}}static async getRetryState(r,t){try{return(await this.restore(r,t)||{}).retryState||null}catch(r){return console.error("Error getting retry state:",r),null}}}module.exports=StateManager;
