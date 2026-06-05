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

let{InvalidInputError,AnalyzerNotFoundError}=require("../errors"),getAnalyzers=require("@gitsense/gsc-utils").AnalyzerUtils.getAnalyzers;async function validateAnalyzerId(e,r){if("string"!=typeof e||""===e.trim())throw new InvalidInputError("Analyzer ID is required and must be a non-empty string.");if(3!==e.split("::").length)throw new InvalidInputError(`Invalid analyzer ID format: '${e}'. Expected 'analyzer_name::content_type::instructions_type'.`);if("string"!=typeof r||""===r.trim())throw new InvalidInputError("Analyze messages base path is required for analyzer ID validation.");let t;try{t=await getAnalyzers(r)}catch(r){throw new InvalidInputError("Failed to retrieve available analyzers for validation: "+r.message)}if(!t.some(r=>r.id===e))throw new AnalyzerNotFoundError(e)}module.exports={validateAnalyzerId:validateAnalyzerId};
