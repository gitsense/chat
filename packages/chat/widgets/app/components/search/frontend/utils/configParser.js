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

let crypto=require("crypto"),DEFAULT_ENGINE="gitsense";function parseConfig(o){var e=require("../engines");if(!o)return console.error("Search tool config is missing."),null;o.instanceId||("function"==typeof crypto.randomUUID?o.instanceId=crypto.randomUUID():(console.warn("crypto.randomUUID not available, generating a simple fallback ID."),o.instanceId="search-"+Date.now()+"-"+Math.random().toString(36).substr(2,9))),"string"==typeof o.engine&&o.engine||(console.warn("Search tool config 'engine' is missing or invalid. Defaulting to '${DEFAULT_ENGINE}'."),o.engine=DEFAULT_ENGINE);var n,t=o.engine,e=e[t];return e&&"object"==typeof e&&null!==e&&e.actions&&"function"==typeof e.validateCriteria&&"function"==typeof e.processSearch&&"function"==typeof e.renderResults&&"function"==typeof e.getLayout?(o.engine=e,o.engineName=t,o.actions=e.actions,"string"==typeof o.layout&&(n=o.layout,o.layout=e.getLayout(n),o.layoutName=n),Array.isArray(o.layout)||(console.error(`Search tool config: Layout "${o.layoutName||"specified layout"}" not found or is invalid for engine "${t}". Falling back to engine's "default".`),o.layout=e.getLayout("default"),o.layoutName="default"),void 0===o.sections||Array.isArray(o.sections)?void 0===o.style||"object"==typeof o.style&&null!==o.style?(Array.isArray(o.layout)&&o.layout.forEach(o=>{"row"===o.type&&Array.isArray(o.elements)}),Array.isArray(o.layout)?o:(console.error("Search tool config: No valid layout found, even after attempting fallback to engine's 'default'."),null)):(console.error("Search tool config 'style' must be an object if provided."),null):(console.error("Search tool config 'sections' must be an array if provided."),null)):(console.error(`Search tool config: Engine "${t}" not found or is invalid. Cannot load engine object.`),null)}module.exports={parseConfig:parseConfig};
