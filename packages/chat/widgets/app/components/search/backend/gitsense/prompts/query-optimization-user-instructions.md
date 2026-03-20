<!--
Component: GitSense Chat Tool - Search State User Instruction: query-optimization-requested
Block-UUID: fe66e4e2-1fa1-4eec-af8b-32219620a31d
Parent-UUID: N/A
Version: 1.0.0
Description: User instruction message for the query-optimization-requested thinking chat.
Language: Markdown
Created-at: 2025-06-11T16:44:37.350Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0)
-->


Process the user query using the 3-step decision process defined in the system prompt.

If the query is a system question (e.g., about analyzers, repositories, or metadata), **answer it fully and directly in natural language *before* the `gitsense-search-flow` block**.

Then, include the required `gitsense-search-flow` block with `"type": "answered"` to comply with the system format.

**Do not omit the answer or delay it. Provide the complete information immediately in the response body.**
