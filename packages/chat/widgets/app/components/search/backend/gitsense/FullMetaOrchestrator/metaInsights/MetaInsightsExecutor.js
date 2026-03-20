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

let FullMetaQueryProcessor=require("../shared/FullMetaQueryProcessor"),FullMetaErrorHandler=require("../shared/FullMetaErrorHandler"),MetaInsightsResultProcessor=require("./MetaInsightsResultProcessor"),MetaInsightsOrchestrator=require("../../MetaInsightsOrchestrator");class MetaInsightsExecutor{constructor(e,r,s,t,l){this.searchParser=e,this.searchBuilder=r,this.searchExecutor=s,this.queryProcessor=t,this.errorHandler=l,this.resultProcessor=new MetaInsightsResultProcessor}async execute(r,t,e){try{var l=this.queryProcessor.parseAllFullMetaFilters(r,!0);if(0===l.length)throw this.errorHandler.createInvalidSyntaxError("No full-meta: filters found in query. Expected at least one.");var a=this.queryProcessor.groupFiltersByAnalyzer(l),o=Object.keys(a);if(0===o.length)throw this.errorHandler.createInvalidSyntaxError("No analyzers found in full-meta: filters.");let s={};for(let r of o){var i=a[r];s[r]||(s[r]=[]),i.forEach(e=>{s[r].push({field:e.field,type:e.type})})}var u,n={};let e=0;for(u of o){var h,c=s[u],d={profile:"meta-insights",analyzerId:u,insightFields:c,chatIds:(l.length,null),repoFullNames:[],keywords:[],phrases:[],targets:[],filters:{},nullFilters:{},notNullFilters:{},scope:null,sortBy:[],options:{},booleanLogic:null,warnings:[],codeBlockSearchType:null,messageTypes:[],chatTypes:[],metadataFilters:[],isMetaInsights:!0},f=await(new MetaInsightsOrchestrator).execute(d,this.searchParser,this.searchBuilder,this.searchExecutor,t);for(h of c){var g=`${u}|${h.field}|`+h.type;f.results[h.field]&&(n[g]=f.results[h.field],e+=f.results[h.field].results?.length||0)}}return{success:!0,data:{query:r,searchCriteria:{profile:"meta-insights",fullMetaFilters:l},results:n,totalResultsReturned:e,pagination:{currentPage:1,totalPages:1,totalResults:e,resultsPerPage:e}}}}catch(e){return console.error("MetaInsightsExecutor error:",e),this.errorHandler.formatErrorResponse(e)}}}module.exports=MetaInsightsExecutor;
