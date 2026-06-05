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

function compareByField(e,t,a,r="asc"){let s,c;switch(a){case"level":s=e.level||0,c=t.level||0;break;case"last_activity":s=e.last_activity||e.last_viewed||e.updated_at||e.created_at,c=t.last_activity||t.last_viewed||t.updated_at||t.created_at;break;case"last_viewed":s=e.last_viewed||e.updated_at||e.created_at,c=t.last_viewed||t.updated_at||t.created_at;break;case"created_at":s=e.created_at,c=t.created_at;break;case"updated_at":s=e.updated_at||e.created_at,c=t.updated_at||t.created_at;break;case"name":s=e.name||"",c=t.name||"";break;case"message_count":s=e.message_count||0,c=t.message_count||0;break;case"view_count":s=e.view_count||0,c=t.view_count||0;break;default:s=e[a],c=t[a]}if(null==s)return"desc"===r?1:-1;if(null==c)return"desc"===r?-1:1;let i;var n,d;return i="string"==typeof s&&"string"==typeof c?s.localeCompare(c):s instanceof Date||c instanceof Date||"string"==typeof s&&s.includes("T")||"string"==typeof c&&c.includes("T")?(n=s instanceof Date?s:new Date(s),d=c instanceof Date?c:new Date(c),n.getTime()-d.getTime()):"number"==typeof s&&"number"==typeof c?s-c:String(s).localeCompare(String(c)),"desc"===r?-i:i}function sortChats(e,r){return e&&Array.isArray(e)?r&&Array.isArray(r)&&0!==r.length?[...e].sort((e,t)=>{for(var a of r){a=compareByField(e,t,a.field,a.order);if(0!==a)return a}return 0}):[...e]:[]}function sortChatsByLastActivity(e){return sortChats(e,[{field:"last_activity",order:"desc"}])}module.exports={sortChats:sortChats,sortChatsByLastActivity:sortChatsByLastActivity,compareByField:compareByField};
