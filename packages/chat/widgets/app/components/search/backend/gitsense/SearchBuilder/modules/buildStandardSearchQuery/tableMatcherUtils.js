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

let FIELD_TABLE_MAP=require("../../constants").FIELD_TABLE_MAP,castJsonExtract=require("../../../utils/sqlCastingUtils").castJsonExtract;function applyTableFilters(a,e,l,t,r,s){let o=e;for(var n in l){var p=l[n];let t=FIELD_TABLE_MAP[n];if(!t||t.table!==s&&!t.jsonPath)console.warn(`Filter field "${n}" is not applicable to table "${s}". Skipping.`);else{var i,c=t.table?t.table+"."+n.split(".").pop():s+"."+n.split(".").pop();if("chats.meta.git_path"===n){let e=(Array.isArray(p)?p:[p]).map(e=>{e=e.replace(/[\[\]\\]/g,"\\$&").replace(/\*/g,"%").replace(/\?/g,"_");return a.raw(`LOWER(json_extract(${t.table}.meta, '$.path')) LIKE LOWER(?)`,[e])});if(0<e.length){o=o.where(function(){e.forEach((e,t)=>{this[0===t?"where":"orWhere"](e)})});continue}}if(Array.isArray(p))o=t.jsonPath?(i=t.sqlType?castJsonExtract(a,t.table,"code_blocks"===t.table?"header":"meta",t.jsonPath,t.sqlType):a.raw(`json_extract(${t.table}.${"code_blocks"===t.table?"header":"meta"}, '${t.jsonPath}')`),o.where(a.raw(i.toString()+" IN (?)",[p]))):(t.table,n.split(".").pop(),o.whereIn(c,p));else if("datetime"===t.type){let e;e=n.endsWith("_after")?">=":n.endsWith("_before")?"<=":"=",o=t.jsonPath?(i=castJsonExtract(a,t.table,"code_blocks"===t.table?"header":"meta",t.jsonPath,t.sqlType||"REAL"),o.where(a.raw(`${i.toString()} ${e} ?`,[p]))):o.where(c,e,p)}else if(t.jsonPath&&t.sqlType){let e=p;"boolean"===t.type&&("true"===p?e=1:"false"===p&&(e=0));n=castJsonExtract(a,t.table,"code_blocks"===t.table?"header":"meta",t.jsonPath,t.sqlType);o=o.where(a.raw(n.toString()+" = ?",[e]))}else o=t.jsonPath?o.where(a.raw(`json_extract(${t.table}.meta, '${t.jsonPath}') = ?`,[p])):o.where(c,p)}}for(var h of Object.keys(t)){var b=FIELD_TABLE_MAP[h];!b||b.table!==s&&!b.jsonPath?console.warn(`Null filter field "${h}" is not applicable to table "${s}". Skipping.`):(h=b.table?b.table+"."+h.split(".").pop():s+"."+h.split(".").pop(),o=b.jsonPath?(b=b.sqlType?castJsonExtract(a,b.table,"code_blocks"===b.table?"header":"meta",b.jsonPath,b.sqlType):a.raw(`json_extract(${b.table}.${"code_blocks"===b.table?"header":"meta"}, '${b.jsonPath}')`),o.where(a.raw(b.toString()+" IS NULL"))):o.whereNull(h))}for(var w of Object.keys(r)){var _=FIELD_TABLE_MAP[w];!_||_.table!==s&&!_.jsonPath?console.warn(`Not null filter field "${w}" is not applicable to table "${s}". Skipping.`):(w=_.table?_.table+"."+w.split(".").pop():s+"."+w.split(".").pop(),o=_.jsonPath?(_=_.sqlType?castJsonExtract(a,_.table,"code_blocks"===_.table?"header":"meta",_.jsonPath,_.sqlType):a.raw(`json_extract(${_.table}.${"code_blocks"===_.table?"header":"meta"}, '${_.jsonPath}')`),o.where(a.raw(_.toString()+" IS NOT NULL"))):o.whereNotNull(w))}return o}function applyFtsMatch(e,t,a,l,r){e=e.raw(a+" MATCH ?",[l]);return t.innerJoin(a,function(){this.on(r+".id","=",a+".rowid")}).where(e)}module.exports={applyTableFilters:applyTableFilters,applyFtsMatch:applyFtsMatch};
