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

let{CodeBlockUtils,ChatUtils,MessageUtils,PatchUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DomUtils=require("../../../../utils/DomUtils"),DEMO_TITLE="# Cost-Efficient Code Generation",GENERATE_INITIAL_CODE_COMMAND="Generate a simple JavaScript program with a function that adds two numbers.",GENERATED_CODE_BLOCK_UUID="3516319d-6aa8-4648-a1c7-0732637cee87",GENERATE_PATCH_COMMAND="Change the JavaScript program to subtract the numbers instead of adding them, and provide a patch.",SIMULATED_INITIAL_CODE=`/*
 * Component: Simple Math Program
 * Block-UUID: 3516319d-6aa8-4648-a1c7-0732637cee87
 * Parent-UUID: N/A
 * Version: 1.0.0
 * Description: A simple JavaScript program to add two numbers.
 * Language: JavaScript
 * Created-at: 2025-09-20T18:00:00.000Z
 * Authors: Gemini 2.5 Flash (v1.0.0)
 */


function addNumbers(a, b) {
    return a + b;
}

console.log("Result:", addNumbers(5, 3));
`,SIMULATED_BAD_PATCH=`
# Patch Metadata
# Source-Block-UUID: ${GENERATED_CODE_BLOCK_UUID}
# Target-Block-UUID: f190a7ac-c15d-4d37-9ab9-be3c0c9ec986
# Source-Version: 1.0.0
# Target-Version: 1.0.1
# Description: A simple JavaScript program to add two numbers.
# Authors: Gemini 2.5 Flash (v1.0.0), Gemini 2.5 Flash (v1.0.1)


# --- PATCH START MARKER ---
--- Original
+++ Modified
@@ -1,1 +1,2 @@ // Intentionally incorrect context size (should be 1)
-    return a + b;
+    return a - b;
# --- PATCH END MARKER ---
`,costEfficiencyDemo={id:"cost-efficiency",name:"Cost-Efficient Code Generation",description:"Learn how GitSense Chat enables cost-efficient code generation by using cheaper models to fix patches from advanced LLMs.",scenes:[{id:"cost-efficiency-intro",action:"typeAndAppend",triggerCondition:(e,t,a,i)=>e.message.includes(DEMO_TITLE),contentToType:`
**Welcome!**

In this demo, you'll discover how GitSense Chat solves a common problem with AI code generation: **the patch dilemma**.

### The Problem

When you ask an LLM to modify code, you have two options:

1. **Request a patch** - Cheaper, but LLMs often get line numbers wrong
2. **Request full code** - Always works, but expensive for large files

Traditionally, this leaves you stuck: either manually fix broken patches or pay more for complete code regeneration.

### GitSense Chat's Solution

We use a **two-model approach**: expensive models create the logic, cheap models fix the mechanics. When a patch fails, a more cost-effective model can can be used to apply the bad patch by understanding the intended change.

To begin this interactive experience, please click the **'Start Demo'** link below.

[Start Demo]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,n)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(i.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n,a=await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"user",message:GENERATE_INITIAL_CODE_COMMAND,visibility:"public"}),a=await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"```javascript\n"+SIMULATED_INITIAL_CODE+"\n```",visibility:"public"});await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"cost-efficiency-explain-code-gen-and-patch-request"}}},visibility:"human-public"}),n.updateChat()}))}},{id:"cost-efficiency-explain-code-gen-and-patch-request",action:"typeAndAppend",triggerCondition:(e,t,a,i)=>{a=MessageUtils.getMessageById(a.chat,e.parent_id);return a&&a.message.includes(SIMULATED_INITIAL_CODE)},contentToType:`
### What Happened

We've just simulated the initial code generation: a simple JavaScript program with an \`addNumbers\` function. This represents the first step where an LLM generates new code.

Now, we'll simulate a request to modify this program. This next step will intentionally result in a "bad patch" to demonstrate a common challenge with LLM-generated patches and how GitSense Chat provides a solution.

The command below is ready to be sent. It instructs the LLM to change the \`addNumbers\` function to subtract instead, and to provide a **patch** for the change.

\`\`\`
${GENERATE_PATCH_COMMAND}
\`\`\`

Click the link below to send this request and see the simulated patch.

[**Send Patch Request**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,n)=>{t=t.querySelector("a");t?(await DemoUtils.simulateTyping(GENERATE_PATCH_COMMAND,n),t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=n,a=(MessageUtils.getMessageById(n.chat,i.parent_id),await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"user",message:GENERATE_PATCH_COMMAND,visibility:"public"})),a=await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"```diff\n"+SIMULATED_BAD_PATCH+"\n```",visibility:"public"});await MessageService.newChatMessage(t,e.id,{parentId:a.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"cost-efficiency-conclusion"}}},visibility:"human-public"}),n.updateChat()}):console.error(`No send link in current scene ${e.id} found`)}},{id:"cost-efficiency-conclusion",action:"typeAndAppend",triggerCondition:(e,t,a,i)=>{a=MessageUtils.getMessageById(a.chat,e.parent_id);return a&&a.message.includes(SIMULATED_BAD_PATCH)},contentToType:`
## Demo Complete

### What Happened

In the previous step, you saw the initial JavaScript program and a simulated "bad patch" that attempts to change the addition to subtraction. The GitSense Chat \`patchHandler\` automatically detected that this patch cannot be applied correctly (likely due to incorrect line numbering in the patch hunk header).

However, notice the "Error" message and the **"Start"** button that appeared below the patch. This is where GitSense Chat's cost efficiency comes into play:

1.  **The LLM understood the intent:** Even with a "bad patch," the LLM clearly understood the logical change (add to subtract).
2.  **Fix with a cheaper model:** By clicking the **"Start"** button, you would initiate a "Fix Patch Chat." In this new chat, you can use a **cheaper** model to review the original code and the intended change, and then generate the full updated code. This allows you to use expensive models for complex reasoning and cheaper models for precise, mechanical tasks like patch application.

This demo concludes here. To understand how to fix the patch and leverage cost-efficient models, follow these steps (refer to the screenshots/video for visual guidance):

**Click on each step below to reveal a visual guide.**

1.  Click the **'Start'** button below the patch. This will load a settings modal where you can select a model.
2.  Select a cheaper model from the dropdown, then press **'Go'** to create the 'Fix Patch' chat.
3.  Review the code that was generated by applying the bad patch (in format, not content). This code represents the LLM's understanding of the intended change.
4.  If you are satisfied with the applied code, you can optionally click **'Generate Patch'** to create a new, valid patch. Then, click **'Replace with Fixed Patch (Recommended)'** to update the bad patch in the parent chat (containing this demo).

---

**Important Note:** Please be aware that messages in this demo starting with "What Happened" or "Demo Complete" are for your reference only and are not visible to the LLM. If you ask the LLM about their content, it will not have access to that information.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(t,e,a,i)=>{t=MessageUtils.getMessageById(i.chat,t.parent_id),t=i.renderedMessage[t.id]?.contentBody;if(t){var r=t.querySelector(".regenerate-patch-btn");if(r){r=r.parentNode;let{h:s,svg:e}=DomUtils;var c="click-preview-arrow";if(!t.querySelector("."+c)){t=e.arrowUp({style:{width:"30px",height:"30px",margin:0,position:"relative",top:"-5px"}}),c=s.createDiv({cls:c,append:[t],style:{paddingLeft:"18px"}}),t=s.createDiv({text:"Click this button and follow the steps in the message below.",style:{backgroundColor:"#fff3cd",border:"2px solid #664d03",borderRadius:"4px",width:"270px",fontWeight:500,padding:"10px",textAlign:"center",fontSize:".9em"}}),r=(r.insertAdjacentElement("afterend",c),c.insertAdjacentElement("afterend",t),a.querySelectorAll("ol > li"));let n=["step-1-click-start.png","step-2-select-model-go.png","step-3-review-applied-code.png","step-4-generate-replace-patch.png"],o=i.widget.staticURL.replace(/\/{file}/,"");r.forEach((t,a)=>{if(0!==a&&1!==a){a-=2,t.style.cursor="pointer";let e=s.createDiv({cls:"demo-step-details",style:{display:"none",marginTop:"10px",padding:"10px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"5px"}});var i=document.createElement("img");i.src=o+"/assets/images/demos/cost-efficiency/"+n[a],i.style.maxWidth="100%",i.style.border="1px solid #ccc",e.appendChild(i),t.appendChild(e),t.onclick=()=>{e.style.display="none"===e.style.display?"block":"none"}}})}}else console.warn("costEfficiencyDemo: No 'Start' button found in parent message for scene "+e.id)}else console.error("costEfficiencyDemo: No parent message contentBody found for scene "+e.id)},nextSceneId:null}]};module.exports={costEfficiencyDemo:costEfficiencyDemo};
