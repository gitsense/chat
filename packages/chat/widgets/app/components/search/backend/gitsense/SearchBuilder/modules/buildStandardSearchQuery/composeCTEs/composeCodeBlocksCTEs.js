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

let FIELD_TABLE_MAP=require("../../../constants").FIELD_TABLE_MAP;function composeCodeBlocksCTEs(a,e,s,o,l,t,c){o=o.targetSpecific["code-blocks"]||[];let n=[],i,r;return l.cte_matched_code_blocks?(r=a("cte_matched_code_blocks").innerJoin("messages","cte_matched_code_blocks.code_blocks_message_id","messages.id").innerJoin("chats","messages.chat_id","chats.id"),i=a.raw("cte_matched_code_blocks.fts_rank as fts_rank")):(r=a("code_blocks").innerJoin("messages","code_blocks.message_id","messages.id").innerJoin("chats","messages.chat_id","chats.id"),i=a.raw("0 as fts_rank"),t.code_blocks&&Object.keys(t.code_blocks).length),o.forEach(s=>{var o="string"==typeof s?s:s.field,t=FIELD_TABLE_MAP[o];if(t&&t.outputtable){let e;if(l.cte_matched_code_blocks)if("code_blocks.content"===o&&"object"==typeof s&&!0===s.snippet?.highlight)e=a.raw("cte_matched_code_blocks.code_blocks_snippet");else if("code_blocks.content"===o&&"object"==typeof s&&s.snippet){var c=s.snippet.maxLength||200;e=a.raw("substr(cte_matched_code_blocks.code_blocks_content, 1, ?)",[c])}else if(t.jsonPath&&"code_blocks"===t.table)e=a.raw(`json_extract(cte_matched_code_blocks.code_blocks_header, '${t.jsonPath}')`);else if(t.jsonPath&&"messages"===t.table)e=a.raw(`json_extract(messages.meta, '${t.jsonPath}')`);else if("table"===t.source&&"code_blocks"===t.table)e=a.raw("cte_matched_code_blocks."+t.cteName);else if("table"===t.source&&"messages"===t.table)e=a.raw("messages."+o.split(".").pop());else{if("table"!==t.source||"chats"!==t.table)return void console.warn(`composeCodeBlocksCTEs: Unexpected field table or source for output when selecting from match CTE: ${o}. Skipping.`);e=a.raw("chats."+o.split(".").pop())}else if("code_blocks.content"===o&&"object"==typeof s&&s.snippet){c=s.snippet.maxLength||200;e=a.raw("substr(code_blocks.content, 1, ?)",[c])}else if(t.jsonPath&&"code_blocks"===t.table)e=a.raw(`json_extract(code_blocks.header, '${t.jsonPath}')`);else if(t.jsonPath&&"messages"===t.table)e=a.raw(`json_extract(messages.meta, '${t.jsonPath}')`);else if("table"===t.source&&"code_blocks"===t.table)e=a.raw("code_blocks."+o.split(".").pop());else if("table"===t.source&&"messages"===t.table)e=a.raw("messages."+o.split(".").pop());else{if("table"!==t.source||"chats"!==t.table)return void console.warn(`composeCodeBlocksCTEs: Unexpected field table or source for output when selecting from base query: ${o}. Skipping.`);e=a.raw("chats."+o.split(".").pop())}n.push(a.raw(`'${t.cteName}', `+e))}}),(r=r.select([a.raw(`json_object(${n.map(e=>e.toString()).join(", ")}) as result_json`),i,a.raw("chats.id as result_chat_id"),a.raw("'code-block' as source_type"),a.raw("ROW_NUMBER() OVER () as row_num")])).orderBy("fts_rank","asc"),s.pagination?.limit&&r.limit(s.pagination.limit),r}module.exports={composeCodeBlocksCTEs:composeCodeBlocksCTEs};
