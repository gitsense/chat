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

function getTokens(e,t,o){var{meta:e,id:n,type:r}=e;if(!e)throw new Error("No meta data for item ID: "+n);var{tokens:n={}}=e;if("file content"!==t)throw new Error("getTokens: Unrecognized content type "+t);if("git-blob"!==r)throw new Error(`getTokens: Expecting a 'git-blob' item but found "${r}" instead`);if(null==n.content)throw new Error("getTokens: No token estimate for file content");return n.content.estimate}module.exports={getTokens:getTokens};
