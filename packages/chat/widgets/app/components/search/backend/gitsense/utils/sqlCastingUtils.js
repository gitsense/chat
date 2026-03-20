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

function castJsonExtract(t,a,s,E,c,T){["DATETIME","TEXT","INTEGER","REAL","BLOB"].includes(c.toUpperCase())||(console.warn(`castJsonExtract: Invalid dataType "${c}" specified. Using TEXT as fallback.`),c="TEXT");a="DATETIME"===c?`DATETIME(json_extract(${a}.${s}, '${E}'))`:`CAST(json_extract(${a}.${s}, '${E}') AS ${c.toUpperCase()})`;return t.raw(a+(T?" as "+T:""))}module.exports={castJsonExtract:castJsonExtract};
