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

let MS_PER_HOUR=36e5,MS_PER_DAY=864e5,MAX_HOURS_GROUPING=48,MAX_DAYS_GROUPING=7;function getChronologicalGroup(_,o=Date.now()){_.endsWith("Z")||(_+="Z");o-=new Date(_).getTime();return o<0?"Future":(_=Math.floor(o/MS_PER_HOUR))<MAX_HOURS_GROUPING?0===_?"Less than 1 hour ago":_+` hour${1<_?"s":""} ago`:(_=Math.floor(o/MS_PER_DAY))<MAX_DAYS_GROUPING?_+` day${1<_?"s":""} ago`:"more than 7 days ago"}module.exports={getChronologicalGroup:getChronologicalGroup,MS_PER_HOUR:MS_PER_HOUR,MS_PER_DAY:MS_PER_DAY,MAX_HOURS_GROUPING:MAX_HOURS_GROUPING,MAX_DAYS_GROUPING:MAX_DAYS_GROUPING};
