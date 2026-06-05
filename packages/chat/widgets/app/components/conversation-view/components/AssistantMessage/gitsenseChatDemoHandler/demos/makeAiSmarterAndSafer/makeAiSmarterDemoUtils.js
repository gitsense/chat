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

let MessageUtils=require("@gitsense/gsc-utils").MessageUtils,chatApi=require("../../../../../Dependencies").chatApi,MessageService=require("../../../../../services/MessageService");async function startPollingForAnalyzer(a,l,n,s,o,i=18e4){var e=Date.now()-l,t=Math.floor(e/1e3);if(n.textContent=t,i<e)o.timedout();else{let r=setInterval(async()=>{var e=Date.now()-l,t=Math.floor(e/1e3);n.textContent=t;try{await chatApi.getAnalyzerSchema(s.widget,a)?(clearInterval(r),o.created()):i<e&&(clearInterval(r),o.timedout())}catch(e){console.error("Error polling for analyzer:",e),clearInterval(r)}},2e3)}}module.exports={startPollingForAnalyzer:startPollingForAnalyzer};
