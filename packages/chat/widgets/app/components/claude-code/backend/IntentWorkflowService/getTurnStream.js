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

let fs=require("fs"),readline=require("readline"),ERROR_CODES=require("./constants").ERROR_CODES;async function getTurnStream(e,{messageId:t,contractUuid:s,authcode:a,turn:n}){try{var o=await e.messageService.getById(t);if(!o)return{success:!1,error:{code:ERROR_CODES.MESSAGE_NOT_FOUND,message:`Message ${t} not found.`}};var c=o.meta.sessionId,u=o.meta.state.currentTurn;let r=n||u;var i=await e.contractService.executeInfo(s,a);if(!i.success)return{success:!1,error:{code:ERROR_CODES.CONTRACT_NOT_FOUND,message:"Contract not found."}};if("xxxx"===i.authcode)return{success:!1,error:{code:ERROR_CODES.AUTH_INVALID,message:"Invalid authorization code."}};if("active"!==i.status)return{success:!1,error:{code:ERROR_CODES.CONTRACT_NOT_ACTIVE,message:"Contract is not active."}};var O=require("./cliUtils").getStatus,_=await O(c);if(!_||!_.turns)return{success:!1,error:{code:ERROR_CODES.SESSION_NOT_FOUND,message:"Session not found."}};var R=_.turns.find(e=>e.turn_number===r);if(!R||!R.log_path)return{success:!1,error:{code:ERROR_CODES.LOG_FILE_NOT_FOUND,message:`Log file not found for turn ${r}.`}};var d=R.log_path;if(!fs.existsSync(d))return{success:!1,error:{code:ERROR_CODES.LOG_FILE_NOT_FOUND,message:"Log file not found on disk."}};var f,S=[],l=fs.createReadStream(d,{encoding:"utf8"});for await(f of readline.createInterface({input:l,crlfDelay:1/0}))if(f.trim())try{S.push(JSON.parse(f))}catch(e){console.warn("[IntentWorkflowService::getTurnStream] Failed to parse log line:",f)}return{success:!0,turn:r,turn_type:R.turn_type,status:R.status,started_at:R.started_at,completed_at:R.completed_at||null,log_path:d,total_events:S.length,events:S}}catch(e){return console.error("[IntentWorkflowService::getTurnStream] Get Turn Stream Error:",e),{success:!1,error:{code:ERROR_CODES.UNKNOWN_ERROR,message:e.message}}}}module.exports={getTurnStream:getTurnStream};
