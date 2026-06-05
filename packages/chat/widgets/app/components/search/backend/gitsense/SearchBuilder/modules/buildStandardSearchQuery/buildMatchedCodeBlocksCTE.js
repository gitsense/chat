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

let{applyTableFilters,applyFtsMatch}=require("./tableMatcherUtils"),buildSnippetSql=require("../../../utils/sqlSnippetUtils").buildSnippetSql,castJsonExtract=require("../../../utils/sqlCastingUtils").castJsonExtract,{FIELD_TABLE_MAP,COLUMN_USAGE,QUERY_REQUIREMENTS,HIGHLIGHT_MARKER_START,HIGHLIGHT_MARKER_END}=require("../../constants");function determineFtsTable(e){return"trigram"===e.codeBlockSearchType?"fts_code_blocks_trigram":"fts_code_blocks"}function buildMatchedCodeBlocksCTE(e,t,s,o,c){let a=e("code_blocks").innerJoin("messages",function(){this.on("code_blocks.message_id","=","messages.id").andOn("messages.deleted","=",0)}).innerJoin("chats",function(){this.on("messages.chat_id","=","chats.id").andOn("chats.deleted","=",0)}),d=(c&&(a=a.innerJoin(c,c+".chat_id","messages.chat_id")),new Set(["code_blocks.id as base_rowid"]));0<Object.keys(s.filters).length&&COLUMN_USAGE.ESSENTIAL_FILTER.code_blocks.forEach(e=>d.add("code_blocks."+e));var c=0<t.keywords.length||0<t.phrases.length,l=t.targets.includes("code-blocks");if(c&&l){var c=determineFtsTable(t),i=(d.add(c+".rowid as fts_rowid"),d.add(c+".rank as fts_rank"),d.add("code_blocks.id as base_rowid"),o.find(e=>"object"==typeof e&&"code_blocks.content"===e.field&&!0===e.snippet?.highlight));i&&(i=i.snippet.maxLength||200,d.add(buildSnippetSql(e,c,0,HIGHLIGHT_MARKER_START,HIGHLIGHT_MARKER_END,"...",i,"code_blocks_snippet")));let s=[];t.phrases.forEach(e=>{e=e.replace(/"/g,'""');s.push(`content:"${e}"`)}),t.keywords.forEach(e=>{e=e.replace(/"/g,'""');s.push("content:"+e)}),0<s.length&&(i=s.join(" OR "),a=applyFtsMatch(e,a,c,i,"code_blocks"))}return["uuid","message_id","content","component","parent_uuid","major","minor","patch","header","created_at","size"].forEach(e=>{var s="code_blocks."+e,t=FIELD_TABLE_MAP[s];t&&t.cteName?d.add(`code_blocks.${e} as `+t.cteName):(console.warn(`buildMatchedCodeBlocksCTE: Column ${s} not found in FIELD_TABLE_MAP or missing cteName.`),d.add("code_blocks."+e))}),l&&COLUMN_USAGE.COMMON_OUTPUT.code_blocks.forEach(e=>{var s=FIELD_TABLE_MAP["code_blocks."+e];s&&s.outputtable&&d.add(`code_blocks.${e} as `+s.cteName)}),o.forEach(e=>{var s,e="string"==typeof e?e:e.field;e.startsWith("code_blocks.")&&(s=FIELD_TABLE_MAP[e])&&s.outputtable&&!COLUMN_USAGE.COMMON_OUTPUT.code_blocks.includes(e.split(".")[1])&&d.add(`code_blocks.${e.split(".")[1]} as `+s.cteName)}),a=(a=applyTableFilters(e,a,s.filters,s.nullFilters,s.notNullFilters,"code_blocks")).select([...d])}module.exports={buildMatchedCodeBlocksCTE:buildMatchedCodeBlocksCTE};
