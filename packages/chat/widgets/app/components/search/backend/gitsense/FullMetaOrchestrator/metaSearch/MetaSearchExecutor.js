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

let AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,analyzersBasePath=require("../../../Dependencies").analyzersBasePath,MetaRawResultProcessor=require("../metaRaw/MetaRawResultProcessor"),buildMetaRawQuery=require("../../SearchBuilder/modules/buildMetaRawQuery").buildMetaRawQuery;class MetaRawExecutor{constructor(e,r,t,s,a){this.searchParser=e,this.searchBuilder=r,this.searchExecutor=t,this.queryProcessor=s,this.errorHandler=a,this.resultProcessor=new MetaRawResultProcessor}async execute(r,l,t){try{var i=await this.searchParser.parse(r,t),o=this.queryProcessor.parseAllFullMetaFilters(r,!0),u=this.queryProcessor.groupFiltersByAnalyzer(o),c=Object.keys(u);if(0===c.length){if(!i.analyzerId)throw this.errorHandler.createInvalidSyntaxError("The 'meta-raw' profile requires either 'analyzer:' or 'full-meta:' filters.");c.push(i.analyzerId)}var n=[];let s=[],a=new Set;for(let t of c){var h,y,d=u[t]||[];let r=await AnalyzerUtils.getAnalyzerSchema(analyzersBasePath,t);if(!r)throw this.errorHandler.createAnalyzerNotFoundError(t);let e=[];0!==(e=0<d.length?d.map(e=>({field:e.field,type:e.type})):Object.entries(r.properties).map(([e,r])=>({field:e,type:r.type}))).length&&(e.forEach(e=>{s.push({analyzerId:t,field:e.field,type:e.type,description:r.properties[e.field]?.description||""})}),h=await buildMetaRawQuery(this.searchBuilder.db,{...i,analyzerId:t,fieldsToExtract:e},l),y=await this.searchExecutor.execute(h),n.push(y.results),y.results.forEach(e=>{a.add(e.chats_id)}))}var p=this.resultProcessor.mergeRawResults(n,s),f=i.options.format;let e;return e="pretty"===f?this.resultProcessor.formatPretty(p,s,i.customMappings):JSON.stringify(p,null,2),this.resultProcessor.formatFinalResponse(e,r,i,p.length)}catch(e){return console.error("MetaRawExecutor error:",e),this.errorHandler.formatErrorResponse(e)}}}module.exports=MetaRawExecutor;
