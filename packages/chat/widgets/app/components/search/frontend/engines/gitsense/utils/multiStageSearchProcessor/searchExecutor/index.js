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

let handleSearchError=require("../../searchUtils/errorHandler").handleSearchError,searchExecutionOrchestrator=require("./searchExecutionOrchestrator"),stateHandlers={[searchExecutionOrchestrator.STATE_TYPE]:searchExecutionOrchestrator};async function processExecutorState(r,t,a,o,n){var c=t.states||[],c=c[c.length-1];if(c){var e,s,i=stateHandlers[c.type];if(i)try{null===c.started_at?"function"==typeof i.initiate?await i.initiate(r,t,a,o,n):(e="Initiate function not found for executor state type: "+c.type,await handleSearchError(r,t,c,e,a,o,n)):null===c.finished_at?"function"==typeof i.monitor?await i.monitor(r,t,a,o,n):(s="Monitor function not found for executor state type: "+c.type,await handleSearchError(r,t,c,s,a,o,n)):c.error}catch(e){console.error(`Executor Dispatcher: Unhandled error processing state "${c.type}":`,e),await handleSearchError(r,t,c,e.message||"An unexpected error occurred.",a,o,n)}else e="No handler found for executor state type: "+c.type,await handleSearchError(r,t,c,e,a,o,n)}else await handleSearchError(r,t,null,"Executor dispatcher called without a current state.",a,o,n)}module.exports={processExecutorState:processExecutorState};
