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

let sqlite3=require("better-sqlite3"),path=require("path"),fs=require("fs"),ErrorLogger=require("./utils/errorLogger"),createLogger=require("../utils/debug").createLogger;class FileStorageManager{constructor(e){this.gscHome=e||process.env.GSC_HOME,this.dbPath=null,this.db=null,this.initialized=!1,this.errorLogger=new ErrorLogger(this.gscHome),this.logger=createLogger("STORAGE"),this.logger.debug("FileStorageManager constructor called",{gscHome:this.gscHome})}async init(){if(this.logger.info("Initializing FileStorageManager"),this.initialized)this.logger.debug("FileStorageManager already initialized");else{if(!this.gscHome)throw e=new Error("GitSense Chat home is not defined"),this.logger.error("GSC_HOME not defined",{error:e.message}),e;var e=path.join(this.gscHome,"data");this.logger.debug("Ensuring data directory exists",{dataDir:e}),fs.existsSync(e)||(this.logger.info("Creating data directory",{dataDir:e}),fs.mkdirSync(e,{recursive:!0})),this.dbPath=path.join(e,"import-data.sqlite3"),this.logger.debug("Database path set",{dbPath:this.dbPath}),this.logger.debug("Connecting to SQLite database"),this.db=new sqlite3.Database(this.dbPath),this.logger.debug("Creating database tables if needed"),await this.createTables(),this.logger.debug("Initializing error logger"),await this.errorLogger.init(),this.initialized=!0,this.logger.info("FileStorageManager initialization completed")}}async createTables(){return this.logger.debug("Creating database tables"),new Promise((t,r)=>{this.db.serialize(()=>{this.logger.trace("Executing table creation statements"),this.db.run(`
                CREATE TABLE IF NOT EXISTS file_storage (
                    id TEXT PRIMARY KEY,
                    created_at INTEGER NOT NULL,
                    expires_at INTEGER NOT NULL,
                    status TEXT NOT NULL DEFAULT 'pending',
                    task_type TEXT,
                    metadata TEXT,
                    file_count INTEGER DEFAULT 0,
                    total_size INTEGER DEFAULT 0,
                    error_type TEXT,
                    error_code TEXT,
                    error_message TEXT,
                    error_details TEXT,
                    retry_count INTEGER DEFAULT 0,
                    last_retry_at INTEGER
                )
            `),this.db.run(`
                CREATE TABLE IF NOT EXISTS stored_files (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    storage_id TEXT NOT NULL,
                    filename TEXT NOT NULL,
                    file_path TEXT NOT NULL,
                    content BLOB NOT NULL,
                    file_size INTEGER NOT NULL,
                    mime_type TEXT,
                    created_at INTEGER NOT NULL,
                    FOREIGN KEY (storage_id) REFERENCES file_storage(id) ON DELETE CASCADE
                )
            `),this.db.run(`
                CREATE TABLE IF NOT EXISTS import_errors (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    storage_id TEXT NOT NULL,
                    error_type TEXT NOT NULL,
                    error_code TEXT,
                    error_message TEXT NOT NULL,
                    error_details TEXT,
                    stack_trace TEXT,
                    occurred_at INTEGER NOT NULL,
                    resolved_at INTEGER,
                    resolution_method TEXT,
                    FOREIGN KEY (storage_id) REFERENCES file_storage(id) ON DELETE CASCADE
                )
            `),this.db.run(`
                CREATE TABLE IF NOT EXISTS import_stats (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date TEXT NOT NULL,
                    total_imports INTEGER DEFAULT 0,
                    successful_imports INTEGER DEFAULT 0,
                    failed_imports INTEGER DEFAULT 0,
                    error_types TEXT,
                    created_at INTEGER NOT NULL,
                    updated_at INTEGER NOT NULL
                )
            `),this.db.run(`
                CREATE INDEX IF NOT EXISTS idx_storage_id ON stored_files(storage_id);
                CREATE INDEX IF NOT EXISTS idx_expires_at ON file_storage(expires_at);
                CREATE INDEX IF NOT EXISTS idx_import_errors_storage_id ON import_errors(storage_id);
                CREATE INDEX IF NOT EXISTS idx_import_errors_occurred_at ON import_errors(occurred_at);
                CREATE UNIQUE INDEX IF NOT EXISTS idx_import_stats_date ON import_stats(date);
            `,e=>{e?(this.logger.error("Failed to create database tables",{error:e.message}),r(e)):(this.logger.debug("Database tables created successfully"),t())})})})}async storeFiles(t,r={}){this.logger.info("Storing files",{fileCount:t.length,options:r}),this.initialized||await this.init();var{taskType:r="dropzone_import",metadata:e={},expirationHours:i=24,repositoryName:s=null}=r,a=this.generateId(),o=Math.floor(Date.now()/1e3),i=o+3600*i,e=(this.logger.debug("Generated storage details",{storageId:a,now:o,expiresAt:i,taskType:r,repositoryName:s}),{...e}),s=(s&&(e.repositoryName=s),t.reduce((e,t)=>e+t.size,0));this.logger.debug("Calculated total file size",{totalSize:s});try{this.logger.debug("Inserting storage record"),await this.insertStorageRecord(a,o,i,"pending",r,JSON.stringify(e),t.length,s),this.logger.debug("Inserting files into database");for(var g of t)this.logger.trace("Storing file",{fileName:g.name,fileSize:g.size,mimeType:g.mimeType}),await this.insertFile(a,g);return this.logger.info("Files stored successfully",{storageId:a,fileCount:t.length,totalSize:s}),a}catch(e){throw this.logger.error("Failed to store files",{error:e.message,stack:e.stack,storageId:a,fileCount:t.length}),await this.errorLogger.logError(a,{type:"fileProcessing",code:"STORAGE_FAILED",message:e.message,details:{taskType:r,fileCount:t.length,totalSize:s},stack:e.stack}),await this.updateStorageStatus(a,"failed"),e}}async getStorageRecord(s){return this.logger.debug("Getting storage record",{storageId:s}),this.initialized||await this.init(),new Promise((r,i)=>{this.db.get("SELECT * FROM file_storage WHERE id = ?",[s],(e,t)=>{e?(this.logger.error("Failed to get storage record",{error:e.message,storageId:s}),i(e)):(this.logger.debug("Storage record retrieved",{storageId:s,found:!!t}),r(t))})})}async getFiles(s){return this.logger.debug("Getting files for storage",{storageId:s}),this.initialized||await this.init(),new Promise((r,i)=>{this.db.all("SELECT * FROM stored_files WHERE storage_id = ?",[s],(e,t)=>{e?(this.logger.error("Failed to get files",{error:e.message,storageId:s}),i(e)):(this.logger.debug("Files retrieved",{storageId:s,fileCount:t.length}),e=t.map(t=>{if(t.content&&!Buffer.isBuffer(t.content))try{"string"==typeof t.content&&t.content.startsWith("[object")?(this.logger.warn("Found corrupted file content",{storageId:s,filename:t.filename}),t.content=Buffer.alloc(0)):t.content=Buffer.from(t.content)}catch(e){this.logger.error("Failed to convert content to Buffer",{error:e.message,storageId:s,filename:t.filename}),t.content=Buffer.alloc(0)}return t}),r(e))})})}async getStorageWithFiles(t){this.logger.debug("Getting storage with files",{storageId:t}),this.initialized||await this.init();try{var e,r=await this.getStorageRecord(t);return r?(e=await this.getFiles(t),this.logger.debug("Storage with files retrieved",{storageId:t,fileCount:e.length}),{...r,files:e}):(this.logger.warn("Storage record not found",{storageId:t}),null)}catch(e){throw this.logger.error("Failed to get storage with files",{error:e.message,stack:e.stack,storageId:t}),await this.errorLogger.logError(t,{type:"system",code:"RETRIEVAL_FAILED",message:e.message,details:{storageId:t},stack:e.stack}),e}}async updateStorageStatus(i,s){this.logger.debug("Updating storage status",{storageId:i,status:s}),this.initialized||await this.init();try{return new Promise((t,r)=>{this.db.run("UPDATE file_storage SET status = ? WHERE id = ?",[s,i],e=>{e?(this.logger.error("Failed to update storage status",{error:e.message,storageId:i,status:s}),r(e)):(this.logger.debug("Storage status updated",{storageId:i,status:s}),t())})})}catch(e){throw this.logger.error("Exception updating storage status",{error:e.message,stack:e.stack,storageId:i,status:s}),await this.errorLogger.logError(i,{type:"system",code:"STATUS_UPDATE_FAILED",message:e.message,details:{storageId:i,status:s},stack:e.stack}),e}}async updateStorageMetadata(i,e){this.logger.debug("Updating storage metadata",{storageId:i}),this.initialized||await this.init();try{return new Promise((t,r)=>{this.db.run("UPDATE file_storage SET metadata = ? WHERE id = ?",[e,i],e=>{e?(this.logger.error("Failed to update storage metadata",{error:e.message,storageId:i}),r(e)):(this.logger.debug("Storage metadata updated",{storageId:i}),t())})})}catch(e){throw this.logger.error("Exception updating storage metadata",{error:e.message,stack:e.stack,storageId:i}),await this.errorLogger.logError(i,{type:"system",code:"METADATA_UPDATE_FAILED",message:e.message,details:{storageId:i},stack:e.stack}),e}}async updateStorageError(i,e){this.logger.debug("Updating storage error",{storageId:i,errorType:e.type,errorCode:e.code}),this.initialized||await this.init();try{return await this.errorLogger.logError(i,e),new Promise((t,r)=>{this.db.run("UPDATE file_storage SET error_type = ?, error_code = ?, error_message = ?, error_details = ? WHERE id = ?",[e.type||"unknown",e.code||"UNKNOWN_ERROR",e.message,JSON.stringify(e.details||{}),i],e=>{e?(this.logger.error("Failed to update storage error",{error:e.message,storageId:i}),r(e)):(this.logger.debug("Storage error updated",{storageId:i}),t())})})}catch(e){throw this.logger.error("Failed to update storage error",{error:e.message,stack:e.stack,storageId:i}),e}}async incrementRetryCount(i){this.logger.debug("Incrementing retry count",{storageId:i}),this.initialized||await this.init();try{let e=Math.floor(Date.now()/1e3);return new Promise((t,r)=>{this.db.run("UPDATE file_storage SET retry_count = retry_count + 1, last_retry_at = ? WHERE id = ?",[e,i],e=>{e?(this.logger.error("Failed to increment retry count",{error:e.message,storageId:i}),r(e)):(this.logger.debug("Retry count incremented",{storageId:i}),t())})})}catch(e){throw this.logger.error("Exception incrementing retry count",{error:e.message,stack:e.stack,storageId:i}),await this.errorLogger.logError(i,{type:"system",code:"RETRY_COUNT_UPDATE_FAILED",message:e.message,details:{storageId:i},stack:e.stack}),e}}async getRetryCount(s){return this.logger.debug("Getting retry count",{storageId:s}),this.initialized||await this.init(),new Promise((r,i)=>{this.db.get("SELECT retry_count FROM file_storage WHERE id = ?",[s],(e,t)=>{e?(this.logger.error("Failed to get retry count",{error:e.message,storageId:s}),i(e)):(e=t?t.retry_count:0,this.logger.debug("Retry count retrieved",{storageId:s,retryCount:e}),r(e))})})}async getRecentErrors(t,e=10){this.logger.debug("Getting recent errors",{storageId:t,limit:e}),this.initialized||await this.init();try{var r=await this.errorLogger.getRecentErrors(t,e);return this.logger.debug("Recent errors retrieved",{storageId:t,errorCount:r.length}),r}catch(e){return this.logger.error("Failed to get recent errors",{error:e.message,stack:e.stack,storageId:t}),[]}}async insertStorageRecord(i,e,s,a,o,g,d,n){return this.logger.trace("Inserting storage record",{id:i,status:a,taskType:o,fileCount:d,totalSize:n}),new Promise((t,r)=>{this.db.run("INSERT INTO file_storage (id, created_at, expires_at, status, task_type, metadata, file_count, total_size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[i,e,s,a,o,g,d,n],e=>{e?(this.logger.error("Failed to insert storage record",{error:e.message,id:i}),r(e)):(this.logger.trace("Storage record inserted",{id:i}),t())})})}async insertFile(i,s){this.logger.trace("Inserting file",{storageId:i,fileName:s.name,fileSize:s.size});let a=Math.floor(Date.now()/1e3);return new Promise((t,r)=>{let e=s.content;Buffer.isBuffer(e)||(e="string"==typeof e?Buffer.from(e):e&&"object"==typeof e?"Buffer"===e.type&&Array.isArray(e.data)?Buffer.from(e.data):(this.logger.warn("Unexpected content type, converting to string",{storageId:i,fileName:s.name,contentType:typeof e}),Buffer.from(String(e))):Buffer.from(String(e||""))),this.db.run("INSERT INTO stored_files (storage_id, filename, file_path, content, file_size, mime_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",[i,s.name,s.path,e,s.size,s.mimeType,a],e=>{e?(this.logger.error("Failed to insert file",{error:e.message,storageId:i,fileName:s.name}),r(e)):(this.logger.trace("File inserted",{storageId:i,fileName:s.name}),t())})})}generateId(){var e=require("crypto").randomBytes(16).toString("hex");return this.logger.trace("Generated storage ID",{id:e}),e}close(){this.logger.info("Closing FileStorageManager"),this.db&&(this.db.close(),this.initialized=!1,this.logger.debug("Database connection closed")),this.errorLogger&&(this.errorLogger.close(),this.logger.debug("Error logger closed")),this.logger.info("FileStorageManager closed")}}module.exports=FileStorageManager;
