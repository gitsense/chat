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

let CLI_BRIDGE_CONSTANTS=require("../constants").CLI_BRIDGE_CONSTANTS;class StateManager{constructor(){this.storageKey=CLI_BRIDGE_CONSTANTS.STORAGE_KEYS.ACTIVE_CODES,this.currentVersion=1}_getState(){try{var e,t=localStorage.getItem(this.storageKey);return t?(e=JSON.parse(t),this._migrate(e),e):this._createEmptyState()}catch(e){return console.error("Error reading state from localStorage:",e),this._createEmptyState()}}_saveState(e){try{e.lastChecked=Date.now(),localStorage.setItem(this.storageKey,JSON.stringify(e))}catch(e){console.error("Error saving state to localStorage:",e)}}_createEmptyState(){return{version:this.currentVersion,codes:[],lastChecked:Date.now()}}_migrate(e){e.version!==this.currentVersion&&(e.version=this.currentVersion)}saveCode(t){var e=this._getState();e.codes=e.codes.filter(e=>e.code!==t.code),e.codes.push({code:t.code,chatId:t.chatId,chatTitle:t.chatTitle||"Unknown Chat",expiresAt:t.expiresAt,timeoutMinutes:t.timeoutMinutes,createdAt:Date.now(),status:"active",parentMessageId:t.parentMessageId||null}),this._saveState(e)}getValidCodes(t=null){var e=this._getState();let r=Date.now(),a=e.codes.filter(e=>e.expiresAt>r);return a=t?a.filter(e=>e.chatId===t):a}deleteCode(t){var e=this._getState();e.codes=e.codes.filter(e=>e.code!==t),this._saveState(e)}cleanup(){var e=this._getState();let t=Date.now();var r=e.codes.length;e.codes=e.codes.filter(e=>e.expiresAt>t),e.codes.length!==r&&this._saveState(e)}}module.exports=StateManager;
