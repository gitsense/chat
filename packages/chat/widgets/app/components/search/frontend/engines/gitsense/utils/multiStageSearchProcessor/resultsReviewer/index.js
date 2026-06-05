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

let handleSearchError=require("../../searchUtils/errorHandler").handleSearchError,resultsReviewOrchestrator=require("./resultsReviewOrchestrator"),stateHandlers={[resultsReviewOrchestrator.STATE_TYPE]:resultsReviewOrchestrator};async function processReviewerState(r,t,a,o,i){var n=t.states||[],n=n[n.length-1];if(n){var e,s,c=stateHandlers[n.type];if(c)try{null===n.started_at?"function"==typeof c.initiate?await c.initiate(r,t,a,o,i,n):(e="Initiate function not found for reviewer state type: "+n.type,await handleSearchError(r,t,n,e,a,o,i)):null===n.finished_at?"function"==typeof c.monitor?await c.monitor(r,t,a,o,i,n):(s="Monitor function not found for reviewer state type: "+n.type,await handleSearchError(r,t,n,s,a,o,i)):n.error}catch(e){console.error(`Reviewer Dispatcher: Unhandled error processing state "${n.type}":`,e),await handleSearchError(r,t,n,e.message||"An unexpected error occurred.",a,o,i)}else e="No handler found for reviewer state type: "+n.type,await handleSearchError(r,t,n,e,a,o,i)}else await handleSearchError(r,t,null,"Reviewer dispatcher called without a current state.",a,o,i)}module.exports={processReviewerState:processReviewerState};
