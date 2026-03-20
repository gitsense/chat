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

let{CodeBlockUtils,ChatUtils,DomUtils,GSToolBlockUtils,MessageUtils}=require("@gitsense/gsc-utils"),{chatApi,hljs}=require("../../../../Dependencies"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),Callout=require("../components/Callout"),DEMO_TITLE="\n## Git Ready Demo\n",DEMO_GIT_READY_CHAT_UUID="50edafaf-d566-4443-abdc-a4a7833362bd",TRACE_AUTH_FLOW_TEXT="Trace the authentication flow from login through payment processing, showing me all the files involved in this process and create a context bundle with them. Do not generate any code. Just trace the code and create a context bundle using the instructions defined in the system prompt.",gitReadyDemo={id:"git-ready",name:"Git Ready",description:"Learn how GitSense Chat treats your repositories as native, queryable context, enabling you to seamlessly load code into context and have natural conversations about your codebase.",scenes:[{id:"git-ready-welcome",action:"typeAndAppend",triggerCondition:(e,t,o,a)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

In this demo, you'll discover how GitSense Chat transforms Git repositories into conversational assets.

### Git as a First-Class Citizen

Unlike traditional tools that treat Git as an afterthought, GitSense Chat puts Git at the center of the experience. Your repositories become native, queryable entities that can be referenced and enriched to help humans and AI work smarter.

### Why This Matters

With Git as a first-class citizen, you can:

*   **Build Context Effortlessly:** Click to load data from imported repositories.
*   **Chat With Your Data:** Ask questions about your codebase, request changes, or analyze patterns across repositories.
*   **Leverage Conversational Code Intelligence:** Let AI trace execution paths and automatically curate relevant files into focused context bundles.
*   **Maintain Context:** Keep the connection between your conversations and the exact version of the code you're discussing.

### What You'll Experience

We'll guide you through:
1. Importing a Git repository with a simple command
2. Navigating your repositories in the chat interface
3. Loading code into context and starting a conversation
4. Using AI to analyze code relationships and create focused context bundles

Ready to bring your Git repositories into the conversation?

[**Start Demo**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(o,e,t,a)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(o.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=a;await MessageService.newChatMessage(t,e.id,{parentId:o.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"git-ready-how-easy"}}},visibility:"human-public"});a.updateChat()}))}},{id:"git-ready-how-easy",action:"typeAndAppend",contentToType:`
## How Easy It Is

Importing your Git repositories into GitSense Chat is straightforward with the GitSense Chat Bridge (gscb) CLI tool. Just point it to your local repository, and it will make your codebase "chatable."

> **Need more details?** You can learn more about the GitSense Chat Bridge tool and how to install GitSense Chat by referring to your personal chatable help guide, which you can load from the GitSense Chat home.

#### For NPM Installations

\`\`\`bash
gscb import git <path to repo> <repo owner> <repo name> <branch>
\`\`\`

#### For Docker Installations

1. Set the \`GSC_REPOS_DIR\` environment variable to your repositories directory
2. Start the container with \`gsc-docker start\`
3. Run the import command from within the container:

\`\`\`bash
gscb import git /app/host_repos/<repo-name> <repo owner> <repo name> <branch>
\`\`\`

That's it! Your repository is now ready to be used in conversations and enriched with our analyzers for deeper insights.

[**Next: Browse Your Repositories**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(o,e,t,a)=>{if(o.kids?.length)return void(i.style.pointerEvents="none");var n=t.querySelectorAll("a");let i=null;for(let e=0;e<n.length;e++){var s=n[e];if("Next: Browse Your Repositories"===s.innerText.trim()){i=s;break}}i&&(i.style.pointerEvents=null,i.style.fontWeight=600,i.href="#",i.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=a;await MessageService.newChatMessage(t,e.id,{parentId:o.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"git-ready-browse-repos"}}},visibility:"human-public"});a.updateChat()})}},{id:"git-ready-browse-repos",action:"typeAndAppend",contentToType:`
## Browse Your Repositories

Now that you understand how easy it is to import repositories, let's explore how to navigate and load them into your chat context.

Look at the right panel of your screen. You'll find numbered callouts to guide you through the process of working with your Git data.

### Callout Guide

Follow these numbered steps to select files and track context, ensuring your conversations are always relevant.

1. **Repositories Tree**: Learn how to navigate your repository structure and select the code you want to discuss with the AI
2. **Review Button**: Discover how to load selected files into context, making them available for AI analysis and conversation

These callouts are numbered to indicate the interaction order - simply follow them from 1 to 2 to experience how GitSense Chat transforms your Git repositories from static code storage into dynamic, conversational assets that you can interact with naturally.

We'll automatically detect when you've added files to the chat context and continue to the final part of the demo. Alternatively, you can click the link below to have us add the files for you.

[**Add Files for Me**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(a,e,t,n)=>{t=t.querySelector("a");t&&t.innerText.includes("Add Files for Me")&&(t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n,o=await chatApi.getChat(t,DEMO_GIT_READY_CHAT_UUID);if(!o)throw new Error("No demo Git Ready chat found with the UUID "+DEMO_GIT_READY_CHAT_UUID);o=ChatUtils.getChatMessages(o)?.find(e=>"context"===e.type)||null;if(!o)throw new Error(`Demo Git Reach chat with the UUID ${DEMO_GIT_READY_CHAT_UUID} does not have a context message`);await MessageService.newChatMessage(t,e.id,{type:"context",parentId:a.id,model:e.main_model,role:"assistant",message:o.message});n.updateChat()});setTimeout(()=>{var e;(e=document.querySelector(".loaded-selections-container"))&&new Callout({title:"Step 1: Browse and Select",purpose:"All imported repositories can be found in the Repositories tree. Click the chevron to expand the tree.",steps:["Click the chevron to expand the Repositories tree","Navigate to Tutorial/secure-payments/main",'Click the checkbox beside "main" to select the entire repository',"Proceed to step 2 to load and review the selected files."],targetElement:e,className:"demo-callout repositories-callout",showStepsByDefault:!0,marginTop:"20px",arrowDirection:"down"}).show(),(e=document.querySelector(".selection-combined-container"))&&new Callout({title:"Step 2: Review, Load and Add",purpose:'After selecting files, click the "Review" button to review, load and add your selections into your conversation.',steps:["Click the Review button to open the Context Builder","Select all files with the checkbox in the table header","Click Load to preview file content","Click Add to add files to the conversation"],targetElement:e,className:"demo-callout review-callout",showStepsByDefault:!1,marginTop:0,marginBottom:"20px",arrowDirection:"up"}).show()},500)}},{id:"git-ready-await-context-load",action:"createBlankChildMessage",triggerCondition:async(e,t,o,a)=>"context"===e.type,nextSceneId:"git-ready-conversational-intelligence"},{id:"git-ready-conversational-intelligence",action:"typeAndAppend",contentToType:`
## Conversational Code Intelligence

Now that you have files in context, let's see how AI can intelligently analyze code relationships for you.

Instead of manually selecting files, you can simply ask questions about your codebase, and the AI will:
- Analyze execution flows
- Identify relevant files
- Create a focused context bundle
- Provide explanations of the relationships

The AI will show you exactly which files it selects and why, giving you full transparency into its reasoning.

Try asking the AI to trace a specific execution path:

[**Trace Authentication Flow**]()

> This will ask the AI to trace the authentication flow and create a context bundle of all relevant files.

**LLM Responses are Live:** Please note that while this demo has been tested with various state-of-the-art LLMs, AI models may occasionally not follow instructions precisely. This can sometimes result in unexpected or nonsensical responses. If you encounter such behavior, it's a normal characteristic of current AI technology rather than an issue with the demo itself.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(a,e,t,n)=>{var o=Array.from(t.querySelectorAll("p")).find(e=>e.textContent.includes("LLM Responses are Live")),o=(o&&(o.style.border="1px solid #856404",o.style.borderRadius="5px",o.style.backgroundColor="#fff3cd",o.style.padding="15px",o.style.marginBottom="20px"),t.querySelector("a"));o&&"Trace Authentication Flow"===o.innerText.trim()&&(a.kids?.length?o.style.pointerEvents="none":(o.style.pointerEvents=null,o.style.fontWeight=600,o.href="#",o.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n,o=await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"user",message:TRACE_AUTH_FLOW_TEXT,visibility:"public"});await MessageService.newChatMessage(t,e.id,{parentId:o.message.id,model:e.main_model,role:"assistant",message:null,meta:{demo:{scene:{id:"git-ready-await-intelligence-response",rendered:!1}}}});n.updateChat()}))},nextSceneId:"git-ready-await-intelligence-response"},{id:"git-ready-await-intelligence-response",action:"createBlankChildMessage",triggerCondition:async(e,t,o,a)=>{var o=MessageUtils.getMessageById(o.chat,e.parent_id);return!(!o||!o.message.includes(TRACE_AUTH_FLOW_TEXT))&&(o=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,o.some(e=>"gs-tool"===e.type&&"context-loader"===e.toolData?.tool))},nextSceneId:"git-ready-final-scene"},{id:"git-ready-final-scene",action:"typeAndAppend",contentToType:`
## Demo Complete

### What You Just Experienced

You've just witnessed **Conversational Code Intelligence** in action! This is one of the most powerful features of GitSense Chat, demonstrating how AI can intelligently analyze code relationships and automatically create focused context bundles.

### Master Context Management

Ready to dive deeper into context management? Try the **Master Context Management** demo to learn how to:

*   Let AI help you build precise context
*   Load and manage context efficiently
*   Analyze context with AI insights
*   Refine context for specific needs
*   Optimize context usage for cost efficiency

You can find this demo in the \`Expert Context Mastery\` demo page

### The End

You've experienced how GitSense Chat treats Git as a first-class citizen, enabling natural conversations with your codebase and leveraging AI to intelligently analyze code relationships.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,o,a)=>{var n=document.querySelectorAll(".demo-callout");if(n&&n.length)for(let e=0;e<n.length;e++)n[e].remove();DemoUtils.enableChatBox(),setTimeout(()=>{var e;(e=document.querySelector(".gsc-quick-chat-buttons"))&&new Callout({title:"Review What Has Been Loaded",purpose:'GitSense Chat makes it simple to review what files were loaded into context. Just click the "Review Context" button to get started.',steps:["Click the Review Context button to see all files in context","The Context Browser opens in a full-screen modal","Use it to track what is and isn't in context"],targetElement:e,className:"demo-callout context-callout",showStepsByDefault:!1,arrowDirection:"up"}).show()},200)}}]};module.exports={gitReadyDemo:gitReadyDemo};
