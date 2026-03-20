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

let buildInitialQuery=require("./buildInitialQuery").buildInitialQuery,applyScope=require("./applyScope").applyScope,composeCTEs=require("./composeCTEs").composeCTEs,applyFinalQueryOptions=require("./applyFinalQueryOptions").applyFinalQueryOptions,DEBUG_BUILD_STANDARD_QUERY="TRUE"===process.env.GSC_DEBUG_QUERY?.toUpperCase();async function buildStandardSearchQuery(e,a,r,l,i){DEBUG_BUILD_STANDARD_QUERY&&(console.log("BUILD STANDARD SEARCH QUERY"),console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>"),console.log(JSON.stringify({db:e,parsedQuery:a,currentChatId:r,finalConsolidatedOutputs:l,parsedOutputs:i},null,2)),console.log("<<<<<<<<<<<<<<<<<<<<<<<<<"));var l=await buildInitialQuery(e,a,i,r),{baseQueryBuilder:u,matchCTEs:t,mainTables:o}=l,u={baseQueryBuilder:(await applyScope(e,u,a,r)).queryBuilder,matchCTEs:t},r=(await composeCTEs(e,u,o,a,i,l.tableFilters,l.filterChatIdsCteName,l.filterCteQuery)).finalQuery;return{finalQuery:r}}module.exports={buildStandardSearchQuery:buildStandardSearchQuery};
