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

let{CodeBlockUtils,DomUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),BULK_BATCH_JOB_TOOL=require("./constants").BULK_BATCH_JOB_TOOL,BulkBatchJobManager=require("../../../../bulk-batch-job").BulkBatchJobManager;async function handleBulkBatchJobTool(e,o,t,a){if(!e||null==e.message||!o||!t)return console.error("handleBulkBatchJobTool: Missing required parameters."),!1;if(!t.chat||!t.chat.messages||!t.chat.messages[0])return console.error("handleBulkBatchJobTool: Invalid chat context."),!1;var l=GSToolBlockUtils.getToolBlocksByTool(e.message,BULK_BATCH_JOB_TOOL,CodeBlockUtils);if(0===l.length)return!1;if(1!==l.length)return console.warn("More than one analyze-batch-job tool defined. Update message to ensure there is only one."),!1;if(t.renderedMessage[e.id]?.gitsenseChatTools?.bulkBatchJob)return!1;var{batchJobId:l,batchType:s,batchGroups:r}=l[0].toolData?.config||{};try{t.renderedMessage[e.id]||(t.renderedMessage[e.id]={}),t.renderedMessage[e.id].gitsenseChatTools||(t.renderedMessage[e.id].gitsenseChatTools={}),t.renderedMessage[e.id].gitsenseChatTools.bulkBatchJob=!0;var n=DomUtils.h.createH1({text:"Bulk Batch Job #"+l}),i=DomUtils.h.createDiv({style:{paddingBottom:"10px"}});return o.innerHTML="",o.appendChild(n),o.appendChild(i),new BulkBatchJobManager(i,{batchJobId:l,batchType:s,batchGroups:r,context:t,message:e}).initialize(),!0}catch(e){return console.error("handleBulkBatchJobTool: Error initializing JobUI:",e),!1}}module.exports={handleBulkBatchJobTool:handleBulkBatchJobTool};
