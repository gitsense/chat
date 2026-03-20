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

class MetadataSearch{constructor(e,t,a={}){if(!e||"object"!=typeof e)throw console.error("MetadataSearch: Invalid chatApi instance provided."),new Error("Invalid chatApi instance provided.");if(!t||"object"!=typeof t)throw console.error("MetadataSearch: Invalid contextBuilderTable instance provided."),new Error("Invalid contextBuilderTable instance provided.");this.chatApi=e,this.contextBuilderTable=t,this._distinctValuesCache=new Map,this._cacheDurationMs="number"==typeof a.cacheDurationMs&&0<=a.cacheDurationMs?a.cacheDurationMs:3e5,this._batchSize="number"==typeof a.batchSize&&0<a.batchSize?a.batchSize:500,this._analyzerSchemas=new Map}setAnalyzerSchemas(e){this._analyzerSchemas=e||new Map,this._distinctValuesCache.clear()}async fetchDistinctValues(a,r,i){if(!this._analyzerSchemas.has(a))throw new Error(`MetadataSearch: Schema for analyzer "${a}" is not set. Call setAnalyzerSchemas first.`);var e=this._analyzerSchemas.get(a),e=e&&e.properties?e.properties[r]:null;if(!e)throw new Error(`MetadataSearch: Field "${r}" not found in the current analyzer schema.`);let n=e.type;if(!n)throw new Error(`MetadataSearch: Data type for field "${r}" not defined in the schema.`);var t=this.contextBuilderTable.allItems.map(e=>e.id).sort(),e=`${a}:${r}:${n}:`+t.join(","),s=this._distinctValuesCache.get(e);if(s&&Date.now()-s.timestamp<this._cacheDurationMs)return"function"==typeof i&&i(1,1,s.values.size),s.values;var o=[];for(let e=0;e<t.length;e+=this._batchSize)o.push(t.slice(e,e+this._batchSize));let c=new Map;var h=o.length;for(let t=0;t<h;t++){var l=o[t],u=t+1;"function"==typeof i&&i(u,h,c.size);let e=`profile:meta-insights full-meta:${a}|${r}|`+n;0<l.length&&(e+=" chat-id:"+l.join(","));try{var p=await this.chatApi.search(e);if(!p)throw new Error("No search results returned for query: "+e);var f=p.results;f&&"object"==typeof f&&Object.values(f).forEach(e=>{e?.results?.forEach(e=>{let t=e.value;if("boolean"===n)t=0===t?"false":"true";else if("number"===n&&(t=parseFloat(t),isNaN(t)))return void console.warn(`MetadataSearch: Skipping non-numeric value "${e.value}" for number field "${r}".`);var a=parseInt(e.count,10);isNaN(a)?console.warn(`MetadataSearch: Skipping item with non-numeric count "${e.count}" for value "${e.value}".`):(e=c.get(t)||0,c.set(t,e+a))})}),"function"==typeof i&&i(u,h,c.size)}catch(e){throw console.error(`MetadataSearch: Error executing batch ${u}/${h}:`,e),e}}return this._distinctValuesCache.set(e,{values:c,timestamp:Date.now()}),c}async _triggerSearchToolAndWait(e){if(this.chatApi&&"function"==typeof this.chatApi.search)return this.chatApi.search(e);throw console.error("MetadataSearch: chatApi or search function is not available."),new Error("Search API not available.")}_parseCsv(e){if("string"!=typeof e||""===e.trim())return[];var t=e.trim().split("\n");if(t.length<=1)return[];var a=[];for(let e=1;e<t.length;e++){var r=t[e],i=r.split(",");2===i.length?a.push({value:i[0].trim(),count:i[1].trim()}):console.warn(`MetadataSearch: Skipping malformed CSV line: "${r}"`)}return a}}module.exports=MetadataSearch;
