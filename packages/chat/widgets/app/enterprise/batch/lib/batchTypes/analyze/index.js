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

let fs=require("fs").promises,os=require("os"),path=require("path"),ConfigUtils=require("@gitsense/gsc-utils").ConfigUtils,{InvalidInputError,BatchError,ProviderError}=require("../../errors"),validateAnalyzerId=require("../../validators/analyzeValidator").validateAnalyzerId,validateCreateBatchJobParams=require("../../validators/batchJobValidator").validateCreateBatchJobParams,createRealtimeAnalyzeBatchJob=require("./createRealtimeAnalyzeBatchJob").createRealtimeAnalyzeBatchJob,submitScheduledAnalyzeBatchJob=require("./submitScheduledAnalyzeBatchJob").submitScheduledAnalyzeBatchJob,INTERNAL_PROVIDER_NAME=require("../../providers/internal-realtime").INTERNAL_PROVIDER_NAME;async function createAnalyzeBatchJob(e,a,r,t,i,l,o,n,d,c="scheduled",u=null,s=null){if(validateCreateBatchJobParams(a,r,t,i),await validateAnalyzerId(e,d),!["realtime","scheduled"].includes(c))throw new InvalidInputError(`Invalid batch job type: '${c}'. Must be 'realtime' or 'scheduled'.`);if("realtime"===c){if(o.name!==INTERNAL_PROVIDER_NAME)throw new InvalidInputError(`Invalid realtime provider name "${o.name}"`);return createRealtimeAnalyzeBatchJob(e,a,r,t,i,l,o,n,d,u,s)}if("scheduled"===c){var h,b,c=o.name;if(ConfigUtils.getProviderForModel(l,a))return h=o.fileApi,b=o.batchApi,submitScheduledAnalyzeBatchJob(e,a,r,t,i,l,o,n,d,h,b,u,s);throw new InvalidInputError(`Model '${a}' not found or not supported by ${c} provider.`)}}module.exports={createAnalyzeBatchJob:createAnalyzeBatchJob};
