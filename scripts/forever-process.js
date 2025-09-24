/*
 * Component: Forever Process Manager
 * Block-UUID: 5a79d6b4-c91c-410b-a0ea-2209f3fd91c9
 * Parent-UUID: 775dce2e-c293-4738-9c33-96b9637c34f6
 * Version: 2.1.0
 * Description: Manages the main application process using 'forever'. Supports starting and stopping instances based on port. Usage: forever-process <start|stop>
 * Language: javascript
 * Created-at: 2025-09-24T18:00:53.000Z
 * Authors: Qwen 3 Coder 480B - Cerebras (v2.1.0)
 */


require("dotenv").config();

const forever = require('forever');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Only update if an env does define the port
const DEFAULT_SERVER_PORT = 3357;

// Get action (start or stop) from command line arguments
const action = process.argv[2];

// Determine the port from environment variable or default
const actualPort = process.env.DEVBOARD_PORT || DEFAULT_SERVER_PORT;

// Construct the dynamic UID based on the port
const uid = `gitsense-chat-${actualPort}`;

// Define the base directory for logs and data
const gitsenseHomeDir = path.join(os.homedir(), '.gitsense');
const logDir = gitsenseHomeDir; // Logs will go directly into ~/.gitsense/

// Ensure the log directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    console.log(`Created log directory: ${logDir}`);
}

// Define log file paths
const foreverLogFile = path.join(logDir, `forever-${actualPort}.log`); // Forever's own log
const stdoutLogFile = path.join(logDir, `stdout-${actualPort}.log`);   // Application's stdout
const stderrLogFile = path.join(logDir, `stderr-${actualPort}.log`);   // Application's stderr

// The main application entry point relative to the package root
const appEntryPoint = path.join(__dirname, '..', 'index.js');

// Function to start the application
function startApplication() {
    console.log(`Starting application with forever: ${appEntryPoint}`);
    console.log(`Forever log: ${foreverLogFile}`);
    console.log(`Application stdout: ${stdoutLogFile}`);
    console.log(`Application stderr: ${stderrLogFile}`);

    // Clear previous log files if they exist
    if (fs.existsSync(stderrLogFile)) {
        fs.writeFileSync(stderrLogFile, '');
    }

    try {
        // Start the application as a daemon with a callback for error handling
        forever.startDaemon(appEntryPoint, {
            uid: uid,             // Unique ID for this process based on port
            max: 3,               // Restart up to 3 times if it crashes
            watch: false,         // Do not watch for file changes (for production)
            logFile: foreverLogFile, // Forever's own log output
            outFile: stdoutLogFile,  // Application's stdout log
            errFile: stderrLogFile,  // Application's stderr log
            silent: false,        // Output to console during startup
            args: [],             // Any arguments to pass to index.js
            minUptime: 5000,      // App needs to stay up for 5 seconds to be considered "running"
            spinSleepTime: 2000   // Wait 2 seconds between restarts
        });
    } catch(error) {
        console.error("Error starting application:", error);
        process.exit(1);
    }

    console.log('Pausing for a couple of seconds to see if there are any errors...');

    try {
        setTimeout(() => {
            let hasError = false;

            if (fs.existsSync(stderrLogFile)) {
                const showNumLines = 10;
                const stderrContent = fs.readFileSync(stderrLogFile, 'utf8');
                if (stderrContent.trim().length > 0) {
                    hasError = true;
                    console.error('\nWARNING: Errors detected during application startup!');
                    console.error('\n----------------------------------------------------------------\n');
                    console.error(`${stderrContent}`);
                    console.error('\n----------------------------------------------------------------\n');
                    console.error('If this error was unexpected, please run: npm stop');
                    console.error('Then fix the issue and try starting again.\n');
                }
            }

            if (!hasError) {
                console.log('\n================================================\n');
                console.log(`Application started successfully in daemon mode on port ${actualPort}.`);
                console.log('To stop the application, run: npm run stop');
                console.log('To view running processes, run: npm run status');
            }
        }, 2000);
    } catch (error) {
        console.error("Error during startup check:", error);
    }
}

// Function to stop the application
function stopApplication() {
    console.log(`Attempting to stop application with UID: ${uid}...`);
    // Use forever.stop with proper error handling
    const emitter = forever.stop(uid);
    
    emitter.on('stop', () => {
        console.log(`Application with UID '${uid}' stopped successfully.`);
        process.exit(0);
    });
    
    emitter.on('error', (err) => {
        // Check if it's a "process not found" error to provide a clearer message
        if (err.message && (err.message.includes('Cannot find forever process') || err.message.includes('not running'))) {
            console.log(`No running process was found with UID '${uid}'.`);
            process.exit(0); // Exit successfully since there was no process to stop
        } else {
            console.error(`Error stopping application with UID '${uid}':`, err.message);
            process.exit(1); // Exit with error code for unrecognized errors
        }
    });
    
    // Handle case where no processes are found
    emitter.on('stopAll', () => {
        console.log(`No running process was found with UID '${uid}'.`);
        process.exit(0);
    });
}

// Main execution logic based on action
if (action === 'start') {
    startApplication();
} else if (action === 'stop') {
    stopApplication();
} else {
    console.error('Invalid action. Please use "start" or "stop".');
    console.log('Usage: forever-process <start|stop>');
    process.exit(1);
}



