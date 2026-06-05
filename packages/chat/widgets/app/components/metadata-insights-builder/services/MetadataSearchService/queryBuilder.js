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

class QueryBuilder{static createLookupMappings(e,r,a,t=0){if(!e||!Array.isArray(e)||0===e.length)throw new Error("Files array is required and cannot be empty");if(!r||!Array.isArray(r)||0===r.length)throw new Error("Analyzers array is required and cannot be empty");if(!a||!Array.isArray(a)||0===a.length)throw new Error("Metadata fields array is required and cannot be empty");var i=[...new Set(e.map(e=>e.group_name||e.repo))],e=[...new Set(e.map(e=>e.meta?.refContext?.refName||"main"))];let n={},s=(i.forEach((e,r)=>{n[r+t]={value:e,description:"Repository: "+e}}),{}),o=(e.forEach((e,r)=>{s[r+t]={value:e,description:"main"===e?"Main branch":"Branch: "+e}}),{}),p=(r.forEach((e,r)=>{o[r+t]={value:e.id,description:e.description||e.label||e.name||e.id}}),{}),c={},l=(a.forEach(e=>{c[e.analyzerId]||(c[e.analyzerId]=[]),c[e.analyzerId].push(e)}),t);return Object.entries(c).forEach(([r,e])=>{let a=Object.keys(o).find(e=>o[e].value===r);e.forEach(e=>{var r=a+"|"+l;p[r]={value:e.fieldName,description:e.description||"Field: "+e.fieldName},l++})}),{repositories:n,branches:s,analyzers:o,fields:p}}static constructSearchQuery(e,r,a,t="pretty"){if(!e||!Array.isArray(e)||0===e.length)throw new Error("Chat IDs array is required and cannot be empty");if(!r||"object"!=typeof r)throw new Error("Mappings object is required");let i="profile:meta-raw format:"+t;return i+=" chat-id:"+e.join(","),r.repositories&&0<Object.keys(r.repositories).length&&(t=Object.entries(r.repositories).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),i+=" repo-mapping:"+t),r.branches&&0<Object.keys(r.branches).length&&(e=Object.entries(r.branches).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),i+=" branch-mapping:"+e),r.analyzers&&0<Object.keys(r.analyzers).length&&(t=Object.entries(r.analyzers).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),i+=" analyzer-mapping:"+t),r.fields&&0<Object.keys(r.fields).length&&(e=Object.entries(r.fields).map(([e,r])=>`${e}=${r.value}|"${this._escapeQuotes(r.description)}"`).join(","),i+=" field-mapping:"+e),a&&Array.isArray(a)&&0<(t=a.map(e=>{var r=e.type||"string";return`full-meta:${e.analyzerId}|${e.fieldName}|`+r}).filter(e=>0<e.length)).length&&(i+=" "+t.join(" ")),i}static _escapeQuotes(e){return e&&"string"==typeof e?e.replace(/"/g,'\\"'):e}}module.exports=QueryBuilder;
