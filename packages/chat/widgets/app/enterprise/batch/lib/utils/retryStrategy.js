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

let fs=require("fs"),InvalidInputError=require("../errors").InvalidInputError,_configPath=null,_cachedConfig=null,_lastMtime=0;function _ensureConfigIsFresh(){if(_configPath)try{var t=fs.statSync(_configPath);if(t.mtimeMs>_lastMtime){var e=fs.readFileSync(_configPath,"utf8"),a=JSON.parse(e);if(!a||"object"!=typeof a)throw new Error("Configuration is not a valid object.");_cachedConfig=a,_lastMtime=t.mtimeMs,console.log("[RetryStrategy] Batch configuration reloaded successfully from "+_configPath)}}catch(t){console.warn(`[RetryStrategy] Failed to reload config: ${t.message}. Using last known good configuration.`)}}function loadConfig(t){if(!t||"string"!=typeof t)throw new InvalidInputError("Configuration path must be a non-empty string.");if(!fs.existsSync(t))throw new InvalidInputError(`Batch configuration file not found at: ${t}
`+"Please ensure 'batch-config.json' exists in your data directory. You can copy 'batch-config.example' to 'batch-config.json' to get started.");_configPath=t;try{if(_ensureConfigIsFresh(),!_cachedConfig)throw new InvalidInputError("Configuration loaded but cache is empty.");console.log("[RetryStrategy] Configuration initialized successfully from "+_configPath)}catch(t){throw new InvalidInputError("Failed to load initial configuration: "+t.message)}}function evaluateRetry(t,e){if(_ensureConfigIsFresh(),!_cachedConfig||!_cachedConfig.retryStrategies)return{action:"fail",reason:"Configuration missing or invalid."};var a,i;for(a of _cachedConfig.retryStrategies)if(_matchesStrategy(t,a.match)){if("fail"===a.action)return{action:"fail",strategyName:a.name,reason:a.reason||"Strategy dictates failure."};if("retry"===a.action)return e>=a.maxAttempts?{action:"fail",strategyName:a.name,reason:`Max attempts (${a.maxAttempts}) reached.`}:{action:"retry",delayMs:i=_calculateDelay(a.backoffStrategy,a.initialDelayMs,e),strategyName:a.name,reason:`Retry allowed. Waiting ${i}ms.`}}return{action:"fail",reason:"No matching retry strategy found."}}function evaluateCircuitBreaker(t){var e,a;return _ensureConfigIsFresh(),_cachedConfig&&_cachedConfig.circuitBreaker&&({maxConsecutiveGroupFailures:e,actionOnTrip:a}=_cachedConfig.circuitBreaker,e<=t)?{shouldTrip:!0,action:a||"CANCEL_JOB",threshold:e}:{shouldTrip:!1}}function getTimingSettings(){return _ensureConfigIsFresh(),_cachedConfig?.timing||_cachedConfig?.processing||{}}function getRateLimitSettings(){return _ensureConfigIsFresh(),_cachedConfig?.rateLimiting||{}}function _matchesStrategy(t,e){if(!t)return!1;if(void 0!==e.httpStatus&&t.statusCode!==e.httpStatus)return!1;if(e.httpStatusRange){var[a,i]=e.httpStatusRange.split("-").map(Number);if(!t.statusCode||t.statusCode<a||t.statusCode>i)return!1}return!(e.errorType&&t.errorType!==e.errorType||e.exclude&&0<e.exclude.length&&e.exclude.includes(t.statusCode))}function _calculateDelay(t,e,a){switch(t){case"exponential":return e*Math.pow(2,a-1);case"linear":return e*a;default:return e}}module.exports={loadConfig:loadConfig,evaluateRetry:evaluateRetry,evaluateCircuitBreaker:evaluateCircuitBreaker,getTimingSettings:getTimingSettings,getRateLimitSettings:getRateLimitSettings};
