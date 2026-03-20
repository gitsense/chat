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

let DomUtils=require("@gitsense/gsc-utils").DomUtils;function renderErrorSection(r){var e=DomUtils.h.createDiv({cls:"patch-error-section",style:{marginBottom:"20px",padding:"10px",backgroundColor:"#fff0f0",borderRadius:"4px",border:"1px solid #ffcccc"}}),t=DomUtils.h.createH3({text:"Patch Validation Errors",style:{color:"#cc0000",marginTop:0,marginBottom:"10px"}});e.appendChild(t);let o=DomUtils.h.createUL({style:{margin:0,paddingLeft:"20px"}});return r.forEach(r=>{r=DomUtils.h.createLi({text:r,style:{marginBottom:"5px"}});o.appendChild(r)}),e.appendChild(o),e}module.exports={renderErrorSection:renderErrorSection};
