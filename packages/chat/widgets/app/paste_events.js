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

function handlePasteEvents(t,n){if(!(t instanceof HTMLTextAreaElement))throw new Error("First argument must be a textarea element");if("function"!=typeof n)throw new Error("Second argument must be a callback function");let e=e=>{e={originalEvent:e,timestamp:new Date,pastedText:e.clipboardData.getData("text"),cursorPosition:{start:t.selectionStart,end:t.selectionEnd},textareaContent:{before:t.value.substring(0,t.selectionStart),after:t.value.substring(t.selectionEnd)}};n(e)};return t.addEventListener("paste",e),()=>{t.removeEventListener("paste",e)}}"undefined"!=typeof module&&module.exports?module.exports=handlePasteEvents:"function"==typeof define&&define.amd?define([],function(){return handlePasteEvents}):window.handlePasteEvents=handlePasteEvents,module.exports={handlePasteEvents:handlePasteEvents};
