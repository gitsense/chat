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

let DomUtils=require("../../../../utils/DomUtils"),{CodeBlockUtils,ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),INTRO_SCENE1_TRIGGER_CONTENT="# Welcome to GitSense Chat!",ANALYZE_AUTOMATED_COMMAND="Review the comments in all the files in context.  For each of them, identify any spelling mistakes they may have.",SHOW_ANALYZERS_AUTOMATED_COMMAND="!ask show production ready analyzers that can help with code quality",SHOW_ANALYZER_SCHEMA_AUTOMATED_COMMAND="!ask show the schema for the code comment analyzer",FIND_FILES_AUTOMATED_COMMAND="!ask using the production ready analyzers, find all files with spelling mistakes in the hello and hey world repository",BUILD_CONTEXT_BUNDLE_COMMAND="Create a context bundle with just the JavaScript and Rust files",INTRO_SC4_AUTOMATED_COMMAND="From the files in context, create a new context bundle that only includes JavaScript and Rust files.",introductionDemo={id:"introduction",name:"Context Engineering & AI Search Demo",description:"Experience how GitSense Chat redefines context engineering and AI search.",scenes:[{id:"intro",action:"typeAndAppend",contentToType:`
In this interactive demo, we'll show how you can build relevant context by simply chatting to ensure LLMs have the right information to produce better code.

You'll experience:

*   **Demo 1: Discovering Analyzers**
*   **Demo 2: Exploring Analyzer Schemas**
*   **Demo 3: Performing Semantic Search**
*   **Demo 4: Loading AI-Curated Context**
*   **Demo 5: AI-Assisted Code Analysis**
*   **Demo 6: Refining Context with LLMs**
*   **Demo 7: Loading Focused Context**
*   **Demo 8: Managing Context for Reasoning and Cost**

### Live Search Responses

If the demo suddenly stops, cannot continue or becomes somewhat nonsensical, it is because we were unable to predict what the LLM would return. Most state-of-the-art (SOTA) models should be able to follow the instructions in this demo, but there is no guarantee that even the best models will not fail to answer or produce the expected output. 

Most of the time, you should be able to delete messages and then click the **Send Message** link again to keep going. If that does not work, you will need to start another demo.

---

## Demo 1: Discovering Analyzers

Analyzers are like the "Brains" behind our AI search. They can turn any text file into a "smart" one, and you don't need to write any code to do it! To learn more, you can explore the GitSense Chat help guide, which explains Analyzers in much greater detail.

In this first demo, we'll show you how to discover Analyzers using our AI-assisted search. If you look at the chat input below, you'll see the following command is ready to be sent:

\`\`\`
${SHOW_ANALYZERS_AUTOMATED_COMMAND}
\`\`\`


Click the link below to send this command. We'll explain the results once the search is finished and then move on to the next demo.

[**Send Message**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.

            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,o)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(SHOW_ANALYZERS_AUTOMATED_COMMAND,o),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzer-list-detected"},{id:"analyzer-list-detected",action:"createBlankChildMessage",triggerCondition:(e,t,n,o)=>{var a,s;return!!MessageUtils.getMessageById(n.chat,e.parent_id).message.trimStart().startsWith(INTRO_SCENE1_TRIGGER_CONTENT)&&({blocks:n,warnings:a}=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}),s=n.find(e=>"code"===e.type&&"query"===e.language),!!(n.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool)&&s&&e.message.trimStart().startsWith("## AI Search Complete")&&SHOW_ANALYZERS_AUTOMATED_COMMAND.includes(s.content.trim())))},nextSceneId:"analyzer-list-commentary-and-demo-2"},{id:"analyzer-list-commentary-and-demo-2",action:"typeAndAppend",contentToType:`
## Demo 2: Exploring Analyzer Schemas

### What Happened

The AI-assisted search found production-ready analyzers that can improve code quality, namely the \`code-comment-analyzer\`, which helps identify and report issues in code comments, such as spelling errors and outdated parameter descriptions.

### Next Steps

With this information, our next step is to look closer at the \`code-comment-analyzer\` by getting its schema. This will show us the types of questions we can ask and the structured data we can extract.

\`\`\`
${SHOW_ANALYZER_SCHEMA_AUTOMATED_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,o)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(SHOW_ANALYZER_SCHEMA_AUTOMATED_COMMAND,o),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzer-schema-detected"},{id:"analyzer-schema-detected",action:"createBlankChildMessage",triggerCondition:(e,t,n,o)=>{var a,s;return!!MessageUtils.getMessageById(n.chat,e.parent_id).message.includes("Demo 2: Exploring Analyzer Schemas")&&({blocks:n,warnings:a}=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}),s=n.find(e=>"code"===e.type&&"query"===e.language),!!(n.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool)&&s&&e.message.trimStart().startsWith("## AI Search Complete")&&SHOW_ANALYZER_SCHEMA_AUTOMATED_COMMAND.includes(s.content.trim())))},nextSceneId:"analyzer-schema-commentary-and-demo-3"},{id:"analyzer-schema-commentary-and-demo-3",action:"typeAndAppend",contentToType:`
## Demo 3: Performing Semantic Search

### What Happened

We've successfully retrieved the schema for the \`code-comment-analyzer\`. This schema shows us the metadata fields the Analyzer can extract, such as \`has_spelling_mistakes\`, \`outdated_comment_detected\`, and \`relevance_summary\`. These fields provide a structured way to understand and query your codebase, allowing for more precise and meaningful insights.

### Next Steps

Now that we have this schema, we can do a semantic search to find specific issues in your codebase.

\`\`\`
${FIND_FILES_AUTOMATED_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,o)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(FIND_FILES_AUTOMATED_COMMAND,o),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"semantic-search-results-detected"},{id:"semantic-search-results-detected",triggerCondition:(e,t,n,o)=>{var a,s;return!!MessageUtils.getMessageById(n.chat,e.parent_id).message.includes("Demo 3: Performing Semantic Search")&&({blocks:n,warnings:a}=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}),s=n.find(e=>"code"===e.type&&"query"===e.language),!!(n.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool)&&s&&e.message.trimStart().startsWith("## AI Search Complete")&&FIND_FILES_AUTOMATED_COMMAND.includes(s.content.trim())))},action:"createBlankChildMessage",nextSceneId:"semantic-search-results-explained"},{id:"semantic-search-results-explained",action:"typeAndAppend",contentToType:`
## Demo 4: Loading AI-Curated Context

### What Happened

The semantic search found files with spelling mistakes across the 'Hello World' and 'Hey World' repositories. This shows how powerful GitSense Chat's Analyzers are at finding specific issues in your code using structured data. With Analyzers, anyone, technical or not, can easily find answers that matter to them, all without having to write a single line of code.

### Next Steps

Now, we'll load the files we found into your chat's context. This shows how easy it is to go from chat to context.

Click the **"Review, load and add"** link in the **previous message**

![Review, load and add link](/api/v0/widgets/chat/app/static/introduction-demo-review-load-add-link-bordered.png)

then do the following once the **Context Builder** loads:

1. Click the checkbox in the table header to select all files.
2. Click the 'Load' button.
3. Click the 'Add' button (the 'Load' button will turn into the 'Add' button).

After clicking the 'Add' button, the Context Builder will close, and a new **Context Message** will be added to the chat, which will begin the next demo.
            `,userActionRequired:!0,nextSceneId:"search-context-message-detected"},{id:"search-context-message-detected",triggerCondition:(e,t,n,o)=>{var a;return"context"===e.type&&({blocks:e,warnings:a}=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}),!!(e=e.find(e=>"gs-tool"===e.type&&"context-loader"===e.toolData?.tool)))&&8===(e.toolData?.config?.chatIds||[]).length},action:"createBlankChildMessage",nextSceneId:"context-loaded-commentary-and-demo-5"},{id:"context-loaded-commentary-and-demo-5",action:"typeAndAppend",contentToType:`
## Demo 5: AI-Assisted Code Analysis

### What Happened

You now have the files we found loaded into your chat's context. With our GitSense Chat Bridge, which transforms Git repositories into chat 'repositories,' loading data is incredibly simple. This allows you to focus on the problem itself rather than on how to incorporate context into the conversation.

### Next Steps

Now that the context is set, we'll use LLMs to analyze the code. This means reviewing the comments in all the files in context to find any spelling mistakes.

\`\`\`
${ANALYZE_AUTOMATED_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,postProcess:async(e,t,n,o)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(ANALYZE_AUTOMATED_COMMAND,o),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:"analyze-"},{id:"analysis-detected",triggerCondition:(e,t,n,o)=>MessageUtils.getMessageById(n.chat,e.parent_id).message.trim()===ANALYZE_AUTOMATED_COMMAND,action:"createBlankChildMessage",nextSceneId:"analysis-explained-and-demo-6"},{id:"analysis-explained-and-demo-6",action:"typeAndAppend",contentToType:`
## Demo 6: Refining Context with LLMs

### What Happened

The AI-assisted code analysis found spelling mistakes in the comments of the loaded files and provided us with a clear report of the issues. This seamless workflow, which goes from chat to context to question, demonstrates how natural it can be to chat with AI about your data using GitSense Chat.

### Next Steps

Now, we'll take this a step further by asking the LLM to make the context more specific to address a particular need.

\`\`\`
${BUILD_CONTEXT_BUNDLE_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,o)=>{n=n.querySelector("a");n?(await DemoUtils.simulateTyping(BUILD_CONTEXT_BUNDLE_COMMAND,o),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"context-bundle-detected"},{id:"context-bundle-detected",action:"createBlankChildMessage",triggerCondition:(e,t,n,o)=>{if(MessageUtils.getMessageById(n.chat,e.parent_id).message.trim()===BUILD_CONTEXT_BUNDLE_COMMAND)return!0},nextSceneId:"context-bundle-explained-and-demo-7"},{id:"context-bundle-explained-and-demo-7",action:"typeAndAppend",contentToType:`
## Demo 7: Loading Focused Context

### What Happened

The LLM just created a context bundle containing only the JavaScript and Rust files. This ability to ask AI to help you refine a context is game-changing. Imagine loading dozens of files into context and asking the LLM to trace an execution path for a query, then having it create a bundle based on its analysis. In fact, this is how GitSense Chat's search features are developed and debugged.

### Next Steps

With this focused context bundle, we'll load it into your chat. Click the **"Review, load and add"** link in the **previous message**

![Review, load and add link in refined context message](/api/v0/widgets/chat/app/static/introduction-demo-refined-review-load-add-link-bordered.png)

then do the following once the **Context Builder** loads:

1. Click the checkbox in the table header to select all files.
2. Click the 'Load' button.
3. Click the 'Add' button (the 'Load' button will turn into the 'Add' button).
            `,userActionRequired:!0,nextSceneId:"focused-context-detected"},{id:"focused-context-detected",triggerCondition:(e,t,n,o)=>{var a;return"context"===e.type&&({blocks:e,warnings:a}=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}),!!(e=e.find(e=>"gs-tool"===e.type&&"context-loader"===e.toolData?.tool)))&&2===(e.toolData?.config?.chatIds||[]).length},action:"createBlankChildMessage",nextSceneId:"focused-context-explained-and-demo-8"},{id:"focused-context-explained-and-demo-8",action:"typeAndAppend",contentToType:`
## Demo 8: Managing Context for Reasoning and Cost

### What Happened

You just loaded a more focused **context message** into your chat, with just the JavaScript and Rust files and we can now focus on removing context no longer required to help with LLM reasoning and reduce cost.

> **Loading Context is Free**: The process of loading data into a chat does not incur any costs, as it does not require calling an LLM provider. You will only incur costs when you send a message that includes the **context message**.

### Next Steps

Click the **"Delete All Contexts Except Last"** link in the **previous message** as shown below:

![Delete All Contexts Except Last](/api/v0/widgets/chat/app/static/introduction-demo-delete-all-contexts-except-last-link-bordered.png)

By clicking the link, all context messages in this chat will be deleted except for the last one. Note, when context messages are merged or deleted, the original chat is untouched. Instead, a copy is made first, and only that copy is updated. Your current chat then becomes a child of the copied chat.
            `,userActionRequired:!0,postProcess:async(e,t,n,o)=>{e=MessageUtils.getMessageById(o.chat,e.parent_id),o=o.renderedMessage[e.id]?.contentBody;if(o){e=o.querySelector(".gsc-delete-all-contexts-except-last-link");let t=e.onclick;e.onclick=null,e.addEventListener("click",async e=>{t(e,e=>{MessageService.setChat(e)})})}else console.error("introductionDemo: No parent message found for scene "+t.id)},nextSceneId:"removed-old-context-detected"},{id:"removed-old-context-detected",triggerCondition:(e,t,n,o)=>{o=o.filter(e=>"context"===e.type);return!(!e.message.includes("Demo 8")||1!==o.length)},action:"createBlankChildMessage",nextSceneId:"removed-old-context-explained-and-conclusion"},{id:"removed-old-context-explained-and-conclusion",action:"typeAndAppend",contentToType:`
## Conclusion

### What Happened

You've now removed the older context, so only the most recent remains. This entire process, from AI-assisted search to LLM-refined context and now focused management, highlights how GitSense Chat, with the right analyzers, can help build relevant contexts close to the speed of thought.

### Further Learning

To learn more about managing contexts, and to dive deeper into all the powerful features we've mentioned (like traceability and interactive messages), we encourage you to check out our documentation and try our detailed Context Management tutorial. These resources offer in-depth guidance on using GitSense Chat's powerful context management features.

---

### GitSense Chat: Reimagining AI-Assisted Software Development.

This demo has given you a glimpse into how GitSense Chat is fundamentally changing the way you interact with LLMs. You've experienced **Context Engineering** firsthand, seeing how you can go beyond simple prompts to curate the LLM's knowledge base quickly and precisely. Through **AI Search** powered by custom Analyzers, you've seen how GitSense Chat makes technical insights accessible to everyone.

GitSense Chat is a versatile platform designed to help you interact with your data, including your chat conversations, more effectively using AI. While you may want to use other tools to generate code, it makes sense to start conversations with GitSense Chat and to use it to build your knowledge base to ensure you can seamlessly interact with your data using AI.
            `,nextSceneId:null}]};function isAnalyzerSearchMessage(e){return"assistant"===e.role&&e.message.trimStart().startsWith("## AI Search Complete")&&e.message.includes(SHOW_ANALYZERS_AUTOMATED_COMMAND.replace(/!ask /,""))}module.exports={introductionDemo:introductionDemo};
