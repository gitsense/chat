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

let{AnalyzerUtils,ChatUtils,ContextUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../services/MessageService"),{renderAnalysisStatus,addUIControls,addErrorElement}=require("./uiManagement"),ANALYZE_STATUS_HEADER=require("./constants").ANALYZE_STATUS_HEADER;async function handleAnalyze(t,a,s,e,i){if(!t||null==t.message||!a)return console.error("handleAnalyze: Missing message or contentBody."),!1;if("analysis"===t.type||"analyze"===t.type){var r=ChatUtils.getChatMessages(s.chat).find(e=>"assistant"===e.role).message.split("\n"),r=(t.kids.length,r.filter(e=>e.startsWith("AUTO_SAVE")||e.startsWith("SHOW_EXTRACTED_METADATA"))),n=r.find(e=>e.startsWith("AUTO_SAVE")),n=!!n&&!!n.trim().includes("true"),r=(r.find(e=>e.startsWith("SHOW_EXTRACTED_METADATA"))?.trim().split("=").pop().split(",")||[]).filter(e=>""!==e),l=t.message.trim().split(/\n/).pop().startsWith("Authored by LLM ");try{var o,d,{analysisBlocks:A,analysisMetadataBlocks:g,error:h}=AnalyzerUtils.processLLMAnalysisResponse(t.message,l);if(h)return A.length&&renderAnalysisStatus(t,a,A,g,!0,s,r),addErrorElement(a,h),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+h,{temperature:0,stream:!1}),!0;if(0===A.length)return l?(o="Analysis stopped without producing any valid code blocks.",addErrorElement(a,o),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+o,{temperature:0,stream:!1}),!0):300<t.message.length?(d="Analysis stopped without producing any data after significant output. The LLM may not have followed instructions.",a.innerHTML=s.md.render(t.message),addErrorElement(a,d),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+d,{temperature:0,stream:!1}),!0):void 0;if(renderAnalysisStatus(t,a,A,g,l,s,r),l){var c,m=ChatUtils.getChatMessages(s.chat,t.model),p=AnalyzerUtils.buildChatIdToPathMap(m),y=[];for(c of m){var u,E=c.message;if(MessageUtils.isContextMessage(E))try{for(u of ContextUtils.extractContextSections(E)){var f=u.path;f&&y.push(f)}}catch(e){console.warn("Error parsing context message for contextPaths building:",e)}}var{validAnalysisData:S,invalidAnalysisBlocks:M}=AnalyzerUtils.validateLLMAnalysisData(A,g,p);if(0<M.length){var T,v=M.filter(e=>"string"==typeof e);if(0<v.length)return T='<h3 style="margin-bottom:5px;">SERIOUS ERROR</h3>'+`<p>The following analys${1===v.length?"s":"es"} have an invalid chat id and/or path:</p>`+'<ul style="font-family:monospace;font-size:13px;margin-left:15px;margin-bottom:5px;">'+v.join("\n")+"</ul><p>Click the refresh icon below to retry or send the LLM a message with the bad analyses.</p>",addErrorElement(a,T),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to invalid chat IDs/paths.`,{temperature:0,stream:!1}),!0;console.warn("TODO: Implement specific error display for analysis blocks with detailed validation errors:",M.filter(e=>"string"!=typeof e))}return 0<S.length?await addUIControls(t,a,S,y,A.length,s,n):l&&0<A.length&&console.warn("Analysis completed, blocks found, but no valid analyses data generated."),!0}}catch(e){console.error("Unexpected error during analyze handling:",e),addErrorElement(a,"An unexpected error occurred: "+e.message);await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to an unexpected error.`,{temperature:0,stream:!1});return!0}}}module.exports={handleAnalyze:handleAnalyze};
