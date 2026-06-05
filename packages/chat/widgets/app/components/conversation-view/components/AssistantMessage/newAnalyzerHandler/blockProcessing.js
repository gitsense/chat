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

function processInstructionsStream(e,t){var e=e||"",n={uniqueIdDetected:!1,roleDetected:!1,taskDetected:!1,markdownDetected:!1,jsonDetected:!1,charactersReceived:e.length};return e.includes("# New Analyzer Instructions")&&e.includes("Analyzer-ID:")&&(n.uniqueIdDetected=!0,n.uniqueId=e.split("\n").find(e=>e.includes("Analyzer-ID:")).split(":").pop().trim()),e.includes("## Role:")&&(n.roleDetected=!0),e.includes("## Task:")&&(n.taskDetected=!0),e.includes("```markdown")&&(n.markdownDetected=!0),e.includes("```json")&&(n.jsonDetected=!0),e.includes("```config")&&(n.configDetected=!0),n}module.exports={processInstructionsStream:processInstructionsStream};
