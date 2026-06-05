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

let ERROR_CODES=require("./constants").ERROR_CODES,ContractValidator=require("../utils/ContractValidator").ContractValidator,promisify=require("util").promisify,exec=promisify(require("child_process").exec);async function validateContextFiles(e,{messageId:t,turn:r,contractUuid:a,authcode:o}){try{var i=await ContractValidator.validate(e.contractService,a,o);if(!i.valid)return{success:!1,error:{code:ERROR_CODES.CONTRACT_NOT_FOUND,message:i.error}};var s=await e.messageService.getById(t);if(!s)return{success:!1,error:{code:ERROR_CODES.MESSAGE_NOT_FOUND,message:`Message ${t} not found.`}};var n=s.meta.working_directories||[],l=s.meta.results?.turns||[],d=r-1;if(d<0||d>=l.length)return{success:!1,error:{code:ERROR_CODES.INVALID_TURN_SEQUENCE,message:`Turn ${r} not found in message results.`}};var c,h=l[d].result?.discovery?.candidates||[],p=(console.log("[validateContextFiles] DEBUG: Starting validation for",n.length,"working directories"),{}),u=[];for(c of n){console.log(`[validateContextFiles] DEBUG: Processing workdir ${c.id} (${c.name}) at `+c.path);try{var g,m=(await exec("git rev-parse --abbrev-ref HEAD",{cwd:c.path})).stdout,v=m.trim(),f=(console.log("[validateContextFiles] DEBUG:   Branch detected: "+v),await e.messageService.getGroupByPath(c.path));console.log("[validateContextFiles] DEBUG:   Group lookup result:",f),f?(g=await e.messageService.getRefChatId(f.id,v),console.log("[validateContextFiles] DEBUG:   Ref Chat ID lookup result: "+g),g?(p[c.id]={groupId:f.id,refChatId:g,branchName:v,path:c.path,name:c.name,repo:f.name,repoPath:f.path},console.log("[validateContextFiles] DEBUG:   Successfully resolved workdir "+c.id)):(console.warn("[validateContextFiles] WARN:   Ref Chat ID not found for branch "+v),u.push({name:c.name,path:c.path,reason:"branch_not_imported"}))):(console.warn("[validateContextFiles] WARN:   Group not found for path: "+c.path),u.push({name:c.name,path:c.path}))}catch(e){console.error(`[validateContextFiles] ERROR: Error resolving workdir ${c.name}:`,e),u.push({name:c.name,path:c.path,reason:"git_error",error:e.message})}}console.log("[validateContextFiles] DEBUG: Resolved",Object.keys(p).length,"workdirs, missing",u.length);var C,R=[],_=[];for(C of h){var E=p[C.workdir_id];if(E)try{var w=await e.messageService.getBlobChatId(E.groupId,E.refChatId,C.file_path);w?R.push({chatId:w,path:C.file_path,workdirName:E.name,repo:E.repo,repoPath:E.repoPath}):(console.warn("[validateContextFiles] WARN: Blob Chat ID not found for "+C.file_path),_.push({path:C.file_path,workdirName:E.name,reason:"file_not_imported"}))}catch(e){console.error(`[validateContextFiles] ERROR: Error validating file ${C.file_path}:`,e),_.push({path:C.file_path,workdirName:E.name,reason:"db_error",error:e.message})}else console.warn(`[validateContextFiles] WARN: Workdir ${C.workdir_id} not found for file `+C.file_path),_.push({path:C.file_path,workdirName:C.workdir_name||"Unknown",reason:"workdir_missing"})}return console.log("[validateContextFiles] DEBUG: Validation complete. Valid:",R.length,"Missing:",_.length),{success:!0,validFiles:R,missingFiles:_,missingWorkdirs:u}}catch(e){return console.error("[validateContextFiles] Unexpected error:",e),{success:!1,error:{code:ERROR_CODES.CONTEXT_VALIDATION_FAILED,message:e.message}}}}module.exports={validateContextFiles:validateContextFiles};
