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

let{ChatUtils,DomUtils,MarkdownUtils,MessageUtils,SVGUtils}=require("@gitsense/gsc-utils"),{chatApi,hljs}=require("../../../../Dependencies"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),forkAndCustomizeChat=require("../utils/forkChatUtils").forkAndCustomizeChat,DEMO_TITLE="\n## Train AI Demo\n",NEW_ANALYZER_INTERACTIVE_CHAT_UUID="2aab7f7f-7d19-4ca4-96df-5fcc58f4472c",NEW_ANALYZER_QUICK_CHAT_UUID="e1889860-8014-489a-89f5-ba8f519298d7",INSIGHTS_ANALYSIS_CHAT_UUID="a06476ca-712f-4c73-a44f-6f6f80e66096",trainAiDemo={id:"train-ai",name:"Train AI",description:"Learn how easy it is to create custom AI Brains that turn data like meeting notes into searchable intelligence.",scenes:[{id:"train-ai-welcome",action:"typeAndAppend",triggerCondition:(e,t,n,a)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

In this demo, you'll learn how to create custom AI analyzers (Brains) that transform your domain knowledge into searchable intelligence. No coding required.

**Why This Matters**

Most AI platforms give you generic assistants that know a little about everything but understand nothing about *your* business. We turn your expertise into permanent, specialized AI Brains that become part of your personal AI assistant.

**What You'll Create**

A **core compliance analyzer** for meeting notes that:
- Validates notes against your company standards
- Extracts decisions, action items, and compliance scores
- Makes unstructured notes searchable

**Key Lessons You'll Learn**
1. How to transfer domain knowledge directly into AI through conversation
2. How to create permanent intelligence assets that grow with your expertise
3. The foundation for building a personal AI assistant that understands your world

Ready to transform from AI consumer to AI creator?

[**Start Demo**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(n,e,t,a)=>{if(!n.meta.demo.siblingDemos){var i=a.chat.lineage?.[0]?.uuid||null;if(!i)throw new Error(`The current demo "${a.chat.name}" has no parent`);var s=await MessageService.getChat(a.widget,i);if(!s)throw new Error("Unable to retrieve the chat with the UUID: "+i);i=await MessageService.updateChatMessage(a.widget,n.id,{newMeta:{...n.meta,demo:{...n.meta.demo,siblingDemos:s.descendants}}});1===i?.changes?n=i.newMessage:console.warn("Failed to update message meta for scene "+e.id)}s=t.querySelector("a");s&&"Start Demo"===s.innerText.trim()&&(n.kids?.length?s.style.pointerEvents="none":(s.style.pointerEvents=null,s.style.fontWeight=600,s.href="#",s.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=a;await MessageService.newChatMessage(t,e.id,{parentId:n.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"train-ai-choose-path"}}},visibility:"human-public"});a.updateChat()}))}},{id:"train-ai-choose-path",action:"typeAndAppend",contentToType:`
### The Meeting Notes Challenge

You have sample meeting notes ready to analyze. Once you create your analyzer, you'll see how it transforms unstructured documents into searchable, structured data.

Note: While we're using meeting notes as our example, the same principles apply to *any* document type: support tickets, project documentation, or any other business data you work with daily.

**What Your Analyzer Will Do**
- Validate notes against company standards from your reference guide
- Extract meeting details, participants, decisions, and action items
- Calculate compliance scores and flag missing information

**Optional Exercises**

Try it yourself. These hands-on exercises open in new tabs. Complete one to experience the creation process, then return here to continue.

- **Interactive Exercise**: Have a conversation teaching the AI your requirements
- **Quick Exercise**: Review a pre-completed conversation and save the analyzer

[**Interactive Exercise**]() &nbsp; &nbsp;[**Quick Exercise**]()

**Continue with the Demo**

See a production analyzer in action, created with the same instructions you'll learn in the exercises, analyzing sample meeting notes.

[**Explore Production Analyzer**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,s)=>{var t=t.querySelectorAll("a"),o=t[0],r=t[1],t=t[2];if(o&&"Interactive Exercise"===o.innerText.trim()&&r&&"Quick Exercise"===r.innerText.trim()&&t&&"Explore Production Analyzer"===t.innerText.trim())if(i.kids?.length)o.style.pointerEvents="none",r.style.pointerEvents="none",t.style.pointerEvents="none";else{o.style.pointerEvents=null,o.style.fontWeight=600,o.href="#",r.style.pointerEvents=null,r.style.fontWeight=600,r.href="#",t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#";let n=Math.random().toString(36).substring(2,8),a="demo-meeting-notes-core-compliance-"+n;a;o.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=s,t=await forkAndCustomizeChat(NEW_ANALYZER_INTERACTIVE_CHAT_UUID,t,"123456",n,"Create "+a,e.id,e.main_model);t&&window.open("/?chat="+t.uuid,"_blank")},r.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=s,t=await forkAndCustomizeChat(NEW_ANALYZER_QUICK_CHAT_UUID,t,"123456",n,"Create "+a,e.id,e.main_model);t&&window.open("/?chat="+t.uuid,"_blank")},t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=s;await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"train-ai-explore-production-analyzer"}}},visibility:"human-public"});s.updateChat()}}}},{id:"train-ai-explore-production-analyzer",action:"typeAndAppend",contentToType:`
### See Results of an Analysis

Now let's see what the trained AI analyzer found in the sample meeting notes. This production analyzer was created using the exact same prompt from the exercises.

**Two Ways to Query Your Data**

- **Ask AI Directly**: Use \`!ask\` commands to query your data conversationally. We demonstrate this in the **Ask AI for Insights** demo.
- **Load Insights Data**: Use the Insights Builder to create human-curated queries. This is the recommended method for analysis work-it's more efficient and doesn't require the AI to reconstruct queries for each question.

**Ready to Explore the Results?**

Click below to load the Insights Builder with our production analyzer and see the analyzed meeting notes data.

[**Load Insights Builder**]()

> This will open the Insights Builder with pre-configured analyzer and meeting notes
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(t,e,n,a)=>{n=n.querySelector("a");n&&"Load Insights Builder"===n.innerText.trim()&&(t.kids?.length?n.style.pointerEvents="none":(n.style.pointerEvents=null,n.style.fontWeight=600,n.href="#",n.onclick=async e=>{e.preventDefault();e=await chatApi.getChat(a.widget,INSIGHTS_ANALYSIS_CHAT_UUID);if(!e)throw new Error(`No insights chat with the UUID ${INSIGHTS_ANALYSIS_CHAT_UUID} found`);e=ChatUtils.getChatMessages(e).find(e=>"metadata-insights-builder"===e.type);if(!e)throw new Error("No insights message found in the chat "+INSIGHTS_ANALYSIS_CHAT_UUID);e={...e};e.parentId=t.id,e.model=a.chat.main_model,await MessageService.newChatMessage(a.widget,a.chat.id,e);a.updateChat()}))},nextSceneId:"wait-for-insights-builder"},{id:"wait-for-insights-builder",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>"metadata-insights-builder"===e.type,nextSceneId:"click-load-results-and-ask-ai"},{id:"click-load-results-and-ask-ai",action:"typeAndAppend",contentToType:`
### What Happened

We've configured the **Insights Builder** to construct a search query that loads metadata from the "Meeting Notes Core Compliance" analyzer

### Next Steps

When you click the **"Load Results & Review"** button in the message above, the system will:

1. Execute the query across your "Command Center" selections.
2. Retrieve the analyzed meeting notes data for review

Click the **"Load Results & Review"** button in the message above to begin.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,n,a)=>{var i;e.kids?.length||(e=MessageUtils.getMessageById(a.chat,e.parent_id),(a=a.renderedMessage[e.id]?.contentBody)?(e=a.querySelector(".gsc-load-results-and-ask-ai-btn"))?(a=SVGUtils.arrowLeft({style:{width:"30px",height:"30px",margin:0,position:"relative",top:"8px"}}),a=DomUtils.h.createDiv({append:[a],style:{paddingLeft:"10px"}}),i=DomUtils.h.createDiv({text:"Click this button",style:{backgroundColor:"#fff3cd",border:"2px solid #664d03",borderRadius:"4px",width:"200px",fontWeight:500,padding:"10px",textAlign:"center",fontSize:".9em"}}),e.insertAdjacentElement("afterend",a),a.insertAdjacentElement("afterend",i)):console.warn("trainAiDemo: No 'Load' button found in parent message for scene "+t.id):console.error("trainAiDemo: No parent message contentBody found for scene "+t.id))},nextSceneId:"wait-for-insights-analysis"},{id:"wait-for-insights-analysis",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>"meta-raw-result"===e.type,nextSceneId:"the-end"},{id:"the-end",action:"typeAndAppend",contentToType:`
### Ask Questions About Your Data

Your meeting notes are now structured, searchable data! The analyzer extracted meeting details, participants, decisions, action items, and compliance scores (100, 80, 60).

**Try These Questions:**

**Department Participation:**
- "Which departments were represented in the most meetings?"
- "Show me meetings with both Engineering and Marketing present"

**Compliance & Actions:**
- "Which meetings have compliance scores below 80%?"
- "What action items are due this week?"

**Why This Matters**

You can now ask these questions conversationally-no manual scanning or spreadsheets needed. The AI understands the structure and can reason about it.

**How to Make AI Smarter**

You've seen what *one* core analyzer can do. In the **Make AI Smarter and Safer** demo, you'll learn how to combine *multiple* analyzers working together to deliver deeper, more accurate insights than any single analyzer could alone.

### Demo Complete

This concludes the Train AI demo. You can return to the demos home page to explore other features.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={trainAiDemo:trainAiDemo};
