-- Component: Drop FTS Tables Script
-- Block-UUID: 85e518ad-f6bc-4feb-9959-5305893c0418
-- Parent-UUID: N/A
-- Version: 1.0.0
-- Description: SQL script to drop the Full-Text Search (FTS) tables in the GitSense Chat database.
-- Language: SQL
-- Created-at: 2025-07-12T23:51:12.790Z
-- Authors: Gemini 2.5 Flash Thinking (v1.0.0)

-- Drop triggers for fts_chats
DROP TRIGGER IF EXISTS chats_ai;
DROP TRIGGER IF EXISTS chats_ad;
DROP TRIGGER IF EXISTS chats_au;

-- Drop triggers for fts_messages
DROP TRIGGER IF EXISTS messages_ai;
DROP TRIGGER IF EXISTS messages_ad;
DROP TRIGGER IF EXISTS messages_au;

-- Drop existing FTS tables if they exist
DROP TABLE IF EXISTS fts_chats;
DROP TABLE IF EXISTS fts_messages;
DROP TABLE IF EXISTS fts_code_blocks_trigram;

-- Reclaim space and optimize the database file
VACUUM FULL;
