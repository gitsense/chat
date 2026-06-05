const fs = require('fs');
const readline = require('readline');

// Get file path from command line argument
const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node truncate-ndjson.js <path-to-log.ndjson>');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
}

const fileStream = fs.createReadStream(filePath);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

// Configuration
const MAX_STRING_LENGTH = 50;
const MAX_ARRAY_LENGTH = 2;

rl.on('line', (line) => {
    if (!line.trim()) return;

    try {
        const obj = JSON.parse(line);
        const truncated = truncateObject(obj);
        
        // Output compact JSON (no pretty printing)
        process.stdout.write(JSON.stringify(truncated) + '\n');
    } catch (e) {
        // Skip invalid lines silently or log to stderr
        // console.error('Skipping invalid line');
    }
});

/**
 * Recursively truncates object values to reduce size while preserving structure.
 */
function truncateObject(value) {
    // 1. Handle Strings
    if (typeof value === 'string') {
        if (value.length > MAX_STRING_LENGTH) {
            return value.substring(0, MAX_STRING_LENGTH) + '...';
        }
        return value;
    }

    // 2. Handle Arrays
    if (Array.isArray(value)) {
        if (value.length > MAX_ARRAY_LENGTH) {
            // Keep first N items, truncate their contents recursively
            return value.slice(0, MAX_ARRAY_LENGTH).map(item => truncateObject(item));
        }
        // If array is small enough, just truncate contents
        return value.map(item => truncateObject(item));
    }

    // 3. Handle Objects
    if (value !== null && typeof value === 'object') {
        const newObj = {};
        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                newObj[key] = truncateObject(value[key]);
            }
        }
        return newObj;
    }

    // 4. Primitives (number, boolean, null) - return as is
    return value;
}
