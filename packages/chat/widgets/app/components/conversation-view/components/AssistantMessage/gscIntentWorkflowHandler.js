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

let{IntentWorkflowManager,IntentWorkflowMetadataUtils}=require("../../../claude-code");async function handleIntentWorkflowMessage(e,n,t,r){if("gsc-intent-workflow"!==e.type)return!1;if(!IntentWorkflowMetadataUtils.extractMetadata(e))return console.warn("[agentHandler] Message type is gsc-intent-workflow but no meta found."),!1;e=new IntentWorkflowManager(n,e,t);try{await e.init()}catch(e){console.error("[agentHandler] Error initializing IntentWorkflowManager:",e),n.innerHTML=`<div style="color: red; padding: 10px;">Error loading Agent session: ${e.message}</div>`}return!0}module.exports={handleIntentWorkflowMessage:handleIntentWorkflowMessage};
