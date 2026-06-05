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

async function startNextTurn(t,r,e,n){try{if(t.context.contractManager.isActive())if(t.context.contractManager.isOwner()){var o=t.context.contractManager.getAuthcode();if(o){var a=t.context.contractManager.getContractUUID(),s={action:"intent-workflow-prepare-turn","message-id":t.message.id,"contract-uuid":a,authcode:isNaN(o)?null:parseInt(o),"turn-type":r,intent:e,model:n},c=await fetch(t.context.widget.dataURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s),signal:t.abortController.signal});if(!c.ok)throw console.error("[DEBUG nextTurn::startNextTurn] HTTP error:",{status:c.status,statusText:c.statusText}),new Error("HTTP error! status: "+c.status);var i,u=await c.json();u.success?setTimeout(()=>{t.cleanup(),t.context.updateChat()},500):(i=u.error||{code:"UNKNOWN",message:"Failed to initialize turn"},console.error("[DEBUG nextTurn::startNextTurn] Failed to initialize turn:",i))}else console.error("[DEBUG nextTurn::startNextTurn] Authorization code missing")}else console.error("[DEBUG nextTurn::startNextTurn] You are not the owner of this contract");else console.error("[DEBUG nextTurn::startNextTurn] Contract is not active")}catch(t){"AbortError"!==t.name&&console.error("[DEBUG nextTurn::startNextTurn] Start next turn error:",t)}}module.exports={startNextTurn:startNextTurn};
