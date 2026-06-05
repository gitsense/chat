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

let Database=require("better-sqlite3"),path=require("path"),{ImportError,ERROR_TYPES}=require("./ImportError.js");class ErrorLogger{constructor(r){this.gscHome=r||process.env.GSC_HOME,this.dbPath=null,this.db=null,this.initialized=!1}async init(){if(!this.initialized){if(!this.gscHome)throw new Error("GitSense Chat home is not defined");this.dbPath=path.join(this.gscHome,"data","import-data.sqlite3"),this.db=new Database(this.dbPath),this.initialized=!0}}async logError(r,t){this.initialized||await this.init();var e=this._normalizeError(t),r={storage_id:r,error_type:e.type||"unknown",error_code:e.code||"UNKNOWN_ERROR",error_message:e.message,error_details:JSON.stringify(e.details||{}),stack_trace:e.stack,occurred_at:Math.floor(Date.now()/1e3)};try{return this.db.prepare(`
                INSERT INTO import_errors (storage_id, error_type, error_code, error_message, error_details, stack_trace, occurred_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(r.storage_id,r.error_type,r.error_code,r.error_message,r.error_details,r.stack_trace,r.occurred_at).lastInsertRowid}catch(t){throw console.error("Failed to log error to database:",t),t}}async updateStorageError(r,t){this.initialized||await this.init();var e=this._normalizeError(t);try{this.db.prepare(`
                UPDATE file_storage 
                SET error_type = ?, error_code = ?, error_message = ?, error_details = ?
                WHERE id = ?
            `).run(e.type||"unknown",e.code||"UNKNOWN_ERROR",e.message,JSON.stringify(e.details||{}),r)}catch(t){throw console.error("Failed to update storage error:",t),t}}async updateDailyStats(r,t=!0){this.initialized||await this.init();try{var e,i,a=(new Date).toISOString().split("T")[0],o=this.db.prepare(`
                SELECT * FROM import_stats WHERE date = ?
            `).get(a);o?(e=JSON.parse(o.error_types||"{}"),t&&(e[r]=(e[r]||0)+1),this.db.prepare(`
                    UPDATE import_stats 
                    SET failed_imports = failed_imports + ?, error_types = ?, updated_at = ?
                    WHERE date = ?
                `).run(t?1:0,JSON.stringify(e),Math.floor(Date.now()/1e3),a)):(i={},t&&(i[r]=1),this.db.prepare(`
                    INSERT INTO import_stats (date, total_imports, failed_imports, error_types, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                `).run(a,1,t?1:0,JSON.stringify(i),Math.floor(Date.now()/1e3),Math.floor(Date.now()/1e3)))}catch(r){throw console.error("Failed to update daily stats:",r),r}}async incrementSuccessfulImports(){this.initialized||await this.init();try{var r=(new Date).toISOString().split("T")[0];this.db.prepare(`
                SELECT * FROM import_stats WHERE date = ?
            `).get(r)?this.db.prepare(`
                    UPDATE import_stats 
                    SET total_imports = total_imports + 1, successful_imports = successful_imports + 1, updated_at = ?
                    WHERE date = ?
                `).run(Math.floor(Date.now()/1e3),r):this.db.prepare(`
                    INSERT INTO import_stats (date, total_imports, successful_imports, failed_imports, error_types, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `).run(r,1,1,0,"{}",Math.floor(Date.now()/1e3),Math.floor(Date.now()/1e3))}catch(r){throw console.error("Failed to increment successful imports:",r),r}}async getErrorStats(e,i){this.initialized||await this.init();try{return new Promise((r,t)=>this.db.prepare(`
                    SELECT * FROM import_stats 
                    WHERE date >= ? AND date <= ?
                    ORDER BY date DESC
                `).all(e,i))}catch(r){throw console.error("Failed to get error stats:",r),r}}async getRecentErrors(e,i=10){this.initialized||await this.init();try{return new Promise((r,t)=>this.db.prepare(`
                    SELECT * FROM import_errors 
                    WHERE storage_id = ?
                    ORDER BY occurred_at DESC
                    LIMIT ?
                `).all(e,i))}catch(r){throw console.error("Failed to get recent errors:",r),r}}_normalizeError(r){return r instanceof ImportError?r:new ImportError("system","UNKNOWN_ERROR",r.message,{originalError:r.toString()},r)}close(){this.db&&(this.db.close(),this.initialized=!1)}}module.exports=ErrorLogger;
