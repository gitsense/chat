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

let INTENT_WORKFLOW=require("../constants").INTENT_WORKFLOW;class IntentWorkflowMetadataUtils{static generateUUID(){return"undefined"!=typeof crypto&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}static createInitialMetadata(e){var t=(new Date).toISOString(),r={referenceFiles:e.referenceFiles||[],skipDiscovery:e.skipDiscovery||!1,disableExperts:e.disableExperts||!1,enableExperts:!e.disableExperts&&(null==e.enableExperts||e.enableExperts),enableCodeProvenance:e.enableCodeProvenance||!1},s={turns:[]};return r.skipDiscovery&&s.turns.push({turn_number:1,turn_type:"discovery",status:"skipped",started_at:t,completed_at:t,log_path:"",process_info:{pid:0,command:"",running:!1},usage:null,result:{discovery:{candidates:[],total_found:0,missing_files:[],keyword_assessment:null,discovery_log:{intent_keywords:[],pivot_checks:[],methodology:"Discovery skipped by user request",total_candidates_found:0,top_candidates_returned:0,validation_method:"N/A"},coverage:"Discovery skipped"}}}),{type:"gsc-intent-workflow",sessionId:e.sessionId||IntentWorkflowMetadataUtils.generateUUID(),working_directories:e.workingDirectories||[],createdAt:t,updatedAt:t,config:r,state:{status:"initializing",intent:e.intent,model:e.model,currentTurn:r.skipDiscovery?2:1,currentTurnType:r.skipDiscovery?INTENT_WORKFLOW.TURNS.CHANGE:INTENT_WORKFLOW.TURNS.DISCOVERY,processId:null},results:s,error:null}}static updateMetadata(e,t){let n=(t,r)=>{if(!r)return t;let s={...t};return this.isObject(t)&&this.isObject(r)&&Object.keys(r).forEach(e=>{this.isObject(r[e])&&e in t?s[e]=n(t[e],r[e]):Object.assign(s,{[e]:r[e]})}),s};return{...n(e,t),updatedAt:(new Date).toISOString()}}static isObject(e){return e&&"object"==typeof e&&!Array.isArray(e)}static extractMetadata(e,t){return e&&e.meta?(e=e.meta,t?e[t]||null:e):null}}module.exports={IntentWorkflowMetadataUtils:IntentWorkflowMetadataUtils};
