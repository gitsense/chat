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

let{CodeBlockUtils,ChatUtils,DomUtils,GSToolBlockUtils,MessageUtils,PatchUtils,SVGUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DEMO_TITLE="## Cost-Optimized Patches",GENERATE_INITIAL_CODE_COMMAND="Generate a simple JavaScript program with a function that adds two numbers.",GENERATED_CODE_BLOCK_UUID="3516319d-6aa8-4648-a1c7-0732637cee87",GENERATE_PATCH_COMMAND="Change the JavaScript program to subtract the numbers instead of adding them, and provide a patch.",SIMULATED_INITIAL_CODE=`/*
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
`,costOptimizedPatchesDemo={id:"cost-optimized-patches",name:"Cost-Efficient Code Generation",description:"Learn how GitSense Chat enables cost-efficient code generation by using cheaper models to fix patches from advanced LLMs.",scenes:[{id:"cost-optimized-patches-intro",action:"typeAndAppend",triggerCondition:(e,t,a,i)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

In this demo, you'll discover how GitSense Chat solves a common problem with AI code generation: **the patch dilemma**.

### The Problem

When you ask an LLM to modify code, you have two options:

1. **Request a patch** - Cheaper (often 10x less expensive), but LLMs often get line numbers wrong
2. **Request full code** - Always works, but expensive for large files (can cost 10-20x more)

Traditionally, this leaves you stuck: either manually fix broken patches or pay more for complete code regeneration.

### GitSense Chat's Solution

We support a **two-model approach**: expensive models create the logic, cheap models fix the mechanics. When a patch fails, a more cost-effective model can be used to apply the bad patch by understanding the intended change.

To begin this interactive experience, please click the **'Start Demo'** link below.

[**Start Demo**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,s)=>{t=t.querySelector("a");t&&"Start Demo"===t.innerText.trim()&&(i.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=s,a=await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"user",message:GENERATE_INITIAL_CODE_COMMAND,visibility:"public"}),a=await MessageService.newChatMessage(t,e.id,{parentId:a.message.id,model:e.main_model,role:"assistant",message:"```javascript\n"+SIMULATED_INITIAL_CODE+"\n```",visibility:"public"});await MessageService.newChatMessage(t,e.id,{parentId:a.message.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"cost-optimized-patches-explain-code-gen-and-patch-request"}}},visibility:"human-public"});s.updateChat()}))}},{id:"cost-optimized-patches-explain-code-gen-and-patch-request",action:"typeAndAppend",triggerCondition:(e,t,a,i)=>{a=MessageUtils.getMessageById(a.chat,e.parent_id);return a&&a.message.includes(SIMULATED_INITIAL_CODE)},contentToType:`
### What Happened

We've just simulated the initial code generation: a simple JavaScript program with an \`addNumbers\` function. This represents the first step where an LLM generates new code.

Now, we'll simulate a request to modify this program. This next step will intentionally result in a "bad patch" to demonstrate a common challenge with LLM-generated patches and how GitSense Chat provides a solution.

The command below is ready to be sent. It instructs the LLM to change the \`addNumbers\` function to subtract instead, and to provide a **patch** for the change.

\`\`\`
${GENERATE_PATCH_COMMAND}
\`\`\`

Click the link below to send this request and see the simulated patch.

[**Send Patch Request**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(i,e,t,s)=>{t=t.querySelector("a");t?(await DemoUtils.simulateTyping(GENERATE_PATCH_COMMAND,s),t.onclick=async e=>{e.preventDefault();var{chat:e,widget:t}=s,a=(MessageUtils.getMessageById(s.chat,i.parent_id),await MessageService.newChatMessage(t,e.id,{parentId:i.id,model:e.main_model,role:"user",message:GENERATE_PATCH_COMMAND,visibility:"public"})),a=await MessageService.newChatMessage(t,e.id,{parentId:a.message.id,model:e.main_model,role:"assistant",message:"```diff\n"+SIMULATED_BAD_PATCH+"\n```",visibility:"public"});await MessageService.newChatMessage(t,e.id,{parentId:a.message.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"cost-optimized-patches-conclusion"}}},visibility:"human-public"});s.updateChat()}):console.error(`No send link in current scene ${e.id} found`)}},{id:"cost-optimized-patches-conclusion",action:"typeAndAppend",triggerCondition:(e,t,a,i)=>{a=MessageUtils.getMessageById(a.chat,e.parent_id);return a&&a.message.includes(SIMULATED_BAD_PATCH)},contentToType:`
## Demo Complete

### What Happened

We've simulated a bad patch. The GitSense Chat \`patch handler\` would automatically detect that this patch cannot be applied correctly.

Notice the "Error" message and the **"Fix Patch"** button below the patch. This is where GitSense Chat's cost efficiency shines:

1.  **The LLM understood the intent:** Even with a "bad patch," the LLM clearly understood the logical change (add to subtract).
2.  **Fix with a cheaper model:** Clicking the **"Fix Patch"** button initiates a "Fix Patch Chat." In this new chat, you can use a **cheaper** model to review the original code and the intended change, then generate the full updated code. This approach can significantly reduce costs compared to regenerating the entire code with an expensive model.

To understand how to fix the patch and leverage cost-efficient models, follow these steps:

**Click on each step below to reveal a visual guide:**

1.  Click the **'Fix Patch'** button below the patch. This will load a settings modal where you can select a model.
2.  Select a cheaper model from the dropdown, then press **'Go'** to create the 'Fix Patch' chat.
3.  Review the code generated by applying the bad patch. This code represents the LLM's understanding of the intended change, even though the original patch format was incorrect.
4.  If satisfied with the applied code, optionally click **'Generate Patch'** to create a new, valid patch. Then, click **'Replace with Fixed Patch (Recommended)'** to update the bad patch in the parent chat (containing this demo).

Now that you understand how GitSense Chat's cost-efficient patch fixing works, try this feature with your own code. It can significantly reduce your AI development costs while maintaining code quality.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,a,i)=>{e=MessageUtils.getMessageById(i.chat,e.parent_id),e=i.renderedMessage[e.id]?.contentBody;if(e){var c=e.querySelector(".regenerate-patch-btn");if(c){c=c.parentNode;let o=DomUtils.h;var r="click-preview-arrow";if(!e.querySelector("."+r)){e=SVGUtils.arrowUp({style:{width:"30px",height:"30px",margin:0,position:"relative",top:"-5px"}}),r=o.createDiv({cls:r,append:[e],style:{paddingLeft:"18px"}}),e=o.createDiv({text:"Click this button and follow the steps in the message below.",style:{backgroundColor:"#fff3cd",border:"2px solid #664d03",borderRadius:"4px",width:"270px",fontWeight:500,padding:"10px",textAlign:"center",fontSize:".9em"}}),c=(c.insertAdjacentElement("afterend",r),r.insertAdjacentElement("afterend",e),a.querySelectorAll("ol > li"));let s=["step-1-click-start.png","step-2-select-model-go.png","step-3-review-applied-code.png","step-4-generate-replace-patch.png"],n=i.widget.staticURL.replace(/\/{file}/,"");c.forEach((t,a)=>{if(0!==a&&1!==a){a-=2,t.style.cursor="pointer";let e=o.createDiv({cls:"demo-step-details",style:{display:"none",marginTop:"10px",padding:"10px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"5px"}});var i=document.createElement("img");i.src=n+"/assets/images/demos/cost-efficiency/"+s[a],i.style.maxWidth="100%",i.style.border="1px solid #ccc",e.appendChild(i),t.appendChild(e),t.onclick=()=>{e.style.display="none"===e.style.display?"block":"none"}}})}}else console.warn("costOptimizedPatchesDemo: No 'Start' button found in parent message for scene "+t.id)}else console.error("costOptimizedPatchesDemo: No parent message contentBody found for scene "+t.id)},nextSceneId:null}]};module.exports={costOptimizedPatchesDemo:costOptimizedPatchesDemo};
