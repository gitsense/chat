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

let{STORAGE_KEYS,DEFAULT_CONFIG}=require("./constants");class HistoryManager{constructor(t={}){this.storageKey=STORAGE_KEYS.HISTORY_GLOBAL,this.maxItems=void 0!==t.maxItems?t.maxItems:DEFAULT_CONFIG.MAX_HISTORY_ITEMS}getStorageKey(){return this.storageKey}load(){try{var t=localStorage.getItem(this.storageKey);return t?JSON.parse(t):[]}catch(t){return console.error("Error loading history:",t),[]}}save(t){if(t&&t.command){var r=this.load(),t={id:Date.now(),command:t.command,output:t.output||"",timestamp:(new Date).toISOString(),format:t.format||"raw",visibility:t.visibility||"human-public"};r.push(t),r.length>this.maxItems&&r.shift();try{localStorage.setItem(this.storageKey,JSON.stringify(r))}catch(t){console.error("Error saving history:",t)}}else console.warn("HistoryManager.save: Invalid entry provided")}clear(){try{localStorage.removeItem(this.storageKey)}catch(t){console.error("Error clearing history:",t)}}}module.exports={HistoryManager:HistoryManager};
