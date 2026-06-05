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

let ERROR_CODES=require("./constants").ERROR_CODES,sendError=require("./sseUtils").sendError,getStatus=require("./cliUtils").getStatus;async function prepareTurn(e,{messageId:r,contractUuid:t,authcode:s,turnType:n,intent:a,model:u}){try{if(!await e.messageService.getById(r))return{success:!1,error:{code:ERROR_CODES.MESSAGE_NOT_FOUND,message:`Message ${r} not found.`}};var o=await e.contractService.executeInfo(t,s);if(!o.success)return{success:!1,error:{code:ERROR_CODES.CONTRACT_NOT_FOUND,message:"Contract not found."}};if("xxxx"===o.authcode)return{success:!1,error:{code:ERROR_CODES.AUTH_INVALID,message:"Invalid authorization code."}};if("active"!==o.status)return{success:!1,error:{code:ERROR_CODES.CONTRACT_NOT_ACTIVE,message:"Contract is not active."}};if("change"===n)return{success:!1,error:{code:ERROR_CODES.INVALID_TURN_SEQUENCE,message:"Change turn is not available at this time. This feature is coming soon! For now, use Discovery turns to explore your codebase."}};try{return await prepareTurnInternal(e,r,n,a,u),{success:!0}}catch(e){return console.error("[IntentWorkflowService::prepareTurn] Prepare Turn Error:",e),{success:!1,error:e.code?e:{code:ERROR_CODES.UNKNOWN_ERROR,message:e.toString()}}}}catch(e){return console.error("[IntentWorkflowService::prepareTurn] Prepare Turn Error:",e),{success:!1,error:{code:ERROR_CODES.UNKNOWN_ERROR,message:e.message}}}}async function prepareTurnInternal(e,r,t,s,n){var a=await e.messageService.getById(r),u=a.meta.state.currentTurn,o=a.meta.sessionId,o=await getStatus(o);if(!o||!o.turns)throw console.error("[DEBUG prepareTurnInternal] No status data or turns found"),{code:ERROR_CODES.SESSION_NOT_FOUND,message:"Failed to retrieve session status."};var o=o.turns[o.turns.length-1],c=["complete","skipped"];if(o&&!c.includes(o.status))throw console.error("[DEBUG prepareTurnInternal] VALIDATION FAILED:",{lastTurnNumber:o.turn_number,lastTurnType:o.turn_type,lastTurnStatus:o.status,expectedStatuses:c,reason:`Status '${o.status}' is not in valid statuses [${c.join(", ")}]`}),{code:ERROR_CODES.INVALID_TURN_SEQUENCE,message:`Cannot start a new turn. The previous turn (Turn ${o.turn_number}) is not complete. Current status: ${o.status}.`};c=u+1,o=a.meta,o.state={status:"initializing",intent:s,model:n,currentTurn:c,currentTurnType:t,processId:null},u=`${a.message}

# Turn ${c} - ${t.charAt(0).toUpperCase()+t.slice(1)}

Successfully prepared turn.
`;await e.messageService.update(r,{content:u,meta:o})}module.exports={prepareTurn:prepareTurn};
