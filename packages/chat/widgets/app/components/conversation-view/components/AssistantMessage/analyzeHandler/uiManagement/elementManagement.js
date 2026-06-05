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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function addErrorElement(r,o){var e=DomUtils.h.createDiv({cls:"analysis-error-container",style:{backgroundColor:"#F8D7DA",border:"1px solid #F5C6CB",color:"#721C24",padding:"10px",borderRadius:"4px",marginTop:"10px",marginBottom:"10px"}});e.innerHTML=o,r.appendChild(e)}function removeExistingControls(r){r.querySelectorAll(".analysis-control-container").forEach(r=>r.remove()),r.querySelectorAll(".analysis-error-container").forEach(r=>r.remove())}module.exports={addErrorElement:addErrorElement,removeExistingControls:removeExistingControls};
