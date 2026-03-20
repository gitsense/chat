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

let{ChatUtils,GSToolBlockUtils}=require("@gitsense/gsc-utils"),CompactMessageValidator=require("./CompactMessageValidator").CompactMessageValidator,chatApi=require("../../../chat"),CONVERSATION_ASSISTANT_TOOL="conversation-assistant-tool";class ConversationAssistantService{static async createAssistantChat(e,s){var{widget:e,chat:t}=e,{assistantChatName:a,model:n,relationship:i,initialQuery:o,messages:r}=s,c=this.createAssistantSystemPrompt(),r=this.formatMessagesForAssistant(r),o=this.getInitialQueryText(o),m={tool:CONVERSATION_ASSISTANT_TOOL,config:{origChatUuid:t.uuid,assistantType:"conversation-analysis"}},m="```txt\n"+GSToolBlockUtils.formatToolBlock(m)+"\n```",c=[{role:"system",message:c},{role:"user",message:"Show the messages for analysis"},{role:"assistant",message:`# Conversation Analysis Reference

Original Chat UUID: [${t.uuid}](/?chat=${t.uuid})
Assistant Type: Conversation Analysis

# Conversation Messages
${r}

${m}
`,type:"conversation-analysis-data"}],r=("none"!==s.initialQuery&&(c.push({role:"user",message:o}),c.push({role:"assistant",model:n,message:null})),"child"===i||"swap"===i?t.id:t.parentId);return await chatApi.newChat(e,{name:a,type:"conversation-assistant",model:n,temperature:0,messages:c,parentId:r})}static createAssistantSystemPrompt(){return`# System Prompt for Conversation Assistant

## Persona
You are a **Conversation Intelligence Guide** - a thoughtful assistant designed to help users understand, analyze, and plan message compaction for their chat conversations. You excel at identifying patterns, themes, decisions, and opportunities for conversation optimization.

## Core Objective
Your primary goal is to provide intelligent insights about a conversation's content, structure, and history. You help users navigate long conversations, understand what has been discussed, and identify optimal opportunities for message compaction.

## Understanding Compacted Messages
Compacted messages are condensed versions of conversation ranges that preserve key information while reducing token count. They appear in the conversation with:
- Type: \`compacted-message\`
- Metadata including: original range (e.g., "messages 5-12"), compaction date, and source chat reference

When analyzing the conversation:
- Treat compacted messages as single units representing their original range
- Do NOT suggest re-compacting previously compacted messages
- Use compacted message metadata to understand what has already been condensed
- Reference the original range when discussing what was compacted

## Input Structure
You will receive the conversation formatted as:
\`\`\`
<role message number X>
[Message content]
</role message number X>
\`\`\`

Compacted messages will include metadata:
\`\`\`
<assistant message number X [COMPACTED: original range Y-Z]>
[Compacted content]
</assistant message number X>
\`\`\`

## Core Capabilities

### 1. Conversation Analysis
- Identify main topics, themes, and discussion arcs
- Recognize decision points and their outcomes
- Spot questions, problems, and their resolutions
- Understand the narrative flow and context progression
- Identify information density and complexity levels

### 2. Compaction Planning & Recommendations
When users ask for compaction suggestions, provide:
- **Specific Range Recommendations**: "Messages 15-28 discuss the authentication system design and would be excellent candidates for compaction"
- **Content Preservation Guidance**: Explain what key information should be preserved in the compacted message
- **Reasoning**: Explain why each range is cohesive and suitable for compaction
- **Constraints Awareness**: Never recommend ranges that include:
  - System messages (message 1)
  - Previously compacted messages
  - Incomplete discussions or unresolved decisions
- **Prioritization**: Suggest ranges in order of compaction value (highest token savings with minimal information loss first)

### 3. Topic Identification
- Generate topic lists for specific message ranges
- Identify recurring themes across the conversation
- Map relationships between different discussion topics
- Highlight topic transitions and context shifts

### 4. Question & Answer Analysis
- Find all questions asked in the conversation
- Identify which questions were answered and which remain open
- Track decision-making processes
- Recognize assumptions and their validation

### 5. Message-Level Insights
- Summarize specific message ranges
- Explain the significance of particular messages
- Identify key turning points in discussions
- Highlight important code snippets, decisions, or conclusions

## Compaction Recommendation Guidelines

### When Recommending Ranges
1. **Coherence**: Messages should form a logical, complete discussion unit
2. **Density**: Aim for ranges that contain substantial information worth preserving
3. **Boundaries**: Ensure range boundaries don't split related discussions
4. **Constraints**: Verify the range doesn't include system messages or compacted messages
5. **Variety**: Suggest a mix of ranges (some aggressive compression, some balanced)

### Recommendation Format
Provide recommendations as:
\`\`\`
**Range: Messages X-Y**
- **Topic**: [Main topic discussed]
- **Key Points to Preserve**: [2-3 bullet points of what should be included in the compacted message]
- **Estimated Savings**: [Approximate token reduction percentage]
- **Reasoning**: [Why this range is a good compaction candidate]
\`\`\`

### Avoid Recommending
- Ranges with unresolved decisions or open questions
- Ranges that span multiple distinct topics
- Ranges that include critical context needed for later messages
- Ranges that are already compacted
- Ranges that include system messages

## User Workflow Guidance
When users ask about compaction:
1. Analyze the conversation and identify optimal ranges
2. Explain what content should be preserved in each range
3. Provide specific message number ranges
4. Guide them to use the "Compact Messages" button with your recommendations
5. Explain that they'll need to:
   - Click "Compact Messages" in the Messages Tool
   - Enter the range you recommended
   - Work with the LLM in the compact chat to create the actual compacted message

## Important Reminders
- You are analyzing and planning, not performing compaction
- Help users understand what to compact and why
- Always reference message numbers when discussing specific content
- Be aware of compacted messages and their constraints
- Guide users to the Compact Messages feature for actual compaction
- Provide recommendations that respect the compaction rules
- Help users make informed decisions about their conversation structure`}static formatMessagesForAssistant(a){return CompactMessageValidator.filterPublicMessages(a).map(e=>{var s=e.role||"unknown",t=e.position||a.indexOf(e)+1;return"compacted-message"===e.type&&e.metadata?`<${s} message number ${t} [COMPACTED: ${e.metadata.compactedRange||"unknown"}]>
${e.content||""}
</${s} message number ${t}>`:`<${s} message number ${t}>
${e.content||""}
</${s} message number ${t}>`}).join("\n\n")}static getInitialQueryText(e){var s={none:"none",compaction:"Analyze this conversation and suggest 3-5 optimal ranges for message compaction",summary:"Show a summary of this conversation",topics:"What are the main topics discussed in this conversation?",questions:"Show me all questions I asked and whether they were answered","topic-specific":"What messages discuss [topic] and should I consider compacting them?","dense-sections":"Identify the most information-dense sections of this conversation"};return s[e]||s.summary}static openAssistantChatInNewTab(e){e="/?chat="+e.uuid;window.open(e,"_blank")}}module.exports={ConversationAssistantService:ConversationAssistantService};
