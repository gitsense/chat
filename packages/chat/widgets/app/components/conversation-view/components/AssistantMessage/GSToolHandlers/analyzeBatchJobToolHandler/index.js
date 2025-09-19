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

let GSToolBlockUtils=require("../../../../utils/GSToolBlockUtils"),ANALYZE_BATCH_JOB_TOOL=require("../constants").ANALYZE_BATCH_JOB_TOOL,JobUI=require("./JobUI");async function handleAnalyzeBatchJobTool(e,o,a,n){if(!e||null==e.message||!o||!a)return console.error("handleAnalyzeBatchJobTool: Missing required parameters."),!1;if(!a.chat||!a.chat.messages||!a.chat.messages[0])return console.error("handleAnalyzeBatchJobTool: Invalid chat context."),!1;var r=GSToolBlockUtils.getToolBlocksByTool(e.message,ANALYZE_BATCH_JOB_TOOL);if(0===r.length)return!1;if(1!==r.length)return console.warn("More than one analyze-batch-job tool defined. Update message to ensure there is only one."),!1;if(a.renderedMessage[e.id]?.gitsenseChatTools?.analyzeBatchJob)return!1;r=r[0].toolData;try{var s=new JobUI(e,o,a,r.config);return await s.init(),a.renderedMessage[e.id]||(a.renderedMessage[e.id]={}),a.renderedMessage[e.id].gitsenseChatTools||(a.renderedMessage[e.id].gitsenseChatTools={}),a.renderedMessage[e.id].gitsenseChatTools.analyzeBatchJob=!0,a.renderedMessage[e.id].gitsenseChatTools.analyzeBatchJobManager=s,!0}catch(e){return console.error("handleAnalyzeBatchJobTool: Error initializing JobUI:",e),!1}}module.exports={handleAnalyzeBatchJobTool:handleAnalyzeBatchJobTool};
