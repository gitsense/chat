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

let AnalyzerUtils=require("@gitsense/gsc-utils").AnalyzerUtils,{BatchError,ProviderError}=require("../../errors");async function upsertAnalyzeBatchResults(t,e,r,a,s){if(!(t&&e&&r&&a&&s))throw new BatchError("Missing required parameters for upsertAnalyzeBatchResults.");let i=new Map;e.forEach(e=>{var a=e.llm_request_key+"::"+e.original_chat_id;i.set(a,e)});var l,e=new Set(e.map(e=>e.original_chat_id)),o=await a.getLatestMessageInfoForChatIds(Array.from(e)),n=[],c=[];for(l of r){var d=l.llmRequestKey,u=l.chatId,h=i.get(d+"::"+u);if(h){var m=o.get(u),g=m?.parent_id||0,m=void 0!==m?.parent_level?m.parent_level:0;let e="FAILED",a=null;var p,_,f;l.groupError?(a="LLM provider group error: "+JSON.stringify(l.groupError),console.error(`Group error for batch item ${h.id} (chat_id: ${u}):`,l.groupError)):l.fileError?(a="File parsing/extraction error: "+l.fileError,console.error(`File parsing error for batch item ${h.id} (chat_id: ${u}): `+l.fileError)):l.analysisBlock&&l.metadataBlock?({analysisBlock:f,metadataBlock:p}=l,_=new Map([[u,"placeholder-path"]]),{validAnalysisData:f,invalidAnalysisBlocks:p}=AnalyzerUtils.validateLLMAnalysisData([f],[p],_),1===f.length?(f={...(_=f[0]).metadata,analyzer_model:t.llm_model_name},n.push({type:_.type,visibility:"public",chat_id:_.chatId,new_msg_parent_id:g,level:m+1,model:"GitSense Notes",real_model:t.llm_model_name,temperature:r.generationConfig?.temperature||0,role:"assistant",message:_.content,meta:f,_batchItemId:h.id}),e="SUCCEEDED"):(a=`LLM analysis data validation failed for file (chat_id: ${u}): `+JSON.stringify(p),console.error(a))):(a="Unexpected result format: Missing analysis or metadata blocks without explicit error.",console.error(a,l)),c.push({id:h.id,status:e,error_details:a,result_message_id:null})}else console.warn(`No matching batch item found for LLM request key: ${d} and chat ID: ${u}. Skipping.`)}if(0<n.length)try{var y=await a.upsertAnalysisMessages(n);console.log(`Upserted ${y.length} analysis messages into chats.sqlite3.`);for(let e=0;e<n.length;e++){let a=n[e]._batchItemId;var E=y[e],v=c.find(e=>e.id===a);v&&"SUCCEEDED"===v.status&&(v.result_message_id=E)}}catch(a){console.error("Failed to upsert analysis messages into chats.sqlite3:",a),c.forEach(e=>{"SUCCEEDED"===e.status&&(e.status="FAILED",e.error_details=e.error_details?e.error_details+"; Failed to save to chats DB: "+a.message:"Failed to save analysis result to chats DB: "+a.message,e.result_message_id=null)})}await s.beginTransaction();try{for(var b of c)await s.updateBatchItem(b.id,{status:b.status,error_details:b.error_details,result_message_id:b.result_message_id});await s.commitTransaction(),console.log(`Updated ${c.length} batch items in batches.sqlite3.`)}catch(e){throw await s.rollbackTransaction(),console.error("Failed to update batch items in batches.sqlite3 transaction:",e),new BatchError("Failed to finalize batch item statuses: "+e.message)}console.log(`Processed results for batch job ${t.id}.`)}module.exports={upsertAnalyzeBatchResults:upsertAnalyzeBatchResults};
