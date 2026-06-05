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

let{IntentErrorRenderer,IntentResultsRenderer,IntentStoppedRenderer}=require("../components/intent-workflow-results");function renderResults(e){if(e.turnTabContentContainer){var t=e.meta.state.status;switch(t){case"completed":renderCompletedResults(e);break;case"stopped":renderStoppedState(e);break;case"error":(e.meta.error?.error_details?renderCompletedResults:renderErrorState)(e);break;default:console.warn("[AgentManager::renderResults] Unknown status in renderResults:",t),renderErrorState(e)}}else console.warn("[AgentManager::renderResults] Turn tab content container not found")}function renderCompletedResults(r){var e,t;r.meta&&r.meta.results?(e=r.meta.results.turns.find(e=>e.turn_number===r.selectedTurn)?.intent||r.meta.state.intent,r.turnTabContentContainer.innerHTML="",e={currentTurn:r.selectedTurn,results:r.meta.results,intent:e,workingDirectories:r.meta.working_directories||[],message:r.message,widget:r.context.widget},t={onTurnChange:e=>{},onLoadFiles:e=>{},onRefineDiscovery:(e,t)=>{r.startNextTurn("discovery",e,t)},onStartChange:(e,t)=>{r.startNextTurn("change",e,t)},onRetryTurn:e=>{r._handleRetry()},onStopTurn:e=>{r._handleStop()},onDeleteTurn:e=>{r._handleDeleteTurn()}},r.currentRenderer=new IntentResultsRenderer(r.turnTabContentContainer,e,r.context.contractManager,r.context.updateChat,t),r.currentRenderer.render()):(console.error("[AgentManager::_renderCompletedResults] Invalid meta structure for _renderCompletedResults"),r.handleError("Invalid data structure"))}function renderStoppedState(e){var t;e.turnTabContentContainer?(e.turnTabContentContainer.innerHTML="",t=e.meta.results?.turns?.length||0,e.stoppedRenderer=new IntentStoppedRenderer(e.turnTabContentContainer,{intent:e.meta.state.intent,message:e.message,contractManager:e.context.contractManager,widget:e.context.widget,turn:e.selectedTurn,turnCount:t,onRetry:()=>{e._handleRetry()},onDelete:()=>{e._handleDeleteTurn()}}),e.stoppedRenderer.render()):console.warn("[AgentManager::renderStoppedState] Turn tab content container not found")}function renderErrorState(e){var t,r,n,a;e.meta?(t="string"==typeof e.meta.error?{code:"UNKNOWN",message:e.meta.error,severity:"error",retryable:!1}:e.meta.error,r=e.meta.state.currentTurnType||"discovery",n=e.meta.state.intent||"",a=e.meta.results?.turns?.length||0,e.errorRenderer=new IntentErrorRenderer(e.turnTabContentContainer,{turnType:r,intent:n,error:t,turnCount:a,message:e.message,contractManager:e.context.contractManager,widget:e.context.widget,turn:e.selectedTurn,onRetry:()=>e._handleRetry(),onDelete:()=>e._handleDeleteTurn()}),e.errorRenderer.render()):console.error("[AgentManager::_renderErrorState] Invalid meta structure for _renderErrorState")}module.exports={renderResults:renderResults,renderCompletedResults:renderCompletedResults,renderStoppedState:renderStoppedState,renderErrorState:renderErrorState};
