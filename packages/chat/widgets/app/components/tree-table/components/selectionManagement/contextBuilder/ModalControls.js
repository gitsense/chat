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

let{formatBytes,formatTokens}=require("@gitsense/gsc-utils");function createModalControls({container:t}){var e=t.querySelector(".modal-controls");let n=document.createElement("div");n.className="modal-stats-display";var s=t.querySelector("#include-metadata");let r=t.querySelector(".progress-bar");s&&s.parentElement&&s.parentElement.remove();t=e.querySelector(".progress-container");return t?e.insertBefore(n,t):e.appendChild(n),{isMetadataIncluded:function(){return!0},reset:function(){r.style.width="0%",n.innerHTML=""},updateStats:function(t){t.startTime&&!t.endTime&&new Date;var e=t.contentType?t.contentType.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "):"N/A",s=t.contentOption?t.contentOption.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "):"N/A";n.innerHTML=`
            <span class="stat-item" style="margin-right: 20px;"><strong>Type:</strong> ${e}</span>
            <span class="stat-item" style="margin-right: 20px;"><strong>Option:</strong> ${s||"N/A"}</span>
            <span class="stat-item" style="margin-right: 20px;"><strong>Items:</strong> ${t.loadedCount} of ${t.totalItems} ${0<t.errorCount?`<span class="stat-error">(${t.errorCount} errors)</span>`:""}</span>
            <span class="stat-item" style="margin-right: 20px;"><strong>Size:</strong> ${formatBytes(t.totalBytes)}</span>
            <span class="stat-item" style="margin-right: 20px;"><strong>Tokens:</strong> ${formatTokens(t.totalTokens)}</span>
        `},progress:{set:function(t){r.style.width=t+"%"}}}}module.exports={createModalControls:createModalControls};
