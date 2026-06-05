<!--
Component: Search Tool GitSense Engine Search Strategy
Block-UUID: 8f1b2c3d-4e5f-4a6b-8c9d-0e1f2a3b4c5d
Parent-UUID: f285d082-6159-4e3c-a27b-7e8f2d81c6fe
Version: 1.2.0
Description: Describes the multi-stage search strategy for the GitSense engine to aid LLM implementation, focusing on identifying relevant files from overviews stored as messages.
Language: Markdown
Created-at: 2025-06-16T15:09:49.569Z
Authors: Gemini 2.5 Flash Thinking (v1.0.0), Gemini 2.5 Flash Thinking (v1.1.0), Gemini 2.5 Flash Thinking (v1.2.0)
-->


# GitSense Chat Tool - GitSense Engine Search Strategy

This document outlines the multi-stage search strategy implemented by the GitSense search engine for **AI-assisted searches**. This strategy is designed to efficiently identify relevant files from GitSense Chat data, particularly focusing on Tiny and Short Overviews derived from code and documentation within imported Git repositories.

The core idea is to use different levels of content detail (Tiny and Short Overviews, which are stored as messages) strategically across a simplified search process to quickly narrow down potential sources of information and either provide a direct answer or, more commonly, identify the most relevant files for the user to explore further.

## Scope of AI-Assisted Search

It is important to understand the scope limitation for AI-assisted searches compared to direct searches:

*   **Direct Search:** Allows users to search across all available data types (chats, messages, and AI-generated code blocks) within the configured scope (e.g., current chat, connected chats, all chats), regardless of the chat's specific type.
*   **AI-Assisted Search:** Is currently limited to searching within chats of type `git-*` (e.g., `git-repository`, `git-blob`, `git-tree`, `git-commit`, `git-diff`). This includes searching the Tiny and Short Overviews associated with the files, directories, commits, etc., represented by these chats. These overviews are stored as **messages** within the chat. The AI is specifically leveraged for its ability to understand and process the structured overview information generated from code and documentation within a Git context.

This limitation allows the AI-assisted workflow to focus on providing intelligent assistance for understanding and navigating code and documentation within imported Git repositories.

## Simplified Multi-Stage Search Strategy (AI-Assisted)

Here are the stages of the simplified AI-assisted search process:

1.  **Stage 0: User Query:**
    *   The process begins with the user asking a question in natural language via the search tool UI, with the AI Assistant enabled.

2.  **Stage 1: LLM Query Construction:**
    *   **Context for LLM:** The LLM is provided with the `search.md` syntax guide and the user's natural language question.
    *   **LLM Task:** The LLM analyzes the user's question and generates a structured search query using the syntax from `search.md`. This query is specifically designed to find relevant **Tiny Overviews** (stored as messages) within the `git-*` chat scope. The LLM uses its understanding to select appropriate keywords, fields (`msg_type:tiny-overview`, `path:`, `lang:`, etc.), and targets (`in:messages`).
    *   **Output:** The LLM outputs the structured search query string.

3.  **Stage 2: Initial Broad Search (Tiny Overviews):**
    *   **Execution:** The LLM-generated structured query is executed against a search index (like SQLite with BM25) containing the text of **Tiny Overviews** (messages) within the `git-*` chat scope.
    *   **Ranking:** The search engine ranks the matching Tiny Overviews based on relevance.
    *   **Output:** A list of the top N most relevant Tiny Overviews (e.g., N=200).
    *   **Potential Intermediate Step (Condensed Ranking):** If the number of initial matches is large (e.g., > 200), an intermediate step may be introduced. The LLM is presented with a *condensed* view of the top N results, including minimal information like file path, keywords, and key metadata (e.g., language). The LLM's task in this intermediate step is to review this condensed list and select a smaller subset (e.g., 50-100) of the most promising Tiny Overviews. This condensed review helps reduce the context size for the next step. If the initial number of matches is small (e.g., <= 50), this condensed ranking step is skipped.`
    *   **Final Output of Stage 2:** A list of the top 50-100 (or fewer if initial matches were less than the threshold) most relevant Tiny Overviews, including their full summary content.

4.  **Stage 3: Targeted Detail Retrieval (Short Overviews):**
    *   **Selection:** From the Tiny Overviews identified in Stage 2, the corresponding items (files, messages) are selected.
    *   **Retrieval:** The **Short Overviews** (messages) corresponding to these selected items are retrieved from the database.
    *   **Output:** The Short Overviews for the selected items.

5.  **Stage 4: LLM Review and Answer/File Identification:**
    *   **Context for LLM:** The LLM is provided with the user's original question, the LLM-generated structured search query, the `search.md` syntax guide, and the retrieved **Short Overviews** from Stage 3.
    *   **LLM Task:** The LLM reviews the provided Short Overviews. Its primary goal is to help the user identify the most relevant files.
        *   If a direct, concise answer to the user's original question can be confidently synthesized *solely* from the information present in the Short Overviews, the LLM should provide that answer.
        *   More commonly, the LLM should identify the most relevant files (represented by the Short Overviews) that are likely to contain the answer or provide the most useful context for the user's query. The LLM should list these files, including their file path and the chat ID of the `git-*` chat they belong to (as the chat ID is needed for the user to load the file into context).
    *   **Output:** The LLM outputs either the direct answer or a formatted list of relevant files (path and chat ID), along with any necessary explanatory text.

## Use Cases and Strategy Applicability

This AI-assisted search strategy is primarily designed for finding information *within the content and metadata* of items (files, commits, etc.) represented by `git-*` chats.

*   **Finding Files based on Content/Metadata:** Queries like "I am looking for a c file but I can remember what it is called. I know it is in this directory and it does this." fit well within this strategy. The LLM Query Construction (Stage 1) can generate a query targeting Tiny Overviews (`msg_type:tiny-overview`) and use filters for language (`lang:c`), path (`path:/path/to/directory`), and keywords from the description ("does this"). The subsequent stages will search/retrieve overviews for matching files, and the final LLM stage will identify the relevant file(s) based on the Short Overviews.
*   **Creating a Tree Structure:** Queries like "Create a tree for this directory on the main branch" are **not** handled by this search strategy. Generating a directory tree is an operation that involves navigating and listing the file system structure, not searching for content within files. This type of request would require a different tool or a different action within the GitSense tool, separate from the multi-stage search workflow described here.

## Benefits of this Simplified Strategy

This simplified multi-stage approach, focused on overviews within a defined scope, offers several advantages:

*   **Token Efficiency:** By primarily processing Tiny and Short Overviews, the strategy stays well within LLM token limits, avoiding the need to load large amounts of full content for initial analysis. The condensed ranking step further optimizes for very large initial result sets.
*   **Rapid Identification:** The process quickly filters a large dataset down to a manageable set of Short Overviews, allowing the LLM to rapidly identify the most promising sources.
*   **Actionable Output:** The output (either a direct answer or a list of files with chat IDs) provides the user with immediate value and clear next steps for further investigation within the chat environment.
*   **Focused AI Use:** The AI is used for tasks it excels at: understanding natural language queries, generating structured queries, and synthesizing/identifying information from structured text (overviews).
*   **Clear Scope:** Defining the AI-assisted scope to `git-*` chats aligns the tool with its primary purpose of assisting with code and documentation understanding.

This strategy provides a streamlined and efficient way for users to leverage AI to navigate and find relevant information within their imported Git repositories.
