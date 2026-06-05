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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderActionButtons(t){var{isValid:t,onCancel:e,onApply:o}=t,n=DomUtils.h.createDiv({cls:"patch-action-section",style:{display:"flex",justifyContent:"flex-end",gap:"10px",marginTop:"20px"}}),e=DomUtils.h.createButton({text:"Cancel",style:{padding:"8px 16px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f5f5f5",cursor:"pointer"},onclick:e}),e=(n.appendChild(e),DomUtils.h.createButton({text:"Apply Patch",style:{padding:"8px 16px",border:"none",borderRadius:"4px",backgroundColor:t?"#4CAF50":"#cccccc",color:"white",cursor:t?"pointer":"not-allowed"},onclick:o,disabled:!t}));return n.appendChild(e),n}module.exports={renderActionButtons:renderActionButtons};
