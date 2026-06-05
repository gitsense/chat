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

let DateUtils=require("@gitsense/gsc-utils").DateUtils,{TIME_DISPLAYS,TIME_FORMATS}=require("../constants");function formatDateByMode(t,e=TIME_DISPLAYS.VIEWED,a=TIME_FORMATS.RELATIVE){if(!t)return"N/A";let r;if(!(r=e===TIME_DISPLAYS.VIEWED&&(t.last_viewed||t.updated_at)||t.created_at))return"N/A";switch(a){case TIME_FORMATS.ABSOLUTE:return formatAbsoluteDate(r);case TIME_FORMATS.SHORT_RELATIVE:return formatShortRelativeDate(r);default:TIME_FORMATS.RELATIVE;return DateUtils.formatAge(r)}}function formatAbsoluteDate(t){if(!t)return"N/A";try{var e=new Date(DateUtils.normalizeDateTime(t));return e.getFullYear()+`-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")} ${String(e.getHours()).padStart(2,"0")}:`+String(e.getMinutes()).padStart(2,"0")}catch(t){return console.error("Error formatting absolute date:",t),"Invalid date"}}function formatShortRelativeDate(t){if(!t)return"N/A";try{var e=DateUtils.getTimeDifference(t);return DateUtils.formatTimeDifference(e).replace(" ago","")}catch(t){return console.error("Error formatting short relative date:",t),"Invalid date"}}function isDateInRange(t,e){if(!t||!e)return!1;try{var a=new Date(DateUtils.normalizeDateTime(t)),r=new Date,n=new Date(r.getFullYear(),r.getMonth(),r.getDate()),i=new Date(n);switch(i.setDate(i.getDate()-1),e){case"within-last-hour":return r-a<36e5;case"within-last-4-hours":return r-a<144e5;case"within-last-24-hours":return r-a<864e5;case"within-last-7-days":return r-a<6048e5;case"yesterday-only":return new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime()===i.getTime();default:return!1}}catch(t){return console.error("Error checking date range:",t),!1}}function formatTimeRange(t){return{"within-last-hour":"Within last hour","within-last-4-hours":"Within last 4 hours","within-last-24-hours":"Within last 24 hours","within-last-7-days":"Within last 7 days","yesterday-only":"Yesterday only","within-last-2-days":"Within last 2 days","within-last-3-days":"Within last 3 days","within-last-4-days":"Within last 4 days","within-last-5-days":"Within last 5 days","within-last-6-days":"Within last 6 days"}[t]||t}function getMostRecentDate(t){return t?t.last_viewed||t.last_message&&t.last_message.updated_at||t.updated_at||t.created_at:null}function compareChatsByDate(t,e,a="last_viewed",r="desc"){t=t[a]||getMostRecentDate(t),a=e[a]||getMostRecentDate(e);return t||a?t?a?(e=DateUtils.compareDates(t,a),"desc"===r?-e:e):-1:1:0}module.exports={formatDateByMode:formatDateByMode,formatAbsoluteDate:formatAbsoluteDate,formatShortRelativeDate:formatShortRelativeDate,isDateInRange:isDateInRange,formatTimeRange:formatTimeRange,getMostRecentDate:getMostRecentDate,compareChatsByDate:compareChatsByDate};
