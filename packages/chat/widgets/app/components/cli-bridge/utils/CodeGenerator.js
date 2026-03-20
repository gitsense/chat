/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * This software is permitted for internal use and modification.
 * Copying for profit or redistribution is strictly not permitted.
 *
 * The Fair License, which formalizes these terms, will be adopted as the official license in the future.
 * Once finalized, the unminified source code will be freely available for internal use for non-
 * commercial purposes.
 *
 * This software may not be used to develop or enhance any product or service that competes
 * directly or indirectly with GitSense Chat without explicit permission.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 */

let CLI_BRIDGE_CONSTANTS=require("../constants").CLI_BRIDGE_CONSTANTS;class CodeGenerator{static generate(){var t=Math.pow(10,CLI_BRIDGE_CONSTANTS.DEFAULTS.CODE_LENGTH);return Math.floor(Math.random()*t).toString().padStart(CLI_BRIDGE_CONSTANTS.DEFAULTS.CODE_LENGTH,"0")}static generateAuthcode(){var t=Math.pow(10,CLI_BRIDGE_CONSTANTS.DEFAULTS.AUTHCODE_LENGTH);return Math.floor(Math.random()*t).toString().padStart(CLI_BRIDGE_CONSTANTS.DEFAULTS.AUTHCODE_LENGTH,"0")}}module.exports=CodeGenerator;
