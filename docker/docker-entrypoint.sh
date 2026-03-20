#!/bin/bash

# Component: GitSense Chat Docker Entrypoint
# Block-UUID: 183b418f-ae49-436d-b260-d2f4dbf517a6
# Parent-UUID: 7769145c-1c20-41fc-8f36-113847bb8b6b
# Version: 1.4.0
# Description: Updated to run gsc-admin-setup as the 'gitsense' user to ensure correct file ownership of the database.
# Language: Bash
# Created-at: 2026-03-19T18:43:31.909Z
# Authors: GLM-4.7 (v1.0.0), GLM-4.7 (v1.1.0), GLM-4.7 (v1.2.0), GLM-4.7 (v1.3.0), Gemini 3 Flash (v1.4.0)


set -e

# Define paths
DATA_DIR="/gsc-docker-app/data"
BASE_STATE_DIR="/gsc-docker-app/base-state"

# 1. Ensure data directory exists and has correct permissions
# This runs as root to fix potential permission issues with named volumes.
mkdir -p "$DATA_DIR"
chown -R gitsense:gitsense "$DATA_DIR"

# 2. Link .env from data directory to app root
if [ -f "$DATA_DIR/.env" ]; then
    ln -sf "$DATA_DIR/.env" /gsc-docker-app/.env
fi

# 2. Check if the database exists. If not, we assume initialization is needed.
if [ ! -f "${DATA_DIR}/chats.sqlite3" ]; then
    echo "Database not found. Initializing data directory from base-state..."
    
    # Run the setup command AS THE GITSENSE USER.
    # This ensures the database files are created with the correct ownership.
    su-exec gitsense gsc-admin-setup --data-dir "${DATA_DIR}" --force
    
    echo "Initialization complete."
else
    echo "Database found. Skipping initialization."
fi

# 3. Drop privileges to the 'gitsense' user and execute the main command
# This ensures the app runs as a non-root user for security.
exec su-exec gitsense "$@"
