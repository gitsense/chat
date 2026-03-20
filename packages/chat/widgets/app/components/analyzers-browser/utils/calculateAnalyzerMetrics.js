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

function calculateAnalyzerMetrics(e,a){var l=e.insights||{},a=a.overview||{},s=require("@gitsense/gsc-utils").DateUtils.formatAge;return{version:e.version||"N/A",itemsAnalyzed:void 0!==l.analyzed?l.analyzed:a.total_analyzed||0,reposAnalyzed:l.repos||0,modelsUsed:a.analyzer_models?a.analyzer_models.split(",").length:0,lastAnalysis:s(l.last_analysis)}}module.exports={calculateAnalyzerMetrics:calculateAnalyzerMetrics};
