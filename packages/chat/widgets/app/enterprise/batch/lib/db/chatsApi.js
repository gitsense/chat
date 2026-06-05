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

let crypto=require("crypto"),LLMUtils=require("@gitsense/gsc-utils").LLMUtils,fs=require("fs").promises,path=require("path");module.exports=e=>{let{run:w,get:m,all:D,beginTransaction:t,commitTransaction:f,rollbackTransaction:S,inTransaction:C}=e,h=null;return{async getBlobContentByChatIds(e){if(!e||0===e.length)return new Map;var t=`SELECT chat_id, message FROM messages WHERE type='git-blob' AND deleted = 0 AND chat_id IN (${e.map(()=>"?").join(", ")})`,t=await D(t,e);let a=new Map;return t.forEach(e=>a.set(e.chat_id,e.message)),a},async getBlobDetailsByChatIds(e){if(!e||0===e.length)return console.log("[DEBUG getBlobDetailsByChatIds] Called with empty chatIds array."),new Map;var t=`
                SELECT
                    m.chat_id,
                    m.message,
                    c.meta,
                    c.name AS file_name,
                    g.name AS repo_full_name
                FROM
                    groups AS g,
                    chats AS c,
                    messages AS m
                WHERE
                    m.chat_id IN (${e.map(()=>"?").join(", ")}) AND
                    m.chat_id = c.id AND
                    c.group_id = g.id AND
                    m.type='git-blob' AND
                    m.deleted = 0
            `,a=await D(t,e);let s=new Map;return a.forEach(e=>{s.set(e.chat_id,{chatId:e.chat_id,fileName:e.file_name,message:e.message,meta:e.meta?JSON.parse(e.meta):{},repo:{fullName:e.repo_full_name}})}),console.log("[DEBUG getBlobDetailsByChatIds] DB Path: "+h),console.log("[DEBUG getBlobDetailsByChatIds] Requested Chat IDs: "+e.join(", ")),console.log("[DEBUG getBlobDetailsByChatIds] Found Rows: "+a.length),a.length<e.length&&(a=e.filter(e=>!s.has(e)),console.error("[DEBUG getBlobDetailsByChatIds] Missing Chat IDs: "+a.join(", ")),console.log("[DEBUG getBlobDetailsByChatIds] SQL: "+t.replace(/\n/g," "))),s},async upsertAnalysisMessages(e){if(!e||0===e.length)return console.warn("upsertAnalysisMessages called but no analysis messages defined"),[];var a=[],s=!C();s&&await t();try{var i,r=e.map(e=>({chatId:e.chat_id,type:e.type})),l=Array.from(new Set(r.map(e=>e.chatId+"/"+e.type))).map(e=>{var[e,t]=e.split("/");return{chatId:parseInt(e,10),type:t}}),n=l.map(()=>"(?, ?)").join(", "),d=l.flatMap(e=>[e.chatId,e.type]),c=`SELECT id, chat_id, type FROM messages WHERE (chat_id, type) IN (${n}) AND deleted = 0`,o=await D(c,d);let t=new Map;o.forEach(e=>{t.set(e.chat_id+"/"+e.type,e.id)});for(i of e){var m,h,p,g,u=(new Date).toISOString(),y=i.chat_id+"/"+i.type,_=t.get(y);let e;e=_?(m=[i.visibility||"public",i.level,i.model,i.real_model,i.temperature,i.role||"assistant",i.message,JSON.stringify(i.meta),u,_],await w(`
                            UPDATE messages SET
                                deleted = 0,
                                visibility = ?,
                                level = ?,
                                model = ?,
                                real_model = ?,
                                temperature = ?,
                                role = ?,
                                message = ?,
                                meta = ?,
                                updated_at = ?
                            WHERE id = ?
                        `,m),_):(h=crypto.createHash("sha256").update(i.message+u).digest("hex"),p=[i.type,i.visibility||"public",i.chat_id,i.new_msg_parent_id,i.level,i.model,i.real_model,i.temperature,i.role||"assistant",i.message,JSON.stringify(i.meta),h,u,u],g=(await w(`
                            INSERT INTO messages (
                                type, deleted, visibility, chat_id, parent_id, level,
                                model, real_model, temperature, role, message, meta,
                                hash, created_at, updated_at
                            ) VALUES (
                                ?, 0, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?,
                                ?, ?, ?
                            )
                        `,p)).lastID,g);var E=await this.getChatById(i.chat_id),I=E.meta||{};E.meta.tokens||(I.tokens={}),E.meta.tokens.analysis||(I.tokens.analysis={}),I.tokens.analysis[i.type]={estimate:LLMUtils.estimateTokens(i.message),estimatedAt:(new Date).toISOString()};await w("UPDATE chats SET meta=? WHERE id=?",[JSON.stringify(I),i.chat_id]),a.push(e)}s&&await f()}catch(e){throw s&&await S(),e}return a},async getLatestMessageInfoForChatIds(e){if(!e||0===e.length)return new Map;var t=`
                SELECT
                    m.chat_id,
                    m.id AS parent_id,
                    m.level AS parent_level
                FROM
                    messages m
                WHERE
                    m.deleted = 0 AND m.chat_id IN (${e.map(()=>"?").join(", ")})
                GROUP BY
                    m.chat_id
                HAVING
                    m.id = MAX(m.id)
            `,t=await D(t,e);let a=new Map;return t.forEach(e=>a.set(e.chat_id,{parent_id:e.parent_id,parent_level:e.parent_level})),a},async getChatById(e){if("number"!=typeof e||e<=0)return null;console.log("[chatsApi.getChatById] Attempting to fetch chat with ID: "+e);var t=await m("SELECT id, type, uuid, name, meta FROM chats WHERE id = ? AND deleted = 0",[e]);return t?console.log(`[chatsApi.getChatById] Successfully fetched chat: ${t.name} (UUID: ${t.uuid})`):console.warn(`[chatsApi.getChatById] Chat with ID ${e} NOT FOUND in the connected database.`),t&&t.meta&&(t.meta=JSON.parse(t.meta)),t},async diagnoseChatAccess(e){var t={timestamp:(new Date).toISOString(),chatId:e,checks:{}};try{t.checks.currentConnection={inTransaction:C(),dbPath:h||"unknown"};var a=await this.getChatById(e),s=(t.checks.currentConnection.chatFound=!!a,a&&(t.checks.currentConnection.chatDetails={id:a.id,uuid:a.uuid,name:a.name,type:a.type}),await m(`
                    SELECT 
                        COUNT(*) as total_chats,
                        COUNT(CASE WHEN deleted = 0 THEN 1 END) as active_chats,
                        MIN(id) as min_id,
                        MAX(id) as max_id,
                        (SELECT COUNT(*) FROM messages WHERE deleted = 0) as total_messages
                    FROM chats
                `,[])),i=(t.checks.databaseStats=s,await m("SELECT id, deleted, name FROM chats WHERE id = ?",[e])),r=(t.checks.chatExistsInDb={found:!!i,deleted:i?i.deleted:null,name:i?i.name:null},await D(`
                    SELECT id, name, deleted, created_at 
                    FROM chats 
                    WHERE id >= ? - 10 AND id <= ? + 10
                    ORDER BY id
                `,[e,e]));if(t.checks.recentChats=r,h)try{var l=await fs.stat(h),n=(t.checks.fileMetadata={size:l.size,modified:l.mtime.toISOString(),created:l.birthtime.toISOString()},h+"-wal"),d=h+"-shm",[c,o]=await Promise.all([fs.access(n).then(()=>!0).catch(()=>!1),fs.access(d).then(()=>!0).catch(()=>!1)]);t.checks.walFiles={walExists:c,shmExists:o}}catch(e){t.checks.fileMetadata={error:"Failed to get file metadata: "+e.message}}}catch(e){t.error="Diagnostic failed: "+e.message,t.stack=e.stack}return t},setDbPath:function(e){h=e,console.log("[DEBUG chatsApi.setDbPath] Database path set: "+h)},async createEphemeralAnalyzeChat(a,s,i){if(!a||a.length<2)throw new Error("contents must have at least 2 messages (system + one more).");var r=(new Date).toISOString(),l=crypto.randomUUID(),n=a.slice(0,-1).filter(e=>{e=e.parts[0].text;return e&&""!==e.trim()}),a=a[a.length-1].parts[0].text;await t();try{var d,c=(await w(`INSERT INTO chats (
                        type, deleted, visibility, uuid, owner, name, parent_id,
                        group_id, prompt_id, main_model, protected, is_default_name,
                        created_at, updated_at
                    ) VALUES (
                        'analyze',-- type
                        0,        -- deleted
                        'public', -- visibility
                        ?,        -- uuid
                        'system', -- owner
                        ?,        -- name
                        0,        -- parent_id
                        0,        -- group_id
                        0,        -- prompt_id
                        ?,        -- main_model
                        0,        -- protected
                        0,        -- is_default_name
                        ?,        -- created_At
                        ?         -- updated_at
                    )`,[l,`Ephemeral Batch Chat [Job ID: ${i}]`,s,r,r])).lastID;let e=0,t=1;for(d of n){var o=d.parts[0].text,m=crypto.createHash("sha256").update(o+r+t).digest("hex"),h=(await w(`INSERT INTO messages (
                            type, deleted, visibility, chat_id, parent_id, level,
                            model, real_model, temperature, role, message,
                            hash, created_at, updated_at
                        ) VALUES (
                            'regular', -- type
                            0,         -- deleted
                            'public',  -- visibility
                            ?,         -- chat_id
                            ?,         -- parent_id
                            ?,         -- level
                            ?,         -- model
                            NULL,      -- real_model
                            0,         -- temperature
                            ?,         -- role
                            ?,         -- message
                            ?,         -- hash
                            ?,         -- created_at
                            ?          -- updated_at
                        )`,[c,e,t,s,d.role,o,m,r,r])).lastID;e=h,t++}return await f(),{chatId:c,chatUuid:l,lastMessageId:e,startMessage:a}}catch(e){throw await S(),e}},beginTransaction:t,commitTransaction:f,rollbackTransaction:S}};
