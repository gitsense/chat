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

class ImportError extends Error{constructor(r,t,e,R={},E=null){super(e),this.name="ImportError",this.type=r,this.code=t,this.details=R,this.originalError=E,this.timestamp=(new Date).toISOString(),Error.captureStackTrace&&Error.captureStackTrace(this,ImportError)}toJSON(){return{name:this.name,type:this.type,code:this.code,message:this.message,details:this.details,timestamp:this.timestamp,stack:this.stack}}static validation(r,t,e={}){return new ImportError("validation",r,t,e)}static network(r,t,e={},R=null){return new ImportError("network",r,t,e,R)}static system(r,t,e={},R=null){return new ImportError("system",r,t,e,R)}static repository(r,t,e={},R=null){return new ImportError("repository",r,t,e,R)}static fileProcessing(r,t,e={},R=null){return new ImportError("fileProcessing",r,t,e,R)}isRecoverable(){return["network","timeout","temporary"].includes(this.type)}getActionMessage(){switch(this.type){case"validation":return"Please check your input and try again.";case"network":return"Please check your connection and try again.";case"system":return"Please try again later or contact support if the issue persists.";case"repository":return"Please check your repository and try again.";case"fileProcessing":return"Please check your files and try again.";default:return"An unexpected error occurred. Please try again."}}}let ERROR_TYPES={VALIDATION:"validation",NETWORK:"network",SYSTEM:"system",REPOSITORY:"repository",FILE_PROCESSING:"fileProcessing",TIMEOUT:"timeout",TEMPORARY:"temporary"},ERROR_CODES={STORAGE_NOT_FOUND:"STORAGE_NOT_FOUND",REPOSITORY_NOT_READY:"REPOSITORY_NOT_READY",MISSING_REPO_PATH:"MISSING_REPO_PATH",INVALID_FILE_TYPE:"INVALID_FILE_TYPE",FILE_TOO_LARGE:"FILE_TOO_LARGE",TOO_MANY_FILES:"TOO_MANY_FILES",CONNECTION_ERROR:"CONNECTION_ERROR",TIMEOUT_ERROR:"TIMEOUT_ERROR",SSE_CONNECTION_ERROR:"SSE_CONNECTION_ERROR",DATABASE_ERROR:"DATABASE_ERROR",FILE_SYSTEM_ERROR:"FILE_SYSTEM_ERROR",MEMORY_ERROR:"MEMORY_ERROR",IMPORT_FAILED:"IMPORT_FAILED",REPOSITORY_CREATION_FAILED:"REPOSITORY_CREATION_FAILED",COMMIT_NOT_FOUND:"COMMIT_NOT_FOUND",FILE_READ_ERROR:"FILE_READ_ERROR",FILE_WRITE_ERROR:"FILE_WRITE_ERROR",BINARY_FILE_ERROR:"BINARY_FILE_ERROR"};module.exports={ImportError:ImportError,ERROR_TYPES:ERROR_TYPES,ERROR_CODES:ERROR_CODES};
