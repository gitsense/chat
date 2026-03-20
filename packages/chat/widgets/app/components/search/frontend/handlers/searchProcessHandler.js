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

async function handleSearchProcess(e,n,r,c){if(n&&n.engine&&"function"==typeof n.engine.processSearch)try{await n.engine.processSearch(e,n,r,c)}catch(e){console.error(`handleSearchProcess: Error during engine "${n.engine.name}" process handling:`,e)}else console.error("handleSearchProcess: Invalid config or engine, or engine missing 'processSearch' method.")}module.exports={handleSearchProcess:handleSearchProcess};
