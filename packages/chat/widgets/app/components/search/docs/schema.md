/**
 * Component: Database Schema Specification
 * Block-UUID: 8d49a3e0-9395-4595-9c66-d6154fa049ee
 * Parent-UUID: 9a8518cd-1e54-491b-8eae-dbf19c0cfdc1
 * Version: 1.3.0
 * Description: Documents the database schema used by GitSense Chat, providing context for the search tool's capabilities and the structure of the data being searched. This schema now includes a separate FTS table for code blocks using the 'trigram' tokenizer for exact syntax matching.
 * Language: Markdown
 * Created-at: 2025-06-06T19:36:52.000Z
 * Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.0.1), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0), Gemini 2.5 Flash Thinking (v1.3.0)
 */


# GitSense Chat Database Schema

This document outlines the database schema used by GitSense Chat to store conversation data, code blocks, and related information. Understanding this schema is crucial for comprehending the types of data available for searching via the search tool and the fields that can be targeted for filtering.
This schema now includes Full-Text Search (FTS) tables to enable efficient text-based searching across key content fields, including a dedicated table for code blocks using a trigram tokenizer for exact syntax matching.
The database is implemented using SQLite.

## Schema Definition

```sql
CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('system', 'compare', 'validate')),
    hash TEXT NULL UNIQUE,
    name TEXT NOT NULL,
    prompt TEXT NOT NULL,
    meta JSON,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN (
        'fs-tree', 'fs-trees', 'fs-project', 'fs-workspace',
        'git-repos', 'git-repo-owner', 'git-repo', 'regular'
    )),
    name TEXT NOT NULL UNIQUE,
    meta JSON,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN (
        'code', 'compare', 'evaluate', 'notes', 'project', 'regular',
        'split', 'split-condensed', 'task', 'validate', 'workspace',
        'fs-project', 'fs-workspace', 'fs-file', 'fs-root', 'fs-trees', 'fs-tree',
        'git-repos', 'git-repo-owner', 'git-repo', 'git-ref', 'git-branch',
        'git-commit', 'git-tag', 'git-tree', 'git-blob'
    )),
    deleted INTEGER NOT NULL CHECK(deleted IN (0, 1)),
    visibility TEXT NOT NULL CHECK(visibility IN ('public', 'private')),
    uuid TEXT NOT NULL UNIQUE,
    owner TEXT NOT NULL,
    name TEXT NOT NULL,
    parent_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    prompt_id INTEGER NOT NULL,
    main_model TEXT NOT NULL,
    pinned INTEGER CHECK(pinned IN (NULL, 0, 1)),
    protected INTEGER CHECK(protected IN (NULL, 0, 1)),
    order_weight INTEGER,
    forked_from_msg_id INTEGER,
    meta JSON,
    is_default_name INTEGER NOT NULL CHECK(is_default_name IN (0, 1)),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    modified_at DATETIME,
    FOREIGN KEY (prompt_id) REFERENCES prompts(id)
    FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TABLE IF NOT EXISTS chat_history (
    id INTEGER NOT NULL,
    type TEXT NOT NULL,
    deleted INTEGER NOT NULL,
    visibility TEXT NOT NULL,
    uuid TEXT NOT NULL,
    owner TEXT NOT NULL,
    name TEXT NOT NULL,
    parent_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    prompt_id INTEGER NOT NULL,
    main_model TEXT NOT NULL,
    pinned INTEGER,
    protected INTEGER,
    order_weight INTEGER,
    forked_from_msg_id INTEGER,
    meta JSON,
    is_default_name INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    modified_at DATETIME
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN (
        'regular', 'blob', 'code', 'assistant', 'terminal', 'tiny-overview', 'short-overview', 'long-overview',
        'chat-meta', 'chat-history', 'git-repos', 'git-repo-owner', 'git-repo', 'git-ref',
        'git-branch', 'git-commit', 'git-tag', 'git-tree', 'git-blob'
    )),
    deleted INTEGER NOT NULL CHECK(deleted IN (0, 1)),
    visibility TEXT NOT NULL CHECK(visibility IN ('public', 'private')),
    chat_id INTEGER NOT NULL,
    parent_id INTEGER NOT NULL,
    -- need to obsolete level since messages can now be deleted
    -- and notes can be inserted above or below them
    level INTEGER NOT NULL,
    sample INTEGER,
    model TEXT,
    real_model TEXT,
    temperature DECIMAL,
    top_k DECIMAL,
    top_p DECIMAL,
    max_tokens INTEGER,
    role TEXT NOT NULL CHECK(role IN ('system', 'user', 'assistant')),
    message TEXT,
    pinned INTEGER CHECK(pinned IN (NULL, 0, 1)),
    chat_completion_stats JSON,
    meta JSON,
    -- blob_id will be used when we need to start thinking
    -- about optimizing. For now, the philosophy is disk
    -- space is cheap and time isn't.
    blob_id INTEGER,
    priority INTEGER,
    job_id INTEGER,
    job_attempts INTEGER,
    job_exception TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    modified_at DATETIME,
    FOREIGN KEY (chat_id) REFERENCES chats(id)
);

CREATE TABLE IF NOT EXISTS message_history (
    id INTEGER NOT NULL,
    type TEXT NOT NULL,
    deleted INTEGER NOT NULL,
    visibility TEXT NOT NULL,
    chat_id INTEGER NOT NULL,
    parent_id INTEGER NOT NULL,
    level INTEGER NOT NULL,
    message TEXT NOT NULL,
    chat_completion_stats JSON,
    meta JSON,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    modified_at DATETIME
);

CREATE TABLE IF NOT EXISTS analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER NOT NULL,
    type TEXT NOT NULL CHECK(type IN (
        'samples-summary', 'models-summary', 'validate', 'validate-summary'
    )),
    message_ids JSON TEXT NOT NULL,
    analysis_ids JSON TEXT NOT NULL,
    sample INTEGER NOT NULL,
    model TEXT NOT NULL,
    temperature DECIMAL NOT NULL,
    message TEXT,
    response TEXT,
    report JSON,
    job_id INTEGER,
    job_attempts INTEGER,
    job_exception TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (chat_id) REFERENCES chats(id)
);

CREATE TABLE IF NOT EXISTS code_blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    uuid TEXT NOT NULL,
    parent_uuid TEXT,
    component TEXT NOT NULL,
    size BIGINT NOT NULL,
    major INTEGER NOT NULL,
    minor INTEGER NOT NULL,
    patch INTEGER NOT NULL,
    header JSON NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    UNIQUE (message_id, uuid)
);

CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pid INTEGER,
    provider TEXT NOT NULL,
    response TEXT,
    created_at DATETIME NOT NULL,
    started_at DATETIME,
    finished_at DATETIME,
    failed_at DATETIME,
    fail_reason TEXT,
    merged_at DATETIME,
    request_sent_at DATETIME,
    request_received_at DATETIME,
    request_retry_after DATETIME,
    request_ratelimit_limit_requests INTEGER,
    request_ratelimit_limit_tokens INTEGER,
    request_ratelimit_remaining_requests INTEGER,
    request_ratelimit_remaining_tokens INTEGER,
    request_ratelimit_reset_requests DATETIME,
    request_ratelimit_reset_tokens DATETIME
);

-- Create Indexes

-- Indexes for chats table
CREATE INDEX IF NOT EXISTS idx_chats_type ON chats (type);
CREATE INDEX IF NOT EXISTS idx_chats_group_id ON chats (group_id);
CREATE INDEX IF NOT EXISTS idx_chats_type_group_id ON chats(type, group_id);

-- Indexes for messages table
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages (chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_type ON messages (type);
CREATE INDEX IF NOT EXISTS idx_messages_role ON messages (role);

-- Indexes for code_blocks table
CREATE INDEX IF NOT EXISTS idx_code_blocks_message_id ON code_blocks (message_id);
CREATE INDEX IF NOT EXISTS idx_code_blocks_uuid ON code_blocks (uuid);

-- Functional Indexes for JSON fields in messages.meta (extracted_metadata)
CREATE INDEX IF NOT EXISTS idx_messages_meta_file_path ON messages (json_extract(meta, '$.extracted_metadata.file_path'));
CREATE INDEX IF NOT EXISTS idx_messages_meta_git_repo ON messages (json_extract(meta, '$.extracted_metadata.git_repo'));

## Full-Text Search (FTS) Tables

The following virtual tables are created using SQLite's FTS5 module to provide full-text search capabilities on specific content fields. Triggers are used to keep these tables synchronized with their source tables.

-- FTS table for chat names (using default unicode61 tokenizer with stemming)
CREATE VIRTUAL TABLE IF NOT EXISTS fts_chats USING fts5(
    name,
    content='chats' -- Link this FTS table to the 'chats' table's rowid
);

-- FTS table for message content (using default unicode61 tokenizer with stemming)
CREATE VIRTUAL TABLE IF NOT EXISTS fts_messages USING fts5(
    message,
    chat_id UNINDEXED, -- Include chat_id for filtering, but don't index it for FTS
    content='messages' -- Link this FTS table to the 'messages' table's rowid
);

-- NEW: FTS table for code block content using the 'trigram' tokenizer (no stemming)
CREATE VIRTUAL TABLE IF NOT EXISTS fts_code_blocks_trigram USING fts5(
    content,
    message_id UNINDEXED, -- Include message id for joining, but don't index it for FTS
    uuid UNINDEXED, -- Include uuid for joining, but don't index it for FTS
    component UNINDEXED, -- Include component for filtering, but don't index it for FTS
    content='code_blocks', -- Link this FTS table to the 'code_blocks' table's rowid
    tokenize='trigram' -- Use the trigram tokenizer for exact matching
);


-- Triggers for fts_chats (synchronizing with chats table)

-- Insert trigger for chats
CREATE TRIGGER IF NOT EXISTS chats_ai AFTER INSERT ON chats BEGIN
  INSERT INTO fts_chats(rowid, name) VALUES (new.rowid, new.name);
END;

-- Delete trigger for chats
CREATE TRIGGER IF NOT EXISTS chats_ad AFTER DELETE ON chats BEGIN
  DELETE FROM fts_chats WHERE rowid = old.rowid;
END;

-- Update trigger for chats
CREATE TRIGGER IF NOT EXISTS chats_au AFTER UPDATE ON chats BEGIN
  UPDATE fts_chats SET name = new.name WHERE rowid = old.rowid;
END;


-- Triggers for fts_messages (synchronizing with messages table)

-- Insert trigger for messages
CREATE TRIGGER IF NOT EXISTS messages_ai AFTER INSERT ON messages BEGIN
  INSERT INTO fts_messages(rowid, message, chat_id) VALUES (new.rowid, new.message, new.chat_id);
END;

-- Delete trigger for messages
CREATE TRIGGER IF NOT EXISTS messages_ad AFTER DELETE ON messages BEGIN
  DELETE FROM fts_messages WHERE rowid = old.rowid;
END;

-- Update trigger for messages
CREATE TRIGGER IF NOT EXISTS messages_au AFTER UPDATE ON messages BEGIN
  UPDATE fts_messages SET message = new.message, chat_id = new.chat_id WHERE rowid = old.rowid;
END;


-- Triggers for code_blocks (synchronizing with code_blocks table)

-- Insert trigger for code_blocks
CREATE TRIGGER IF NOT EXISTS code_blocks_ai AFTER INSERT ON code_blocks BEGIN
  INSERT INTO fts_code_blocks_trigram(rowid, content, uuid, component) VALUES (new.rowid, new.content, new.uuid, new.component); -- Insert into trigram FTS table
END;

-- Delete trigger for code_blocks
CREATE TRIGGER IF NOT EXISTS code_blocks_ad AFTER DELETE ON code_blocks BEGIN
  DELETE FROM fts_code_blocks_trigram WHERE rowid = old.rowid; -- Delete from trigram FTS table
END;

-- Update trigger for code_blocks
CREATE TRIGGER IF NOT EXISTS code_blocks_au AFTER UPDATE ON code_blocks BEGIN
  UPDATE fts_code_blocks_trigram SET content = new.content, uuid = new.uuid, component = new.component WHERE rowid = old.rowid; -- Update trigram FTS table
END;
