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

let startSession=require("./startSession").startSession,stopSession=require("./stopSession").stopSession,monitorSession=require("./monitorSession").monitorSession,getTurnStream=require("./getTurnStream").getTurnStream,prepareTurn=require("./prepareTurn").prepareTurn,{retryTurn,deleteTurn}=require("./turnActions"),watchMeta=require("./watchMeta").watchMeta,validateContextFiles=require("./validateContextFiles").validateContextFiles,createContextMessage=require("./createContextMessage").createContextMessage;class IntentWorkflowService{constructor(e,t,r){this.chatService=e,this.messageService=t,this.contractService=r}async _updateState(e,t){var r=await this.messageService.getById(e);if(!r)throw new Error(`Message ${e} not found.`);r={...r.meta.state||{},...t};await this.messageService.updateMeta(e,{state:r})}async startSession(e){return startSession(this,e)}async stopSession(e){return stopSession(this,e)}async monitorSession(e){return monitorSession(this,e)}async getTurnStream(e){return getTurnStream(this,e)}async prepareTurn(e){return prepareTurn(this,e)}async retryTurn(e){return retryTurn(this,e)}async deleteTurn(e){return deleteTurn(this,e)}async watchMeta(e){return watchMeta(this,e)}async validateContextFiles(e){return validateContextFiles(this,e)}async createContextMessage(e,t){return createContextMessage(this,e,t)}}module.exports=IntentWorkflowService;
