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

class PathFilterLogic{constructor(){}extractFilterData(t){return null}applyFilter(t,e){if(!e||!e.patterns||0===e.patterns.length)return!0;var r,a=t.path||"";for(r of e.patterns.map(t=>{let e=t,r=(e=e.includes("*")?e:`*${e}*`).replace(/[.+?^${}()|[\]\\]/g,"\\$&");return r=r.replace(/\*/g,".*"),new RegExp(`^${r}$`,"i")}))if(r.test(a))return!0;return!1}}module.exports={PathFilterLogic:PathFilterLogic};
