-- Component: Batch Component Database Schema
-- Block-UUID: 9d40fc94-fa21-47f0-a5d2-d39d98a3ec21
-- Parent-UUID: 323fdeff-f827-4f4a-b567-c9b1b224abb0
-- Version: 1.7.0
-- Description: Schema for the standalone SQLite database to manage LLM batch analysis jobs, including detailed polling logs and LLM attempt tracking.
-- Language: SQL
-- Created-at: 2026-02-16T18:55:31.958Z
-- Authors: Gemini 2.5 Flash (v1.0.0), Gemini 2.5 Flash (v1.1.0), Gemini 2.5 Flash (v1.2.0), Gemini 2.5 Flash (v1.3.0), Gemini 2.5 Flash (v1.4.0), Gemini 2.5 Flash (v1.5.0), GLM-4.7 (v1.6.0), Gemini 3 Flash (v1.7.0)


-- Table to store overall batch job information
CREATE TABLE IF NOT EXISTS batch_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    input_hash TEXT NULL, -- A hash of the input parameters to prevent duplicate ACTIVE job submissions
    display_name TEXT NOT NULL, -- User-friendly name for the batch (e.g., "Analyze My Repo")
    type TEXT NOT NULL DEFAULT 'analyze-scheduled', -- The type of batch job (e.g., 'analyze-scheduled', 'analyze-realtime', 'refactor')
    status TEXT NOT NULL CHECK(status IN ('EXTERNAL_CREATION_PENDING', 'PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED')),
    llm_model_id TEXT NOT NULL, -- The specific LLM model ID used (e.g., "gemini-2.5-flash")
    llm_model_name TEXT NOT NULL, -- The specific LLM model name used (e.g., "Gemini 2.5 Flash")
    llm_provider_name TEXT NOT NULL, -- The LLM provider (e.g., "Google", "Anthropic", "InternalRealtime")
    llm_provider_job_id TEXT NULL UNIQUE, -- The external job ID from the LLM provider (e.g., "batches/123456789")
    llm_provider_request_payload JSON TEXT NULL, -- The full JSON payload sent to the LLM provider for scheduled batches
    llm_provider_response_initial JSON TEXT NULL, -- The initial response from the LLM provider upon job creation
    llm_provider_output_file_uri TEXT NULL, -- URI for the results file, if results are delivered via file (e.g., for Gemini)
    error_details TEXT NULL, -- Detailed error message if the batch job ultimately fails (not for every poll issue)
    trigger_chat_id INTEGER NOT NULL, -- The chat_id from data/chats.sqlite3 that initiated this batch
    trigger_chat_uuid TEXT NOT NULL, -- The chat_uuid from data/chats.sqlite3 that initiated this batch
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    started_at DATETIME NULL, -- Timestamp when the job started processing by the LLM provider
    finished_at DATETIME NULL, -- Timestamp when the job completed (succeeded, failed, cancelled, expired)
    last_polled_at DATETIME NULL, -- Last time the worker checked the status with the LLM provider
    next_poll_at DATETIME NULL, -- Next scheduled time for the worker to poll
    poll_attempts INTEGER NOT NULL DEFAULT 0,
    consecutive_failures INTEGER NOT NULL DEFAULT 0, -- Tracks consecutive group failures for circuit breaker logic
    processing_pid INTEGER NULL, -- PID of the worker process currently handling this job
    rate_limit_requests_limit INTEGER NULL,
    rate_limit_requests_remaining INTEGER NULL,
    rate_limit_requests_reset DATETIME NULL,
    rate_limit_tokens_limit INTEGER NULL,
    rate_limit_tokens_remaining INTEGER NULL,
    rate_limit_tokens_reset DATETIME NULL
);

-- Table to store logical groups of items within a batch job
CREATE TABLE IF NOT EXISTS batch_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_job_id INTEGER NOT NULL, -- Foreign key to batch_jobs.id
    group_number INTEGER NOT NULL, -- The original group ID from the input (e.g., 1, 2, 3)
    llm_request_key TEXT NOT NULL UNIQUE, -- A unique key for this group's LLM request (e.g., "chat-25-group-1")
    status TEXT NOT NULL CHECK(status IN ('EXTERNAL_CREATION_PENDING', 'PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED')) DEFAULT 'PENDING',
    analyze_chat_uuid TEXT NULL, -- The UUID of the chat containing the group analysis (prompt and respsonse)
    -- The actual LLM provider (e.g., "Google", "Anthropic"). For realtime batches, we assign the internal
    -- realtime provider name for all jobs, and define the actual LLM provider here.
    llm_provider_name TEXT NULL,
    llm_chat_completion_prompt JSON TEXT NULL, -- The full prompt sent to the LLM for this group.
    llm_chat_completion_response JSON TEXT NULL, -- The raw ? .stringify(llmRawResponse) : null,response received from the LLM.
    processing_pid INTEGER NULL, -- PID of the worker process currently handling this specific group
    llm_api_attempts INTEGER NOT NULL DEFAULT 0, -- Number of attempts (including retries) made for the LLM API call for this group
    stats JSON TEXT NULL, -- Flexible JSON field for storing group-level statistics
    error_details TEXT NULL, -- Error details if this group's processing failed
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    started_at DATETIME NULL, -- Timestamp when this group started processing by a worker
    finished_at DATETIME NULL, -- Timestamp when this group completed (succeeded, failed, cancelled)
    FOREIGN KEY (batch_job_id) REFERENCES batch_jobs(id) ON DELETE CASCADE,
    UNIQUE (batch_job_id, group_number), -- Ensure unique groups per job
    UNIQUE (batch_job_id, llm_request_key) -- Ensure unique request keys per job
);

-- Table to store individual items (files/chat_ids) within a batch job
CREATE TABLE IF NOT EXISTS batch_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_job_id INTEGER NOT NULL, -- Foreign key to batch_jobs.id
    group_number INTEGER NOT NULL, -- The group number as defined by the frontend's AnalyzeGroupsBuilder
    original_chat_id INTEGER NOT NULL, -- The chat_id of the file from data/chats.sqlite3
    llm_request_key TEXT NOT NULL, -- A unique key for this item within the LLM batch request (e.g., "chat-25-request-1")
    status TEXT NOT NULL CHECK(status IN ('EXTERNAL_CREATION_PENDING', 'PENDING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED')) DEFAULT 'PENDING',
    error_details TEXT NULL, -- Specific error for this item if its analysis failed
    result_message_id INTEGER NULL, -- Reference to the messages.id in data/chats.sqlite3 where the analysis result is stored
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (batch_job_id) REFERENCES batch_jobs(id) ON DELETE CASCADE
);

-- Table to log individual polling attempts and their outcomes for batch jobs
CREATE TABLE IF NOT EXISTS batch_job_polling_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_job_id INTEGER NOT NULL, -- Foreign key to batch_jobs.id
    attempt_number INTEGER NOT NULL, -- Corresponds to poll_attempts in batch_jobs
    polled_at DATETIME NOT NULL,
    success INTEGER NOT NULL CHECK(success IN (0, 1)), -- 1 if poll was successful, 0 if it failed
    http_status_code INTEGER NULL, -- HTTP status code from the LLM provider's response
    error_message TEXT NULL, -- Specific error message from the LLM provider or network
    response_body TEXT NULL, -- Raw response body if an error occurred (for debugging)
    created_at DATETIME NOT NULL, -- Timestamp for when this log entry was created
    FOREIGN KEY (batch_job_id) REFERENCES batch_jobs(id) ON DELETE CASCADE
);

-- Table to log individual LLM API attempts for real-time batch groups
CREATE TABLE IF NOT EXISTS batch_group_llm_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_group_id INTEGER NOT NULL, -- Foreign key to batch_groups.id
    attempt_number INTEGER NOT NULL, -- 1, 2, 3... (corresponds to llm_api_attempts)
    requested_at DATETIME NOT NULL, -- When the request was sent
    duration_ms INTEGER NULL, -- How long the request took
    http_status_code INTEGER NULL, -- The HTTP status code returned (e.g., 200, 429, 500)
    error_type TEXT NULL, -- Categorized error: 'HTTP_ERROR', 'TIMEOUT', 'NETWORK_ERROR', 'PARSING_ERROR'
    error_message TEXT NULL, -- The raw error message from the SDK or exception
    request_model_id TEXT NULL, -- The model ID used for this specific attempt
    response_summary TEXT NULL, -- A truncated summary of the response body for debugging
    FOREIGN KEY (batch_group_id) REFERENCES batch_groups(id) ON DELETE CASCADE
);

-- Table to track the health and heartbeats of worker processes
CREATE TABLE IF NOT EXISTS worker_heartbeats (
    worker_name TEXT PRIMARY KEY,
    pid INTEGER NOT NULL,
    status TEXT NOT NULL,
    state JSON TEXT NULL, -- Stores the last N activities as a JSON array
    last_heartbeat DATETIME NOT NULL,
    started_at DATETIME NOT NULL
);


-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_batch_jobs_status ON batch_jobs (status);
CREATE INDEX IF NOT EXISTS idx_batch_jobs_trigger_chat_id ON batch_jobs (trigger_chat_id);
CREATE INDEX IF NOT EXISTS idx_batch_groups_batch_job_id ON batch_groups (batch_job_id);
CREATE INDEX IF NOT EXISTS idx_batch_items_batch_job_id ON batch_items (batch_job_id);
CREATE INDEX IF NOT EXISTS idx_batch_items_original_chat_id ON batch_items (original_chat_id);
CREATE INDEX IF NOT EXISTS idx_batch_job_polling_logs_batch_job_id ON batch_job_polling_logs (batch_job_id);
CREATE INDEX IF NOT EXISTS idx_batch_group_llm_logs_group_id ON batch_group_llm_logs (batch_group_id);
