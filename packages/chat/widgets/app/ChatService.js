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

let{connect,getAsync,runAsync}=require("./sqlite.js"),getDBPath=require("./db").getDBPath;class ChatService{constructor(t=null){this.dbPath=t||getDBPath()}_getDB(){return connect(this.dbPath)}_parseMeta(t){if(!t)return null;if("object"==typeof t)return t;try{return JSON.parse(t)}catch(t){return console.error("[ChatService] Failed to parse meta JSON:",t),null}}_stringifyMeta(t){return t?JSON.stringify(t):null}async getByUUID(e){var t=this._getDB();try{var r=await getAsync(t,"SELECT * FROM chats WHERE uuid = ? AND deleted = 0",[e]);return r?(r.meta=this._parseMeta(r.meta),r):null}catch(t){throw console.error(`[ChatService] Error fetching chat ${e}:`,t),t}}async getById(e){var t=this._getDB();try{var r=await getAsync(t,"SELECT * FROM chats WHERE id = ? AND deleted = 0",[e]);return r?(r.meta=this._parseMeta(r.meta),r):null}catch(t){throw console.error(`[ChatService] Error fetching chat ${e}:`,t),t}}async create({type:t,uuid:e,owner:r,name:a,parent_id:i,group_id:n,prompt_id:s,main_model:c,meta:h=null,visibility:o="public"}){var u=this._getDB(),l=(new Date).toISOString(),h=this._stringifyMeta(h);try{return(await runAsync(u,`
            INSERT INTO chats (
                type, deleted, visibility, uuid, owner, name, 
                parent_id, group_id, prompt_id, main_model, 
                is_default_name, meta, created_at, updated_at
            ) VALUES (?, 0, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
        `,[t,o,e,r,a,i,n,s,c,h,l,l])).lastInsertRowid}catch(t){throw console.error("[ChatService] Error creating chat:",t),t}}async update(e,r){var t=this._getDB(),a=(new Date).toISOString(),i=Object.keys(r).filter(t=>void 0!==r[t]);if(0===i.length)return 0;let n=[],s=[];i.forEach(t=>{"meta"===t?(s.push("meta = ?"),n.push(this._stringifyMeta(r[t]))):(s.push(t+" = ?"),n.push(r[t]))}),s.push("updated_at = ?"),n.push(a),n.push(e);i=`UPDATE chats SET ${s.join(", ")} WHERE id = ?`;try{return(await runAsync(t,i,n)).changes}catch(t){throw console.error(`[ChatService] Error updating chat ${e}:`,t),t}}}module.exports=ChatService;
