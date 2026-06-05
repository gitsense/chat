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

function buildRecursiveChatPathCTE_RawSqlPart(a,e){return a.raw(`
        SELECT id, name, parent_id, level, path, original_chat_id
        FROM (
        WITH RECURSIVE chat_path(id, name, parent_id, level, path, original_chat_id) AS (
            -- Base case: Start with chats from the source CTE
            SELECT
                c.id,
                c.name,
                c.parent_id,
                1 AS level,
                c.name AS path,
                c.id as original_chat_id -- Keep track of the original chat ID
            FROM chats c
            JOIN ${e} ON c.id = ${e}.chat_id -- Join with the source CTE (cte_result_chat_ids)
            WHERE c.deleted = 0
            UNION ALL
            -- Recursive step: Join with the parent chat and build the path upwards
            SELECT
                p.id, -- Parent's ID
                p.name, -- Parent's name
                p.parent_id, -- Parent's parent ID
                cp.level + 1,
                p.name || ' -> ' || cp.path, -- Prepend parent's name
                cp.original_chat_id -- Pass the original chat ID down
            FROM chats p -- Use alias 'p' for parent
            JOIN chat_path cp ON p.id = cp.parent_id -- Join parent with current chat_path row
            WHERE 
                p.deleted = 0 AND 
                level <= 30 -- do not go deeper than 50 levels to stop potential recursive issues
        )
        SELECT *,
               ROW_NUMBER() OVER(PARTITION BY original_chat_id ORDER BY level DESC) as rn
        FROM chat_path
        ) WHERE rn = 1
    `)}module.exports={buildRecursiveChatPathCTE_RawSqlPart:buildRecursiveChatPathCTE_RawSqlPart};
