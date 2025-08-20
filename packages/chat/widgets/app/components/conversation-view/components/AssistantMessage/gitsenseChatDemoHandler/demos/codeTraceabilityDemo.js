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

let{CodeBlockUtils,ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DEMO_TITLE="# Code Generation & Traceability Demo",GENERATE_HELLO_WORLD_COMMAND='Generate a "Hello World" program in JavaScript. Only provide the code block, no commentary or pleasantries.',CHANGE_HELLO_TO_HEY_COMMAND='Change "Hello" to "Hey" in the JavaScript program and provide a patch. Only provide the code block, no commentary or pleasantries.',codeTraceabilityDemo={id:"code-traceability",name:"Code Generation & Traceability Demo",description:"Learn how GitSense Chat generates code and provides unparalleled traceability for every AI-assisted change.",scenes:[{id:"code-traceability-intro",action:"typeAndAppend",triggerCondition:(e,t,o,a)=>e.message.includes(DEMO_TITLE),contentToType:`
Welcome! In this demo, you'll see how to generate code and, more importantly, how GitSense Chat ensures every line is traceable back to its conversational origin, complete with unique \`Block-UUID\`s, versioning, and authorship. This allows you to audit AI contributions and understand the full human-AI collaboration.

We'll start by generating a basic "Hello World" program in JavaScript. The chat input below has the instructions ready:

If you look at the chat input below, you'll see the following instructions are ready to be sent:

\`\`\`
${GENERATE_HELLO_WORLD_COMMAND}
\`\`\`

Click the link below to send the message to generate the "Hello World" program.

[**Send Message**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.

---

**LLM responses are live.** If the demo suddenly stops, cannot continue or becomes somewhat nonsensical, it is because we were unable to predict what the LLM would return. Most of the time, you should be able to delete messages and then click the **Send Message** link again to keep going. If that does not work, you will need to start another demo.

            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,o,a)=>{o=o.querySelector("a");o?(await DemoUtils.simulateTyping(GENERATE_HELLO_WORLD_COMMAND,a),o.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"code-traceability-await-hello-world"},{id:"code-traceability-await-hello-world",action:"createBlankChildMessage",triggerCondition:(e,t,o,a)=>{var o=MessageUtils.getMessageById(o.chat,e.parent_id);return!(!o||o.message.trim()!==GENERATE_HELLO_WORLD_COMMAND||(o=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,!o.find(e=>"code"===e.type&&"javascript"===e.language)))},nextSceneId:"code-traceability-explain-hello-world"},{id:"code-traceability-explain-hello-world",action:"typeAndAppend",contentToType:`
## What Happened

In the previous step, the LLM successfully generated the "Hello World" JavaScript program.

Take a moment to look at the header of the generated code block. You'll see a \`Block-UUID\` (e.g., \`Block-UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\`). This is a **unique identifier** for that specific piece of code. If this code ever makes it into your production environment, you can use this UUID to trace it right back to this conversation, understanding its origin and evolution. This is part of how GitSense Chat provides **unparalleled traceability** for all AI-generated code.

## Next Steps

Now, let's see how GitSense Chat tracks changes to AI-generated code. We'll ask the LLM to modify the "Hello World" program.

When the LLM responds, notice that the new output (whether a patch or full code) will include a \`Parent-UUID\` that points back to the \`Block-UUID\` of the original code. Its version number will also be incremented. This creates a clear lineage, ensuring every modification is fully traceable.

The command below is ready to be sent. It instructs the LLM to change "Hello" to "Hey" and to provide a **patch** for the change.

\`\`\`
${CHANGE_HELLO_TO_HEY_COMMAND}
\`\`\`

Click the link below to send the update command.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,o,a)=>{o=o.querySelector("a");o?(await DemoUtils.simulateTyping(CHANGE_HELLO_TO_HEY_COMMAND,a),o.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"code-traceability-await-patch"},{id:"code-traceability-await-patch",action:"createBlankChildMessage",triggerCondition:(e,t,o,a)=>{var o=MessageUtils.getMessageById(o.chat,e.parent_id);return!(!o||o.message.trim()!==CHANGE_HELLO_TO_HEY_COMMAND)&&(o=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,o.some(e=>"patch"===e.type))},nextSceneId:"code-traceability-conclusion"},{id:"code-traceability-conclusion",action:"typeAndAppend",contentToType:`
## What Happened

In the previous demo, the LLM processed your request to change "Hello" to "Hey" in the JavaScript program.

You should have received a **code patch** showing the exact changes.

*    **Good Patch:** If you don't see an error message, click the "Preview Changes" link above the patch code block to view a side-by-side comparison, allowing you to review the AI-generated changes and copy the **updated** version.
*    **Bad Patch:** If you see an "Error" message and a fix patch "**Start**" button, don't worry! Sometimes LLMs generate imperfect patches. This "**Start**" button is your solution. Clicking it would guide you through correcting the patch or getting the full, corrected code.

Regardless of whether an error occurred, if you inspect the patch metadata in the header, you'll find a source UUID that points directly back to the \`Block-UUID\` of the original "Hello World" program. The version number was also incremented (e.g., from \`v1.0.0\` to \`v1.0.1\`).

This demonstrates how GitSense Chat ensures **full traceability** for all AI-generated code. Every modification, whether a small patch or a complete rewrite, maintains a clear lineage back to its origin, allowing you to audit, understand, and manage the evolution of your codebase with confidence.

## Demo Complete

This concludes the **Code Generation & Traceability Demo**. You can now:
*   Experiment further in this chat.
*   Start another demo from the main demo selection page.
*   Explore GitSense Chat's other features.

---

**Important Note:** Please be aware that messages in this demo starting with "What Happened" or "Demo Complete" are for your reference only and are not visible to the LLM. If you ask the LLM about their content, it will not have access to that information.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={codeTraceabilityDemo:codeTraceabilityDemo};
