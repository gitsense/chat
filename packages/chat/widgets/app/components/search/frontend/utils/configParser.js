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

let crypto=require("crypto"),DEFAULT_ENGINE="gitsense";function parseConfig(o){var e=require("../engines");if(!o)return console.error("Search tool config is missing."),null;o.instanceId||("function"==typeof crypto.randomUUID?o.instanceId=crypto.randomUUID():(console.warn("crypto.randomUUID not available, generating a simple fallback ID."),o.instanceId="search-"+Date.now()+"-"+Math.random().toString(36).substr(2,9))),"string"==typeof o.engine&&o.engine||(console.warn("Search tool config 'engine' is missing or invalid. Defaulting to '${DEFAULT_ENGINE}'."),o.engine=DEFAULT_ENGINE);var n,t=o.engine,e=e[t];return e&&"object"==typeof e&&null!==e&&e.actions&&"function"==typeof e.validateCriteria&&"function"==typeof e.processSearch&&"function"==typeof e.renderResults&&"function"==typeof e.getLayout?(o.engine=e,o.engineName=t,o.actions=e.actions,"string"==typeof o.layout&&(n=o.layout,o.layout=e.getLayout(n),o.layoutName=n),Array.isArray(o.layout)||(console.error(`Search tool config: Layout "${o.layoutName||"specified layout"}" not found or is invalid for engine "${t}". Falling back to engine's "default".`),o.layout=e.getLayout("default"),o.layoutName="default"),void 0===o.sections||Array.isArray(o.sections)?void 0===o.style||"object"==typeof o.style&&null!==o.style?(Array.isArray(o.layout)&&o.layout.forEach(o=>{"row"===o.type&&Array.isArray(o.elements)}),Array.isArray(o.layout)?o:(console.error("Search tool config: No valid layout found, even after attempting fallback to engine's 'default'."),null)):(console.error("Search tool config 'style' must be an object if provided."),null):(console.error("Search tool config 'sections' must be an array if provided."),null)):(console.error(`Search tool config: Engine "${t}" not found or is invalid. Cannot load engine object.`),null)}module.exports={parseConfig:parseConfig};
