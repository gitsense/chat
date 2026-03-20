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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function addErrorElement(r,o){var e=DomUtils.h.createDiv({cls:"analysis-error-container",style:{backgroundColor:"#F8D7DA",border:"1px solid #F5C6CB",color:"#721C24",padding:"10px",borderRadius:"4px",marginTop:"10px",marginBottom:"10px"}});e.innerHTML=o,r.appendChild(e)}function removeExistingControls(r){r.querySelectorAll(".analysis-control-container").forEach(r=>r.remove()),r.querySelectorAll(".analysis-error-container").forEach(r=>r.remove())}module.exports={addErrorElement:addErrorElement,removeExistingControls:removeExistingControls};
