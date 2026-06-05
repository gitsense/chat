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

let GSToolBlockUtils=require("@gitsense/gsc-utils").GSToolBlockUtils,chatApi=require("../../../Dependencies").chatApi,{getToolBlocksByTool,getToolBlockElemsByTool}=require("../../../utils/GSToolBlockUtils"),ANALYZE_BATCH_BUILDER_TOOL=require("./constants").ANALYZE_BATCH_BUILDER_TOOL,AnalyzeBatchBuilder=require("../../../../analyze-batch-builder");async function handleAnalyzeBatchBuilderTool(e,l,n,o){if(!e||null==e.message||!l||!n)return console.error("handleAnalyzeBatchBuilderTool: Missing required parameters."),!1;if(!n.chat||!n.chat.messages||!n.chat.messages[0])return console.error("handleAnalyzeBatchBuilderTool: Invalid chat context."),!1;if(n.renderedMessage[e.id]?.gitsenseChatTools?.analyzeBatchBuilder)return!1;var a=getToolBlocksByTool(e.message,ANALYZE_BATCH_BUILDER_TOOL);if(0===a.length)return!1;if(1!==a.length)return console.warn("More than one analyze batch builder tool defined. Update message to ensure there is only one."),!1;var t=getToolBlockElemsByTool(l,ANALYZE_BATCH_BUILDER_TOOL);if(1===t.length)t[0].parentNode.removeChild(t[0]);else if(1<t.length)return console.warn("There should only be one analyze batch builder tool element, but we found "+t.length),!1;t=a[0].toolData.config||{};try{var r=document.createElement("div"),s=(r.style.marginTop="10px",l.appendChild(r),new AnalyzeBatchBuilder(r,e,null,n,t));return n.renderedMessage[e.id]||(n.renderedMessage[e.id]={}),n.renderedMessage[e.id].gitsenseChatTools||(n.renderedMessage[e.id].gitsenseChatTools={}),n.renderedMessage[e.id].gitsenseChatTools.analyzeBatchBuilder=!0,n.renderedMessage[e.id].gitsenseChatTools.analyzeBatchBuilderManager=s,!0}catch(e){return console.error("handleAnalyzeBatchBuilderTool: Error creating UI elements:",e),!1}}async function _handleItemsSelected(e,l,n,o){console.log("TODO: Implement this when the initial implementation has finished")}module.exports={handleAnalyzeBatchBuilderTool:handleAnalyzeBatchBuilderTool};
