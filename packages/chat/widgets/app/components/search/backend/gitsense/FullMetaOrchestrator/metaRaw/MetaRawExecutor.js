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

let AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,analyzersBasePath=require("../../../Dependencies").analyzersBasePath,MetaRawResultProcessor=require("../metaRaw/MetaRawResultProcessor"),buildMetaRawQuery=require("../../SearchBuilder/modules/buildMetaRawQuery").buildMetaRawQuery;class MetaRawExecutor{constructor(e,r,t,s,a){this.searchParser=e,this.searchBuilder=r,this.searchExecutor=t,this.queryProcessor=s,this.errorHandler=a,this.resultProcessor=new MetaRawResultProcessor}async execute(r,l,t){try{var i=await this.searchParser.parse(r,t),o=this.queryProcessor.parseAllFullMetaFilters(r,!0),u=this.queryProcessor.groupFiltersByAnalyzer(o),n=Object.keys(u);if(0===n.length){if(!i.analyzerId)throw this.errorHandler.createInvalidSyntaxError("The 'meta-raw' profile requires either 'analyzer:' or 'full-meta:' filters.");n.push(i.analyzerId)}var c=[];let s=[],a=new Set;var h={};for(let t of n){var y,d,p=u[t]||[];let r=await AnalyzerUtils.getAnalyzerSchema(analyzersBasePath,t);if(!r)throw this.errorHandler.createAnalyzerNotFoundError(t);h[t]=r;let e=[];0!==(e=0<p.length?p.map(e=>({field:e.field,type:e.type})):Object.entries(r.properties).map(([e,r])=>({field:e,type:r.type}))).length&&(e.forEach(e=>{s.push({analyzerId:t,field:e.field,type:e.type,description:r.properties[e.field]?.description||""})}),y=await buildMetaRawQuery(this.searchBuilder.db,{...i,analyzerId:t,fieldsToExtract:e},l),d=await this.searchExecutor.execute(y),c.push(d.results),d.results.forEach(e=>{a.add(e.chats_id)}))}var f=this.resultProcessor.mergeRawResults(c,s,n),w=i.options.format;let e;return e="manifest"===w?this.resultProcessor.formatManifest(f,s,i.customMappings,h):"pretty"===w?this.resultProcessor.formatPretty(f,s,i.customMappings,h):JSON.stringify(f,null,2),this.resultProcessor.formatFinalResponse(e,r,i,f.length)}catch(e){return console.error("MetaRawExecutor error:",e),this.errorHandler.formatErrorResponse(e)}}}module.exports=MetaRawExecutor;
