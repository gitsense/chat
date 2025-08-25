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

let{ChatUtils,MessageUtils,ContextUtils}=require("@gitsense/gsc-utils"),DomUtils=require("../../../utils/DomUtils"),MessageService=require("../../../services/MessageService"),processAnalysisBlocks=require("./blockProcessing").processAnalysisBlocks,validateAnalysisBlocks=require("./analysisValidation").validateAnalysisBlocks,{renderAnalysisStatus,addUIControls,addErrorElement}=require("./uiManagement"),ANALYZE_STATUS_HEADER=require("./constants").ANALYZE_STATUS_HEADER;async function handleAnalyze(s,a,t,e,i){if(!s||null==s.message||!a)return console.error("handleAnalyze: Missing message or contentBody."),!1;if(ChatUtils.isAnalyzeChat(t.chat,s.model)){let e=ChatUtils.getChatMessages(t.chat);var r=e.find(e=>"assistant"===e.role).message.split("\n"),r=(s.kids.length,r.filter(e=>e.startsWith("AUTO_SAVE")||e.startsWith("SHOW_EXTRACTED_METADATA"))),n=r.find(e=>e.startsWith("AUTO_SAVE")),n=!!n&&!!n.trim().includes("true"),r=(r.find(e=>e.startsWith("SHOW_EXTRACTED_METADATA"))?.trim().split("=").pop().split(",")||[]).filter(e=>""!==e),l=s.message.trim();if(l.startsWith("# Analyze - ")){ChatUtils.getChatMessages(t.chat);void(document.title="GitSense Chat - Analyze")}else{l=l.split(/\n/).pop().startsWith("Authored by LLM ");try{var o,d,{analysisBlocks:c,analysisMetadataBlocks:h,error:A}=processAnalysisBlocks(s.message,l);if(A)return c.length&&renderAnalysisStatus(s,a,c,h,!0,t,r),addErrorElement(a,A),await MessageService.newChatMessage(t.widget,t.chat.id,s.id,s.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+A,{temperature:0,stream:!1}),!0;if(0===c.length)return l?(o="Analysis stopped without producing any valid code blocks.",addErrorElement(a,o),await MessageService.newChatMessage(t.widget,t.chat.id,s.id,s.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+o,{temperature:0,stream:!1}),!0):300<s.message.length?(d="Analysis stopped without producing any data after significant output. The LLM may not have followed instructions.",a.innerHTML=t.md.render(s.message),addErrorElement(a,d),await MessageService.newChatMessage(t.widget,t.chat.id,s.id,s.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+d,{temperature:0,stream:!1}),!0):void 0;if(renderAnalysisStatus(s,a,c,h,l,t,r),l){var g,m=ChatUtils.getChatMessages(t.chat,s.model),u=new Map,y=[];for(g of m){var p,E=g.message;if(MessageUtils.isContextMessage(E))try{for(p of ContextUtils.extractContextSections(E)){var f=p["chat id"],S=p.path;f&&S&&(y.push(S),u.set(f,S))}}catch(e){console.warn("Error parsing context message for map building:",e)}}var{validAnalysisData:v,invalidAnalysisBlocks:M}=validateAnalysisBlocks(c,h,u);if(0<M.length){var T,w=M.filter(e=>"string"==typeof e);if(0<w.length)return T="<h3>SERIOUS ERROR</h3>"+`<p>The following analys${1===w.length?"s":"es"} have an invalid chat id and/or path:</p>`+'<ul style="font-family:monospace">'+w.join("\n")+"</ul><p>Click the refresh icon below to retry or send the LLM a message with the bad analyses.</p>",addErrorElement(a,T),await MessageService.newChatMessage(t.widget,t.chat.id,s.id,s.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to invalid chat IDs/paths.`,{temperature:0,stream:!1}),!0;console.warn("TODO: Implement specific error display for analysis blocks with detailed validation errors:",M.filter(e=>"string"!=typeof e))}return 0<v.length?await addUIControls(s,a,v,y,c.length,t,n):l&&0<c.length&&console.warn("Analysis completed, blocks found, but no valid analyses data generated."),!0}}catch(e){return console.error("Unexpected error during analyze handling:",e),addErrorElement(a,"An unexpected error occurred: "+e.message),await MessageService.newChatMessage(t.widget,t.chat.id,s.id,s.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to an unexpected error.`,{temperature:0,stream:!1}),!0}}}}module.exports={handleAnalyze:handleAnalyze};
