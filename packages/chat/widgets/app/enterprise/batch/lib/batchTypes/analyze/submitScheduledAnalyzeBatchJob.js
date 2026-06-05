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

let fs=require("fs").promises,{InvalidInputError,BatchError,ProviderError}=require("../../errors"),generateTempFilePath=require("../../utils/tempFileUtils").generateTempFilePath,generateInputHash=require("../../utils/hashUtils").generateInputHash,ConfigUtils=require("@gitsense/gsc-utils").ConfigUtils,buildAnalyzePrompt=require("./promptBuilder").buildAnalyzePrompt;async function submitScheduledAnalyzeBatchJob(e,t,a,i,r,o,l,s,n,u,d,h=null,c=null){var g=s.batches,_="scheduled",p=generateInputHash(e,a,_,h),m=await g.getBatchJobByInputHash(p);if(m&&!["SUCCEEDED","FAILED","CANCELLED","EXPIRED"].includes(m.status))return console.log(`Existing active scheduled batch job found for hash ${p}. Returning existing job ID: `+m.id),{batchJobId:m.id,status:m.status,triggerChatId:m.trigger_chat_id,triggerChatUuid:m.trigger_chat_uuid,message:`An active scheduled batch job with similar parameters already exists (ID: ${m.id}).`};let b=await s.chats.getChatById(r);if(!b)throw new InvalidInputError(`Trigger chat with ID ${r} not found.`);m=b.uuid,o=ConfigUtils.getProviderForModel(o,t);if(!o)throw new InvalidInputError(`Model '${t}' not found in configuration.`);o=o.modelId;let I=[],y=[];var E=[];for(let r of a){var f=await buildAnalyzePrompt(_,e,r.chatIds,i,n,s.chats,h,c),v=r.chatIds.length,w=r.totalTokens;let t=`chat-${b.id}-group-`+r.id;I.push({group_number:r.id,llm_request_key:t,status:"PENDING",stats:{totalItemsInGroup:v,totalTokens:w},llm_chat_completion_prompt:null}),E.push({key:t,request:f}),r.chatIds.forEach(e=>{y.push({group_number:r.id,original_chat_id:e,llm_request_key:t,status:"PENDING"})})}a=E.map(e=>JSON.stringify(e)).join("\n");let q;try{await g.beginTransaction(),q=await g.insertBatchJob({display_name:`Scheduled Analysis Job for Chat ${r} (Analyzer: ${e})`,status:"EXTERNAL_CREATION_PENDING",type:"analyze-scheduled",llm_model_id:o,llm_model_name:t,llm_provider_name:l.name,input_hash:p,llm_provider_job_id:null,llm_provider_request_payload:a,llm_provider_response_initial:null,llm_provider_output_file_uri:null,trigger_chat_id:r,trigger_chat_uuid:m});for(var A of I)A.llm_request_key=`chat-${b.id}-group-${A.group_number}-job-`+q;for(var C of y)C.llm_request_key=`chat-${b.id}-group-${C.group_number}-job-`+q;var N=E.map((e,t)=>({key:`chat-${b.id}-group-${I[t].group_number}-job-`+q,request:e.request})).map(e=>JSON.stringify(e)).join("\n");await g.updateBatchJob(q,{llm_provider_request_payload:N}),await g.insertBatchGroups(q,I),await g.insertBatchItems(q,y),await g.commitTransaction()}catch(e){throw await g.rollbackTransaction(),console.error("Error recording batch job in internal database:",e),new BatchError("Failed to record batch job in internal database: "+e.message)}return{batchJobId:q,status:"EXTERNAL_CREATION_PENDING",triggerChatUuid:m,triggerChatId:r,message:`Batch analysis job request submitted successfully with ID: ${q}. Awaiting external provider creation.`}}module.exports={submitScheduledAnalyzeBatchJob:submitScheduledAnalyzeBatchJob};
