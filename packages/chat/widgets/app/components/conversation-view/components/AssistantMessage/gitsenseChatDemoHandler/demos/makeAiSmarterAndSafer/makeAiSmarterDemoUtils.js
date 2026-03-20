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

let MessageUtils=require("@gitsense/gsc-utils").MessageUtils,chatApi=require("../../../../../Dependencies").chatApi,MessageService=require("../../../../../services/MessageService");async function startPollingForAnalyzer(a,l,n,s,o,i=18e4){var e=Date.now()-l,t=Math.floor(e/1e3);if(n.textContent=t,i<e)o.timedout();else{let r=setInterval(async()=>{var e=Date.now()-l,t=Math.floor(e/1e3);n.textContent=t;try{await chatApi.getAnalyzerSchema(s.widget,a)?(clearInterval(r),o.created()):i<e&&(clearInterval(r),o.timedout())}catch(e){console.error("Error polling for analyzer:",e),clearInterval(r)}},2e3)}}module.exports={startPollingForAnalyzer:startPollingForAnalyzer};
