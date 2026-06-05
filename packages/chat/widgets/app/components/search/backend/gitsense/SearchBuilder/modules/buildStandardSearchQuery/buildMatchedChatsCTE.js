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

let{applyTableFilters,applyFtsMatch}=require("./tableMatcherUtils"),{FIELD_TABLE_MAP,COLUMN_USAGE,QUERY_REQUIREMENTS}=require("../../constants"),castJsonExtract=require("../../../utils/sqlCastingUtils").castJsonExtract;function buildMatchedChatsCTE(r,t,a,e,s){let l=r("chats"),c=new Set([...COLUMN_USAGE.ESSENTIAL_JOIN.chats.map(t=>"chats."+t)]);s&&(l=l.innerJoin(s,s+".chat_id","chats.id")),0<Object.keys(a.filters).length&&COLUMN_USAGE.ESSENTIAL_FILTER.chats.forEach(t=>c.add("chats."+t));var s=0<t.keywords.length||0<t.phrases.length,h=t.targets.includes("chats");if(s&&h&&(QUERY_REQUIREMENTS.FTS_SEARCH.chats.columns.forEach(t=>c.add(t)),c.add("fts_chats.rowid as fts_rowid"),c.add("fts_chats.rank as fts_rank"),c.add("chats.id as base_id")),h&&(COLUMN_USAGE.COMMON_OUTPUT.chats.forEach(t=>{var a=FIELD_TABLE_MAP["chats."+t];a&&c.add(`chats.${t} as `+a.cteName)}),Array.isArray(e))&&e.forEach(a=>{var a="string"==typeof a?a:a.field,e=FIELD_TABLE_MAP[a];if(e&&e.outputtable&&"table"===e.source&&"chats"===e.table){var s=e.table;let t;t=e.jsonPath?e.sqlType?castJsonExtract(r,s,"meta",e.jsonPath,e.sqlType):r.raw(`json_extract(${s}.meta, '${e.jsonPath}')`):r.raw(s+"."+a.split(".").pop()),e.cteName?c.add(r.raw(t.toString()+" as "+e.cteName)):c.add(t)}}),a.filters.hasOwnProperty("chats.deleted")||a.nullFilters.hasOwnProperty("chats.deleted")||a.notNullFilters.hasOwnProperty("chats.deleted")||(l=l.where("chats.deleted",0)),l=applyTableFilters(r,l,a.filters,a.nullFilters,a.notNullFilters,"chats"),h&&s){[...t.keywords,...t.phrases],FIELD_TABLE_MAP["chats.name"];let a=[];t.phrases.forEach(t=>{t=t.replace(/"/g,'""');a.push(`name:"${t}"`)}),t.keywords.forEach(t=>{t=t.replace(/"/g,'""');a.push("name:"+t)}),0<a.length&&(e=a.join(" OR "),l=applyFtsMatch(r,l,"fts_chats",e,"chats"))}return l=l.select([...c])}module.exports={buildMatchedChatsCTE:buildMatchedChatsCTE};
