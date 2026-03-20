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

let AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,analyzersBasePath=require("../Dependencies").analyzersBasePath;class MetaInsightsOrchestrator{async execute(e,r,t,s,a){if(!e.insightFields||0===e.insightFields.length)throw new Error("Meta-insights orchestrator requires at least one insight field.");var i=e.analyzerSchema||await AnalyzerUtils.getAnalyzerSchema(analyzersBasePath,e.analyzerId);if(!i)throw new Error(`Could not retrieve schema for analyzer ID '${e.analyzerId}'.`);var l,n={};let o=0;for(l of e.insightFields){var u,h={...e,insightFields:[l]},h=await t.build(h,a,"main"),h=await s.execute(h);Array.isArray(h.results)?(n[l.field]=h.results,u=i.properties[l.field],n[l.field]={description:u?.description,results:h.results},o+=h.results.length):(console.warn(`SearchExecutor for insight field '${l.field}' did not return an array of results.`),n[l.field]={description:null,results:[]})}return{query:e.originalQuery||"",searchCriteria:e,results:n,totalResultsReturned:o,pagination:{currentPage:1,totalPages:1,totalResults:o,resultsPerPage:o}}}}module.exports=MetaInsightsOrchestrator;
