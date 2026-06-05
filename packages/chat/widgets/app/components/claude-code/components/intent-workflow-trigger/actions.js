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

let{newChatMessage,updateChatMessage}=require("../../../../chat"),IntentWorkflowMetadataUtils=require("../../utils/IntentWorkflowMetadataUtils").IntentWorkflowMetadataUtils;async function handleStartInlineAgent(e,t,a,r,n){try{var i=IntentWorkflowMetadataUtils.createInitialMetadata({autoReview:!1,intent:r,model:n,referenceFiles:[],enableCodeProvenance:!1,disableExperts:!1,skipDiscovery:!1}),s=await updateChatMessage(a.widget,e.id,{newType:"gsc-intent-workflow",newMeta:i,newMessage:""});s&&s.success?a.updateChat():(console.error("Failed to start inline agent:",s?.error),alert("Failed to start inline agent. Please try again."))}catch(e){console.error("Error starting inline agent:",e),alert("Failed to start inline agent. Please try again.")}}async function handleAskAIToFix(e,t,a,r,n){try{var i,s=constructFixMessage(r,n),l=await newChatMessage(a.widget,a.chat.id,e.id,a.chat.main_model,"user",s);l.success?(i=await newChatMessage(a.widget,a.chat.id,l.message.id,a.chat.main_model,"assistant",null,{stream:!0})).success?a.updateChat():(console.error("Failed to create assistant message:",i.error),alert("Failed to ask AI to fix. Please try again.")):(console.error("Failed to create user message:",l.error),alert("Failed to ask AI to fix. Please try again."))}catch(e){console.error("Error asking AI to fix:",e),alert("Failed to ask AI to fix. Please try again.")}}function constructFixMessage(e,t){switch(e){case"malformed-json":return`The inline agent trigger you generated has malformed JSON. Please regenerate it with correct JSON syntax.

Error: `+t;case"missing-fields":return`The inline agent trigger you generated is missing required fields. Please regenerate it with all required fields (title, description, intent).

Error: `+t;case"invalid-config":return`The inline agent trigger you generated has an invalid configuration. Please regenerate it with a valid config object.

Error: `+t;default:return`The inline agent trigger you generated has an error. Please regenerate it with correct syntax and all required fields.

Error: `+t}}module.exports={handleStartInlineAgent:handleStartInlineAgent,handleAskAIToFix:handleAskAIToFix};
