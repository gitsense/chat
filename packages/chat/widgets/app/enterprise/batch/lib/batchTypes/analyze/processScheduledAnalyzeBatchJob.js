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

let{InvalidInputError,BatchError,ProviderError}=require("../../errors"),fs=require("fs").promises,generateTempFilePath=require("../../utils/tempFileUtils").generateTempFilePath;async function processScheduledAnalyzeBatchJob(t,r,a){if(!t||!t.llm_provider_request_payload)throw new InvalidInputError("Batch job record is missing or does not contain llm_provider_request_payload.");if(!r||!r.fileApi||!r.batchApi)throw new InvalidInputError("Provider object is missing required fileApi or batchApi clients.");if(!a||!a.batches)throw new InvalidInputError("dbApi object is missing required batches API.");console.log("BATCH JOB"),console.log(t);var a=a.batches,e=t.llm_provider_request_payload,o=t.llm_model_id,l=t.display_name.match(/Analyzer: ([^)]+)/)?.[1]||"unknown";let i=null;try{i=generateTempFilePath("batch","jsonl"),await fs.writeFile(i,e,"utf8"),console.log("Temporary batch input file created at: "+i);var n=await r.fileApi.uploadFile(i,"application/jsonl",`gsc-batch-input-${t.id}-`+Date.now());if(!n||!n.name)throw new ProviderError("LLM provider file upload failed or returned unexpected response structure. Uploaded file object: "+JSON.stringify(n),r.name);var s=n.name,c=(console.log(`Batch input file uploaded to ${r.name} File API: `+s),await r.batchApi.createBatchJob(o,s,`Analyze-${l}-`+t.id)),d=c.name,p=c,u=c.dest?.fileName||null;console.log(`External batch job created with ID: ${d} for internal job ${t.id}.`);try{await a.updateBatchJob(t.id,{status:"PENDING",llm_provider_job_id:d,llm_provider_response_initial:p,llm_provider_output_file_uri:u,started_at:(new Date).toISOString(),poll_attempts:(t.poll_attempts||0)+1}),console.log(`Internal batch job ${t.id} updated with external provider details.`)}catch(e){console.error(`CRITICAL ERROR: Failed to update internal DB for batch job ${t.id} after successful external creation. Attempting to cancel external job ${d}: `+e.message,e);try{await r.batchApi.cancelBatchJob(d),console.log(`Successfully cancelled external LLM provider job ${d} due to internal DB update failure.`)}catch(e){console.error(`FAILED to cancel external LLM provider job ${d} after internal DB error: `+e.message,e)}throw new BatchError(`Internal database update failed after external batch job creation. External job ${d} may be orphaned. Original error: `+e.message)}return{llmProviderJobId:d,llmProviderResponseInitial:p,llmProviderOutputFileUri:u,batchJobId:t.id,status:"PENDING"}}catch(e){throw console.error(`Error interacting with LLM provider for external batch job creation for internal job ${t.id}: `+e.message,e),await a.updateBatchJob(t.id,{status:"FAILED",error_details:`Failed to create external batch job with ${r.name}: `+e.message,finished_at:(new Date).toISOString(),poll_attempts:(t.poll_attempts||0)+1}),new ProviderError("Failed to create batch job with LLM provider: "+e.message,r.name,e.status||null,e)}finally{if(i)try{await fs.unlink(i),console.log("Temporary batch input file deleted: "+i)}catch(e){console.warn(`Failed to delete temporary file ${i}: `+e.message)}}}module.exports={processScheduledAnalyzeBatchJob:processScheduledAnalyzeBatchJob};
