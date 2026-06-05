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

let AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,analyzersBasePath=require("../Dependencies").analyzersBasePath;class MetaInsightsOrchestrator{async execute(e,r,t,s,a){if(!e.insightFields||0===e.insightFields.length)throw new Error("Meta-insights orchestrator requires at least one insight field.");var i=e.analyzerSchema||await AnalyzerUtils.getAnalyzerSchema(analyzersBasePath,e.analyzerId);if(!i)throw new Error(`Could not retrieve schema for analyzer ID '${e.analyzerId}'.`);var l,n={};let o=0;for(l of e.insightFields){var u,h={...e,insightFields:[l]},h=await t.build(h,a,"main"),h=await s.execute(h);Array.isArray(h.results)?(n[l.field]=h.results,u=i.properties[l.field],n[l.field]={description:u?.description,results:h.results},o+=h.results.length):(console.warn(`SearchExecutor for insight field '${l.field}' did not return an array of results.`),n[l.field]={description:null,results:[]})}return{query:e.originalQuery||"",searchCriteria:e,results:n,totalResultsReturned:o,pagination:{currentPage:1,totalPages:1,totalResults:o,resultsPerPage:o}}}}module.exports=MetaInsightsOrchestrator;
