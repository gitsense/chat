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

let{CodeBlockUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),STYLES=require("./styles").STYLES,{renderNormalState,renderMalformedJsonState,renderMissingFieldsState,renderErrorState,renderNoModelsState,renderEmptyIntentState}=require("./renderStates");async function handleIntentWorkflowTriggerTool(t,r,n,e){var o=(document.getElementById("intent-trigger-styles")||((o=document.createElement("style")).id="intent-trigger-styles",o.textContent=STYLES,document.head.appendChild(o)),CodeBlockUtils.extractCodeBlocks(t.message,{silent:!0})).blocks,o=o.find(e=>"gs-tool"===e.type);if(!o)return!1;r.innerHTML="";try{var i,l,s,d=GSToolBlockUtils.parseToolBlock(o.content).config,a=[];return d&&"object"==typeof d?("string"==typeof d.title&&d.title.trim()||a.push("title"),"string"==typeof d.description&&d.description.trim()||a.push("description"),"string"!=typeof d.intent&&a.push("intent"),0<a.length?renderMissingFieldsState(r,a,t,n):(l=0===(i=d.intent.trim()).length,0===(s=filterClaudeCodeModels(n.settings?.models||[])).length?renderNoModelsState(r,d.title,d.description,i,l,t,n):(l?renderEmptyIntentState:renderNormalState)(r,d.title,d.description,i,s,t,n))):renderErrorState(r,"Invalid configuration: config must be an object",t),!0}catch(e){return renderMalformedJsonState(r,e.message,t,n),!0}}function filterClaudeCodeModels(e){return Array.isArray(e)?e.filter(e=>!(!e.providers||!Array.isArray(e.providers))&&e.providers.some(e=>"Claude Code"===e.name)&&!0===e.hasApiKey):[]}module.exports={handleIntentWorkflowTriggerTool:handleIntentWorkflowTriggerTool};
