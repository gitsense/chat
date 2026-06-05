-- Component: FTS Tables Rebuild Script
-- Block-UUID: f5c9ff08-2b86-4aa9-bf67-b9d1cf654de5
-- Parent-UUID: N/A
-- Version: 1.0.0
-- Description: Script to rebuild the Full-Text Search (FTS) tables in the GitSense Chat database
-- Language: SQL
-- Created-at: 2025-07-09T07:20:15.445Z
-- Authors: Claude 3.7 Sonnet (v1.0.0)


-- Begin transaction to ensure atomicity
BEGIN TRANSACTION;
    -- Step 1: Drop existing FTS tables
    DROP TABLE IF EXISTS fts_chats;
    DROP TABLE IF EXISTS fts_messages;
    DROP TABLE IF EXISTS fts_code_blocks;

    -- Step 2: Recreate FTS tables with the same structure

    -- FTS table for chat names (using default unicode61 tokenizer with stemming)
    CREATE VIRTUAL TABLE fts_chats USING fts5(
        name,
        content='chats' -- Link this FTS table to the 'chats' table's rowid
    );

    -- FTS table for message content (using default unicode61 tokenizer with stemming)
    CREATE VIRTUAL TABLE fts_messages USING fts5(
        message,
        chat_id UNINDEXED, -- Include chat_id for filtering, but don't index it for FTS
        content='messages' -- Link this FTS table to the 'messages' table's rowid
    );

    -- FTS table for code block content using the 'trigram' tokenizer (no stemming)
    CREATE VIRTUAL TABLE fts_code_blocks USING fts5(
        content,
        message_id UNINDEXED, -- Include message id for joining, but don't index it for FTS
        uuid UNINDEXED, -- Include uuid for joining, but don't index it for FTS
        component UNINDEXED, -- Include component for filtering, but don't index it for FTS
        content='code_blocks', -- Link this FTS table to the 'code_blocks' table's rowid
        tokenize='trigram' -- Use the trigram tokenizer for exact matching
    );

    -- Step 3: Recreate triggers for FTS tables

    -- Triggers for fts_chats (synchronizing with chats table)
    CREATE TRIGGER IF NOT EXISTS chats_ai AFTER INSERT ON chats BEGIN
    INSERT INTO fts_chats(rowid, name) VALUES (new.rowid, new.name);
END;

CREATE TRIGGER IF NOT EXISTS chats_ad AFTER DELETE ON chats BEGIN
DELETE FROM fts_chats WHERE rowid = old.rowid;
END;

CREATE TRIGGER IF NOT EXISTS chats_au AFTER UPDATE ON chats BEGIN
UPDATE fts_chats SET name = new.name WHERE rowid = old.rowid;
END;

-- Triggers for fts_messages (synchronizing with messages table)
CREATE TRIGGER IF NOT EXISTS messages_ai AFTER INSERT ON messages BEGIN
INSERT INTO fts_messages(rowid, message, chat_id) VALUES (new.rowid, new.message, new.chat_id);
END;

CREATE TRIGGER IF NOT EXISTS messages_ad AFTER DELETE ON messages BEGIN
DELETE FROM fts_messages WHERE rowid = old.rowid;
END;

CREATE TRIGGER IF NOT EXISTS messages_au AFTER UPDATE ON messages BEGIN
UPDATE fts_messages SET message = new.message, chat_id = new.chat_id WHERE rowid = old.rowid;
END;

-- Triggers for code_blocks (synchronizing with code_blocks table)
CREATE TRIGGER IF NOT EXISTS code_blocks_ai AFTER INSERT ON code_blocks BEGIN
INSERT INTO fts_code_blocks(rowid, content, uuid, component) VALUES (new.rowid, new.content, new.uuid, new.component);
END;

CREATE TRIGGER IF NOT EXISTS code_blocks_ad AFTER DELETE ON code_blocks BEGIN
DELETE FROM fts_code_blocks WHERE rowid = old.rowid;
END;

CREATE TRIGGER IF NOT EXISTS code_blocks_au AFTER UPDATE ON code_blocks BEGIN
UPDATE fts_code_blocks SET content = new.content, uuid = new.uuid, component = new.component WHERE rowid = old.rowid;
END;

-- Step 4: Populate the FTS tables with existing data

-- Populate fts_chats from chats table (only non-deleted chats)
INSERT INTO fts_chats(rowid, name)
SELECT rowid, name FROM chats WHERE deleted = 0;

-- Populate fts_messages from messages table (only non-deleted messages)
INSERT INTO fts_messages(rowid, message, chat_id)
SELECT rowid, message, chat_id FROM messages WHERE deleted = 0 AND message IS NOT NULL;

-- Populate fts_code_blocks from code_blocks table
INSERT INTO fts_code_blocks(rowid, content, uuid, component)
SELECT rowid, content, uuid, component FROM code_blocks;

-- Step 5: Optimize the FTS tables for better performance
INSERT INTO fts_chats(fts_chats) VALUES('optimize');
INSERT INTO fts_messages(fts_messages) VALUES('optimize');
INSERT INTO fts_code_blocks(fts_code_blocks) VALUES('optimize');

-- Commit the transaction
COMMIT;

-- Verify the FTS tables have been populated correctly
SELECT COUNT(*) AS chats_count FROM fts_chats;
SELECT COUNT(*) AS messages_count FROM fts_messages;
SELECT COUNT(*) AS code_blocks_count FROM fts_code_blocks;
