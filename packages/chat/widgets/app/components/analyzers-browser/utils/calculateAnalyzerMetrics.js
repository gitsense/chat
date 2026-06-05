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

function calculateAnalyzerMetrics(e,a){var l=e.insights||{},a=a.overview||{},s=require("@gitsense/gsc-utils").DateUtils.formatAge;return{version:e.version||"N/A",itemsAnalyzed:void 0!==l.analyzed?l.analyzed:a.total_analyzed||0,reposAnalyzed:l.repos||0,modelsUsed:a.analyzer_models?a.analyzer_models.split(",").length:0,lastAnalysis:s(l.last_analysis)}}module.exports={calculateAnalyzerMetrics:calculateAnalyzerMetrics};
