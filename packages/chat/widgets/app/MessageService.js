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

let crypto=require("crypto"),{connect,getAsync,runAsync,allAsync,serializeAsync}=require("./sqlite.js"),getDBPath=require("./db").getDBPath;class MessageService{constructor(e=null){this.dbPath=e||getDBPath()}_getDB(){return connect(this.dbPath)}_parseMeta(e){if(!e)return null;if("object"==typeof e)return e;try{return JSON.parse(e)}catch(e){return console.error("[MessageService] Failed to parse meta JSON:",e),null}}_stringifyMeta(e){return e?JSON.stringify(e):null}async create({chat_id:e,role:t,message:a,parent_id:r,meta:s=null,type:i="regular",visibility:n="public",model:c=null}){var o=this._getDB(),h=(new Date).toISOString(),s=this._stringifyMeta(s),d=crypto.createHash("sha256").update(a+h).digest("hex");return(await runAsync(o,`
            INSERT INTO messages (
                deleted, chat_id, role, message, parent_id, level, hash, temperature,
                meta, type, visibility, model, created_at, updated_at
            ) VALUES (
                ?, -- deleted
                ?, -- chat_id
                ?, -- role
                ?, -- message
                ?, -- parent_id
                ?, -- level
                ?, -- hash
                ?, -- temperature
                ?, -- meta
                ?, -- type
                ?, -- visibility
                ?, -- model
                ?, -- created_at
                ? -- updated_at
            )
        `,[0,e,t,a,r,1,d,0,s,i,n,c,h,h])).lastInsertRowid}async getById(t){var e=this._getDB();try{var a=await getAsync(e,"SELECT * FROM messages WHERE id = ?",[t]);return a?(a.meta=this._parseMeta(a.meta),a):null}catch(e){throw console.error(`[MessageService] Error fetching message ${t}:`,e),e}}async getByChatId(t){var e=this._getDB();try{return(await allAsync(e,"SELECT * FROM messages WHERE chat_id = ? ORDER BY level ASC",[t])).map(e=>({...e,meta:this._parseMeta(e.meta)}))}catch(e){throw console.error(`[MessageService] Error fetching messages for chat ${t}:`,e),e}}async update(t,a){var e=this._getDB(),r=(new Date).toISOString(),s=Object.keys(a).filter(e=>void 0!==a[e]);if(0===s.length)return 0;let i=[],n=[];s.forEach(e=>{var t;"meta"===e?(n.push("meta = ?"),i.push(this._stringifyMeta(a[e]))):(t="content"===e?"message":e,n.push(t+" = ?"),i.push(a[e]))}),n.push("updated_at = ?"),i.push(r),i.push(t);s=`UPDATE messages SET ${n.join(", ")} WHERE id = ?`;try{return(await runAsync(e,s,i)).changes}catch(e){throw console.error(`[MessageService] Error updating message ${t}:`,e),e}}async updateMeta(e,t,a=!0){var r=await this.getById(e);if(!r)throw new Error(`Message with ID ${e} not found.`);let s;return s=a?{...r.meta||{},...t}:t,this.update(e,{meta:s})}async updateContent(e,t){return this.update(e,{message:t})}async getGitBlobContents(e){if(!Array.isArray(e)||0===e.length)return[];var t=this._getDB(),a=`
            SELECT m.chat_id as id, m.message as content
            FROM chats AS c, messages AS m
            WHERE c.id = m.chat_id
              AND m.type = 'git-blob'
              AND c.id IN (${e.map(()=>"?").join(", ")})
        `;try{return await allAsync(t,a,e)}catch(e){throw console.error("[MessageService] Error fetching git blob contents:",e),e}}async transaction(e){let t=this._getDB();try{await serializeAsync(t,()=>e(t))}catch(e){throw console.error("[MessageService] Transaction failed:",e),e}}async getGroupByPath(e){var t=this._getDB();try{var a=await getAsync(t,`
            SELECT id, name, json_extract(meta, '$.path') as path 
            FROM groups 
            WHERE 
              json_extract(meta, '$.path') = ? 
              AND deleted = 0
        `,[e]);return a?{id:a.id,name:a.name,path:a.path}:null}catch(e){throw console.error("[MessageService] Error fetching group by path:",e),e}}async getRefChatId(e,t){var a=this._getDB();try{var r=await getAsync(a,`
            SELECT id 
            FROM chats 
            WHERE group_id = ? 
              AND type = 'git-ref' 
              AND name = ? 
              AND deleted = 0 
            LIMIT 1
        `,[e,t]);return r?r.id:null}catch(e){throw console.error("[MessageService] Error fetching ref chat ID:",e),e}}async getBlobChatId(e,t,a){var r=this._getDB();try{var s=await getAsync(r,`
            SELECT id 
            FROM chats 
            WHERE group_id = ? 
              AND type = 'git-blob' 
              AND json_extract(meta, '$.path') = ? 
              AND json_extract(meta, '$.refContext.refChatId') = ? 
              AND deleted = 0 
            ORDER BY updated_at DESC 
            LIMIT 1
        `,[e,a,t]);return s?s.id:null}catch(e){throw console.error("[MessageService] Error fetching blob chat ID:",e),e}}async getLatestMessage(t){var e=this._getDB();try{var a=await getAsync(e,`
            WITH RECURSIVE matched_messages AS (
                -- Anchor Member: Start with root messages (parent_id = 0)
                SELECT
                    0 AS position,
                    id,
                    parent_id,
                    created_at
                FROM
                    messages
                WHERE
                    deleted = 0 AND
                    chat_id = ? AND
                    parent_id = 0

                UNION

                -- Recursive Member: Traverse down the tree, incrementing position
                SELECT
                    position + 1,
                    m.id,
                    m.parent_id,
                    m.created_at
                FROM
                    messages m
                INNER JOIN matched_messages mm ON m.parent_id = mm.id
                WHERE
                    m.chat_id = ? AND
                    m.deleted = 0
            )
            -- Final Selection: Get the message with the highest position
            -- (and highest ID as a tie-breaker for parallel branches)
            SELECT id, parent_id, created_at
            FROM matched_messages
            ORDER BY position DESC, id DESC
            LIMIT 1
        `,[t,t]);return a?{id:a.id,parent_id:a.parent_id,created_at:a.created_at}:null}catch(e){throw console.error(`[MessageService] Error fetching latest message for chat ${t}:`,e),e}}}module.exports=MessageService;
