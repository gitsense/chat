DROP TABLE IF EXISTS tmp_chats;

CREATE TABLE IF NOT EXISTS tmp_chats(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    deleted INTEGER NOT NULL CHECK(deleted IN (0, 1)),
    -- public and private - public and private for both humans and LLMs
    -- human-public and human-private - only visible to humans
    visibility TEXT NOT NULL CHECK(visibility IN ('public', 'private', 'human-public', 'human-private')),
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

INSERT INTO tmp_chats 
    SELECT * FROM chats;

ALTER TABLE chats RENAME TO old_chats;
ALTER TABLE tmp_chats RENAME TO chats;


