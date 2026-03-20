/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * This software is permitted for internal use and modification.
 * Copying for profit or redistribution is strictly not permitted.
 *
 * The Fair License, which formalizes these terms, will be adopted as the official license in the future.
 * Once finalized, the unminified source code will be freely available for internal use for non-
 * commercial purposes.
 *
 * This software may not be used to develop or enhance any product or service that competes
 * directly or indirectly with GitSense Chat without explicit permission.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

let FIELD_TABLE_MAP=require("../../../constants").FIELD_TABLE_MAP;function composeChatsCTEs(c,t,a,e,s,_,r){var o="git-nav"===a.profile;let h,i;i=o?(h=c("cte_matched_chats").innerJoin("chats","cte_matched_chats.id","chats.id"),c.raw("0 as fts_rank")):s.cte_matched_chats?(h=c("cte_matched_chats").innerJoin("chats","cte_matched_chats.base_id","chats.id"),c.raw("cte_matched_chats.fts_rank as fts_rank")):(h=c("chats"),c.raw("0 as fts_rank"));o=e.targetSpecific.chats||[];let n=e.topLevel||[];s=e.consolidated||[],o.some(t=>{t="string"==typeof t?t:t.field,t=FIELD_TABLE_MAP[t];return t&&"groups"===t.table})&&(h=h.leftJoin("groups","chats.group_id","groups.id")),e=s.some(t=>"cte.cte_chat_message_stats.num_messages"===t||"cte.cte_chat_message_stats.last_updated_at"===t);e&&h.leftJoin("cte_chat_message_stats","chats.id","cte_chat_message_stats.chat_id"),null!==r&&0<r.length&&(h=h.whereIn("chats.id",r));let l=[];return o.forEach(a=>{var a="string"==typeof a?a:a.field,e=FIELD_TABLE_MAP[a];if(e&&e.outputtable&&!n.includes(a)){let t;e.source;var s=e.table;t=e.jsonPath?c.raw(`json_extract(${s}.${"chats"===e.table?"meta":(e.table,"header")}, '${e.jsonPath}')`):("cte"===e.source&&e.table,c.raw(e.table+"."+a.split(".").pop())),l.push(c.raw(`'${e.cteName}', `+t))}}),_.chats&&Object.keys(_.chats).length,(h=h.select([c.raw(`json_object(${l.map(t=>t.toString()).join(", ")}) as result_json`),i,c.raw("chats.id as result_chat_id"),c.raw("'chat' as source_type"),c.raw("ROW_NUMBER() OVER () as row_num")])).orderBy("fts_rank","asc"),a.pagination?.limit&&h.limit(a.pagination.limit),h}module.exports={composeChatsCTEs:composeChatsCTEs};
