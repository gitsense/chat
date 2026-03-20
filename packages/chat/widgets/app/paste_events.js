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

function handlePasteEvents(t,n){if(!(t instanceof HTMLTextAreaElement))throw new Error("First argument must be a textarea element");if("function"!=typeof n)throw new Error("Second argument must be a callback function");let e=e=>{e={originalEvent:e,timestamp:new Date,pastedText:e.clipboardData.getData("text"),cursorPosition:{start:t.selectionStart,end:t.selectionEnd},textareaContent:{before:t.value.substring(0,t.selectionStart),after:t.value.substring(t.selectionEnd)}};n(e)};return t.addEventListener("paste",e),()=>{t.removeEventListener("paste",e)}}"undefined"!=typeof module&&module.exports?module.exports=handlePasteEvents:"function"==typeof define&&define.amd?define([],function(){return handlePasteEvents}):window.handlePasteEvents=handlePasteEvents,module.exports={handlePasteEvents:handlePasteEvents};
