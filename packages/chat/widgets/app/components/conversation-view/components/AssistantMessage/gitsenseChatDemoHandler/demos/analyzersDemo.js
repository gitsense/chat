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

let{CodeBlockUtils,ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DEMO_TITLE="## AI-Assisted Search & Analyzers Demo",LIST_ANALYZERS_COMMAND="!ask list production ready analyzers that can help with code quality",SHOW_ANALYZER_SCHEMA_COMMAND="!ask show the schema for the code comment analyzer",FIND_OUTDATED_COMMENTS='!ask using the code comment analyzer, find files with outdated comments in the "Hey World" and "Hello World" repositories.',analyzersDemo={id:"analyzers",name:"AI-Assisted Search & Analyzers Demo",description:"Discover how to leverage AI-powered Analyzers to perform intelligent semantic searches and extract actionable insights from your data.",scenes:[{id:"analyzers-intro",action:"typeAndAppend",triggerCondition:(e,t,a,s)=>e.message.includes(DEMO_TITLE),contentToType:`
Welcome! In this demo, you'll discover how to transform your unstructured data into a powerful, personalized knowledge base using our intelligent **Analyzers** (the "Brains").

Analyzers allow you to teach the AI what to look for in any text file - from code to notes - and extract specific, structured data without writing a single line of code. This turns raw information into filterable, actionable insights, enabling you to:
*   **Unlock intelligent search:** Ask complex natural language questions and get precise answers.
*   **Automate data extraction:** Turn free-form text into organized, queryable metadata.
*   **Enhance context building:** Precisely filter relevant files for LLM interactions.

The command below is ready to be sent. It will list production-ready Analyzers that can help with code quality, giving you a glimpse into the power of these "Brains."

\`\`\`
${LIST_ANALYZERS_COMMAND}
\`\`\`

Click the link below to send this command. We'll explain the results once the search is finished and then move on to the next step.

[**Send Message**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.

---

**LLM responses are live.** If the demo suddenly stops, cannot continue or becomes somewhat nonsensical, it is because we were unable to predict what the LLM would return. Most of the time, you should be able to delete messages and then click the **Send Message** link again to keep going. If that does not work, you will need to start another demo.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,a,s)=>{a=a.querySelector("a");a?(await DemoUtils.simulateTyping(LIST_ANALYZERS_COMMAND,s),a.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzers-await-list"},{id:"analyzers-await-list",action:"createBlankChildMessage",triggerCondition:(e,t,a,s)=>{var a=MessageUtils.getMessageById(a.chat,e.parent_id);return!!(a&&a.message.includes(LIST_ANALYZERS_COMMAND)&&(a=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,a.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"analyzers-explain-list"},{id:"analyzers-explain-list",action:"typeAndAppend",contentToType:`
### What Happened

The AI-assisted search found production-ready analyzers that can improve code quality, namely the \`code-comment-analyzer\`, which helps identify and report issues in code comments, such as spelling errors and outdated parameter descriptions.

### Next Steps

With this information, our next step is to look closer at the \`code-comment-analyzer\` by getting its schema. This will show us the types of questions we can ask and the structured data we can extract.

The command below is ready to be sent.

\`\`\`
${SHOW_ANALYZER_SCHEMA_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,a,s)=>{a=a.querySelector("a");a?(await DemoUtils.simulateTyping(SHOW_ANALYZER_SCHEMA_COMMAND,s),a.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzers-await-schema"},{id:"analyzers-await-schema",action:"createBlankChildMessage",triggerCondition:(e,t,a,s)=>{var a=MessageUtils.getMessageById(a.chat,e.parent_id);return!!(a&&a.message.includes(SHOW_ANALYZER_SCHEMA_COMMAND)&&(a=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,a.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"analyzers-explain-schema"},{id:"analyzers-explain-schema",action:"typeAndAppend",contentToType:`
### What Happened

We've successfully retrieved the schema for the \`code-comment-analyzer\`. This schema shows us the metadata fields the Analyzer can extract, such as \`has_spelling_mistakes\`, \`outdated_comment_detected\`, and \`relevance_summary\`. These fields provide a structured way to understand and query your codebase, allowing for more precise and meaningful insights.

### Next Steps

Now that we have this schema, we can do a semantic search to find specific issues in your codebase. Instead of just listing files, we'll ask the LLM to *summarize* the types of spelling mistakes found, demonstrating how Analyzers enable deeper insights.

The command below is ready to be sent.

\`\`\`
${FIND_OUTDATED_COMMENTS}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,a,s)=>{a=a.querySelector("a");a?(await DemoUtils.simulateTyping(FIND_OUTDATED_COMMENTS,s),a.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzers-await-semantic-search"},{id:"analyzers-await-semantic-search",action:"createBlankChildMessage",triggerCondition:(e,t,a,s)=>{var a=MessageUtils.getMessageById(a.chat,e.parent_id);return!!(a&&a.message.includes(FIND_OUTDATED_COMMENTS)&&(a=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,a.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"analyzers-explain-semantic-search"},{id:"analyzers-explain-semantic-search",action:"typeAndAppend",contentToType:`
### What Happened

We've successfully demonstrated how GitSense Chat AI-assisted search, powered by **Analyzers** (our "Brains"), can transform unstructured code comments into actionable insights. By leveraging the \`code-comment-analyzer\`, we precisely identified files with outdated comments across the "Hey World" and "Hello World" repositories, turning raw text into filterable, queryable data.

## Demo Complete

This concludes the **AI-Assisted Search & Analyzers Demo**. You've seen how Analyzers can unlock intelligent search and automate data extraction.

What would you like to do next? You could:
*   Experiment further in this chat.
*   Start another demo from the main demo selection page.
*   Explore GitSense Chat's other features.

---

**Important Note:** Please be aware that messages in this demo starting with "What Happened" or "Demo Complete" are for your reference only and are not visible to the LLM. If you ask the LLM about their content, it will not have access to that information.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={analyzersDemo:analyzersDemo};
