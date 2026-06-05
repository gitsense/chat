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

let GoogleGenAI=require("@google/genai").GoogleGenAI,ProviderError=require("../../errors").ProviderError,JobState=require("@google/genai").JobState;class GoogleBatchApi{constructor(e){if(!e||!e.batches)throw new ProviderError('Invalid GoogleGenAI client provided to GoogleBatchApi. Missing "batches" module.');this.batchesClient=e.batches}async createBatchJob(e,t,o,a){try{var r={model:e,src:{fileName:t},config:{displayName:o,dest:a?{gcsUri:a,format:"jsonl"}:void 0}};return await this.batchesClient.create(r)}catch(e){throw console.error("Error creating batch job with Google Gemini Batch API: "+e.message,e),new ProviderError("Failed to create batch job with Gemini Batch API: "+e.message,"Google Gemini Batch API",e.status||null,e)}}async getBatchJob(t){try{return await this.batchesClient.get({name:t})}catch(e){if(404===e.status)return null;throw console.error(`Error retrieving batch job ${t} from Google Gemini Batch API: `+e.message,e),new ProviderError(`Failed to get batch job ${t} from Gemini Batch API: `+e.message,"Google Gemini Batch API",e.status||null,e)}}async listBatchJobs(e={}){try{var t,o={config:{pageSize:e.pageSize}},a=await this.batchesClient.list(o),r=[];for await(t of a)r.push(t);return r}catch(e){throw console.error("Error listing batch jobs from Google Gemini Batch API: "+e.message,e),new ProviderError("Failed to list batch jobs from Gemini Batch API: "+e.message,"Google Gemini Batch API",e.status||null,e)}}async cancelBatchJob(t){try{await this.batchesClient.cancel({name:t}),console.log(`Batch job ${t} cancellation requested.`)}catch(e){throw console.error(`Error canceling batch job ${t} with Google Gemini Batch API: `+e.message,e),new ProviderError(`Failed to cancel batch job ${t} with Gemini Batch API: `+e.message,"Google Gemini Batch API",e.status||null,e)}}async deleteBatchJob(t){try{await this.batchesClient.delete({name:t}),console.log(`Batch job ${t} deletion requested.`)}catch(e){throw console.error(`Error deleting batch job ${t} with Google Gemini Batch API: `+e.message,e),new ProviderError(`Failed to delete batch job ${t} with Gemini Batch API: `+e.message,"Google Gemini Batch API",e.status||null,e)}}isJobCompleted(e){return!(!e||!e.state)&&new Set([JobState.JOB_STATE_SUCCEEDED,JobState.JOB_STATE_FAILED,JobState.JOB_STATE_CANCELLED,JobState.JOB_STATE_EXPIRED,JobState.JOB_STATE_PARTIALLY_SUCCEEDED]).has(e.state)}}module.exports=GoogleBatchApi;
