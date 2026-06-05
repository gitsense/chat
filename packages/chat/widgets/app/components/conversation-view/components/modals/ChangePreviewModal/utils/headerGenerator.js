/*
 * GitSense Chat - Minified Distribution File
 *
 * This JavaScript file is part of the minified distribution of GitSense Chat.
 * It has been optimized (minified) for performance and efficient delivery.
 *
 * Licensed under the Fair Core License, Version 1.0 (FCL-1.0-ALv2).
 * https://faircode.io
 *
 * You may use, modify, and run this software for internal, non-commercial
 * purposes including personal projects, team workflows, and self-hosted
 * deployments. You may not use this software to build or operate a product
 * or service that competes directly or indirectly with GitSense Chat.
 * Redistribution or resale is not permitted.
 *
 * Copyright (c) 2026 GitSense. All rights reserved.
 *
 * For licensing inquiries, internal-use exceptions, or business use,
 * contact sales@gitsense.com
 */

function generatePatchedHeaderText(e,r){e=e.split("\n");let t={};return e.forEach(e=>{var r,e=e.match(/\s*\*\s*([^:]+):\s*(.*)/);e&&([,e,r]=e,t[e.trim()]=r.trim())}),t["Block-UUID"]=r["Target-Block-UUID"],t["Parent-UUID"]=r["Source-Block-UUID"],t.Version=r["Target-Version"],t.Authors=r.Authors,e.map(e=>{var r=e.match(/\s*\*\s*([^:]+):\s*(.*)/);if(r){var[,r]=r,r=r.trim();if(t[r])return e.replace(/:\s*.*/,": "+t[r])}return e}).join("\n")}module.exports={generatePatchedHeaderText:generatePatchedHeaderText};
