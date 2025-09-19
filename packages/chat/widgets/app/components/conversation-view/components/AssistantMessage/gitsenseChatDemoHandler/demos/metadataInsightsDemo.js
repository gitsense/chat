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

let{CodeBlockUtils,ChatUtils,MessageUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),{arrayToTree,chatApi}=require("../../../../Dependencies"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DomUtils=require("../../../../utils/DomUtils"),DEMO_TITLE="# Metadata Insights Demo",LLM_REVIEW_QUERY="The files in context contain references to incorrect functions. Please review these files and provide a summary of the issues found.",CONTEXT_LOADER_TOOL_CONFIG={tool:"context-loader",config:{renderTo:{id:"context-loader-body"},showInsights:!0,chatIds:[5,6,7,8,9,10,11,12,16,17,18,19],insights:{analyzerId:"code-comment-analyzer::file-content::default",selectedMetadataFields:["incorrect_function_reference_detected"],showOptions:!1}}},metadataInsightsDemo={id:"metadata-insights",name:"Metadata Insights Demo",description:"Learn how GitSense Chat Analyzers can enhance your data, enabling intelligent analysis and more effective AI interactions.",scenes:[{id:"metadata-insights-intro",action:"typeAndAppend",triggerCondition:(e,t,n,a)=>e.message.includes(DEMO_TITLE),contentToType:`
Welcome! In this demo, you'll learn how GitSense Chat's Analyzers can effortlessly transform your data into smart, structured insights that can help you find answers faster.

We'll show you how to:
*   **Extract valuable metadata:** See how Analyzers automatically identify and structure key information from your files.
*   **Filter context with precision:** Discover how to use this metadata to select only the most relevant files for your AI queries, saving tokens and focusing the LLM.
*   **Achieve targeted AI answers:** Experience how providing a refined context leads to more accurate, efficient, and actionable responses from the AI.

This approach not only makes your interactions with AI more effective and efficient, ensuring you get the right answers without sifting through irrelevant information, but also **improves the overall quality of your data, making your coding agents significantly smarter and more capable.**

To begin this interactive experience, please click the **'Start Demo'** link below.

[Start Demo]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(d,e,t,h)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(d.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var t,n,a=CONTEXT_LOADER_TOOL_CONFIG.config.chatIds,s=[],i=[];for(let e=0;e<a.length;e++){var o,r,l=a[e],c=h.findNode(l);c||((r=[...(o=await chatApi.getGitRefChatByFamilyMember(h.widget,{id:l})).descendants]).unshift(o),r=arrayToTree(r,"desc",o.id),h.addChildrenToNode(o.id,r),c=h.findNode(l))?s.push(c):i.push(l)}i.length||((e={...CONTEXT_LOADER_TOOL_CONFIG}).config.chatIds=a,e=`
# Metadata Insights

[[GSC_RENDER_TARGET:context-loader-body]]

${"```txt\n"+GSToolBlockUtils.formatToolBlock(e)+"\n```"}

> Click this button. Refer to the next message for detailed steps to filter by the selected metadata.

---hidden-split---

### LLM Instructions

You are an intelligent assistant participating in an interactive demo. Your primary task is to respond directly and accurately to the user's question. The user's question will specifically pertain to the files that have been loaded into the chat context. Do not repeat any part of the demo's introductory messages or previous instructions. Focus solely on answering the user's query based on the provided context.
                    `,{chat:t,widget:n}=h,await MessageService.newChatMessage(n,t.id,{parentId:d.id,model:t.main_model,role:"assistant",message:e,meta:{onlyDemoHandler:!0,demo:{scene:{id:"metadata-insights-context-loader-message"}}},visibility:"public"}),h.updateChat())}))}},{id:"metadata-insights-context-loader-message",action:"createBlankChildMessage",postProcess:async(e,t,n,a)=>{},nextSceneId:"metadata-insights-what-happened"},{id:"metadata-insights-what-happened",action:"typeAndAppend",contentToType:"\n### What Happened\n\nWe've automatically configured the metadata insights for you. As you can see above, 12 sample files have been loaded, the `code-comment-analyzer` is selected, and the `incorrect_function_reference_detected` metadata field is ready for review.\n\nYour next step is to follow the instructions below to filter these files and add only the relevant ones to the chat context.\n\n**Click on each step below to reveal a visual guide.**\n\n1.  Click the `Review Selected Items & Metadata` button.\n2.  In the pop-up, select the `true` value for the `incorrect_function_reference_detected` field.\n3.  Click the `Replace Filter Rules with Selected` button.\n4.  Click the `Apply Filter` button in the `Metadata Filter & Insights` section.\n5.  Click the checkbox in the table header to select all the filtered files.\n6.  Click the `Load` button to load the full content of the selected files.\n7.  Click the `Add` button to place the selected files into the chat context.\n",pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(t,r,n,l)=>{let c=l.renderedMessage[t.parent_id]?.contentBody||null;if(c){let s=(new Date).getTime()+3e3,i=()=>{var e,t,n,a;(new Date).getTime()>s||(e=c.querySelector("#review-selected-metadata-insights-items"),t=c.querySelector("#change-metadata-insights-analyzer"),n=c.querySelector("#review-selected-metadata-button"),a=c.querySelectorAll('input[type="checkbox"]'),e?t?n?a&&a.length?("none"!==e.style.pointerEvents&&(e.innerText="Review selected items (disabled for demo)",e.style.pointerEvents="none",e.style.color="gray",t.innerText="Change analyzer (disabled for demo)",t.style.pointerEvents="none",t.style.color="gray"),a.forEach(e=>e.disabled=!0),setTimeout(i,500)):console.error("No metadata checkboxes found for scene "+r.id):console.error("No review insights button found for scene "+r.id):console.error("No change analyzer link for scene "+r.id):console.error("No review items link for scene "+r.id))},{h:o,svg:e}=(setTimeout(i,500),DomUtils);t=c.querySelector("blockquote");if(t&&t.innerText.trimStart().startsWith("Click")){var a="click-preview-arrow";if(!c.querySelector("."+a)){var d=e.arrowUp({style:{width:"30px",height:"30px",margin:0,position:"relative",top:"-5px"}}),a=o.createDiv({cls:a,append:[d],style:{paddingLeft:"125px"}}),d=(t.style.backgroundColor="#fff3cd",t.style.border="2px solid #664d03",t.style.borderRadius="4px",t.style.width="270px",t.style.fontWeight=500,t.style.padding="10px",t.style.textAlign="center",t.style.fontSize=".9em",t.insertAdjacentElement("beforebegin",a),n.querySelectorAll("ol > li"));let i=["step-1-review-button.png","step-2-select-true-value.png","step-3-replace-filter-rules.png","step-4-apply-filter.png","step-5-select-all-files.png","step-6-load-button.png","step-7-add-button.png"];d.forEach((e,t)=>{e.style.cursor="pointer";let n=o.createDiv({cls:"demo-step-details",style:{display:"none",marginTop:"10px",padding:"10px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"5px"}});var a=document.createElement("img"),s=l.widget.staticURL.replace(/\/{file}/,"");a.src=s+"/assets/images/demos/metadata-insights/"+i[t],a.style.maxWidth="100%",a.style.border="1px solid #ccc",n.appendChild(a),e.appendChild(n),e.onclick=()=>{n.style.display="none"===n.style.display?"block":"none"}})}}else console.warn("No block quote with click review button instructions found in scene "+r.id)}else console.error(`No parent body for the message in scene ${r.id} found`)},nextSceneId:"metadata-insights-await-user-context-load"},{id:"metadata-insights-await-user-context-load",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>"context"===e.type&&(e=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,!!e.find(e=>"gs-tool"===e.type&&"context-loader"===e.toolData?.tool)),nextSceneId:"metadata-insights-explain-and-query"},{id:"metadata-insights-explain-and-query",action:"typeAndAppend",contentToType:`
### Great, you've added the files into context!

With these files in context, we can now ask the LLM to review them and provide a summary of the issues related to incorrect function references.

The command below is ready to be sent.

\`\`\`
${LLM_REVIEW_QUERY}
\`\`\`

Click the link below to send this command.

[**Send Message**]()

---

**LLM responses are live.** If the response is somewhat nonsensical, it is because we were unable to predict what the LLM would return.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(LLM_REVIEW_QUERY,a),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"metadata-insights-await-llm-response"},{id:"metadata-insights-await-llm-response",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{n=MessageUtils.getMessageById(n.chat,e.parent_id);return!(!n||n.message.trim()!==LLM_REVIEW_QUERY)&&"assistant"===e.role},nextSceneId:"metadata-insights-conclusion"},{id:"metadata-insights-conclusion",action:"typeAndAppend",contentToType:`
## Demo Complete

### What Happened

The LLM has reviewed the files in context and provided a summary of the incorrect function references. This demonstrates the full power of Metadata Insights: from using Analyzers to extract structured data, to filtering context based on those insights, and finally, leveraging an LLM to act on that precise context.

You've seen how GitSense Chat can:
*   **Enhance data with custom intelligence** using Analyzers.
*   **Refine context** based on specific metadata.
*   **Enable targeted AI interactions** for more accurate and effective results.

You can now:
*   Experiment further in this chat.
*   Start another demo from the main demo selection page.
*   Explore GitSense Chat's other features.

---

**Important Note:** Please be aware that messages in this demo starting with "What Happened" or "Demo Complete" are for your reference only and are not visible to the LLM. If you ask the LLM about their content, it will not have access to that information.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={metadataInsightsDemo:metadataInsightsDemo};
