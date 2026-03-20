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

function processAnalyzerLatestData(e,{searchTerm:a="",currentPage:t=1,itemsPerPage:r=25}={}){var e=(e||[]).slice().sort((e,a)=>{e=e.analyzed_at?new Date(e.analyzed_at).getTime():0;return(a.analyzed_at?new Date(a.analyzed_at).getTime():0)-e}),e=""===a.trim()?e:e.filter(e=>e.path&&e.path.toLowerCase().includes(a.toLowerCase())),s=e.length,n=Math.ceil(s/r)||1,t=Math.max(1,Math.min(t,n)),l=(t-1)*r;return{paginatedData:e.slice(l,l+r),totalItems:s,totalPages:n,currentPage:t}}module.exports={processAnalyzerLatestData:processAnalyzerLatestData};
