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

let dayjs=require("dayjs"),relativeTime=require("dayjs/plugin/relativeTime"),durationPlugin=require("dayjs/plugin/duration"),textTable=require("text-table"),HEARTBEAT_TIMEOUT_SECONDS=(dayjs.extend(relativeTime),dayjs.extend(durationPlugin),30);function isProcessRunning(e){try{return process.kill(e,0),!0}catch(e){return!1}}async function getWorkerStatusData(e){if(!e||"function"!=typeof e.queryAll)throw new Error("Invalid batchesApi provided to getWorkerStatusData.");try{var t=await e.queryAll("SELECT worker_name, pid, status, state, last_heartbeat, started_at FROM worker_heartbeats",[]);let i=dayjs(),n=[];return 0===t.length?[]:(t.forEach(e=>{var t=dayjs(e.last_heartbeat),a=dayjs(e.started_at),t=i.diff(t,"second");let r="UNKNOWN";var s=isProcessRunning(e.pid),s=(r=s?t>HEARTBEAT_TIMEOUT_SECONDS?`STALE (${t}s ago)`:"HEALTHY":"DEAD (PID Missing)",0<i.diff(a,"second")?dayjs.duration(i.diff(a)).humanize():"0s");let o=[];if(e.state)try{o=JSON.parse(e.state)}catch(e){}n.push({worker_name:e.worker_name,pid:e.pid,status:e.status,uptime:s,last_heartbeat:e.last_heartbeat,seconds_since_heartbeat:t,health:r,activities:o})}),n)}catch(e){if(e.message.includes("no such table"))return console.warn("Worker heartbeats table not found. Please ensure the database schema is up to date."),[];throw console.error("Error querying heartbeats:",e.message),e}}async function showWorkerStatus(e){try{var a=await getWorkerStatusData(e);let t=[["WORKER","PID","STATUS","UPTIME","LAST HEARTBEAT","HEALTH"]];0===a.length?console.log("No active worker heartbeats found."):(a.forEach(e=>{t.push([e.worker_name,e.pid,e.status,e.uptime,e.seconds_since_heartbeat+"s ago","HEALTHY"===e.health?`[32m${e.health}[0m`:`[31m${e.health}[0m`]),e.activities&&0<e.activities.length&&e.activities.forEach(e=>{t.push(["  > "+dayjs(e.timestamp).format("HH:mm:ss"),"","","","",`[90m${e.message}[0m`])})}),console.log(),console.log(textTable(t,{align:["l","r","l","l","r","l"]})),console.log())}catch(e){console.error("Error displaying worker status:",e.message)}}module.exports={showWorkerStatus:showWorkerStatus,getWorkerStatusData:getWorkerStatusData};
