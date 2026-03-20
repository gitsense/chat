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

function createRegenerateRequestMessage({invalidPatchContent:e,errorMessage:t,errorType:r,sourceBlockUUID:a,targetBlockUUID:o}){if(e&&t&&r&&a&&o)return`
Regeneration Request for Patch: ${o}

**Error Type:** ${r}
**Details:** ${t}

The patch was intended for the source code block with UUID: ${a}.

Here is the content of the failed patch:
\`\`\`diff
${e}
\`\`\`

Please regenerate the patch, ensuring the following:
1.  **Correct Context:** Verify that all context lines (\`@@ ... @@\` sections) exactly match the content of the source code block (${a}). Pay close attention to whitespace and line endings.
2.  **Valid Format:** Ensure the patch strictly adheres to the required context-based patch format, including metadata, markers (\`@=\`, \`@@\`), and structure.
3.  **Single Logical Change (if applicable):** If the original patch attempted multiple complex changes, consider breaking it down into smaller, sequential patches. For now, please provide one corrected patch addressing the original goal.
4.  **Metadata:** Use the original \`${a}\` as the \`Source-Block-UUID\`. Increment the version number appropriately from the *source* version. Update the author list correctly.

Generate **only** the corrected patch file content in a single diff code block. Do not include explanatory text before or after the code block unless necessary to clarify the changes made *compared to the failed patch*.
`.trim();throw new Error("Missing required parameters for createRegenerateRequestMessage. Need: invalidPatchContent, errorMessage, errorType, sourceBlockUUID, targetBlockUUID.")}module.exports={createRegenerateRequestMessage:createRegenerateRequestMessage};
