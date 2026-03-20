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

let{CodeBlockUtils,ChatUtils,DomUtils,GSToolBlockUtils,MessageUtils}=require("@gitsense/gsc-utils"),{chatApi,hljs}=require("../../../../Dependencies"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),forkAndCustomizeChat=require("../utils/forkChatUtils").forkAndCustomizeChat,DEMO_TITLE="\n## Intelligent Context Curation Demo\n",BROAD_STROKE_FILTER_CHAT_UUID="7253de0f-0d8c-4a8b-8bce-4f3529a80dfe",AI_ASSISTED_REFINEMENT_CHAT_UUID="1962a5b9-0aff-41fe-af1c-ceb6319044c8",intelligentContextCurationDemo={id:"intelligent-context-curation",name:"Intelligent Context Curation",description:"Learn how to transform large contexts into focused contexts that save money and improve LLM performance.",scenes:[{id:"intelligent-context-curation-welcome",action:"typeAndAppend",triggerCondition:(e,t,i,n)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

In this demo you will learn how to **replace manual selection and blind searches with metadata-driven filtering** to create focused contexts that save money and improve LLM performance.

### The Challenge

Large codebases overwhelm LLMs with too much context, leading to skyrocketing costs and poor responses. Manually filtering through thousands of files or relying on blind searches is impractical, error-prone, and expensive.

Even when coding agents automate the search process, blindly grepping through thousands of files for minutes or hours isn't something to celebrate-it's a symptom of an inefficient approach that wastes computational resources and developer time. We shouldn't be impressed by brute-force methods that burn through tokens and processing cycles just to find relevant code.

### The Solution: Metadata-Powered Filtering

The metadata from the **Tiny Overview Generator** analyzer that is used in this demo is just one example of how GitSense Chat analyzer metadata can help you navigate large code bases much faster and smarter. This generic analyzer extracts purpose, keywords, and parent keywords from any file, but imagine creating analyzers that understand your specific business domain, automatically tagging compliance requirements, mapping feature dependencies, or identifying security vulnerabilities across thousands of files.

[**Start Demo**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,n)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(i.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n;await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"intelligent-context-curation-broad-stroke"}}},visibility:"human-public"});n.updateChat()}))}},{id:"intelligent-context-curation-broad-stroke",action:"typeAndAppend",contentToType:`
## Scaling Context for Real-World Codebases

In this demo, you'll work with 19 files from a payment processing application. The techniques you'll learn are designed for enterprise scale - imagine applying these same methods to repositories with thousands of files.

### Stage 1: Broad Stroke Filtering

The first stage is about applying quick, obvious filters based on your domain knowledge to dramatically reduce context size. You'll filter by language and parent keywords (high-level categories like "authentication" or "payments").

This human-led step is crucial for efficiency. Before you ask the AI to do any heavy lifting, you can eliminate a significant portion of irrelevant files with simple, logical filters.

Let's try it. Click the link below to open the Broad Stroke Filtering exercise in a new tab.

[**Try Broad Stroke Filter**]() (Opens in new tab)

> **Note:** This exercise will open in a new tab. When you are finished exploring, return to this tab and click the link below to continue the demo.

[**Next: AI-Assisted Refinement**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,n)=>{var t=t.querySelectorAll("a"),o=Array.from(t).find(e=>"Try Broad Stroke Filter"===e.innerText.trim()),t=Array.from(t).find(e=>"Next: AI-Assisted Refinement"===e.innerText.trim());o&&(o.style.fontWeight=600,o.href="#",o.onclick=async e=>{e.preventDefault();e=await forkAndCustomizeChat(BROAD_STROKE_FILTER_CHAT_UUID,n.widget,"","","Broad Stroke Filtering Exercise",n.chat.id,n.chat.main_model);if(!e)throw new Error("Failed to fork chat "+BROAD_STROKE_FILTER_CHAT_UUID);window.open("/?chat="+e.uuid,"_blank")}),t&&(t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n;await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"intelligent-context-curation-ai-assisted"}}},visibility:"human-public"});n.updateChat()})}},{id:"intelligent-context-curation-ai-assisted",action:"typeAndAppend",contentToType:`
### Stage 2: AI-Assisted Refinement & Validation

Now that you've seen how to apply broad, human-led filters, let's partner with AI to refine your selections and validate your choices.

In this stage, you'll ask the AI to:
*   Help identify additional relevant files you might have missed.
*   Create a focused context bundle for deeper analysis.

This demonstrates the power of combining human intuition with AI's analytical capabilities. You provide the initial direction, and the AI helps you achieve precision.

Click the link below to open the AI-Assisted Refinement exercise in a new tab.

[**Try AI-Assisted Refinement & Validation**]()

> **Note:** This exercise will open in a new tab. When you are finished exploring, return to this tab and click the link below to complete the demo.

[**Complete Your Journey**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,n)=>{var t=t.querySelectorAll("a"),o=Array.from(t).find(e=>"Try AI-Assisted Refinement & Validation"===e.innerText.trim()),t=Array.from(t).find(e=>"Complete Your Journey"===e.innerText.trim());o&&(o.style.fontWeight=600,o.href="#",o.onclick=async e=>{e.preventDefault();e=await forkAndCustomizeChat(AI_ASSISTED_REFINEMENT_CHAT_UUID,n.widget,"","","AI-Assisted Refinement Exercise",n.chat.id,n.chat.main_model);if(!e)throw new Error("Failed to fork chat "+AI_ASSISTED_REFINEMENT_CHAT_UUID);window.open("/?chat="+e.uuid,"_blank")}),t&&(t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n;await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"intelligent-context-curation-completion"}}},visibility:"human-public"});n.updateChat()})}},{id:"intelligent-context-curation-completion",action:"typeAndAppend",contentToType:`
## Your Journey Complete: The Power of Human-AI Collaboration

As coding agents become standard, the most valuable asset is the **human guidance** that directs them. While AI performs the changes, your ability to curate context is what makes automation fast, accurate, and cost-effective.

### Conversations as Durable Assets

In GitSense Chat, your discussions aren't just disposable logs-they are **durable assets**. The logic you used to refine your context today becomes the intelligence that speeds up your work tomorrow.

Imagine this workflow:
*   **Capture**: After a PR is closed, you **compact** the conversation to preserve the key decisions and curation steps.
*   **Store**: These compacted chats are stored in **Git**, becoming a permanent part of your project's history.
*   **Analyze**: Custom **Analyzers** extract structured data (like topics and file relationships) from these chats.

### Your Personal AI Assistant

This connects directly to what you saw in the **"Ask AI for Insights"** demo. In the future, you won't have to start from scratch. You can simply ask your personal assistant:

> *"I'm working on a similar payment logic issue. What past discussions have I had that can help me identify which files to consider and what questions I should ask the AI?"*

By treating your curation process as data, you transform past efforts into a searchable "brain" that helps you and your team scale efficiently.

### The Workflow in Practice

1.  **Broad Stroke Filter**: Use your domain knowledge to quickly eliminate noise.
2.  **AI-Assisted Refinement**: Partner with AI to validate and pinpoint the most relevant files.
3.  **Durable Archiving**: Compact and analyze the process to build a library of reusable context insights.

This synergy ensures you're not just solving today's problem, but building the foundation for faster, more intelligent automation in the future.

Thank you for exploring Intelligent Context Curation with GitSense Chat!
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,i,n)=>{DemoUtils.enableChatBox()},nextSceneId:null}]};module.exports={intelligentContextCurationDemo:intelligentContextCurationDemo};
