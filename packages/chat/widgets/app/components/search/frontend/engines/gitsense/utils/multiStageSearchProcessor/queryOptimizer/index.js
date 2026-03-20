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

let handleSearchError=require("../../searchUtils/errorHandler").handleSearchError,broadSearchOptimizer=require("./broadSearchOptimizer"),stateHandlers={[broadSearchOptimizer.STATE_TYPE]:broadSearchOptimizer};async function processQueryOptimizerState(r,t,a,i,o,n){if(n){var e,c,p=stateHandlers[n.type];if(p)try{null===n.started_at?"function"==typeof p.initiate?await p.initiate(r,t,a,i,o,n):(e="Initiate function not found for query optimizer state type: "+n.type,await handleSearchError(r,t,n,e,a,i,o)):null===n.finished_at?"function"==typeof p.monitor?await p.monitor(r,t,a,i,o,n):(c="Monitor function not found for query optimizer state type: "+n.type,await handleSearchError(r,t,n,c,a,i,o)):n.error}catch(e){console.error(`Query Optimizer Dispatcher: Unhandled error processing state "${n.type}":`,e),await handleSearchError(r,t,n,e.message||"An unexpected error occurred.",a,i,o)}else e="No handler found for query optimizer state type: "+n.type,await handleSearchError(r,t,n,e,a,i,o)}else await handleSearchError(r,t,null,"Query Optimizer dispatcher called without a current state.",a,i,o)}module.exports={processQueryOptimizerState:processQueryOptimizerState};
