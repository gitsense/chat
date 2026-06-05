/**
 * Component: Real-time Batch Processor Entry Point
 * Block-UUID: 3701956c-77cf-457a-a0ba-f7bc0c342454
 * Parent-UUID: ca9812a7-daf2-47f7-83ac-121e2c0f6a6e
 * Version: 1.6.1
 * Description: Main entry point for the real-time batch processor worker. It finds and processes individual batch groups for InternalRealtime jobs, now using the centralized retry strategy configuration for timing and improved error reporting with full stack traces.
 * Language: JavaScript
 * Created-at: 2026-02-17T17:57:47.583Z
 * Authors: Gemini 2.5 Flash (v1.0.0), GLM-4.6 (v1.1.0), GLM-4.6 (v1.2.0), GLM-4.7 (v1.3.0), GLM-4.7 (v1.4.0), Gemini 3 Flash (v1.5.0), GLM-4.7 (v1.6.0), GLM-4.7 (v1.6.1)
 */


const path = require('path');
const os = require('os');

// Use environment-based conditional requires to switch between development and production paths
const isDevelopment = process.env.NODE_ENV === 'development';
const basePath = isDevelopment ? '../lib' : '../dist/cjs';

const { initialize, shutdown } = require(`${basePath}/index.js`);
const { processBatchGroup } = require(`${basePath}/providers/internal-realtime/groupProcessor.js`);
const { getConfigPaths } = require(`${basePath}/utils/pathUtils.js`);
const { sleep } = require(`${basePath}/utils/llmChatCompletionUtils.js`);
const HeartbeatManager = require(`${basePath}/utils/heartbeat.js`);
const retryStrategy = require(`${basePath}/utils/retryStrategy.js`);
const INTERNAL_PROVIDER_NAME = require(`${basePath}/providers/internal-realtime`).INTERNAL_PROVIDER_NAME;

// Internal state for initialized dependencies
let _isProcessingActive = false;
let _config = null;
let _providers = null;
let _dbApi = null;
let _heartbeat = null;
let _isShuttingDown = false;

/**
 * Main function to start the real-time batch processor worker.
 */
async function startProcessor() {
    console.log(`Starting GitSense Chat Real-time Batch Processor (PID: ${process.pid})...`);

    try {
        // Use the utility to get all paths based on GSC_HOME or current directory
        const resolvedPaths = getConfigPaths();
        console.log('Initializing batch component with GSC Home path:', resolvedPaths.gscHome);

        // 1. Initialize the batch component and capture the returned dependencies
        const { config, providers, dbApi } = await initialize({ gscHome: resolvedPaths.gscHome });
        _config = config;
        _providers = providers;
        _dbApi = dbApi;
        console.log('Batch component initialized successfully.');

        // 2. Initialize the retry strategy with the batch config path
        // This validates the config file exists and is valid JSON at startup.
        retryStrategy.loadConfig(resolvedPaths.batchConfigFilePath);
        console.log('Retry strategy initialized successfully.');

        // 3. Initialize Heartbeat
        _heartbeat = new HeartbeatManager('realtime-processor', _dbApi);
        await _heartbeat.recordActivity('Worker started', 'IDLE');

        _isProcessingActive = true;
        console.log('Real-time batch group processing loop started.');

        // Start the continuous processing loop
        processGroups();

        // Handle graceful shutdown
        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);

    } catch (error) {
        console.error('FATAL ERROR: Real-time batch processor failed to start.');
        console.error('Reason:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

/**
 * The continuous loop for finding and processing batch groups.
 */
async function processGroups() {
    const batchesApi = _dbApi.batches;

    while (_isProcessingActive) {
        let workFound = false;
        try {
            // 1. Find all active InternalRealtime batch jobs
            const activeInternalJobs = (await batchesApi.getPendingAndRunningBatchJobs())
                .filter(job => job.llm_provider_name === INTERNAL_PROVIDER_NAME);

            for (const parentJob of activeInternalJobs) {
                // 2. Find a single unclaimed PENDING batch group for this job
                const batchGroup = await batchesApi.getUnclaimedPendingBatchGroup(parentJob.id);

                if (batchGroup) {
                    workFound = true;
                    console.log(`Attempting to claim batch group #${batchGroup.group_number} for job ${parentJob.id} (LLM Request Key: ${batchGroup.llm_request_key})...`);

                    // 3. Attempt to atomically claim the batch group
                    const claimed = await batchesApi.claimBatchGroup(batchGroup.id, process.pid);

                    if (claimed) {
                        await _heartbeat.recordActivity(`Processing group #${batchGroup.group_number} for job ${parentJob.id}`, 'BUSY');
                        console.log(`Successfully claimed batch group #${batchGroup.group_number} by PID ${process.pid}. Processing...`);
                        try {
                            // 4. Execute group processing logic
                            await processBatchGroup(batchGroup, parentJob, _config, _dbApi);
                            await _heartbeat.recordActivity(`Finished group #${batchGroup.group_number}`, 'IDLE');
                            console.log(`Finished processing batch group #${batchGroup.group_number}.`);
                        } catch (groupProcessingError) {
                            console.error(`Error during processing of batch group #${batchGroup.group_number} for job ${parentJob.id}: ${groupProcessingError.message}`, groupProcessingError);
                            // The groupProcessor.js is designed to update the group status to FAILED and clear PID in its finally block.
                            // So, no explicit update needed here, just ensure the error is logged.
                        }
                    } else {
                        console.log(`Batch group ${batchGroup.group_number} was already claimed by another worker. Skipping.`);
                    }
                }
            }
        } catch (error) {
            console.error('Error in main processing loop:', error);
        }

        // 5. Introduce a delay to prevent busy-waiting
        // Retrieve timing settings from the retry strategy (supports hot reloading)
        const timingSettings = retryStrategy.getTimingSettings();
        const realtimeSettings = timingSettings.processing?.realtime || {};
        
        const delay = workFound 
            ? (realtimeSettings.delayMsWorkFound || 1000) 
            : (realtimeSettings.delayMsNoWork || 5000);
            
        await _heartbeat.sync(); // Regular heartbeat sync even if no work
        await sleep(delay);
    }
    console.log('Real-time batch group processing loop stopped.');
}

/**
 * Handles graceful shutdown of the worker process.
 */
async function gracefulShutdown() {
    console.log('\nReceived shutdown signal. Initiating graceful shutdown...');
    if (_isShuttingDown) {
        console.log('Shutdown already in progress. Please wait...');
        return;
    }
    _isShuttingDown = true;
    _isProcessingActive = false; // Stop the main processing loop

    if (_heartbeat) {
        await _heartbeat.recordActivity('Shutting down', 'STOPPING');
    }

    const batchesApi = _dbApi.batches;
    if (batchesApi) {
        try {
            // Find all groups currently claimed by this worker's PID
            const claimedGroups = await batchesApi.queryAll(
                `SELECT id FROM batch_groups WHERE processing_pid = ? AND status = 'RUNNING'`,
                [process.pid]
            );

            if (claimedGroups.length > 0) {
                console.log(`Releasing ${claimedGroups.length} batch groups claimed by PID ${process.pid}...`);
                await batchesApi.beginTransaction();
                for (const group of claimedGroups) {
                    await batchesApi.updateBatchGroup(group.id, {
                        status: 'PENDING', // Revert to PENDING so another worker can pick it up
                        processing_pid: null,
                        error_details: 'Worker process shut down unexpectedly while processing. Requeued.'
                    });
                }
                await batchesApi.commitTransaction();
                console.log(`Released ${claimedGroups.length} batch groups.`);
            }
        } catch (error) {
            console.error('Error during graceful shutdown while releasing claimed groups:', error);
        }
    }

    if (_heartbeat) {
        await _heartbeat.recordActivity('Shutting down', 'STOPPED');
    }

    // Call the main package's shutdown to close database connections
    await shutdown();
    console.log('Real-time batch processor shut down gracefully.');
    process.exit(0);
}

// Start the worker
startProcessor();
