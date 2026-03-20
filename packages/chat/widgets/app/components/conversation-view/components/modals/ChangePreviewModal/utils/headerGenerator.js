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

function generatePatchedHeaderText(e,r){e=e.split("\n");let t={};return e.forEach(e=>{var r,e=e.match(/\s*\*\s*([^:]+):\s*(.*)/);e&&([,e,r]=e,t[e.trim()]=r.trim())}),t["Block-UUID"]=r["Target-Block-UUID"],t["Parent-UUID"]=r["Source-Block-UUID"],t.Version=r["Target-Version"],t.Authors=r.Authors,e.map(e=>{var r=e.match(/\s*\*\s*([^:]+):\s*(.*)/);if(r){var[,r]=r,r=r.trim();if(t[r])return e.replace(/:\s*.*/,": "+t[r])}return e}).join("\n")}module.exports={generatePatchedHeaderText:generatePatchedHeaderText};
