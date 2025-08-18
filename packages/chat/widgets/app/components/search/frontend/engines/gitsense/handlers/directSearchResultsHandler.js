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

let GSToolBlockUtils=require("@gitsense/gsc-utils").GSToolBlockUtils,h=require("../../../Dependencies").h,SEARCH_TOOL=require("../../../constants").SEARCH_TOOL,{CSS_CLASSES,parseRawJsonFromMessage,createSearchToolBlock,MESSAGE_TYPE_DIRECT_SEARCH_RESULTS}=require("../components/directSearchResults/DirectSearchResultsUtils"),DirectSearchResultsHeader=require("../components/directSearchResults/DirectSearchResultsHeader"),DirectSearchResultsFooter=require("../components/directSearchResults/DirectSearchResultsFooter"),TableResultsRenderer=require("../components/directSearchResults/TableResultsRenderer"),SnippetResultsRenderer=require("../components/directSearchResults/SnippetResultsRenderer");async function handleDirectSearchResults(t,e,a){if(!t||null==t.message||!e||!a)return console.error("handleDirectSearchResults: Missing required parameters."),!1;e.innerHTML="";let r=parseRawJsonFromMessage(t.message);if(!r)return e.appendChild(h.createDiv({text:"Error: Could not parse search results data.",style:{color:"red",padding:"20px"}})),!1;let i={onMakeVisibleToAIClick:async()=>{try{await a.chatApi.updateChatMessage(a.widget,t.id,{visibility:"public"})}catch(e){console.error("Failed to update message visibility:",e)}},onExecuteSearchAgain:async()=>{var e=createSearchToolBlock(r.searchCriteria,t.id,r.searchCriteria.pagination.offset,!1);try{await a.chatApi.updateChatMessage(a.widget,t.id,{newMessage:`Searching again...

\`\`\`txt
${e}
\`\`\``})}catch(e){console.error("Failed to execute search again:",e)}},onExecuteNewSearch:async()=>{var e=createSearchToolBlock(r.searchCriteria,null,r.searchCriteria.pagination.offset,!0);try{await a.chat.newChatMessage(a.widget,`Searching in new message...

\`\`\`txt
${e}
\`\`\``)}catch(e){console.error("Failed to execute new search:",e)}},onPaginationClick:async e=>{var t=createSearchToolBlock(r.searchCriteria,null,e,!0);try{await a.chat.newChatMessage(a.widget,`Loading page ${Math.floor(e/r.searchCriteria.pagination.limit)+1}...

\`\`\`txt
${t}
\`\`\``)}catch(e){console.error("Failed to load new page:",e)}},onChatPathClick:e=>{a.widget&&"function"==typeof a.widget.navigateToChat?a.widget.navigateToChat(e):(console.warn("navigateToChat function not available in context.widget"),window.open("/?board=gitsense-chat.app&chat="+e,"_blank"))},onLoadAllMatchesClick:async()=>{var e={tool:"context-builder",config:{layout:"default",engine:"gitsense",data:{searchCriteria:r.searchCriteria}}},e=GSToolBlockUtils.formatToolBlock(e);try{await a.chat.newChatMessage(a.widget,`Loading context builder with search results...

\`\`\`txt
${e}
\`\`\``)}catch(e){console.error("Failed to load context builder:",e)}}};var s=r.searchCriteria.isMetaSearch,c=r.searchCriteria.isEmptySearch,n=r.searchCriteria.keywords?.length;let o;o=s||c||!n?TableResultsRenderer:SnippetResultsRenderer;s=h.createDiv({cls:CSS_CLASSES.CONTAINER});s.appendChild(DirectSearchResultsHeader.render(r,t,i));let l=h.createDiv({});if(s.appendChild(l),0===r.totalResultsReturned)l.appendChild(o.render(r,i));else{h.createDiv({});let t=h.createLink({text:"Show Matches",href:"#",style:{fontWeight:600},onclick:e=>{e.preventDefault(),t.remove(),l.innerHTML="",l.appendChild(o.render(r,i))}});c=h.createDiv({text:"Matches are hidden by default until we find the most optimal way to integrate search results into a chat.",style:{fontSize:".9em",marginTop:"5px"}});l.appendChild(t),l.appendChild(h.createBreak()),l.appendChild(c)}return e.appendChild(s),!0}module.exports={handleDirectSearchResults:handleDirectSearchResults};
