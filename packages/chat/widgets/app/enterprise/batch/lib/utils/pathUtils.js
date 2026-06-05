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

let os=require("os"),path=require("path"),fs=require("fs"),InvalidInputError=require("../errors").InvalidInputError;function getConfigPaths(t){let a=t;if(a||(process.env.GSC_HOME?a=process.env.GSC_HOME:os.homedir()&&(a=path.resolve(os.homedir(),".gitsense"))),!fs.existsSync(a))throw new InvalidInputError("GSC_HOME directory does not exist at: "+a);t=path.join(a,"data");if(fs.existsSync(t))return{gscHome:a,chatsDbPath:path.join(a,"data","chats.sqlite3"),batchesDbPath:path.join(a,"data","batches.sqlite3"),configFilePath:path.join(a,"data","chat-config.json"),batchConfigFilePath:path.join(a,"data","batch-config.json"),envFilePath:path.join(a,"data",".env"),analyzersBasePath:path.join(a,"data","analyzers")};throw new InvalidInputError("Required 'data' directory not found in GSC_HOME: "+t)}module.exports={getConfigPaths:getConfigPaths};
