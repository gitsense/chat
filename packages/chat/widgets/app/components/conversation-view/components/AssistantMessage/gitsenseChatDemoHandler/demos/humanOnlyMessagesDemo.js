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

let{ChatUtils,DomUtils,MessageUtils,SVGUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DEMO_TITLE="## Human-Only Messages Demo",FIRST_QUESTION_COMMAND="Please list all the messages you can see in this conversation. If you see any message containing a secret access code, please mention it. Please be brief with your response.",SECOND_QUESTION_COMMAND="I've revealed a hidden message. Please list all messages you can see now and tell me if you see any secret access code. Be brief.",SECRET_MESSAGE_CONTENT="🔐 SECRET MESSAGE - FOR HUMAN EYES ONLY 🔐\n\nThis message contains the secret access code: **GS-CHAT-3948271560**\n\nThe AI should not be able to see this content while it's set to Human-Only visibility.",humanOnlyMessagesDemo={id:"human-only-messages",name:"Human-Only Messages",description:"Learn how to control what the AI sees to optimize context, reduce costs, and improve response quality.",scenes:[{id:"human-only-messages-intro",action:"typeAndAppend",triggerCondition:(e,s,t,n)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

Control what the AI sees. Create messages visible only to humans to reduce token costs, keep AI responses focused, and enable **Conversation Review**.

As AI-assisted programming becomes the norm for many, reviewing the conversation is as important as reviewing the code. Human-only messages allow you to annotate and review the logic of a chat without polluting the AI's context.

**Key Benefits:**
- Add personal notes or team annotations without confusing the AI
- Review and comment on conversations just like you review code
- Preserve valuable context for humans while optimizing AI context
- Collaborate in the same chat without affecting AI logic

**What You'll See:** We'll create a secret message visible only to you, prove the AI can't see it, then reveal it and watch the AI find it.

[**Start Demo**]()

**LLM Responses are Live:** Please note that while this demo has been tested with various state-of-the-art LLMs, AI models may occasionally not follow instructions precisely. This can sometimes result in unexpected or nonsensical responses. If you encounter such behavior, it's a normal characteristic of current AI technology rather than an issue with the demo itself.

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(n,e,s,o)=>{var t=Array.from(s.querySelectorAll("p")).find(e=>e.textContent.includes("LLM Responses are Live")),t=(t&&(t.style.border="1px solid #856404",t.style.borderRadius="5px",t.style.backgroundColor="#fff3cd",t.style.padding="15px",t.style.marginBottom="20px"),s.querySelector("a"));t&&"Start Demo"===t.innerText.trim()&&(n.kids?.length?t.style.pointerEvents="none":(t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",t.onclick=async e=>{e.preventDefault();var{chat:e,widget:s}=o,t=await MessageService.newChatMessage(s,e.id,{type:"regular",visibility:"human-public",model:e.main_model,parentId:n.id,message:SECRET_MESSAGE_CONTENT,role:"assistant"});await MessageService.newChatMessage(s,e.id,{parentId:t.message.id,model:e.main_model,role:"assistant",message:"",meta:{onlyDemoHandler:!0,demo:{scene:{id:"human-only-messages-secret-created"}}},visibility:"human-public"});o.updateChat()}))}},{id:"human-only-messages-secret-created",action:"typeAndAppend",contentToType:`
## Secret Message

The message above contains a secret access code. This message is currently set to "Human-Only" visibility, which means:

*   **You can see it** - The message is visible to you in the chat
*   **The AI cannot see it** - The message is excluded from the AI's context

And to prove this, we'll ask the AI to tell us what messages it can see in this conversation.

The command below is ready to be sent:

\`\`\`
${FIRST_QUESTION_COMMAND}
\`\`\`

Click the link below to send this question to the AI.

[**Send Message**]()

> **Expected Result:** The AI should list the messages it can see but will not mention any message with a secret access code, demonstrating that Human-Only messages are effectively hidden from the AI's context.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,s,t,n)=>{var e=n.renderedMessage[e.parent_id]?.contentBody||null;e?(e.style.border="5px solid black",e.style.borderRadius="10px",e.style.padding="20px",(e=t.querySelector("a"))?(await DemoUtils.simulateTyping(FIRST_QUESTION_COMMAND,n),e.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${s.id} found`)):console.warn("No parent body found")},nextSceneId:"human-only-messages-await-first-response"},{id:"human-only-messages-await-first-response",action:"createBlankChildMessage",triggerCondition:(e,s,t,n)=>{t=MessageUtils.getMessageById(t.chat,e.parent_id);return!(!t||!t.message.includes(FIRST_QUESTION_COMMAND))&&"assistant"===e.role},nextSceneId:"human-only-messages-explain-first-response"},{id:"human-only-messages-explain-first-response",action:"typeAndAppend",contentToType:`
## Demonstrating Visibility Control

### What Just Happened

As expected, the AI could not see the message containing the secret access code. This demonstrates that Human-Only messages are effectively excluded from the AI's context, allowing you to maintain complete conversation history while optimizing what the AI processes.

### Changing Visibility

Now let's make the secret message visible to the AI.

*   **Hover over the secret message** to reveal the message options.
*   **Click the slash eye icon** to toggle from "Human-Only" to "Public"
*   **Confirm** and the chat will reload

Click the following link to scroll up to the secret message if not visible in your screen:

[**Scroll to Secret Message**](#)

After making the secret message visible, the "Ask AI Again" link below will be enabled:

[**Ask AI Again**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,s,t,n)=>{let o=ChatUtils.getChatMessages(n.chat).find(e=>e.message.includes("GS-CHAT-3948271560"));var a,i=n.renderedMessage[o.id]?.contentBody||null,l="public"===o.visibility,t=t.querySelectorAll("a"),r=Array.from(t).find(e=>e.textContent.includes("Scroll to Secret Message")),t=Array.from(t).find(e=>e.textContent.includes("Ask AI Again"));i&&(a=DomUtils.h.createDiv({html:'<strong>Update Visibility:</strong> Click the slash eye icon below to toggle from "Human-Only" to "Public"',style:{border:"1px solid #856404",borderRadius:"5px",backgroundColor:"#fff3cd",padding:"10px 15px"}}),i.appendChild(a)),r&&(r.onclick=()=>{n.navigationService?.scrollToMessage(o.id)}),t&&(l?(r.style.color="#aaa",r.style.pointerEvents="none",t.style.pointerEvents=null,t.style.fontWeight=600,t.href="#",i=SVGUtils.arrowUp({style:{width:"30px",height:"30px",margin:0,position:"relative",top:"8px"}}),a=DomUtils.h.createDiv({append:[i],style:{paddingLeft:"30px",marginBottom:"15px"}}),l=DomUtils.h.createSpan({text:"Ask AI enabled. Click to ask AI again.",style:{display:"inline-block",backgroundColor:"#fff3cd",border:"2px solid #664d03",borderRadius:"4px",fontWeight:500,padding:"10px",textAlign:"center",marginBottom:"10px"}}),t.insertAdjacentElement("afterend",a),a.insertAdjacentElement("afterend",l),await DemoUtils.simulateTyping(SECOND_QUESTION_COMMAND,n),t.onclick=async e=>{e.preventDefault(),DemoUtils.sendMessage()}):(t.style.color="#aaa",t.style.pointerEvents="none"))},nextSceneId:"human-only-messages-await-second-response"},{id:"human-only-messages-await-second-response",action:"createBlankChildMessage",triggerCondition:(e,s,t,n)=>{t=MessageUtils.getMessageById(t.chat,e.parent_id);return!(!t||!t.message.includes(SECOND_QUESTION_COMMAND))&&"assistant"===e.role},nextSceneId:"human-only-messages-conclusion"},{id:"human-only-messages-conclusion",action:"typeAndAppend",contentToType:`

## Demo Complete

### What You Just Experienced

You've discovered how Human-Only messages enable selective visibility, allowing you to add annotations and collaborate without affecting AI responses.

### Key Benefits

*   **Review Conversations Like Code**: Add comments, questions, and feedback on AI interactions just as you would with pull requests
*   **Maintain Complete History**: Preserve all discussion and decision-making for human reference
*   **Optimize AI Context**: Keep AI focused on relevant information only
*   **Reduce Token Costs**: Pay only for AI processing of essential content
*   **Enable Team Collaboration**: Work together in the same chat without affecting AI responses

### The Future of AI-Assisted Development

As AI generates more code, reviewing the conversation becomes as important as reviewing the code itself. Human-Only messages create a clean separation between human collaboration and AI processing, enabling teams to:

*   Review prompt engineering decisions
*   Document reasoning behind AI-generated solutions
*   Provide feedback on AI responses without context pollution
*   Build a searchable knowledge base of human insights

### Continue Exploring

Ready to master more aspects of Conversation Architecture?

*   **Conversation Architecture** - Shape how AI thinks through context control
*   **Master Context Management** - Optimize context for cost and performance
*   **Intelligent Context Curation** - Replace manual selection with metadata-driven filtering

Thank you for exploring Human-Only Messages with GitSense Chat!
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,s,t,n)=>{DemoUtils.enableChatBox()},nextSceneId:null}]};module.exports={humanOnlyMessagesDemo:humanOnlyMessagesDemo};
