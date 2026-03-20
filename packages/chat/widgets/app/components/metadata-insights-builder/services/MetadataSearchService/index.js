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

let chatApi=require("../../dependencies").chatApi,QueryBuilder=require("./queryBuilder"),{BATCH_SIZE,ERROR_MESSAGES}=require("./constants");class MetadataSearchService{constructor(e){this.context=e,this.batchSize=BATCH_SIZE}async executeBatchedSearch(t,r,a,e={}){var s=Date.now(),n=e.onProgress;try{if(!t||!Array.isArray(t)||0===t.length)throw new Error(ERROR_MESSAGES.NO_FILES_SELECTED);if(!r||!Array.isArray(r)||0===r.length)throw new Error(ERROR_MESSAGES.NO_ANALYZERS_SELECTED);if(!a||!Array.isArray(a)||0===a.length)throw new Error(ERROR_MESSAGES.NO_METADATA_FIELDS_SELECTED);n&&n({status:"initializing",message:"Initializing search..."});var h=QueryBuilder.createLookupMappings(t,r,a),c=this._createBatches(t);n&&n({status:"batching",message:`Processing ${c.length} batch${1<c.length?"es":""}...`,totalBatches:c.length,totalFiles:t.length});let e=null;for(let t=0;t<c.length;t++){var i,o=c[t],l=o.map(e=>e.id),u=QueryBuilder.constructSearchQuery(l,h,a);n&&(i=Math.round((Date.now()-s)/1e3),n({status:"processing",message:`Processing batch ${t+1} of ${c.length} (${o.length} files)...`,currentBatch:t+1,totalBatches:c.length,batchFiles:o.length,elapsedSeconds:i}));try{var g,E=await chatApi.search(this.context.widget,u);if(!E||!E.results)throw new Error(ERROR_MESSAGES.SEARCH_FAILED);e=0===t?E.results:this._appendBatchData(e,E.results),n&&(g=Math.round((Date.now()-s)/1e3),n({status:"batch-completed",message:`Completed batch ${t+1} of `+c.length,currentBatch:t+1,totalBatches:c.length,elapsedSeconds:g}))}catch(e){throw n&&n({status:"error",message:`Error in batch ${t+1}: `+e.message,error:e,batchNumber:t+1}),new Error(`Search failed for batch ${t+1}: `+e.message)}}return n&&n({status:"finalizing",message:"Finalizing results...",elapsedSeconds:Math.round((Date.now()-s)/1e3)}),{prettyFormat:e,metadata:{totalFiles:t.length,totalBatches:c.length,elapsedSeconds:Math.round((Date.now()-s)/1e3)}}}catch(e){throw console.error("Error in executeBatchedSearch:",e),n&&n({status:"error",message:e.message,error:e}),e}}_createBatches(t){var r=[];for(let e=0;e<t.length;e+=this.batchSize)r.push(t.slice(e,e+this.batchSize));return r}_appendBatchData(e,t){var r=t.indexOf("## Data");return-1===r||-1===(r=(t=t.substring(r)).indexOf("\n|"))||-1===(r=t.indexOf("\n|",r+1))?e:e+t.substring(r+1).split("\n").filter(e=>!e.match(/^\|[\s\-\|]*\|$/)).join("\n")}}module.exports=MetadataSearchService;
