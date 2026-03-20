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

let{CodeBlockUtils,LLMUtils,ChatUtils}=require("@gitsense/gsc-utils"),{h,getToolBlockElemsByTool,chatApi}=require("../Dependencies"),SEARCH_TOOL=require("../constants").SEARCH_TOOL,getSearchToolConfigs=require("../utils/searchToolConfig").getSearchToolConfigs,updateConfig=require("../utils/updateConfig").updateConfig,{QUERY_OPTIMIZATION,SEARCH_EXECUTION_ORCHESTRATION,RESULTS_REVIEW_ORCHESTRATION,COMPLETED,ERROR}=require("../../common/gitsense/searchStates");function getUserFacingSectionMarkdown(e){let s=[];var t=e.find(e=>e.type===QUERY_OPTIMIZATION),t=(t&&t.thinking_chat&&t.thinking_chat.uuid&&s.push(`- [Optimization](load-context:optimization:${t.thinking_chat.uuid})`),e.find(e=>e.type===SEARCH_EXECUTION_ORCHESTRATION));return t&&t.raw_results_chat_uuid&&(t.progress?.totalMatches,s.push(`- [Search Results](load-context:results:${t.raw_results_chat_uuid})`)),e.filter(e=>e.type===RESULTS_REVIEW_ORCHESTRATION).forEach(e=>{e.reviews&&e.reviews.forEach((e,t)=>{t+=1;s.push(`- [Review ${t}](load-context:review-${t}:${e.uuid})`)})}),`
### Chat

To dive deeper or discuss this search, use the links below to load specific context into our conversation. This will help me assist you more effectively. To load a context, click once to estimate the token usage for the new message. If you click again, the message will be added to the conversation.

${s.join("\n")}

`}function getLlmInstructionsMarkdown(e){return`
### LLM Instructions

This message presents the final results of a GitSense Chat search.
Key search parameters:
- Query: "${e.data?.searchCriteria?.query||"N/A"}"
- AI-Assisted: ${e.data?.searchCriteria?.aiEnabled?"Yes":"No"}
- AI Model: ${e.data?.searchCriteria?.aiAssistant||"N/A"}

**User Interaction Guidance:**
Above this section, the user sees interactive links (e.g., "Load Query Optimization Response"). These links allow the user to explicitly load detailed context from the search process into our current conversation.

**Your Role:**
If the user asks follow-up questions about this search, its results, or the search process itself, **you must guide them to click the appropriate "Load..." link.**
- **"Load Query Optimization Response"**: Provides the system prompt and LLM's internal response from the query optimization stage. This helps you understand the initial search planning.
- **"Load Raw Search Results"**: (Future) Will provide the raw, structured JSON data from the search execution.
- **"Load Review X Response"**: (Future) Will provide the system prompt and LLM's internal response from a specific results review stage.

The full, raw search tool configuration (which is normally invisible to you) is provided below for your reference. This contains all \`states\` with their \`thinking_chat.uuid\`s, which correspond to the context available via the user-visible links.

\`\`\`json
${JSON.stringify(e)}
\`\`\`
`}function getDetails(e){var e=e.states||[],t=e.find(e=>"query-optimization"===e.type),s=e.find(e=>"search-execution-orchestration"===e.type);let i=e.filter(e=>"results-reviewer-orchestration"===e.type),a="### Details\n\nClick links below to review and chat with the LLM in a new browser tab about the responses in this search.\n\n";return t&&(e=1<t.queries_to_execute?.length?"Queries":"Query",a+=`[${e}](/?chat=${t.thinking_chat.uuid}) &nbsp; `),s&&(e=1<t.queries_to_execute?.length?"Results":"Result",a+=`[${e}](/?chat=${s.raw_results_chat_uuid}) &nbsp; `),i&&i.forEach((e,t)=>{e.thinking_chat&&(t="Review"+(1===i.length?"":" "+(t+1)),a+=`[${t}](/?chat=${e.thinking_chat.uuid}) &nbsp; `)}),a+"\n\n"}async function handleAiSearchCompleteResponse(e,t,r,s){if(!e||null==e.message||!t||!r)return console.error("handleAiSearchCompleteResponse: Missing required parameters."),!1;var i=getSearchToolConfigs(e.message);if(1!==i.length)return!1;let n=i[0];i=n.states&&0<n.states.length?n.states[n.states.length-1]:null;if(!i||!i.finished_at||i.error||i.type!==COMPLETED)return!1;i=i.meta_search_completed;if(e.message.includes("### Details")){for(let o of t.querySelectorAll("a"))if(o.href?.includes("?chat=")&&(o.target="_blank"),o.href.startsWith("load-context:")){let[,,a]=o.href.split(":");o.onclick=async e=>{e.preventDefault();var e=await chatApi.getChat(r.widget,a),e=ChatUtils.getChatMessages(e),t=e[0],e=e.pop();let s=ChatUtils.getChatMessages(r.chat),i="Successfully loaded **Optimization** context for query `"+(n.data?.searchCriteria?.query||"N/A")+"`. Feel free to ask for clarification or chat more about this search.\n\n---split---\n\n# LLM Instructions\nThis section contains the system prompt and the LLM's response from the **Query Optimization** stage of the search.\n- The `<system prompt>` block shows the instructions given to the search LLM for generating search queries.\n- The `<response message>` block contains the search LLM's output, which typically includes the generated search queries and its reasoning for them.\nUse this information to understand how the original user query was translated into specific search criteria.\n\n"+`<system prompt>
${t.message}
</system prompt>`+`<response message>
${e.message}
</response message>`;t=LLMUtils.estimateTokens(i);o.innerText=`Optimization (~${t} tokens)`,o.onclick=async e=>{e.preventDefault();e={parentId:s.pop().id,role:"assistant",message:i,model:r.chat.main_model,stream:!1};await chatApi.newChatMessage(r.widget,r.chat.id,e);r.updateChat()}}}}else{e.message;var t=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,a=t.filter(e=>"gs-tool"===e.type&&"search"===e.toolData?.tool);if(1!==a.length)return void console.error("aiSearchCompleteResponseHandler: Expecting to find one search tool block but found "+a.length);a=a[0],t=t.findIndex(e=>"gs-tool"===e.type&&"search"===e.toolData?.tool);if(-1===t)throw new Error("aiSearchCompleteResponseHandler: Unable to find the index of the search tool");t=CodeBlockUtils.deleteCodeBlockByIndex(e.message,t)+"\n\n"+getDetails(n)+"```txt\n"+a.content+"\n```",a=i?"human-public":null;await chatApi.updateChatMessage(r.widget,e.id,{newType:"ai-search-results",newVisibility:a,newMessage:t}),setTimeout(()=>{r.updateChat()},1e3)}return!0}module.exports={handleAiSearchCompleteResponse:handleAiSearchCompleteResponse};
