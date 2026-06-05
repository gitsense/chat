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

let MAX_ACTIVITIES=5;class HeartbeatManager{constructor(t,e){this.workerName=t,this.dbApi=e,this.activities=[],this.startedAt=(new Date).toISOString(),this.currentStatus="STARTING"}async recordActivity(t,e){var s=(new Date).toISOString();this.activities.unshift({timestamp:s,message:t}),this.activities.length>MAX_ACTIVITIES&&this.activities.pop(),e&&(this.currentStatus=e),await this.sync()}async sync(){process.env.GSC_DEBUG_HEARTBEAT&&(console.log(`[Heartbeat Debug] Syncing heartbeat for ${this.workerName} (PID: ${process.pid})`),console.log(`[Heartbeat Debug] Status: ${this.currentStatus}, Activities: `+this.activities.length));var t=[this.workerName,process.pid,this.currentStatus,JSON.stringify(this.activities),(new Date).toISOString(),this.startedAt];try{await this.dbApi.batches.run(`
            INSERT OR REPLACE INTO worker_heartbeats (
                worker_name, pid, status, state, last_heartbeat, started_at
            ) VALUES (?, ?, ?, ?, ?, ?)
        `,t),process.env.GSC_DEBUG_HEARTBEAT&&console.log("[Heartbeat Debug] Successfully synced heartbeat for "+this.workerName)}catch(t){console.warn(`[Heartbeat] Failed to sync for ${this.workerName}: `+t.message),process.env.GSC_DEBUG_HEARTBEAT&&console.error("[Heartbeat Debug] Sync Error Details:",t)}}}module.exports=HeartbeatManager;
