<!--
Component: GitSense Chat Batch Processing Component Documentation
Block-UUID: 3f3b0199-d687-42d5-bcad-09595c97f105
Parent-UUID: 72e6ddb9-475e-4463-aadd-11f8afc1c448
Version: 2.5.0
Description: Comprehensive documentation for integrating and managing the GitSense Chat Batch Processing Component from the backend, now including details on the updated generic batch job API with improved parameter organization, administrative CLI tool documentation, corrected API signatures, and new worker status monitoring capabilities.
Language: HTML (for comment notation)
Created-at: 2026-02-15T23:57:38.567Z
Authors: Gemini 2.5 Flash (v1.0.0), Gemini 2.5 Flash (v1.1.0), Gemini 2.5 Flash (v1.2.0), Gemini 2.5 Flash (v1.3.0), Gemini 2.5 Flash (v1.4.0), Gemini 2.5 Flash (v1.5.0), Gemini 2.5 Flash (v1.6.0), Gemini 2.5 Flash (v1.7.0), Gemini 2.5 Flash (v1.8.0), Gemini 2.5 Flash (v1.9.0), GLM-4.6 (v2.0.0), GLM-4.6 (v2.1.0), GLM-4.6 (v2.2.0), GLM-4.6 (v2.3.0), Kimi K2 Thinking (v2.4.0), GLM-4.7 (v2.5.0)
-->


# GitSense Chat Batch Processing Component - Backend Documentation

## 1. Introduction

The GitSense Chat Batch Processing Component (referred to as the "batch component") is designed to streamline the analysis of large volumes of files using LLM providers' native batch processing capabilities, abstracting away the complexity of individual LLM requests and providing a single, trackable batch job for users.

This document outlines how to install, interact with the batch component's public API, monitor job statuses, and manage batch jobs from the main GitSense Chat backend. It supports both CommonJS and ES Modules.

### 1.1. Environment Variables

The batch component supports several environment variables to control timing behavior:

- `GSC_REALTIME_DELAY_MS_WORK_FOUND`: Delay in milliseconds between processing batch groups when work is found (default: 1000ms, minimum: 100ms)
- `GSC_REALTIME_DELAY_MS_NO_WORK`: Delay in milliseconds when no work is found (default: 5000ms, minimum: 100ms)
- `GSC_SCHEDULED_POLLING_INTERVAL_MS`: Base polling interval in milliseconds for scheduled jobs (default: 60000ms, minimum: 1000ms)
- `GSC_REALTIME_POLLING_INTERVAL_MS`: Base polling interval in milliseconds for realtime jobs (default: 10000ms, minimum: 100ms)

Example usage for testing:
```bash
# Set longer delays for easier testing
export GSC_REALTIME_DELAY_MS_WORK_FOUND=5000
export GSC_REALTIME_DELAY_MS_NO_WORK=5000
gsc-realtime-batch-processor


```

## 2. Key Concepts

*   **Batch Job:** A single, asynchronous task submitted to an LLM provider (e.g., Google Gemini Batch Mode) or processed internally to process multiple individual analysis requests (one per file/group).
*   **Batch Type:** The category of batch job (e.g., 'analyze'). The component is designed to support multiple batch types with a generic API.
*   **Processing Type:** How the batch job is processed - either 'scheduled' (submitted to external LLM provider) or 'realtime' (processed internally).
*   **Batch Group:** A logical collection of individual file analysis requests that are processed together. For external LLM batch APIs, this often corresponds to a single LLM request. For internal real-time processing, a batch group is processed by a single LLM chat completion call.
*   **Internal Database (`data/batches.sqlite3`):** Stores metadata about batch jobs, individual item statuses, batch groups, and detailed polling logs. This database is managed by the batch component and is central to both scheduled and real-time processing.
*   **Deduplication (via `input_hash`):** The component automatically computes a hash of the input parameters for each batch job. If an identical, active job (not yet succeeded, failed, or cancelled) already exists, the existing `batchJobId` will be returned instead of creating a duplicate.
*   **Main Chat Database (`data/chats.sqlite3`):** Read from to retrieve file content for prompt construction, and written to for upserting analysis results as individual `messages`. This database is managed by the main GitSense Chat application.
*   **Worker Processes:**
    *   **`gsc-batch-poller` (CLI):** A continuously running Node.js process responsible for polling *external LLM providers* for the status of `scheduled` batch jobs, downloading results, processing them, and updating internal databases.
    *   **`gsc-realtime-batch-processor` (CLI):** A continuously running Node.js process responsible for processing `realtime` batch jobs internally. It continuously finds unclaimed `batch_groups` from the `batches.sqlite3` database, makes direct LLM chat completion calls for each group, parses the responses, and upserts the results into `chats.sqlite3`.
*   **Worker Heartbeats:** Workers actively record their status (e.g., IDLE, BUSY) and a rolling log of recent activities to the `worker_heartbeats` table in `batches.sqlite3`. This enables real-time health monitoring (Healthy, Stale, Dead) and activity tracking.

## 3. Setup & Installation

### 3.1. Installation

Install the package using npm or yarn:

```bash
npm install @gitsense/gsc-enterprise-batch
# or
yarn add @gitsense/gsc-enterprise-batch
```

### 3.2. Dependencies

The package has the following peer dependencies (or direct dependencies if not peer-defined) that will be installed automatically:

*   `@google/genai`: Official Google Gemini Node.js client library.
*   `@gitsense/gsc-utils`: Shared utility library for GitSense Chat.
*   `sqlite3`: SQLite database driver.

### 3.3. Configuration Files

The batch component utilizes the main GitSense Chat's `data/chat-config.json` for LLM provider configurations. There are currently no separate batch-specific configuration settings.

### 3.4. Initializing the Component (Direct API Usage)

The `initialize()` function from the `@gitsense/gsc-enterprise-batch` package must be called once at application startup if you are using the API directly. It accepts an `options` object with a single `gscHome` property, which is the absolute path to your GitSense Chat installation directory. All other necessary configuration and database paths are derived internally from this `gscHome` path.

```javascript
// For CommonJS
const { initialize, shutdown } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { initialize, shutdown } from '@gitsense/gsc-enterprise-batch';

const path = require('path'); // Or import path from 'path';

async function startBackendService() {
    console.log('Starting GitSense Chat Backend Service...');

    // Define the GitSense Chat installation directory (GSC_HOME)
    const GSC_HOME = path.resolve('.');

    const initOptions = { gscHome: GSC_HOME };

    try {
        // Initialize the batch component with explicit paths
        await initialize(initOptions);
        console.log('Batch component initialized and ready.');

        // Now you can use createBatchJob, getBatchJobDetails, cancelBatchJob

        // Example: Keep the service running
        // process.on('SIGINT', async () => {
        //     console.log('Shutting down backend service...');
        //     await shutdown();
        //     process.exit(0);
        // });

    } catch (error) {
        console.error('Failed to start backend service due to batch component initialization error:', error);
        process.exit(1);
    }
}

startBackendService();
```

## 4. Public API Usage (`@gitsense/gsc-enterprise-batch`)

The `@gitsense/gsc-enterprise-batch` package exposes the primary functions for interacting with the batch component.

### 4.1. `createBatchJob(batchType, groups, llmOptions, processType, options)`

Creates a new batch job of the specified type. This is the **generic entry point** that routes to the appropriate type-specific handler.

*   **Parameters:**
    *   `batchType` (string, required): The type of batch job to create (e.g., `'analyze'`).
    *   `groups` (Array<Object>, required): An array of group objects. Each object must have:
        *   `id` (number, required): A unique identifier for the group.
        *   `chatIds` (Array<number>, required): An array of `chat_id`s (from `data/chats.sqlite3`) representing the files in this group.
    *   `llmOptions` (Object, required): Configuration options for the LLM request.
        *   `modelName` (string, required): The user-friendly name of the LLM model (e.g., `'gemini-2.5-flash'`).
        *   `temperature` (number, optional): LLM temperature (0-1). Defaults to 0.
        *   `maxOutputTokens` (number, optional): Maximum output tokens for the LLM. Defaults to 20000.
    *   `processType` (string, required): The processing type: `'realtime'` (for internal processing) or `'scheduled'` (for external LLM batch API).
    *   `options` (Object, required): Additional options for batch job creation.
        *   `analyzerId` (string, optional): The unique ID of the analyzer to use (e.g., `'tiny-overview::file-content::default'`). Required for 'analyze' type.
        *   `triggerChatId` (number, required): The `chat_id` from `data/chats.sqlite3` that initiated this batch request.
*   **Returns:** `Promise<{ batchJobId: number, status: string, message: string }>`
    *   `batchJobId`: The internal ID of the newly created batch job in `data/batches.sqlite3`. If a duplicate job is detected, this will be the ID of the existing job.
    *   `status`: The initial internal status. For `realtime` jobs, this is `'PENDING'`. For `scheduled` jobs, it is initially `'EXTERNAL_CREATION_PENDING'` (meaning the request has been submitted, and a worker will handle the external LLM provider creation). If a duplicate job is found, it will return the status of the existing job.
    *   `message`: A confirmation message, which may indicate if a duplicate job was found or if external creation is pending.
*   **Throws:**
    *   `BatchError`: If the component is not initialized or an internal error occurs.
    *   `InvalidInputError`: If input parameters are invalid.
    *   `AnalyzerNotFoundError`: If the specified `analyzerId` does not exist.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and the component is ready
// For CommonJS
const { createBatchJob } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { createBatchJob } from '@gitsense/gsc-enterprise-batch';

async function submitNewAnalysisBatch() {
    const batchType = 'analyze'; // Specify the batch type
    const groups = [
        { id: 1, chatIds: [187547, 186165] }, // Example chat IDs for two files
        // { id: 2, chatIds: [187548] } // Another group if needed
    ];
    const llmOptions = {
        modelName: 'gemini-2.5-flash', // Example model
        temperature: 0.2,
        maxOutputTokens: 20000
    };
    const options = {
        analyzerId: 'tiny-overview::file-content::default', // Example analyzer
        triggerChatId: 12345 // The chat_id that initiated this batch
    };

    // Example for a 'scheduled' batch (for external LLM batch APIs, e.g., Google Batch)
    // This will return immediately with status 'EXTERNAL_CREATION_PENDING'.
    // The gsc-batch-poller worker will then pick it up to create the external job.
    try {
        const result = await createBatchJob(batchType, groups, llmOptions, 'scheduled', options);
        console.log('Scheduled batch job submitted:', result);
        // Store result.batchJobId to query status later
        // return result.batchJobId;
    } catch (error) {
        console.error('Failed to create scheduled batch job:', error);
    }

    // Example for a 'realtime' batch (for internal LLM chat completion jobs)
    // This will return immediately with status 'PENDING'.
    try {
        const result = await createBatchJob(batchType, groups, llmOptions, 'realtime', options);
        console.log('Real-time batch job submitted:', result);
        // Store result.batchJobId to query status later
    } catch (error) {
        console.error('Failed to create batch job:', error);
    }
}
```

### 4.2. `getBatchJobDetails(batchJobId, lastUpdated)`

Retrieves a comprehensive report on the status and progress of a specific batch job. This is a **generic method** that works with any batch job type. For efficient polling with large batch jobs, you can provide a `lastUpdated` timestamp to only return groups that have changed since your last poll.

*   **Parameters:**
    *   `batchJobId` (number, required): The internal ID of the batch job (returned by `createBatchJob`).
    *   `lastUpdated` (string, optional): ISO 8601 timestamp to filter groups updated since this time. This enables efficient polling for batch jobs with thousands of groups.
*   **Returns:** `Promise<Object>` A detailed report object with the following structure:
```javascript
 {
     batchJobId: number,
     displayName: string,
     status: string, // Internal status: 'PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED', 'EXTERNAL_CREATION_PENDING'
     type: string, // Batch type: 'analyze', etc.
     llmProviderJobId: string | null, // External ID from LLM provider
     llmProviderName: string,
     llmModelName: string,
     triggerChatId: number,
     triggerChatUuid: string,
     createdAt: string, // ISO 8601 timestamp
     startedAt: string | null, // ISO 8601 timestamp
     finishedAt: string | null, // ISO 8601 timestamp
     lastPolledAt: string | null, // ISO 8601 timestamp
     nextPollAt: string | null, // ISO 8601 timestamp
     pollAttempts: number,
     errorDetails: string | null, // Internal error details if job failed
     totalGroups: number,
     totalFiles: number,
     successfulFiles: number,
     failedFiles: number,
     pendingFiles: number,
     successfulPolls: number,
     failedPolls: number,
     llmProviderCurrentStatus: string | null, // Real-time status from LLM provider (if still active),
     llmProviderError: Object | string | null, // Real-time error from LLM provider (if still active),
     timeSinceLastPoll: number | null, // Seconds since last poll event
     pollingOverdue: boolean, // True if polling is overdue (more than 2x max polling interval)
     groupDetails: Array<{
         id: number;
         groupNumber: number;
         status: string; // 'PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'PARTIALLY_SUCCEEDED'
         errorDetails: string | null;
         startedAt: string | null;
         finishedAt: string | null;
         llmApiAttempts: number;
         stats: { totalItemsInGroup: number; };
         successfulItemsInGroup: number;
         failedItemsInGroup: number;
         pendingItemsInGroup: number;
         analyzeChatUuid: string | null;
         generationConfig: any;
     }>
 }
```
*   **Throws:**
    *   `BatchError`: If the component is not initialized or the job is not found.
    *   `ProviderError`: If LLM provider interaction fails during real-time status check.
    *   `InvalidInputError`: If the `batchJobId` is invalid.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and a batchJobId is available
// For CommonJS
const { getBatchJobDetails } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { getBatchJobDetails } from '@gitsense/gsc-enterprise-batch';

async function queryBatchJobStatus(batchJobId) {
    try {
        const report = await getBatchJobDetails(batchJobId);
        console.log(\`--- Batch Job Report for ID: \${report.batchJobId} ---\`);
        console.log(\`Display Name: \${report.displayName}\`);
        console.log(\`Type: \${report.type}\`);
        console.log(\`Internal Status: \${report.status}\`);
        console.log(\`LLM Provider Status: \${report.llmProviderCurrentStatus || 'N/A'}\`);
        console.log(\`Created At: \${report.createdAt}\`);
        console.log(\`Last Polled At: \${report.lastPolledAt || 'N/A'}\`);
        console.log(\`Time Since Last Poll: \${report.timeSinceLastPoll || 'N/A'} seconds\`);
        console.log(\`Polling Overdue: \${report.pollingOverdue}\`);
        console.log(\`Total Poll Attempts: \${report.pollAttempts}\`);
        console.log(\`Successful Polls: \${report.successfulPolls}\`);
        console.log(\`Failed Polls: \${report.failedPolls}\`);
        console.log(\`Total Groups: \${report.totalGroups}\`);
        console.log(\`Total Files: \${report.totalFiles}\`);
        console.log(\`Successful Files: \${report.successfulFiles}\`);
        console.log(\`Failed Files: \${report.failedFiles}\`);
        console.log(\`Pending Files: \${report.pendingFiles}\`);
        if (report.errorDetails) {
            console.error(\`Internal Error: \${report.errorDetails}\`);
        }
        if (report.llmProviderError) {
            console.error(\`LLM Provider Error: \${JSON.stringify(report.llmProviderError)}\`);
        }
        if (report.groupDetails && report.groupDetails.length > 0) {
            console.log('--- Group Details ---');
            report.groupDetails.forEach(group => {
                console.log(\`  Group ID: \${group.id}, Status: \${group.status}, Items: \${group.stats.totalItemsInGroup}, Success: \${group.successfulItemsInGroup}, Failed: \${group.failedItemsInGroup}\`);
            });
        }
        return report;
    } catch (error) {
        console.error(\`Failed to get batch job details for ID \${batchJobId}:\`, error);
    }
}

// Example of efficient polling with lastUpdated parameter
async function pollBatchJobEfficiently(batchJobId) {
    let lastUpdated = null;
    
    // Polling loop
    const pollInterval = setInterval(async () => {
        try {
            const report = await getBatchJobDetails(batchJobId, lastUpdated);
            
            // Check if polling is overdue
            if (report.pollingOverdue) {
                console.warn(\`Warning: Polling for batch job \${batchJobId} is overdue! Last poll was \${report.timeSinceLastPoll} seconds ago.\`);
            }
            
            // Process only the updated groups
            if (report.groupDetails && report.groupDetails.length > 0) {
                console.log(\`Processing \${report.groupDetails.length} updated groups\`);
                report.groupDetails.forEach(group => {
                    console.log(\`  Group \${group.groupNumber}: \${group.status}\`);
                });
            }
            
            // Update lastUpdated to the current time for next poll
            lastUpdated = new Date().toISOString();
            
            // Stop polling if job is complete
            if (['SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED'].includes(report.status)) {
                clearInterval(pollInterval);
                console.log(\`Batch job \${batchJobId} completed with status: \${report.status}\`);
            }
        } catch (error) {
            console.error(\`Error polling batch job \${batchJobId}:\`, error);
        }
    }, 5000); // Poll every 5 seconds
}
```

### 4.3. `getBatchJobType(batchJobId)`

Retrieves the type of a specific batch job.

*   **Parameters:**
    *   `batchJobId` (number, required): The internal ID of the batch job.
*   **Returns:** `Promise<string>` The type of the batch job (e.g., 'analyze').
*   **Throws:**
    *   `BatchError`: If the component is not initialized or the job is not found.
    *   `InvalidInputError`: If the `batchJobId` is invalid.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and a batchJobId is available
// For CommonJS
const { getBatchJobType } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { getBatchJobType } from '@gitsense/gsc-enterprise-batch';

async function checkBatchJobType(batchJobId) {
    try {
        const type = await getBatchJobType(batchJobId);
        console.log(\`Batch job \${batchJobId} is of type: \${type}\`);
        return type;
    } catch (error) {
        console.error(\`Failed to get batch job type for ID \${batchJobId}:\`, error);
    }
}
```

### 4.4. `getScheduableBatchProviders()`

Returns a list of LLM provider names that are currently supported for `'scheduled'` batch jobs. This method is useful for dynamically determining which external LLM providers the batch component is configured to work with.

*   **Parameters:** None.
*   **Returns:** `Array<string>` An array of strings, where each string is the name of a supported provider (e.g., `['Google']`). The array is a copy, so modifying it will not affect the internal state.
*   **Throws:**
    *   `BatchError`: If the component is not initialized.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and the component is ready
// For CommonJS
const { getScheduableBatchProviders } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { getScheduableBatchProviders } from '@gitsense/gsc-enterprise-batch';

async function listSupportedProviders() {
    try {
        const providers = getScheduableBatchProviders();
        console.log('Supported scheduled batch providers:', providers);
        return providers;
    } catch (error) {
        console.error('Failed to get supported scheduled batch providers:', error);
    }
}
```

### 4.5. `getBatchGroupChatMessages(batchJobId, groupNumber)`

Retrieves the prompt and response messages for a specific batch group, formatted as an array of chat message payloads suitable for creating a new 'analyze' chat. This method returns the `role`, `message` content, and `model` information.

*   **Parameters:**
    *   `batchJobId` (number, required): The internal ID of the batch job.
    *   `groupNumber` (number, required): The specific group number within that batch job.
*   **Returns:** `Promise<Array<{ role: string, message: string, model: Object|null }>>` An array of message objects, each with `role`, `message`, and `model` properties. The `model` field contains `{ id: string, name: string }` for assistant messages, or `null` for user/system messages.
*   **Throws:**
    *   `BatchError`: If the component is not initialized or the job/group is not found.
    *   `InvalidInputError`: If input parameters are invalid.
    *   `ProviderError`: If LLM response parsing fails.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and the component is ready
// For CommonJS
const { getBatchGroupChatMessages } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { getBatchGroupChatMessages } from '@gitsense/gsc-enterprise-batch';

async function retrieveGroupChatMessages(batchJobId, groupNumber) {
    try {
        const messages = await getBatchGroupChatMessages(batchJobId, groupNumber);
        console.log(\`Messages for Batch Job \${batchJobId}, Group \${groupNumber}:\`);
        messages.forEach((msg, index) => {
            console.log(\`--- Message \${index + 1} ---\`);
            console.log(\`Role: \${msg.role}\`);
            console.log(\`Model: \${msg.model ? \`\${msg.model.name} (\${msg.model.id})\` : 'N/A'}\`);
            console.log(\`Content: \${msg.message.substring(0, 200)}...\`); // Log first 200 chars
        });
        return messages;
    } catch (error) {
        console.error(\`Failed to retrieve chat messages for batch group \${batchJobId}/\${groupNumber}:\`, error);
    }
}

// Example usage:
// retrieveGroupChatMessages(123, 1); // Replace with actual batchJobId and groupNumber
```

### 4.6. `updateBatchGroupAnalyzeChatUuid(batchJobId, groupNumber, analyzeChatUuid)`

> IMPORTANT: Method will be obsoleted

Updates the `analyzeChatUuid` for a specific batch group. This method is typically called by the frontend after a new 'Analyze Chat' has been successfully created for a group, linking the batch group to its dedicated review chat.

*   **Parameters:**
    *   `batchJobId` (number, required): The internal ID of the batch job.
    *   `groupNumber` (number, required): The specific group number within that batch job.
    *   `analyzeChatUuid` (string | null, required): The UUID of the newly created chat, or `null` to clear an existing association.
*   **Returns:** `Promise<void>` A promise that resolves when the update is complete.
*   **Throws:**
    *   `BatchError`: If the component is not initialized or the job/group is not found.
    *   `InvalidInputError`: If input parameters are invalid.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and the component is ready
// For CommonJS
const { updateBatchGroupAnalyzeChatUuid } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { updateBatchGroupAnalyzeChatUuid } from '@gitsense/gsc-enterprise-batch';

async function linkGroupToAnalyzeChat(batchJobId, groupNumber, newAnalyzeChatUuid) {
    try {
        await updateBatchGroupAnalyzeChatUuid(batchJobId, groupNumber, newAnalyzeChatUuid);
        console.log(\`Successfully linked batch job \${batchJobId}, group \${groupNumber} to chat UUID: \${newAnalyzeChatUuid}\`);
    } catch (error) {
        console.error(\`Failed to update analyzeChatUuid for batch group \${batchJobId}/\${groupNumber}:\`, error);
    }
}

// Example usage:
// const myBatchJobId = 123;
// const myGroupNumber = 1;
// const newlyCreatedChatUuid = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // Replace with actual UUID
// linkGroupToAnalyzeChat(myBatchJobId, myGroupNumber, newlyCreatedChatUuid);
```

### 4.7. `cancelBatchJob(batchJobId)`

Attempts to cancel an ongoing batch job.

*   **Parameters:**
    *   `batchJobId` (number, required): The internal ID of the batch job to cancel.
*   **Returns:** `Promise<{ success: boolean, message: string, newStatus: string }>`
    *   `success`: `true` if the cancellation request was sent or the job was internally cancelled, `false` otherwise.
    *   `message`: A descriptive message about the cancellation attempt.
    *   `newStatus`: The updated internal status of the batch job (e.g., `'CANCELLED'`, `'FAILED'`).
*   **Throws:**
    *   `BatchError`: If the component is not initialized or the job is not found.
    *   `InvalidInputError`: If `batchJobId` is invalid.
    *   `ProviderError`: If LLM provider interaction fails during cancellation.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and a batchJobId is available
// For CommonJS
const { cancelBatchJob } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { cancelBatchJob } from '@gitsense/gsc-enterprise-batch';

async function cancelOngoingBatchJob(batchJobId) {
    try {
        const result = await cancelBatchJob(batchJobId);
        console.log('Cancellation attempt result:', result);
        return result;
    } catch (error) {
        console.error(\`Error canceling batch job \${batchJobId}:\`, error);
    }
}
```

### 4.8. `resetBatchGroup(batchJobId, groupNumber)`

Resets the status of a specific batch group and its associated items to `'PENDING'`, allowing it to be re-processed by the worker. This operation is only allowed for internal real-time batch jobs as a safeguard.

*   **Parameters:**
    *   `batchJobId` (number, required): The internal ID of the batch job.
    *   `groupNumber` (number, required): The specific group number within that batch job.
*   **Returns:** `Promise<{ success: boolean, message: string }>`
    *   `success`: `true` if the reset request was successfully initiated, `false` otherwise.
    *   `message`: A descriptive message about the reset attempt.
*   **Throws:**
    *   `BatchError`: If the component is not initialized or an internal error occurs.
    *   `InvalidInputError`: If input parameters are invalid or the job is not an internal real-time job.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and the component is ready
// For CommonJS
const { resetBatchGroup } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { resetBatchGroup } from '@gitsense/gsc-enterprise-batch';

async function reevaluateBatchGroup(batchJobId, groupNumber) {
    try {
        console.log(\`Attempting to reset batch job \${batchJobId}, group \${groupNumber}...\`);
        const result = await resetBatchGroup(batchJobId, groupNumber);

        if (result.success) {
            console.log(\`Successfully initiated reset for group \${groupNumber}: \${result.message}\`);
            // Frontend should now poll for updated status
        } else {
            console.error(\`Failed to reset group \${groupNumber}: \${result.message}\`);
        }
        return result;
    } catch (error) {
        console.error(\`An error occurred while trying to reset batch group \${batchJobId}/\${groupNumber}:\`, error);
        // Handle specific errors like InvalidInputError (e.g., not a real-time job)
        if (error.name === 'InvalidInputError') {
            console.error(\`Reason: \${error.message}\`);
        }
        throw error; // Re-throw for upstream handling
    }
}

// Example usage:
// reevaluateBatchGroup(123, 1); // Replace with actual batchJobId and groupNumber
```

### 4.9. `getWorkerStatus()`

Retrieves the status and health information of all active batch workers. This method queries the `worker_heartbeats` table and checks process health to determine if workers are Healthy, Stale, or Dead.

*   **Parameters:** None.
*   **Returns:** `Promise<Array<Object>>` An array of worker status objects. Each object contains:
    *   `worker_name` (string): The name of the worker (e.g., 'poller', 'realtime-processor').
    *   `pid` (number): The Process ID of the worker.
    *   `status` (string): The current status of the worker (e.g., 'IDLE', 'BUSY', 'STOPPING').
    *   `uptime` (string): Human-readable uptime (e.g., '2 hours').
    *   `last_heartbeat` (string): ISO 8601 timestamp of the last heartbeat.
    *   `seconds_since_heartbeat` (number): Seconds elapsed since the last heartbeat.
    *   `health` (string): The health status ('HEALTHY', 'STALE', 'DEAD (PID Missing)').
    *   `activities` (Array<Object>): A rolling log of recent activities, each with `timestamp` and `message`.
*   **Throws:**
    *   `BatchError`: If the component is not initialized.

**Example:**

```javascript
// Assuming 'initialize(initOptions)' has been called and the component is ready
// For CommonJS
const { getWorkerStatus } = require('@gitsense/gsc-enterprise-batch');
// For ES Modules
// import { getWorkerStatus } from '@gitsense/gsc-enterprise-batch';

async function checkWorkers() {
    try {
        const workers = await getWorkerStatus();
        console.log('Active Workers:', JSON.stringify(workers, null, 2));
        
        workers.forEach(worker => {
            console.log(\`Worker \${worker.worker_name} (PID: \${worker.pid}) is \${worker.health}\`);
            if (worker.activities.length > 0) {
                console.log(\`  Last Activity: \${worker.activities[0].message}\`);
            }
        });
    } catch (error) {
        console.error('Failed to get worker status:', error);
    }
}
```

### 4.10. Legacy Methods (for backward compatibility)

The following methods are maintained for backward compatibility but delegate to the new generic methods:

*   `createAnalyzeBatchJobPublic(analyzerId, modelName, groups, options, triggerChatId, type)` - Delegates to `createBatchJob('analyze', ...)`
*   `getAnalyzeBatchDetails(batchJobId)` - Delegates to `getBatchJobDetails(batchJobId)`

## 5. Worker Processes

The batch component now utilizes two distinct worker processes to handle different types of batch jobs:

*   **`gsc-batch-poller` (for `scheduled` jobs):** This command is responsible for managing batch jobs submitted to *external LLM providers* (e.g., Google Gemini Batch API). It continuously polls the LLM provider for job status, downloads completed results, orchestrates their parsing and upserting into the `chats.sqlite3` database. **Crucially, it also now handles the initial creation of external LLM batch jobs for internally submitted `scheduled` jobs (those in `EXTERNAL_CREATION_PENDING` status), ensuring an immediate response to the user.** It manages exponential backoff for polling.
*   **`gsc-realtime-batch-processor` (for `realtime` jobs):** This command is responsible for processing `realtime` batch jobs internally. It continuously finds unclaimed `batch_groups` from the `batches.sqlite3` database, makes direct LLM chat completion calls for each group, parses the responses, and upserts the results into `chats.sqlite3`.

Both worker processes should be run as long-lived processes.

*   **Role:**
    *   Initializes the batch component by resolving necessary absolute paths (preferably via environment variables).
    *   `gsc-batch-poller` starts the `pollingScheduler` which continuously queries the internal database for `EXTERNAL_CREATION_PENDING`, `PENDING`, and `RUNNING` `scheduled` jobs. It then either initiates the external LLM job creation or polls the LLM provider for status, downloads results, parses them, and upserts them into `data/chats.sqlite3`.
    *   `gsc-realtime-batch-processor` continuously finds and processes `PENDING` batch groups for `InternalRealtime` jobs, making direct LLM calls and updating statuses.
    *   Manages exponential backoff for polling/retries to avoid overwhelming LLM providers.
    *   Records detailed polling logs in `data/batches.sqlite3`.
    *   Uses `HeartbeatManager` to actively record status and activity logs to the database for health monitoring.
*   **Running the Worker:**
    Both CLI tools automatically derive all necessary paths based on the `GSC_HOME` environment variable. If `GSC_HOME` is not set, they will default to paths relative to the current working directory (`process.cwd()`).

    **Environment Variables:**
    *   `GSC_HOME`: (Recommended) Absolute path to your GitSense Chat installation root. This variable is used to derive all other necessary paths for configuration and databases.

    **Example Usage:**
```bash
    # Ensure the package is installed globally or via npx
    # npm install -g @gitsense/gsc-enterprise-batch

    # Run the scheduled batch poller (for external LLM batch jobs)
    # Using GSC_HOME for simplified path management:
    GSC_HOME=/app gsc-batch-poller

    # Run the real-time batch processor (for internal LLM chat completion jobs)
    # Using GSC_HOME for simplified path management:
    GSC_HOME=/app gsc-realtime-batch-processor
```

    It's recommended to run these scripts using a process manager (e.g., PM2, systemd) to ensure they restart automatically if they crash.

## 6. Administrative CLI Tool

The `gsc-admin-batch` command-line tool provides administrative capabilities for managing batch workers, jobs, and provider resources directly from the terminal.

### 6.1. Worker Management

Manage the batch worker processes (`poller` and `realtime-processor`).

#### Start a Worker
```bash
gsc-admin-batch workers start <type>
```
Where `<type>` is either `poller` or `realtime-processor`.

**Example:**
```bash
GSC_HOME=/app gsc-admin-batch workers start poller
GSC_HOME=/app gsc-admin-batch workers start realtime-processor
```

#### Stop a Worker
```bash
gsc-admin-batch workers stop <type>
```

**Example:**
```bash
GSC_HOME=/app gsc-admin-batch workers stop poller
```

#### Check Worker Status
```bash
gsc-admin-batch workers status
```

**Example Output:**
```
Fetching worker heartbeats...
WORKER          PID    STATUS   UPTIME     LAST HEARTBEAT   HEALTH
poller          12345  IDLE     2 hours    5s ago           HEALTHY
  > 14:00:00                                            Polling cycle completed
  > 13:59:55                                            Processing job 101
realtime-processor 12346  BUSY     1 hour     2s ago           HEALTHY
  > 14:00:02                                            Processing group 5
-----------------------------------------
```
This command now checks the actual process health and displays a rolling log of recent activities for each worker.

#### View Worker Logs
```bash
gsc-admin-batch workers logs <type>
```

**Example:**
```bash
GSC_HOME=/app gsc-admin-batch workers logs poller
```

### 6.2. Job Management

#### List Batch Jobs
```bash
gsc-admin-batch list [options]
```

**Options:**
- `-a, --all`: List all batch jobs, including completed ones.

**Examples:**
```bash
# List only active jobs
GSC_HOME=/app gsc-admin-batch list

# List all jobs (including completed)
GSC_HOME=/app gsc-admin-batch list --all
```

**Example Output:**
```
#  STATUS    TYPE    CREATED AT      DURATION
1  PENDING   analyze 2 minutes ago Pending for 2 minutes
2  RUNNING   analyze 5 minutes ago Running for 3 minutes
```

#### Cancel a Batch Job
```bash
gsc-admin-batch cancel <batch-job-id>
```

**Example:**
```bash
GSC_HOME=/app gsc-admin-batch cancel 123
```

### 6.3. Google Provider Management

Directly manage Google Gemini resources (batch jobs and uploaded files).

#### Manage Google Batch Jobs
```bash
# List all Google Gemini batch jobs
gsc-admin-batch provider google jobs list

# Get details for a specific batch job
gsc-admin-batch provider google jobs get <batch-job-id>

# Cancel a Google Gemini batch job
gsc-admin-batch provider google jobs cancel <batch-job-id>

# Delete a Google Gemini batch job
gsc-admin-batch provider google jobs delete <batch-job-id>
```

**Examples:**
```bash
GSC_HOME=/app gsc-admin-batch provider google jobs list
GSC_HOME=/app gsc-admin-batch provider google jobs get batches/123456789
GSC_HOME=/app gsc-admin-batch provider google jobs cancel batches/123456789
```

#### Manage Google Uploaded Files
```bash
# List all Google Gemini uploaded files
gsc-admin-batch provider google files list

# Get metadata for a specific file
gsc-admin-batch provider google files get <file-id>

# Delete a Google Gemini file
gsc-admin-batch provider google files delete <file-id>

# Download a file to a local path
gsc-admin-batch provider google files download <file-uri> [output-path]
```

**Examples:**
```bash
GSC_HOME=/app gsc-admin-batch provider google files list
GSC_HOME=/app gsc-admin-batch provider google files get files/12345
GSC_HOME=/app gsc-admin-batch provider google files download files/12345 ./output.jsonl
```

## 7. Error Handling

The batch component uses custom error classes for robust error management:

*   `BatchError`: Base error for internal batch component issues.
*   `ProviderError`: Errors related to LLM provider interactions (e.g., API errors, network issues).
*   `InvalidInputError`: Errors due to invalid input parameters.
*   `AnalyzerNotFoundError`: When a specified `analyzerId` cannot be found.

These error classes are exported directly from the package:

```javascript
// CommonJS
const { BatchError, ProviderError, InvalidInputError, AnalyzerNotFoundError } = require('@gitsense/gsc-enterprise-batch/errors');

// ES Modules
// import { BatchError, ProviderError, InvalidInputError, AnalyzerNotFoundError } from '@gitsense/gsc-enterprise-batch/errors';
```

Consumers of the public API should wrap calls in `try...catch` blocks and check for these specific error types to provide appropriate user feedback or logging.

## 8. Polling and Monitoring

### 8.1. Efficient Polling with `lastUpdated`

For batch jobs with thousands of groups, efficient polling is critical to minimize data transfer and processing overhead. The `getBatchJobDetails` method supports an optional `lastUpdated` parameter that allows clients to only retrieve groups that have been updated since their last poll.

**How it works:**
1. The client makes an initial call to `getBatchJobDetails(batchJobId)` without the `lastUpdated` parameter to get the complete job status.
2. The client stores the current timestamp (e.g., `new Date().toISOString()`) as `lastUpdated`.
3. For subsequent polls, the client calls `getBatchJobDetails(batchJobId, lastUpdated)` to only receive groups that have been updated since the last poll.
4. After each successful poll, the client updates `lastUpdated` to the current timestamp.

**Benefits:**
- Significantly reduces data transfer for large batch jobs
- Improves client-side performance by only processing changed groups
- Enables more frequent polling without overwhelming the system

### 8.2. Polling Status Monitoring

The `getBatchJobDetails` response includes additional fields to help monitor the health of the polling system:

- `timeSinceLastPoll`: Number of seconds since the last poll event (null if no polls have occurred)
- `pollingOverdue`: Boolean flag that is true if polling is overdue (more than 2x the maximum polling interval)

These fields help clients detect if the polling worker is functioning properly and alert if polling has stopped unexpectedly.

### 8.3. Default Polling Intervals

The batch component uses different default polling intervals based on the job type:

- **External/Scheduled Jobs**: 60 seconds initially, with exponential backoff up to 5 minutes
- **Internal/Real-time Jobs**: 10 seconds initially, with exponential backoff up to 5 minutes

## 9. Conclusion

This documentation provides a comprehensive guide to integrating and managing batch analysis jobs using the GitSense Chat Batch Processing Component. By following these instructions, the backend can efficiently offload large-scale file analysis to LLM providers, improving performance and user experience.
