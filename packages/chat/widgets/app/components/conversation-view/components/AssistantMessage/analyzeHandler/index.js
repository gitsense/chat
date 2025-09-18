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

let{ChatUtils,MessageUtils,ContextUtils,AnalyzerUtils}=require("@gitsense/gsc-utils"),DomUtils=require("../../../utils/DomUtils"),MessageService=require("../../../services/MessageService"),{renderAnalysisStatus,addUIControls,addErrorElement}=require("./uiManagement"),ANALYZE_STATUS_HEADER=require("./constants").ANALYZE_STATUS_HEADER;async function handleAnalyze(t,a,s,e,i){if(!t||null==t.message||!a)return console.error("handleAnalyze: Missing message or contentBody."),!1;if(ChatUtils.isAnalyzeChat(s.chat,t.model)){let e=ChatUtils.getChatMessages(s.chat);var r=e.find(e=>"assistant"===e.role).message.split("\n"),r=(t.kids.length,r.filter(e=>e.startsWith("AUTO_SAVE")||e.startsWith("SHOW_EXTRACTED_METADATA"))),n=r.find(e=>e.startsWith("AUTO_SAVE")),n=!!n&&!!n.trim().includes("true"),r=(r.find(e=>e.startsWith("SHOW_EXTRACTED_METADATA"))?.trim().split("=").pop().split(",")||[]).filter(e=>""!==e),l=t.message.trim();if(l.startsWith("# Analyze - ")){ChatUtils.getChatMessages(s.chat);void(document.title="GitSense Chat - Analyze")}else{l=l.split(/\n/).pop().startsWith("Authored by LLM ");try{var o,d,{analysisBlocks:h,analysisMetadataBlocks:A,error:c}=AnalyzerUtils.processLLMAnalysisResponse(t.message,l);if(c)return h.length&&renderAnalysisStatus(t,a,h,A,!0,s,r),addErrorElement(a,c),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+c,{temperature:0,stream:!1}),!0;if(0===h.length)return l?(o="Analysis stopped without producing any valid code blocks.",addErrorElement(a,o),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+o,{temperature:0,stream:!1}),!0):300<t.message.length?(d="Analysis stopped without producing any data after significant output. The LLM may not have followed instructions.",a.innerHTML=s.md.render(t.message),addErrorElement(a,d),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+d,{temperature:0,stream:!1}),!0):void 0;if(renderAnalysisStatus(t,a,h,A,l,s,r),l){var g,m=ChatUtils.getChatMessages(s.chat,t.model),u=AnalyzerUtils.buildChatIdToPathMap(m),y=[];for(g of m){var E,p=g.message;if(MessageUtils.isContextMessage(p))try{for(E of ContextUtils.extractContextSections(p)){var f=E.path;f&&y.push(f)}}catch(e){console.warn("Error parsing context message for contextPaths building:",e)}}var{validAnalysisData:S,invalidAnalysisBlocks:M}=AnalyzerUtils.validateLLMAnalysisData(h,A,u);if(0<M.length){var T,U=M.filter(e=>"string"==typeof e);if(0<U.length)return T="<h3>SERIOUS ERROR</h3>"+`<p>The following analys${1===U.length?"s":"es"} have an invalid chat id and/or path:</p>`+'<ul style="font-family:monospace">'+U.join("\n")+"</ul><p>Click the refresh icon below to retry or send the LLM a message with the bad analyses.</p>",addErrorElement(a,T),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to invalid chat IDs/paths.`,{temperature:0,stream:!1}),!0;console.warn("TODO: Implement specific error display for analysis blocks with detailed validation errors:",M.filter(e=>"string"!=typeof e))}return 0<S.length?await addUIControls(t,a,S,y,h.length,s,n):l&&0<h.length&&console.warn("Analysis completed, blocks found, but no valid analyses data generated."),!0}}catch(e){return console.error("Unexpected error during analyze handling:",e),addErrorElement(a,"An unexpected error occurred: "+e.message),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to an unexpected error.`,{temperature:0,stream:!1}),!0}}}}module.exports={handleAnalyze:handleAnalyze};
