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

class KeywordsFilterLogic{constructor(){}extractFilterData(r){let e={};return r&&r.forEach(r=>{r.keywords&&Array.isArray(r.keywords)&&r.keywords.forEach(r=>{"string"==typeof r&&""!==r.trim()&&(r=r.trim(),e[r]=(e[r]||0)+1)})}),e}applyFilter(r,e){if(!e||0===e.size)return!0;if(r.keywords&&Array.isArray(r.keywords)&&0!==r.keywords.length)for(var o of r.keywords)if(e.has(o.trim()))return!0;return!1}}module.exports={KeywordsFilterLogic:KeywordsFilterLogic};
