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

let{STORAGE_KEYS,DEFAULT_CONFIG}=require("./constants");class HistoryManager{constructor(r={}){this.storageKey=STORAGE_KEYS.HISTORY_GLOBAL,this.maxItems=void 0!==r.maxItems?r.maxItems:DEFAULT_CONFIG.MAX_HISTORY_ITEMS}getStorageKey(){return this.storageKey}load(){try{var r=localStorage.getItem(this.storageKey);return r?JSON.parse(r):[]}catch(r){return console.error("Error loading history:",r),[]}}save(r){if(!r||!r.command)return console.warn("HistoryManager.save: Invalid entry provided"),!1;var t=this.load(),r={id:Date.now(),command:r.command,output:r.output||"",timestamp:(new Date).toISOString(),format:r.format||"raw",visibility:r.visibility||"human-public"};t.push(r),t.length>this.maxItems&&t.shift();try{return localStorage.setItem(this.storageKey,JSON.stringify(t)),!0}catch(r){return console.error("Error saving history:",r),!1}}clear(){try{localStorage.removeItem(this.storageKey)}catch(r){console.error("Error clearing history:",r)}}}module.exports={HistoryManager:HistoryManager};
