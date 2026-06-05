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

function extractTags(r){if(!r||!Array.isArray(r))return[];let e=new Map;return r.forEach(r=>{r.tags&&Array.isArray(r.tags)&&r.tags.forEach(r=>{r&&"string"==typeof r&&e.set(r,(e.get(r)||0)+1)})}),Array.from(e.entries()).map(([r,e])=>({name:r,count:e})).sort((r,e)=>r.name.localeCompare(e.name))}function filterTags(r,e){if(!r||!Array.isArray(r))return[];let a=(e||"").trim().toLowerCase();return""===a?r:r.filter(r=>r.name&&r.name.toLowerCase().includes(a))}module.exports={extractTags:extractTags,filterTags:filterTags};
