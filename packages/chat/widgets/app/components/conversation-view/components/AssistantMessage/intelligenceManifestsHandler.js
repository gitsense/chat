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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;async function handleIntelligenceManifests(e,t,n,o){if(!n||!n.chat||!e)return!1;var i=n.chat.type,e=e.type;if(!i.startsWith("intelligence-manifests")||!e.startsWith("intelligence-manifest"))return!1;let l=n.chat.descendants||[],r=!1;e=t.querySelectorAll('a[href="#"]');let a="";return"intelligence-manifests-root"===i?a="intelligence-manifests-owner":"intelligence-manifests-owner"===i&&(a="intelligence-manifests-repo"),a&&e.forEach(e=>{let t=e.textContent.trim();t=t.replace(/\s*\(\d+\)$/,"");var n=l.find(e=>e.name===t&&e.type===a);n&&n.uuid&&(e.href="/?chat="+n.uuid,r=!0)}),t.querySelectorAll("a").forEach(s=>{"Download"===s.textContent.trim()&&(s.onclick=async e=>{e.preventDefault();let t=s.textContent;e=s.href;s.textContent="Downloading...",s.style.pointerEvents="none";try{var n=await fetch(e);if(!n.ok)throw new Error("HTTP error! status: "+n.status);var o=await n.blob(),i=window.URL.createObjectURL(o),l=document.createElement("a"),r=(l.style.display="none",l.href=i,e.split("/")),a=r[r.length-1];l.download=a&&a.endsWith(".json")?a:"manifest.json",document.body.appendChild(l),l.click(),window.URL.revokeObjectURL(i),document.body.removeChild(l),s.textContent="Downloaded",setTimeout(()=>{s.textContent=t,s.style.pointerEvents=""},2e3)}catch(e){console.error("Download failed:",e),s.textContent="Error",setTimeout(()=>{s.textContent=t,s.style.pointerEvents=""},2e3)}},r=!0),"Copy"===s.textContent.trim()&&(s.onclick=async e=>{e.preventDefault();e=s.parentNode.previousElementSibling?.querySelector("a")||null;if(e&&e.href){e=e.href;let t=s.textContent;try{await navigator.clipboard.writeText(e),s.textContent="Copied!",setTimeout(()=>{s.textContent=t},2e3)}catch(e){console.error("Failed to copy link:",e),s.textContent="Error",setTimeout(()=>{s.textContent=t},2e3)}}else console.error("Could not find download link to copy URL")},r=!0)}),r}module.exports={handleIntelligenceManifests:handleIntelligenceManifests};
