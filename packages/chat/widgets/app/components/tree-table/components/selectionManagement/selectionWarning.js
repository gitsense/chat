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

function createSelectionWarning({state:t}){var e=document.createElement("div"),n=(e.className="selection-warning-row",e.style.display="none",document.createElement("div")),n=(n.className="warning-icon",n.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
        </svg>
    `,document.createElement("span"));n.className="warning-text",e.appendChild(document.createTextNode(" ")),e.appendChild(n);let a={"files-working-directory":"Token estimates based on imported files","overview-short":"Not all chats have both overview types available","overview-long":"Not all chats have both overview types available"};return{element:e,update:function(){t.selectionOptions.selectedType,t.selectionOptions.selectedOption;const e=t.selectionOptions.selectedType+"-"+t.selectionOptions.selectedOption;t.getSelectedNodes(),a,e}}}module.exports={createSelectionWarning:createSelectionWarning};
