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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;async function handleIntelligenceManifests(e,t,n,o){if(!n||!n.chat||!e)return!1;var i=n.chat.type,e=e.type;if(!i.startsWith("intelligence-manifests")||!e.startsWith("intelligence-manifest"))return!1;let l=n.chat.descendants||[],r=!1;e=t.querySelectorAll('a[href="#"]');let a="";return"intelligence-manifests-root"===i?a="intelligence-manifests-owner":"intelligence-manifests-owner"===i&&(a="intelligence-manifests-repo"),a&&e.forEach(e=>{let t=e.textContent.trim();t=t.replace(/\s*\(\d+\)$/,"");var n=l.find(e=>e.name===t&&e.type===a);n&&n.uuid&&(e.href="/?chat="+n.uuid,r=!0)}),t.querySelectorAll("a").forEach(s=>{"Download"===s.textContent.trim()&&(s.onclick=async e=>{e.preventDefault();let t=s.textContent;e=s.href;s.textContent="Downloading...",s.style.pointerEvents="none";try{var n=await fetch(e);if(!n.ok)throw new Error("HTTP error! status: "+n.status);var o=await n.blob(),i=window.URL.createObjectURL(o),l=document.createElement("a"),r=(l.style.display="none",l.href=i,e.split("/")),a=r[r.length-1];l.download=a&&a.endsWith(".json")?a:"manifest.json",document.body.appendChild(l),l.click(),window.URL.revokeObjectURL(i),document.body.removeChild(l),s.textContent="Downloaded",setTimeout(()=>{s.textContent=t,s.style.pointerEvents=""},2e3)}catch(e){console.error("Download failed:",e),s.textContent="Error",setTimeout(()=>{s.textContent=t,s.style.pointerEvents=""},2e3)}},r=!0),"Link"===s.textContent.trim()&&(s.onclick=async e=>{e.preventDefault();e=s.parentNode.previousElementSibling?.querySelector("a")||null;if(e&&e.href){e=e.href;let t=s.textContent;try{await navigator.clipboard.writeText(e),s.textContent="Copied!",setTimeout(()=>{s.textContent=t},2e3)}catch(e){console.error("Failed to copy link:",e),s.textContent="Error",setTimeout(()=>{s.textContent=t},2e3)}}else console.error("Could not find download link to copy URL")},r=!0)}),r}module.exports={handleIntelligenceManifests:handleIntelligenceManifests};
