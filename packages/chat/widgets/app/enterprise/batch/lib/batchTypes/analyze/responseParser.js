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

let fs=require("fs").promises,path=require("path"),os=require("os"),generateTempFilePath=require("../../utils/tempFileUtils").generateTempFilePath,{ProviderError,BatchError}=require("../../errors"),{AnalyzerUtils,AnalysisBlockUtils}=require("@gitsense/gsc-utils");async function parseAnalyzeBatchResults(r,e){if(!r||"JOB_STATE_SUCCEEDED"!==r.state)throw new BatchError("Batch job must be in SUCCEEDED state to parse results.");if(!r.dest||!r.dest.fileName)throw new BatchError("Batch job object is missing output file URI (batchJob.dest.fileName).");if(!e.fileApi)throw new BatchError("No provider fileApi instance provided.");if("Google"!==e.name)throw new BatchError(`Provider "${e.name}" is currently not supported`);var s=r.dest.fileName;let o=null;var t=[];try{var a;os.tmpdir();o=generateTempFilePath("batch","jsonl"),console.log(`Downloading batch results from ${s} to ${o}...`),await e.fileApi.downloadFile(s,o),console.log("Batch results downloaded successfully.");for(a of(await fs.readFile(o,"utf8")).split("\n").filter(e=>""!==e.trim())){let e;try{e=JSON.parse(a)}catch(e){console.warn(`Warning: Failed to parse JSONL line as group result: ${a}. Error: `+e.message);var l=a.match(/"key"\s*:\s*"([^"]+)"/)?.[1];t.push({llmRequestKey:l||"unknown-key",groupError:{message:"Malformed JSONL group result: "+e.message,details:{rawLine:a}}});continue}var n=e.metadata?.key;if(n)if(e.error)t.push({llmRequestKey:n,groupError:e.error});else if(e.response){var i=e.response.text;if(i){var{analysisBlocks:u,analysisMetadataBlocks:c,error:p}=AnalyzerUtils.processLLMAnalysisResponse(i,!0);if(p)console.error(`Error processing LLM analysis response for group ${n}: `+p),t.push({llmRequestKey:n,groupError:{message:"LLM response processing failed for group: "+p}});else for(let s=0;s<u.length;s++){var g,m=u[s],f=c[s];let e=null,r=null;m?(g=AnalysisBlockUtils.parseOverviewMetadata(m.content))&&g["Chat ID"]?e=g["Chat ID"]:(r=`Could not extract Chat ID from analysis block for group ${n}.`,console.warn(r,m.content)):(r=`Missing analysis block for group ${n} at index ${s}.`,console.warn(r)),f||(r=r?r+" Also missing metadata block.":`Missing metadata block for group ${n} at index ${s}.`,console.warn(r)),t.push({llmRequestKey:n,chatId:e,analysisBlock:m,metadataBlock:f,itemError:r,groupError:null})}}else console.warn(`LLM response for group ${n} was successful but contained no text content.`),t.push({llmRequestKey:n,groupError:{message:"LLM response successful but no text content generated for group."}})}else console.warn(`Unexpected group result format for key ${n}:`,e),t.push({llmRequestKey:n,groupError:{message:"Unexpected group result format.",details:{rawResult:e}}});else console.warn("Skipping group result due to missing LLM request key:",e),t.push({llmRequestKey:"unknown-key",groupError:{message:"Group result missing LLM request key.",details:{rawResult:e}}})}return t}catch(e){throw console.error(`Error parsing analyze batch results for job ${r.name}: `+e.message,e),new ProviderError("Failed to parse batch results from Gemini File API: "+e.message,"Google Gemini File API",e.status||null,e)}finally{if(o)try{await fs.unlink(o),console.log("Temporary batch output file deleted: "+o)}catch(e){console.warn(`Failed to delete temporary file ${o}: `+e.message)}}}module.exports={parseAnalyzeBatchResults:parseAnalyzeBatchResults};
