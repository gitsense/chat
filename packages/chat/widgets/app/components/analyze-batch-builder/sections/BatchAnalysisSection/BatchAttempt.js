/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * This software is permitted for internal use and modification.
 * Copying for profit or redistribution is strictly not permitted.
 *
 * The Fair License, which formalizes these terms, will be adopted as the official license in the future.
 * Once finalized, the unminified source code will be freely available for internal use for non-
 * commercial purposes.
 *
 * This software may not be used to develop or enhance any product or service that competes
 * directly or indirectly with GitSense Chat without explicit permission.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

class BatchAttempt{constructor(t,e,s){this.attemptNumber=t,this.chatUuid=e,this.model={...s},this.startedAt=(new Date).toISOString(),this.finishedAt=null,this.errorMessage=null,this.isTimedOut=!1,this.results=null,this.consecutiveFailedPolls=0,this.lastPollError=null,this.lastCheckedAt=null}static checkIfTimedOut(t,e){return!(!t.startedAt||t.finishedAt)&&(t=new Date(t.startedAt).getTime(),e<(new Date).getTime()-t)}static getDuration(t){var e=t.finishedAt?new Date(t.finishedAt):new Date,t=new Date(t.startedAt);return Math.floor((e.getTime()-t.getTime())/1e3)}static getStatus(t){return t.finishedAt?t.errorMessage?t.errorMessage.includes("cancelled")?"cancelled":"failed":"completed":"running"}recordPollSuccess(){this.lastCheckedAt=(new Date).toISOString(),this.consecutiveFailedPolls=0,this.lastPollError=null}recordPollFailure(t){this.consecutiveFailedPolls++,this.lastPollError=t,this.lastCheckedAt=(new Date).toISOString()}markCompleted(t=null){this.finishedAt=(new Date).toISOString(),this.errorMessage=null,this.isTimedOut=!1,this.results=t}markFailed(t){this.finishedAt=(new Date).toISOString(),this.errorMessage=t,this.isTimedOut=!1}markCancelled(){this.finishedAt=(new Date).toISOString(),this.errorMessage="Analysis cancelled by user",this.isTimedOut=!1}markTimedOut(t){this.finishedAt=(new Date).toISOString(),this.errorMessage=`Analysis timed out after ${t} seconds`,this.isTimedOut=!0}toJSON(){let{consecutiveFailedPolls:t,lastPollError:e,lastCheckedAt:s,...i}=this;return i}static fromJSON(t){var e=new BatchAttempt(t.attemptNumber,t.chatUuid,t.model);return e.startedAt=t.startedAt,e.finishedAt=t.finishedAt,e.errorMessage=t.errorMessage,e.isTimedOut=t.isTimedOut,e.results=t.results||null,e.consecutiveFailedPolls=0,e.lastPollError=null,e.lastCheckedAt=null,e}isTimedOut(t){return console.warn("BatchAttempt.isTimedOut() is deprecated. Use BatchAttempt.checkIfTimedOut(attempt, timeoutValue) instead."),BatchAttempt.checkIfTimedOut(this,t)}getDuration(){return console.warn("BatchAttempt.getDuration() is deprecated. Use BatchAttempt.getDuration(attempt) instead."),BatchAttempt.getDuration(this)}getStatus(){return console.warn("BatchAttempt.getStatus() is deprecated. Use BatchAttempt.getStatus(attempt) instead."),BatchAttempt.getStatus(this)}toPrunedObject(){return console.warn("BatchAttempt.toPrunedObject() is deprecated. Use toJSON() instead."),this.toJSON()}static fromPrunedObject(t){return console.warn("BatchAttempt.fromPrunedObject() is deprecated. Use fromJSON() instead."),BatchAttempt.fromJSON(t)}}module.exports=BatchAttempt;
