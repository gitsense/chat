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

let FullMetaErrorHandler=require("../shared/FullMetaErrorHandler");class MetaInsightsResultProcessor{constructor(){this.errorHandler=new FullMetaErrorHandler}formatInsightResultKey(r,e,t){return r+`|${e}|`+t}mergeMetaInsightsResults(e,t){if(!Array.isArray(e)||0===e.length)return{};if(!Array.isArray(t)||0===t.length)return{};var s={};for(let r=0;r<e.length;r++){var a=e[r],l=t[r];a&&l&&(a=a.results||[],s[this.formatInsightResultKey(l.analyzerId,l.field,l.type)]={analyzerId:l.analyzerId,field:l.field,type:l.type,results:a})}return s}formatFinalResponse(r,e,t){let s=0;for(var a in r)r[a].results&&Array.isArray(r[a].results)&&(s+=r[a].results.length);return{status:"success",data:{query:e,searchCriteria:t,results:r,totalResultsReturned:s,pagination:{currentPage:1,totalPages:0<s?1:0,totalResults:s,resultsPerPage:s}}}}}module.exports=MetaInsightsResultProcessor;
