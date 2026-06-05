/**
 * Component: Batch Poller Process Entry Point
 * Block-UUID: a045c0f7-7126-4945-9f83-3fe70bc66699
 * Parent-UUID: 644e0b14-7e1a-4dc5-99fa-a75f544005dc
 * Version: 1.7.1
 * Description: Main entry point for the batch polling worker, now configured using a single GSC_HOME environment variable for simplified path management and improved error reporting with full stack traces.
 * Language: JavaScript
 * Created-at: 2026-02-17T17:57:07.474Z
 * Authors: Gemini 2.5 Flash (v1.0.0), Claude 4.0 Sonnet (v1.1.0), Gemini 2.5 Flash (v1.2.0), Gemini 2.5 Flash (v1.3.0), Gemini 2.5 Flash (v1.4.0), GLM-4.6 (v1.5.0), GLM-4.7 (v1.6.0), GLM-4.7 (v1.7.0), GLM-4.7 (v1.7.1)
 */


// Use environment-based conditional requires to switch between development and production paths
const isDevelopment = process.env.NODE_ENV === 'development';
const basePath = isDevelopment ? '../lib' : '../dist/cjs';

const { initialize, shutdown } = require(`${basePath}/index.js`);
const { startPolling, stopPolling } = require(`${basePath}/worker/index.js`);
const { getConfigPaths } = require(`${basePath}/utils/pathUtils.js`);
const HeartbeatManager = require(`${basePath}/utils/heartbeat.js`);

// Variables to hold the initialized dependencies
let _providers = null;
let _dbApi = null;
let _heartbeat = null;
let _isShuttingDown = false;

/**
 * Main function to start the batch worker process.
 */
async function startWorker() {
    console.log('Starting GitSense Chat Batch Worker...');

    try {
        // Use the utility to get all paths based on GSC_HOME or current directory
        const resolvedPaths = getConfigPaths();
        console.log('Initializing batch component with GSC Home path:', resolvedPaths.gscHome);

        // 1. Initialize the entire batch component and capture the returned dependencies
        // Pass only the gscHome to the initialize function
        const { providers, dbApi } = await initialize({ gscHome: resolvedPaths.gscHome });
        _providers = providers;
        _dbApi = dbApi;
        console.log('Batch component initialized successfully.');

        // 3. Initialize Heartbeat
        _heartbeat = new HeartbeatManager('poller', _dbApi);
        await _heartbeat.recordActivity('Worker started', 'IDLE');
        console.log('Poller heartbeat initialized.');

        // 2. Start the polling scheduler
        startPolling(_providers, _dbApi, undefined, _heartbeat);
        console.log('Batch job polling scheduler started.');

        // Handle graceful shutdown
        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);

    } catch (error) {
        console.error('FATAL ERROR: Batch worker failed to start:', error);
        console.error(error.stack);
        process.exit(1);
    }
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

    if (_heartbeat) {
        await _heartbeat.recordActivity('Shutting down', 'STOPPING');
    }

    stopPolling();

    if (_heartbeat) {
        await _heartbeat.recordActivity('Shutting down', 'STOPPED');
    }

    await shutdown();
   
    console.log('Batch worker shut down gracefully.');
    process.exit(0);
}

// Start the worker
startWorker();
