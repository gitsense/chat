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

let ValidationUtils={isValidMessageId:t=>"string"==typeof t&&0<t.trim().length,isValidStateObject:t=>t&&"object"==typeof t&&!Array.isArray(t),isValidState:t=>"boolean"==typeof t},StorageUtils={STORAGE_KEY:"chatMessageStates",saveToStorage:t=>{try{var e=JSON.stringify(Object.fromEntries(t));return localStorage.setItem(StorageUtils.STORAGE_KEY,e),!0}catch(t){return console.error("Failed to save states:",t),!1}},loadFromStorage:()=>{try{var t,e=localStorage.getItem(StorageUtils.STORAGE_KEY);return e?(t=JSON.parse(e),new Map(Object.entries(t))):new Map}catch(t){return console.error("Failed to load states:",t),new Map}},cleanupStorage:e=>{try{var a,r,o=StorageUtils.loadFromStorage(),s=Date.now();let t=!1;for([a,r]of o)r.timestamp&&s-r.timestamp>e&&(o.delete(a),t=!0);return t&&StorageUtils.saveToStorage(o),!0}catch(t){return console.error("Failed to cleanup storage:",t),!1}}};export{ValidationUtils,StorageUtils};
