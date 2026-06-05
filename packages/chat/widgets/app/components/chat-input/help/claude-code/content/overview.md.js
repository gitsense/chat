/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

let OVERVIEW_CONTENT=`Claude Code in GitSense Chat supports two distinct modes.

**Code Provenance**

Standard Claude Code behavior enhanced with complete traceability. Every code block is tracked with:
- **UUIDs** for unique identification
- **Version history** for lineage tracking
- **Metadata headers** for provenance

This ensures you can always trace the origin and evolution of any code generated or modified in your chat.

**Note:** Currently, GitSense Chat does not support direct file changes on the host machine. While coding agents are designed to modify files, we limit this capability to ensure all work can be 100% verified. In the future, we will provide mechanisms that allow users to sign off on AI-generated code, which will enable Claude Code to modify files on your behalf.

**Intent Workflow**

A three-stage process that transforms your intent into precise code changes with predictable behavior.

1. **Intent Discovery** - Find candidate files based on your intent using semantic understanding (not just keywords).
2. **Intent Validation** - Confirm the right files are selected before touching code.
3. **Intent Change** - Execute targeted changes only on validated files.

**Key Benefits:**
- **Predictable Behavior:** Breaks down complex tasks into clear, manageable stages. You know exactly what the agent is doing at every step.
- **Efficient Execution:** By validating files before making changes, you prevent the agent from spending hours modifying the wrong code.
- **Full Control:** You approve every stage, ensuring the work aligns with your intent.

> The Intent Workflow requires an **Active CLI Contract** to know which directories to search and to provide a secure bridge to your local system.

**Learn More**

- **Code Provenance**: See the [Code Provenance](#) tab for details on traceability features
- **Intent Workflow**: See the [Intent Workflow](#) tab for details on the three-stage process
- **Contracts**: See the [Contract](#) tab for details on why contracts are needed and how to create one
`;module.exports={OVERVIEW_CONTENT:OVERVIEW_CONTENT};
