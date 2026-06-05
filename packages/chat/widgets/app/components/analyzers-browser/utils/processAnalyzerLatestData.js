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

function processAnalyzerLatestData(e,{searchTerm:a="",currentPage:t=1,itemsPerPage:r=25}={}){var e=(e||[]).slice().sort((e,a)=>{e=e.analyzed_at?new Date(e.analyzed_at).getTime():0;return(a.analyzed_at?new Date(a.analyzed_at).getTime():0)-e}),e=""===a.trim()?e:e.filter(e=>e.path&&e.path.toLowerCase().includes(a.toLowerCase())),s=e.length,n=Math.ceil(s/r)||1,t=Math.max(1,Math.min(t,n)),l=(t-1)*r;return{paginatedData:e.slice(l,l+r),totalItems:s,totalPages:n,currentPage:t}}module.exports={processAnalyzerLatestData:processAnalyzerLatestData};
