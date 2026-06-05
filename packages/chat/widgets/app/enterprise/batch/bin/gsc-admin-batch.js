#!/usr/bin/env node

/*
 * Component: GitSense Chat Enterprise Batch Admin CLI
 * Block-UUID: 335ff5aa-6f54-4017-a0b9-04fc6b16809c
 * Parent-UUID: 6d6dec08-9094-41c6-80bd-db81b89745f0
 * Version: 1.6.0
 * Description: Command-line interface for managing LLM batch jobs and worker processes, now integrating the advanced worker status utility for detailed health monitoring. Added create-ephemeral-analyze-chat command to verify Claude Code CLI execution context.
 * Language: JavaScript
 * Created-at: 2025-09-03T18:05:15.975Z
 * Authors: Gemini 2.5 Flash (v1.0.0), Gemini 2.5 Flash (v1.1.0), Gemini 2.5 Flash (v1.2.0), GLM-4.6 (v1.3.0), GLM-4.7 (v1.4.0), GLM-4.7 (v1.5.0), GLM-4.7 (v1.6.0)
 */


const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');
const textTable = require('text-table');

dayjs.extend(relativeTime);
dayjs.extend(duration);

// Use environment-based conditional requires to switch between development and production paths
const isDevelopment = process.env.NODE_ENV === 'development';
const basePath = isDevelopment ? '../lib' : '../dist/cjs';

// Import core batch component functions
const { initialize, cancelBatchJob, getBatchGroupChatMessages } = require(`${basePath}/index.js`);
const { getConfigPaths } = require(`${basePath}/utils/pathUtils.js`);
const { generateTempFilePath } = require(`${basePath}/utils/tempFileUtils.js`);
const { formatRelativeTime } = require(`${basePath}/utils/timeUtils.js`);
const { INTERNAL_PROVIDER_NAME } = require(`${basePath}/providers/internal-realtime/index.js`);
const { showWorkerStatus } = require(`${basePath}/utils/workerStatus.js`);

const program = new Command();

// --- Internal State and Constants ---
let _dbApi = null;
let _gscHome = null;
let _config = null; // Added to store global config
let _providers = null; // Added to store global providers

const POLLER_WORKER_UID = 'gsc-batch-poller';
const REALTIME_PROCESSOR_WORKER_UID = 'gsc-realtime-batch-processor';

// Resolve paths to worker scripts relative to this CLI script's location
const CLI_SCRIPT_DIR = __dirname; // bin/ directory of gsc-enterprise-batch
const BATCH_COMPONENT_ROOT = path.resolve(CLI_SCRIPT_DIR, '..'); // gsc-enterprise-batch root

const POLLER_SCRIPT_PATH = path.join(BATCH_COMPONENT_ROOT, 'bin', 'batch-poller.js');
const REALTIME_PROCESSOR_SCRIPT_PATH = path.join(BATCH_COMPONENT_ROOT, 'bin', 'realtime-batch-processor.js');

// Function to find the forever executable
function getForeverBinPath() {
    try {
        // Try to find forever in node_modules/.bin first (local install)
        const localForever = path.join(process.cwd(), 'node_modules', '.bin', 'forever');
        if (fs.existsSync(localForever)) {
            return localForever;
        }
        // Fallback to global forever (if installed globally)
        return execSync('which forever', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    } catch (e) {
        console.error('Error: `forever` executable not found. Please ensure `forever` is installed globally (`npm install -g forever`) or as a local dependency.');
        process.exit(1);
    }
}
const FOREVER_BIN_PATH = getForeverBinPath();

// --- Helper Functions ---

/**
 * Initializes the batch component and sets _dbApi and _gscHome.
 * This is called once for commands that need DB access.
 */
async function initBatchComponent() {
    if (_dbApi && _gscHome && _config && _providers) {
        return; // Already initialized
    }

    try {
        const resolvedPaths = getConfigPaths(); // Uses GSC_HOME env var or process.cwd()
        _gscHome = resolvedPaths.gscHome;
        console.log(`Initializing batch component with GSC Home path: ${_gscHome}...`);

        const { dbApi, config, providers } = await initialize({ gscHome: _gscHome });
        _config = config;
        _providers = providers;
        _dbApi = dbApi;
    } catch (error) {
        console.error(`Error initializing batch component: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Executes a forever command synchronously.
 * @param {Array<string>} args - Arguments for the forever command.
 * @returns {string} The stdout from the command.
 */
function runForeverCommand(args) {
    try {
        const result = execSync(`${FOREVER_BIN_PATH} ${args.join(' ')}`, { encoding: 'utf8' });
        return result;
    } catch (error) {
        console.error(`Error executing forever command: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Spawns a forever command for interactive output (e.g., logs).
 * @param {Array<string>} args - Arguments for the forever command.
 */
function spawnForeverCommand(args) {
    try {
        const child = spawnSync(FOREVER_BIN_PATH, args, { stdio: 'inherit' });
        if (child.error) {
            throw child.error;
        }
        if (child.status !== 0) {
            console.error(`Forever command exited with status ${child.status}`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`Error spawning forever command: ${error.message}`);
        process.exit(1);
    }
}

// --- CLI Setup ---
program.description('Manage LLM batch jobs and worker processes.');

// --- Workers Subcommand ---
const workersCommand = program.command('workers')
    .description('Manage batch worker processes (poller, realtime-processor).');

workersCommand.command('start <type>')
    .description('Start a batch worker process (poller or realtime-processor).')
    .action(async (type) => {
        await initBatchComponent();

        let scriptPath;
        let uid;
        if (type === 'poller') {
            scriptPath = POLLER_SCRIPT_PATH;
            uid = POLLER_WORKER_UID;
        } else if (type === 'realtime-processor') {
            scriptPath = REALTIME_PROCESSOR_SCRIPT_PATH;
            uid = REALTIME_PROCESSOR_WORKER_UID;
        } else {
            console.error('Error: Invalid worker type. Must be "poller" or "realtime-processor".');
            process.exit(1);
        }

        console.log(`Starting ${type} worker (UID: ${uid})...`);
        // Pass GSC_HOME to the worker script via environment variable
        const foreverArgs = ['start', '--uid', uid, '--append', '--minUptime', '1000', '--spinSleepTime', '1000', scriptPath];

        const foreverOutput = execSync(`${FOREVER_BIN_PATH} ${foreverArgs.join(' ')}`, {
            encoding: 'utf8',
            env: { ...process.env, GSC_HOME: _gscHome || process.cwd() } // Ensure GSC_HOME is passed
        });
        console.log(foreverOutput);
        console.log(`Worker ${type} started.`);
    });

workersCommand.command('stop <type>')
    .description('Stop a batch worker process (poller or realtime-processor).')
    .action((type) => {
        let uid;
        if (type === 'poller') {
            uid = POLLER_WORKER_UID;
        } else if (type === 'realtime-processor') {
            uid = REALTIME_PROCESSOR_WORKER_UID;
        } else {
            console.error('Error: Invalid worker type. Must be "poller" or "realtime-processor".');
            process.exit(1);
        }

        console.log(`Stopping ${type} worker (UID: ${uid})...`);
        const foreverOutput = runForeverCommand(['stop', uid]);
        console.log(foreverOutput);
        console.log(`Worker ${type} stopped.`);
    });

workersCommand.command('status')
    .description('Show the health and status of batch worker processes.')
    .action(async () => {
        await initBatchComponent();
        await showWorkerStatus(_dbApi.batches);
    });

workersCommand.command('logs <type>')
    .description('Tail the logs for a batch worker process (poller or realtime-processor).')
    .action((type) => {
        let uid;
        if (type === 'poller') {
            uid = POLLER_WORKER_UID;
        } else if (type === 'realtime-processor') {
            uid = REALTIME_PROCESSOR_WORKER_UID;
        } else {
            console.error('Error: Invalid worker type. Must be "poller" or "realtime-processor".');
            process.exit(1);
        }

        console.log(`Tailing logs for ${type} worker (UID: ${uid})... (Press Ctrl+C to exit)`);
        spawnForeverCommand(['logs', uid, '-f']); // -f for follow
    });

// --- List Command ---
program.command('list')
    .description('List active or all batch jobs.')
    .option('-a, --all', 'List all batch jobs, including completed ones.')
    .action(async (options) => {
        await initBatchComponent();

        const batchesApi = _dbApi.batches;
        // Assuming batchesApi has a getBatchJobsSummary method as discussed
        // This method needs to be added to lib/db/batchesApi.js
        const jobs = await batchesApi.getBatchJobsSummary(options.all);

        if (jobs.length === 0) {
            console.log(`No ${options.all ? '' : 'active '}batch jobs found.`);
            return;
        }

        const tableData = [
            ['#', 'STATUS', 'TYPE', 'CREATED AT', 'DURATION']
        ];

        const now = dayjs();

        for (const job of jobs) {
            const createdAt = dayjs(job.createdAt);

            let durationStr = 'N/A';
            if (job.started_at) {
                const startedAt = dayjs(job.started_at);
                if (job.finished_at) {
                    const finishedAt = dayjs(job.finished_at);
                    const diff = dayjs.duration(finishedAt.diff(startedAt));
                    durationStr = `Completed in ${diff.humanize()}`;
                } else {
                    const diff = dayjs.duration(now.diff(startedAt));
                    durationStr = `Running for ${diff.humanize()}`;
                }
            } else {
                // If not started, but active, show time since creation
                if (!['SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED'].includes(job.status)) {
                    const diff = dayjs.duration(now.diff(createdAt));
                    durationStr = `Pending for ${diff.humanize()}`;
                }
            }

            // Infer type from display_name for now
            let type = 'unknown';
            if (job.display_name.includes('Analysis Job')) {
                type = 'analyze';
            }
            // Add more type inference logic here for future batch types

            tableData.push([
                job.id,
                job.status,
                type,
                formatRelativeTime(job.createdAt),
                durationStr
            ]);
        }

        console.log();
        console.log(textTable(tableData));
    });

// --- Cancel Command ---
program.command('cancel <batch-job-id>')
    .description('Cancel an ongoing batch job by its internal ID.')
    .action(async (batchJobIdStr) => {
        const batchJobId = parseInt(batchJobIdStr, 10);
        if (isNaN(batchJobId) || batchJobId <= 0) {
            console.error('Error: Invalid batch job ID. Must be a positive integer.');
            process.exit(1);
        }

        await initBatchComponent();

        console.log(`Attempting to cancel batch job ${batchJobId}...`);
        try {
            const result = await cancelBatchJob(batchJobId);
            console.log(`Cancellation result: ${result.message} (New Status: ${result.newStatus})`);
        } catch (error) {
            console.error(`Error canceling batch job ${batchJobId}: ${error.message}`);
            process.exit(1);
        }
    });

// --- Export Group Messages Command ---
program.command('export-group-messages <batch-job-id> <group-number> [output-file]')
    .description('Exports the prompt and response for a batch group to a JSON file for debugging/import.')
    .action(async (batchJobIdStr, groupNumberStr, outputFile) => {
        await initBatchComponent();

        const batchJobId = parseInt(batchJobIdStr, 10);
        const groupNumber = parseInt(groupNumberStr, 10);

        if (isNaN(batchJobId) || isNaN(groupNumber)) {
            console.error('Error: batch-job-id and group-number must be valid integers.');
            process.exit(1);
        }

        try {
            console.log(`Fetching messages for Batch Job ${batchJobId}, Group ${groupNumber}...`);
            
            // Retrieve the raw messages from the batch component
            const rawMessages = await getBatchGroupChatMessages(batchJobId, groupNumber);

            // Transform to the requested import format
            const importData = {
                name: `Debug: Batch Job ${batchJobId} - Group ${groupNumber}`,
                messages: rawMessages.map(msg => ({
                    role: msg.role,
                    content: msg.message,
                    type: "regular" // Adding the required type field
                }))
            };

            const jsonString = JSON.stringify(importData, null, 2);

            if (outputFile) {
                // Ensure .json extension
                if (!outputFile.endsWith('.json')) {
                    outputFile += '.json';
                }
                const fs = require('fs');
                fs.writeFileSync(outputFile, jsonString, 'utf8');
                console.log(`Successfully exported messages to: ${outputFile}`);
            } else {
                // Print to stdout if no file specified
                console.log(jsonString);
            }

        } catch (error) {
            console.error(`Error exporting messages: ${error.message}`);
            // If the group hasn't finished processing, the prompt/response might not exist yet
            if (error.message.includes('does not have a complete prompt or response')) {
                console.error('Hint: This group may not have finished processing yet.');
            }
            process.exit(1);
        }
    });

// --- Create Ephemeral Chat Command ---
program.command('create-ephemeral-analyze-chat <batch-job-id> <group-number>')
    .description('Creates an ephemeral chat for a batch group and prints the gsc command to verify content.')
    .action(async (batchJobIdStr, groupNumberStr) => {
        await initBatchComponent();

        const batchJobId = parseInt(batchJobIdStr, 10);
        const groupNumber = parseInt(groupNumberStr, 10);

        if (isNaN(batchJobId) || isNaN(groupNumber)) {
            console.error('Error: batch-job-id and group-number must be valid integers.');
            process.exit(1);
        }

        try {
            // 1. Fetch the batch job (for model info)
            const batchJob = await _dbApi.batches.getBatchJobById(batchJobId);
            if (!batchJob) {
                console.error(`Error: Batch job ${batchJobId} not found.`);
                process.exit(1);
            }

            // 2. Fetch batch groups and find the target group
            const groups = await _dbApi.batches.getBatchGroupsByBatchJobId(batchJobId);
            const batchGroup = groups.find(g => g.group_number === groupNumber);
            if (!batchGroup) {
                console.error(`Error: Group ${groupNumber} not found in batch job ${batchJobId}.`);
                process.exit(1);
            }

            const prompt = batchGroup.llm_chat_completion_prompt;
            if (!prompt || !prompt.contents || prompt.contents.length === 0) {
                console.error(`Error: Group ${groupNumber} has no prompt contents.`);
                process.exit(1);
            }

            // 3. Create the ephemeral chat
            const modelName = batchJob.llm_model_name;   // e.g. "Claude Code - Haiku"
            const modelFamily = batchJob.llm_model_id;   // e.g. "haiku"
            const result = await _dbApi.chats.createEphemeralAnalyzeChat(
                prompt.contents, modelName, batchJobId
            );

            console.log('\n--- Ephemeral Chat Created ---');
            console.log(`Chat ID:             ${result.chatId}`);
            console.log(`Chat UUID:           ${result.chatUuid}`);
            console.log(`Last Message ID:     ${result.lastMessageId}`);
            console.log(`Messages in chain:   ${prompt.contents.length - 1}`);

            console.log('\n--- Run this command to verify content ---');
            console.log(`gsc claude chat \\`);
            console.log(`  --uuid ${result.chatUuid} \\`);
            console.log(`  --parent-id ${result.lastMessageId} \\`);
            console.log(`  --message "${result.startMessage.substring(0, 80).replace(/"/g, '\\"')}..." \\`);
            console.log(`  --mode analyze \\`);
            console.log(`  --no-events \\`);
            console.log(`  --model ${modelFamily}`);

        } catch (error) {
            console.error(`Error creating ephemeral chat: ${error.message}`);
            process.exit(1);
        }
    });

// --- Provider Subcommand ---
const providerCommand = program.command('provider')
    .description('Manage LLM provider resources (jobs, files).');

// --- Google Provider Subcommand ---
const googleCommand = providerCommand.command('google')
    .description('Manage Google Gemini resources (batch jobs, uploaded files).');

// --- Google Jobs Subcommand ---
const googleJobsCommand = googleCommand.command('jobs')
    .description('Manage Google Gemini batch jobs.');

googleJobsCommand.command('list')
    .description('List all Google Gemini batch jobs.')
    .action(async () => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.batchApi) {
            console.error('Error: Google Batch API client not initialized.');
            process.exit(1);
        }

        try {
            console.log('Fetching Google Gemini batch jobs...');
            const jobs = await googleProvider.batchApi.listBatchJobs();

            if (jobs.length === 0) {
                console.log('No Google Gemini batch jobs found.');
                return;
            }

            const tableData = [
                ['NAME', 'MODEL', 'STATE', 'CREATE TIME', 'UPDATE TIME']
            ];

            for (const job of jobs) {
                tableData.push([
                    job.name,
                    job.model,
                    job.state,
                    formatRelativeTime(job.createTime),
                    formatRelativeTime(job.updateTime)
                ]);
            }
            console.log();
            console.log(textTable(tableData));
        } catch (error) {
            console.error(`Error listing Google Gemini batch jobs: ${error.message}`);
            process.exit(1);
        }
    });

googleJobsCommand.command('get <batch-job-id>')
    .description('Get details for a specific Google Gemini batch job.')
    .action(async (batchJobId) => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.batchApi) {
            console.error('Error: Google Batch API client not initialized.');
            process.exit(1);
        }

        try {
            console.log(`Fetching details for Google Gemini batch job: ${batchJobId}...`);
            const job = await googleProvider.batchApi.getBatchJob(batchJobId);
            if (job) {
                console.log(JSON.stringify(job, null, 2));
            } else {
                console.log(`Google Gemini batch job ${batchJobId} not found.`);
            }
        } catch (error) {
            console.error(`Error getting Google Gemini batch job ${batchJobId}: ${error.message}`);
            process.exit(1);
        }
    });

googleJobsCommand.command('cancel <batch-job-id>')
    .description('Cancel a Google Gemini batch job.')
    .action(async (batchJobId) => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.batchApi) {
            console.error('Error: Google Batch API client not initialized.');
            process.exit(1);
        }

        try {
            console.log(`Attempting to cancel Google Gemini batch job: ${batchJobId}...`);
            await googleProvider.batchApi.cancelBatchJob(batchJobId);
            console.log(`Google Gemini batch job ${batchJobId} cancellation requested.`);
        } catch (error) {
            console.error(`Error canceling Google Gemini batch job ${batchJobId}: ${error.message}`);
            process.exit(1);
        }
    });

googleJobsCommand.command('delete <batch-job-id>')
    .description('Delete a Google Gemini batch job.')
    .action(async (batchJobId) => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.batchApi) {
            console.error('Error: Google Batch API client not initialized.');
            process.exit(1);
        }

        try {
            console.log(`Attempting to delete Google Gemini batch job: ${batchJobId}...`);
            await googleProvider.batchApi.deleteBatchJob(batchJobId);
            console.log(`Google Gemini batch job ${batchJobId} deleted.`);
        } catch (error) {
            console.error(`Error deleting Google Gemini batch job ${batchJobId}: ${error.message}`);
            process.exit(1);
        }
    });

// --- Google Files Subcommand ---
const googleFilesCommand = googleCommand.command('files')
    .description('Manage Google Gemini uploaded files.');

googleFilesCommand.command('list')
    .description('List all Google Gemini uploaded files.')
    .action(async () => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.fileApi) {
            console.error('Error: Google File API client not initialized.');
            process.exit(1);
        }

        try {
            console.log('Fetching Google Gemini uploaded files...');
            const files = await googleProvider.fileApi.listFiles();

            if (files.length === 0) {
                console.log('No Google Gemini files found.');
                return;
            }

            const tableData = [
                ['NAME', 'DISPLAY NAME', 'MIME TYPE', 'SIZE (BYTES)', 'CREATE TIME']
            ];

            for (const file of files) {
                tableData.push([
                    file.name,
                    file.displayName || 'N/A',
                    file.mimeType,
                    file.sizeBytes,
                    formatRelativeTime(file.createTime) 
                ]);
            }
            console.log();
            console.log(textTable(tableData));
        } catch (error) {
            console.error(`Error listing Google Gemini files: ${error.message}`);
            process.exit(1);
        }
    });

googleFilesCommand.command('get <file-id>')
    .description('Get metadata for a specific Google Gemini file.')
    .action(async (fileId) => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.fileApi) {
            console.error('Error: Google File API client not initialized.');
            process.exit(1);
        }

        try {
            console.log(`Fetching metadata for Google Gemini file: ${fileId} (ID part: ${fileId.replace('files/', '')})...`);
            // Google API has a known limitation where file IDs (the part after 'files/')
            // cannot be more than 40 characters for the 'get' metadata operation.
            if (fileId.replace('files/', '').length > 40) {
                console.warn('Warning: Google Gemini File API has a limitation where file IDs (excluding "files/") cannot be more than 40 characters for metadata retrieval. This command may fail.');
                console.warn('Consider using the "download" command for files with long IDs, or if you only need the content.');
            }
            const file = await googleProvider.fileApi.getFileMetadata(fileId);
            if (file) {
                console.log(JSON.stringify(file, null, 2));
            } else {
                console.log(`Google Gemini file ${fileId} not found.`);
            }
        } catch (error) {
            console.error(`Error getting Google Gemini file ${fileId}: ${error.message}`);
            process.exit(1);
        }
    });

googleFilesCommand.command('delete <file-id>')
    .description('Delete a Google Gemini file.')
    .action(async (fileId) => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.fileApi) {
            console.error('Error: Google File API client not initialized.');
            process.exit(1);
        }

        try {
            console.log(`Attempting to delete Google Gemini file: ${fileId}...`);
            await googleProvider.fileApi.deleteFile(fileId);
            console.log(`Google Gemini file ${fileId} deleted.`);
        } catch (error) {
            console.error(`Error deleting Google Gemini file ${fileId}: ${error.message}`);
            process.exit(1);
        }
    });

googleFilesCommand.command('download <file-uri> [output-path]')
    .description('Download a Google Gemini uploaded file to a local path.')
    .action(async (fileUri, outputPath) => {
        await initBatchComponent();
        const googleProvider = _providers.google;
        if (!googleProvider || !googleProvider.fileApi) {
            console.error('Error: Google File API client not initialized.');
            process.exit(1);
        }

        let actualOutputPath;
        if (outputPath) {
            actualOutputPath = outputPath;
        } else {
            // Default to current directory with filename extracted from URI, add .jsonl if no extension
            const defaultFileName = path.basename(fileUri);
            actualOutputPath = path.join(process.cwd(), defaultFileName);
            if (!path.extname(actualOutputPath)) {
                actualOutputPath += '.jsonl'; // Assume JSONL for batch output files
            }
        }

        try {
            console.log(`Downloading Google Gemini file: ${fileUri} to ${actualOutputPath}...`);
            await googleProvider.fileApi.downloadFile(fileUri, actualOutputPath);
            console.log(`File downloaded successfully to: ${actualOutputPath}`);
        } catch (error) {
            console.error(`Error downloading Google Gemini file ${fileUri}: ${error.message}`);
            process.exit(1);
        }
    });
// Parse arguments and execute commands
program.parse(process.argv);

// If no command is given, display help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
