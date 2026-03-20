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

let{GSToolBlockUtils,CodeBlockUtils}=require("@gitsense/gsc-utils"),{getSearchTools,getSearchToolConfigs}=require("../../../utils/searchToolConfig"),{chatApi,h}=require("../../../Dependencies"),{CONTEXT_LOADER_TOOL,SEARCH_TOOL,DIRECT_SEARCH_TYPE}=require("../../../constants"),COMPLETED=require("../../../../common/gitsense/searchStates").COMPLETED;async function processDirectSearch(t,e,a,r){var o=e.data?.searchCriteria;if(o){var n=t.message,n=getSearchToolConfigs(n);if(1!==n.length)console.error("processDirectSearch: Expecting one search tool but found "+n.length);else{var n=n[0],s={type:DIRECT_SEARCH_TYPE,created_at:(new Date).toISOString(),finished_at:null},n={...n,states:[...n.states||[],s]};await updateMessageContent(t,n,a,r,"Searching...",null,!1);try{var i=r.widget.dataURL;let e=o.query||"";"git-nav"!==o.searchTargetProfile||e.trim().toLowerCase().startsWith("profile:git-nav")||(e=("profile:git-nav "+e).trim());var c,l=new URLSearchParams;for(c in l.set("action","search"),o.scope&&"all-chats"!==o.scope&&(e+=" scope:"+o.scope),o.filters){var h=o.filters[c];h&&"IN"===h.operator&&Array.isArray(h.values)&&(e+=` ${c}:`+h.values.join(","))}Array.isArray(o.targets)&&0<o.targets.length&&(e.match(/\bin:/)||(e+=" in:"+o.targets.join(","))),l.set("query",e.trim()),l.set("current-chat-id",r.chat.id),o.pagination?.resultsPerPage&&l.set("results-per-page",o.pagination?.resultsPerPage),o.pagination?.currentPage&&l.set("page",o.pagination?.currentPage);var{status:d,data:g}=await(await fetch(i+"?"+l.toString())).json();"success"===d?await handleSearchCompletion(t,n,a,r,g):await handleSearchError(t,n,a,r,"Search failed: "+(g||"An unknown error occurred during search."),DIRECT_SEARCH_TYPE)}catch(e){console.error("processDirectSearch: Error during fetch or processing:",e.message,e),await handleSearchError(t,n,a,r,"An error occurred during search: "+e.message,DIRECT_SEARCH_TYPE)}}}else console.error("processDirectSearch: No search criteria found in config.data."),await handleSearchError(t,e,a,r,"No search criteria provided.",DIRECT_SEARCH_TYPE)}async function handleSearchCompletion(e,t,a,r,o){var n=[...t.states||[]],s=n[n.length-1];if(s.type!==DIRECT_SEARCH_TYPE)throw new Error(`handleSearchCompletion: Last state type is not "${DIRECT_SEARCH_TYPE}"`);if(null!==s.finished_at)throw new Error("handleSearchCompletion: Last state has a finished_at of "+s.finished_at);s.finished_at=(new Date).toISOString(),delete s.error;s={...t,data:{...t.data,paginationSummary:{currentPage:o?.pagination?.currentPage,totalPages:o?.pagination?.totalPages,totalResults:o?.totalCounts?.totalResults}}};n.push({type:COMPLETED,created_at:(new Date).toISOString(),finished_at:(new Date).toISOString()}),s.states=n;try{await updateMessageContent(e,s,a,r,"Search completed. Loading interactive results...",o,!0)}catch(e){console.error("handleSearchCompletion: Error updating config:",e)}r.updateChat&&"function"==typeof r.updateChat?r.updateChat():console.warn("handleSearchCompletion: Unable to update chat since it is not defined in the context")}async function handleSearchError(e,t,a,r,o,n="unknown"){console.error(`handleSearchError: An error occurred during stage "${n}". Updating config and message.`,o);var n=[...t.states||[]],s=n[n.length-1];if(s.type!==DIRECT_SEARCH_TYPE)throw new Error(`handleSearchCompletion: Last state type is not "${DIRECT_SEARCH_TYPE}"`);if(null!==s.finished_at)throw new Error("handleSearchCompletion: Last state has a finished_at of "+s.finished_at);s.error=o,s.finished_at=(new Date).toISOString();s=`### Search Error

An error occurred during the search:

\`\`\`
${o}
\`\`\`
`;await updateMessageContent(e,{...t,states:n,data:{...t.data,paginationSummary:null}},a,r,s,null,!1),r.updateChat&&"function"==typeof r.updateChat||console.warn("handleSearchError: Unable to update chat since it is not defined in the context")}async function updateMessageContent(e,a,t,r,o,n,s){a={tool:SEARCH_TOOL,config:a};let i=GSToolBlockUtils.formatToolBlock(a),c="```txt\n"+i+"\n```",l,h,d;if(s){a=n?`

\`\`\`json
${JSON.stringify(n,null,2)}
\`\`\`
`:"",s=(l=o+`

${a}

`+c,n?.results?.messages?.filter(e=>"git-blob"===e.messages_type)||[]);if(s.length){a=s.map(e=>e.messages_chat_id),n={tool:CONTEXT_LOADER_TOOL,show:!0,config:{container:{style:{borderTop:"1px solid #ddd",paddingTop:"15px",marginTop:"15px"}},actions:{load:{type:"link",text:"Review, load and add",showCopy:!0,showSave:!1,showAdd:!0},copy:{type:"link"},paste:{type:"link"}},chatIds:a,startCollapsed:!0,postLoad:{show:!0},showManage:!0}};let e=GSToolBlockUtils.formatToolBlock(n),t="```txt\n"+e+"\n```";l+=`

`+t}h="direct-search-results",d="human-public"}else l=o+`

`+c;t.innerHTML=r.md.render(o);try{await chatApi.updateChatMessage(r.widget,e.id,{newType:h,newVisibility:d,newMessage:l})}catch(e){console.error("updateMessageContent: Error updating message content:",e)}}module.exports={processDirectSearch:processDirectSearch};
