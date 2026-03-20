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

function processInstructionsStream(e,t){var e=e||"",n={uniqueIdDetected:!1,roleDetected:!1,taskDetected:!1,markdownDetected:!1,jsonDetected:!1,charactersReceived:e.length};return e.includes("# New Analyzer Instructions")&&e.includes("Analyzer-ID:")&&(n.uniqueIdDetected=!0,n.uniqueId=e.split("\n").find(e=>e.includes("Analyzer-ID:")).split(":").pop().trim()),e.includes("## Role:")&&(n.roleDetected=!0),e.includes("## Task:")&&(n.taskDetected=!0),e.includes("```markdown")&&(n.markdownDetected=!0),e.includes("```json")&&(n.jsonDetected=!0),e.includes("```config")&&(n.configDetected=!0),n}module.exports={processInstructionsStream:processInstructionsStream};
