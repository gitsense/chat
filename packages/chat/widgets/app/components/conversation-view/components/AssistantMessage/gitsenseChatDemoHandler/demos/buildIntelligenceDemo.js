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

let{ChatUtils,DomUtils,MessageUtils,SVGUtils}=require("@gitsense/gsc-utils"),{chatApi,hljs,ConfirmationBox}=require("../../../../Dependencies"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),forkAndCustomizeChat=require("../utils/forkChatUtils").forkAndCustomizeChat,Callout=require("../components/Callout"),DEMO_TITLE="\n## Build Intelligence Demo\n",PRECONFIGURED_ANALYZER_CHAT_UUID="902483aa-0fcd-463f-8554-e1e027ba00a4",CONFIGURE_BATCH_CHAT_UUID="b9b4c9c8-ad83-4506-a8db-f9500a67bddd",buildIntelligenceDemo={id:"build-intelligence",name:"Build Intelligence",description:"Learn how to deploy your trained analyzers at scale, transforming unstructured data into structured, searchable metadata through intelligent batch processing.",scenes:[{id:"build-intelligence-welcome",action:"typeAndAppend",triggerCondition:(e,t,n,a)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

You already know AI can analyze code at scale. What you might not know is how *trivially simple* it is in GitSense Chat.

**Intelligence for Everyone**

GitSense democratizes AI-powered intelligence extraction - no specialized ML teams required. An accountant with client files in Git can train an AI Brain through simple conversation, then instantly analyze thousands of documents to extract structured data. A student can build a Brain to identify patterns across research papers. A security expert can encode lessons learned and prevent the same mistake from happening again.

GitSense Chat brings advanced AI capabilities to anyone with data in Git and a question to ask.

**What You'll Experience**

We'll deploy a **Security Brain** across the secure-payments repository. You'll see how trivially simple it is to:

1. **Load entire branches with one click** - No manual setup required
2. **Filter intelligently** - By language, size, or what actually changed
3. **Control the analysis** - Adjust batch size to match your needs
4. **Monitor progress** - Watch everything from a single dashboard

The real power isn't in what's possible-it's in how effortlessly *you* can make it happen.

Ready to see how trivially simple intelligence gathering can be?

[**Start Demo**]()

            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(n,e,t,a)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(n.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=a;await MessageService.newChatMessage(t,e.id,{parentId:n.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"build-intelligence-introduce-tool"}}},visibility:"human-public"});a.updateChat()}))}},{id:"build-intelligence-introduce-tool",action:"typeAndAppend",contentToType:`
### Your Command Center

This is the **Analyze Batch Builder**-your command center for deploying intelligence at scale. Everything you need is in one place.

**How It Works:**
- Pick your trained Brain (we've pre-selected our Security Brain)
- Choose files to analyze (19 files from secure-payments, already loaded)
- Add reference files that provide context for every batch
- Set batch size (3 files per batch keeps the AI focused)
- Click any "Start" link to launch analysis

That's it. No complex configuration. No manual file sorting. Just point, click, and let your Brain do the work.

[**Load the Pre-configured Tool**]()

> We've set everything up for you. Click the link above to see the Analyze Batch Builder ready to deploy your Security Brain.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(a,e,t,i)=>{t=t.querySelector("a");if(t&&"Load the Pre-configured Tool"===t.innerText.trim())if(a.kids?.length)t.style.pointerEvents="none";else{t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#";setTimeout(()=>{var e;(e=document.querySelector(".gsc-quick-chat-buttons"))&&new Callout({title:"Analyze Button",purpose:"The Analyze button above loads the Analyze Batch Builder tool, where you configure batch analysis jobs.",steps:['Locate the "Analyze" button',"Click it to load the tool and start configuring your analysis","For this demo, click the link above to load a pre-configured version"],targetElement:e,className:"demo-callout analyze-button-callout",showStepsByDefault:!0,arrowDirection:"up"}).show()},500),t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=i,n=await chatApi.getChat(t,PRECONFIGURED_ANALYZER_CHAT_UUID);if(!n)throw new Error("No pre-configured analyzer chat found with UUID "+PRECONFIGURED_ANALYZER_CHAT_UUID);n=ChatUtils.getChatMessages(n).find(e=>"analyze-batch-builder"===e.type);if(!n)throw new Error("No analyze-batch-builder message found in the pre-configured chat");n={...n};n.parentId=a.id,n.model=e.main_model,await MessageService.newChatMessage(t,e.id,n);i.updateChat()}}},nextSceneId:"build-intelligence-wait-for-tool"},{id:"build-intelligence-wait-for-tool",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>"analyze-batch-builder"===e.type,nextSceneId:"build-intelligence-explain-configuration"},{id:"build-intelligence-explain-configuration",action:"typeAndAppend",contentToType:`
### Everything's Configured

We've loaded the **Analyze Batch Builder** in the message above with your Security Brain and the secure-payments files.

**Ready to Launch?**

Just click any **"Click to start"** link in the message above to launch that batch.  Once you have, we will automatically detect this and conclude the demo.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(n,e,t,a)=>{var i,o,l=MessageUtils.getMessageById(a.chat,n.parent_id),l=a.renderedMessage[l.id]?.contentBody;l?((l=l.querySelectorAll(".abb-status-text")).forEach(e=>{if("Click to start"===e.textContent){let t=e.parentNode.onclick;e.parentNode.onclick=e=>{t(e);MessageService.newChatMessage(a.widget,a.chat.id,{parentId:n.id,model:a.chat.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"build-intelligence-demo-complete"}}},visibility:"human-public"}).then(()=>a.updateChat())}}}),(l=l[0])&&"Click to start"===l.textContent&&(i=SVGUtils.arrowLeft({style:{width:"30px",height:"30px",margin:0}}),i=DomUtils.h.createDiv({append:[i],style:{paddingLeft:"10px"}}),o=DomUtils.h.createDiv({text:"Click this link to start analysis",style:{backgroundColor:"#fff3cd",border:"2px solid #664d03",borderRadius:"4px",width:"200px",fontWeight:500,padding:"10px",textAlign:"center",fontSize:".9em"}}),l.insertAdjacentElement("afterend",i),i.insertAdjacentElement("afterend",o))):console.warn("No parent analyze-batch-builder message found")},nextSceneId:"build-intelligence-wait-for-analysis"},{id:"build-intelligence-wait-for-analysis",action:"createBlankChildMessage",triggerCondition:(e,t,n,a)=>!1,nextSceneId:"build-intelligence-demo-complete"},{id:"build-intelligence-demo-complete",action:"typeAndAppend",contentToType:`
### Demo Complete

You've just seen a **pre-configured** batch analysis in action. Your Security Brain analyzed files for authorization flaws with just a few clicks.

**What You Witnessed:**
- A Security Brain ready to analyze code
- Files already filtered and organized into batches
- One-click launch with live progress tracking
- Results monitored from a simple dashboard

**Try It Yourself**

Want to experience how simple it is to set up batch analysis from scratch? We'll guide you through loading branches, filtering files, and launching your own analysis.

[**Configure Your Own Batch**]()

> This opens a new chat where you can ask AI for help at any stage.

**Next Steps**

Ready to explore more? If you haven't tried it yet, the **Make AI Smarter and Safer** demo shows how to combine multiple Security Brains to catch contradictions and deliver more comprehensive insights than any single analyzer could provide alone.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(n,e,t,a)=>{t=t.querySelector("a");if(!t||"Configure Your Own Batch"!==t.innerText.trim())return;if(n.meta?.demo?.configureBatchChatUuid)return t.href="/?chat="+n.meta.demo.configureBatchChatUuid,void(t.target="_blank");t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#";let i=new ConfirmationBox,o=(t.onclick=e=>{e.preventDefault(),o()},()=>{i.show({title:"Open Configuration Chat",message:"We'll create a copy of the batch configuration chat and open it in a new tab. You'll be able to configure your own batch analysis there. Continue?",confirmButtonText:"Continue",cancelButtonText:"Cancel"},async()=>{var e=await l();e&&window.open("/?chat="+e.uuid,"_blank")})}),l=async()=>{var{chat:e,widget:t}=a,e=await forkAndCustomizeChat(CONFIGURE_BATCH_CHAT_UUID,t,"","","Configure Batch Analysis",e.id,e.main_model);return e&&await MessageService.updateChatMessage(t,n.id,{newMeta:{...n.meta,demo:{...n.meta.demo,configureBatchChatUuid:e.uuid}}}),e};DemoUtils.enableChatBox()},nextSceneId:null}]};module.exports={buildIntelligenceDemo:buildIntelligenceDemo};
