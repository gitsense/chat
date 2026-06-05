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

let fs=require("fs"),path=require("path"),formatContextContent=require("@gitsense/gsc-utils").formatContextContent,ContractValidator=require("../utils/ContractValidator").ContractValidator,{sendEvent,sendError}=require("./sseUtils");function _estimateTokens(e){return Math.ceil(e.length/4)}function _getLanguage(e){return{".js":"javascript",".ts":"typescript",".go":"go",".py":"python",".java":"java",".c":"c",".cpp":"cpp",".h":"c",".hpp":"cpp",".rs":"rust",".rb":"ruby",".php":"php",".sql":"sql",".sh":"bash",".json":"json",".yaml":"yaml",".yml":"yaml",".xml":"xml",".html":"html",".css":"css",".md":"markdown",".txt":"text"}[path.extname(e).toLowerCase()]||"text"}async function createContextMessage(e,{messageId:t,files:a,contractUuid:r,authcode:s},o){try{var n=await ContractValidator.validate(e.contractService,r,s);if(n.valid){var i=await e.messageService.getById(t);if(i){var c=await e.chatService.getById(i.chat_id);if(c){var l=c.main_model,d=await e.messageService.getLatestMessage(i.chat_id);if(d){sendEvent(o,"started",{totalFiles:a.length});var g=[];for(let e=0;e<a.length;e++){var h=a[e],m=path.join(h.repoPath,h.path);try{var p=fs.readFileSync(m,"utf8"),u=Buffer.byteLength(p,"utf8"),f=_estimateTokens(p),v=_getLanguage(h.path);g.push({chatId:h.id,name:path.basename(h.path),path:h.path,content:p,size:u,tokenCount:f,highlight:v,repo:{fullName:h.repo},meta:{type:"git-blob"}}),sendEvent(o,"progress",{current:e+1,total:a.length,fileName:h.path})}catch(e){return console.error(`[createContextMessage] Error reading file ${m}:`,e),void sendError(o,{code:"FILE_READ_ERROR",message:"Failed to read file: "+h.path,details:{error:e.message}})}}var C=formatContextContent(g,"file content","working-directory"),_=await e.messageService.create({chat_id:i.chat_id,role:"assistant",message:C,parent_id:d.id,level:d.level+1,type:"context",visibility:"public",model:l});sendEvent(o,"complete",{messageId:_}),o.end()}else sendError(o,{code:"LATEST_MESSAGE_NOT_FOUND",message:"Could not determine the latest message in the chat."})}else sendError(o,{code:"CHAT_NOT_FOUND",message:`Chat ${i.chat_id} not found.`})}else sendError(o,{code:"MESSAGE_NOT_FOUND",message:`Parent message ${t} not found.`})}else sendError(o,{code:"CONTRACT_INVALID",message:n.error})}catch(e){console.error("[createContextMessage] Unexpected error:",e),sendError(o,{code:"UNKNOWN_ERROR",message:e.message})}}module.exports={createContextMessage:createContextMessage};
