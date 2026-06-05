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

module.exports=t=>{let{run:i,get:e,all:a,beginTransaction:l,commitTransaction:s,rollbackTransaction:o,inTransaction:n}=t;return{async queryAll(t,e){return a(t,e)},async run(t,e=[]){return i(t,e)},async insertBatchJob(t){var e=(new Date).toISOString(),e=[t.display_name,t.type||"analyze-scheduled",t.status||"PENDING",t.llm_model_id,t.llm_model_name,t.llm_provider_name,t.input_hash||null,t.llm_provider_request_payload?JSON.stringify(t.llm_provider_request_payload):null,t.trigger_chat_id,t.trigger_chat_uuid,e,e,t.llm_provider_job_id||null,t.llm_provider_response_initial?JSON.stringify(t.llm_provider_response_initial):null,t.llm_provider_output_file_uri||null,t.started_at||null,t.finished_at||null,t.last_polled_at||null,t.next_poll_at||null,t.poll_attempts||0,t.consecutive_failures||0,t.rate_limit_requests_limit||null,t.rate_limit_requests_remaining||null,t.rate_limit_requests_reset||null,t.rate_limit_tokens_limit||null,t.rate_limit_tokens_remaining||null,t.rate_limit_tokens_reset||null,t.error_details||null],t=(await i(`
                INSERT INTO batch_jobs (
                    display_name, type, status, llm_model_id, llm_model_name, llm_provider_name, input_hash,
                    llm_provider_request_payload, trigger_chat_id, trigger_chat_uuid, created_at, updated_at,
                    llm_provider_job_id, llm_provider_response_initial, llm_provider_output_file_uri,
                    started_at, finished_at, last_polled_at, next_poll_at, poll_attempts, consecutive_failures,
                    rate_limit_requests_limit, rate_limit_requests_remaining, rate_limit_requests_reset,
                    rate_limit_tokens_limit, rate_limit_tokens_remaining, rate_limit_tokens_reset, error_details
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,e)).lastID;return t},async getBatchJobById(t){t=await e("SELECT * FROM batch_jobs WHERE id = ?",[t]);return t&&(t.llm_provider_request_payload&&(t.llm_provider_request_payload=JSON.parse(t.llm_provider_request_payload)),t.llm_provider_response_initial)&&(t.llm_provider_response_initial=JSON.parse(t.llm_provider_response_initial)),t},async getBatchJobByProviderJobId(t){t=await e("SELECT * FROM batch_jobs WHERE llm_provider_job_id = ?",[t]);return t&&(t.llm_provider_request_payload&&(t.llm_provider_request_payload=JSON.parse(t.llm_provider_request_payload)),t.llm_provider_response_initial)&&(t.llm_provider_response_initial=JSON.parse(t.llm_provider_response_initial)),t},async getBatchJobByInputHash(t){t=await e("SELECT *, trigger_chat_uuid FROM batch_jobs WHERE input_hash = ?",[t]);return t&&(t.llm_provider_request_payload&&(t.llm_provider_request_payload=JSON.parse(t.llm_provider_request_payload)),t.llm_provider_response_initial)&&(t.llm_provider_response_initial=JSON.parse(t.llm_provider_response_initial)),t},async updateBatchJob(t,e){var a,_=(new Date).toISOString(),r=[],l=[];for(a in e)Object.hasOwnProperty.call(e,a)&&"id"!==a&&"created_at"!==a&&"input_hash"!==a&&(r.push(a+" = ?"),"llm_provider_request_payload"===a||"llm_provider_response_initial"===a?l.push(JSON.stringify(e[a])):l.push(e[a]));0!==r.length&&(r.push("updated_at = ?"),l.push(_),l.push(t),_=`UPDATE batch_jobs SET ${r.join(", ")} WHERE id = ?`,await i(_,l))},async getPendingAndRunningBatchJobs(){return(await a("SELECT * FROM batch_jobs WHERE status IN ('PENDING', 'RUNNING', 'EXTERNAL_CREATION_PENDING') ORDER BY created_at ASC")).map(t=>(t.llm_provider_request_payload&&(t.llm_provider_request_payload=JSON.parse(t.llm_provider_request_payload)),t.llm_provider_response_initial&&(t.llm_provider_response_initial=JSON.parse(t.llm_provider_response_initial)),t))},async getBatchJobsSummary(t=!1){let e=`
                SELECT id, display_name, status, created_at, started_at, finished_at
                FROM batch_jobs
            `;return t||(e+=" WHERE status NOT IN ('SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED')"),e+=" ORDER BY created_at DESC",a(e,[])},async insertBatchItems(t,e){var a=(new Date).toISOString(),_=!n();_&&await l();try{for(var r of e)await i(`
                INSERT INTO batch_items (
                    batch_job_id, group_number, original_chat_id, llm_request_key,
                    status, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `,[t,r.group_number,r.original_chat_id,r.llm_request_key,r.status||"PENDING",a,a]);_&&await s()}catch(t){throw _&&await o(),t}},async getBatchItemsByBatchJobId(t){return a("SELECT * FROM batch_items WHERE batch_job_id = ?",[t])},async updateBatchItem(t,e){var a,_=(new Date).toISOString(),r=[],l=[];for(a in e)Object.hasOwnProperty.call(e,a)&&"id"!==a&&"created_at"!==a&&(r.push(a+" = ?"),l.push(e[a]));0!==r.length&&(r.push("updated_at = ?"),l.push(_),l.push(t),_=`UPDATE batch_items SET ${r.join(", ")} WHERE id = ?`,await i(_,l))},async getUnclaimedPendingBatchGroup(t){t=await e(`
                SELECT * FROM batch_groups
                WHERE
                    batch_job_id = ? AND
                    status = 'PENDING' AND
                    processing_pid IS NULL
                ORDER BY created_at ASC
                LIMIT 1
            `,[t]);return t&&t.llm_chat_completion_prompt&&(t.llm_chat_completion_prompt=JSON.parse(t.llm_chat_completion_prompt)),t&&t.llm_chat_completion_prompt&&t.llm_chat_completion_prompt.generationConfig&&(t.generationConfig=t.llm_chat_completion_prompt.generationConfig),t&&t.llm_chat_completion_response&&(t.llm_chat_completion_response=JSON.parse(t.llm_chat_completion_response)),t&&t.stats&&(t.stats=JSON.parse(t.stats)),t},async claimBatchGroup(t,e){var a=(new Date).toISOString(),e=(await i(`
                UPDATE batch_groups
                SET
                    status = 'RUNNING',
                    processing_pid = ?,
                    started_at = ?,
                    updated_at = ?
                WHERE
                    id = ? AND
                    status = 'PENDING' AND
                    processing_pid IS NULL
            `,[e,a,a,t])).changes;return 0<e},async updateBatchGroup(t,e){var a,_=(new Date).toISOString(),r=[],l=[];for(a in e)Object.hasOwnProperty.call(e,a)&&"id"!==a&&"created_at"!==a&&(r.push(a+" = ?"),"llm_chat_completion_prompt"===a||"llm_chat_completion_response"===a||"stats"===a?l.push(JSON.stringify(e[a])):l.push(e[a]));0!==r.length&&(r.push("updated_at = ?"),l.push(_),l.push(t),_=`UPDATE batch_groups SET ${r.join(", ")} WHERE id = ?`,await i(_,l))},async insertBatchGroups(t,e){var a=(new Date).toISOString(),_=!n();_&&await l();try{for(var r of e)await i(`
                INSERT INTO batch_groups (
                    batch_job_id, group_number, llm_request_key, llm_provider_name, llm_chat_completion_prompt,
                    status, llm_api_attempts, stats, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,[t,r.group_number,r.llm_request_key,r.llm_provider_name||null,r.llm_chat_completion_prompt?JSON.stringify(r.llm_chat_completion_prompt):null,r.status||"PENDING",r.llm_api_attempts||0,r.stats?JSON.stringify(r.stats):null,a,a]);_&&await s()}catch(t){throw _&&await o(),t}},async getBatchGroupsByBatchJobId(t){return(await a(`
                SELECT
                    bg.id,
                    bg.group_number,
                    bg.llm_request_key,
                    bg.status,
                    bg.llm_chat_completion_prompt,
                    bg.llm_chat_completion_response,
                    bg.processing_pid,
                    bg.llm_api_attempts,
                    bg.error_details,
                    bg.created_at,
                    bg.updated_at,
                    bg.started_at,
                    bg.finished_at,
                    bg.stats,
                    bg.analyze_chat_uuid,
                    SUM(CASE WHEN bi.status = 'SUCCEEDED' THEN 1 ELSE 0 END) AS successful_items_in_group,
                    SUM(CASE WHEN bi.status = 'FAILED' THEN 1 ELSE 0 END) AS failed_items_in_group,
                    SUM(CASE WHEN bi.status = 'PENDING' THEN 1 ELSE 0 END) AS pending_items_in_group
                FROM
                    batch_groups AS bg
                LEFT JOIN
                    batch_items AS bi ON bg.batch_job_id = bi.batch_job_id AND bg.group_number = bi.group_number
                WHERE
                    bg.batch_job_id = ?
                GROUP BY bg.id ORDER BY bg.group_number ASC
            `,[t])).map(t=>(t.llm_chat_completion_prompt&&(t.llm_chat_completion_prompt=JSON.parse(t.llm_chat_completion_prompt)),t.llm_chat_completion_response&&(t.llm_chat_completion_response=JSON.parse(t.llm_chat_completion_response)),t.llm_chat_completion_prompt&&t.llm_chat_completion_prompt.generationConfig&&(t.generationConfig=t.llm_chat_completion_prompt.generationConfig),t.stats&&(t.stats=JSON.parse(t.stats)),t))},async getBatchGroupsByBatchJobIdSince(t,e){return(await a(`
                SELECT
                    bg.id,
                    bg.group_number,
                    bg.llm_request_key,
                    bg.status,
                    bg.llm_chat_completion_prompt,
                    bg.llm_chat_completion_response,
                    bg.processing_pid,
                    bg.llm_api_attempts,
                    bg.error_details,
                    bg.created_at,
                    bg.updated_at,
                    bg.started_at,
                    bg.finished_at,
                    bg.stats,
                    bg.analyze_chat_uuid,
                    SUM(CASE WHEN bi.status = 'SUCCEEDED' THEN 1 ELSE 0 END) AS successful_items_in_group,
                    SUM(CASE WHEN bi.status = 'FAILED' THEN 1 ELSE 0 END) AS failed_items_in_group,
                    SUM(CASE WHEN bi.status = 'PENDING' THEN 1 ELSE 0 END) AS pending_items_in_group
                FROM
                    batch_groups AS bg
                LEFT JOIN
                    batch_items AS bi ON bg.batch_job_id = bi.batch_job_id AND bg.group_number = bi.group_number
                WHERE
                    bg.batch_job_id = ? AND bg.updated_at > ?
                GROUP BY bg.id ORDER BY bg.group_number ASC
            `,[t,e])).map(t=>(t.llm_chat_completion_prompt&&(t.llm_chat_completion_prompt=JSON.parse(t.llm_chat_completion_prompt)),t.llm_chat_completion_response&&(t.llm_chat_completion_response=JSON.parse(t.llm_chat_completion_response)),t.llm_chat_completion_prompt&&t.llm_chat_completion_prompt.generationConfig&&(t.generationConfig=t.llm_chat_completion_prompt.generationConfig),t.stats&&(t.stats=JSON.parse(t.stats)),t))},async getBatchGroupStatusCounts(t){t=await e(`
                SELECT
                    COUNT(id) AS total,
                    SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending,
                    SUM(CASE WHEN status = 'RUNNING' THEN 1 ELSE 0 END) AS running,
                    SUM(CASE WHEN status = 'SUCCEEDED' THEN 1 ELSE 0 END) AS succeeded,
                    SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) AS failed
                FROM
                    batch_groups
                WHERE
                    batch_job_id = ?
            `,[t]);return{total:t.total||0,pending:t.pending||0,running:t.running||0,succeeded:t.succeeded||0,failed:t.failed||0}},async insertPollingLog(t){var e=(new Date).toISOString(),t=[t.batch_job_id,t.attempt_number,t.polled_at||e,t.success?1:0,t.http_status_code||null,t.error_message||null,t.response_body||null,e],e=(await i(`
                INSERT INTO batch_job_polling_logs (
                    batch_job_id, attempt_number, polled_at, success,
                    http_status_code, error_message, response_body, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,t)).lastID;return e},async getPollingLogsByBatchJobId(t){return a("SELECT * FROM batch_job_polling_logs WHERE batch_job_id = ? ORDER BY polled_at ASC",[t])},async getBatchItemsByBatchJobIdAndGroupNumber(t,e){return a("SELECT * FROM batch_items WHERE batch_job_id = ? AND group_number = ?",[t,e])},async insertLlmAttemptLog(t){var e=(new Date).toISOString(),e=[t.batchGroupId,t.attemptNumber,t.requestedAt||e,t.durationMs||null,t.httpStatusCode||null,t.errorType||null,t.errorMessage||null,t.requestModelId||null,t.responseSummary||null],t=(await i(`
                INSERT INTO batch_group_llm_logs (
                    batch_group_id, attempt_number, requested_at, duration_ms,
                    http_status_code, error_type, error_message, request_model_id, response_summary
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,e)).lastID;return t},async incrementConsecutiveFailures(t){await i("UPDATE batch_jobs SET consecutive_failures = consecutive_failures + 1 WHERE id = ?",[t])},async resetConsecutiveFailures(t){await i("UPDATE batch_jobs SET consecutive_failures = 0 WHERE id = ?",[t])},beginTransaction:l,commitTransaction:s,rollbackTransaction:o}};
