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

let{AnalyzerUtils,ChatUtils,ContextUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../services/MessageService"),{renderAnalysisStatus,addUIControls,addErrorElement}=require("./uiManagement"),ANALYZE_STATUS_HEADER=require("./constants").ANALYZE_STATUS_HEADER;async function handleAnalyze(t,a,s,e,r){if(!t||null==t.message||!a)return console.error("handleAnalyze: Missing message or contentBody."),!1;if("analysis"===t.type||"analyze"===t.type){var i=ChatUtils.getChatMessages(s.chat).find(e=>"assistant"===e.role).message.split("\n"),i=(t.kids.length,i.filter(e=>e.startsWith("AUTO_SAVE")||e.startsWith("SHOW_EXTRACTED_METADATA"))),n=i.find(e=>e.startsWith("AUTO_SAVE")),n=!!n&&!!n.trim().includes("true"),i=(i.find(e=>e.startsWith("SHOW_EXTRACTED_METADATA"))?.trim().split("=").pop().split(",")||[]).filter(e=>""!==e),l=t.message.trim().split(/\n/).pop().startsWith("Authored by LLM "),o="Claude Code -";if(l||!t.model.real_model?.startsWith(o)&&!t.model.startsWith(o))try{var d,g,{analysisBlocks:h,analysisMetadataBlocks:A,error:c}=AnalyzerUtils.processLLMAnalysisResponse(t.message,l);if(c)return h.length&&renderAnalysisStatus(t,a,h,A,!0,s,i),addErrorElement(a,c),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+c,{temperature:0,stream:!1}),!0;if(0===h.length)return l?(d="Analysis stopped without producing any valid code blocks.",addErrorElement(a,d),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+d,{temperature:0,stream:!1}),!0):300<t.message.length?(g="Analysis stopped without producing any data after significant output. The LLM may not have followed instructions.",a.innerHTML=s.md.render(t.message),addErrorElement(a,g),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed: `+g,{temperature:0,stream:!1}),!0):void 0;if(renderAnalysisStatus(t,a,h,A,l,s,i),l){var m,p=ChatUtils.getChatMessages(s.chat,t.model),u=AnalyzerUtils.buildChatIdToPathMap(p),y=[];for(m of p){var E,f=m.message;if(MessageUtils.isContextMessage(f))try{for(E of ContextUtils.extractContextSections(f)){var S=E.path;S&&y.push(S)}}catch(e){console.warn("Error parsing context message for contextPaths building:",e)}}var{validAnalysisData:M,invalidAnalysisBlocks:T}=AnalyzerUtils.validateLLMAnalysisData(h,A,u);if(0<T.length){var v,w=T.filter(e=>"string"==typeof e);if(0<w.length)return v='<h3 style="margin-bottom:5px;">SERIOUS ERROR</h3>'+`<p>The following analys${1===w.length?"s":"es"} have an invalid chat id and/or path:</p>`+'<ul style="font-family:monospace;font-size:13px;margin-left:15px;margin-bottom:5px;">'+w.join("\n")+"</ul><p>Click the refresh icon below to retry or send the LLM a message with the bad analyses.</p>",addErrorElement(a,v),await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to invalid chat IDs/paths.`,{temperature:0,stream:!1}),!0;console.warn("TODO: Implement specific error display for analysis blocks with detailed validation errors:",T.filter(e=>"string"!=typeof e))}return 0<M.length?await addUIControls(t,a,M,y,h.length,s,n):l&&0<h.length&&console.warn("Analysis completed, blocks found, but no valid analyses data generated."),!0}}catch(e){console.error("Unexpected error during analyze handling:",e),addErrorElement(a,"An unexpected error occurred: "+e.message);await MessageService.newChatMessage(s.widget,s.chat.id,t.id,t.model,"assistant",ANALYZE_STATUS_HEADER+`

Analysis failed due to an unexpected error.`,{temperature:0,stream:!1});return!0}else console.log("[Debug] analyzeHandler - Streaming has not stopped and current provider is Claude Code")}}module.exports={handleAnalyze:handleAnalyze};
