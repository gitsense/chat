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

let{CodeBlockUtils,ChatUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DEMO_TITLE="## AI-Assisted Search & Analyzers Demo",LIST_ANALYZERS_COMMAND="!ask List production ready analyzers that can help with code quality. If you are unsure, list all production ready anaylzers.",SHOW_ANALYZER_SCHEMA_COMMAND="!ask What are the extracted metadata fields for the `code-comment-analyzer`?",FIND_OUTDATED_COMMENTS='!ask Using the code-comment analyzer, show me the distribution of spelling mistakes, outdated comments, and incorrect function references in the "Hey World" and "Hello World" repositories. Present the numbers in a markdown table with North-American formatting (e.g., 1,234) and then give a short summary in a `gitsense-search-flow` block.',analyzersDemo={id:"analyzers",name:"AI-Assisted Search & Analyzers Demo",description:"Discover how to leverage AI-powered Analyzers to perform intelligent semantic searches and extract actionable insights from your data.",scenes:[{id:"analyzers-intro",action:"typeAndAppend",triggerCondition:(e,t,s,a)=>e.message.includes(DEMO_TITLE),contentToType:`
Welcome! This demo will demonstrate **AI-Assisted Search & Analyzers** in GitSense Chat.  You'll learn to:

*   Discover AI Analyzers
*   Explore Analyzer Schemas
*   Perform AI Search
*   Extract AI Insights
*   Control AI Output

Ready to work smarter with GitSense Chat and AI? To begin, we will ask AI to list production-ready Analyzers that can help with code quality with the following command:

\`\`\`
${LIST_ANALYZERS_COMMAND}
\`\`\`

Click the link below to send this command. We'll explain the results once the search is finished and then move on to the next step.

[**Send Message**]()

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.

---

**LLM responses are live.** If the demo suddenly stops, cannot continue or becomes somewhat nonsensical, it is because we were unable to predict what the LLM would return. Most of the time, you should be able to delete messages and then click the **Send Message** link again to keep going. If that does not work, you will need to start another demo.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,s,a)=>{s=s.querySelector("a");s?(await DemoUtils.simulateTyping(LIST_ANALYZERS_COMMAND,a),s.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzers-await-list"},{id:"analyzers-await-list",action:"createBlankChildMessage",triggerCondition:(e,t,s,a)=>{var s=MessageUtils.getMessageById(s.chat,e.parent_id);return!!(s&&s.message.includes(LIST_ANALYZERS_COMMAND)&&(s=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,s.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"analyzers-explain-list"},{id:"analyzers-explain-list",action:"typeAndAppend",contentToType:`
### What Happened

The AI-assisted search found production-ready analyzers that can improve code quality, namely the \`code-comment-analyzer\`, which helps identify and report issues in code comments, such as spelling errors and outdated parameter descriptions.

> **Reviewing AI Searches:** All AI Searches in GitSense Chat can be reviewed. After every AI Search, a details section is created which contains links that you can use to review and chat with the LLM. For example, if you disagree with a response, you can ask the LLM why they responded that way to see if your query can be improved.

### Next Steps

With this information, our next step is to look closer at the \`code-comment-analyzer\` by getting its schema. This will show us the types of questions we can ask and the structured data we can extract.

The command below is ready to be sent.

\`\`\`
${SHOW_ANALYZER_SCHEMA_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,s,a)=>{s=s.querySelector("a");s?(await DemoUtils.simulateTyping(SHOW_ANALYZER_SCHEMA_COMMAND,a),s.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzers-await-schema"},{id:"analyzers-await-schema",action:"createBlankChildMessage",triggerCondition:(e,t,s,a)=>{var s=MessageUtils.getMessageById(s.chat,e.parent_id);return!!(s&&s.message.includes(SHOW_ANALYZER_SCHEMA_COMMAND)&&(s=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,s.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"analyzers-explain-schema"},{id:"analyzers-explain-schema",action:"typeAndAppend",contentToType:`
### What Happened

We've successfully retrieved the schema for the \`code-comment-analyzer\`. This schema shows us the metadata fields the Analyzer can extract, such as \`has_spelling_mistakes\`, \`outdated_comment_detected\`, and \`relevance_summary\`. These fields provide a structured way to understand and query your codebase, allowing for more precise and meaningful insights.

### Next Steps

Now that we have this schema, we can do a semantic search to find specific issues in your codebase. Instead of just listing files, we'll ask the LLM to provide a *distribution* of the types of issues found, demonstrating how Analyzers enable deeper insights into your codebase's quality. Crucially, we'll also instruct the LLM to format the numerical results using North American comma separators, showcasing how you can control the output presentation.

The command below is ready to be sent.

\`\`\`
${FIND_OUTDATED_COMMENTS}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,s,a)=>{s=s.querySelector("a");s?(await DemoUtils.simulateTyping(FIND_OUTDATED_COMMENTS,a),s.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"analyzers-await-semantic-search"},{id:"analyzers-await-semantic-search",action:"createBlankChildMessage",triggerCondition:(e,t,s,a)=>{var s=MessageUtils.getMessageById(s.chat,e.parent_id);return!!(s&&s.message.includes(FIND_OUTDATED_COMMENTS)&&(s=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,s.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"analyzers-explain-semantic-search"},{id:"analyzers-explain-semantic-search",action:"typeAndAppend",contentToType:`
### What Happened

We've successfully demonstrated how GitSense Chat AI-assisted search, powered by **Analyzers** (our "Brains"), can transform unstructured code comments into actionable insights. This demonstrates how Analyzers can transform unstructured comments into structured, actionable insights, allowing you to understand the quality of your codebase at a glance.

## Demo Complete

This concludes the **AI-Assisted Search & Analyzers Demo**. You've seen how Analyzers can unlock intelligent search and automate data extraction.

What would you like to do next? You could:
*   Experiment further in this chat.
*   Start another demo from the main demo selection page.
*   Explore GitSense Chat's other features.

---

**Important Note:** Please be aware that messages in this demo starting with "What Happened" or "Demo Complete" are for your reference only and are not visible to the LLM. If you ask the LLM about their content, it will not have access to that information.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,nextSceneId:null}]};module.exports={analyzersDemo:analyzersDemo};
