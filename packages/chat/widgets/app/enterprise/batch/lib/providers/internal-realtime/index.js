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

let ConfigUtils=require("@gitsense/gsc-utils").ConfigUtils,{BatchError,InvalidInputError}=require("../../errors"),INTERNAL_PROVIDER_NAME="InternalRealtime";async function getBatchJob(e,t){if(!e||!t)throw new InvalidInputError("Missing required parameters for internalRealtimeBatchProvider.getBatchJob.");var a=await t.getBatchJobByProviderJobId(e);if(!a||a.llm_provider_name!==INTERNAL_PROVIDER_NAME)return null;var t=await t.getBatchGroupStatusCounts(a.id),r=t.total,n=t.pending,o=t.running,i=t.succeeded,t=t.failed;let c;return{name:e,state:c="CANCELLED"===a.status?"JOB_STATE_CANCELLED":0===r?"JOB_STATE_QUEUED":i===r?"JOB_STATE_SUCCEEDED":t===r?"JOB_STATE_FAILED":i+t===r?"JOB_STATE_PARTIALLY_SUCCEEDED":!(0<o)&&0<n?"JOB_STATE_QUEUED":"JOB_STATE_RUNNING",processedGroups:i+t,failedGroups:t,createTime:a.created_at,updateTime:a.updated_at,totalGroups:r,pendingGroups:n,runningGroups:o,succeededGroups:i,failedGroups:t}}async function cancelBatchJob(t,e){if(!t||!e)throw new InvalidInputError("Missing required parameters for internalRealtimeBatchProvider.cancelBatchJob.");var a=await e.getBatchJobByProviderJobId(t);if(!a||a.llm_provider_name!==INTERNAL_PROVIDER_NAME)throw new BatchError(`Internal batch job with ID ${t} not found or is not an internal real-time job.`);if(["SUCCEEDED","FAILED","CANCELLED","EXPIRED"].includes(a.status))return console.warn(`Attempted to cancel internal batch job ${t} which is already in a completed state (${a.status}).`),{success:!0,message:`Internal real-time batch job ${t} is already in a completed state (${a.status}).`};try{return await e.updateBatchJob(a.id,{status:"CANCELLED",finished_at:(new Date).toISOString(),error_details:"Internal real-time batch job cancelled by user."}),console.log(`Internal real-time batch job ${t} marked as CANCELLED by provider.`),{success:!0,message:`Internal real-time batch job ${t} cancellation acknowledged.`}}catch(e){throw console.error(`Failed to update internal batch job ${t} to CANCELLED: `+e.message,e),new BatchError("Failed to acknowledge internal real-time batch job cancellation: "+e.message)}}module.exports={getBatchJob:getBatchJob,cancelBatchJob:cancelBatchJob,INTERNAL_PROVIDER_NAME:INTERNAL_PROVIDER_NAME};
