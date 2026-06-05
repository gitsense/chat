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

let GSToolBlockUtils=require("@gitsense/gsc-utils").GSToolBlockUtils,h=require("../../../Dependencies").h,SEARCH_TOOL=require("../../../constants").SEARCH_TOOL,{CSS_CLASSES,parseRawJsonFromMessage,createSearchToolBlock,MESSAGE_TYPE_DIRECT_SEARCH_RESULTS}=require("../components/directSearchResults/DirectSearchResultsUtils"),DirectSearchResultsHeader=require("../components/directSearchResults/DirectSearchResultsHeader"),DirectSearchResultsFooter=require("../components/directSearchResults/DirectSearchResultsFooter"),TableResultsRenderer=require("../components/directSearchResults/TableResultsRenderer"),MetaInsightsResultsRenderer=require("../components/directSearchResults/MetaInsightsResultsRenderer"),GitNavigationResultsRenderer=require("../components/directSearchResults/GitNavigationResultsRenderer"),SnippetResultsRenderer=require("../components/directSearchResults/SnippetResultsRenderer");async function handleDirectSearchResults(t,e,r){if(!t||null==t.message||!e||!r)return console.error("handleDirectSearchResults: Missing required parameters."),!1;e.innerHTML="";let a=parseRawJsonFromMessage(t.message);if(!a)return e.appendChild(h.createDiv({text:"Error: Could not parse search results data.",style:{color:"red",padding:"20px"}})),!1;let i={onMakeVisibleToAIClick:async()=>{try{await r.chatApi.updateChatMessage(r.widget,t.id,{visibility:"public"})}catch(e){console.error("Failed to update message visibility:",e)}},onExecuteSearchAgain:async()=>{var e=createSearchToolBlock(a.searchCriteria,t.id,a.searchCriteria.pagination.offset,!1);try{await r.chatApi.updateChatMessage(r.widget,t.id,{newMessage:`Searching again...

\`\`\`txt
${e}
\`\`\``})}catch(e){console.error("Failed to execute search again:",e)}},onExecuteNewSearch:async()=>{var e=createSearchToolBlock(a.searchCriteria,null,a.searchCriteria.pagination.offset,!0);try{await r.chat.newChatMessage(r.widget,`Searching in new message...

\`\`\`txt
${e}
\`\`\``)}catch(e){console.error("Failed to execute new search:",e)}},onPaginationClick:async e=>{var t=createSearchToolBlock(a.searchCriteria,null,e,!0);try{await r.chat.newChatMessage(r.widget,`Loading page ${Math.floor(e/a.searchCriteria.pagination.limit)+1}...

\`\`\`txt
${t}
\`\`\``)}catch(e){console.error("Failed to load new page:",e)}},onChatPathClick:e=>{r.widget&&"function"==typeof r.widget.navigateToChat?r.widget.navigateToChat(e):(console.warn("navigateToChat function not available in context.widget"),window.open("/?board=gitsense-chat.app&chat="+e,"_blank"))},onLoadAllMatchesClick:async()=>{var e={tool:"context-builder",config:{layout:"default",engine:"gitsense",data:{searchCriteria:a.searchCriteria}}},e=GSToolBlockUtils.formatToolBlock(e);try{await r.chat.newChatMessage(r.widget,`Loading context builder with search results...

\`\`\`txt
${e}
\`\`\``)}catch(e){console.error("Failed to load context builder:",e)}}};var s=h.createDiv({cls:CSS_CLASSES.CONTAINER});s.appendChild(DirectSearchResultsHeader.render(a,t,i));let n=h.createDiv({});s.appendChild(n);var c=a.searchCriteria.isMetaInsights,l=a.searchCriteria.isMetaSearch,o=a.searchCriteria.isEmptySearch,d="git-nav"===a.searchCriteria.profile,u=d||a.searchCriteria.keywords?.length||a.searchCriteria.phrases?.length||a.searchCriteria.filters?.query;let p;if(p=c?MetaInsightsResultsRenderer:l||o||!u?TableResultsRenderer:(p=d?GitNavigationResultsRenderer:p)||SnippetResultsRenderer,0===a.totalResultsReturned)n.appendChild(p.render(a,i));else if(d)n.innerHTML="",n.appendChild(p.render(a,i));else{h.createDiv({});let t=h.createLink({text:"Show Matches",href:"#",style:{fontWeight:600},onclick:e=>{e.preventDefault(),t.remove(),n.innerHTML="",n.appendChild(p.render(a,i))}});c=h.createDiv({text:"Matches are hidden by default until we find the most optimal way to integrate search results into a chat.",style:{fontSize:".9em",marginTop:"5px"}});n.appendChild(t),n.appendChild(h.createBreak()),n.appendChild(c)}return e.appendChild(s),!0}module.exports={handleDirectSearchResults:handleDirectSearchResults};
