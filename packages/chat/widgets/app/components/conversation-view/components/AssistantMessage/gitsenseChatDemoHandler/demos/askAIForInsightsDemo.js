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

let{CodeBlockUtils,ChatUtils,DomUtils,MessageUtils}=require("@gitsense/gsc-utils"),MessageService=require("../../../../services/MessageService"),DEMO_CONSTANTS=require("../constants"),DemoUtils=require("../utils/demoUtils"),DEMO_TITLE="## Ask AI for Insights Demo",LIST_ANALYZERS_COMMAND='!ask List analyzers with a "production-ready" tag that can help identify files with code comment accuracy issues. Just show their description, tags and version information.',SHOW_ANALYZER_SCHEMA_COMMAND="!ask What are the extracted metadata fields for the `simple-comment-accuracy-reviewer`?",FIND_OUTDATED_COMMENTS='!ask Using the simple-comment-accuracy-reviewer, show me the distribution of accuracy issues for `has_accuracy_issues`, `undocumented_functions`, and `accuracy_issues_count` in the "Hey World" and "Hello World" repositories. Present the numbers in a markdown table with North-American formatting (e.g., 1,234) and then give a short summary in a `gitsense-search-flow` block. **IMPORTANT** Make sure to reference the system prompt to ensure the query has the correct syntax and to only create one query since you can specify multiple insight-field in the same query.',askAIForInsightsDemo={id:"ask-ai-for-insights",name:"Ask AI for Insights Demo",description:"Discover how to leverage AI-powered Analyzers to perform intelligent semantic searches and extract actionable insights from your data.",scenes:[{id:"ask-ai-intro",action:"typeAndAppend",triggerCondition:(e,t,s,a)=>e.message.includes(DEMO_TITLE),contentToType:`
### Welcome!

This demo introduces **Ask AI for Insights**, the foundational workflow for building personal AI assistants for humans and AI agents. By mastering these patterns, you can create specialized "brains" to explore and understand data in any domain - from healthcare and finance to software engineering.

You'll learn to:

*   Discover AI Analyzers (the "Brains") that power insights
*   Explore Analyzer Schemas to understand capabilities
*   Ask AI to search your data intelligently
*   Extract actionable insights from metadata
*   Control how AI presents findings

Ready to start building your personal AI assistant? We'll begin by asking the AI to find production-ready Analyzers for code comment accuracy:

\`\`\`
${LIST_ANALYZERS_COMMAND}
\`\`\`

Click the link below to send this command. We'll explain the results once the search is finished and then move on to the next step.

[**Send Message**]()

**LLM Responses are Live:** Please note that while this demo has been tested with various state-of-the-art LLMs, AI models may occasionally not follow instructions precisely. This can sometimes result in unexpected or nonsensical responses. If you encounter such behavior, it's a normal characteristic of current AI technology rather than an issue with the demo itself.

> **Chat Input Disabled:** The chat input is currently disabled, but will re-enable once the demo has finished.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,s,a)=>{var n=Array.from(s.querySelectorAll("p")).find(e=>e.textContent.includes("LLM Responses are Live")),n=(n&&(n.style.border="1px solid #856404",n.style.borderRadius="5px",n.style.backgroundColor="#fff3cd",n.style.padding="15px",n.style.marginBottom="20px"),s.querySelector("a"));n?(await DemoUtils.simulateTyping(LIST_ANALYZERS_COMMAND,a),n.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"ask-ai-await-list"},{id:"ask-ai-await-list",action:"createBlankChildMessage",triggerCondition:(e,t,s,a)=>"ai-search-results"===e.type&&!!((s=MessageUtils.getMessageById(s.chat,e.parent_id))&&s.message.includes(LIST_ANALYZERS_COMMAND)&&(s=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,s.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete")),nextSceneId:"ask-ai-explain-list"},{id:"ask-ai-explain-list",action:"typeAndAppend",contentToType:`
### What Happened

The AI-assisted search found production-ready analyzers that can improve code comment accuracy, namely the \`simple-comment-accuracy-reviewer\`, which helps identify and report issues in code comments such as undocumented functions, parameter mismatches, and incorrect internal references.

### Next Steps

With this information, our next step is to look closer at the \`simple-comment-accuracy-reviewer\` by getting its schema. This will show us the types of questions we can ask and the structured data we can extract.

The command below is ready to be sent.

\`\`\`
${SHOW_ANALYZER_SCHEMA_COMMAND}
\`\`\`

Click the link below to send the next command and move on with the demo.

[**Send Message**]()
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,s,a)=>{s=s.querySelector("a");s?(await DemoUtils.simulateTyping(SHOW_ANALYZER_SCHEMA_COMMAND,a),s.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"ask-ai-await-schema"},{id:"ask-ai-await-schema",action:"createBlankChildMessage",triggerCondition:(e,t,s,a)=>{var s=MessageUtils.getMessageById(s.chat,e.parent_id);return!!(s&&s.message.includes(SHOW_ANALYZER_SCHEMA_COMMAND)&&(s=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,s.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"ask-ai-explain-schema"},{id:"ask-ai-explain-schema",action:"typeAndAppend",contentToType:`
### What Happened

We've successfully retrieved the schema for the \`simple-comment-accuracy-reviewer\` analyzer. The response shows the metadata fields this analyzer extracts, which may include file identification details, accuracy issue flags, counts of specific problems (like undocumented functions or parameter mismatches), and summary information.

### Next Steps

Now that we understand what data the analyzer can extract, we'll ask AI to search the repositories you've imported. This is where the power of being **Git Ready** comes in: once your Git repositories are imported, they become native, queryable assets that are fully analyzable and searchable.

We'll now demonstrate how these fields help identify patterns in code quality by searching specifically in the "Hey World" and "Hello World" repositories to find accuracy issues in code comments.

The command below is ready to be sent.

\`\`\`
${FIND_OUTDATED_COMMENTS}
\`\`\`

Click the link below to ask AI for an analysis and continue with the demo.

[**Send Message**](#)
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,s,a)=>{s=s.querySelector("a");s?(await DemoUtils.simulateTyping(FIND_OUTDATED_COMMENTS,a),s.onclick=e=>{e.preventDefault(),DemoUtils.sendMessage()}):console.error(`No send link in current scene ${t.id} found`)},nextSceneId:"ask-ai-await-semantic-search"},{id:"ask-ai-await-semantic-search",action:"createBlankChildMessage",triggerCondition:(e,t,s,a)=>{var s=MessageUtils.getMessageById(s.chat,e.parent_id);return!!(s&&s.message.includes(FIND_OUTDATED_COMMENTS)&&(s=CodeBlockUtils.extractCodeBlocks(e.message,{silent:!0}).blocks,s.filter(e=>"gs-tool"===e.type).find(e=>"search"===e.toolData?.tool))&&e.message.trimStart().startsWith("## AI Search Complete"))},nextSceneId:"ask-ai-the-end"},{id:"ask-ai-the-end",action:"typeAndAppend",contentToType:`
### What Happened

We've successfully demonstrated how you can **ask AI for insights** into your data using GitSense Chat's analyzer (the "Brains") system. The AI discovered relevant analyzers, explored their capabilities, and then performed an intelligent search that transformed raw information into structured, actionable insights.

### The Personal AI Assistant Vision

What you've just experienced is a core building block for creating personal AI assistants in GitSense Chat for any domain. Imagine extending this pattern:

**For Healthcare & Life Sciences:**
*   "Ask AI to extract billing codes from medical records"
*   "Ask AI to check documentation completeness for regulatory requirements"
*   "Ask AI to identify patterns in patient data for research"

**For Students & Education:**
*   "Ask AI to extract methodology, sample sizes, and key findings from a collection of research papers"
*   "Ask AI to audit student projects for specific coding patterns or documentation requirements"
*   "Ask AI to extract all assignment deadlines and grade weights from a set of course syllabi"

**And More:**
The true power of GitSense Chat lies in its flexibility. You aren't limited to pre-built tools; you can simply chat with the AI to define a custom analyzer for **any** domain. Whether you are managing complex supply chains, analyzing scientific research, or auditing internal compliance, you can transform your specific data into a conversational asset that delivers the exact insights you need.

## Demo Complete

This concludes the **Ask AI for Insights** demo. You can now return to the demos home page to explore others like "Git Ready" and "AI Security Assistant," which can help you better understand how to create the perfect AI assistant.
            `,pauseAfterTypingMs:DEMO_CONSTANTS.SCENE_TRANSITION_PAUSE_MS,postProcess:async(e,t,s,a)=>{var n,e=MessageUtils.getMessageById(a.chat,e.parent_id),e=e?a.renderedMessage[e.id]?.contentBody:null;e&&3===(n=(n=e.querySelectorAll("p"))[n.length-1].querySelectorAll("a")).length&&3===Array.from(n).filter(e=>e.textContent.includes("Query")||e.textContent.includes("Result")||e.textContent.includes("Review")).length&&(n=DomUtils.h.createDiv({html:a.md.render("**AI Search Tip:** GitSense Chat provides full transparency into every search. Click the links above to audit the process: **Query** shows how the search was defined, **Result** shows the raw data found, and **Review** shows the final analysis. You can even open these links to chat with the AI about the logic used at each stage."),style:{border:"1px solid #856404",borderRadius:"5px",backgroundColor:"#fff3cd",padding:"15px",marginTop:"20px"}}),e.insertAdjacentElement("afterend",n))},nextSceneId:null}]};module.exports={askAIForInsightsDemo:askAIForInsightsDemo};
