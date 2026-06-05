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

let FileStorageManager=require("./file-storage-manager"),GitRepositoryCreator=require("./git-repository-creator"),DropzoneHandler=require("./dropzone-handler"),SSEStreamHandler=require("./sse-stream-handler"),{ImportError,ERROR_TYPES,ERROR_CODES}=require("./utils/ImportError"),ErrorLogger=require("./utils/errorLogger"),createLogger=require("../utils/debug").createLogger,logger=createLogger("BACKEND"),globalDebugLevel=(logger.info("Backend module initializing",{nodeVersion:process.version,platform:process.platform,arch:process.arch,env:process.env.NODE_ENV||"development"}),process.env.GSC_IMPORT_DEBUG||"error");logger.info("Debug level configuration",{globalLevel:globalDebugLevel,componentLevels:{DROPZONE:process.env.GSC_IMPORT_DEBUG_DROPZONE||"default",STORAGE:process.env.GSC_IMPORT_DEBUG_STORAGE||"default",REPO:process.env.GSC_IMPORT_DEBUG_REPO||"default",SSE:process.env.GSC_IMPORT_DEBUG_SSE||"default"}}),logger.debug("Exporting backend modules",{modules:["FileStorageManager","GitRepositoryCreator","DropzoneHandler","SSEStreamHandler","ImportError","ERROR_TYPES","ERROR_CODES","ErrorLogger"]}),module.exports={FileStorageManager:FileStorageManager,GitRepositoryCreator:GitRepositoryCreator,DropzoneHandler:DropzoneHandler,SSEStreamHandler:SSEStreamHandler,ImportError:ImportError,ERROR_TYPES:ERROR_TYPES,ERROR_CODES:ERROR_CODES,ErrorLogger:ErrorLogger},logger.info("Backend module initialized successfully");
