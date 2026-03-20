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

let{DEFAULT_CONTENT_TYPE,DEFAULT_CONTENT_OPTION}=require("../constants");function getStoredOptions(t){if(!t)return{contentType:DEFAULT_CONTENT_TYPE,contentOption:DEFAULT_CONTENT_OPTION};try{var o=localStorage.getItem(t);return o?JSON.parse(o):{contentType:DEFAULT_CONTENT_TYPE,contentOption:DEFAULT_CONTENT_OPTION}}catch(t){return console.error("Error retrieving stored options:",t),{contentType:DEFAULT_CONTENT_TYPE,contentOption:DEFAULT_CONTENT_OPTION}}}function saveOptions(t,o){if(t)try{localStorage.setItem(t,JSON.stringify(o))}catch(t){console.error("Error saving options to local storage:",t)}}module.exports={getStoredOptions:getStoredOptions,saveOptions:saveOptions};
