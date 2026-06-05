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

let ERROR_CODES=require("./constants").ERROR_CODES,{sendEvent,sendError}=require("./sseUtils");async function watchMeta(n,{messageId:o,fields:c,res:l}){try{let s=await n.messageService.getById(o);if(s){l.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Accel-Buffering":"no"}),l.flushHeaders();let r={},e=(c.forEach(e=>{var t=getNestedValue(s.meta,e);r[e]=t}),sendEvent(l,"meta_initial",r),setInterval(async()=>{try{var e,t=await n.messageService.getById(o);for(e of c){var r=getNestedValue(t.meta,e),a=getNestedValue(s.meta,e);JSON.stringify(r)!==JSON.stringify(a)&&(sendEvent(l,"meta_changed",{field:e,value:r,previousValue:a}),setNestedValue(s.meta,e,r))}}catch(e){console.error("[IntentWorkflowService::watchMeta] Poll error:",e)}},1e3));l.on("close",()=>{clearInterval(e)})}else sendError(l,{code:ERROR_CODES.MESSAGE_NOT_FOUND,message:`Message ${o} not found.`,severity:"error",retryable:!1,details:{messageId:o}})}catch(e){console.error("[IntentWorkflowService::watchMeta] Watch meta error:",e),sendError(l,{code:ERROR_CODES.UNKNOWN_ERROR,message:e.message,severity:"error",retryable:!1,details:{errorType:e.name,stack:e.stack}})}}function getNestedValue(e,t){return t.split(".").reduce((e,t)=>e?.[t],e)}function setNestedValue(e,t,r){var t=t.split("."),a=t.pop();t.reduce((e,t)=>e[t]=e[t]||{},e)[a]=r}module.exports={watchMeta:watchMeta};
