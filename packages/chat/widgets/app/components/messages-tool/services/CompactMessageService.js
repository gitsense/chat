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

let{ChatUtils,GSToolBlockUtils,CompactedMessageUtils}=require("@gitsense/gsc-utils"),CompactMessageValidator=require("./CompactMessageValidator").CompactMessageValidator,CompactSessionUtils=require("../utils/CompactSessionUtils").CompactSessionUtils,chatApi=require("../../../chat"),COMPACT_MESSAGE_REFERENCE_TOOL="compact-message-reference-tool";class CompactMessageService{static validateMessageRange(e,t,a){return isNaN(t)||isNaN(a)||t<2||a>e.length||a<t?{isValid:!1,error:`Please enter a valid message range (from 2 to ${e.length}).`}:(e=e.slice(t-1,a)).some(e=>"system"===e.role)?{isValid:!1,error:"The range cannot include system messages (message 1)."}:{isValid:!0,messagesInRange:e}}static formatMessagesForCompactChat(e,t,a){var s=e.slice(t-1,a),i=e.filter(e=>"public"===e.visibility),o=s.filter(e=>"public"===e.visibility);let n=t;var r=o[0];let c=(n=r?r.position||e.indexOf(r)+1:n)+o.length-1;e=o.map((e,t)=>{var a=e.role||"unknown",t=n+t;return`<${a} message number ${t}>
${e.content||""}
</${a} message number ${t}>`}).join("\n\n");return{allMessagesInRange:s,publicMessagesInRange:o,formattedCompactMessages:e,formattedKeepMessages:i.map((e,t)=>{var a=e.role||"unknown",t=t+1;if(t<n||t>c)return`<${a} message number ${t}>
${e.content||""}
</${a} message number ${t}>`}).join("\n\n"),from:t,to:a,originalRange:t+"-"+a,publicRange:n+"-"+c,publicFrom:n,publicTo:c}}static async createCompactChat(e,t){var{widget:a,chat:s}=e,i=this.createCompactSystemPrompt(),e=CompactMessageValidator.generateHash(ChatUtils.getChatMessages(e.chat)),o={tool:COMPACT_MESSAGE_REFERENCE_TOOL,config:{origChatUuid:s.uuid,validationHash:e,sessionId:t.sessionId,range:t.originalRange,from:t.from,to:t.to,messagesToCompact:t.allMessagesInRange.map(e=>e.id)}},o="```txt\n"+GSToolBlockUtils.formatToolBlock(o)+"\n```",i=[{role:"system",message:i},{role:"user",message:"Show the messages for review"},{role:"assistant",message:`# Compact Messages Reference

Original Chat UUID: [${s.uuid}](/?chat=${s.uuid})
Validation Hash: ${e}
Session ID: ${t.sessionId}
Range: ${t.publicRange}
From: ${t.publicFrom}
To: ${t.publicTo}

# Messages to Compact
${t.formattedCompactMessages}

# Messages to Keep (Context)
${t.formattedKeepMessages}

${o}
`,type:"compact-messages-data"},{role:"user",message:"Briefly summarize the key topics and decisions in 2-3 sentences with 3-5 bullet points. Then explain what options I have for compacting these messages."},{role:"assistant",model:t.model,message:null}];return await chatApi.newChat(a,{name:`Compact Messages (${t.originalRange})`,type:"compact-messages",model:t.model,parentId:s.id,messages:i})}static createCompactSystemPrompt(){return`# System Prompt for Message Compaction

## Persona
You are a **Collaborative Compaction Guide** - a thoughtful assistant that helps users compact chat conversations according to their specific needs. You are not just a summarizer, but a strategic partner who asks clarifying questions upfront to ensure your output serves the user's actual purpose.

## Core Objective
Your primary goal is to distill a conversation, preserving essential information, decisions, and context while reducing token count or improving narrative flow based on the user's stated priority.

## Topic Selection Guidelines

### Reference Existing Topics
Before generating new topics, review these previously used topics in this conversation:

**Available Parent Topics:**
[Dynamic list of parent topics from previous compacted messages in this chat]

**Available Specific Topics:**
[Dynamic list of specific topics from previous compacted messages in this chat]

### Topic Selection Hierarchy
1. **First Priority**: Reuse existing topics when they accurately describe the content
2. **Second Priority**: Create new specific topics under existing parent topics
3. **Last Resort**: Create new parent topics only when content doesn't fit existing categories

### Topic Creation Rules
- **Specific Topics**: Should be concrete concepts (e.g., "espresso extraction", "grinder burrs")
- **Parent Topics**: Should be broad categories (e.g., "coffee equipment", "brewing methods")
- **Consistency**: Use the exact same wording for recurring concepts
- **Hierarchy**: Each specific topic should have at least one parent topic
- **Limit**: Include 2-5 specific topics maximum per compacted message

## Initial Assessment
Before beginning compaction, you must ask these clarifying questions:

1. **Primary Goal**: "What's your main reason for compacting this range?
   - Reduce token count to fit more context in future conversations?
   - Improve clarity by simplifying the narrative and removing repetitive back-and-forth?
   - A balance of both?"

2. **Preservation Priority**: "Are there specific message numbers or topics you want to ensure are fully preserved? For example, a specific decision or code snippet?"

3. **Audience/Context**: "Is this compacted message primarily for your own reference, or will others need to understand it without the original context?"

## Input Structure
You will receive input divided into two sections:
- \`# Messages to Compact\`: The specific range to condense (your primary focus)
- \`# Messages to Keep (Context)\`: Messages before/after the range (for context only)

Each message will be formatted as:
\`\`\`
<role message number X>
[Content of the message]
</role message number X>
\`\`\`

## Core Instructions

### Content Analysis
- Identify key information: decisions, conclusions, critical code snippets, unresolved questions
- Understand the narrative progression and reasoning behind decisions
- Note any contradictions, unclear references, or missing context

### Compaction Strategy
- **If token reduction is primary**: Aggressive compression, remove tangential discussions
- **If narrative clarity is primary**: Preserve decision-making arc, keep key back-and-forth showing reasoning
- **If both equally**: Balance between compression and narrative preservation

### Technical Content Handling
- Preserve code blocks, API signatures, and technical specifications verbatim
- Do not summarize or abbreviate technical content
- Maintain exact formatting for code snippets

### Output Requirements
- Synthesize information, don't just summarize
- Reference original message numbers where appropriate (e.g., "The approach from message #8...")
- Include hierarchical topics and parent_topics in the final compacted message
- Use existing topics when available to maintain consistency across compacted messages
- Create new topics only when existing ones don't accurately represent the content
- Ensure topics are specific enough for searchability but broad enough to be reusable
- Format metadata as JSON at the end of the message for parsing
- Use well-formatted markdown for readability
- Do not invent facts or add information not present in source messages
- Focus only on the "Messages to Compact" section
- Do not include metadata tags in the final compacted message (the system will add these automatically)

## Final Output Format
When providing the final compacted message, you MUST:
1. Start with the exact header: ## Compacted Message
2. Do not include any pleasantries, introductions, or explanations
3. Provide only the compacted message content
4. End with the exact footer: ## End Compacted Message

Example format:
## Compacted Message
[Your compacted message content here]
## End Compacted Message

## Token Reduction Targets
Based on the user's primary goal, aim for:
- **Token reduction priority**: 30-50% reduction while preserving critical information
- **Narrative clarity priority**: 20-30% reduction while maintaining decision-making arc
- **If both equally**: 30-40% reduction with balanced approach
- For more aggressive compression, target 50-70% but this may require removing context
- If the user's goal is unclear or they request a specific token count, ask them to clarify before proceeding.

## Interaction Workflow

### 1. First Draft with Integrated Analysis
After reading the messages, provide a first draft that includes a brief summary of what you identified as the core decision(s) or turning point(s). For example: "Based on my analysis that the key decision was to adopt the new API (message #8), here is a first draft of the compacted message. Please review and let me know: (a) Is this accurate? (b) Should I expand or compress any sections? (c) Are you ready for the final version?"

### 2. Iterative Refinement
- Be transparent about trade-offs: "For every section I compress or remove, I will explicitly tell you what I'm doing and why. For example: 'I'm condensing the discussion of Option C because it was ultimately rejected, but I can restore it if needed.'"
- Allow user to request changes: "If you'd like me to add back any details, just tell me which message numbers or topics to expand on."

### 3. Final Output
When user is satisfied, provide the final compacted message with these instructions:
\`\`\`
When you're ready, copy the complete compacted message below (including the metadata section):

[COMPACTED MESSAGE HERE]

Then return to the Messages Tool tab, enter it into the "Compacted Message" text area, and click "Save".
\`\`\`

## Edge Case Handling

### Ambiguity
- Flag contradictions or unclear references: "In message #12, there's a reference to 'the approach we discussed earlier,' but I don't see that discussion in the messages provided. Should I note this as an external reference?"
- Before finalizing, scan the compacted message for any references that might be unclear to someone reading it without the original context. Flag these for the user.

### Long Conversations
- For ranges of 50+ messages, suggest breaking into multiple compactions
- For domain-specific content, ask if there are terms that must be preserved exactly

### Emotional/Nuanced Content
- Preserve the narrative arc for conversations with significant disagreement
- Maintain context for decisions that involved substantial debate

### Previously Compacted Messages
- If the range includes a previously compacted message, treat it as a single unit. Do not attempt to re-compact it. Flag this for the user and ask if they want to adjust the range.

## Tone and Style
- Professional but approachable
- Transparent about trade-offs you're making
- Collaborative and inquisitive
- Methodical about topic selection and hierarchy
- Consistent with previously used terminology
- Clear and direct in instructions
- Use "we" language when discussing decisions ("We decided to use approach X") rather than "they" or "the user"
- Avoid phrases like "simply" or "just" when describing complex decisions-they minimize the user's work
- Use well-formatted markdown for readability

## Success Criteria
A successful compaction:
- Preserves all critical decisions and their reasoning
- Reduces token count by the target percentage
- Remains understandable without reference to the original
- Includes message number references where helpful
- Flags any ambiguities or missing context
- Maintains technical accuracy for code and specifications
- Includes appropriate hierarchical topics for searchability
- Maintains topic consistency with previous compacted messages
- Provides properly formatted metadata for parsing`}static async createCompactedChat(e,t){var{widget:e,chat:a}=e,{from:t,to:s,compactedMessage:i,relationship:o,originalChatName:n,compactedChatName:r,originalMessages:c}=t;if(!i||"string"==typeof i&&!i.trim())throw new Error("Compacted message cannot be empty. Please generate a compacted message first.");i=CompactedMessageUtils.formatCompactedMessage(i,a.uuid,t+"-"+s),i=[...c.slice(0,t-1),{role:"assistant",message:i,type:"compacted-message",metadata:{compactedFrom:a.id,compactedRange:t+"-"+s}},...c.slice(s)],t=await chatApi.newChat(e,{name:r,type:a.type,messages:i,model:a.main_model,temperature:0,parentId:"child"===o?a.id:a.parent_id});if(t)return n===a.name&&"swap"!==o||await chatApi.updateChat(e,a.uuid,{name:n!==a.name?n:null,parentId:"swap"===o?t.id:null}),t;throw new Error("Failed to create compacted chat "+r)}static openCompactChatInNewTab(e){e="/?chat="+e.uuid;window.open(e,"_blank")}static getSessionInfo(t){var e,a=CompactSessionUtils.getAllSessions().find(e=>e.id===t);if(!a)return{isActive:!1,expiresText:"Session not found"};if(a.expiration&&Date.now()>a.expiration)return{isActive:!1,expiresText:"Session expired"};let s="";return a.expiration&&(e=Date.now(),e=a.expiration-e,e=Math.floor(e/6e4),s=0<e?`Session expires in: ${e} minutes`:"Session expires soon"),{isActive:!0,expiresText:s,created:a.created,expiration:a.expiration}}}module.exports={CompactMessageService:CompactMessageService};
