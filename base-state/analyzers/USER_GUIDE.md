<!--
Component: GitSense Chat Analyzer Creation Guide
Block-UUID: 4b9de561-d012-4815-aa28-ed8d15c19f0f
Parent-UUID: N/A
Version: 1.0.0
Description: A comprehensive guide for creating GitSense Chat analyzers, explaining the process, required information, and output format
Language: Markdown
Created-at: 2026-01-30T18:18:59.873Z
Authors: GLM-4.7 (v1.0.0)
-->


# GitSense Chat Analyzer Creation Guide

## Introduction: What is an Analyzer?

An analyzer is a specialized configuration that tells the GitSense Chat system how to examine files and extract structured information. When you create an analyzer, you're essentially defining a custom "expert" that can:

- Read and understand specific types of files
- Generate human-readable summaries (Markdown overviews)
- Extract machine-readable metadata (JSON)
- Apply custom logic based on your requirements

The output of an analyzer is used for search indexing, filtering, sorting, and helping AI assistants answer questions about your codebase efficiently.

---

## The Creation Process: How It Works

When you chat with me to create an analyzer, here's what happens:

1. **You describe your analysis goal** (e.g., "I want to scan Python files for security issues")
2. **I ask clarifying questions** to gather 13 specific pieces of information
3. **You provide details** about what to extract and how to present it
4. **I validate your input** (especially the analyzer ID format)
5. **I provide a summary** and ask for confirmation
6. **Upon your "yes"**, I generate the complete analyzer instructions
7. **You save and use** the generated configuration

The entire conversation is guided-you don't need to know the template structure beforehand.

---

## Key Decisions You Need to Make

### 1. **Analyzer Identity**
- **Analyzer ID**: A unique technical name (e.g., `security-scanner`, `doc-summarizer`)
  - *Rules*: Only letters, numbers, dashes, and underscores. No dots or spaces. Cannot start with an underscore.
- **Label**: A human-readable name (e.g., "Security Vulnerability Scanner")
- **Description**: A short sentence explaining what it does
- **Version**: Start with `1.0.0` (semantic versioning)
- **Tags**: Optional category labels for the analyzer itself (e.g., `"security", "python"`)

### 2. **Analysis Persona**
- **Role**: What expertise should the analyzer adopt? (e.g., "Meticulous code reviewer," "Technical documentation specialist")

### 3. **Core Task**
- **Task**: Clear, step-by-step instructions for what the analyzer should do. Be specific about:
  - What to look for in files
  - How to process different content types
  - What constitutes a "finding"

### 4. **Markdown Overview Structure**
- **Instructions**: How should the human-readable summary be organized?
  - What sections should it include?
  - What information should be highlighted?
  - How detailed should it be?

### 5. **Custom Metadata Fields**
- **Definitions**: What structured data should be extracted from each file?
  - Field name (e.g., `vulnerability_count`)
  - Data type: `string`, `number`, `integer`, `boolean`, `array`, or `null`
  - Purpose: What does this field represent?

### 6. **Progress Table Display**
- **Fields to Show**: Which metadata fields should appear in the processing progress table? (e.g., `file_path,severity,confidence_score`)

### 7. **Reference Files (Optional)**
- **Requirements**: Does your analyzer need external context?
  - **File Pattern**: How to identify it (e.g., `security-policy.md`, `*.config.json`)
  - **Usage**: What to use it for (e.g., "Use as validation rules")
  - **Missing Behavior**: `Fail` (stop if missing) or `Warn` (continue with warning)

---

## Understanding Placeholders

The analyzer template uses two special placeholder types:

### `{{ANALYZER: ...}}`
- **Purpose**: Instructions for the *analyzer LLM* to generate content dynamically
- **Your Role**: **Leave these as-is** in the final output
- **Examples**:
  - `{{ANALYZER: A concise 1-2 sentence summary...}}`
  - `{{ANALYZER: Full File Path}}`
  - `{{ANALYZER: true or false}}`

### `{{GUIDE_REPLACE: ...}}`
- **Purpose**: **You must provide these values** during our conversation
- **Examples**:
  - `{{GUIDE_REPLACE: analyzer-id}}` → You give me: `security-scanner`
  - `{{GUIDE_REPLACE: role}}` → You give me: `Security-focused code reviewer`
  - `{{GUIDE_REPLACE: custom metadata JSON}}` → You give me: `"vulnerability_count": 3, "severity": "high"`

---

## Required Information Checklist

Before starting, be prepared to answer these questions:

| # | Placeholder | Question | Example Answer |
|---|-------------|----------|----------------|
| 1 | `analyzer-id` | What is the unique technical name? | `python-security-scanner` |
| 2 | `analyzer-label` | What is the human-readable name? | "Python Security Scanner" |
| 3 | `analyzer-description` | One-sentence description? | "Scans Python files for common security vulnerabilities" |
| 4 | `analyzer-version` | Starting version? | `1.0.0` |
| 5 | `analyzer-tags` | Category tags for the analyzer? | `"security", "python", "static-analysis"` |
| 6 | `role` | What persona should it adopt? | "Expert security researcher specializing in Python vulnerabilities" |
| 7 | `task` | Step-by-step analysis instructions? | "1. Parse AST, 2. Look for SQL injection patterns, 3. Count findings..." |
| 8 | `instructions for markdown content` | How to structure the overview? | "## Summary\n{{ANALYZER: 2-sentence summary}}\n\n## Findings\n{{ANALYZER: Bullet list of issues}}" |
| 9 | `custom metadata definitions` | Define each extracted field? | `vulnerability_count` (integer): Number of issues found |
| 10 | `custom metadata JSON` | JSON key-value pairs? | `"vulnerability_count": 5, "max_severity": "critical"` |
| 11 | `show extracted metadata fields` | Which fields in progress table? | `file_path,vulnerability_count,max_severity` |
| 12 | `requires-reference-files` | Need reference files? | `true` or `false` |
| 13 | `reference file usage instructions` | If yes, define reference file rules | *See structure below* |

---

## Critical Rules to Remember

### ⚠️ **Tag/Label Clarification**
If you mention "tags" or "labels," I **will ask** you to clarify:
- **Analyzer Tags**: Describe the *analyzer itself* (e.g., `"security-scanner"`)
- **Content Labels**: Extracted from *each file's content* (e.g., `"bug"`, `"feature-request"`)

These are configured separately. Don't worry-I'll prompt you for both if needed.

### ⚠️ **Analyzer ID Validation**
Your analyzer ID **must** match this regex: `^[a-zA-Z0-9][a-zA-Z0-9_-]*$`
- ✅ Valid: `my-analyzer`, `security_scanner`, `v1Scanner`
- ❌ Invalid: `_myanalyzer` (starts with underscore), `my.analyzer` (contains dot), `my analyzer` (contains space)

I will **not proceed** until you provide a valid ID.

### ⚠️ **No Pleasantries in Final Output**
The generated analyzer instructions will be **purely functional**-no "Great!" or extra commentary. This ensures it can be parsed by automated systems.

### ⚠️ **Omit Unused Sections**
If you don't need reference files, the entire `## Reference File Usage` section will be **removed** from the final output-not left empty.

### ⚠️ **Confirmation Required**
Before generating the final instructions, I will show you a summary and ask:

> **"Would you like me to generate the instructions now? Answer yes or no only."**

You must respond with exactly `yes` or `no`.

---

## Example Walkthrough

### Scenario: Creating a "Python Docstring Analyzer"

**User**: "I want to analyze Python files to check docstring quality."

**Me**: "Great! I'll help you create this analyzer. Let's start with the analyzer ID. What unique name should I use? (e.g., `python-docstring-checker`)"

**User**: `python-docstring-checker`

**Me**: "Excellent. Now, what human-readable label should appear in the interface? (e.g., 'Python Docstring Quality Checker')"

**User**: "Python Docstring Quality Checker"

**Me**: "What persona should the analyzer adopt? (e.g., 'Python documentation expert')"

**User**: "Python documentation expert specializing in PEP 257 compliance"

**Me**: "Describe the task step-by-step..."

**[Conversation continues through all 13 placeholders...]**

**Me**: "Summary of your analyzer:
- **ID**: `python-docstring-checker`
- **Role**: Python documentation expert...
- **Custom Fields**: `missing_docstrings` (integer), `pep257_violations` (array)
- **Reference Files**: None required
- **Progress Fields**: `file_path,missing_docstrings`

Would you like me to generate the instructions now? Answer yes or no only."

**User**: `yes`

**Me**: *[Generates the complete, formatted analyzer instructions]*

---

## Final Output Format

When you confirm, I will generate output that looks exactly like this:

```markdown
# New Analyzer Instructions
Analyzer-ID: your-analyzer-id::file-content::default

--- START OF INSTRUCTIONS ---

# Analyze - `your-analyzer-id::file-content::default`

## Role: 
Your specified role

## Task: 
Your detailed task instructions

## Reference File Usage
*   **File Pattern:** your-pattern
    *   **Usage:** your usage instructions
    *   **Missing File Behavior:** Fail | Warn | Default

---split---

## Context:
[Standard context about usage]

## Input:
Refer to the files provided by the user.

## Processing Step:
[Standard processing steps]

```markdown
# GitSense Chat Analysis
## your-analyzer-id::file-content::default

*   **Path:** {{ANALYZER: Full File Path}}
*   **Chat ID:** {{ANALYZER: Chat ID from file context}}

[Your markdown structure instructions]

### Custom Metadata Definitions
[Your field definitions]

### JSON Generation and Validation Rules
[Standard validation rules]
```

```json
{
  "description": "Your description",
  "label": "Your label",
  "version": "1.0.0",
  "tags": ["your", "tags"],
  "requires_reference_files": true,
  "extracted_metadata": {
    "file_path": "{{ANALYZER: Full File Path}}",
    "file_name": "{{ANALYZER: File Name}}",
    "file_extension": "{{ANALYZER: File Extension}}",
    "chat_id": {{ANALYZER: Chat ID from file context}},
    "your_custom_field": {{ANALYZER: extracted value}}
  }
}
```

---

### User Settings

```config
AUTO_SAVE={{auto-save}}
SHOW_EXTRACTED_METADATA=your,fields,here
```

--- END OF INSTRUCTIONS ---
```

---

## Tips for Success

1. **Be Specific**: The more precise your task description, the better the analyzer will perform.
2. **Think About Metadata**: Consider what fields you'd want to filter or sort by later.
3. **Test Your ID**: Have a valid analyzer ID ready before we start.
4. **Know Your Reference Files**: If you need them, know the exact path/pattern and purpose.
5. **Review Examples**: Look at the provided examples (`tiny-overview`, `comment-style-validator`) for inspiration.
6. **Prepare for Confirmation**: Read the summary carefully before confirming with `yes`.
