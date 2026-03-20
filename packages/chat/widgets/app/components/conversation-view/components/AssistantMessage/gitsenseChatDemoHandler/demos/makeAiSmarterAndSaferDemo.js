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

let{ChatUtils,DomUtils,MarkdownUtils,MessageUtils,SVGUtils}=require("@gitsense/gsc-utils"),{chatApi,hljs}=require("../../../../Dependencies"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),forkAndCustomizeChat=require("../utils/forkChatUtils").forkAndCustomizeChat,Callout=require("../components/Callout"),DEMO_TITLE="\n## Make AI Smarter and Safer Demo\n",INSIGHTS_ANALYSIS_CHAT_UUID="a6da42b6-4937-4a1f-a4f8-b8dbcec0ec68",makeAiSmarterAndSaferDemo={id:"make-ai-smarter-and-safer",name:"Make AI Smarter and Safer Demo",description:"Discover how orchestrating multiple AI Brains makes AI smarter through combined expertise and safer by catching contradictions and reducing hallucinations.",scenes:[{id:"make-ai-smarter-and-safer-welcome",action:"typeAndAppend",triggerCondition:(e,t,a,n)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

In the "Train AI" demo, you learned how to create a custom AI Brain-a specialized analyzer that transforms your domain knowledge into searchable intelligence. Now, you'll discover how to **Make AI Smarter and Safer** by orchestrating multiple Brains working together.

**The Power of Combined Intelligence**

Most AI platforms give you a single general-purpose assistant. It's like having one employee try to be your entire company. GitSense Chat lets you build a team of specialized AI Brains that work together, each bringing deep expertise to deliver insights no single analyzer could achieve alone.

**Why Multiple Brains Make AI Safer**

Using multiple analyzers isn't just about building different specialists-it's about de-risking. Imagine processing critical documents where hallucinations could be catastrophic. By having multiple AI Brains analyze the same data, you can cross-reference their findings to catch contradictions, verify consistency, and dramatically reduce the chance of errors.

**What You'll Experience:**

1. **Clone Analyzers for Safety** - See how easy it is to duplicate analyzers to capture independent perspectives
2. **Load Multiple Security Brains** - We'll load six specialized security analyzers to analyze code from multiple angles
3. **Combined Intelligence in Action** - Watch how the AI synthesizes findings from all six experts to deliver comprehensive, cross-validated insights

Ready to see how orchestrating multiple AI Brains makes AI both smarter and safer?

[**Start Demo**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(a,e,t,n)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(a.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n;await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"make-ai-smarter-and-safer-clone-analyzers"}}},visibility:"human-public"});n.updateChat()}))}},{id:"make-ai-smarter-and-safer-clone-analyzers",action:"typeAndAppend",contentToType:`
## Clone Analyzers for Independent Perspectives

Now you'll see how easy it is to create independent perspectives by cloning analyzers. This simple action is your first line of defense against hallucinations and missed information.

**Why Cloning Makes AI Safer**

When you clone an analyzer, you can:
- Run the same analysis with different AI models (GPT-5, Claude, Gemini, etc.) to catch contradictions
- Adjust parameters to focus on different aspects of the same problem
- Create multiple "experts" that independently verify each other's findings

**Try It Yourself**

Follow these steps to see how analyzer cloning works:

1. **View Analyzers** - Click the Analyzers button in the right panel
2. **Select an Analyzer** - Find any analyzer and click the menu icon (⋮)  
3. **Choose Clone** - Select "Clone Analyzer" from the dropdown
4. **Provide a New Name** - Name the copied analyzer and optionally update description 

> **Note:** You don't need to complete the clone process-just explore the modal to understand how easy it is to create independent perspectives. When you're ready, click below to continue.

[**Continue to Load Multiple Analyzers**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(a,e,t,n)=>{t=t.querySelector("a");if(t&&"Continue to Load Multiple Analyzers"===t.innerText.trim())if(a.kids?.length)t.style.pointerEvents="none";else{t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n;await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"make-ai-smarter-and-safer-load-multiple"}}},visibility:"human-public"});n.updateChat()};setTimeout(()=>{var e;(e=document.querySelector(".gsc-analyzers-button"))&&new Callout({title:"Step 1: Open Analyzers Panel",purpose:"Click the Analyzers button in the right panel to access your collection of AI Brains.",steps:["Click the Analyzers button to open the panel","Browse through your available analyzers"],targetElement:e,className:"demo-callout analyzers-callout",showStepsByDefault:!0,marginTop:"20px",arrowDirection:"down"}).show(),setTimeout(()=>{var e=document.querySelector(".gsc-analyzer-menu-icon");e&&new Callout({title:"Step 2: Clone Analyzer",purpose:'Click the menu icon (⋮) on any analyzer and select "Clone Analyzer" to create an independent perspective.',steps:["Click the menu icon (⋮) on any analyzer",'Select "Clone" from the dropdown',"Provide a new name and optionally update description"],targetElement:e,className:"demo-callout menu-callout",showStepsByDefault:!1,marginTop:"10px",arrowDirection:"right"}).show()},1e3)},500)}}},{id:"make-ai-smarter-and-safer-load-multiple",action:"typeAndAppend",contentToType:`
## Load Multiple Security Brains

You've seen how easy it is to create independent perspectives. Now let's put that concept into action by loading **six specialized Security Brains** to analyze code from multiple angles simultaneously.

**Why Six Brains Are Better Than One**

Each Security Brain brings deep expertise in a specific vulnerability type:
1. **Authorization Logic** - Catches permission flaws and access control issues
2. **Sensitive Data in Logs** - Identifies data leakage risks
3. **Insecure Error Messages** - Finds information disclosure vulnerabilities  
4. **Insecure Defaults** - Spots dangerous default configurations
5. **Cryptographic Misuse** - Detects encryption and hashing mistakes
6. **Injection Vulnerabilities** - Finds SQL, XSS, and command injection risks

**The Combined Intelligence Advantage**

When these six experts analyze the same codebase, they don't just find more issues-they find *better* issues. One Brain might flag an authorization flaw, while another spots the same code path leaking sensitive data to logs. Together, they give you a complete picture that no single analyzer could provide.

**What Happens Next**

Click below to load the Insights Builder with all six Security Brains. This is your Command Center for orchestrating multiple analyzers.

[**Load Insights Builder**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(t,e,a,n)=>{a=a.querySelector("a");a&&"Load Insights Builder"===a.innerText.trim()&&(t.kids?.length?a.style.pointerEvents="none":(a.style.pointerEvents=null,a.style.fontWeight=600,a.href="#",a.onclick=async e=>{e.preventDefault();e=await chatApi.getChat(n.widget,INSIGHTS_ANALYSIS_CHAT_UUID);if(!e)throw new Error(`No insights chat with the UUID ${INSIGHTS_ANALYSIS_CHAT_UUID} found`);e=ChatUtils.getChatMessages(e).find(e=>"metadata-insights-builder"===e.type);if(!e)throw new Error("No insights message found in the chat "+INSIGHTS_ANALYSIS_CHAT_UUID);e.parentId=t.id,e.model=n.chat.main_model;await MessageService.newChatMessage(n.widget,n.chat.id,e);n.updateChat()}))},nextSceneId:"wait-for-insights-builder"},{id:"wait-for-insights-builder",action:"createBlankChildMessage",triggerCondition:(e,t,a,n)=>"metadata-insights-builder"===e.type,nextSceneId:"click-load-results-and-ask-ai-button-instructions"},{id:"click-load-results-and-ask-ai-button-instructions",action:"typeAndAppend",contentToType:`
### What Happened

We've configured the **Insights Builder** to construct a search query that draws on the collective intelligence of all six Security Brains.

### Next Steps

When you click the **"Load Results & Review"** button in the message above, the system will:

1. Execute the query across your "Command Center" selections.
2. Retrieve the analyzed security results from all six experts.
3. Add this multi-dimensional analysis to your chat context.

This is where the AI becomes both "Smarter" and "Safer"-it's no longer working from a single perspective, but synthesizing findings from multiple independent experts to catch contradictions and deliver cross-validated insights.

Click the **"Load Results & Review"** button in the message above to begin.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,a,n)=>{var i,e=MessageUtils.getMessageById(n.chat,e.parent_id),n=n.renderedMessage[e.id]?.contentBody;n?(e=n.querySelector(".gsc-load-results-and-ask-ai-btn"))?(n=SVGUtils.arrowLeft({style:{width:"30px",height:"30px",margin:0,position:"relative",top:"8px"}}),n=DomUtils.h.createDiv({append:[n],style:{paddingLeft:"10px"}}),i=DomUtils.h.createDiv({text:"Click this button",style:{backgroundColor:"#fff3cd",border:"2px solid #664d03",borderRadius:"4px",width:"200px",fontWeight:500,padding:"10px",textAlign:"center",fontSize:".9em"}}),e.insertAdjacentElement("afterend",n),n.insertAdjacentElement("afterend",i)):console.warn("makeAiSmarterAndSaferDemo: No 'Load' button found in parent message for scene "+t.id):console.error("makeAiSmarterAndSaferDemo: No parent message contentBody found for scene "+t.id)},nextSceneId:"wait-for-insights-analysis"},{id:"wait-for-insights-analysis",action:"createBlankChildMessage",triggerCondition:(e,t,a,n)=>"meta-raw-result"===e.type,nextSceneId:"the-end"},{id:"the-end",action:"typeAndAppend",contentToType:`
### Combined Intelligence Loaded!

You've just retrieved a comprehensive security analysis from **six specialized Brains**. The AI now has both a "Smarter" and "Safer" view of the codebase because it's synthesizing structured data from multiple independent experts, not just raw text from a single perspective.

**What Makes This "Safer"**

When multiple Brains analyze the same code, they naturally cross-validate each other's findings. If five Brains agree on a critical vulnerability but one disagrees, you can investigate why. This dramatically reduces the risk of hallucinations and catches contradictions before they become problems.

**What Makes This "Smarter"**

Each Brain brings deep, specialized expertise. The Authorization Logic expert spots permission flaws. The Cryptographic Misuse expert catches encryption errors. Together, they deliver insights no single generalist could achieve-like spotting how an authorization flaw in one file combines with insecure logging in another to create a data leakage risk.

### Try Asking the AI:

**"Which vulnerability should I fix first and why?"**
*AI considers severity across all six Brains and prioritizes holistically.*

**"Show me where the authorization and logging analyzers flagged the same code path."**
*AI identifies overlapping concerns that compound risk.*

**"Are there any contradictions in the findings between analyzers?"**
*AI cross-references results to catch inconsistencies.*

### The Complete Journey

You've now experienced both sides of building a personal AI assistant:
1. **Train AI** - Create specialized Brains by transferring your expertise
2. **Make AI Smarter and Safer** - Orchestrate multiple Brains to cross-validate and deliver comprehensive insights

This is how you move from AI consumer to AI creator-building a team of experts that work together to make smarter, safer decisions.

## Demo Complete

This concludes the **Make AI Smarter and Safer** demo. You can now return to the demos home page or continue chatting with the AI about the security findings above.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,a,n)=>{e=MessageUtils.getMessageById(n.chat,e.parent_id),n=n.renderedMessage[e.id]?.contentBody;if(n){var e=n.querySelector(".metadata-simple-view"),n=DomUtils.h.createDiv({html:'<h3 style="margin-top:0px">What AI Sees vs. What You See</h3><p style="margin-bottom:0px">The AI doesn\'t see the UI buttons or toggles. To see the exact "source of truth" the AI uses, hover over this message and click the <strong>pencil icon</strong>. Understanding this structure helps you ask more precise questions!</p>',style:{backgroundColor:"#fff3cd",border:"2px solid #664d03",borderRadius:"4px",padding:"20px",marginTop:"30px"}}),i=(e.appendChild(n),document.querySelectorAll(".demo-callout"));if(i&&i.length)for(let e=0;e<i.length;e++)i[e].remove()}else console.error("makeAiSmarterAndSaferDemo: No parent message contentBody found for scene "+t.id)},nextSceneId:null}]};module.exports={makeAiSmarterAndSaferDemo:makeAiSmarterAndSaferDemo};
