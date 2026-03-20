<!--
Block-UUID: 203e2a0a-53be-449e-93df-4768fd275595
Component: ChatBuilderMessageREADME
Version: 1.0.0
Description: Specification for the message file format.
Language: markdown
Created-at: 2025-04-22T00:56:02.060Z
Authors: Gemini 2.5 Flash (v1.0.0)
-->

# Message Format Specification

## Overview

This document describes the format used for message files used to construct chats. The format is designed to be both human-readable and machine-parsable, with special considerations for LLM processing.

## File Structure

Each message file follows this structure:

```
; Metadata-Field1: Value
; Metadata-Field2: Value
; ...
;
; role: [user|assistant|system]


Actual message content starts here (after three new lines). It can contain
contain multiple paragraphs, code blocks, and other markdown elements.
```

## Key Components

1. **Metadata Section**:
   - Lines starting with `;` (semicolon) are metadata/comment lines
   - Contains information like Block-UUID, Component, Version, etc.
   - Facilitates LLM traceability and version control

2. **Role Declaration**:
   - Format: `; role: [role]`
   - Specifies the message role in the conversation (user, assistant, system)
   - Separated from other metadata by a blank comment line (`;`)

3. **Content Separator**:
   - Three consecutive newlines (`\n\n\n`) separate metadata from content
   - Everything after this separator is considered the message content

4. **Message Content**:
   - Contains the actual message text
   - Can include any valid markdown
   - Code blocks are escaped with a backslash before backticks (`\````)

## Required Metadata Fields

- `Block-UUID`: Unique identifier for the message block
- `Component`: Name of the component (e.g., UserMessage, AssistantMessage)
- `Version`: Semantic version number (e.g., 1.0.0)
- `Description`: Brief description of the message's purpose
- `Language`: The language of the content (typically "markdown")
- `Created-at`: ISO 8601 timestamp of creation
- `Authors`: List of contributors with their versions

## Role Types

- `user`: Messages from the user
- `assistant`: Messages from the AI assistant
- `system`: System instructions or context

## Code Block Escaping

To prevent parsing issues with markdown code blocks, backticks are escaped with a backslash:

```
```javascript
function example() {
  console.log("Hello world");
}
```
```

When processing these files, the backslashes before backticks should be removed.

## Parsing Algorithm

1. Split the file content by triple newline (`\n\n\n`)
2. The first part contains metadata including the role
3. Extract the role by finding the line that starts with `; role:`
4. Everything after the triple newline is the message content
5. Unescape code blocks by removing backslashes before backticks

## Example

```
32d9afc7-aeac-4a67-ba94-0c92678604a1
; Component: UserMessage
; Version: 1.0.0
; Description: User query about JavaScript functions
; Language: markdown
; Created-at: 2025-04-21T18:15:00.000Z
; Authors: Claude 3.7 Sonnet (v1.0.0)
;
; role: user


Can you explain how JavaScript closures work?

Here's an example I'm confused about:

```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
```
```

## File Naming Convention

Message files are named numerically in the order they appear in the conversation:

- `1.md`: First message (typically user)
- `2.md`: Second message (typically assistant)
- And so on...

## Directory Structure

Messages are organized by type in the `messages` directory:

```
messages/
├── notes/
│   ├── 1.md
│   └── 2.md
└── draft/
    ├── 1.md
    └── 2.md
```

Each subdirectory represents a different message type or conversation context.
