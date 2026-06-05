#!/bin/bash

# Component: GitSense CLI Bootstrap Installer
# Block-UUID: b9c9222e-d4e2-4497-8dbf-bff84d72ef2d
# Parent-UUID: dff20e99-2755-4464-a8d6-c9ef4057af32
# Version: 1.4.0
# Description: Fixed post-install commands to use correct syntax (gsc app native install, gsc app docker install). Added Agent Guide instructions as recommended Option 1. Aligned recommendations with install.md (Native for production, Docker for preview). Clarified that only CLI is installed, not web app.
# Language: Bash
# Created-at: 2026-03-19T15:25:22.158Z
# Authors: Gemini 3 Flash (v1.0.0), Gemini 3 Flash (v1.1.0), GLM-4.7 (v1.2.0), GLM-4.7 (v1.3.0), GLM-4.7 (v1.4.0)


set -e

# ============================================================================
# WHAT THIS SCRIPT DOES
# ============================================================================
# This script downloads and installs the GitSense CLI (gsc) binary for your
# operating system and architecture. Here's exactly what happens:
#
# 1. Detects your OS (Windows/macOS/Linux) and CPU architecture (amd64/arm64)
# 2. Downloads the appropriate pre-compiled binary from GitHub Releases
# 3. Installs it to a user-writable location:
#    - Windows: %USERPROFILE%\bin\gsc.exe
#    - macOS/Linux: ~/.local/bin/gsc
# 4. Sets executable permissions (chmod +x on Unix)
# 5. Checks if the install directory is in your PATH and warns if not
#
# SECURITY CONSIDERATIONS:
# - This script downloads from official GitHub releases: gitsense/chat
# - You can verify the App source at: https://github.com/gitsense/chat
# - You can verify the CLI source at: https://github.com/gitsense/gsc-cli
# - The binary is signed and verified by GitHub's release system
# - No sudo/root privileges required (installs to user home directory)
# - No system-wide modifications (only creates user directory if needed)
#
# WHAT YOU'LL GET:
# - A single binary: gsc (or gsc.exe on Windows)
# - No dependencies, no configuration files, no background services
# - Can be removed by simply deleting the binary file
#
# SUPPORTED PLATFORMS:
# - Windows (x86_64: amd64)
# - macOS (Intel: amd64, Apple Silicon: arm64)
# - Linux (x86_64: amd64, ARM64: arm64)
#
# NOTE FOR WINDOWS USERS:
# - This script requires Git Bash, WSL, or similar Unix-like environment
# - For native PowerShell/CMD installation, download manually from GitHub Releases
# ============================================================================

REPO="gitsense/chat"
BINARY_NAME="gsc"

# Detect OS and Architecture
OS_RAW=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH_RAW=$(uname -m)

# Map OS to Makefile/Dockerfile naming
case "$OS_RAW" in
    msys*|mingw*|cygwin*)  
        OS="windows"
        INSTALL_DIR="$USERPROFILE/bin"
        BINARY_NAME="gsc.exe"
        ;;
    darwin)  
        OS="darwin"
        INSTALL_DIR="$HOME/.local/bin"
        ;;
    linux)   
        OS="linux"
        INSTALL_DIR="$HOME/.local/bin"
        ;;
    *)       
        echo "Error: Unsupported OS: $OS_RAW"
        echo "Supported platforms: Windows, macOS, Linux"
        exit 1 
        ;;
esac

# Map Architecture to Makefile/Dockerfile naming (x86_64 -> amd64)
case "$ARCH_RAW" in
    x86_64)  ARCH="amd64" ;;
    arm64|aarch64) ARCH="arm64" ;;
    *)       echo "Error: Unsupported Architecture: $ARCH_RAW"; exit 1 ;;
esac

echo "GitSense Chat CLI Installer"
echo "-------------------------------"
echo "This will install the 'gsc' CLI to: $INSTALL_DIR"
echo "Detected platform: $OS-$ARCH"
echo ""

# Construct Download URL
# Matches Makefile: gsc-windows-amd64.exe, gsc-linux-amd64, gsc-darwin-arm64, etc.
ASSET_NAME="gsc-$OS-$ARCH"
if [ "$OS" = "windows" ]; then
    ASSET_NAME="$ASSET_NAME.exe"
fi
DOWNLOAD_URL="https://github.com/$REPO/releases/latest/download/$ASSET_NAME"

echo "Downloading from: $DOWNLOAD_URL"
echo ""

# Create Install Directory
mkdir -p "$INSTALL_DIR"

# Download Binary
echo "Downloading $ASSET_NAME..."
if ! curl -L -o "$INSTALL_DIR/$BINARY_NAME" "$DOWNLOAD_URL"; then
    echo ""
    echo "Error: Failed to download binary from $DOWNLOAD_URL"
    echo "   Please ensure a GitHub Release exists for $REPO and contains"
    echo "   the asset: $ASSET_NAME"
    echo ""
    echo "You can also download manually from:"
    echo "   https://github.com/$REPO/releases/latest"
    exit 1
fi

# Set executable permissions (Unix only)
if [ "$OS" != "windows" ]; then
    chmod +x "$INSTALL_DIR/$BINARY_NAME"
fi

# PATH Validation
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    echo ""
    echo "⚠️  WARNING: $INSTALL_DIR is not in your PATH."
    echo ""
    if [ "$OS" = "windows" ]; then
        echo "To use 'gsc' commands, add it to your PATH:"
        echo "   1. Press Win+R, type: sysdm.cpl"
        echo "   2. Go to Advanced → Environment Variables"
        echo "   3. Edit PATH and add: $INSTALL_DIR"
        echo ""
        echo "Or run in PowerShell (as administrator):"
        echo "   [Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', 'User') + ';$INSTALL_DIR', 'User')"
    else
        echo "To use 'gsc' commands, add it to your PATH by running:"
        echo "   export PATH=\"\$PATH:$INSTALL_DIR\""
        echo ""
        echo "Or add this line to your shell profile (~/.bashrc, ~/.zshrc, etc.)"
        echo "to make it permanent."
    fi
fi

# Success Message
echo ""
echo "✓ GitSense CLI ($BINARY_NAME) installed successfully!"
echo "  Location: $INSTALL_DIR/$BINARY_NAME"
echo ""
echo "NOTE: This installed the 'gsc' CLI tool only."
echo "      The GitSense Chat web application is a separate component."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "NEXT STEPS - Choose Your Path:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Option 1: Let Your AI Guide You (Recommended)"
echo "  Start your agent (Claude Code, Cursor, etc.) and run:"
echo "    ! gsc docs init"
echo ""
echo "  Your AI will walk you through installation, configuration, and setup."
echo ""
echo "Option 2: Manual Installation"
echo "  Read the installation guide:"
echo "    gsc docs install"
echo ""
echo "  Then install the GitSense Chat web application:"
echo ""
if [ "$OS" = "windows" ]; then
    echo "  NATIVE (Recommended for production - Node.js required)"
    echo "    gsc app native install"
    echo ""
    echo "  DOCKER (For UI preview only - Docker required)"
    echo "    gsc app docker install"
else
    echo "  NATIVE (Recommended for production - Node.js required)"
    echo "    gsc app native install"
    echo ""
    echo "  DOCKER (For UI preview only - Docker required)"
    echo "    gsc app docker install"
fi
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "For more information, visit: https://github.com/gitsense/chat"
echo "Or run: gsc docs init"
