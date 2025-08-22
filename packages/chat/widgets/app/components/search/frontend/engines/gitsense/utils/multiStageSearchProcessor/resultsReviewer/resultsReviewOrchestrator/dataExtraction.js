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
 * Copyright (c) 2025 GitSense. All rights reserved.
 */

let{ChatUtils,MessageUtils}=require("@gitsense/gsc-utils");function extractRawResultsData(e){var a={};if(e&&e.messages&&0<e.messages.length){var s=ChatUtils.getChatMessages(e),e=s[0];let t=[];try{var r=JSON.parse(e.message);r&&Array.isArray(r.queries)&&(t=r.queries)}catch(e){console.error("Failed to parse executed queries from results chat:",e)}for(let e=1;e<s.length;e++){var i=s[e];try{let s=JSON.parse(i.message);var _=t.find(e=>e.query===s.query);let e=null;_?e=_.type:(console.warn("Could not find corresponding query type for result message:",s),s.searchCriteria?.profile?e=s.searchCriteria.profile:console.error("Unable to determine search type for raw result message.")),e&&("meta-insights"===e?a.hasOwnProperty(e)?Array.isArray(a[e])?a[e].push(s.results):a[e]=[a[e],s.results]:a[e]=s.results:a.hasOwnProperty(e)?Array.isArray(a[e])?a[e].push(s):a[e]=[a[e],s]:a[e]=s)}catch(e){console.error(`Failed to parse raw search results from message ${i.id}:`,e)}}}return a}function identifyUniqueItems(a){let n=new Map;function e(e,s){var t=a[e];t&&"meta-insights"!==e&&(Array.isArray(t)?t:[t]).forEach(e=>{e.results&&e.results.messages&&e.results.messages.forEach(e=>{s(e)})})}e("tiny-overview",e=>{var s,t=e.messages_id,a="message",r=a+"-"+t;n.has(r)?(s=n.get(r),void 0!==e.fts_rank&&(void 0===s.fts_rank||e.fts_rank<s.fts_rank)&&(s.fts_rank=e.fts_rank)):n.set(r,{source_type:a,id:t,chat_id:e.messages_chat_id,file_path:e.messages_meta_file_path||e.chats_name,git_repo:e.groups_name,fts_rank:e.fts_rank,tiny_overview:e})}),e("short-overview",e=>{var s,t=e.messages_id,a="message",r=a+"-"+t;n.has(r)?(s=n.get(r),void 0!==e.fts_rank&&(void 0===s.fts_rank||e.fts_rank<s.fts_rank)&&(s.fts_rank=e.fts_rank),s.short_overview=e):n.set(r,{source_type:a,id:t,chat_id:e.messages_chat_id,file_path:e.messages_meta_file_path||e.chats_name,git_repo:e.groups_name,fts_rank:e.fts_rank,short_overview:e})}),e("direct-search",e=>{var s,t=e.messages_id,a="message",r=a+"-"+t,i=e.chat_path?e.chat_path.split(/ -> /).slice(3).join("/"):e.chats_name;n.has(r)?(s=n.get(r),void 0!==e.fts_rank&&(void 0===s.fts_rank||e.fts_rank<s.fts_rank)&&(s.fts_rank=e.fts_rank),s.direct_snippets||(s.direct_snippets=[]),s.direct_snippets.push(e)):n.set(r,{source_type:a,id:t,chat_id:e.messages_chat_id,file_path:i,git_repo:e.groups_name,fts_rank:e.fts_rank,direct_snippets:[e]})}),e("meta-search",e=>{var s,t=e.messages_id,a="message",r=a+"-"+t,i=e.chat_path?e.chat_path.split(/ -> /).slice(3).join("/"):e.chats_name,_={};for(s in e)s.startsWith("messages_meta_extracted_metadata_")&&(_[s.substring("messages_meta_extracted_metadata_".length)]=e[s]);n.has(r)||n.set(r,{source_type:a,id:t,chat_id:e.messages_chat_id,file_path:i,git_repo:e.groups_name,fts_rank:e.fts_rank,extracted_metadata_fields:_})});var s=Array.from(n.values());return s.sort((e,s)=>(void 0!==e.fts_rank?e.fts_rank:void 0!==e.row_num?e.row_num:Number.MAX_SAFE_INTEGER)-(void 0!==s.fts_rank||void 0!==s.row_num?s.row_num:Number.MAX_SAFE_INTEGER)),s}module.exports={extractRawResultsData:extractRawResultsData,identifyUniqueItems:identifyUniqueItems};
