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

function getTokens(e,t,o){var{meta:e,id:n,type:r}=e;if(!e)throw new Error("No meta data for item ID: "+n);var{tokens:n={}}=e;if("file content"!==t)throw new Error("getTokens: Unrecognized content type "+t);if("git-blob"!==r)throw new Error(`getTokens: Expecting a 'git-blob' item but found "${r}" instead`);if(null==n.content)throw new Error("getTokens: No token estimate for file content");return n.content.estimate}module.exports={getTokens:getTokens};
