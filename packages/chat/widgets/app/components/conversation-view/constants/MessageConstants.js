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

let showFullCodeMsg=`### Show Full Code

#### File Formatting Requirements:

1.  **File Section Header:** Start with a clear file section header: \`#### File: <path to file>\`
2.  **Previous Block-UUID:**  **If a previous Block-UUID exists for the file, it MUST be included immediately after the file section header.** This is crucial for diffing and version control.
3.  **Complete Code Block:** Provide the complete code block for the file.

#### Workflow Instructions:

*   Do not confirm or announce that you will process the request. Just follow the instructions.
*   **Analyze ONLY the LAST message to identify any files with incomplete code.**
*   If there are no incomplete code, let the user know. If there is incomplete code, ask the user which of the identified files they would like to see the complete code for. List the files for the user's convenience.
*   Wait for user response.
*   For each file the user requests:
    *   Format the response according to the "File Formatting Requirements" above.
    *   **Ensure the previous Block-UUID is included if one exists.**
    *   Provide the complete code block for the file.
*   **If there are multiple files to provide and a risk of exceeding token limits, generate each file in a separate response.**
*   After providing the complete code for all requested files, if there are potentially other incomplete files that were not explicitly mentioned, ask: "Are there any other files for which I should provide the complete code? Please answer one file at a time to stay within token limits."
*   If there are no more files to show, do not ask for other files. Ensure the response is optimized for easy copying and pasting.`,MESSAGE_TYPES={USER:"user",ASSISTANT:"assistant",SYSTEM:"system"},UI_CONSTANTS={FOLD_TEXT:"Fold",UNFOLD_TEXT:"Unfold",COPY_TEXT:"Copy",COPIED_TEXT:"Copied!",COPY_FAILED_TEXT:"Failed to copy"},MODEL_CONSTANTS={GITSENSE_NOTES:"GitSense Notes"};module.exports={showFullCodeMsg:showFullCodeMsg,MESSAGE_TYPES:MESSAGE_TYPES,UI_CONSTANTS:UI_CONSTANTS,MODEL_CONSTANTS:MODEL_CONSTANTS};
