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

let{ChatUtils,CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),METADATA_INSIGHTS_ANALYSIS_TOOL=require("./constants").METADATA_INSIGHTS_ANALYSIS_TOOL,MetadataInsightsAnalysisManager=require("../../../../metadata-insights-analysis"),chatApi=require("../../../Dependencies").chatApi;async function handleMetadataInsightsAnalysisTool(s,e,n,t){if(!s||null==s.message||!e||!n)return console.error("handleMetadataInsightsAnalysisTool: Missing required parameters."),!1;if(!n.chat||!n.chat.messages||!n.chat.messages[0])return console.error("handleMetadataInsightsAnalysisTool: Invalid chat context."),!1;if(n.renderedMessage[s.id]?.gitsenseChatTools?.metadataInsightsAnalysis)return!1;var a=GSToolBlockUtils.getToolBlocksByTool(s.message,METADATA_INSIGHTS_ANALYSIS_TOOL,CodeBlockUtils);if(0===a.length)return!1;if(1!==a.length)return console.warn("More than one metadata insights result tool defined. Update message to ensure there is only one."),!1;var o=GSToolBlockUtils.getToolBlockElemsByTool(e,METADATA_INSIGHTS_ANALYSIS_TOOL);if(1===o.length)o[0].parentNode.removeChild(o[0]);else if(1<o.length)return console.warn("There should only be one metadata insights result tool element, but we found "+o.length),!1;let i=a[0].toolData;o=i.config||{};try{var l=s.message.indexOf("```txt\n# GitSense Chat Tool"),r=-1<l?s.message.substring(0,l).trim():s.message,d=(e.innerHTML="",new MetadataInsightsAnalysisManager(e,s,n,r,o,async e=>{e=e+`

`+("```txt\n"+GSToolBlockUtils.formatToolBlock(i)+"\n```");await chatApi.updateChatMessage(n.widget,s.id,{newMessage:e}),n.renderedMessage[s.id]?.gitsenseChatTools?.metadataInsightsAnalysis&&delete n.renderedMessage[s.id].gitsenseChatTools.metadataInsightsAnalysis,n.updateChat()},(e,s)=>{e=e.map(e=>e.chatId);n.showContextBuilder(e,"file content",s,"review",{onclickAdd:async(e,s)=>{var{widget:t,chat:a}=n,e={parentId:ChatUtils.getChatMessages(a).pop().id,type:"context",role:"assistant",temperature:0,model:a.main_model,message:e};await chatApi.newChatMessage(t,a.id,e);n.updateChat()}})}));return n.renderedMessage[s.id]||(n.renderedMessage[s.id]={}),n.renderedMessage[s.id].gitsenseChatTools||(n.renderedMessage[s.id].gitsenseChatTools={}),n.renderedMessage[s.id].gitsenseChatTools.metadataInsightsAnalysis=d,!0}catch(e){return console.error("handleMetadataInsightsAnalysisTool: Error processing tool block:",e),!1}}module.exports={handleMetadataInsightsAnalysisTool:handleMetadataInsightsAnalysisTool};
