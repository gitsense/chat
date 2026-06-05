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

let promisify=require("util").promisify,exec=require("child_process").exec,ERROR_CODES=require("./constants").ERROR_CODES,{sendEvent,sendError}=require("./sseUtils"),execAsync=promisify(exec);async function stopSession(r,{messageId:t,contractUuid:e,authcode:s,res:o,force:a=!1}){try{var n=await r.messageService.getById(t);if(n){var i=n.meta.sessionId,d=n.meta.state.status,c=await r.contractService.executeInfo(e,s);if(c.success)if("xxxx"===c.authcode)sendError(o,{code:ERROR_CODES.AUTH_INVALID,message:"Invalid authorization code.",severity:"error",retryable:!1,details:{field:"authcode",provided:s}});else if("active"!==c.status)sendError(o,{code:ERROR_CODES.CONTRACT_NOT_ACTIVE,message:"Contract is not active.",severity:"error",retryable:!1,details:{contractUuid:e,status:c.status}});else if("stopped"===d)sendError(o,{code:ERROR_CODES.INVALID_STATE,message:"The intent workflow session is already stopped.",severity:"warning",retryable:!1,details:{currentStatus:d}});else if("stopping"===d)sendError(o,{code:ERROR_CODES.INVALID_STATE,message:"The intent workflow session is already stopping. Please wait for the graceful shutdown to complete.",severity:"warning",retryable:!1,details:{currentStatus:d}});else if("completed"===d)sendError(o,{code:ERROR_CODES.INVALID_STATE,message:"The intent workflow session has already completed. You cannot stop a completed session.",severity:"warning",retryable:!1,details:{currentStatus:d}});else if("error"===d)sendError(o,{code:ERROR_CODES.INVALID_STATE,message:"The intent workflow session is in an error state. Please retry or delete the turn.",severity:"warning",retryable:!1,details:{currentStatus:d}});else if("running"!==d&&"initializing"!==d)sendError(o,{code:ERROR_CODES.INVALID_STATE,message:`Cannot stop intent workflow session in current state: ${d}. Only running or initializing sessions can be stopped.`,severity:"error",retryable:!1,details:{currentStatus:d}});else{await r._updateState(t,{status:"stopping",stoppingStartedAt:(new Date).toISOString()}),sendEvent(o,"stop_started",{sessionId:i,message:"Graceful shutdown initiated"}),o.end();var l=`gsc claude intent-workflow stop --session ${i}${a?" --force":""} --format json`,{stdout:p,stderr:u}=await execAsync(l);u&&console.error("[IntentWorkflowService::stopSession] CLI Error:",u);let e;try{e=JSON.parse(p.trim())}catch(e){return void sendError(o,{code:ERROR_CODES.CLI_PARSE_FAILED,message:"Failed to parse stop response",severity:"error",retryable:!1,details:{parseError:e.message,stdout:p.trim(),stderr:u.trim()}})}let s="stopped";e.process_exited;switch(e.status){case"stopped":s="stopped";break;case"stopping":s="stopping";break;case"error":s="error";break;default:s="stopped"}var E={status:s,processId:null};e.shutdown_method,e.shutdown_duration_ms,(new Date).toISOString();await r._updateState(t,E)}else sendError(o,{code:ERROR_CODES.CONTRACT_NOT_FOUND,message:"Contract not found.",severity:"error",retryable:!1,details:{contractUuid:e}})}else sendError(o,{code:ERROR_CODES.MESSAGE_NOT_FOUND,message:`Message ${t} not found.`,severity:"error",retryable:!1,details:{messageId:t}})}catch(e){console.error("[IntentWorkflowService::stopSession] Stop Session Error:",e);n={code:ERROR_CODES.STOP_FAILED,message:e.message,severity:"error",retryable:!1,details:{errorType:e.name,stack:e.stack}};o.writableEnded?console.error("[IntentWorkflowService::stopSession] Error occurred after connection closed:",e):sendError(o,n)}}module.exports={stopSession:stopSession};
