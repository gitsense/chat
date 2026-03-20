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

let sqlite3=require("better-sqlite3"),path=require("path"),{ImportError,ERROR_TYPES}=require("./ImportError.js");class ErrorLogger{constructor(t){this.gscHome=t||process.env.GSC_HOME,this.dbPath=null,this.db=null,this.initialized=!1}async init(){if(!this.initialized){if(!this.gscHome)throw new Error("GitSense Chat home is not defined");this.dbPath=path.join(this.gscHome,"data","import-data.sqlite3"),this.db=new sqlite3.Database(this.dbPath),this.initialized=!0}}async logError(r,e){this.initialized||await this.init();try{var i=this._normalizeError(e);let t={storage_id:r,error_type:i.type||"unknown",error_code:i.code||"UNKNOWN_ERROR",error_message:i.message,error_details:JSON.stringify(i.details||{}),stack_trace:i.stack,occurred_at:Math.floor(Date.now()/1e3)};return new Promise((r,e)=>{this.db.run(`
                    INSERT INTO import_errors (storage_id, error_type, error_code, error_message, error_details, stack_trace, occurred_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `,[t.storage_id,t.error_type,t.error_code,t.error_message,t.error_details,t.stack_trace,t.occurred_at],function(t){t?e(t):r(this.lastID)})})}catch(e){throw console.error("Failed to log error to database:",e),e}}async updateStorageError(i,r){this.initialized||await this.init();try{let t=this._normalizeError(r);return new Promise((r,e)=>{this.db.run(`
                    UPDATE file_storage 
                    SET error_type = ?, error_code = ?, error_message = ?, error_details = ?
                    WHERE id = ?
                `,[t.type||"unknown",t.code||"UNKNOWN_ERROR",t.message,JSON.stringify(t.details||{}),i],function(t){t?e(t):r()})})}catch(r){throw console.error("Failed to update storage error:",r),r}}async updateDailyStats(s,a=!0){this.initialized||await this.init();try{let o=(new Date).toISOString().split("T")[0];return new Promise((e,i)=>{this.db.get(`
                    SELECT * FROM import_stats WHERE date = ?
                `,[o],(t,r)=>{t?i(t):r?(t=JSON.parse(r.error_types||"{}"),a&&(t[s]=(t[s]||0)+1),this.db.run(`
                            UPDATE import_stats 
                            SET failed_imports = failed_imports + ?, error_types = ?, updated_at = ?
                            WHERE date = ?
                        `,[a?1:0,JSON.stringify(t),Math.floor(Date.now()/1e3),o],t=>{t?i(t):e()})):(r={},a&&(r[s]=1),this.db.run(`
                            INSERT INTO import_stats (date, total_imports, failed_imports, error_types, created_at, updated_at)
                            VALUES (?, ?, ?, ?, ?, ?)
                        `,[o,1,a?1:0,JSON.stringify(r),Math.floor(Date.now()/1e3),Math.floor(Date.now()/1e3)],t=>{t?i(t):e()}))})})}catch(t){throw console.error("Failed to update daily stats:",t),t}}async incrementSuccessfulImports(){this.initialized||await this.init();try{let o=(new Date).toISOString().split("T")[0];return new Promise((e,i)=>{this.db.get(`
                    SELECT * FROM import_stats WHERE date = ?
                `,[o],(t,r)=>{t?i(t):r?this.db.run(`
                            UPDATE import_stats 
                            SET total_imports = total_imports + 1, successful_imports = successful_imports + 1, updated_at = ?
                            WHERE date = ?
                        `,[Math.floor(Date.now()/1e3),o],t=>{t?i(t):e()}):this.db.run(`
                            INSERT INTO import_stats (date, total_imports, successful_imports, failed_imports, error_types, created_at, updated_at)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        `,[o,1,1,0,"{}",Math.floor(Date.now()/1e3),Math.floor(Date.now()/1e3)],t=>{t?i(t):e()})})})}catch(t){throw console.error("Failed to increment successful imports:",t),t}}async getErrorStats(t,r){this.initialized||await this.init();try{return new Promise((e,i)=>{this.db.all(`
                    SELECT * FROM import_stats 
                    WHERE date >= ? AND date <= ?
                    ORDER BY date DESC
                `,[t,r],(t,r)=>{t?i(t):e(r)})})}catch(t){throw console.error("Failed to get error stats:",t),t}}async getRecentErrors(t,r=10){this.initialized||await this.init();try{return new Promise((e,i)=>{this.db.all(`
                    SELECT * FROM import_errors 
                    WHERE storage_id = ?
                    ORDER BY occurred_at DESC
                    LIMIT ?
                `,[t,r],(t,r)=>{t?i(t):e(r)})})}catch(t){throw console.error("Failed to get recent errors:",t),t}}_normalizeError(t){return t instanceof ImportError?t:new ImportError("system","UNKNOWN_ERROR",t.message,{originalError:t.toString()},t)}close(){this.db&&(this.db.close(),this.initialized=!1)}}module.exports=ErrorLogger;
