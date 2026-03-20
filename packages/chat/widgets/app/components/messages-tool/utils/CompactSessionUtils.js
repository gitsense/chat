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

class CompactSessionUtils{static SESSIONS_KEY="gsc-compact-sessions";static SESSION_EXPIRATION_MS=18e5;static generateSessionId(){return Math.floor(1e7+9e7*Math.random()).toString()}static getAllSessions(){try{var s=localStorage.getItem(this.SESSIONS_KEY);return s?JSON.parse(s):[]}catch(s){return console.error("Error parsing sessions data:",s),[]}}static saveSessions(s){try{localStorage.setItem(this.SESSIONS_KEY,JSON.stringify(s))}catch(s){console.error("Error saving sessions data:",s)}}static addSession(s,e){var t=this.getAllSessions();t.push({id:s,created:Date.now(),expiration:e}),this.saveSessions(t)}static removeSession(e){var s=this.getAllSessions().filter(s=>s.id!==e);this.saveSessions(s),localStorage.removeItem("compact-"+e)}static cleanupExpiredSessions(){let e=Date.now();var s=this.getAllSessions(),t=s.filter(s=>s.expiration&&e>s.expiration),s=(t.forEach(s=>{localStorage.removeItem("compact-"+s.id)}),s.filter(s=>!s.expiration||e<=s.expiration));return this.saveSessions(s),t.length}static isSessionActive(e){var s=this.getAllSessions().find(s=>s.id===e);return!(!s||s.expiration&&Date.now()>s.expiration&&(this.removeSession(e),1))}static checkStorageLimit(){try{var s=new Blob(Object.values(localStorage)).size;if(4718592<s)if(0===this.cleanupExpiredSessions())return console.warn("localStorage is almost full. Consider clearing old compact sessions."),!1;return!0}catch(s){return console.error("Error checking storage limit:",s),!1}}}module.exports={CompactSessionUtils:CompactSessionUtils};
