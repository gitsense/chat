/**
 * Component: GitSense Chat Admin Environment CLI
 * Block-UUID: 257f758e-6d5b-4a89-8204-68217dedfb19
 * Parent-UUID: da1da81f-1439-4f37-9a47-f22a105e0747
 * Version: 1.2.1
 * Description: Handles environment variable management for GitSense Chat, including listing, getting, setting, unsetting, validating, and editing .env files. Fixed path resolution to look in data subdirectory when GSC_HOME is set.
 * Language: JavaScript
 * Created-at: 2026-06-05T17:22:48.718Z
 * Authors: GLM-4.7 (v1.0.0), GLM-4.7 (v1.1.0), GLM-4.7 (v1.2.0), GLM-4.7 (v1.2.1)
 */


const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const program = new Command();

// --- Constants ---

const SENSITIVE_KEYS = ['API_KEY', 'SECRET', 'TOKEN', 'PASSWORD', 'KEY'];
const ENV_FILE_PATH = process.env.GSC_HOME 
    ? path.join(process.env.GSC_HOME, 'data', '.env')
    : path.join(os.homedir(), '.gitsense', '.env');
const ENV_EXAMPLE_PATH = path.join(__dirname, '..', '.env.example');
const CHAT_CONFIG_PATH = process.env.GSC_HOME
    ? path.join(process.env.GSC_HOME, 'data', 'chat-config.json')
    : path.join(os.homedir(), '.gitsense', 'chat-config.json');

// --- Helper Functions ---

/**
 * Checks if a key name is sensitive (should be masked).
 * @param {string} key - The environment variable key.
 * @returns {boolean}
 */
function isSensitiveKey(key) {
    return SENSITIVE_KEYS.some(sensitive => key.includes(sensitive));
}

/**
 * Masks a sensitive value for display.
 * @param {string} value - The value to mask.
 * @returns {string} The masked value.
 */
function maskValue(value) {
    if (!value || value.trim() === '') {
        return '(not set)';
    }
    if (value.length < 8) {
        return '***';
    }
    return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
}

/**
 * Reads and parses the .env file.
 * @returns {object} Object with key-value pairs.
 */
function readEnvFile() {
    if (!fs.existsSync(ENV_FILE_PATH)) {
        return {};
    }

    const content = fs.readFileSync(ENV_FILE_PATH, 'utf8');
    const env = {};

    content.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) {
            return;
        }

        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            // Remove quotes if present
            env[key] = value.replace(/^["']|["']$/g, '');
        }
    });

    return env;
}

/**
 * Writes the .env file atomically.
 * @param {object} env - Object with key-value pairs.
 */
function writeEnvFile(env) {
    const lines = [];

    // Preserve comments and empty lines from original file
    if (fs.existsSync(ENV_FILE_PATH)) {
        const originalContent = fs.readFileSync(ENV_FILE_PATH, 'utf8');
        originalContent.split('\n').forEach(line => {
            if (line.trim().startsWith('#') || line.trim() === '') {
                lines.push(line);
            }
        });
    }

    // Add key-value pairs
    Object.entries(env).forEach(([key, value]) => {
        lines.push(`${key}=${value}`);
    });

    const content = lines.join('\n');
    const tempPath = `${ENV_FILE_PATH}.tmp`;

    fs.writeFileSync(tempPath, content);
    fs.renameSync(tempPath, ENV_FILE_PATH);
}

/**
 * Reads the chat-config.json to get required API keys.
 * @returns {string[]} Array of required API key environment variable names.
 */
function getRequiredApiKeys() {
    if (!fs.existsSync(CHAT_CONFIG_PATH)) {
        return [];
    }

    try {
        const config = JSON.parse(fs.readFileSync(CHAT_CONFIG_PATH, 'utf8'));
        return (config.providers || []).map(p => p.apiKeyName);
    } catch (error) {
        console.error(`Error reading chat-config.json: ${error.message}`);
        return [];
    }
}

/**
 * Validates the .env file against required keys.
 * @returns {object} Validation result with errors and warnings.
 */
function validateEnvFile() {
    const env = readEnvFile();
    const requiredKeys = getRequiredApiKeys();
    const errors = [];
    const warnings = [];

    // Check for missing required keys
    requiredKeys.forEach(key => {
        if (!env[key] || env[key].trim() === '') {
            errors.push(`Missing required API key: ${key}`);
        }
    });

    // Check for empty values
    Object.entries(env).forEach(([key, value]) => {
        if (value.trim() === '') {
            warnings.push(`Empty value for key: ${key}`);
        }
    });

    return { errors, warnings };
}

// --- CLI Setup ---

program.name('gsc-admin env')
    .description('Manage GitSense Chat environment variables (.env file).');

// --- List Command ---
program
    .command('list')
    .option('-f, --format <format>', 'Output format (text or json)', 'text')
    .description('List all environment variables in .env file.')
    .action((options) => {
        const env = readEnvFile();

        console.log(`# Reading from: ${ENV_FILE_PATH}`);

        if (options.format === 'json') {
            const output = {};
            Object.entries(env).forEach(([key, value]) => {
                output[key] = isSensitiveKey(key) ? maskValue(value) : value;
            });
            console.log(JSON.stringify(output, null, 2));
            return;
        }

        // Default text format
        if (Object.keys(env).length === 0) {
            console.log('No environment variables set.');
            return;
        }

        console.log('\nEnvironment Variables:');
        Object.entries(env).forEach(([key, value]) => {
            const displayValue = isSensitiveKey(key) ? maskValue(value) : value;
            console.log(`  ${key}=${displayValue}`);
        });
        console.log('');
    });

// --- Get Command ---
program
    .command('get <key>')
    .option('-f, --format <format>', 'Output format (text or json)', 'text')
    .description('Get the value of a specific environment variable.')
    .action((key, options) => {
        const env = readEnvFile();
        const value = env[key];

        console.log(`# Reading from: ${ENV_FILE_PATH}`);

        if (value === undefined) {
            console.log(`! Environment variable '${key}' not found.`);
            process.exit(1);
        }

        if (options.format === 'json') {
            const output = {
                key: key,
                value: isSensitiveKey(key) ? maskValue(value) : value,
                masked: isSensitiveKey(key)
            };
            console.log(JSON.stringify(output, null, 2));
            return;
        }

        // Default text format
        const displayValue = isSensitiveKey(key) ? maskValue(value) : value;
        console.log(`${key}=${displayValue}`);
    });

// --- Set Command ---
program
    .command('set <key_value>')
    .description('Set an environment variable (format: KEY=VALUE).')
    .action((keyValue) => {
        const match = keyValue.match(/^([^=]+)=(.*)$/);
        if (!match) {
            console.log('! Invalid format. Use: KEY=VALUE');
            process.exit(1);
        }

        const key = match[1].trim();
        const value = match[2].trim();

        const env = readEnvFile();
        env[key] = value;

        writeEnvFile(env);

        const displayValue = isSensitiveKey(key) ? maskValue(value) : value;
        console.log(`✓ Set ${key}=${displayValue}`);
    });

// --- Unset Command ---
program
    .command('unset <key>')
    .description('Remove an environment variable.')
    .action((key) => {
        const env = readEnvFile();

        if (env[key] === undefined) {
            console.log(`! Environment variable '${key}' not found.`);
            process.exit(1);
        }

        delete env[key];
        writeEnvFile(env);

        console.log(`✓ Unset ${key}`);
    });

// --- Validate Command ---
program
    .command('validate')
    .option('-f, --format <format>', 'Output format (text or json)', 'text')
    .description('Validate the .env file against required keys.')
    .action((options) => {
        const { errors, warnings } = validateEnvFile();

        if (options.format === 'json') {
            const output = {
                valid: errors.length === 0,
                errors: errors,
                warnings: warnings
            };
            console.log(JSON.stringify(output, null, 2));
            return;
        }

        // Default text format
        if (errors.length === 0 && warnings.length === 0) {
            console.log('✓ .env file is valid.');
            return;
        }

        if (errors.length > 0) {
            console.log('\nErrors:');
            errors.forEach(error => console.log(`  ! ${error}`));
        }

        if (warnings.length > 0) {
            console.log('\nWarnings:');
            warnings.forEach(warning => console.log(`  ⚠ ${warning}`));
        }

        if (errors.length > 0) {
            process.exit(1);
        }
    });

// --- Template Command ---
program
    .command('template')
    .description('Display the .env.example template with descriptions.')
    .action(() => {
        if (!fs.existsSync(ENV_EXAMPLE_PATH)) {
            console.log('! .env.example file not found.');
            process.exit(1);
        }

        const content = fs.readFileSync(ENV_EXAMPLE_PATH, 'utf8');
        console.log(content);
    });

// --- Edit Command ---
program
    .command('edit')
    .description('Open .env file in your preferred editor.')
    .action(() => {
        const editor = process.env.EDITOR || 'nano';

        if (!fs.existsSync(ENV_FILE_PATH)) {
            console.log('! .env file does not exist. Creating it...');
            writeEnvFile({});
        }

        console.log(`Opening ${ENV_FILE_PATH} in ${editor}...`);
        const result = spawnSync(editor, [ENV_FILE_PATH], { stdio: 'inherit' });

        if (result.status !== 0) {
            console.error(`! Editor exited with status ${result.status}`);
            process.exit(1);
        }

        console.log('✓ .env file saved.');
    });

// --- Parse and Execute ---

program.parse(process.argv);

// If no command is given, display help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
