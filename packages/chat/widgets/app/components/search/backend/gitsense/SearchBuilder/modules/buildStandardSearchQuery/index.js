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

let buildInitialQuery=require("./buildInitialQuery").buildInitialQuery,applyScope=require("./applyScope").applyScope,composeCTEs=require("./composeCTEs").composeCTEs,applyFinalQueryOptions=require("./applyFinalQueryOptions").applyFinalQueryOptions,DEBUG_BUILD_STANDARD_QUERY="TRUE"===process.env.GSC_DEBUG_QUERY?.toUpperCase();async function buildStandardSearchQuery(e,a,r,l,i){DEBUG_BUILD_STANDARD_QUERY&&(console.log("BUILD STANDARD SEARCH QUERY"),console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>"),console.log(JSON.stringify({db:e,parsedQuery:a,currentChatId:r,finalConsolidatedOutputs:l,parsedOutputs:i},null,2)),console.log("<<<<<<<<<<<<<<<<<<<<<<<<<"));var l=await buildInitialQuery(e,a,i,r),{baseQueryBuilder:u,matchCTEs:t,mainTables:o}=l,u={baseQueryBuilder:(await applyScope(e,u,a,r)).queryBuilder,matchCTEs:t},r=(await composeCTEs(e,u,o,a,i,l.tableFilters,l.filterChatIdsCteName,l.filterCteQuery)).finalQuery;return{finalQuery:r}}module.exports={buildStandardSearchQuery:buildStandardSearchQuery};
