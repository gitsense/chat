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

let{CodeBlockUtils,ChatUtils,DomUtils,GSToolBlockUtils,MessageUtils}=require("@gitsense/gsc-utils"),{chatApi,hljs}=require("../../../../Dependencies"),ConfirmationBox=require("../../../../../ui/confirmation-box").ConfirmationBox,MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),forkAndCustomizeChat=require("../utils/forkChatUtils").forkAndCustomizeChat,DEMO_TITLE="\n## Conversation Architecture Demo\n",PRE_COMPACT_CHAT_UUID="2240b3f6-f05f-45d8-847f-28e5b5878adc",COMPACT_CHAT_UUID="f25c3e88-5341-454b-8635-a5868deea902",COMPACTED_CHAT_UUID="63fda159-bcf8-49a7-ad9f-593e1e2fefe2",conversationArchitectureDemo={id:"conversation-architecture",name:"Conversation Architecture",description:"Master the art of conversation architecture. Learn how to take control and shape how AI thinks by crafting the perfect context at every stage.",scenes:[{id:"conversation-architecture-welcome",action:"typeAndAppend",triggerCondition:(e,t,a,o)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

In the \`Ergonomic Conversations\` and the \`Git Ready\` demos, you learned how GitSense Chat can help you write better prompts. In this demo, you'll discover something more powerful: how to architect conversations themselves.

Most chat apps treat conversations as static logs. GitSense Chat treats them as living contexts that you actively shape with complete traceability, giving you the freedom to experiment without risk. By controlling what information the AI sees at each stage of the conversation, you guide not just what it does, but how it thinks.

You have control at every stage of the conversation. Before responses, you set up perfect context. After responses, you refine based on quality. Between conversations, you create focused versions for specific tasks. This is conversation architecture.

### Your Conversation Architecture Toolkit

The MessagesTool gives you control at every stage:

*   **Assistant**: Create AI helpers to analyze and understand your conversations
*   **Edit**: Refine messages for clarity and precision
*   **Add**: Insert context exactly where it's needed
*   **Delete**: Remove tangents that might mislead the AI
*   **Replace**: Swap out unhelpful exchanges with clearer versions
*   **Export**: Save your perfectly crafted conversations for use in the future, in other chat apps and coding agents
*   **Compact**: Transform meandering discussions into focused, actionable summaries

Ready to explore the most powerful of these tools, our compact feature?

[**Start Demo**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(a,e,t,o)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(a.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=o;await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"conversation-architecture-explore-original"}}},visibility:"human-public"});o.updateChat()}))}},{id:"conversation-architecture-explore-original",action:"typeAndAppend",contentToType:`
## Let's Explore Conversation Architecture

Here we will demonstrate how GitSense Chat's architecture features transform meandering conversations into focused, actionable summaries.

### The Challenge: Meandering Conversations

Whether you're baking a cake or developing software, conversations with AI often follow a similar pattern, they start with a simple question, evolve through multiple clarifications, and include various tangents before reaching the final outcome.

While these conversations are valuable in the moment, they create challenges when you need to:
*   Share the final outcome with others
*   Use the conversation as context for a new task
*   Reduce token usage while preserving key information
*   Help the LLM stay focused on the essential points

Let's explore how conversation architecture solves these challenges by examining a real conversation about baking a chocolate cake.

[**Explore Original Conversation**](#)
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(a,e,t,o)=>{t=t.querySelector("a");t&&"Explore Original Conversation"===t.innerText.trim()&&(a.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=o;await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"conversation-architecture-explore-original-chat"}}},visibility:"human-public"});o.updateChat()}))}},{id:"conversation-architecture-explore-original-chat",action:"typeAndAppend",contentToType:`
### Stage 1: Explore the Original Conversation

Let's start by examining a complete, unmodified conversation about baking a chocolate cake. This shows how real conversations naturally evolve with questions, clarifications, and tangents.

**What You'll See:**
The complete, unmodified conversation about baking a chocolate cake for a daughter's birthday. This shows how real conversations naturally evolve with questions, clarifications, and tangents. Detailed instructions for hands-on exploration are available in the optional exercise.

View the original conversation or continue to the next stage.

[**View Original Conversation**](#) &nbsp; | &nbsp; [**Next: Try Compacting**](#)
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(o,e,a,n)=>{var a=a.querySelectorAll("a"),i=a[0],a=a[1];if(i&&"View Original Conversation"===i.innerText.trim()&&a&&"Next: Try Compacting"===a.innerText.trim())if(o.kids?.length)i.style.pointerEvents="none",a.style.pointerEvents="none";else{i.style.pointerEvents=null,i.style.fontWeight=600,i.href="#",a.style.pointerEvents=null,a.style.fontWeight=600,a.href="#";let t=new ConfirmationBox;i.onclick=async e=>{e.preventDefault(),t.show({title:"Demo Ready",message:"We've prepared the demo for you. A new tab will open with the original conversation."},async()=>{var e,t,a=await((t=o.meta?.demo?.chatUuids?.preCompact)||({chat:t,widget:a}=n,t=await forkAndCustomizeChat(PRE_COMPACT_CHAT_UUID,a,"","","Pre-Architecture Chat",t.id,t.main_model),(e=o.meta||{demo:{}}).demo||(e.demo={}),e.demo.chatUuids||(e.demo.chatUuids={}),e.demo.chatUuids.preCompact=t.uuid,await MessageService.updateChatMessage(a,o.id,{newMeta:{...o.meta,demo:{...o.meta.demo,chatUuids:e.demo.chatUuids}}}),t.uuid));window.open("/?chat="+a,"_blank")})},a.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n;await MessageService.newChatMessage(t,e.id,{parentId:o.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"conversation-architecture-try-process"}}},visibility:"human-public"});n.updateChat()}}}},{id:"conversation-architecture-try-process",action:"typeAndAppend",contentToType:`
### Stage 2: Try Compacting

Now that you've seen the original conversation, let's explore how to guide the AI to transform it into a focused summary.

**What You'll See:**
The guided compaction chat where you'll work with AI to transform the conversation. You'll see the system prompt, message references, and can interact with the AI to create a compacted version. Detailed instructions for hands-on exploration are available in the optional exercise.

Explore the compaction process or continue to the next stage.

[**Try Compacting**](#) &nbsp; | &nbsp; [**Next: See Compacted Chat**](#)
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(n,e,a,i)=>{var a=a.querySelectorAll("a"),o=a[0],a=a[1];if(o&&"Try Compacting"===o.innerText.trim()&&a&&"Next: See Compacted Chat"===a.innerText.trim())if(n.kids?.length)o.style.pointerEvents="none",a.style.pointerEvents="none";else{o.style.pointerEvents=null,o.style.fontWeight=600,o.href="#",a.style.pointerEvents=null,a.style.fontWeight=600,a.href="#";let t=new ConfirmationBox;o.onclick=async e=>{e.preventDefault(),t.show({title:"Demo Ready",message:"We've prepared the demo for you. A new tab will open where you can guide the AI to compact the conversation."},async()=>{var e=await(async()=>{var e=n.meta?.demo?.chatUuids?.compact;if(e)return e;var{chat:e,widget:t}=i;let a=n.meta?.demo?.chatUuids?.preCompact;a||(o=MessageUtils.getMessageById(e,n.parent_id),a=o?.meta?.demo?.chatUuids?.preCompact),a||(o=await forkAndCustomizeChat(PRE_COMPACT_CHAT_UUID,t,"","","Pre-Architecture Chat",e.id,e.main_model),a=o.uuid);var o=await forkAndCustomizeChat(COMPACT_CHAT_UUID,t,"{original-chat-uuid}",a,"Architecture Chat",e.id,e.main_model),e=n.meta||{demo:{}};return e.demo||(e.demo={}),e.demo.chatUuids||(e.demo.chatUuids={}),e.demo.chatUuids.compact=o.uuid,await MessageService.updateChatMessage(t,n.id,{newMeta:{...n.meta,demo:{...n.meta.demo,chatUuids:e.demo.chatUuids}}}),o.uuid})();window.open("/?chat="+e,"_blank")})},a.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=i;await MessageService.newChatMessage(t,e.id,{parentId:n.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"conversation-architecture-see-result"}}},visibility:"human-public"});i.updateChat()}}}},{id:"conversation-architecture-see-result",action:"typeAndAppend",contentToType:`
### Stage 3: See the Compacted Chat

Now let's examine the final result of the architecture process - a focused, structured summary that preserves all essential information while dramatically reducing context size.

**What You'll See:**
The final compacted message showing the transformed conversation - reduced from 9 messages to 2 (including system message), with structured content, clear organization, and full traceability. Detailed instructions for hands-on exploration are available in the optional exercise.

This demonstrates how GitSense Chat transforms conversations into durable, traceable assets-something traditional tools that treat chats as disposable logs simply cannot offer.

Explore the compacted chat or continue to the demo conclusion.

[**See Compacted Chat**](#) &nbsp; | &nbsp; [**Next: Demo Conclusion**](#)
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(n,e,a,i)=>{var a=a.querySelectorAll("a"),o=a[0],a=a[1];if(o&&"See Compacted Chat"===o.innerText.trim()&&a&&"Next: Demo Conclusion"===a.innerText.trim())if(n.kids?.length)o.style.pointerEvents="none",a.style.pointerEvents="none";else{o.style.pointerEvents=null,o.style.fontWeight=600,o.href="#",a.style.pointerEvents=null,a.style.fontWeight=600,a.href="#";let t=new ConfirmationBox;o.onclick=async e=>{e.preventDefault(),t.show({title:"Demo Ready",message:"We've prepared the demo for you. A new tab will open with the final architectured result."},async()=>{var e=await(async()=>{var e=n.meta?.demo?.chatUuids?.compacted;if(e)return e;var{chat:e,widget:t}=i;let a=n.meta?.demo?.chatUuids?.preCompact;a||(o=MessageUtils.getMessageById(e,n.parent_id),a=o?.meta?.demo?.chatUuids?.preCompact),a||(o=await forkAndCustomizeChat(PRE_COMPACT_CHAT_UUID,t,"","","Pre-Architecture Chat",e.id,e.main_model),a=o.uuid);var o=await forkAndCustomizeChat(COMPACTED_CHAT_UUID,t,"{original-chat-uuid}",a,"Architectured Chat",e.id,e.main_model),e=n.meta||{demo:{}};return e.demo||(e.demo={}),e.demo.chatUuids||(e.demo.chatUuids={}),e.demo.chatUuids.compacted=o.uuid,await MessageService.updateChatMessage(t,n.id,{newMeta:{...n.meta,demo:{...n.meta.demo,chatUuids:e.demo.chatUuids}}}),o.uuid})();window.open("/?chat="+e,"_blank")})},a.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=i;await MessageService.newChatMessage(t,e.id,{parentId:n.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"conversation-architecture-conclusion"}}},visibility:"human-public"});i.updateChat()}}}},{id:"conversation-architecture-conclusion",action:"typeAndAppend",contentToType:`
## Demo Complete: The Power of Traceable Architecture

You've experienced GitSense Chat's transparent architecture process, which puts you in control of your conversations while maintaining complete traceability.

### The Impact: Before and After

| Metric | Original Conversation | Architectured Version |
|--------|----------------------|-------------------|
| Messages | 9 messages | 2 message |
| Tokens | 2,255 tokens | 369 tokens |
| Key Information | Buried in conversation | Immediately visible |
| Traceability | N/A | **100% preserved** |

### Why This Matters for Developers

While our example used a cake recipe, this feature is incredibly valuable for technical workflows:

*   **Transform design discussions** into focused requirements documents
*   **Condense debugging sessions** into key findings and solutions
*   **Summarize planning meetings** into actionable tasks
*   **Extract implementation details** from feature exploration conversations

Imagine architecturing a week-long discussion about a new feature into a focused brief. If something important was missed, you can trace back to the exact conversation where it was discussed-no information is ever truly lost.

### What's Next?

*   Experiment further in this chat
*   Start another demo from the main demo selection page
*   Explore GitSense Chat's other features

Thank you for exploring Conversation Architecture with GitSense Chat!
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={conversationArchitectureDemo:conversationArchitectureDemo};
