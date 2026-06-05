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

let Database=require("better-sqlite3"),path=require("path"),fs=require("fs"),ErrorLogger=require("./utils/errorLogger"),createLogger=require("../utils/debug").createLogger;class FileStorageManager{constructor(e){this.gscHome=e||process.env.GSC_HOME,this.dbPath=null,this.db=null,this.initialized=!1,this.errorLogger=new ErrorLogger(this.gscHome),this.logger=createLogger("STORAGE"),this.logger.debug("FileStorageManager constructor called",{gscHome:this.gscHome})}async init(){if(this.logger.info("Initializing FileStorageManager"),this.initialized)this.logger.debug("FileStorageManager already initialized");else{if(!this.gscHome)throw e=new Error("GitSense Chat home is not defined"),this.logger.error("GSC_HOME not defined",{error:e.message}),e;var e=path.join(this.gscHome,"data");this.logger.debug("Ensuring data directory exists",{dataDir:e}),fs.existsSync(e)||(this.logger.info("Creating data directory",{dataDir:e}),fs.mkdirSync(e,{recursive:!0})),this.dbPath=path.join(e,"import-data.sqlite3"),this.logger.debug("Database path set",{dbPath:this.dbPath}),this.logger.debug("Connecting to SQLite database"),this.db=new Database(this.dbPath),this.logger.debug("Creating database tables if needed"),await this.createTables(),this.logger.debug("Initializing error logger"),await this.errorLogger.init(),this.initialized=!0,this.logger.info("FileStorageManager initialization completed")}}async createTables(){this.logger.debug("Creating database tables");try{this.logger.trace("Executing table creation statements"),this.db.exec(`
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
            `),this.db.exec(`
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
            `),this.db.exec(`
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
            `),this.db.exec(`
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
            `),this.db.exec(`
                CREATE INDEX IF NOT EXISTS idx_storage_id ON stored_files(storage_id);
                CREATE INDEX IF NOT EXISTS idx_expires_at ON file_storage(expires_at);
                CREATE INDEX IF NOT EXISTS idx_import_errors_storage_id ON import_errors(storage_id);
                CREATE INDEX IF NOT EXISTS idx_import_errors_occurred_at ON import_errors(occurred_at);
                CREATE UNIQUE INDEX IF NOT EXISTS idx_import_stats_date ON import_stats(date);
            `),this.logger.debug("Database tables created successfully")}catch(e){throw this.logger.error("Failed to create database tables",{error:e.message}),e}}async storeFiles(t,r={}){this.logger.info("Storing files",{fileCount:t.length,options:r}),this.initialized||await this.init();var{taskType:r="dropzone_import",metadata:e={},expirationHours:a=24,repositoryName:i=null}=r,s=this.generateId(),o=Math.floor(Date.now()/1e3),a=o+3600*a,e=(this.logger.debug("Generated storage details",{storageId:s,now:o,expiresAt:a,taskType:r,repositoryName:i}),{...e}),i=(i&&(e.repositoryName=i),t.reduce((e,t)=>e+t.size,0));this.logger.debug("Calculated total file size",{totalSize:i});try{this.logger.debug("Inserting storage record"),await this.insertStorageRecord(s,o,a,"pending",r,JSON.stringify(e),t.length,i),this.logger.debug("Inserting files into database");for(var g of t)this.logger.trace("Storing file",{fileName:g.name,fileSize:g.size,mimeType:g.mimeType}),await this.insertFile(s,g);return this.logger.info("Files stored successfully",{storageId:s,fileCount:t.length,totalSize:i}),s}catch(e){throw this.logger.error("Failed to store files",{error:e.message,stack:e.stack,storageId:s,fileCount:t.length}),await this.errorLogger.logError(s,{type:"fileProcessing",code:"STORAGE_FAILED",message:e.message,details:{taskType:r,fileCount:t.length,totalSize:i},stack:e.stack}),await this.updateStorageStatus(s,"failed"),e}}async getStorageRecord(t){this.logger.debug("Getting storage record",{storageId:t}),this.initialized||await this.init();try{var e=this.db.prepare("SELECT * FROM file_storage WHERE id = ?").get(t);return this.logger.debug("Storage record retrieved",{storageId:t,found:!!e}),e}catch(e){throw this.logger.error("Failed to get storage record",{error:e.message,storageId:t}),e}}async getFiles(r){this.logger.debug("Getting files for storage",{storageId:r}),this.initialized||await this.init();try{var e=this.db.prepare("SELECT * FROM stored_files WHERE storage_id = ?").all(r),t=(this.logger.debug("Files retrieved",{storageId:r,fileCount:e.length}),e.map(t=>{if(t.content&&!Buffer.isBuffer(t.content))try{"string"==typeof t.content&&t.content.startsWith("[object")?(this.logger.warn("Found corrupted file content",{storageId:r,filename:t.filename}),t.content=Buffer.alloc(0)):t.content=Buffer.from(t.content)}catch(e){this.logger.error("Failed to convert content to Buffer",{error:e.message,storageId:r,filename:t.filename}),t.content=Buffer.alloc(0)}return t}));return t}catch(e){throw this.logger.error("Failed to get files",{error:e.message,storageId:r}),e}}async getStorageWithFiles(t){this.logger.debug("Getting storage with files",{storageId:t}),this.initialized||await this.init();try{var e,r=await this.getStorageRecord(t);return r?(e=await this.getFiles(t),this.logger.debug("Storage with files retrieved",{storageId:t,fileCount:e.length}),{...r,files:e}):(this.logger.warn("Storage record not found",{storageId:t}),null)}catch(e){throw this.logger.error("Failed to get storage with files",{error:e.message,stack:e.stack,storageId:t}),await this.errorLogger.logError(t,{type:"system",code:"RETRIEVAL_FAILED",message:e.message,details:{storageId:t},stack:e.stack}),e}}async updateStorageStatus(t,r){this.logger.debug("Updating storage status",{storageId:t,status:r}),this.initialized||await this.init();try{this.db.prepare("UPDATE file_storage SET status = ? WHERE id = ?").run(r,t),this.logger.debug("Storage status updated",{storageId:t,status:r})}catch(e){throw this.logger.error("Exception updating storage status",{error:e.message,stack:e.stack,storageId:t,status:r}),await this.errorLogger.logError(t,{type:"system",code:"STATUS_UPDATE_FAILED",message:e.message,details:{storageId:t,status:r},stack:e.stack}),e}}async updateStorageMetadata(t,e){this.logger.debug("Updating storage metadata",{storageId:t}),this.initialized||await this.init();try{this.db.prepare("UPDATE file_storage SET metadata = ? WHERE id = ?").run(e,t),this.logger.debug("Storage metadata updated",{storageId:t})}catch(e){throw this.logger.error("Exception updating storage metadata",{error:e.message,stack:e.stack,storageId:t}),await this.errorLogger.logError(t,{type:"system",code:"METADATA_UPDATE_FAILED",message:e.message,details:{storageId:t},stack:e.stack}),e}}async updateStorageError(t,e){this.logger.debug("Updating storage error",{storageId:t,errorType:e.type,errorCode:e.code}),this.initialized||await this.init();try{await this.errorLogger.logError(t,e),this.db.prepare("UPDATE file_storage SET error_type = ?, error_code = ?, error_message = ?, error_details = ? WHERE id = ?").run(e.type||"unknown",e.code||"UNKNOWN_ERROR",e.message,JSON.stringify(e.details||{}),t),this.logger.debug("Storage error updated",{storageId:t})}catch(e){throw this.logger.error("Failed to update storage error",{error:e.message,stack:e.stack,storageId:t}),e}}async incrementRetryCount(t){this.logger.debug("Incrementing retry count",{storageId:t}),this.initialized||await this.init();try{var e=Math.floor(Date.now()/1e3);this.db.prepare("UPDATE file_storage SET retry_count = retry_count + 1, last_retry_at = ? WHERE id = ?").run(e,t),this.logger.debug("Retry count incremented",{storageId:t})}catch(e){throw this.logger.error("Exception incrementing retry count",{error:e.message,stack:e.stack,storageId:t}),await this.errorLogger.logError(t,{type:"system",code:"RETRY_COUNT_UPDATE_FAILED",message:e.message,details:{storageId:t},stack:e.stack}),e}}async getRetryCount(t){this.logger.debug("Getting retry count",{storageId:t}),this.initialized||await this.init();try{var e=this.db.prepare("SELECT retry_count FROM file_storage WHERE id = ?").get(t),r=e?e.retry_count:0;return this.logger.debug("Retry count retrieved",{storageId:t,retryCount:r}),r}catch(e){throw this.logger.error("Failed to get retry count",{error:e.message,storageId:t}),e}}async getRecentErrors(t,e=10){this.logger.debug("Getting recent errors",{storageId:t,limit:e}),this.initialized||await this.init();try{var r=await this.errorLogger.getRecentErrors(t,e);return this.logger.debug("Recent errors retrieved",{storageId:t,errorCount:r.length}),r}catch(e){return this.logger.error("Failed to get recent errors",{error:e.message,stack:e.stack,storageId:t}),[]}}async insertStorageRecord(t,e,r,a,i,s,o,g){this.logger.trace("Inserting storage record",{id:t,status:a,taskType:i,fileCount:o,totalSize:g});try{this.db.prepare("INSERT INTO file_storage (id, created_at, expires_at, status, task_type, metadata, file_count, total_size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(t,e,r,a,i,s,o,g),this.logger.trace("Storage record inserted",{id:t})}catch(e){throw this.logger.error("Failed to insert storage record",{error:e.message,id:t}),e}}async insertFile(t,r){this.logger.trace("Inserting file",{storageId:t,fileName:r.name,fileSize:r.size});var a=Math.floor(Date.now()/1e3);try{let e=r.content;Buffer.isBuffer(e)||(e="string"==typeof e?Buffer.from(e):e&&"object"==typeof e?"Buffer"===e.type&&Array.isArray(e.data)?Buffer.from(e.data):(this.logger.warn("Unexpected content type, converting to string",{storageId:t,fileName:r.name,contentType:typeof e}),Buffer.from(String(e))):Buffer.from(String(e||""))),this.db.prepare("INSERT INTO stored_files (storage_id, filename, file_path, content, file_size, mime_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(t,r.name,r.path,e,r.size,r.mimeType,a),this.logger.trace("File inserted",{storageId:t,fileName:r.name})}catch(e){throw this.logger.error("Failed to insert file",{error:e.message,storageId:t,fileName:r.name}),e}}generateId(){var e=require("crypto").randomBytes(16).toString("hex");return this.logger.trace("Generated storage ID",{id:e}),e}close(){this.logger.info("Closing FileStorageManager"),this.db&&(this.db.close(),this.initialized=!1,this.logger.debug("Database connection closed")),this.errorLogger&&(this.errorLogger.close(),this.logger.debug("Error logger closed")),this.logger.info("FileStorageManager closed")}}module.exports=FileStorageManager;
