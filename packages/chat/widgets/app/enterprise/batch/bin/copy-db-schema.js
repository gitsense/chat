/*
 * Component: Copy DB Schema Script
 * Block-UUID: 91715a2f-55c7-4d9e-b46d-6846bd9de437
 * Parent-UUID: N/A
 * Version: 1.1.0
 * Description: Node.js script to copy the batch.sql schema file to the compiled distribution directories.
 * Language: JavaScript
 * Created-at: 2025-09-01T01:00:15.340Z
 * Authors: Gemini 2.5 Flash (v1.0.0), GLM-4.6 (v1.1.0)
 */


const fs = require('fs').promises;
const path = require('path');

// Use environment-based conditional paths
const basePath = 'lib';

// Resolve paths relative to the script's location in `bin/`
const projectRoot = path.join(__dirname, '..'); // Go up from bin/ to project root
const sourcePath = path.join(projectRoot, basePath, 'db', 'batch.sql');
const cjsDestDir = path.join(projectRoot, 'dist', 'cjs', 'db');
const esmDestDir = path.join(projectRoot, 'dist', 'esm', 'db');
const cjsDestPath = path.join(cjsDestDir, 'batch.sql');
const esmDestPath = path.join(esmDestDir, 'batch.sql');

async function copyDbSchema() {
    try {
        console.log(`Copying DB schema from ${sourcePath}...`);

        await fs.mkdir(cjsDestDir, { recursive: true });
        await fs.copyFile(sourcePath, cjsDestPath);
        console.log(`Copied to ${cjsDestPath}`);

        await fs.mkdir(esmDestDir, { recursive: true });
        await fs.copyFile(sourcePath, esmDestPath);
        console.log(`Copied to ${esmDestPath}`);

        console.log('DB schema copied successfully.');
    } catch (error) {
        console.error('Error copying DB schema:', error);
        process.exit(1);
    }
}

copyDbSchema();
