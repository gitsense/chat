#!/bin/bash

# Component: GitSense Chat Release Orchestrator
# Block-UUID: bc347e92-a3ed-4b89-8889-54ccd7fbe399
# Parent-UUID: N/A
# Version: 1.1.0
# Description: Automates the extraction of cross-compiled gsc binaries from the Docker image, uploads them to GitHub Release Assets, and pushes the Docker image to the registry.
# Language: Bash
# Created-at: 2026-03-19T15:34:24.988Z
# Authors: Gemini 3 Flash (v1.0.0), GLM-4.7 (v1.1.0)


set -e

# Configuration
REPO="gitsense/chat"
IMAGE_NAME="gitsense/chat"
DIST_DIR="./cli-dist"
VERSION=$1

if [ -z "$VERSION" ]; then
    echo "Error: No version tag provided (e.g., ./release.sh v0.2.0)"
    exit 1
fi

echo "Starting Release Process for $REPO ($VERSION)"
echo "--------------------------------------------------"

# 1. Prerequisites
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    echo "   Install it from: https://cli.github.com/"
    exit 1
fi

# Check if tag exists locally, if not, warn user
if ! git rev-parse "$VERSION" >/dev/null 2>&1; then
    echo "Warning: Git tag '$VERSION' does not exist locally."
    echo "   The release creation might fail if the tag isn't on GitHub."
fi

# 2. Build the Docker Image
# Note: We use -f docker/Dockerfile because the Dockerfile is in a subdirectory
echo "Building Docker image (this cross-compiles the CLI)..."
docker build --no-cache -t "$IMAGE_NAME:latest" -t "$IMAGE_NAME:$VERSION" -f docker/Dockerfile .

# 3. Push Docker Image
# This is required for 'gsc docker install' to work
echo "Pushing Docker image to registry..."
docker push "$IMAGE_NAME:latest"
docker push "$IMAGE_NAME:$VERSION"

# 4. Extract Binaries from the Image
echo "Extracting binaries from image..."
mkdir -p "$DIST_DIR"

# Create a temporary container (don't run it)
CONTAINER_ID=$(docker create "$IMAGE_NAME:latest")

# Copy the 'dist' folder created in the Dockerfile to the host
# Path in Dockerfile: /gsc-docker-app/bin/dist/
docker cp "$CONTAINER_ID:/gsc-docker-app/bin/dist/." "$DIST_DIR/"

# Cleanup temporary container
docker rm -v "$CONTAINER_ID"

# Ensure binaries are executable
chmod +x "$DIST_DIR"/*

echo "Binaries extracted to $DIST_DIR:"
ls -l "$DIST_DIR"

# 5. Create GitHub Release and Upload Assets
# Requires GitHub CLI (gh) installed and authenticated
echo "Creating GitHub Release and uploading assets..."

gh release create "$VERSION" "$DIST_DIR"/* \
    --repo "$REPO" \
    --title "GitSense Chat $VERSION" \
    --notes "Release $VERSION including cross-compiled gsc CLI binaries."

echo "--------------------------------------------------"
echo "Release $VERSION is live!"
echo "   Docker Image: $IMAGE_NAME:$VERSION"
echo "   View Release: https://github.com/$REPO/releases/tag/$VERSION"

# 6. Cleanup
rm -rf "$DIST_DIR"
