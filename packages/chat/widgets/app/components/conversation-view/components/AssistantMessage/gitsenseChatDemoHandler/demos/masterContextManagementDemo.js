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

let{CodeBlockUtils,ChatUtils,DomUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),Callout=require("../components/Callout"),DEMO_TITLE="## Master Context Management Demo",FIND_FILES_COMMAND="!ask Find all files with accuracy issues using the production-ready analyzer `simple-comment-accuracy-reviewer` in the repositories `Tutorial/hello-world` and `Tutorial/hey-world`.",ANALYZE_AUTOMATED_COMMAND="Review the comments in all the files in context. For each of them, identify any accuracy issues they may have and summarize your findings in 1-2 sentences.",BUILD_CONTEXT_BUNDLE_COMMAND="Create a context bundle with just the JavaScript and Rust files that have accuracy issues.",masterContextManagementDemo={id:"master-context-management",name:"Master Context Management Demo",description:"Master the art of building, refining, and managing precise LLM context to enhance accuracy, reduce costs, and streamline your workflows.",scenes:[{id:"master-context-management-intro",action:"typeAndAppend",triggerCondition:(e,t,n,a)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

This demo will teach you advanced techniques for **mastering context control** in GitSense Chat. You'll learn expert-level skills to:

*   **Strategically build** context with AI-assisted search
*   **Efficiently load & manage** context at scale
*   **Analyze** context quality with precision
*   **Intelligently refine** context using LLM reasoning
*   **Optimize** context for cost and performance

Ready to get started? We'll first ask AI to find files with accuracy issues in the 'hello and hey world' repository with the following command:

\`\`\`
${FIND_FILES_COMMAND}
\`\`\`

Click the link below to send this command. We'll explain the results once the search is finished and then move on to loading the context.

[**Send Message**]()

**LLM Responses are Live:** Please note that while this demo has been tested with various state-of-the-art LLMs, AI models may occasionally not follow instructions precisely. This can sometimes result in unexpected or nonsensical responses. If you encounter such behavior, it's a normal characteristic of current AI technology rather than an issue with the demo itself.

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{var s=Array.from(n.querySelectorAll("p")).find(e=>e.textContent.includes("LLM Responses are Live")),s=(s&&(s.style.border="1px solid #856404",s.style.borderRadius="5px",s.style.backgroundColor="#fff3cd",s.style.padding="15px",s.style.marginBottom="20px"),n.querySelector("a"));s?(await DemoUtils.simulateTyping(FIND_FILES_COMMAND,a),s.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"master-context-management-await-find-files"},{id:"master-context-management-await-find-files",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{var n=MessageUtils.getMessageById(n.chat,e.parent_id);return!!(n&&n.message.includes(FIND_FILES_COMMAND)&&(n=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,n.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"master-context-management-explain-find-files"},{id:"master-context-management-explain-find-files",action:"typeAndAppend",contentToType:`
### What Happened

The semantic search found files with accuracy issues across the "Hello World" and "Hey World" repositories. This demonstrates the **foundational technique** of using conversational AI to **strategically build** your initial context.

### Next Steps

Now, we'll load the files we found into your chat's context. This shows how easy it is to go from search results to active context.

Click the highlighted **"Review, load and add"** link in the **previous message** (the search results).

Then do the following once the **Context Builder** loads:

1. Click the checkbox in the table header to select all files.
2. Click the 'Load' button.
3. Click the 'Add' button (the 'Load' button will turn into the 'Add' button).

After clicking the 'Add' button, the Context Builder will close, and a new **Context Message** will be added to the chat, which will begin the next demo step.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{let o=a.renderedMessage[e.parent_id]?.contentBody||null;if(o){o.style.border="5px solid black",o.style.borderRadius="10px",o.style.padding="20px";let e=(new Date).getTime()+2e3,s=()=>{if(!((new Date).getTime()>e)){var n=o.querySelectorAll("a");let t=null;for(let e=0;e<n.length;e++){var a=n[e];if("Review, load and add"===a.innerText){t=a;break}}t?(t.classList.add("gs-blink-text"),setTimeout(s,500)):console.warn("No 'Review, load and add' link found")}};setTimeout(s,500)}else console.warn("No parent body found")},nextSceneId:"master-context-management-await-load-context"},{id:"master-context-management-await-load-context",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{n=MessageUtils.getMessageById(n.chat,e.parent_id)?.message.includes("The semantic search")||!1;return!("context"!==e.type||!n)},nextSceneId:"master-context-management-explain-ai-analysis"},{id:"master-context-management-explain-ai-analysis",action:"typeAndAppend",contentToType:`
### What Happened

The files we discovered are now loaded into your chat's context. Thanks to the GitSense Chat Bridge, which turns Git repositories into chat-ready "repositories," loading data is a breeze.

> **Loading Context is Free**: The process of loading data into a chat does not incur any costs, as it does not require calling an LLM provider. You will only incur costs when you send a message that includes the **context message**.

### Next Steps

Now that the context is set, we'll use LLMs to analyze the code. This means reviewing the comments in all the files in context to identify the accuracy issues.

\`\`\`
${ANALYZE_AUTOMATED_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,postProcess:async(e,t,n,a)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(ANALYZE_AUTOMATED_COMMAND,a),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:"master-context-management-await-ai-analysis"},{id:"master-context-management-await-ai-analysis",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>MessageUtils.getMessageById(n.chat,e.parent_id).message.trim()===ANALYZE_AUTOMATED_COMMAND,nextSceneId:"master-context-management-explain-ai-analysis-results"},{id:"master-context-management-explain-ai-analysis-results",action:"typeAndAppend",contentToType:`
### What Happened

The AI-assisted code analysis found accuracy issues in the comments of the loaded files and provided us with a clear report of the problems. This demonstrates **intermediate mastery**: seamlessly moving from search → context → analysis. You're building the **core workflow** that expert users leverage daily.

### Next Steps

Now, we'll take this a step further by asking the LLM to make the context more specific to address a particular need. We'll ask it to create a new context bundle containing only JavaScript and Rust files from the current context that have accuracy issues.

The command below is ready to be sent.

\`\`\`
${BUILD_CONTEXT_BUNDLE_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(BUILD_CONTEXT_BUNDLE_COMMAND,a),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"master-context-management-await-refine-context"},{id:"master-context-management-await-refine-context",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{n=MessageUtils.getMessageById(n.chat,e.parent_id);return!(!n||n.message.trim()!==BUILD_CONTEXT_BUNDLE_COMMAND)},nextSceneId:"master-context-management-explain-refine-context"},{id:"master-context-management-explain-refine-context",action:"typeAndAppend",contentToType:`
### What Happened

The LLM just created a **precision-targeted context bundle** containing only the JavaScript and Rust files with accuracy issues. This **advanced technique**-using AI to **intelligently refine** context-is how to become a **context management master**.

### Next Steps

With this focused context bundle, we'll load it into your chat. Click the highlighted **"Review, load and add"** link in the **message above** (the context bundle created by the LLM).

Then do the following once the **Context Builder** loads:

1. Click the checkbox in the table header to select all files.
2. Click the 'Load' button.
3. Click the 'Add' button (the 'Load' button will turn into the 'Add' button).
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{a=a.renderedMessage[e.parent_id]?.contentBody||null;if(a){a.style.border="5px solid black",a.style.borderRadius="10px",a.style.padding="20px";var s=a.querySelectorAll("a");let t=null;for(let e=0;e<s.length;e++){var o=s[e];if("Review, load and add"===o.innerText){t=o;break}}t?t.classList.add("gs-blink-text"):console.warn("No 'Review, load and add' link found")}else console.warn("No parent body found")},nextSceneId:"master-context-management-await-load-focused-context"},{id:"master-context-management-await-load-focused-context",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{n=MessageUtils.getMessageById(n.chat,e.parent_id)?.message.includes("LLM just created a **precision")||!1;return!("context"!==e.type||!n)},nextSceneId:"master-context-management-manage-cost"},{id:"master-context-management-manage-cost",action:"typeAndAppend",contentToType:`
### What Happened

You've now loaded a **precision-filtered context** containing only the JavaScript and Rust files with accuracy issues. However, you currently have **two context messages** loaded-the original 9-file context and this new 2-file context, which includes some duplicates.

### Next Steps

To achieve **actual cost savings**, you need to clean up the redundant context. 

**Before proceeding**, take note of the current estimated token count displayed in the right panel. This represents the total estimated tokens being used with both contexts loaded.

Now, click the highlighted **"Delete All Contexts Except Last"** link in the **message above** (the newly loaded context message) as shown below:

By clicking the link, all context messages in this chat will be deleted except for the last one, eliminating the duplicates, reducing your token costs, and ensuring the LLM stays focused on only the most relevant files. 

> **Note**: When context messages are merged or deleted, the original chat is untouched. Instead, a copy is made first, and only that copy is updated. Your current chat then becomes a child of the copied chat.
            `,postProcess:async(e,t,n,a)=>{e=MessageUtils.getMessageById(a.chat,e.parent_id),e=a.renderedMessage[e.id]?.contentBody;if(e){e.style.border="5px solid black",e.style.borderRadius="10px",e.style.padding="20px";e=e.querySelector(".gsc-delete-all-contexts-except-last-link");e.classList.add("gs-blink-text");let t=e.onclick;e.onclick=null,e.addEventListener("click",e=>{t(e,async e=>{var t=a.widget,n=ChatUtils.getChatMessages(e).pop();await MessageService.newChatMessage(t,e.id,{parentId:n.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"master-context-management-conclusion"}}},visibility:"human-public"});window.location.assign("/?chat="+e.uuid)})});setTimeout(()=>{var e;(e=document.querySelector(".gsc-side-panel-overview"))&&new Callout({title:"Track Your Token Usage",purpose:"Notice the current estimated token count. After deleting redundant contexts, watch this number decrease, demonstrating immediate cost savings.",steps:["Take note of the current estimated token count",'Click the "Delete All Contexts Except Last" link',"Observe how the estimated token count decreases after cleanup"],targetElement:e,className:"demo-callout token-callout",showStepsByDefault:!1,marginTop:"10px",arrowDirection:"up"}).show()},500)}else console.error("masterContextManagement: No parent message found for scene "+t.id)}},{id:"master-context-management-conclusion",action:"typeAndAppend",contentToType:`
### Mastery Achieved

You've now mastered the **complete context management lifecycle**-from strategic building to intelligent refinement to cost optimization. These are the **expert techniques** that unlock the full potential of LLMs for code generation, debugging, and data analysis at scale.

### Cost Savings Demonstrated

Notice how your estimated token count decreased after removing redundant contexts. This demonstrates the immediate cost impact of effective context management.

### Demo Complete

By mastering context, you unlock the full potential of LLMs for tasks like code generation, debugging, and data analysis.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={masterContextManagementDemo:masterContextManagementDemo};
