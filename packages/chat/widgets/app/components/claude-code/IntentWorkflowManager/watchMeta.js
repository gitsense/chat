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

function watchMeta(e,t,i){t={task:"intent-workflow-watch-meta","message-id":e.message.id,fields:t};let a=new AbortController;return fetch(e.context.widget.streamURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),signal:a.signal}).then(e=>{if(!e.ok)throw new Error("HTTP error! status: "+e.status);let o=e.body.getReader(),n=new TextDecoder,s="";(async()=>{for(;;){var{done:e,value:t}=await o.read();if(e)break;var a,e=(s+=n.decode(t,{stream:!0})).split("\n\n");s=e.pop();for(a of e)if(a.trim()&&a.startsWith("data: "))try{var r=JSON.parse(a.substring(6));"meta_initial"===r.type?i("initial",r.event):"meta_changed"===r.type?i("changed",r.event):"error"===r.type&&console.error("[AgentManager::watchMeta] Error:",r.event)}catch(e){console.error("[AgentManager::watchMeta] Failed to parse event:",e)}}})()}).catch(e=>{"AbortError"!==e.name&&console.error("[AgentManager::watchMeta] Watch error:",e)}),()=>{a.abort()}}module.exports={watchMeta:watchMeta};
