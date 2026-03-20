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

let FullMetaErrorHandler=require("../shared/FullMetaErrorHandler");class MetaSearchResultProcessor{constructor(){this.errorHandler=new FullMetaErrorHandler}extractChatIdsFromResult(s){let e=[];return s&&s.results&&(Array.isArray(s.results.messages)&&s.results.messages.forEach(s=>{void 0===s.messages_chat_id||e.includes(s.messages_chat_id)||e.push(s.messages_chat_id)}),Array.isArray(s.results.chats)&&s.results.chats.forEach(s=>{void 0===s.chats_id||e.includes(s.chats_id)||e.push(s.chats_id)}),Array.isArray(s.results.codeBlocks))&&s.results.codeBlocks.forEach(s=>{void 0===s.messages_chat_id||e.includes(s.messages_chat_id)||e.push(s.messages_chat_id)}),e}filterResultsByChatIds(s,e){var r;return s&&s.results?(r={messages:[],chats:[],codeBlocks:[]},Array.isArray(s.results.messages)&&(r.messages=s.results.messages.filter(s=>e.includes(s.messages_chat_id))),Array.isArray(s.results.chats)&&(r.chats=s.results.chats.filter(s=>e.includes(s.chats_id))),Array.isArray(s.results.codeBlocks)&&(r.codeBlocks=s.results.codeBlocks.filter(s=>e.includes(s.messages_chat_id))),r):{messages:[],chats:[],codeBlocks:[]}}mergeMetaSearchResults(s,r){if(!Array.isArray(s)||0===s.length)return{messages:[],chats:[],codeBlocks:[]};if(!Array.isArray(r)||0===r.length)return{messages:[],chats:[],codeBlocks:[]};let a={messages:[],chats:[],codeBlocks:[]};for(var e of s)e&&e.results&&(Array.isArray(e.results.messages)&&e.results.messages.forEach(e=>{r.includes(e.messages_chat_id)&&!a.messages.some(s=>s.messages_id===e.messages_id)&&a.messages.push(e)}),Array.isArray(e.results.chats)&&e.results.chats.forEach(e=>{r.includes(e.chats_id)&&!a.chats.some(s=>s.chats_id===e.chats_id)&&a.chats.push(e)}),Array.isArray(e.results.codeBlocks))&&e.results.codeBlocks.forEach(e=>{r.includes(e.messages_chat_id)&&!a.codeBlocks.some(s=>s.code_blocks_uuid===e.code_blocks_uuid)&&a.codeBlocks.push(e)});return a}formatFinalResponse(s,e,r,a){var t=(s.messages?.length||0)+(s.chats?.length||0)+(s.codeBlocks?.length||0);return{status:"success",data:{query:e,searchCriteria:r,results:s,totalResultsReturned:t,pagination:a||{currentPage:1,totalPages:0<t?1:0,totalResults:t,resultsPerPage:t}}}}}module.exports=MetaSearchResultProcessor;
