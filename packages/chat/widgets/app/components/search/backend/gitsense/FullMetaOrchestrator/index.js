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

let FullMetaQueryProcessor=require("./shared/FullMetaQueryProcessor"),FullMetaErrorHandler=require("./shared/FullMetaErrorHandler"),MetaSearchExecutor=require("./metaSearch/MetaSearchExecutor"),MetaRawExecutor=require("./metaRaw/MetaRawExecutor"),MetaInsightsExecutor=require("./metaInsights/MetaInsightsExecutor");class FullMetaOrchestrator{constructor(e,r,t){this.searchParser=e,this.searchBuilder=r,this.searchExecutor=t,this.queryProcessor=new FullMetaQueryProcessor,this.errorHandler=new FullMetaErrorHandler,this.metaSearchExecutor=new MetaSearchExecutor(e,r,t,this.queryProcessor,this.errorHandler),this.metaRawExecutor=new MetaRawExecutor(e,r,t,this.queryProcessor,this.errorHandler),this.metaInsightsExecutor=new MetaInsightsExecutor(e,r,t,this.queryProcessor,this.errorHandler)}async execute(e,r,t){try{var a=e.match(/profile:([a-zA-Z0-9_-]+)/i),s=a?a[1].toLowerCase():null;if("meta-search"===s)return await this.metaSearchExecutor.execute(e,r,t);if("meta-insights"===s)return await this.metaInsightsExecutor.execute(e,r,t);if("meta-raw"===s)return await this.metaRawExecutor.execute(e,r,t);throw this.errorHandler.createUnsupportedProfileError(s||"none")}catch(e){return console.error("FullMetaOrchestrator error:",e),this.errorHandler.formatErrorResponse(e)}}hasFullMetaFilters(e){return e.includes("full-meta:")}}module.exports=FullMetaOrchestrator;
