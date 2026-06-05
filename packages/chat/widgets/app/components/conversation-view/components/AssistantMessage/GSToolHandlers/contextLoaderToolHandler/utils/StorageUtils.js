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

let{DEFAULT_CONTENT_TYPE,DEFAULT_CONTENT_OPTION}=require("../constants");function getStoredOptions(t){if(!t)return{contentType:DEFAULT_CONTENT_TYPE,contentOption:DEFAULT_CONTENT_OPTION};try{var o=localStorage.getItem(t);return o?JSON.parse(o):{contentType:DEFAULT_CONTENT_TYPE,contentOption:DEFAULT_CONTENT_OPTION}}catch(t){return console.error("Error retrieving stored options:",t),{contentType:DEFAULT_CONTENT_TYPE,contentOption:DEFAULT_CONTENT_OPTION}}}function saveOptions(t,o){if(t)try{localStorage.setItem(t,JSON.stringify(o))}catch(t){console.error("Error saving options to local storage:",t)}}module.exports={getStoredOptions:getStoredOptions,saveOptions:saveOptions};
