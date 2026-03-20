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

let FullMetaQueryProcessor=require("./shared/FullMetaQueryProcessor"),FullMetaErrorHandler=require("./shared/FullMetaErrorHandler"),MetaSearchExecutor=require("./metaSearch/MetaSearchExecutor"),MetaRawExecutor=require("./metaRaw/MetaRawExecutor"),MetaInsightsExecutor=require("./metaInsights/MetaInsightsExecutor");class FullMetaOrchestrator{constructor(e,r,t){this.searchParser=e,this.searchBuilder=r,this.searchExecutor=t,this.queryProcessor=new FullMetaQueryProcessor,this.errorHandler=new FullMetaErrorHandler,this.metaSearchExecutor=new MetaSearchExecutor(e,r,t,this.queryProcessor,this.errorHandler),this.metaRawExecutor=new MetaRawExecutor(e,r,t,this.queryProcessor,this.errorHandler),this.metaInsightsExecutor=new MetaInsightsExecutor(e,r,t,this.queryProcessor,this.errorHandler)}async execute(e,r,t){try{var a=e.match(/profile:([a-zA-Z0-9_-]+)/i),s=a?a[1].toLowerCase():null;if("meta-search"===s)return await this.metaSearchExecutor.execute(e,r,t);if("meta-insights"===s)return await this.metaInsightsExecutor.execute(e,r,t);if("meta-raw"===s)return await this.metaRawExecutor.execute(e,r,t);throw this.errorHandler.createUnsupportedProfileError(s||"none")}catch(e){return console.error("FullMetaOrchestrator error:",e),this.errorHandler.formatErrorResponse(e)}}hasFullMetaFilters(e){return e.includes("full-meta:")}}module.exports=FullMetaOrchestrator;
