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

let{CodeBlockUtils,ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DEMO_TITLE="## Context Engineering & Management Demo",FIND_FILES_COMMAND="!ask using the production ready code comment analyzer, find all files with spelling mistakes in the hello and hey world repository",ANALYZE_AUTOMATED_COMMAND="Review the comments in all the files in context. For each of them, identify any spelling mistakes they may have.",BUILD_CONTEXT_BUNDLE_COMMAND="Create a context bundle with just the JavaScript and Rust files.",contextManagementDemo={id:"context-management",name:"Context Engineering & Management Demo",description:"Master the art of building, refining, and managing precise LLM context to enhance accuracy, reduce costs, and streamline your workflows.",scenes:[{id:"context-management-intro",action:"typeAndAppend",triggerCondition:(e,t,n,a)=>e.message.includes(DEMO_TITLE),contentToType:`
Welcome! In this demo, you'll learn how to build, refine, and manage the context provided to LLMs in GitSense Chat. This is crucial for getting accurate responses, reducing costs, and streamlining your development workflow.

We'll start by performing a semantic search using the code comment analyzer that was used in the **AI-Assisted Search & Analyzers Demo** to find files that will form our initial context.

The command below is ready to be sent. It will find files with spelling mistakes in the 'hello and hey world' repository.

\`\`\`
${FIND_FILES_COMMAND}
\`\`\`

Click the link below to send this command. We'll explain the results once the search is finished and then move on to loading the context.

[**Send Message**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.

---

**LLM responses are live.** If the demo suddenly stops, cannot continue or becomes somewhat nonsensical, it is because we were unable to predict what the LLM would return. Most of the time, you should be able to delete messages and then click the **Send Message** link again to keep going. If that does not work, you will need to start another demo.

            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(FIND_FILES_COMMAND,a),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"context-management-await-find-files"},{id:"context-management-await-find-files",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{var n=MessageUtils.getMessageById(n.chat,e.parent_id);return!!(n&&n.message.includes(FIND_FILES_COMMAND)&&(n=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,n.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"context-management-explain-find-files"},{id:"context-management-explain-find-files",action:"typeAndAppend",contentToType:`
### What Happened

The semantic search found files with spelling mistakes across the "Hello World" and "Hey World" repositories. This demonstrates how GitSense Chat Analyzers can help LLMs transform natural-language queries into deterministic ones, for use in building GitSense Chat contexts.

### Next Steps

Now, we'll load the files we found into your chat's context. This shows how easy it is to go from search results to active context.

Click the **"Review, load and add"** link in the **previous message** (the search results).

![Review, load and add link]({{base-url}}/introduction-demo-review-load-add-link-bordered.png)

Then do the following once the **Context Builder** loads:

1. Click the checkbox in the table header to select all files.
2. Click the 'Load' button.
3. Click the 'Add' button (the 'Load' button will turn into the 'Add' button).

After clicking the 'Add' button, the Context Builder will close, and a new **Context Message** will be added to the chat, which will begin the next demo step.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:"context-management-await-load-context"},{id:"context-management-await-load-context",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>"context"===e.type&&(e=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,!!(e=e.find(e=>"gs-tool"===e.type&&"context-loader"===e.toolData?.tool)))&&8===(e.toolData?.config?.chatIds||[]).length,nextSceneId:"context-management-explain-ai-analysis"},{id:"context-management-explain-ai-analysis",action:"typeAndAppend",contentToType:`
### What Happened

The files we discovered are now loaded into your chat's context. Thanks to the GitSense Chat Bridge, which turns Git repositories into chat-ready "repositories," loading data is a breeze. This lets you concentrate on the task instead of worrying about how to bring context into the conversation.

### Next Steps

Now that the context is set, we'll use LLMs to analyze the code. This means reviewing the comments in all the files in context to identify the spelling mistakes.

\`\`\`
${ANALYZE_AUTOMATED_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,postProcess:async(e,t,n,a)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(ANALYZE_AUTOMATED_COMMAND,a),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:"context-management-await-ai-analysis"},{id:"context-management-await-ai-analysis",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>MessageUtils.getMessageById(n.chat,e.parent_id).message.trim()===ANALYZE_AUTOMATED_COMMAND,nextSceneId:"context-management-explain-ai-analysis-results"},{id:"context-management-explain-ai-analysis-results",action:"typeAndAppend",contentToType:`
### What Happened

The AI-assisted code analysis found spelling mistakes in the comments of the loaded files and provided us with a clear report of the issues. This seamless workflow, which goes from chat to context to question, demonstrates how natural it can be to chat with AI about your data using GitSense Chat.

### Next Steps

Now, we'll take this a step further by asking the LLM to make the context more specific to address a particular need. We'll ask it to create a new context bundle containing only JavaScript and Rust files from the current context.

The command below is ready to be sent.

\`\`\`
${BUILD_CONTEXT_BUNDLE_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(BUILD_CONTEXT_BUNDLE_COMMAND,a),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"context-management-await-refine-context"},{id:"context-management-await-refine-context",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{n=MessageUtils.getMessageById(n.chat,e.parent_id);return!(!n||n.message.trim()!==BUILD_CONTEXT_BUNDLE_COMMAND)},nextSceneId:"context-management-explain-refine-context"},{id:"context-management-explain-refine-context",action:"typeAndAppend",contentToType:`
### What Happened

The LLM just created a context bundle containing only the JavaScript and Rust files. This ability to ask AI to help you refine a context is game-changing. Imagine loading dozens of files into context and asking the LLM to trace an execution path for a query, then having it create a bundle based on its analysis. In fact, this is how GitSense Chat's search features are developed and debugged.

### Next Steps

With this focused context bundle, we'll load it into your chat. Click the **"Review, load and add"** link in the **previous message** (the context bundle created by the LLM).

![Review, load and add link in refined context message]({{base-url}}/introduction-demo-refined-review-load-add-link-bordered.png)

Then do the following once the **Context Builder** loads:

1. Click the checkbox in the table header to select all files.
2. Click the 'Load' button.
3. Click the 'Add' button (the 'Load' button will turn into the 'Add' button).
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:"context-management-await-load-focused-context"},{id:"context-management-await-load-focused-context",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>"context"===e.type&&(e=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,!!(e=e.find(e=>"gs-tool"===e.type&&"context-loader"===e.toolData?.tool)))&&2===(e.toolData?.config?.chatIds||[]).length,nextSceneId:"context-management-manage-cost"},{id:"context-management-manage-cost",action:"typeAndAppend",contentToType:`
### What Happened

You just loaded a more focused **context message** into your chat, with just the JavaScript and Rust files. We can now focus on removing context no longer required to help with LLM reasoning and reduce cost.

> **Loading Context is Free**: The process of loading data into a chat does not incur any costs, as it does not require calling an LLM provider. You will only incur costs when you send a message that includes the **context message**.

### Next Steps

Click the **"Delete All Contexts Except Last"** link in the **previous message** (the newly loaded context message) as shown below:

![Delete All Contexts Except Last]({{base-url}}/introduction-demo-delete-all-contexts-except-last-link-bordered.png)

By clicking the link, all context messages in this chat will be deleted except for the last one. Note, when context messages are merged or deleted, the original chat is untouched. Instead, a copy is made first, and only that copy is updated. Your current chat then becomes a child of the copied chat.
            `,postProcess:async(e,t,n,a)=>{e=MessageUtils.getMessageById(a.chat,e.parent_id),a=a.renderedMessage[e.id]?.contentBody;if(a){e=a.querySelector(".gsc-delete-all-contexts-except-last-link");let t=e.onclick;e.onclick=null,e.addEventListener("click",async e=>{t(e,e=>{MessageService.setChat(e)})})}else console.error("contextManagementDemo: No parent message found for scene "+t.id)},nextSceneId:"context-management-await-manage-cost"},{id:"context-management-await-manage-cost",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>{a=a.filter(e=>"context"===e.type);return!(!e.message.includes("Delete All Contexts Except Last")||1!==a.length)},nextSceneId:"context-management-conclusion"},{id:"context-management-conclusion",action:"typeAndAppend",contentToType:`
## Demo Complete

You've now removed the older context, so only the most recent remains. This entire process, from AI-assisted search to LLM-refined context and now focused management, highlights how GitSense Chat can build context for LLMs nearly at the speed of thought.

GitSense Chat is an intelligent platform designed to transform how you interact with information and AI. It's built for seamless human-AI collaboration, ensuring you get precise, actionable results.

You can now:
*   Experiment further in this chat.
*   Start another demo from the main demo selection page.
*   Explore GitSense Chat's other features.

---

**Important Note:** Please be aware that messages in this demo starting with "What Happened" or "Demo Complete" are for your reference only and are not visible to the LLM. If you ask the LLM about their content, it will not have access to that information.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={contextManagementDemo:contextManagementDemo};
