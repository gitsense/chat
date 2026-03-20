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

function extractTags(r){if(!r||!Array.isArray(r))return[];let e=new Map;return r.forEach(r=>{r.tags&&Array.isArray(r.tags)&&r.tags.forEach(r=>{r&&"string"==typeof r&&e.set(r,(e.get(r)||0)+1)})}),Array.from(e.entries()).map(([r,e])=>({name:r,count:e})).sort((r,e)=>r.name.localeCompare(e.name))}function filterTags(r,e){if(!r||!Array.isArray(r))return[];let a=(e||"").trim().toLowerCase();return""===a?r:r.filter(r=>r.name&&r.name.toLowerCase().includes(a))}module.exports={extractTags:extractTags,filterTags:filterTags};
