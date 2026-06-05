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

let InvalidInputError=require("../errors").InvalidInputError;function validateCreateBatchJobParams(r,e,t,a){if("string"!=typeof r||""===r.trim())throw new InvalidInputError("Model name is required and must be a non-empty string.");if(!Array.isArray(e)||0===e.length)throw new InvalidInputError("Groups array is required and cannot be empty.");for(var n of e){if("object"!=typeof n||null===n)throw new InvalidInputError("Each group must be an object.");if("number"!=typeof n.id||!Number.isInteger(n.id)||n.id<=0)throw new InvalidInputError('Each group must have a valid positive integer "id".');if(!Array.isArray(n.chatIds)||0===n.chatIds.length)throw new InvalidInputError(`Group ${n.id} must have a non-empty "chatIds" array.`);for(var i of n.chatIds)if("number"!=typeof i||!Number.isInteger(i))throw new InvalidInputError(`Group ${n.id} contains an invalid "chatId": ${i}.`)}if("object"!=typeof t||null===t)throw new InvalidInputError("Options must be an object.");if(void 0!==t.temperature&&("number"!=typeof t.temperature||t.temperature<0||1<t.temperature))throw new InvalidInputError("Temperature, if provided, must be a number between 0 and 1.");if("number"!=typeof a||!Number.isInteger(a)||a<=0)throw new InvalidInputError("Trigger chat ID is required and must be a positive integer.")}function validateCreateGenericBatchJobParams(r,e,t,a,n,i,o){if("string"!=typeof r||""===r.trim())throw new InvalidInputError("Batch type is required and must be a non-empty string.");var d=["analyze"];if(!d.includes(r))throw new InvalidInputError(`Unsupported batch type: '${r}'. Supported types: ${d.join(", ")}.`);if("realtime"!==o&&"scheduled"!==o)throw new InvalidInputError("Processing type must be either 'realtime' or 'scheduled'.");if("analyze"===r&&("string"!=typeof e||""===e.trim()))throw new InvalidInputError("Analyzer ID is required and must be a non-empty string for analyze batch jobs.");validateCreateBatchJobParams(t,a,n,i)}function validateBatchJobId(r){if("number"!=typeof r||!Number.isInteger(r)||r<=0)throw new InvalidInputError("Batch job ID is required and must be a positive integer.")}module.exports={validateCreateBatchJobParams:validateCreateBatchJobParams,validateCreateGenericBatchJobParams:validateCreateGenericBatchJobParams,validateBatchJobId:validateBatchJobId};
