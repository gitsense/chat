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

let{applyTableFilters,applyFtsMatch}=require("./tableMatcherUtils"),buildSnippetSql=require("../../../utils/sqlSnippetUtils").buildSnippetSql,castJsonExtract=require("../../../utils/sqlCastingUtils").castJsonExtract,{FIELD_TABLE_MAP,COLUMN_USAGE,QUERY_REQUIREMENTS,HIGHLIGHT_MARKER_START,HIGHLIGHT_MARKER_END}=require("../../constants");function getSqlTypeFromFieldType(e){switch(e.toLowerCase()){case"string":return"TEXT";case"number":return"REAL";case"boolean":return"INTEGER";case"datetime":return"REAL";default:return"TEXT"}}function buildMatchedMessagesCTE(o,e,a,s,t){let r=o("messages");var l=e.targets.includes("messages"),i=0<e.keywords.length||0<e.phrases.length;l&&(r=r.leftJoin("chats","messages.chat_id","chats.id")),t&&(r=r.innerJoin(t,t+".chat_id","messages.chat_id"));let n=new Set;COLUMN_USAGE.ESSENTIAL_JOIN.messages.forEach(e=>{var s=FIELD_TABLE_MAP["messages."+e];s&&s.cteName?n.add(`messages.${e} as `+s.cteName):n.add("messages."+e)}),l&&i&&(n.add("fts_messages.rowid as fts_rowid"),n.add("fts_messages.rank as fts_rank"),n.add("messages.id as base_id"),t=s.find(e=>"object"==typeof e&&"messages.message"===e.field&&!0===e.snippet?.highlight))&&(t=t.snippet.maxLength||200,n.add(buildSnippetSql(o,"fts_messages",0,HIGHLIGHT_MARKER_START,HIGHLIGHT_MARKER_END,"...",t,"messages_content_snippet"))),e.targets.includes("messages")&&s.forEach(e=>{var s,a,t,r,l;"string"==typeof e?(l=e,t=(r=FIELD_TABLE_MAP[l])?.outputtable,s="messages"===r?.table,a="chats"===r?.table,t&&(s||a)&&(r.jsonPath?(t=r.sqlType?castJsonExtract(o,r.table,"meta",r.jsonPath,r.sqlType,r.cteName):o.raw(`json_extract(${r.table}.meta, '${r.jsonPath}') as `+r.cteName),n.add(t)):"messages"===r.table?n.add(`messages.${l.split(".").pop()} as `+r.cteName):"chats"===r.table?n.add(`chats.${l.split(".").pop()} as `+r.cteName):console.warn(`buildMatchedMessagesCTE: Unexpected field table for output: ${l}. Skipping.`))):"object"==typeof e&&e.field&&e.type&&(s=e.field,a=e.type,s.startsWith("messages.meta.extracted_metadata.")?(t="$.extracted_metadata."+s.substring("messages.meta.extracted_metadata.".length),r=getSqlTypeFromFieldType(a),l=s.replace(/\./g,"_"),e=castJsonExtract(o,"messages","meta",t,r,l),n.add(e)):console.warn(`buildMatchedMessagesCTE: Unsupported object field format or path for output: ${s}. Skipping.`))}),a.filters.hasOwnProperty("messages.deleted")||a.nullFilters.hasOwnProperty("messages.deleted")||a.notNullFilters.hasOwnProperty("messages.deleted")||(r=r.where("messages.deleted",0)),a.filters.hasOwnProperty("messages.meta.searchable")||a.nullFilters.hasOwnProperty("messages.meta.searchable")||a.notNullFilters.hasOwnProperty("messages.meta.searchable")||(r=r.where(function(){this.whereNull("messages.meta").orWhereRaw("json_extract(messages.meta, '$.searchable') IS NULL").orWhere(castJsonExtract(o,"messages","meta","$.searchable","INTEGER"),1)})),r=applyTableFilters(o,r,a.filters,a.nullFilters,a.notNullFilters,"messages");var g,t=e.metadataFilters||[];let c={};for(g in t.forEach(e=>{var s=e.field+`:${e.type}:`+e.operator;c[s]||(c[s]={field:e.field,type:e.type,operator:e.operator,values:[],arrayLogic:e.arrayLogic||"OR"}),e.value&&"object"==typeof e.value&&e.value.values?c[s].values.push(...e.value.values):c[s].values.push(e.value)}),c){var d=c[g],m="$.extracted_metadata."+d.field;let s=d.type;var p=d.operator,h=d.values,u=d.arrayLogic||"OR";if(["string","number","boolean","array"].includes(s.toLowerCase())){h="array"===s.toLowerCase()?h.flat():h;let e=h.map(e=>"boolean"===s.toLowerCase()?"true"===e?1:"false"===e?0:e:e),a;if("string"===s.toLowerCase()?a="TEXT":"number"===s.toLowerCase()?a="REAL":"boolean"===s.toLowerCase()&&(a="INTEGER"),"array"===s.toLowerCase()){var E,w,T=h.map(()=>"?").join(", ");"is"===p?"OR"===u?(E=o.raw(`
                        (SELECT COUNT(*) 
                         FROM json_each(messages.meta, ?) AS j
                         WHERE j.value IN (${T})) > 0
                    `,[m,...h]),r=r.where(E)):"AND"===u&&(E=o.raw(`
                        (SELECT COUNT(DISTINCT j.value) 
                         FROM json_each(messages.meta, ?) AS j
                         WHERE j.value IN (${T})) = ?
                    `,[m,...h,h.length]),r=r.where(E)):"is_not"===p?"OR"===u?(w=o.raw(`
                        (SELECT COUNT(*) 
                         FROM json_each(messages.meta, ?) AS j
                         WHERE j.value IN (${T})) = 0
                    `,[m,...h]),r=r.where(w)):"AND"===u&&(w=o.raw(`
                        (SELECT COUNT(DISTINCT j.value) 
                         FROM json_each(messages.meta, ?) AS j
                         WHERE j.value IN (${T})) < ?
                    `,[m,...h,h.length]),r=r.where(w)):(u=o.raw(`json_extract(messages.meta, '${m}')`),"is_null"===p?r=r.where(o.raw(u.toString()+" IS NULL")):"is_not_null"===p&&(r=r.where(o.raw(u.toString()+" IS NOT NULL"))))}else{let s=castJsonExtract(o,"messages","meta",m,a);"is_null"===p?r=r.where(o.raw(s.toString()+" IS NULL")):"is_not_null"===p?r=r.where(o.raw(s.toString()+" IS NOT NULL")):"is"===p?r=1===h.length?r.where(o.raw(s.toString()+" = ?",[e[0]])):r.where(function(){e.forEach(e=>{this.orWhere(o.raw(s.toString()+" = ?",[e]))})}):"is_not"===p&&(r=r.where(o.raw(s.toString()+" NOT IN (?)",[e])))}}else console.warn(`buildMatchedMessagesCTE: Unsupported metadata type "${s}" for field "${d.field}". Skipping filter.`)}if(l&&i){s=[...e.keywords,...e.phrases];FIELD_TABLE_MAP["messages.message"];if(0<s.map(e=>"message:"+e.replace(/"/g,'""')).length){let s=[];e.phrases.forEach(e=>{e=e.replace(/"/g,'""');s.push(`message:"${e}"`)}),e.keywords.forEach(e=>{e=e.replace(/"/g,'""');s.push(`message:"${e}"`)});a=s.join(" OR ");r=applyFtsMatch(o,r,"fts_messages",a,"messages")}}return r=r.select([...n])}module.exports={buildMatchedMessagesCTE:buildMatchedMessagesCTE};
