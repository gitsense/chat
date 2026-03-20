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

class QueryBuilder{static createLookupMappings(e,r,a,t=0){if(!e||!Array.isArray(e)||0===e.length)throw new Error("Files array is required and cannot be empty");if(!r||!Array.isArray(r)||0===r.length)throw new Error("Analyzers array is required and cannot be empty");if(!a||!Array.isArray(a)||0===a.length)throw new Error("Metadata fields array is required and cannot be empty");var i=[...new Set(e.map(e=>e.group_name||e.repo))],e=[...new Set(e.map(e=>e.meta?.refContext?.refName||"main"))];let n={},s=(i.forEach((e,r)=>{n[r+t]={value:e,description:"Repository: "+e}}),{}),o=(e.forEach((e,r)=>{s[r+t]={value:e,description:"main"===e?"Main branch":"Branch: "+e}}),{}),p=(r.forEach((e,r)=>{o[r+t]={value:e.id,description:e.description||e.label||e.name||e.id}}),{}),c={},l=(a.forEach(e=>{c[e.analyzerId]||(c[e.analyzerId]=[]),c[e.analyzerId].push(e)}),t);return Object.entries(c).forEach(([r,e])=>{let a=Object.keys(o).find(e=>o[e].value===r);e.forEach(e=>{var r=a+"|"+l;p[r]={value:e.fieldName,description:e.description||"Field: "+e.fieldName},l++})}),{repositories:n,branches:s,analyzers:o,fields:p}}static constructSearchQuery(e,r,a){if(!e||!Array.isArray(e)||0===e.length)throw new Error("Chat IDs array is required and cannot be empty");if(!r||"object"!=typeof r)throw new Error("Mappings object is required");let t="profile:meta-raw format:pretty";return t+=" chat-id:"+e.join(","),r.repositories&&0<Object.keys(r.repositories).length&&(e=Object.entries(r.repositories).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),t+=" repo-mapping:"+e),r.branches&&0<Object.keys(r.branches).length&&(e=Object.entries(r.branches).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),t+=" branch-mapping:"+e),r.analyzers&&0<Object.keys(r.analyzers).length&&(e=Object.entries(r.analyzers).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),t+=" analyzer-mapping:"+e),r.fields&&0<Object.keys(r.fields).length&&(e=Object.entries(r.fields).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),t+=" field-mapping:"+e),a&&Array.isArray(a)&&0<(r=a.map(e=>{var r=e.type||"string";return`full-meta:${e.analyzerId}|${e.fieldName}|`+r}).filter(e=>0<e.length)).length&&(t+=" "+r.join(" ")),t}static _escapeQuotes(e){return e&&"string"==typeof e?e.replace(/"/g,'\\"'):e}}module.exports=QueryBuilder;
