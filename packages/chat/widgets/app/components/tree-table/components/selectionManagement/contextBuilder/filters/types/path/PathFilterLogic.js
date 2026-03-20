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

class PathFilterLogic{constructor(){}extractFilterData(t){return null}applyFilter(t,e){if(!e||!e.patterns||0===e.patterns.length)return!0;var r,a=t.path||"";for(r of e.patterns.map(t=>{let e=t,r=(e=e.includes("*")?e:`*${e}*`).replace(/[.+?^${}()|[\]\\]/g,"\\$&");return r=r.replace(/\*/g,".*"),new RegExp(`^${r}$`,"i")}))if(r.test(a))return!0;return!1}}module.exports={PathFilterLogic:PathFilterLogic};
