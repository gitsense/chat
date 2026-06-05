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

let SearchProgressRenderer=require("../../components/SearchProgressRenderer").SearchProgressRenderer,getSearchToolConfigs=require("../../../../utils/searchToolConfig").getSearchToolConfigs,handleSearchError=require("../searchUtils/errorHandler").handleSearchError,updateConfig=require("../../../../utils/updateConfig").updateConfig,queryOptimizerStage=require("./queryOptimizer/index"),searchExecutorStage=require("./searchExecutor/index"),resultsReviewerStage=require("./resultsReviewer/index"),{TINY_OVERVIEW_QUERY_OPTIMIZATION,TINY_OVERVIEW_SEARCH_EXECUTION,TINY_OVERVIEW_SEARCH_RESULTS_REVIEW,COMPLETED,ERROR,QUERY_OPTIMIZATION,SEARCH_EXECUTION_ORCHESTRATION,RESULTS_REVIEW_ORCHESTRATION}=require("../../../../../common/gitsense/searchStates"),stageDispatchers={[QUERY_OPTIMIZATION]:queryOptimizerStage,[SEARCH_EXECUTION_ORCHESTRATION]:searchExecutorStage,[RESULTS_REVIEW_ORCHESTRATION]:resultsReviewerStage};async function processMultiStageSearch(t,e,a,s){var o=getSearchToolConfigs(t.message);if(o&&0!==o.length)if(1!==o.length)console.error("processMultiStageSearch: More than one search tool found.");else{var o=o[0],i=o.states||[];let r=0<i.length?i[i.length-1]:null;var c,n,S,i=new SearchProgressRenderer(t,o,s,a);try{r||(r={type:QUERY_OPTIMIZATION,created_at:(new Date).toISOString(),started_at:null,finished_at:null},o.states=[r],await updateConfig(t,o,s),r=o.states[o.states.length-1]),r.error||r.type!==COMPLETED&&r.type!==ERROR&&((c=stageDispatchers[r.type])?"function"==typeof c.processQueryOptimizerState?await c.processQueryOptimizerState(t,o,a,s,i,r):"function"==typeof c.processExecutorState?await c.processExecutorState(t,o,a,s,i):"function"==typeof c.processReviewerState?await c.processReviewerState(t,o,a,s,i):(S=`Stage dispatcher for state type "${r.type}" does not have a valid process function.`,await handleSearchError(t,o,r,S,a,s,i)):(n="No stage dispatcher found for state type: "+r.type,await handleSearchError(t,o,r,n,a,s,i)))}catch(e){console.error("processMultiStageSearch: Unhandled error during processing:",e),await handleSearchError(t,o,r,e.message||"An unexpected error occurred.",a,s,i)}}else console.error("processMultiStageSearch: No search tool config found.")}module.exports={processMultiStageSearch:processMultiStageSearch};
