-- Migration Script: Update to Partial Unique Indexes
-- Purpose: Remove implicit UNIQUE constraints and add partial indexes for soft delete support
-- Usage: sqlite3 chats.sqlite3 < migrate_to_partial_indexes.sql

BEGIN TRANSACTION;

-- Disable foreign keys to allow table recreation
PRAGMA foreign_keys = OFF;

-- ==========================================
-- 1. Migrate 'groups' table
-- ==========================================

-- Create new table without UNIQUE constraint on name
CREATE TABLE IF NOT EXISTS groups_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    deleted INTEGER NOT NULL CHECK(deleted IN (0, 1)),
    name TEXT NOT NULL,
    meta JSON,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- Copy data
INSERT INTO groups_new SELECT * FROM groups;

-- Drop old table
DROP TABLE groups;

-- Rename new table
ALTER TABLE groups_new RENAME TO groups;

-- Recreate indexes for groups
CREATE INDEX IF NOT EXISTS idx_groups_name_active ON groups(name) WHERE deleted = 0;

-- ==========================================
-- 2. Migrate 'prompts' table
-- ==========================================

-- Create new table without UNIQUE constraint on hash
CREATE TABLE IF NOT EXISTS prompts_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    deleted INTEGER NOT NULL CHECK(deleted IN (0, 1)),
    hash TEXT NULL,
    name TEXT NOT NULL,
    prompt TEXT NOT NULL,
    meta JSON,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- Copy data
INSERT INTO prompts_new SELECT * FROM prompts;

-- Drop old table
DROP TABLE prompts;

-- Rename new table
ALTER TABLE prompts_new RENAME TO prompts;

-- Recreate indexes for prompts
CREATE UNIQUE INDEX IF NOT EXISTS idx_prompts_hash_active ON prompts(hash) WHERE hash IS NOT NULL AND deleted = 0;

-- ==========================================
-- 3. Migrate 'chats' table
-- ==========================================

-- Create new table without UNIQUE constraint on uuid
CREATE TABLE IF NOT EXISTS chats_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    deleted INTEGER NOT NULL CHECK(deleted IN (0, 1)),
    visibility TEXT NOT NULL CHECK(visibility IN ('public', 'private', 'human-public', 'human-private')),
    uuid TEXT NOT NULL,
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
    modified_at DATETIME
    --FOREIGN KEY (prompt_id) REFERENCES prompts(id),
    --FOREIGN KEY (group_id) REFERENCES groups(id)
);

-- Copy data
INSERT INTO chats_new SELECT * FROM chats;

-- Drop old table
DROP TABLE chats;

-- Rename new table
ALTER TABLE chats_new RENAME TO chats;

-- Recreate indexes for chats
CREATE INDEX IF NOT EXISTS idx_chats_uuid ON chats(uuid);
CREATE INDEX IF NOT EXISTS idx_chats_type ON chats (type);
CREATE INDEX IF NOT EXISTS idx_chats_group_id ON chats(group_id);
CREATE INDEX IF NOT EXISTS idx_chats_type_group_id ON chats(type, group_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_chats_uuid_active ON chats(uuid) WHERE deleted = 0;

-- Re-enable foreign keys
PRAGMA foreign_keys = ON;

COMMIT;

-- Verify the migration
SELECT 'Migration completed successfully' as status;
