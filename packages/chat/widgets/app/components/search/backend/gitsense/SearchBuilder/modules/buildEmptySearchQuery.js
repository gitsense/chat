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

let format=require("sql-formatter").format,buildChatMessageStatsCTE=require("./cteBuilders/buildChatMessageStatsCTE").buildChatMessageStatsCTE,buildRecursiveChatPathCTE_RawSqlPart=require("./cteBuilders/buildRecursiveChatPathCTE_RawSqlPart").buildRecursiveChatPathCTE_RawSqlPart,resolveDescendantChatIds=require("./scopeResolvers/resolveDescendantChatIds").resolveDescendantChatIds,resolveConnectedChatIds=require("./scopeResolvers/resolveConnectedChatIds").resolveConnectedChatIds,logSqlQuery=require("../../utils/sqlDebugUtils").logSqlQuery,routeFilters=require("./buildStandardSearchQuery/filterRouter").routeFilters,applyTableFilters=require("./buildStandardSearchQuery/tableMatcherUtils").applyTableFilters,castJsonExtract=require("../../utils/sqlCastingUtils").castJsonExtract,FIELD_TABLE_MAP=require("../constants").FIELD_TABLE_MAP;async function buildEmptySearchQuery(o,s,e=null,t,l,r){var c=routeFilters(s),a=s.targets||[],i=s.pagination?.limit||10,n=s.pagination?.offset||0,h=s.sortBy||{};let d=null,u=("current-chat"===s.scope&&null!==e?d=[e]:"current-chat-and-branches"===s.scope&&null!==e?d=await resolveDescendantChatIds(o,e):"connected-chats"===s.scope&&null!==e&&(d=await resolveConnectedChatIds(o,e)),null);null!==s.chatIds&&0<s.chatIds.length?u=null!==d?d.filter(e=>s.chatIds.includes(e)):s.chatIds:null!==d&&(u=d);var e=(e,c)=>{let i=[];return e.forEach(s=>{var t="string"==typeof s?s:s.field,l=FIELD_TABLE_MAP[t];if(l){var a,r=t.replace(/\./g,"_");let e;e="cte"===l.source?(a=t.split(".").pop(),l.table+"."+a):l.jsonPath?(a="code_blocks"===l.table?"header":"meta",l.sqlType?castJsonExtract(o,l.table,a,l.jsonPath,l.sqlType).toString():`json_extract(${l.table}.${a}, '${l.jsonPath}')`):"object"==typeof s&&s.snippet?(a=s.snippet.maxLength||200,`substr(${l.table}.${t.split(".").pop()}, 1, ${a})`):l.table+"."+t.split(".").pop(),i.push(`'${r}'`),i.push(e)}else console.warn(`buildEmptySearchQuery: Unknown field "${t}" in ${c} outputs. Skipping.`)}),i.join(",\n                    ")},_=!(!c.chats||!(0<Object.keys(c.chats.filters).length||0<Object.keys(c.chats.nullFilters).length||0<Object.keys(c.chats.notNullFilters).length)),p=!(!c.messages||!(0<Object.keys(c.messages.filters).length||0<Object.keys(c.messages.nullFilters).length||0<Object.keys(c.messages.notNullFilters).length)),b=!(!c.code_blocks||!(0<Object.keys(c.code_blocks.filters).length||0<Object.keys(c.code_blocks.nullFilters).length||0<Object.keys(c.code_blocks.notNullFilters).length)),g=[];if(a.includes("chats")&&r.chats){let a=o("chats").select(o.raw(`
                chats.id AS result_chat_id,
                'chat' AS source_type,
                0 AS fts_rank,
                json_object(
                    ${e(r.chats,"chats")}
                ) AS result_json
            `)).leftJoin("cte_chat_message_stats","chats.id","cte_chat_message_stats.chat_id").where("chats.deleted",0);s.filters&&Array.isArray(s.filters["chats.type"])&&0<s.filters["chats.type"].length&&(a=a.whereIn("chats.type",s.filters["chats.type"])),_&&(a=applyTableFilters(o,a,c.chats.filters,c.chats.nullFilters,c.chats.notNullFilters,"chats")),null!==t&&0<t.length&&(a=a.whereIn("chats.id",t)),null!==u&&0<u.length&&(a=a.whereIn("chats.id",u));(h.chats||[]).forEach(s=>{var t,l=FIELD_TABLE_MAP[s.field];if(l&&l.sortable){let e;e="cte"===l.source&&l.cteName?l.cteName:l.jsonPath&&l.sqlType?(t="code_blocks"===l.table?"header":"meta",castJsonExtract(o,l.table,t,l.jsonPath,l.sqlType)):l.table+"."+s.field.split(".").pop(),a=a.orderBy(e,s.direction)}else console.warn(`buildEmptySearchQuery: Chat field "${s.field}" is not `+"sortable or not found in FIELD_TABLE_MAP. Skipping sort.")}),a=a.limit(i).offset(n);var f=o.select("*").from(a.as("cte_chats_limited_results"));g.push(f)}if(a.includes("messages")&&r.messages){let a=o("messages").select(o.raw(`
                messages.chat_id AS result_chat_id,
                'message' AS source_type,
                0 AS fts_rank,
                json_object(
                    ${e(r.messages,"messages")}
                ) AS result_json
            `)).innerJoin("chats","messages.chat_id","chats.id").innerJoin("groups","chats.group_id","groups.id").where("messages.deleted",0);s.filters&&Array.isArray(s.filters["messages.type"])&&0<s.filters["messages.type"].length&&(a=a.whereIn("messages.type",s.filters["messages.type"])),p&&(a=applyTableFilters(o,a,c.messages.filters,c.messages.nullFilters,c.messages.notNullFilters,"messages"),null!==t&&0<t.length&&(a=a.whereIn("messages.chat_id",t)),null!==u)&&0<u.length&&(a=a.whereIn("messages.chat_id",u)),_&&(a=applyTableFilters(o,a,c.chats.filters,c.chats.nullFilters,c.chats.notNullFilters,"chats"));(h.messages||[]).forEach(s=>{var t,l=FIELD_TABLE_MAP[s.field];if(l&&l.sortable&&("messages"===l.table||"chats"===l.table)){let e;e=l.jsonPath&&l.sqlType?(t="code_blocks"===l.table?"header":"meta",castJsonExtract(o,l.table,t,l.jsonPath,l.sqlType)):l.table+"."+s.field.split(".").pop(),a=a.orderBy(e,s.direction)}else console.warn(`buildEmptySearchQuery: Message field "${s.field}" is not sortable, `+"not found in FIELD_TABLE_MAP, or not a message/chat field. Skipping sort.")}),a=a.limit(i).offset(n);f=o.select("*").from(a.as("cte_messages_limited_results"));g.push(f)}if(a.includes("code-blocks")&&r["code-blocks"]){let a=o("code_blocks").select(o.raw(`
                messages.chat_id AS result_chat_id,
                'code-block' AS source_type,
                0 AS fts_rank,
                json_object(
                    ${e(r["code-blocks"],"code_blocks")}
                ) AS result_json
            `)).innerJoin("messages","code_blocks.message_id","messages.id").innerJoin("chats","messages.chat_id","chats.id").innerJoin("groups","chats.group_id","groups.id").where("messages.deleted",0);null!==t&&0<t.length&&(a=a.whereIn("messages.chat_id",t)),b&&(a=applyTableFilters(o,a,c.code_blocks.filters,c.code_blocks.nullFilters,c.code_blocks.notNullFilters,"code_blocks"),_&&(a=applyTableFilters(o,a,c.chats.filters,c.chats.nullFilters,c.chats.notNullFilters,"chats")),p&&(a=applyTableFilters(o,a,c.messages.filters,c.messages.nullFilters,c.messages.notNullFilters,"messages")),null!==u)&&0<u.length&&(a=a.whereIn("messages.chat_id",u));(h["code-blocks"]||[]).forEach(s=>{var t,l=FIELD_TABLE_MAP[s.field];if(l&&l.sortable&&("code_blocks"===l.table||"messages"===l.table||"chats"===l.table)){let e;e=l.jsonPath&&l.sqlType?(t="code_blocks"===l.table?"header":"meta",castJsonExtract(o,l.table,t,l.jsonPath,l.sqlType)):l.table+"."+s.field.split(".").pop(),a=a.orderBy(e,s.direction)}else console.warn(`buildEmptySearchQuery: Code block field "${s.field}" is not sortable, `+"not found in FIELD_TABLE_MAP, or not a code block/message/chat field. Skipping sort.")}),a=a.limit(i).offset(n);f=o.select("*").from(a.as("cte_code_blocks_limited_results"));g.push(f)}if(0===g.length)return{finalQuery:o.select(o.raw(`
                NULL as result_json,
                NULL as source_type,
                NULL as fts_rank,
                NULL as path
            `)).limit(0)};let m=g[0];for(let e=1;e<g.length;e++)m=m.unionAll(g[e]);a=o.from("cte_matched_results").select(o.raw("DISTINCT result_chat_id as chat_id")).whereNotNull("result_chat_id"),e=buildRecursiveChatPathCTE_RawSqlPart(o,"cte_result_chat_ids");return{finalQuery:o("cte_matched_results as t1").with("cte_chat_message_stats",buildChatMessageStatsCTE(o,"chats")).with("cte_matched_results",m).with("cte_result_chat_ids",a).withRecursive("chat_path",e).leftJoin("chat_path as t2","t1.result_chat_id","t2.original_chat_id").select("t1.result_json","t1.source_type","t1.fts_rank","t2.path")}}module.exports={buildEmptySearchQuery:buildEmptySearchQuery};
