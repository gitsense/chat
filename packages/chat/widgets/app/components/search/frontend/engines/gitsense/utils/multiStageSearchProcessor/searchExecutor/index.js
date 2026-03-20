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

let handleSearchError=require("../../searchUtils/errorHandler").handleSearchError,searchExecutionOrchestrator=require("./searchExecutionOrchestrator"),stateHandlers={[searchExecutionOrchestrator.STATE_TYPE]:searchExecutionOrchestrator};async function processExecutorState(r,t,a,o,n){var c=t.states||[],c=c[c.length-1];if(c){var e,s,i=stateHandlers[c.type];if(i)try{null===c.started_at?"function"==typeof i.initiate?await i.initiate(r,t,a,o,n):(e="Initiate function not found for executor state type: "+c.type,await handleSearchError(r,t,c,e,a,o,n)):null===c.finished_at?"function"==typeof i.monitor?await i.monitor(r,t,a,o,n):(s="Monitor function not found for executor state type: "+c.type,await handleSearchError(r,t,c,s,a,o,n)):c.error}catch(e){console.error(`Executor Dispatcher: Unhandled error processing state "${c.type}":`,e),await handleSearchError(r,t,c,e.message||"An unexpected error occurred.",a,o,n)}else e="No handler found for executor state type: "+c.type,await handleSearchError(r,t,c,e,a,o,n)}else await handleSearchError(r,t,null,"Executor dispatcher called without a current state.",a,o,n)}module.exports={processExecutorState:processExecutorState};
