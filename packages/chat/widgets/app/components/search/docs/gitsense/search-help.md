<!--
Component: GitSense Chat Tool - Search Help Documentation
Block-UUID: f0ad956d-b713-4a03-93aa-cef10b0acad0
Parent-UUID: 28ae4b29-1c07-46da-aae4-56c99154c77a
Version: 1.5.0
Description: Comprehensive help documentation for the GitSense Chat search tool, explaining AI-assisted and direct search modes, and providing examples for query construction and execution.
Language: Markdown
Created-at: 2025-09-18T21:48:15.228Z
Authors: Qwen 3 Coder 480B - Cerebras (v1.5.0)
-->


## AI-Assisted Search (`ask` enabled)

When the "Ask" checkbox is enabled, the AI Assistant interprets your natural language queries to provide the most relevant results. It operates in three primary modes:

### 1. Query Expert Mode (Constructing Search Commands)

In this mode, the AI acts as a "query expert," helping you **construct the precise `/search` command** that you can then review, modify, and execute yourself. This is ideal for learning the search syntax or building complex queries.

**This is particularly useful for:**

*   **Loading Matches into Context:** The generated `/search` command can be directly used to create a context bundle of the search results. This allows you to easily load matching files into your current conversation for further analysis or discussion.
*   **Discussing Results in Current Chat:** Since you execute the search yourself, the results appear directly in your current chat. This facilitates immediate discussion and follow-up with the LLM about the search results without needing to switch to a separate thinking chat.

**To activate Query Expert Mode, use `ask` followed by keywords like:**
`construct`, `build`, `generate`, `make`, `suggest`, `show me the query`, `what is the query`, `how do I search`.

**Examples:**

*   **User Query:** `construct a search that will allow me to find all files with spelling mistakes in the hello world repo using the code comment analyzer`
    *   **AI Output:** `profile:meta-search analyzer:code-comment-reviewer::file-content::default meta:has_spelling_mistakes:boolean=true repo:hello-world`

*   **User Query:** `generate a query to find all Python files modified in the last week`
    *   **AI Output:** `lang:python query:modified_last_week sort:created_at:desc` (Example, actual query might vary)

*   **User Query:** `how do I search for functions named 'init' in JavaScript files?`
    *   **AI Output:** `lang:javascript query:function:init` (Example, actual query might vary)

### 2. Search Executor Mode (Executing Searches and Providing Results)

In this mode, the AI directly **executes the search** based on your natural language query and presents the results. This is the default behavior when AI is enabled and your query doesn't explicitly ask for command construction.

**To activate Search Executor Mode, use `ask` followed by keywords like:**
`find`, `search`, `locate`, `get me`, `show me`, `look for`.

**Examples:**

*   **User Query:** `find all files with spelling mistakes in the hello world repo using the code comment analyzer`
    *   **AI Action:** Executes the search and displays the matching files.

*   **User Query:** `search for 'authentication' in the user service code`
    *   **AI Action:** Executes the search and displays code snippets related to 'authentication'.

*   **User Query:** `show me the latest release notes for the 'gitsense/gsc-search' repository`
    *   **AI Action:** Executes the search and displays relevant release notes.

### 3. Environment & Context Queries (Direct Answers)

The AI can also answer direct questions about the GitSense Chat search environment and available context. This helps you understand what data and tools are at your disposal.

**To ask about the environment, enable `ask` followed by keywords like:**
`what analyzers are there`, `list analyzers`, `show me analyzers`, `what metadata is available for`, `show me fields for`, `what repos are searchable`, `list repositories`.

**Examples:**

*   **User Query:** `what analyzers are available?`
    *   **AI Action:** Provides a list of all configured GitSense Chat Analyzers and their descriptions.

*   **User Query:** `what metadata is available for the code-comment-reviewer?`
    *   **AI Action:** Lists the extracted metadata fields (e.g., `has_spelling_mistakes`, `outdated_comment_detected`) for that specific analyzer.

*   **User Query:** `what repositories are searchable?`
    *   **AI Action:** Provides a list of all Git repositories currently indexed and available for search.

---

## Direct Search (AI Disabled)

When the "Ask" checkbox is **disabled**, the AI Assistant is bypassed. The search tool will perform a **direct text search** using the query you provide in the input field.

*   **"Search In:" Dropdown:** When AI is disabled, the "Search In:" dropdown becomes active. Use this to specify which types of content you want to search within (e.g., `git-blobs` for raw file content, `tiny-overviews` for concise summaries, `messages` for chat messages).

**Examples:**

*   **User Input:** `authentication mechanism` (with "Ask" disabled, "Search In: git-blobs" selected)
    *   **Action:** Performs a direct text search for "authentication mechanism" within the raw Git file content.

*   **User Input:** `bug fix for v1.2.0` (with "Ask" disabled, "Search In: tiny-overviews" selected)
    *   **Action:** Performs a direct text search for "bug fix for v1.2.0" within the concise file summaries.

---

## General Search Tips

*   **Keywords:** Use relevant keywords to describe what you're looking for.
*   **Filters:** You can manually add filters to your query for more precision (e.g., `repo:owner/repo-name`, `lang:javascript`, `file_path:/src/utils/`).
*   **Git Navigation Filters:** A dedicated profile (`profile:git-nav`) is available for navigating Git owners, repositories, and branches. See `search.md` for specific syntax like `git-owner:`, `git-repository:`, and `git-branch:`.
*   **Context:** The more specific you are, the better the search results will be.
*   **Experiment:** Don't hesitate to try different phrasings and keywords to refine your search.
