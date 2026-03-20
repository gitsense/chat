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

function formatVisibilityDuration(t){if(void 0===t)return"Never";if(t<0)return"Never";if(0===t)return"Immediately";if(t<60)return t+" minute"+(1!==t?"s":"");if(t<1440){let e=Math.floor(t/60);var o=t%60;return 0==o?e+" hour"+(1!==e?"s":""):`${e} hour${1!==e?"s":""} ${o} minute`+(1!=o?"s":"")}o=Math.floor(t/1440);let e=Math.floor(t%1440/60);return 0===e?o+" day"+(1!==o?"s":""):`${o} day${1!==o?"s":""} ${e} hour`+(1!==e?"s":"")}function formatImportCompletionMessage(e,t,o){var e=e.repositoryConfig,{repositoriesChat:o,ownerChat:i,repositoryChat:r,refChat:a}=o,{}=e,e=t.map(e=>`- ${e.name} (chat-id: ${e.id})`).join("\n");return`## Successfully Imported Data

Your files have been successfully imported and are now available in the Repositories tree. You can reference these files in your conversations or use them as context.

### Files Path:
${o.name} → ${i.name} → ${r.name} -> ${a.name}

### Files Imported:
${e}

### Load Instructions:

You can load these files into the conversation in two ways:

1. Click the "Review, load and add" link below to select specific files
2. Browse to the repository in the Repositories tree and select files directly
`}module.exports={formatVisibilityDuration:formatVisibilityDuration,formatImportCompletionMessage:formatImportCompletionMessage};
