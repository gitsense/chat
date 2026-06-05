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

let MS_PER_HOUR=36e5,MS_PER_DAY=864e5,MAX_HOURS_GROUPING=48,MAX_DAYS_GROUPING=7;function getChronologicalGroup(_,o=Date.now()){_.endsWith("Z")||(_+="Z");o-=new Date(_).getTime();return o<0?"Future":(_=Math.floor(o/MS_PER_HOUR))<MAX_HOURS_GROUPING?0===_?"Less than 1 hour ago":_+` hour${1<_?"s":""} ago`:(_=Math.floor(o/MS_PER_DAY))<MAX_DAYS_GROUPING?_+` day${1<_?"s":""} ago`:"more than 7 days ago"}module.exports={getChronologicalGroup:getChronologicalGroup,MS_PER_HOUR:MS_PER_HOUR,MS_PER_DAY:MS_PER_DAY,MAX_HOURS_GROUPING:MAX_HOURS_GROUPING,MAX_DAYS_GROUPING:MAX_DAYS_GROUPING};
