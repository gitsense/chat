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

let FullMetaErrorHandler=require("../shared/FullMetaErrorHandler");class MetaInsightsResultProcessor{constructor(){this.errorHandler=new FullMetaErrorHandler}formatInsightResultKey(r,e,t){return r+`|${e}|`+t}mergeMetaInsightsResults(e,t){if(!Array.isArray(e)||0===e.length)return{};if(!Array.isArray(t)||0===t.length)return{};var s={};for(let r=0;r<e.length;r++){var a=e[r],l=t[r];a&&l&&(a=a.results||[],s[this.formatInsightResultKey(l.analyzerId,l.field,l.type)]={analyzerId:l.analyzerId,field:l.field,type:l.type,results:a})}return s}formatFinalResponse(r,e,t){let s=0;for(var a in r)r[a].results&&Array.isArray(r[a].results)&&(s+=r[a].results.length);return{status:"success",data:{query:e,searchCriteria:t,results:r,totalResultsReturned:s,pagination:{currentPage:1,totalPages:0<s?1:0,totalResults:s,resultsPerPage:s}}}}}module.exports=MetaInsightsResultProcessor;
