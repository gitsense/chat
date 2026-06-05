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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),IMPORT_DATA_TOOL=require("./constants").IMPORT_DATA_TOOL;async function handleImportDataTool(e,o,r,t){if(!e||null==e.message||!o||!r)return console.error("handleImportDataTool: Missing required parameters."),!1;if(!r.chat||!r.chat.messages||!r.chat.messages[0])return console.error("handleImportDataTool: Invalid chat context."),!1;if(r.renderedMessage[e.id]?.gitsenseChatTools?.importData)return!1;var a=GSToolBlockUtils.getToolBlocksByTool(e.message,IMPORT_DATA_TOOL,CodeBlockUtils);if(0===a.length)return!1;if(1!==a.length)return console.warn("More than one import data tool defined. Update message to ensure there is only one."),!1;a[0].toolData.config;try{o.innerHTML="";var s=require("../../../../import-data").ImportDataManager,n=new s(o,e,r);return await n.initialize(),r.renderedMessage[e.id]||(r.renderedMessage[e.id]={}),r.renderedMessage[e.id].gitsenseChatTools||(r.renderedMessage[e.id].gitsenseChatTools={}),r.renderedMessage[e.id].gitsenseChatTools.importData=n,!0}catch(e){return console.error("handleImportDataTool: Error processing tool block:",e),!1}}module.exports={handleImportDataTool:handleImportDataTool};
