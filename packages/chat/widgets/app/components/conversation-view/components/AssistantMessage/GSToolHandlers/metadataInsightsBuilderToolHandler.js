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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),{getToolBlocksByTool,getToolBlockElemsByTool}=require("../../../utils/GSToolBlockUtils"),InsightsManager=require("../../../../metadata-insights-builder"),METADATA_INSIGHTS_BUILDER_TOOL=require("./constants").METADATA_INSIGHTS_BUILDER_TOOL;async function handleMetadataInsightsBuilderTool(a,e,l,s){if(!a||null==a.message||!e||!l)return console.error("handleMetadataInsightsBuilderTool: Missing required parameters."),!1;if(!l.chat||!l.chat.messages||!l.chat.messages[0])return console.error("handleMetadataInsightsBuilderTool: Invalid chat context."),!1;if(l.renderedMessage[a.id]?.gitsenseChatTools?.metadataInsights)return!1;var t=getToolBlocksByTool(a.message,METADATA_INSIGHTS_BUILDER_TOOL);if(0===t.length)return!1;if(1!==t.length)return console.warn("More than one metadata insights tool defined. Update message to ensure there is only one."),!1;var o=getToolBlockElemsByTool(e,METADATA_INSIGHTS_BUILDER_TOOL);if(1===o.length)o[0].parentNode.removeChild(o[0]);else if(1<o.length)return console.warn("There should only be one metadata insights tool element, but we found "+o.length),!1;let n=t[0].toolData;o=n.config||{};try{var i=document.createElement("div"),r=(i.style.marginTop="10px",e.appendChild(i),new InsightsManager(i,a,l,o,{onSave:(e,s,t)=>{_handleSave(a.id,n,e,s,t,l)},onClear:()=>{_handleClear(a.id,n,l)}}));return l.renderedMessage[a.id]||(l.renderedMessage[a.id]={}),l.renderedMessage[a.id].gitsenseChatTools||(l.renderedMessage[a.id].gitsenseChatTools={}),l.renderedMessage[a.id].gitsenseChatTools.metadataInsights=!0,l.renderedMessage[a.id].gitsenseChatTools.metadataInsightsManager=r,!0}catch(e){return console.error("handleMetadataInsightsBuilderTool: Error creating UI elements:",e),!1}}async function _handleSave(s,e,t,a,l,o){var e={...e},t=(e.config={...e.config,items:t,selectedAnalyzers:a,metadataFields:l},require("@gitsense/gsc-utils")).CodeBlockUtils,a=require("@gitsense/gsc-utils").ChatUtils,l=require("../../../services/MessageService"),a=a.getChatMessages(o.chat).find(e=>e.id===s);a?(a=GSToolBlockUtils.replaceToolBlock(a.message,METADATA_INSIGHTS_BUILDER_TOOL,e,t),await l.updateChatMessage(o.widget,s,null,a),o.updateChat()):console.error(`_handleSave: Message with ID ${s} not found.`)}async function _handleClear(s,e,t){var e={...e},a=(e.config&&(delete e.config.items,delete e.config.selectedAnalyzers,delete e.config.metadataFields),require("@gitsense/gsc-utils")).CodeBlockUtils,l=require("@gitsense/gsc-utils").ChatUtils,o=require("../../../services/MessageService"),l=l.getChatMessages(t.chat).find(e=>e.id===s),l=GSToolBlockUtils.replaceToolBlock(l.message,METADATA_INSIGHTS_BUILDER_TOOL,e,a);await o.updateChatMessage(t.widget,s,null,l),t.updateChat()}module.exports={handleMetadataInsightsBuilderTool:handleMetadataInsightsBuilderTool};
