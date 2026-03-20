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

let FileStorageManager=require("./file-storage-manager"),GitRepositoryCreator=require("./git-repository-creator"),path=require("path"),createLogger=require("../utils/debug").createLogger;class DropzoneHandler{constructor(e){this.gscHome=e||process.env.GSC_HOME,this.fileStorageManager=new FileStorageManager(this.gscHome),this.gitRepositoryCreator=new GitRepositoryCreator(this.fileStorageManager,this.gscHome),this.logger=createLogger("DROPZONE"),this.logger.info("DropzoneHandler initialized",{gscHome:this.gscHome})}async handleFileUpload(t,e={}){this.logger.info("Starting file upload process",{fileCount:t.length,options:e});try{this.logger.debug("Initializing file storage manager"),await this.fileStorageManager.init(),this.logger.debug("Validating and normalizing files");var r=this._normalizeFiles(t),o=(this.logger.debug("Storing files in database",{fileNames:r.map(e=>e.name),repositoryName:e.repositoryName}),await this.fileStorageManager.storeFiles(r,{taskType:"dropzone_import",metadata:e.metadata||{},repositoryName:e.repositoryName||null}));return this.logger.info("Files stored successfully",{storageId:o}),{success:!0,storageId:o}}catch(e){return this.logger.error("File upload failed",{error:e.message,stack:e.stack,fileCount:t.length}),{success:!1,error:e.message}}}async processFilesToRepository(t,e={}){this.logger.info("Starting repository creation process",{storageId:t,options:e});try{this.logger.debug("Creating git repository from stored files",{storageId:t});var{repoPath:r,refChatId:o}=await this.gitRepositoryCreator.createRepositoryFromStorage(t,e);return this.logger.info("Repository created successfully",{storageId:t,repoPath:r,refChatId:o}),this.logger.debug("Cleaning up temporary repository",{repoPath:r}),await this.gitRepositoryCreator.cleanupTempRepository(r),this.logger.info("Repository process completed successfully",{storageId:t,refChatId:o}),{success:!0,refChatId:o}}catch(e){return this.logger.error("Repository creation failed",{error:e.message,stack:e.stack,storageId:t}),{success:!1,error:e.message}}}_normalizeFiles(e){return this.logger.debug("Normalizing files",{fileCount:e.length}),e.map(e=>{var t={name:e.name,path:e.path||e.name,size:e.size,mimeType:e.mimeType||"application/octet-stream"};return Buffer.isBuffer(e.content)?(t.content=e.content,this.logger.trace("File content is already a Buffer",{fileName:e.name,contentSize:e.content.length})):"string"==typeof e.content?(t.content=Buffer.from(e.content),this.logger.trace("Converted string content to Buffer",{fileName:e.name,contentSize:t.content.length})):e.content&&"object"==typeof e.content?"Buffer"===e.content.type&&Array.isArray(e.content.data)?(t.content=Buffer.from(e.content.data),this.logger.trace("Converted Buffer-like object to Buffer",{fileName:e.name,contentSize:t.content.length})):(this.logger.warn("Unexpected content object structure",{fileName:e.name,contentKeys:Object.keys(e.content)}),t.content=Buffer.from(JSON.stringify(e.content))):(t.content=Buffer.from(String(e.content||"")),this.logger.trace("Converted content to string then Buffer",{fileName:e.name,contentType:typeof e.content,contentSize:t.content.length})),t})}}module.exports=DropzoneHandler;
