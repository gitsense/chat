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

let promisify=require("util").promisify,exec=require("child_process").exec,fs=require("fs"),execAsync=promisify(exec);async function getStatus(t){try{var e=`gsc claude intent-workflow status --session ${t} --format json`,r=(await execAsync(e)).stdout;return JSON.parse(r)}catch(t){return console.error("[IntentWorkflowService::cliUtils] Failed to retrieve status:",t),null}}async function getLogPath(t,e){try{var r=`gsc claude intent-workflow --session ${t} --format json`,s=(await execAsync(r)).stdout,n=JSON.parse(s);if(n.current_log_path&&fs.existsSync(n.current_log_path))return n.current_log_path;if(n.turns&&Array.isArray(n.turns)){var o=n.turns.find(t=>t.turn_number===e);if(o&&o.log_path&&fs.existsSync(o.log_path))return o.log_path}return null}catch(t){return console.error("[IntentWorkflowService::cliUtils] Failed to get log path:",t),null}}async function getFinalResults(t,e){try{var r=`gsc claude intent-workflow results --session ${t} --turn ${e} --format json`,s=(await execAsync(r)).stdout;return JSON.parse(s)}catch(t){return console.error("[IntentWorkflowService::cliUtils] Failed to get results:",t),{error:t.message}}}module.exports={getStatus:getStatus,getLogPath:getLogPath,getFinalResults:getFinalResults};
