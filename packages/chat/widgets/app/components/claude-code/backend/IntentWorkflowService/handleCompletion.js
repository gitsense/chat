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

let path=require("path"),WRITE_THEN_READ_DELAY=require("../../constants").WRITE_THEN_READ_DELAY,ERROR_CODES=require("./constants").ERROR_CODES,{sendEvent,sendError}=require("./sseUtils"),getStatus=require("./cliUtils").getStatus,generateIntentWorkflowMarkdownReport=require("../../utils").generateIntentWorkflowMarkdownReport;async function handleCompletion(a,i,u){try{var t=i.meta.sessionId;let n=i.meta.state.currentTurn,o=null,e=0;for(;e<5;){if((o=await getStatus(t))&&o.turns)if(o.turns.find(e=>e.turn_number===n))break;await new Promise(e=>setTimeout(e,1e3)),e++}if(o){var d=o.turns.find(e=>e.turn_number===n);if("stopped"===o.status||d&&"stopped"===d.status){var r=i.meta.state.intent,s=i.meta.state.currentTurnType,l=o.working_directories||[],p=generateStoppedReport(r,n,s,l),c=i.meta;c.state.status="stopped",c.results||(c.results={turns:[]});let e=c.results.turns.find(e=>e.turn_number===n);e||(e={status:"stopped",turn_number:d.turn_number,turn_type:d.turn_type,started_at:d.started_at,completed_at:d.completed_at,correction_attempts:d.correction_attempts,correction_status:d.correction_status,result:{discovery:{candidates:[]}}},c.results.turns.push(e)),e.intent=c.state.intent,e.model=c.state.model,await a.messageService.update(i.id,{content:p,meta:c}),await new Promise(e=>setTimeout(e,WRITE_THEN_READ_DELAY)),sendEvent(u,"done",{status:"stopped"}),void u.end()}else{var m=i.meta.state.intent,_=i.meta.state.currentTurnType,v=o.working_directories||[];let e=null,t=null;"discovery"===_&&d.result&&d.result.discovery&&(e=d.result.discovery.discovery_mode||"unknown",t=d.result.discovery.brain_effectiveness||null);var E,R=i.meta.warnings||[],w=generateIntentWorkflowMarkdownReport(m,d.result,n,_,v,e,t,R);let r;r=1<n?(E=new RegExp(`# Turn ${n} - ${_.charAt(0).toUpperCase()+_.slice(1)}\\n\\nSuccessfully prepared turn\\.?\\n*`,"g"),i.message.replace(E,w)):w;o.turns.find(e=>1===e.turn_number&&"skipped"===e.status)&&(r=`# Turn 1 - Discovery Report

### Discovery Skipped

Discovery was intentionally skipped for this session. No files were discovered or validated.

---

`+r);var y=i.meta;v.length&&(y.working_directories=v.map(e=>({id:e.ID,name:e.Name,path:e.Path}))),y.results||(y.results={turns:[]});let s=y.results.turns.find(e=>e.turn_number===n);s||(s={turn_number:d.turn_number,turn_type:d.turn_type},y.results.turns.push(s)),s.intent=y.state.intent,s.model=y.state.model,s.result=d.result,s.usage=d.usage,s.cost=d.cost,s.duration=d.duration,s.status=d.status||"completed",s.started_at=d.started_at,s.completed_at=d.completed_at,s.correction_attempts=d.correction_attempts,s.correction_status=d.correction_status,e&&(s.discovery_mode=e),t&&(s.brain_effectiveness=t),y.config&&y.config.skipDiscovery&&(y.config.skipDiscovery=!1),y.state.status="completed",await a.messageService.update(i.id,{content:r,meta:y}),await new Promise(e=>setTimeout(e,WRITE_THEN_READ_DELAY)),sendEvent(u,"done",{status:"completed"}),u.end()}}else console.error(`[DEBUG handleCompletion] Failed to retrieve status after ${e} retries`),sendError(u,{code:ERROR_CODES.SESSION_NOT_FOUND,message:"Failed to retrieve status after retries.",severity:"error",retryable:!1,details:{sessionId:t,turn:n,retries:e}})}catch(e){console.error("[IntentWorkflowService::handleCompletion] Handle Completion Error:",e),sendError(u,{code:ERROR_CODES.UNKNOWN_ERROR,message:e.message,severity:"error",retryable:!1,details:{errorType:e.name,stack:e.stack}})}}function generateStoppedReport(e,t,r,s){t=`# Turn ${t} - ${r.charAt(0).toUpperCase()+r.slice(1)} Report (Stopped)

`;return t+`**Intent:** ${e}

`+`**Status:** ⚠️ Session stopped by user

`+`**Results:** No candidates were discovered before the session was stopped.

`+"The session was stopped before the AI could complete its analysis. "+`You can review the activity stream to see what was happening, or retry this turn.

`+`---

`+`*Session stopped at ${(new Date).toISOString()}*`}module.exports={handleCompletion:handleCompletion};
