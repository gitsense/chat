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

let MessageUtils=require("@gitsense/gsc-utils").MessageUtils,{chatApi,StreamingService}=require("../../../../../../Dependencies"),updateConfig=require("../../../../../../utils/updateConfig").updateConfig,handleSearchError=require("../../../searchUtils/errorHandler").handleSearchError,{RESULTS_REVIEW_ORCHESTRATION,ERROR}=require("../../../../../../../common/gitsense/searchStates"),processCompletedReviewMessage=require("./processCompletedMessage").processCompletedReviewMessage,STATE_TYPE=RESULTS_REVIEW_ORCHESTRATION;async function monitor(a,s,i,n,o){var r=s.states||[],g=r.filter(e=>e.type===STATE_TYPE);let l=r[r.length-1];if(l.progressStage=STATE_TYPE+(1===g.length?"":g.length),l.type!==STATE_TYPE||null===l.started_at||null!==l.finished_at)r=`State ${l.type} is currently not in progress`,await handleSearchError(a,s,l,r,i,n,o);else{let t=l.thinking_chat;if(t&&t.uuid)if(null!==t.finished_at)g=`Thinking chat instance for state ${l.type} is already finished`,await handleSearchError(a,s,l,g,i,n,o);else if("stream"!==t.method)r="Streaming is the only supported thinking chat method for the state "+l.type,await handleSearchError(a,s,l,r,i,n,o);else{let e=null;try{e=await chatApi.get(n.widget,t.uuid)}catch(e){var g=`Failed to get thinking chat (${t.uuid}): `+e.message;return void await handleSearchError(a,s,l,g,i,n,o)}r=e.messages[0],g=MessageUtils.getLastMessage(r);if(null!==g.message)console.warn("resultsReviewOrchestrator/monitor: Last thinking chat message is not null. Processing completed message."),await processCompletedReviewMessage(g,a,s,l,i,n,o);else try{var h=new StreamingService({widget:n.widget,settings:n.settings,chat:e,message:g,onMessage:function(e,t){o.updateStageProgress(l.progressStage,`(Characters received: ${e.length})`)},onComplete:(e,t,r)=>processCompletedReviewMessage(e,a,s,l,i,n,o,t,r),onError:e=>{console.error("resultsReviewOrchestrator/monitor Streaming error:",e),t.finished_at=(new Date).toISOString(),t.error=e?.message||e||"Streaming error",handleSearchError(a,s,l,t.error,i,n,o)}});t.started_at=(new Date).toISOString(),await updateConfig(a,s,n),h.startStreaming()}catch(e){t.finished_at=(new Date).toISOString();r="Streaming setup failed: "+(t.error=e).message;await handleSearchError(a,s,l,r,i,n,o)}}else g="No thinking chat UUID found for state "+l.type,await handleSearchError(a,s,l,g,i,n,o)}}module.exports={monitor:monitor};
