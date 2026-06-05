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

async function copyToClipboard(o){try{var r,e;return navigator.clipboard&&navigator.clipboard.writeText?(await navigator.clipboard.writeText(o),!0):((r=document.createElement("textarea")).value=o,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select(),e=document.execCommand("copy"),document.body.removeChild(r),e)}catch(o){return console.error("Failed to copy text: ",o),!1}}async function readJsonFromClipboard(){try{if(!navigator.clipboard||!navigator.clipboard.readText)throw new Error("Clipboard API not supported or permission denied.");var o=await navigator.clipboard.readText();if(!o)throw new Error("Clipboard is empty or contains non-text content.");try{return JSON.parse(o)}catch(o){throw new Error("Failed to parse clipboard content as JSON: "+o.message)}}catch(o){throw console.error("Error reading JSON from clipboard:",o),o}}module.exports={copyToClipboard:copyToClipboard,readJsonFromClipboard:readJsonFromClipboard};
