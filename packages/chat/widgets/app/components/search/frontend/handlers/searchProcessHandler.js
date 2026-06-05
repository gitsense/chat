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

async function handleSearchProcess(e,n,r,c){if(n&&n.engine&&"function"==typeof n.engine.processSearch)try{await n.engine.processSearch(e,n,r,c)}catch(e){console.error(`handleSearchProcess: Error during engine "${n.engine.name}" process handling:`,e)}else console.error("handleSearchProcess: Invalid config or engine, or engine missing 'processSearch' method.")}module.exports={handleSearchProcess:handleSearchProcess};
