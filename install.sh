#!/bin/bash

# Component: GitSense CLI Bootstrap Installer
# Block-UUID: 8aeaf164-1e68-4743-819c-d4c8269278de
# Parent-UUID: a5cd6c28-6b2b-4425-8c38-19efb35f2b49
# Version: 1.1.0
# Description: Updated to align with Makefile/Dockerfile naming conventions (gsc-os-arch).
# Language: Bash
# Created-at: 2026-03-19T15:25:22.158Z
# Authors: Gemini 3 Flash (v1.0.0), Gemini 3 Flash (v1.1.0)


set -e

REPO="gitsense/chat"
INSTALL_DIR="$HOME/.local/bin"
BINARY_NAME="gsc"

echo "GitSense Chat CLI Installer"
echo "-------------------------------"

# 1. Detect OS and Architecture
OS_RAW=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH_RAW=$(uname -m)

# Map OS to Makefile/Dockerfile naming
case "$OS_RAW" in
    darwin)  OS="darwin" ;;
    linux)   OS="linux" ;;
    *)       echo "Error: Unsupported OS: $OS_RAW"; exit 1 ;;
esac

# Map Architecture to Makefile/Dockerfile naming (x86_64 -> amd64)
case "$ARCH_RAW" in
    x86_64)  ARCH="amd64" ;;
    arm64|aarch64) ARCH="arm64" ;;
    *)       echo "Error: Unsupported Architecture: $ARCH_RAW"; exit 1 ;;
esac

# 2. Construct Download URL
# Matches Makefile: gsc-linux-amd64, gsc-darwin-arm64, etc.
ASSET_NAME="gsc-$OS-$ARCH"
DOWNLOAD_URL="https://github.com/$REPO/releases/latest/download/$ASSET_NAME"

# 3. Create Install Directory
mkdir -p "$INSTALL_DIR"

# 4. Download Binary
echo "Downloading $ASSET_NAME for $OS-$ARCH..."
if ! curl -L -o "$INSTALL_DIR/$BINARY_NAME" "$DOWNLOAD_URL"; then
    echo ""
    echo "Error: Failed to download binary from $DOWNLOAD_URL"
    echo "   Please ensure a GitHub Release exists for $REPO and contains"
    echo "   the asset: $ASSET_NAME"
    exit 1
fi

chmod +x "$INSTALL_DIR/$BINARY_NAME"

# 5. PATH Validation
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    echo ""
    echo "Warning: $INSTALL_DIR is not in your PATH."
    echo "   Add it by running the following command or adding it to your shell profile:"
    echo "   export PATH=\"\$PATH:$INSTALL_DIR\""
fi

# 6. Success Message
echo ""
echo "GitSense CLI (gsc) installed successfully!"
echo "   Location: $INSTALL_DIR/$BINARY_NAME"
echo ""
echo "To complete the setup of GitSense Chat, choose your preferred environment:"
echo ""
echo "DOCKER (Recommended - Sandboxed & Zero Dependencies)"
echo "   Run: gsc docker install"
echo ""
echo "NATIVE (Node.js - Flexible & High Performance)"
echo "   Run: gsc app install"
echo ""
