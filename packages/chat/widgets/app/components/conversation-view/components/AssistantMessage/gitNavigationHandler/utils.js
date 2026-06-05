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

function formatRelativeDate(e){var t;return e?(t=Math.floor(Date.now()/1e3),(t=parseInt(t-e))<0?"Just now":t<60?t+"s ago":(e=Math.floor(t/60))<60?e+"m ago":(t=Math.floor(e/60))<24?t+"h ago":(e=Math.floor(t/24))<30?e+"d ago":(t=Math.floor(e/30))<12?t+"mo ago":Math.floor(t/12)+"y ago"):"Unknown"}function renderStatus(e,t,r){var o=document.createElement("span");switch(e){case"imported":o.textContent=""+formatRelativeDate(r),o.style.color=null;break;case"importing":o.textContent="Importing",o.style.color=null;break;case"import-failed":o.textContent="Failed",o.style.color="#dc3545";break;default:o.textContent=e,o.style.color="#6c757d"}return o}function createReposSummary(e,t,r){var o=document.createElement("p");return o.style.color="#6c757d",o.style.marginTop="0",o.style.marginBottom="16px",o.textContent=r?e+` repositories for owner '${r}'.`:e+` repositories from ${t} owners.`,o}function createGenericSummary(e,t,r){var o=document.createElement("p");o.style.color="#6c757d",o.style.marginTop="0",o.style.marginBottom="16px";let a=null;return"repos"===t?a=1===e?"repository":"repositories":"branches"===t&&(a=1===e?"branch":"branches"),o.textContent=e+" "+a,o}function createFooter(e){var t=document.createElement("p");return t.style.color="#6c757d",t.style.marginTop="16px",t.style.marginBottom="0",t.style.paddingTop="8px",t.style.borderTop="1px solid #eee",t.innerHTML=e,t}function createHeader(e,t=0){var r=document.createElement("h1");return r.textContent=e,r.style.marginTop="0",r}module.exports={formatRelativeDate:formatRelativeDate,renderStatus:renderStatus,createHeader:createHeader,createGenericSummary:createGenericSummary,createFooter:createFooter};
