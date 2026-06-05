-- Step 1: Drop existing triggers for fts_code_blocks_trigram
DROP TRIGGER IF EXISTS code_blocks_ai;
DROP TRIGGER IF EXISTS code_blocks_ad;
DROP TRIGGER IF EXISTS code_blocks_au;

-- Step 2: Drop the existing FTS table
DROP TABLE IF EXISTS fts_code_blocks_trigram;

-- Step 3: Recreate the FTS table with the trigram tokenizer
CREATE VIRTUAL TABLE fts_code_blocks_trigram USING fts5(
    content,
    message_id UNINDEXED,
    uuid UNINDEXED,
    component UNINDEXED,
    content='code_blocks',
    tokenize='trigram'
);

-- Step 4: Recreate the triggers to keep the FTS table in sync
-- Insert trigger for code_blocks
CREATE TRIGGER code_blocks_ai AFTER INSERT ON code_blocks BEGIN
  INSERT INTO fts_code_blocks_trigram(rowid, content, uuid, component) VALUES (new.rowid, new.content, new.uuid, new.component);
END;

-- Delete trigger for code_blocks
CREATE TRIGGER code_blocks_ad AFTER DELETE ON code_blocks BEGIN
  DELETE FROM fts_code_blocks_trigram WHERE rowid = old.rowid;
END;

-- Update trigger for code_blocks
CREATE TRIGGER code_blocks_au AFTER UPDATE ON code_blocks BEGIN
  UPDATE fts_code_blocks_trigram SET content = new.content, uuid = new.uuid, component = new.component WHERE rowid = old.rowid;
END;

-- Step 5: Repopulate the FTS table with existing data from code_blocks
-- This is the crucial step to rebuild the index from scratch
INSERT INTO fts_code_blocks_trigram(rowid, content, uuid, component)
SELECT rowid, content, uuid, component FROM code_blocks;
