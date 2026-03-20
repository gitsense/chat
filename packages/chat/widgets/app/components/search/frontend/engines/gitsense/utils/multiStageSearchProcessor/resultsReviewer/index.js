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

let handleSearchError=require("../../searchUtils/errorHandler").handleSearchError,resultsReviewOrchestrator=require("./resultsReviewOrchestrator"),stateHandlers={[resultsReviewOrchestrator.STATE_TYPE]:resultsReviewOrchestrator};async function processReviewerState(r,t,a,o,i){var n=t.states||[],n=n[n.length-1];if(n){var e,s,c=stateHandlers[n.type];if(c)try{null===n.started_at?"function"==typeof c.initiate?await c.initiate(r,t,a,o,i,n):(e="Initiate function not found for reviewer state type: "+n.type,await handleSearchError(r,t,n,e,a,o,i)):null===n.finished_at?"function"==typeof c.monitor?await c.monitor(r,t,a,o,i,n):(s="Monitor function not found for reviewer state type: "+n.type,await handleSearchError(r,t,n,s,a,o,i)):n.error}catch(e){console.error(`Reviewer Dispatcher: Unhandled error processing state "${n.type}":`,e),await handleSearchError(r,t,n,e.message||"An unexpected error occurred.",a,o,i)}else e="No handler found for reviewer state type: "+n.type,await handleSearchError(r,t,n,e,a,o,i)}else await handleSearchError(r,t,null,"Reviewer dispatcher called without a current state.",a,o,i)}module.exports={processReviewerState:processReviewerState};
